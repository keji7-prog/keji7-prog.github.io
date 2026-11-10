(() => {
'use strict';
const $=id=>document.getElementById(id),fmt=v=>Number(v).toLocaleString('zh-CN');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let original=[],view=[];
const renderBars=(id,items,maxRows=8)=>{
 const subset=items.slice(0,maxRows);const top=Math.max(1,...subset.map(p=>p.value));
 $(id).innerHTML=subset.length?subset.map(p=>`<div class="detail-bar"><span class="bar-name" title="${esc(p.name)}">${esc(p.name)}</span><span class="track"><span class="fill" style="width:${(p.value/top*100).toFixed(3)}%"></span></span><span class="value">${fmt(p.value)}</span></div>`).join(''):'<p class="detail-empty">无匹配记录</p>';
};
function render(){
 const q=$('repo-q').value.trim().toLowerCase(),category=$('repo-cat').value,metric=$('repo-metric').value,sort=$('repo-sort').value;
 view=original.filter(r=>(!category||r.category===category)&&(!q||[r.repo,r.description,r.language].join(' ').toLowerCase().includes(q)));
 view.sort((a,b)=>sort==='name'?a.repo.localeCompare(b.repo):sort==='asc'?a[metric]-b[metric]:b[metric]-a[metric]);
 const stars=[...view].map(r=>r.stars).sort((a,b)=>a-b),n=stars.length,med=n?(n%2?stars[(n-1)/2]:(stars[n/2-1]+stars[n/2])/2):null;
 $('k-count').textContent=fmt(n);$('k-median').textContent=med===null?'—':fmt(med);
 const leader=[...view].sort((a,b)=>b.stars-a.stars)[0];$('k-leading').textContent=leader?leader.repo.split('/').pop():'—';$('k-leading-value').textContent=leader?fmt(leader.stars)+' Stars':'无匹配仓库';
 renderBars('repo-bars',[...view].sort((a,b)=>b[metric]-a[metric]).map(r=>({name:r.repo,value:r[metric]})),8);
 const counters=new Map();view.forEach(r=>counters.set(r.category,(counters.get(r.category)||0)+1));renderBars('repo-categories',[...counters].map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value),20);
 $('repo-tbody').innerHTML=view.map(r=>`<tr><td><a href="https://github.com/${encodeURI(r.repo)}" target="_blank" rel="noopener noreferrer">${esc(r.repo)} ↗</a><div class="table-limits">${esc(r.description||'')}</div></td><td>${esc(r.category)}</td><td class="numeric">${fmt(r.stars)}</td><td class="numeric">${fmt(r.forks)}</td><td class="numeric">${fmt(r.issues)}</td><td>${esc(r.language)}</td></tr>`).join('')||'<tr><td colspan="6">无匹配结果</td></tr>';
 $('repo-rows').textContent=`${n} / ${original.length} 条记录`;$('repo-state').textContent=`当前显示 ${n} 个开源项目 · 使用 2026-11-10 公开 API 数据快照`;
}
for(const id of ['repo-q','repo-cat','repo-metric','repo-sort'])$(id).addEventListener(id==='repo-q'?'input':'change',render);
$('repo-export').addEventListener('click',()=>{
 if(!view.length)return;
 const columns=['repo','category','stars','forks','issues','language','description'];const csv=[columns.join(','),...view.map(r=>columns.map(k=>'"'+String(r[k]??'').replace(/"/g,'""')+'"').join(','))].join('\r\n');
 const blob=new Blob(['\uFEFF',csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='open-source-metrics-2026-11-10.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
fetch('data/github_repos_snapshot.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(payload=>{
 const rows=payload.records;if(!Array.isArray(rows)||!rows.length)throw Error('数据文件不完整');
 original=rows.filter(r=>typeof r.repo==='string'&&['stars','forks','issues'].every(k=>Number.isFinite(r[k])));
 if(original.length!==rows.length)throw Error('字段验证失败');
 const cats=[...new Set(original.map(r=>r.category))].sort();$('repo-cat').innerHTML='<option value="">全部技术领域</option>'+cats.map(c=>`<option>${esc(c)}</option>`).join('');render();
}).catch(e=>{$('repo-state').textContent='无法加载数据：'+e.message;$('repo-bars').innerHTML='<p class="detail-empty">数据暂不可用</p>'});
})();