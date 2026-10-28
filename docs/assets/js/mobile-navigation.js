/* Reuse the theme's menu button and handlers; move only its mobile placement. */
(() => {
 const button=document.getElementById('menu-button'),panel=document.getElementById('site-nav'),wrap=document.querySelector('.main-content-wrap');
 if(!button||!panel||!wrap)return;
 const header=button.parentNode,marker=document.createComment('desktop menu position');header.insertBefore(marker,button);
 let crumb=wrap.querySelector('.breadcrumb-nav');
 if(!crumb){
  crumb=document.createElement('nav');crumb.className='breadcrumb-nav';crumb.setAttribute('aria-label','パンくずリスト');
  const list=document.createElement('ol');list.className='breadcrumb-nav-list';
  const first=document.createElement('li');first.className='breadcrumb-nav-list-item';const home=document.createElement('a');home.href=header.querySelector('.site-title').href;home.textContent='ホーム';first.append(home);
  const last=document.createElement('li');last.className='breadcrumb-nav-list-item';const current=document.createElement('span');current.textContent=document.querySelector('main h1')?.innerText.trim()||document.title;current.setAttribute('aria-current','page');last.append(current);list.append(first,last);crumb.append(list);crumb.hidden=true;
 }
 const generated=crumb.hidden,tools=document.createElement('div');tools.className='breadcrumb-tools';if(crumb.parentNode)crumb.before(tools);else wrap.prepend(tools);tools.append(crumb);
 button.setAttribute('aria-label','メニューを開閉');button.setAttribute('aria-controls','site-nav');
 const mq=matchMedia('(max-width:49.99rem)');
 function position(){if(mq.matches)panel.style.setProperty('--menu-panel-top',Math.max(108,tools.getBoundingClientRect().bottom)+'px');else panel.style.removeProperty('--menu-panel-top');}
 function layout(){if(mq.matches){tools.append(button);if(generated)crumb.hidden=false;}else{marker.after(button);if(generated)crumb.hidden=true;}position();}
 layout();mq.addEventListener('change',layout);button.addEventListener('click',position);addEventListener('resize',position);addEventListener('scroll',()=>{if(button.getAttribute('aria-expanded')==='true')position()},{passive:true});
 addEventListener('keydown',e=>{if(e.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){button.click();button.focus();}});
})();
