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
  var more=document.querySelector('.more-menu');
  if(!more)return;
  var summary=more.querySelector('summary');
  function close(refocus){if(more.open){more.open=false;if(refocus)summary.focus();}}
  document.addEventListener('click',function(e){if(!more.contains(e.target))close(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close(true);});
  more.addEventListener('focusout',function(e){if(e.relatedTarget&&!more.contains(e.relatedTarget))close(false);});
})();
