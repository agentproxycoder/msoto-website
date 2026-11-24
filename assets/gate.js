// Preview lock: asks for a password before showing the site.
// Only a SHA-256 hash of the password is stored here.
(function () {
  var HASH = '56cc38168af66e5c636ee02f203a56b8f0b57e553c95db5743ca48cf04b218cd';
  var KEY = 'mso-preview-unlocked';
  try { if (localStorage.getItem(KEY) === HASH) return; } catch (e) {}
  var root = document.documentElement;
  root.style.visibility = 'hidden';
  function sha256(text) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    });
  }
  function show() {
    var wrap = document.createElement('div');
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-labelledby', 'gate-title');
    wrap.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#254068;display:flex;flex-direction:column;gap:28px;align-items:center;justify-content:center;padding:24px;visibility:visible;font-family:Inter,system-ui,sans-serif';
    wrap.innerHTML =
      '<img src="assets/mso-logo-white.svg" alt="Maryland Society of Otolaryngologists" style="height:96px;width:auto;display:block">' +
      '<form id="gate-form" style="background:#fff;border-radius:12px;padding:36px;max-width:380px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:14px;box-shadow:0 10px 30px rgba(0,0,0,.25)">' +
      
      '<h1 id="gate-title" style="margin:0;font-size:22px;color:#254068;font-family:Archivo,Inter,sans-serif">Maryland Society of Otolaryngologists</h1>' +
      '<p style="margin:0;font-size:15px;color:#3A4A5C">This site is in preview. Enter the password to continue.</p>' +
      '<label for="gate-pw" style="font-size:15px;font-weight:600;color:#254068">Password</label>' +
      '<input id="gate-pw" type="password" autocomplete="current-password" required style="min-height:48px;padding:10px 14px;border:1px solid #A9B4C4;border-radius:6px;font-size:16px">' +
      '<p id="gate-err" role="alert" style="margin:0;font-size:14px;color:#B3261E;min-height:18px"></p>' +
      '<button type="submit" style="min-height:48px;border:none;border-radius:6px;background:#00BF63;color:#0F1E36;font-weight:600;font-size:16px;cursor:pointer">Enter site</button>' +
      '</form>';
    document.body.appendChild(wrap);
    var input = document.getElementById('gate-pw');
    input.focus();
    document.getElementById('gate-form').addEventListener('submit', function (e) {
      e.preventDefault();
      sha256(input.value.trim()).then(function (h) {
        if (h === HASH) {
          try { localStorage.setItem(KEY, HASH); } catch (err) {}
          wrap.remove();
          root.style.visibility = '';
        } else {
          document.getElementById('gate-err').textContent = 'That password is not correct.';
          input.select();
        }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
})();
