(function(){
  var more=document.querySelector('.more-menu');
  if(!more)return;
  var summary=more.querySelector('summary');
  function close(refocus){if(more.open){more.open=false;if(refocus)summary.focus();}}
  document.addEventListener('click',function(e){if(!more.contains(e.target))close(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close(true);});
  more.addEventListener('focusout',function(e){if(e.relatedTarget&&!more.contains(e.relatedTarget))close(false);});
})();
