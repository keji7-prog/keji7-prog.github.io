(()=>{'use strict';const $=id=>document.getElementById(id),fmt=x=>Number(x).toLocaleString('zh-CN',{maximumFractionDigits:2});
let data=null;
function bars(id,entries,max){document.getElementById(id).innerHTML=entries.map(r=>`<div class="detail-bar"><span class="bar-name">${r.name}</span><span class="track"><span class="fill" style="width:${(100*r.value/Math.max(1,max)).toFixed(1)}%"></span></span><span class="value">${fmt(r.value)}</span></div>`).join('')}
function render(){if(!data)return;const group=$('housing-group').value;const rows=group==='all'?data.groups:data.groups.filter(g=>g.room===group);
const selected=group==='all'?null:rows[0];
$('housing-rows').textContent=selected?fmt(selected.records):fmt(data.records);
$('housing-median').textContent=selected?fmt(selected.median_price_wan):fmt(data.median_total_wan);
$('housing-area').textContent=selected?fmt(selected.median_area_sqm):fmt(data.median_area_sqm);
$('housing-unit').textContent=selected?fmt(selected.median_unit_yuan):fmt(data.median_unit_yuan);
$('housing-label').textContent=group==='all'?'全部房源':group;
const allRooms=data.groups.map(g=>({name:g.room,value:g.records}));bars('housing-rooms',allRooms,Math.max(...allRooms.map(x=>x.value)));
const roomPrices=data.groups.filter(g=>group==='all'||g.room===group).map(g=>({name:g.room,value:g.median_price_wan}));bars('housing-price-room',roomPrices,Math.max(...data.groups.map(g=>g.median_price_wan)));
$('housing-group-rows').innerHTML=rows.map(g=>`<tr><td>${g.room}</td><td class="numeric">${fmt(g.records)}</td><td class="numeric">${fmt(g.median_price_wan)}</td><td class="numeric">${fmt(g.median_area_sqm)}</td><td class="numeric">${fmt(g.median_unit_yuan)}</td></tr>`).join('');
$('housing-data-note').textContent=selected&&selected.records===1?'当前户型只有一条记录，相关中位数等于该条记录的数值。':'采集时间：2026-11-10 13:17（北京时间） · 北京二手房列表页';
}
fetch('data/housing_aggregate_v8.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(j=>{if(j.records!==30||!Array.isArray(j.groups)||j.groups.reduce((a,g)=>a+g.records,0)!==30)throw Error('数据验证失败');data=j;const sel=$('housing-group');sel.innerHTML='<option value="all">全部户型</option>'+j.groups.map(g=>`<option value="${g.room}">${g.room}</option>`).join('');sel.addEventListener('change',render);render()}).catch(e=>{$('housing-data-note').textContent='无法读取统计结果：'+e.message});
})();