(function(){
  /* Topic colours: tag cards and topic links by subject so CSS can colour them. */
  var rules=[[/democracy|government|justice|law|accountab|civic|election|midterm|military|police|courts|voting/i,'red'],
    [/race|equal humanity|history|black|excellence|flowers|inventor|missing history/i,'blue'],
    [/seat filled|positive|good news|global health|health|science|innovation|mental|neurodiv|world affairs|human rights|a seat was made/i,'green'],
    [/consumer|money|economic|work|wages|germany|children|famil|rights|housing|credit|debt|workers/i,'gold']];
  function tone(t){for(var i=0;i<rules.length;i++){if(rules[i][0].test(t))return rules[i][1]}return 'red'}
  var sel=document.querySelectorAll('.archive-card,.cards article,.resource-entry,.topic-grid a');
  for(var i=0;i<sel.length;i++){var el=sel[i];var lab=el.querySelector('.story-meta,.eyebrow,strong,h3');
    el.setAttribute('data-tone',tone(lab?lab.textContent:el.textContent.slice(0,80)))}
})();
(function(){
  /* "Deutsch" button: opens this page in Google's translated view (user-initiated link, nothing is loaded from Google until it is clicked). */
  var h=location.hostname;
  if(h==='themissingseat.org'||h==='www.themissingseat.org'||h==='localhost'||h==='127.0.0.1'){
    var header=document.querySelector('.site-header');
    if(header&&!header.querySelector('.lang-switch')){
      var host=(h==='localhost'||h==='127.0.0.1')?'themissingseat.org':'themissingseat.org';
      var a=document.createElement('a');
      a.className='lang-switch';
      a.lang='de';
      a.innerHTML='<span class="ls-long">Deutsch</span><span class="ls-short" aria-hidden="true">DE</span>';
      a.rel='nofollow noopener';
      a.title='Diese Seite auf Deutsch lesen (automatische Übersetzung durch Google)';
      a.setAttribute('aria-label','Diese Seite auf Deutsch lesen, automatische Übersetzung durch Google');
      a.href='https://'+host.replace(/\./g,'-')+'.translate.goog'+location.pathname+(location.search?location.search+'&':'?')+'_x_tr_sl=en&_x_tr_tl=de&_x_tr_hl=de&_x_tr_pto=wapp'+location.hash;
      var mm=header.querySelector('.mobile-menu');
      if(mm)header.insertBefore(a,mm);else header.appendChild(a);
    }
  }
})();
(function(){
  /* Dismissible <details> menus: outside click, Escape (with refocus), and focus leaving the menu all close it. Applies to both the desktop "More" menu and the mobile menu. */
  var menus=document.querySelectorAll('.more-menu,.mobile-menu');
  if(!menus.length)return;
  var instances=[];
  for(var i=0;i<menus.length;i++){
    (function(el){
      var summary=el.querySelector('summary');
      function close(refocus){if(el.open){el.open=false;if(refocus)summary.focus();}}
      el.addEventListener('focusout',function(e){if(e.relatedTarget&&!el.contains(e.relatedTarget))close(false);});
      instances.push({el:el,close:close});
    })(menus[i]);
  }
  document.addEventListener('click',function(e){
    for(var i=0;i<instances.length;i++){if(!instances[i].el.contains(e.target))instances[i].close(false);}
  });
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape')return;
    for(var i=0;i<instances.length;i++){if(instances[i].el.open){instances[i].close(true);break;}}
  });
})();
(function(){
  var mm=document.querySelector('.mobile-menu');
  if(!mm)return;
  var summary=mm.querySelector('summary');
  function close(refocus){if(mm.open){mm.open=false;if(refocus&&summary)summary.focus();}}
  document.addEventListener('click',function(e){if(!mm.contains(e.target))close(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close(true);});
})();
