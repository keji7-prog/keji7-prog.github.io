(() => {
  'use strict';
  const data = window.KEJI_PORTFOLIO;
  const $ = (selector) => document.querySelector(selector);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  $('#name-cn').textContent = data.name;
  $('#headline').textContent = data.headline;
  $('#summary').textContent = data.summary;
  $('#about-copy').textContent = data.about;
  $('#skills').innerHTML = data.skills.map(s=>`<span>${esc(s)}</span>`).join('');
  $('#project-count').textContent = String(data.projects.length).padStart(2,'0');
  $('#year').textContent = String(new Date().getFullYear());
  const categoryNames = {data:'数据分析',crawler:'网页采集',apps:'应用工具',creative:'交互作品'};

  // Thumbnail illustrations are authored UI — not stock imagery or copied screenshots.
  function artwork(p){
    switch(p.art){
      case 'github':return `<div class="art-ui repo-ui"><div class="art-line"><span class="mini-icon">◈</span> github / api <span class="tiny-right">DATA</span></div><div class="metric-emphasis">12 <small>repositories</small></div><div class="spark-bars">${[38,73,55,84,62,100,48,78,46,66].map(h=>`<i style="height:${h}%"></i>`).join('')}</div></div>`;
      case 'housing':return `<div class="art-ui housing-ui"><div class="art-line">PROPERTY DATA <span class="tiny-right">30 RECORDS</span></div><div class="housing-lines"><span>01</span><b></b><i></i><span>02</span><b></b><i></i><span>03</span><b></b><i></i></div><div class="housing-bottom"><span>□ □ ◧ ◨</span><strong>DATA / ANALYSIS</strong></div></div>`;
      case 'csv':return `<div class="art-ui csv-ui"><div class="art-line">CSV / EXPLORER <span class="tiny-right">.csv</span></div><div class="fake-table"><span>repo</span><span>stars</span><span>forks</span><span>python/cpython</span><b>78,142</b><span>36,531</span><span>pandas-dev/pandas</span><b>50,560</b><span>20,736</span><span>fastapi/fastapi</span><b>104,602</b><span>10,207</span></div></div>`;
      case 'desktop': case 'calculator': return `<div class="art-ui calculator-ui"><div class="calc-top"><small>${p.art==='desktop'?'PYTHON / TKINTER':'WEB CALCULATOR'}</small><span>● ● ●</span></div><div class="calc-result">12 + 30 <strong>42</strong></div><div class="calc-keys">${['7','8','9','÷','4','5','6','×','1','2','3','−'].map(x=>`<span>${x}</span>`).join('')}</div></div>`;
      case 'timer':return `<div class="art-ui timer-ui"><div class="art-line">FOCUS SESSION <span class="tiny-right">● ACTIVE</span></div><div class="timer-circle"><span>25:00<small>FOCUS TIME</small></span></div></div>`;
      case 'notes':return `<div class="art-ui notes-ui"><div class="art-line">QUICK NOTES <span class="tiny-right">TXT ↗</span></div><div class="note-paper"><strong>Things to do</strong><span>✓　Review data</span><span>□　Prepare charts</span><span>□　Refine interface</span></div></div>`;
      case 'cleaner':return `<div class="art-ui cleaner-ui"><div class="art-line">TEXT PROCESSOR <span class="tiny-right">CLEAN ✓</span></div><div class="text-flow"><div><span>alpha</span><span>alpha</span><span>beta</span><span>gamma</span></div><b>→</b><div class="clean"><span>alpha</span><span>beta</span><span>gamma</span></div></div></div>`;
      case 'cards':return `<div class="art-ui cards-ui"><div class="art-line">RANDOM / GENERATOR <span class="tiny-right">01–10</span></div><div class="play-cards"><span>★</span><span>✦</span><span>◆</span></div></div>`;
      default:return `<div class="art-ui"><div class="metric-emphasis">${esc(p.num)}</div></div>`;
    }
  }
  const grid = $('#project-grid');
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  function render(category='all'){
    const list=data.projects.filter(p=>category==='all'||p.category===category);
    grid.innerHTML=list.map(p=>`<article class="project-card" data-category="${esc(p.category)}">
      <a class="project-cover tint-${esc(p.tint)}" href="${esc(p.href)}" aria-label="打开 ${esc(p.title)}">${artwork(p)}</a>
      <div class="project-meta"><span>${esc(p.num)} / ${esc(categoryNames[p.category])}</span><span>2026</span></div>
      <h3><a href="${esc(p.href)}">${esc(p.title)}</a></h3><p class="project-sub">${esc(p.subtitle)}</p>
      <p class="project-desc">${esc(p.description)}</p>
      <div class="project-bottom"><div class="tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><a class="project-arrow" href="${esc(p.href)}" aria-label="查看 ${esc(p.title)}">↗</a></div>
    </article>`).join('');
    $('#result-count').textContent=`${list.length} projects`;
  }
  filterButtons.forEach(button=>button.addEventListener('click',()=>{
    filterButtons.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    render(button.dataset.filter);
  }));
  render();
  const menu=$('#menu-button'),nav=$('#site-nav');
  menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
  const themeBtn=$('#theme-button');
  try{const saved=localStorage.getItem('keji-theme');if(['light','dark'].includes(saved))document.documentElement.dataset.theme=saved;}catch(e){}
  themeBtn.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('keji-theme',next)}catch(e){}});
  let scheduled=false;window.addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{const full=Math.max(1,document.documentElement.scrollHeight-innerHeight);$('#progress-inner').style.width=(scrollY/full*100)+'%';$('#header').classList.toggle('scrolled',scrollY>20);scheduled=false;})},{passive:true});
})();