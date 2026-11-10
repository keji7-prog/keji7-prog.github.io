(()=>{'use strict';
const $=id=>document.getElementById(id),esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),fmt=x=>Number(x).toLocaleString('zh-CN',{maximumFractionDigits:2});
const PAGE=50;let headers=[],rows=[],visible=[],numeric=[],page=0,source='';
function parseCSV(text){text=text.replace(/^\uFEFF/,'');let records=[],row=[],cell='',quoted=false,afterQuote=false;for(let i=0;i<text.length;i++){const c=text[i];if(quoted){if(c==='"'&&text[i+1]==='"'){cell+='"';i++;}else if(c==='"'){quoted=false;afterQuote=true}else cell+=c;continue;}if(afterQuote){if(c===','){row.push(cell);cell='';afterQuote=false;continue}if(c==='\r'||c==='\n'){row.push(cell);if(row.some(v=>v!==''))records.push(row);row=[];cell='';afterQuote=false;if(c==='\r'&&text[i+1]==='\n')i++;continue}if(c===' '||c==='\t')continue;throw Error('CSV 引号后存在无效字符（位置 '+(i+1)+'）');}
if(c==='"'){if(cell===''){quoted=true}else throw Error('CSV 字段中存在不规范引号（位置 '+(i+1)+'）');}
else if(c===','){row.push(cell);cell='';}
else if(c==='\r'||c==='\n'){row.push(cell);if(row.some(v=>v!==''))records.push(row);row=[];cell='';if(c==='\r'&&text[i+1]==='\n')i++;}
else cell+=c;}
if(quoted)throw Error('CSV 末尾的引号没有闭合');row.push(cell);if(row.some(v=>v!==''))records.push(row);return records}
function safeCell(v){let s=String(v??'');if(/^\s*[=+@]/.test(s)||(/^\s*-/.test(s)&&!/^\s*-\d+(?:\.\d+)?\s*$/.test(s)))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function toCSV(cols,arr){return [cols,...arr].map(r=>r.map(safeCell).join(',')).join('\r\n')}
function median(a){if(!a.length)return null;let xs=[...a].sort((a,b)=>a-b),n=xs.length;return n%2?xs[(n-1)/2]:(xs[n/2-1]+xs[n/2])/2}
function setup(raw,label){const table=parseCSV(raw);if(table.length<2)throw Error('文件需要表头与至少一条数据');if(table.length>10001)throw Error('单次最多读取 10,000 条记录');const h=table[0];if(h.length>80)throw Error('字段数量超过 80 列');for(let i=1;i<table.length;i++)if(table[i].length!==h.length)throw Error('第 '+(i+1)+' 行有 '+table[i].length+' 列；表头有 '+h.length+' 列。请修正原文件后重新载入');
let counts=new Map();headers=h.map((name,i)=>{let key=name.trim()||'未命名字段 '+(i+1),n=(counts.get(key)||0)+1;counts.set(key,n);return n===1?key:key+' ('+n+')'});
rows=table.slice(1);source=label;page=0;$('csv-search').value='';
numeric=headers.map((h,i)=>({h,i})).filter(x=>{const present=rows.map(r=>r[x.i]).filter(v=>v.trim()!=='');return present.length>0&&present.every(v=>/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(v.trim()))});
$('csv-metric').innerHTML=numeric.length?numeric.map(x=>`<option value="${x.i}">${esc(x.h)}</option>`).join(''):'<option value="">无数值字段</option>';
$('csv-status').textContent='已载入 '+label+' · '+rows.length+' 行 · '+headers.length+' 列';render();}
function render(){const q=$('csv-search').value.trim().toLowerCase();visible=rows.filter(r=>!q||r.some(s=>s.toLowerCase().includes(q)));page=Math.min(page,Math.max(0,Math.ceil(visible.length/PAGE)-1));$('csv-count').textContent=fmt(visible.length);$('csv-columns').textContent=fmt(headers.length);$('csv-numeric').textContent=fmt(numeric.length);
const empty=rows.reduce((a,row)=>a+row.filter(cell=>cell.trim()==='').length,0),seen=new Set();let dup=0;rows.forEach(r=>{const key=JSON.stringify(r);if(seen.has(key))dup++;else seen.add(key)});$('csv-quality').textContent=rows.length?`空值 ${fmt(empty)} 格 · 完全重复行 ${fmt(dup)} 条 · 源数据 ${fmt(rows.length)} 行`:'尚未加载数据';
$('csv-head').innerHTML=headers.length?'<tr>'+headers.map(t=>`<th>${esc(t)}</th>`).join('')+'</tr>':'';
const sliced=visible.slice(page*PAGE,(page+1)*PAGE);$('csv-body').innerHTML=sliced.map(row=>'<tr>'+row.map(cell=>`<td>${esc(cell)}</td>`).join('')+'</tr>').join('')||'<tr><td colspan="'+Math.max(headers.length,1)+'">无符合条件的记录</td></tr>';
$('csv-rows').textContent=visible.length?`${page*PAGE+1}–${page*PAGE+sliced.length} / ${visible.length} 行（源数据 ${rows.length} 行）`:'0 条结果';
$('csv-prev').disabled=page===0;$('csv-next').disabled=(page+1)*PAGE>=visible.length;
$('csv-field-table').innerHTML=headers.map((name,i)=>{const filled=rows.filter(r=>r[i].trim()!=='').length;return `<tr><td title="${esc(name)}">${esc(name)}</td><td class="numeric">${fmt(filled)} / ${fmt(rows.length)}</td><td class="numeric">${numeric.some(v=>v.i===i)?'数值':'文本'}</td></tr>`}).join('');stats();}
function stats(){const idx=Number($('csv-metric').value);if(!$('csv-metric').value||!numeric.some(n=>n.i===idx)){$('csv-bars').innerHTML='<p class="detail-empty">无可分析数值字段</p>';$('csv-summary').textContent='';return}let numbers=visible.map(r=>r[idx].trim()).filter(v=>v!=='').map(Number).filter(Number.isFinite);if(!numbers.length){$('csv-bars').innerHTML='<p class="detail-empty">当前筛选中没有有效数值</p>';$('csv-summary').textContent='无有效数值';return}
const lo=Math.min(...numbers),hi=Math.max(...numbers),med=median(numbers),mean=numbers.reduce((a,b)=>a+b,0)/numbers.length;
$('csv-summary').textContent=`有效 ${numbers.length} 项 · 中位数 ${fmt(med)} · 均值 ${fmt(mean)} · 最小 ${fmt(lo)} · 最大 ${fmt(hi)}`;
const bins=new Array(6).fill(0);for(const n of numbers){const bucket=lo===hi?0:Math.min(5,Math.floor((n-lo)/(hi-lo)*6));bins[bucket]++}const top=Math.max(1,...bins);$('csv-bars').innerHTML=bins.map((count,i)=>{let l=lo+(hi-lo)*i/6,u=lo+(hi-lo)*(i+1)/6,label=lo===hi?(i===0?fmt(lo):'—'):`${fmt(l)}–${fmt(u)}`;return `<div class="detail-bar"><span class="bar-name" title="${label}">${label}</span><span class="track"><span class="fill" style="width:${100*count/top}%"></span></span><span class="value">${count}</span></div>`}).join('');}
$('csv-metric').addEventListener('change',stats);$('csv-search').addEventListener('input',()=>{page=0;render()});$('csv-prev').addEventListener('click',()=>{if(page>0){page--;render()}});$('csv-next').addEventListener('click',()=>{if((page+1)*PAGE<visible.length){page++;render()}});
$('csv-demo').addEventListener('click',async()=>{try{$('csv-status').textContent='读取 GitHub 公开数据中…';let r=await fetch('../data/github_repos_snapshot.json',{cache:'no-store'});if(!r.ok)throw Error('HTTP '+r.status);let data=await r.json();if(!Array.isArray(data.records)||!data.records.length)throw Error('数据为空');const fields=['repo','stars','forks','open_items','language','category'];setup(toCSV(fields,data.records.map(row=>fields.map(k=>k==='open_items'?row.issues:row[k]))),'GitHub 官方 API · '+data.collected_on)}catch(e){$('csv-status').textContent='读取失败：'+e.message}});
$('csv-file').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>8*1024*1024)throw Error('文件超过 8 MB');setup(await file.text(),file.name)}catch(error){$('csv-status').textContent='CSV 读取失败：'+error.message}e.target.value=''});
$('csv-reset').addEventListener('click',()=>{headers=[];rows=[];visible=[];numeric=[];page=0;source='';$('csv-search').value='';$('csv-metric').innerHTML='<option value="">请先载入数据</option>';$('csv-status').textContent='已清空';render()});
$('csv-export').addEventListener('click',()=>{if(!headers.length||!visible.length)return;const csv=toCSV(headers,visible);const url=URL.createObjectURL(new Blob(['\uFEFF',csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='filtered-data.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
const importLabel=document.querySelector('label[for="csv-file"]');
if(importLabel)importLabel.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();$('csv-file').click()}});
$('csv-demo').click();
})();
