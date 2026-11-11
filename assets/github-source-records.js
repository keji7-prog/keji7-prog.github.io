(()=>{
"use strict";
const root=document.getElementById("jk-snapshot-archive");
if(!root)return;
const script=document.currentScript;
const dataURL=new URL("../data/github_repos_snapshot.json",script.src);
const el=id=>root.querySelector("[data-jk="+id+"]");
const safe=s=>String(s??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
const num=n=>Number(n).toLocaleString("zh-CN",{maximumFractionDigits:0});
const validName=x=>/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(x);
let source=null,records=[];
function card(r){
 const repo=r.repo,link="https://github.com/"+encodeURI(repo),api="https://api.github.com/repos/"+encodeURI(repo);
 const record=JSON.stringify(r,null,2);
 return '<article class="jk-repo-card"><div class="jk-repo-top"><a class="jk-repo-name" target="_blank" rel="noopener noreferrer" href="'+safe(link)+'">'+safe(repo)+' ↗</a><span class="jk-repo-category">'+safe(r.category)+'</span></div>'+
 '<p class="jk-repo-description">'+safe(r.description)+'</p>'+
 '<div class="jk-repo-metrics"><div><small>Stars</small><strong>'+num(r.stars)+'</strong></div><div><small>Forks</small><strong>'+num(r.forks)+'</strong></div><div><small>Open Items</small><strong>'+num(r.issues)+'</strong></div></div>'+
 '<div class="jk-repo-dates"><span><small>主要语言</small><b>'+safe(r.language||"未指定")+'</b></span><span><small>技术分类（作品集标注）</small><b>'+safe(r.category)+'</b></span><span><small>GitHub created_at（UTC）</small>'+safe(r.created_at)+'</span><span><small>GitHub pushed_at（UTC）</small>'+safe(r.pushed_at)+'</span></div>'+
 '<div class="jk-repo-footer"><a href="'+safe(api)+'" target="_blank" rel="noopener noreferrer">官方 API 仓库地址 ↗</a><details><summary>展开归档的全部 9 个字段</summary><pre>'+safe(record)+'</pre></details></div></article>';
}
function render(){
 const q=el("search").value.trim().toLocaleLowerCase();
 const category=el("category").value,order=el("sort").value;
 records=source.records.filter(r=>(!category||r.category===category)&&(!q||[r.repo,r.description,r.language,r.category,r.created_at,r.pushed_at].some(x=>String(x??"").toLocaleLowerCase().includes(q))));
 if(order!=="original"){
 const key=order==="stars"?"stars":order==="forks"?"forks":order==="issues"?"issues":"repo";
 records.sort((a,b)=>key==="repo"?a.repo.localeCompare(b.repo,"en"):b[key]-a[key]);
 }
 el("cards").innerHTML=records.length?records.map(card).join(""):'<p class="jk-source-empty">没有符合当前筛选条件的仓库记录。</p>';
 el("count").textContent="显示 "+records.length+" / "+source.records.length+" 个原始仓库观测。所有数值都来自 2026-11-10 的归档快照。";
}
el("search").addEventListener("input",()=>source&&render());
el("category").addEventListener("change",()=>source&&render());
el("sort").addEventListener("change",()=>source&&render());
fetch(dataURL,{cache:"no-store"}).then(resp=>{if(!resp.ok)throw Error("HTTP "+resp.status);return resp.json()}).then(json=>{
 if(!Array.isArray(json.records)||json.records.length!==12||!/^\d{4}-\d{2}-\d{2}$/.test(json.collected_on||""))throw Error("历史快照数量或日期不符合归档记录");
 const fields=["repo","description","stars","forks","issues","language","created_at","pushed_at","category"];
 if(!json.records.every(r=>fields.every(k=>Object.prototype.hasOwnProperty.call(r,k))&&validName(r.repo)&&[r.stars,r.forks,r.issues].every(Number.isFinite)))throw Error("仓库字段不完整，无法显示原始归档");
 if(new Set(json.records.map(r=>r.repo)).size!==12)throw Error("仓库名称重复");
 source=json;
 el("meta").innerHTML='<span><b>'+json.records.length+'</b> 项实际仓库</span><span>GitHub REST API · '+safe(json.collected_on)+'</span><span>每条记录 '+fields.length+' 个字段</span>';
 el("raw").href=dataURL.href;
 const categories=[...new Set(json.records.map(r=>r.category))].sort((a,b)=>a.localeCompare(b,"zh-CN"));
 el("category").innerHTML='<option value="">所有技术分类</option>'+categories.map(x=>'<option value="'+safe(x)+'">'+safe(x)+'</option>').join("");
 render();
}).catch(error=>{el("count").textContent="快照加载失败："+error.message;el("cards").innerHTML='<p class="jk-source-empty">原始归档暂时无法读取，不填充虚构样本。请检查网站资源加载。</p>'});
})();