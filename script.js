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

  // Covers show the actual project interfaces captured during execution.
  const coverFor = p => 'assets/covers/' + p.id + '.svg';
  const grid = $('#project-grid');
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  function render(category='all'){
    const list=data.projects.filter(p=>category==='all'||p.category===category);
    grid.innerHTML=list.map(p=>`<a class="project-card" href="${esc(p.href)}" data-category="${esc(p.category)}" aria-label="查看 ${esc(p.title)} 项目">
      <div class="project-cover tint-${esc(p.tint)}"><img src="${coverFor(p)}" alt="${esc(p.title)} 的应用界面预览" width="960" height="540" loading="lazy" decoding="async"></div>
      <div class="project-meta"><span>${esc(p.num)} / ${esc(categoryNames[p.category])}</span><span>2026</span></div>
      <h3>${esc(p.title)}</h3><p class="project-sub">${esc(p.subtitle)}</p>
      <p class="project-desc">${esc(p.description)}</p>
      <div class="project-bottom"><div class="tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><span class="project-arrow" aria-hidden="true">↗</span></div>
    </a>`).join('');
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