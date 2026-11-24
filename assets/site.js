// Maryland Society of Otolaryngologists — site behaviour
(function () {
  // Parallax skull texture: drifts up slowly as the page scrolls.
  var skull = document.getElementById('skull');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (skull && !reduce) {
    var ticking = false;
    var update = function () {
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var p = Math.min(1, Math.max(0, (window.scrollY || 0) / max));
      skull.style.transform = 'translateY(' + Math.round(-p * 0.25 * window.innerHeight) + 'px)';
      ticking = false;
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  // Contact form: opens the visitor's email app with the message filled in.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var list = document.getElementById('list');
      var lines = [
        v('msg'),
        '',
        'Name: ' + v('name'),
        'Email: ' + v('email'),
        'I am a: ' + v('role'),
        'Add me to the MSO mailing list: ' + (list && list.checked ? 'Yes' : 'No')
      ];
      window.location.href = 'mailto:mso@medchi.org'
        + '?subject=' + encodeURIComponent('MSO website message from ' + (v('name') || 'a visitor'))
        + '&body=' + encodeURIComponent(lines.join('\r\n'));
    });
  }
})();
