(()=>{
"use strict";
const $=id=>document.getElementById(id);
const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const fmt=(v,dp=0)=>Number(v).toLocaleString("zh-CN",{maximumFractionDigits:dp});
const median=arr=>{const a=arr.filter(Number.isFinite).sort((x,y)=>x-y);return a.length?(a[Math.floor((a.length-1)/2)]+a[Math.floor(a.length/2)])/2:NaN};
let data=null,shown=[],state={keyword:"",room:"all",max:"all",minArea:0,sort:"original"};
function roomOf(row){return Number(row["描述"].match(/([1-9])室/)?.[1]||0)}
function areaOf(row){const m=row["描述"].match(/(\d+(?:\.\d+)?)平米/);return m?Number(m[1]):NaN}
function attentionOf(row){return Number(row["关注度"].match(/(\d+)人关注/)?.[1]||0)}
function moneyOf(row){return Number(row["总价_万元"])}
function unitOf(row){return Number(row["单价_元每平米"])}
function compute(){
 const q=state.keyword.trim().toLocaleLowerCase("zh-CN");
 let a=data.rows.filter(row=>{
 if(q&&![row["标题"],row["地址"],row["描述"]].some(v=>String(v).toLocaleLowerCase("zh-CN").includes(q)))return false;
 if(state.room!=="all"&&roomOf(row)!==Number(state.room))return false;
 if(state.max!=="all"&&moneyOf(row)>Number(state.max))return false;
 return !state.minArea||areaOf(row)>=state.minArea;
 });
 const order=state.sort;
 if(order!=="original"){
  const mapper=order.startsWith("price")?moneyOf:order==="area-desc"?areaOf:order==="unit-asc"?unitOf:attentionOf;
  const direction=order.endsWith("-desc")?-1:1;
  a.sort((x,y)=>direction*(mapper(x)-mapper(y)));
 }
 return a;
}
function fieldDetails(row){return '<dl class="raw-field-list">'+data.columns.map(k=>'<div><dt>'+esc(k)+'</dt><dd>'+esc(row[k])+'</dd></div>').join("")+"</dl>"}
function card(row){
 const n=row["序号"],title=row["标题"],area=areaOf(row),room=roomOf(row),price=row["总价_原文"],priceUnit=row["单价_原文"],url=row["详情网址"],image=row["图片网址"];
 const hasPhoto=image&&/^https:\/\//.test(image)&&!/\/blank\.gif(\?|$)/i.test(image);
 const validURL=/^https:\/\/bj\.ke\.com\/ershoufang\/\d+\.html$/.test(url);
 return '<article class="source-listing"><div class="source-listing-top"><strong>采集序号 '+esc(n)+'</strong><span>2026-11-10 · 历史列表</span></div>'+
 '<h3>'+esc(title)+'</h3><span class="listing-community">'+esc(row["地址"])+'</span>'+
 '<p class="source-description">'+esc(row["描述"])+'</p>'+
 (hasPhoto?'<img loading="lazy" referrerpolicy="no-referrer" src="'+esc(image)+'" alt="'+esc(title)+'的原始房源图片">':"")+
 '<div class="listing-price"><div><small>原始挂牌总价</small><strong>'+esc(price)+' <em>万元</em></strong></div><div><small>原始挂牌单价</small><b>'+esc(priceUnit)+'</b></div></div>'+
 '<div class="listing-meta"><span>'+fmt(room)+'室</span><span>'+fmt(area,2)+' m²</span><span>'+esc(row["关注度"])+'</span><span class="unavailable">'+(hasPhoto?"采集到对应图片":"未采到实际房源图片")+'</span></div>'+
 '<div class="source-listing-actions">'+(validURL?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">原始详情链接 ↗</a>':"<span>原始网址格式未通过校验</span>")+'<span style="font-size:10px;color:#78907d">采集时间 '+esc(row["采集时间"].slice(11,19))+'</span></div>'+
 '<details><summary>展开查看本条实际采集的全部 13 个字段</summary>'+fieldDetails(row)+'</details></article>';
}
function updatePresets(){
 document.querySelectorAll("[data-record-case]").forEach(btn=>{
 const k=btn.dataset.recordCase;
 const same=k==="all"?state.room==="all"&&state.max==="all"&&!state.minArea:k==="budget"?state.room==="all"&&state.max==="300"&&!state.minArea:k==="two"?state.room==="2"&&state.max==="500"&&!state.minArea:state.room==="all"&&state.max==="all"&&state.minArea===100;
 btn.classList.toggle("selected",same);btn.setAttribute("aria-pressed",String(same));
 });
}
function render(){
 if(!data)return;
 shown=compute();
 $("real-listings").innerHTML=shown.length?shown.map(card).join(""):"<p>当前条件下没有来自这次采集的房源记录。请放宽筛选条件。</p>";
 $("record-count").textContent=fmt(shown.length)+" / "+fmt(data.count);
 $("record-median").textContent=shown.length?fmt(median(shown.map(moneyOf)),2)+" 万元":"—";
 $("record-area").textContent=shown.length?fmt(median(shown.map(areaOf)),2)+" m²":"—";
 $("real-room").value=state.room;$("real-max").value=state.max;$("real-sort").value=state.sort;
 $("record-export").disabled=!shown.length;
 updatePresets();
}
function csvDownload(){
 const clean=v=>{let s=String(v??"");if(/^\s*[=+@]/.test(s)||/^\s*-(?!\d)/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'};
 const csv="\uFEFF"+[data.columns,...shown.map(row=>data.columns.map(k=>row[k]))].map(r=>r.map(clean).join(",")).join("\r\n");
 const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
 const u=URL.createObjectURL(blob);const a=document.createElement("a");
 a.href=u;a.download="JK-Beijing-housing-original-fields-2026-11-10.csv";a.click();setTimeout(()=>URL.revokeObjectURL(u),1500);
}
$("real-search").addEventListener("input",e=>{state.keyword=e.target.value;render()});
$("real-room").addEventListener("change",e=>{state.room=e.target.value;state.minArea=0;render()});
$("real-max").addEventListener("change",e=>{state.max=e.target.value;state.minArea=0;render()});
$("real-sort").addEventListener("change",e=>{state.sort=e.target.value;render()});
document.querySelectorAll("[data-record-case]").forEach(btn=>btn.addEventListener("click",()=>{
 const k=btn.dataset.recordCase;state.keyword="";state.room=k==="two"?"2":"all";state.max=k==="budget"?"300":k==="two"?"500":"all";state.minArea=k==="large"?100:0;
 $("real-search").value="";render();
}));
$("record-export").addEventListener("click",csvDownload);
fetch(new URL("../data/housing_original_listings_2026-11-10.json",document.currentScript.src),{cache:"no-store"}).then(res=>{if(!res.ok)throw Error("HTTP "+res.status);return res.json()}).then(obj=>{
 if(!Array.isArray(obj.rows)||obj.rows.length!==30||obj.columns?.length!==13||new Set(obj.rows.map(x=>x["详情网址"])).size!==30)throw Error("原始记录缺失或重复");
 if(obj.rows.some(r=>Object.keys(r).length!==13))throw Error("字段数不完整");
 data=obj;
 const med=median(obj.rows.map(moneyOf)),unit=median(obj.rows.map(unitOf)),counts=[1,2,3,4].map(room=>obj.rows.filter(r=>roomOf(r)===room).length),photos=obj.rows.filter(r=>r["图片网址"]&&!/\/blank\.gif(\?|$)/.test(r["图片网址"])).length;
 const valid=med===425&&unit===56537&&counts.join(",")==="6,14,9,1"&&photos===0;
 const msg="实际载入 "+obj.rows.length+" 条 × "+obj.columns.length+" 字段，原始详情链接 "+new Set(obj.rows.map(r=>r["详情网址"])).size+" 个；复算总价中位数 "+fmt(med)+" 万元；真实照片 "+photos+" 张。";
 $("listing-integrity").textContent=(valid?"✓ 数据与当次原始采集汇总一致。":"⚠ 采集记录复核值出现差异，请检查来源。")+msg;
 $("listing-integrity").classList.toggle("bad",!valid);
 render();
}).catch(e=>{$("listing-integrity").textContent="来源数据读取失败："+e.message;$("listing-integrity").classList.add("bad");$("real-listings").innerHTML="<p>未使用模拟房源作为替代数据。</p>"});
})();