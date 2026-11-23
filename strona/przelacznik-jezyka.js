/*
 * Przełącznik PL/EN dla prasówki — do dopisania na końcu /prasowka/prasowka.js
 * na serwerze campusflorum.pl (ten plik NIE jest ładowany przez wydania).
 *
 * Założenia:
 *  - wersja polska:    wydania/RRRR-MM-DD.html     → /prasowka/RRRR-MM-DD/
 *  - wersja angielska: wydania/en/RRRR-MM-DD.html  → /prasowka/en/RRRR-MM-DD/
 *    (potrzebny analogiczny routing jak dla polskich wydań, np. w nginx:
 *     location ~ ^/prasowka/en/(\d{4}-\d{2}-\d{2})/?$ { try_files /wydania/en/$1.html =404; }
 *     — dopasuj do tego, jak dziś serwowane są /prasowka/RRRR-MM-DD/)
 *  - przycisk pokazuje się tylko, gdy druga wersja istnieje (zapytanie HEAD).
 */
(function () {
  var m = location.pathname.match(/^\/prasowka\/(?:wydania\/)?(en\/)?(\d{4}-\d{2}-\d{2})(?:\/|\.html)?$/);
  if (!m) return;
  var isEn = !!m[1], date = m[2];
  var otherFile = isEn ? '/prasowka/wydania/' + date + '.html' : '/prasowka/wydania/en/' + date + '.html';
  var otherUrl = isEn ? '/prasowka/' + date + '/' : '/prasowka/en/' + date + '/';

  function add() {
    var head = document.querySelector('.wydanie-head');
    if (!head) return;
    var a = document.createElement('a');
    a.className = 'przelacznik-jezyka';
    a.href = otherUrl;
    a.hreflang = isEn ? 'pl' : 'en';
    a.lang = isEn ? 'pl' : 'en';
    a.innerHTML = isEn ? '<span>EN</span> · <strong>PL</strong>' : '<strong>EN</strong> · <span>PL</span>';
    a.title = isEn ? 'Wersja polska' : 'English version';
    // aria: aktualny język jest pogrubiony w drugim elemencie, więc nazwa linku = język docelowy
    a.setAttribute('aria-label', a.title);
    head.insertBefore(a, head.firstChild);
    try { localStorage.setItem('prasowka-lang', isEn ? 'en' : 'pl'); } catch (e) {}
  }

  fetch(otherFile, { method: 'HEAD' }).then(function (r) {
    if (!r.ok) return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add);
    else add();
  }).catch(function () {});
})();

/* CSS do dopisania w /prasowka/prasowka.css:

.przelacznik-jezyka { float: right; font-size: .85rem; letter-spacing: .04em;
  text-decoration: none; padding: .2em .6em; border: 1px solid currentColor;
  border-radius: 999px; opacity: .75; }
.przelacznik-jezyka:hover { opacity: 1; }
.przelacznik-jezyka span { opacity: .55; }

Uwaga: etykiety, które dokleja strona (np. „Dlaczego to ważne.”, „W skrócie”, spis działów),
powinny zależeć od <html lang>: dla lang="en" np. „Why it matters.”.
*/
