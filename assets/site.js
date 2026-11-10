(()=>{'use strict';
const navButton=document.getElementById('mobile-btn'),nav=document.getElementById('navlinks');
if(navButton&&nav){navButton.addEventListener('click',()=>{const open=nav.classList.toggle('show');navButton.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('show');navButton.setAttribute('aria-expanded','false');}));}
const raw=window.GITHUB_REPOS;if(!raw||!document.getElementById('repo-rows'))return;
const source=raw.records||[];const fmt=(n)=>Number(n).toLocaleString('en-US');const safe=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=id=>document.getElementById(id);
$('repo-count').textContent=fmt(source.length);$('median-stars').textContent=fmt(raw.summary.median_stars);$('top-repo').textContent=raw.summary.leading_repository.split('/')[1];$('top-stars').textContent=fmt(raw.summary.leading_stars)+' stars';
const top=source.slice().sort((a,b)=>b.stars-a.stars).slice(0,8),max=top[0].stars;
$('top-bars').innerHTML=top.map(r=>`<a class="barline" target="_blank" rel="noopener noreferrer" href="https://github.com/${encodeURI(r.repo)}"><span class="barlabel">${safe(r.repo.split('/')[1])}</span><span class="barbg"><span class="barvalue" style="display:block;width:${(100*r.stars/max).toFixed(2)}%"></span></span><span class="barright">${fmt(r.stars)}</span></a>`).join('');
const groups=Object.entries(raw.summary.categories).sort((a,b)=>b[1]-a[1]);
$('category-bars').innerHTML=groups.map(([label,n])=>`<div class="catrow"><span>${safe(label)}</span><span class="catbar"><span class="catfill" style="width:${(100*n/Math.max(...groups.map(x=>x[1]))).toFixed(1)}%"></span></span><b class="catnum">${fmt(n)}</b></div>`).join('');
const search=$('repo-search'),category=$('repo-category'),sort=$('repo-sort');
function render(){const q=search.value.trim().toLowerCase(),cat=category.value,key=sort.value;let arr=source.filter(r=>(!cat||r.category===cat)&&(!q||r.repo.toLowerCase().includes(q)||r.category.toLowerCase().includes(q)));arr.sort(key==='name'?(a,b)=>a.repo.localeCompare(b.repo):(a,b)=>b[key]-a[key]||a.repo.localeCompare(b.repo));$('repo-rows').innerHTML=arr.length?arr.map(r=>`<tr><td><a class="repo-link" target="_blank" rel="noopener noreferrer" href="https://github.com/${encodeURI(r.repo)}">${safe(r.repo)} ↗</a><div class="subtext">${safe(r.language||'—')}</div></td><td>${safe(r.category)}</td><td class="num">${fmt(r.stars)}</td><td class="num">${fmt(r.forks)}</td><td class="num">${fmt(r.issues)}</td></tr>`).join(''):'<tr><td colspan="5" class="empty">没有匹配记录</td></tr>';
$('row-count').textContent=`${arr.length} / ${source.length} 条记录 · 选择仓库名称查看原始来源`;}
[search,category,sort].forEach(x=>x.addEventListener(x===search?'input':'change',render));render();
})();
