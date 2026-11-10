(()=>{'use strict';const $=id=>document.getElementById(id);if(!$('app-calculator'))return;
// The core applications remain self-contained. The following controls operate on their actual outputs.
const fmt=v=>Number(v).toLocaleString('zh-CN');
let calculations=[];
const history=$('calc-log');
function renderHistory(){history.innerHTML=calculations.length?calculations.map((s,i)=>`<li><span>${s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}</span></li>`).join(''):'<li class="v13-muted">尚无完成的计算</li>'}
renderHistory();
// Prevent unbounded expressions before the original button handler receives input.
$('calc-keys').addEventListener('click',e=>{const btn=e.target.closest('[data-key]');if(!btn)return;const key=btn.dataset.key,display=$('calc-display').textContent;if(!['C','⌫','='].includes(key)&&display.length>=100){e.stopImmediatePropagation();$('calc-history').textContent='表达式最多 100 个字符';}},true);
$('calc-keys').addEventListener('click',e=>{const btn=e.target.closest('[data-key]');if(btn?.dataset.key!=='=')return;const result=$('calc-history').textContent;if(!/^.*\s=\s[-+\d.]/.test(result))return;if(calculations[0]!==result)calculations.unshift(result);calculations=calculations.slice(0,10);renderHistory()});
$('calc-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('calc-display').textContent);$('calc-history').textContent+=' · 已复制结果'}catch{$('calc-history').textContent+=' · 请手动复制'}});
$('calc-clear-history').addEventListener('click',()=>{calculations=[];renderHistory()});
// Report only sessions actually completed, not starts, stops, or resets.
let completed=0,focusMinutes=0,planned=25;
const observed=new MutationObserver(()=>{if($('timer-msg').textContent.trim()!=='倒计时完成！')return;completed++;focusMinutes+=planned;$('timer-completed').textContent=fmt(completed);$('timer-minutes').textContent=fmt(focusMinutes);});
observed.observe($('timer-msg'),{childList:true,characterData:true,subtree:true});
document.querySelectorAll('[data-duration]').forEach(b=>b.addEventListener('click',()=>planned=Number(b.dataset.duration)));
$('custom-go').addEventListener('click',()=>{const n=Number($('custom-min').value);if(Number.isInteger(n)&&n>=1&&n<=180)planned=n});
// Current note lives in localStorage; show precise content metrics and allow TXT import.
function noteStats(){const s=$('note-body').value;const lines=s?s.split(/\r?\n/).length:0;$('note-metrics').textContent=`${fmt(s.length)} 个字符 · ${fmt(lines)} 行`}
$('note-body').addEventListener('input',noteStats);noteStats();
$('note-file').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>512*1024)throw Error('TXT 文件不能超过 512 KB');$('note-body').value=await file.text();$('note-body').dispatchEvent(new Event('input',{bubbles:true}));$('note-status').textContent='TXT 已导入，并保存在此浏览器';noteStats()}catch(error){$('note-status').textContent='导入失败：'+error.message}finally{e.target.value=''}});
$('note-clear').addEventListener('click',noteStats);
// Mirror the actual draw results into an auditable session distribution.
const weights=[['传说',4],['史诗',16],['稀有',30],['普通',50]];
$('draw-probabilities').innerHTML=weights.map(([name,weight])=>`<div class="v13-prob"><span>${name}</span><span class="v13-track"><i style="width:${weight}%"></i></span><b>${weight}%</b></div>`).join('');
let events=[];
function afterDraw(){const total=Number($('draw-count').textContent)||0;if(total===0){events=[];updateDraw();return}const newEntries=[...$('draw-results').querySelectorAll('.draw-card')].map(e=>({name:e.querySelector('h3')?.textContent||'',rarity:e.querySelector('.draw-rarity')?.textContent||''}));let missing=Math.max(0,total-events.length);events.push(...newEntries.slice(-missing));updateDraw()}
function updateDraw(){const count=events.length;$('draw-breakdown').textContent=weights.map(([name,weight])=>`${name} ${events.filter(e=>e.rarity===name).length}（${count?(100*events.filter(e=>e.rarity===name).length/count).toFixed(1)+'%':'0%'}）`).join(' · ')}
const drawObserver=new MutationObserver(afterDraw);drawObserver.observe($('draw-results'),{childList:true,subtree:false});updateDraw();
$('draw-export').addEventListener('click',()=>{if(!events.length){$('draw-breakdown').textContent='当前会话还没有记录可导出';return}const csv=['序号,卡片,稀有度',...events.map((e,i)=>`${i+1},"${e.name.replace(/"/g,'""')}","${e.rarity.replace(/"/g,'""')}"`)].join('\r\n');download(csv,'card-draws.csv','text/csv;charset=utf-8')});
function download(content,name,type){const a=document.createElement('a'),url=URL.createObjectURL(new Blob(['\uFEFF',content],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
// Optional case-insensitive deduplication extends the existing deterministic cleaner.
function alternateClean(){const src=$('text-input').value.split(/\r?\n/),seen=new Set();const result=[];for(const row of src){const s=row.trim(),key=s.toLocaleLowerCase();if(!s||seen.has(key))continue;seen.add(key);result.push(s)}const out=result.join('\n'),word=$('text-keyword').value;const occurrences=word?(out.toLocaleLowerCase().split(word.toLocaleLowerCase()).length-1):0;$('text-output').value=out;$('text-stats').textContent=`输入 ${src.length} 行 → 输出 ${result.length} 行 · 删除 ${src.length-result.length} 行`+(word?` · “${word}” ${occurrences} 次`:'');return out}
$('text-clean').addEventListener('click',event=>{if(!$('text-ignore-case').checked)return;event.stopImmediatePropagation();alternateClean()},true);
$('text-keyword').addEventListener('input',()=>{if($('text-ignore-case').checked&&$('text-output').value)alternateClean()});
$('text-ignore-case').addEventListener('change',()=>{if($('text-input').value)$('text-clean').click()});
$('text-download').addEventListener('click',()=>{if($('text-ignore-case').checked&&!$('text-output').value)alternateClean()},true);
$('text-clear').addEventListener('click',()=>{$('text-ignore-case').checked=false});
})();
