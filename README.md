# Prasówka

Cotygodniowy przegląd wiadomości z **matematyki, nauki i AI**, po polsku.
Publikowany na **https://campusflorum.pl/prasowka/**.

To repozytorium zawiera **tylko treść**. Wygląd (nagłówek strony, czcionki,
motyw jasny/ciemny, spis działów, nawigacja między wydaniami, stopka) dokłada
strona campusflorum.pl. Wydanie to prosty plik HTML w ustalonym formacie.

## Jak to działa

```
push na main  →  serwer: cron co 30 min `git pull`  →  campusflorum.pl/prasowka/
                 (/var/www/prasowka, tylko do odczytu dla nginx)
```

- `wydania/RRRR-MM-DD.html` — jedno wydanie, np. `wydania/2026-11-23.html`;
  adres: `https://campusflorum.pl/prasowka/2026-11-23/`.
- Archiwum `/prasowka/` samo znajduje wszystkie pliki o takiej nazwie
  i odczytuje z nich tytuł, opis, numer i okres. Nie ma żadnego spisu do
  aktualizowania ani kroku budowania.
- Nowe wydanie pojawia się na stronie najpóźniej 30 minut po pushu.

## Dodanie nowego wydania

1. Skopiuj `szablon.html` do `wydania/RRRR-MM-DD.html`, gdzie data to **dzień
   publikacji** (zwykle dzień po końcu omawianego tygodnia).
2. Wypełnij nagłówek `<head>` (patrz niżej) i treść.
3. Sprawdź listę kontrolną na końcu tego pliku.
4. `git add wydania/RRRR-MM-DD.html && git commit -m "Prasówka nr N (RRRR-MM-DD)" && git push`

Jedno wydanie na tydzień, jeden plik na wydanie. Nie zmieniaj nazw już
opublikowanych plików (zepsułoby to linki). Poprawki literówek i błędów
w starych wydaniach są w porządku.

**Szkic:** plik, którego nazwa zaczyna się od `_` (np. `wydania/_2026-11-30.html`),
nie jest wyświetlany w archiwum.

## Nagłówek `<head>`

Kopiuj z szablonu; zmieniaj tylko cztery wartości:

| Pole | Przykład | Uwagi |
|---|---|---|
| `<title>` | `Matematyczny dowód od AI i nowy rekord w liczbach pierwszych` | Tytuł wydania. Bez „Prasówka”, numeru i daty — strona dopisze je sama. Do ~80 znaków. Taki sam jak `<h1>`. |
| `description` | `Model językowy pomógł zamknąć stary problem Erdősa, a …` | 1–2 zdania, do ~200 znaków. Widać je w archiwum i w podglądzie linku. |
| `prasowka:numer` | `12` | Kolejny numer: poprzedni + 1. Pierwsze wydanie ma numer 1. |
| `prasowka:okres` | `2026-11-16/2026-11-22` | Omawiany tydzień, od poniedziałku do niedzieli, w formacie `RRRR-MM-DD/RRRR-MM-DD`. |

Linie `<script src="/prasowka/prasowka.js">` i
`<link rel="stylesheet" href="/prasowka/prasowka.css">` muszą zostać
**bez zmian** i `<head>` ma być krótki (całość mieści się w pierwszych 8 KB pliku,
z tego archiwum czyta metadane).

## Treść `<body>`

Całe `<body>` to jeden element `<main class="wydanie">`. **Nie dodawaj**
nagłówka strony, stopki, nawigacji, „okruszków” ani daty — wstawia je strona.

Struktura, w tej kolejności:

1. **`<header class="wydanie-head">`** — `<h1>` (tytuł, taki sam jak `<title>`)
   i `<p class="lead">` (2–3 zdania wstępu: jaki to był tydzień).
2. **`<section class="w-skrocie">`** z `<h2>W skrócie</h2>` i listą `<ul>` 3–6
   punktów po jednym zdaniu. Kto przeczyta tylko to, ma wiedzieć, co się działo.
3. **Działy** — `<section id="…">` z `<h2>`. Standardowe, w tej kolejności:

   | `id` | `<h2>` | Co tam trafia |
   |---|---|---|
   | `matematyka` | Matematyka | nowe wyniki, rozwiązane problemy, nagrody, olimpiady, ciekawe preprinty |
   | `nauka` | Nauka | fizyka, biologia, astronomia, informatyka teoretyczna… |
   | `ai` | AI i technologia | nowe modele, badania, narzędzia, regulacje, AI w nauce i matematyce |
   | `warto-przeczytac` | Warto przeczytać | dłuższe teksty, wykłady, filmy na weekend |

   Dział bez wiadomości po prostu pomiń. Wyjątkowo można dodać własny dział
   (np. `id="uczelnie"`, `<h2>Uczelnie i nauka w Polsce</h2>`), byle przed
   „Warto przeczytać”. Spis działów na górze strony tworzy się sam z `<h2>`.

4. Opcjonalnie na końcu **`<aside class="cytat">`** — cytat tygodnia
   (`<blockquote>` + `<p>` z autorem i kontekstem, bez myślnika na początku).
5. Opcjonalnie **`<p class="od-redakcji">`** — krótka uwaga na koniec
   (np. sprostowanie do poprzedniego wydania).

### Wiadomość

```html
<article class="news">
  <h3>Nagłówek: konkretny, informacyjny, bez clickbaitu</h3>
  <p class="zrodlo"><a href="https://…">Nazwa źródła</a> · 18 listopada</p>
  <p>Co się stało, w 2–4 zdaniach.</p>
  <p class="dlaczego">Co z tego wynika (opcjonalnie, 1–2 zdania).</p>
</article>
```

- `class="news wazne"` — **temat tygodnia**, wyróżniona ramką. Najwyżej jedna
  na wydanie, jako pierwsza wiadomość w swoim dziale.
- `<span class="etykieta">preprint</span>` w `<h3>` — mała etykieta, np.
  `preprint`, `recenzowane`, `zapowiedź`, `open source`. Oszczędnie.
- `p.dlaczego` — strona sama dopisuje przed nim pogrubione „Dlaczego to ważne.”
  — nie pisz tego ręcznie.
- W `p.zrodlo` może być kilka źródeł: `<a>Quanta</a>, <a>arXiv</a> · 18 listopada`.
- Data w `p.zrodlo` to dzień publikacji źródła, słownie, bez roku.

### Warto przeczytać

```html
<ul class="lektury">
  <li><a href="https://…">Tytuł tekstu</a> <span class="zrodlo">· Źródło, 25 min</span><br>
    Jedno zdanie, dlaczego warto.</li>
</ul>
```

### Dozwolone elementy

`h1` (tylko w nagłówku), `h2` (tylko jako tytuł działu), `h3` (tytuł
wiadomości), `p`, `ul`, `ol`, `li`, `a`, `strong`, `em`, `code`, `br`,
`blockquote`, `figure` + `img` + `figcaption`, `span.etykieta`,
`span.zrodlo`, `sub`, `sup`.

**Nie używaj:** atrybutów `style`, elementów `<style>` i `<script>`,
zewnętrznych arkuszy stylów i skryptów, ramek `iframe`, `<h4>`–`<h6>`,
tabel (zrób listę), emoji w nagłówkach.

Wzory: prosty zapis tekstowy z `<sub>`/`<sup>` i znakami Unicode
(x², n ≥ 3, π, ∑, √2). Bez LaTeX-a.

Obrazki: tylko gdy naprawdę coś pokazują, z licencją pozwalającą na użycie.
Plik w `wydania/img/RRRR-MM-DD-nazwa.webp` (do ~300 KB), w HTML ścieżka
bezwzględna: `<img src="/prasowka/wydania/img/2026-11-23-nazwa.webp" alt="…">`,
zawsze z opisem `alt` i `<figcaption>` ze źródłem.

## Styl pisania

- **Po polsku**, rzeczowo, jak dobry dziennikarz naukowy: zrozumiale dla
  studenta matematyki/informatyki, bez upraszczania do fałszu.
- **5–12 wiadomości** w wydaniu (bez „Warto przeczytać”). Lepiej mniej
  i ciekawiej niż wszystko.
- Każda wiadomość ma **co najmniej jedno źródło** z linkiem; najlepiej
  pierwotne (artykuł, preprint, ogłoszenie), nie tylko omówienie.
- Fakty tylko ze źródeł. Liczby, nazwiska, daty sprawdzone. Jeśli coś jest
  niepotwierdzone (preprint bez recenzji, przeciek), napisz to wprost.
- Tylko wiadomości z omawianego tygodnia (wyjątek: „Warto przeczytać”).
- Nazwy własne w oryginale; terminy angielskie przy pierwszym użyciu
  w nawiasie, jeśli polski odpowiednik jest mało znany.
- Typografia: polskie cudzysłowy „…”, półpauza – w zakresach i jako myślnik,
  twarda spacja niepotrzebna.

## Lista kontrolna przed pushem

- [ ] Nazwa pliku `wydania/RRRR-MM-DD.html`, data to dzień publikacji.
- [ ] `<title>` = `<h1>`; `description` wypełnione; numer = poprzedni + 1;
      okres poprawny.
- [ ] Linie `<script>` i `<link>` w `<head>` bez zmian.
- [ ] `<body>` to tylko `<main class="wydanie">`; brak `style=`, `<style>`, `<script>`.
- [ ] Jest „W skrócie”; każda wiadomość ma `p.zrodlo` z działającym linkiem.
- [ ] Najwyżej jedno `news wazne`.
- [ ] Plik jest poprawnym HTML-em (domknięte znaczniki, `&amp;` w adresach z `&`).
