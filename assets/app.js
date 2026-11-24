/* 랑이쌤컴퓨터 학생 포트폴리오 – 메뉴, 과정 고르기, 사진 크게 보기 */
(function () {
  document.documentElement.classList.add('js');

  /* 휴대폰 메뉴 */
  var body = document.body;
  var openBtn = document.querySelector('.menu-btn');
  var side = document.getElementById('menu');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open && side) { var f = side.querySelector('a,button'); if (f) f.focus(); }
    if (!open && openBtn && document.activeElement && side && side.contains(document.activeElement)) openBtn.focus();
  }
  if (openBtn) openBtn.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  document.querySelectorAll('[data-close-menu]').forEach(function (el) {
    el.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
  });

  /* 작품 포트폴리오: 과정 고르기 */
  var tabs = document.querySelectorAll('[data-pick]');
  if (tabs.length) {
    var groups = document.querySelectorAll('[data-group]');
    function pick(k, push) {
      var found = false;
      tabs.forEach(function (b) { if (b.getAttribute('data-pick') === k) found = true; });
      if (!found) k = tabs[0].getAttribute('data-pick');
      tabs.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-pick') === k ? 'true' : 'false'); });
      groups.forEach(function (g) { g.hidden = g.getAttribute('data-group') !== k; });
      if (push) { try { history.replaceState(null, '', '#' + encodeURIComponent(k)); } catch (e) {} }
    }
    tabs.forEach(function (b) { b.addEventListener('click', function () { pick(b.getAttribute('data-pick'), true); }); });
    var h = '';
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
    pick(h, false);
    window.addEventListener('hashchange', function () {
      var k = ''; try { k = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
      pick(k, false);
    });
  }

  /* 작품 자세히: 사진 크게 보기 */
  var lb = document.querySelector('dialog.lb');
  if (lb && typeof lb.showModal === 'function') {
    var shots = Array.prototype.slice.call(document.querySelectorAll('[data-full]'));
    var img = lb.querySelector('img'), cnt = lb.querySelector('.cnt'), i = 0;
    function show(n) {
      i = (n + shots.length) % shots.length;
      img.src = shots[i].getAttribute('data-full');
      img.alt = shots[i].getAttribute('data-alt') || '';
      cnt.textContent = (i + 1) + ' / ' + shots.length;
    }
    shots.forEach(function (s, n) {
      s.addEventListener('click', function (e) { e.preventDefault(); show(n); lb.showModal(); });
    });
    lb.querySelector('.x').addEventListener('click', function () { lb.close(); });
    lb.querySelector('.pv').addEventListener('click', function () { show(i - 1); });
    lb.querySelector('.nx').addEventListener('click', function () { show(i + 1); });
    if (shots.length < 2) { lb.querySelector('.pv').hidden = true; lb.querySelector('.nx').hidden = true; }
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-in')) lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
  }
})();
