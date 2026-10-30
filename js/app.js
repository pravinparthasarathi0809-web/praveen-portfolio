/* PRAVEEN PORTFOLIO V2 — APP CONTROLLER */
document.addEventListener("DOMContentLoaded",()=>{
  const root=document.documentElement;
  const loader=document.getElementById("siteLoader");
  window.addEventListener("load",()=>setTimeout(()=>loader?.classList.add("loaded"),450));
  const themeButton=document.getElementById("themeToggle");
  const themeIcon=themeButton?.querySelector(".theme-icon");
  const saved=localStorage.getItem("pp-theme-v2")||"dark";
  const setTheme=(theme)=>{
    root.dataset.theme=theme;
    if(themeIcon) themeIcon.textContent=theme==="dark"?"☼":"☾";
    themeButton?.setAttribute("aria-label",theme==="dark"?"Switch to light theme":"Switch to dark theme");
    localStorage.setItem("pp-theme-v2",theme);
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta) meta.content=theme==="dark"?"#1d152d":"#f2eee8";
  };
  setTheme(saved);
  themeButton?.addEventListener("click",()=>setTheme(root.dataset.theme==="dark"?"light":"dark"));

  const menu=document.getElementById("menuToggle");
  const nav=document.getElementById("navLinks");
  const closeMenu=()=>{nav?.classList.remove("open");menu?.classList.remove("active");menu?.setAttribute("aria-expanded","false");};
  menu?.addEventListener("click",()=>{
    const open=nav?.classList.toggle("open");
    menu.classList.toggle("active",!!open);
    menu.setAttribute("aria-expanded",String(!!open));
  });
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
  document.addEventListener("click",e=>{if(nav&&menu&&!nav.contains(e.target)&&!menu.contains(e.target))closeMenu();});

  const header=document.getElementById("siteHeader");
  const onScroll=()=>header?.classList.toggle("scrolled",window.scrollY>30);
  window.addEventListener("scroll",onScroll,{passive:true});onScroll();

  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls=document.querySelectorAll(".reveal");
  if(reduce||!("IntersectionObserver" in window)){revealEls.forEach(el=>el.classList.add("is-visible"));}
  else{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      entry.target.classList.toggle("is-visible",entry.isIntersecting);
    }),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
    revealEls.forEach((el,i)=>{el.style.transitionDelay=`${(i%4)*65}ms`;observer.observe(el);});
  }
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const target=document.querySelector(a.getAttribute("href"));
    if(!target)return;e.preventDefault();target.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
  }));
});
