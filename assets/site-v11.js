/* Shared accessible project-page navigation and theme preference. */
(() => {
 'use strict';
 const root=document.documentElement,menu=document.getElementById('menu-button'),nav=document.getElementById('site-nav'),theme=document.getElementById('theme-button'),symbol=document.getElementById('theme-symbol'),year=document.getElementById('v11-year');
 if(year)year.textContent=String(new Date().getFullYear());
 const apply=value=>{if(value==='dark')root.dataset.theme='dark';else root.removeAttribute('data-theme');if(symbol)symbol.textContent=value==='dark'?'☀':'◐';if(theme)theme.setAttribute('aria-label',value==='dark'?'切换浅色主题':'切换深色主题')};
 let preference='light';try{preference=localStorage.getItem('keji-theme')==='dark'?'dark':'light'}catch(_){}
 apply(preference);
 if(theme)theme.addEventListener('click',()=>{preference=root.dataset.theme==='dark'?'light':'dark';apply(preference);try{localStorage.setItem('keji-theme',preference)}catch(_){}});
 const close=()=>{if(!nav||!menu)return;nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','打开导航');menu.textContent='☰'};
 if(menu&&nav){
 menu.addEventListener('click',()=>{const show=!nav.classList.contains('open');nav.classList.toggle('open',show);menu.setAttribute('aria-expanded',String(show));menu.setAttribute('aria-label',show?'关闭导航':'打开导航');menu.textContent=show?'×':'☰'});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 document.addEventListener('click',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!menu.contains(e.target))close()});
 }
 const shareButton=document.getElementById('v12-copy-link');
 if(shareButton){
  const original=shareButton.textContent;
  shareButton.addEventListener('click',async()=>{
   const link=location.origin+location.pathname+location.search+location.hash;
   try{
    if(!navigator.clipboard?.writeText)throw Error('clipboard unavailable');
    await navigator.clipboard.writeText(link);
    shareButton.textContent='链接已复制 ✓';
    shareButton.setAttribute('aria-label','已复制当前项目链接');
   }catch(error){
    const field=document.createElement('textarea');field.value=link;field.setAttribute('readonly','');
    field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();
    try{
      if(!document.execCommand('copy'))throw Error('copy failed');
      shareButton.textContent='链接已复制 ✓';
    }catch(_){shareButton.textContent='复制失败，请使用地址栏';}
    field.remove();
   }
   const state=shareButton.textContent;
   setTimeout(()=>{if(shareButton.textContent===state){shareButton.textContent=original;shareButton.setAttribute('aria-label','复制当前项目链接')}},2300);
  });
 }
 const header=document.getElementById('detail-header');
 const onScroll=()=>{if(header)header.classList.toggle('scrolled',scrollY>20)};
 onScroll();addEventListener('scroll',onScroll,{passive:true});
})();