(()=>{"use strict";
const items=[["gpu","GPU Pricing Research","显卡官方价格研究"],["freelance","Freelance Demand Atlas","历史自由职业需求图谱"],["notes-feed","Notes Atlas","笔记发现与整理"],["wheel","Chance Lab","可编辑概率转盘"],["affinity","Connection Studio","双人兴趣默契实验"],["gallery","Field of View","独立摄影图库"],["music","Waveform","本地音乐播放器"],["gacha","Hero Archive","英雄盲盒与收藏"],["zodiac","Celestial Atlas","星座文化互动罗盘"],["wall3d","Memory Orbit","3D 照片回忆墙"],["video","FrameLab","浏览器短视频工坊"],["rap","Rhythm Stage","原创节奏与文字舞台"],["engagement","Content Checklist","社媒内容检查台"],["monitor","Price Watch","多来源显卡价格观察"],["editor","Draft Studio","Markdown 文章工作台"],["housing","Beijing Housing Study","北京房源样本研究"],["csv","Data Observatory","CSV 与开源仓库分析"],["ai","Human × AI Workflow","人机协作流程设计"],["tribute","Personal Tribute","个人主题纪念页"]];
const page=(location.pathname.split("/").pop()||"").replace(/\.html$/i,"");
const index=items.findIndex(item=>item[0]===page);
if(index<0||!document.body)return;
const entry=items[index],prior=items[(index+items.length-1)%items.length],next=items[(index+1)%items.length];
const bar=document.createElement("nav");bar.className="jk-hub";bar.setAttribute("aria-label","JK 作品集项目导航");
bar.innerHTML='<div class="jk-hub-inner"><a class="jk-hub-brand" href="../index.html#work" aria-label="返回 JK 作品集首页"><b>JK.</b><span>INTERACTIVE WORK</span></a><div class="jk-hub-current"><span class="jk-hub-index">'+String(index+1).padStart(2,"0")+' / '+items.length+'</span><strong></strong></div><div class="jk-hub-tools"><select class="jk-hub-navselect" aria-label="跳转到其他项目"></select><a class="jk-hub-btn jk-hub-prev" title="上一个项目">←</a><a class="jk-hub-btn jk-hub-next" title="下一个项目">→</a><a class="jk-hub-btn jk-hub-btn--all" href="../index.html#work" aria-label="返回全部作品">全部项目</a></div></div>';
bar.querySelector(".jk-hub-current strong").textContent=entry[1]+" · "+entry[2];
const select=bar.querySelector("select");for(const [k,name,cn]of items){const option=document.createElement("option");option.value=k;option.textContent=name+" / "+cn;option.selected=k===page;select.appendChild(option)}
select.addEventListener("change",()=>{const name=select.value;if(items.some(i=>i[0]===name))location.assign(name+".html")});
bar.querySelector(".jk-hub-prev").href=prior[0]+".html";bar.querySelector(".jk-hub-prev").setAttribute("aria-label","上一个项目："+prior[2]);
bar.querySelector(".jk-hub-next").href=next[0]+".html";bar.querySelector(".jk-hub-next").setAttribute("aria-label","下一个项目："+next[2]);
document.body.insertBefore(bar,document.body.firstChild);

})();
