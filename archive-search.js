/* TMS archive search and topic filters. Progressive enhancement: without JS the full list still shows. */
(function () {
  var list = document.querySelector('.archive-list');
  if (!list) return;
  var cards = Array.prototype.slice.call(list.querySelectorAll('.archive-card'));
  var TOPICS = [
    ['Civil rights', /civil rights|racis|race|equal|discriminat|fair housing|affirmative|reconstruction|profiling|black/i],
    ['History', /history|histor|reconstruction|slavery|constitution|memory|segregation/i],
    ['Work', /\bwork|labor|employ|wage|hiring|retaliat|union|paycheck|workers/i],
    ['Health', /health|medicare|medicaid|care\b|mental|disease|veteran|va care/i],
    ['Education', /educat|school|student|college|children|absentee/i],
    ['Accountability', /accountab|oversight|audit|spending|corrupt|receipt|transparen/i],
    ['Germany', /german|deutsch|grundgesetz|AfD/i],
    ['United States', /united states|america|u\.s\.|federal|supreme court|congress|medicare|medicaid|black america/i]
  ];
  var bar = document.createElement('div');
  bar.className = 'archive-tools';
  bar.innerHTML =
    '<label class="sr-only" for="archive-q">Search stories</label>' +
    '<input id="archive-q" type="search" placeholder="Search: housing, wages, Germany…" autocomplete="off">' +
    '<div class="archive-chips" role="group" aria-label="Filter by topic"></div>' +
    '<p class="archive-count" role="status" aria-live="polite"></p>';
  list.parentNode.insertBefore(bar, list);
  var chips = bar.querySelector('.archive-chips'), q = bar.querySelector('#archive-q'), count = bar.querySelector('.archive-count');
  var active = '';
  var data = cards.map(function (c) {
    var meta = (c.querySelector('.story-meta') || {}).textContent || '';
    var title = (c.querySelector('h2') || {}).textContent || '';
    var text = (meta + ' ' + title + ' ' + c.textContent).replace(/\s+/g, ' ').toLowerCase();
    var topics = TOPICS.filter(function (t) { return t[1].test(meta + ' ' + title); }).map(function (t) { return t[0]; });
    return { el: c, text: text, topics: topics };
  });
  function chip(label) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = label; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () {
      active = (active === label || label === 'All') ? '' : label;
      update();
    });
    chips.appendChild(b); return b;
  }
  var btns = [chip('All')].concat(TOPICS.map(function (t) { return chip(t[0]); }));
  function update() {
    var terms = q.value.toLowerCase().split(/\s+/).filter(Boolean), shown = 0;
    data.forEach(function (d) {
      var ok = terms.every(function (t) { return d.text.indexOf(t) > -1; }) && (!active || d.topics.indexOf(active) > -1);
      d.el.hidden = !ok; if (ok) shown++;
    });
    btns.forEach(function (b) { b.setAttribute('aria-pressed', String((b.textContent === 'All' && !active) || b.textContent === active)); });
    count.textContent = shown === data.length ? data.length + ' stories' : shown + ' of ' + data.length + ' stories' + (shown ? '' : ' — try fewer words or choose All');
  }
  q.addEventListener('input', update);
  update();
})();
