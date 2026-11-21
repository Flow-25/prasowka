# Prasówka

Cotygodniowa prasówka, **przede wszystkim o matematyce**, po polsku.
Publikowana na **https://campusflorum.pl/prasowka/**.

To repozytorium zawiera **tylko treść**. Wygląd (nagłówek strony, czcionki,
motyw jasny/ciemny, spis działów, nawigacja między wydaniami, stopka, układ
działów i dodatków) dokłada strona campusflorum.pl przez
`/prasowka/prasowka.css` i `/prasowka/prasowka.js`. Wydanie to prosty plik
HTML w ustalonym formacie, bez własnych stylów i skryptów.

## Czytelnik

Prowadzący i ewentualnie jego znajomi: student, miłośnik matematyki. Zna
matematykę na poziomie akademickim, lubi konkret, nie lubi lania wody. Czyta
w niedzielę przy kawie, często na telefonie.

## Jak to działa

```
push na main  →  serwer: cron co 30 min `git pull`  →  campusflorum.pl/prasowka/
                 (/var/www/prasowka, tylko do odczytu dla nginx)
```

- `wydania/RRRR-MM-DD.html` — jedno wydanie, np. `wydania/2026-11-29.html`;
  adres: `https://campusflorum.pl/prasowka/2026-11-29/`.
- Archiwum `/prasowka/` samo znajduje wszystkie pliki o takiej nazwie
  i odczytuje z nich tytuł, opis, numer i okres. Nie ma spisu do
  aktualizowania ani kroku budowania.
- Nowe wydanie pojawia się na stronie najpóźniej 30 minut po pushu.

## Dodanie nowego wydania

1. Skopiuj `szablon.html` do `wydania/RRRR-MM-DD.html`, gdzie data to **dzień
   publikacji** (zwykle niedziela kończąca omawiany tydzień).
2. Wypełnij `<head>` (patrz niżej) i treść. Komentarze `<!-- … -->` z szablonu
   możesz usunąć.
3. Sprawdź listę kontrolną na końcu tego pliku.
4. `git add wydania/RRRR-MM-DD.html && git commit -m "Prasówka nr N (RRRR-MM-DD)" && git push`

Jedno wydanie na tydzień, jeden plik na wydanie. Nie zmieniaj nazw już
opublikowanych plików (zepsułoby to linki). Poprawki błędów w starych
wydaniach są w porządku.

**Szkic:** plik, którego nazwa zaczyna się od `_` (np. `wydania/_2026-11-29.html`),
nie jest wyświetlany w archiwum.

## Tematyka i proporcje — najważniejsze

| Obszar | Udział | Co tam trafia |
|---|---|---|
| **Matematyka** | ok. 45–55% | nowe twierdzenia i dowody, rozwiązane problemy, ważne preprinty (arXiv), nagrody, olimpiady, ludzie i historie z matematyki |
| **AI w matematyce** | ok. 20–30% | dowody z udziałem AI, Lean i formalizacja, problemy Erdősa, benchmarki matematyczne, spory w środowisku o rolę AI |
| Technologia i inne odkrycia | najwyżej ok. 10% | tylko naprawdę duże rzeczy: przełom w informatyce teoretycznej, kryptografii, fizyce, komputerach kwantowych; nie zwykłe newsy o produktach i firmach |
| Polityka | ok. 10–15% | 3–5 najważniejszych spraw (głównie Polska, 1–2 ze świata), każda wyjaśniona tak, żeby było wiadomo, o co chodzi, z linkiem do dłuższego tekstu; źródła katolickie i konserwatywne (patrz niżej) |
| Kościół katolicki | szczypta | 1–3 krótkie wiadomości: Watykan i papież, Kościół w Polsce (KEP, nominacje, dokumenty); źródła tradycyjne (patrz niżej) |

- W razie wątpliwości wybierz matematykę. Słaby tydzień w matematyce to powód,
  żeby sięgnąć głębiej (blogi Tao, Vakila, Kalaia, Quanta, arXiv), a nie żeby
  dopychać politykę czy technologię.
- **Temat tygodnia** (`news wazne`) prawie zawsze pochodzi z matematyki albo
  AI w matematyce.
- Polityka i Kościół razem nigdy nie są dłuższe niż matematyka i nie trafiają na
  początek wydania (także w `lead` i `description` matematyka idzie pierwsza).
- Przy newsach o Anthropic/Claude zaznacz konflikt interesów (prasówkę pisze
  Claude) i pisz chłodno.

## Nagłówek `<head>`

Kopiuj z szablonu; zmieniaj tylko cztery wartości:

| Pole | Przykład | Uwagi |
|---|---|---|
| `<title>` | `Dwa dowody hipotezy Riemanna jednego dnia` | Tytuł wydania, taki sam jak `<h1>`. Bez „Prasówka”, numeru i daty — strona dopisze je sama. Do ~80 znaków. |
| `description` | `Jednego dnia ogłoszono dwa dowody…` | 1–2 zdania, do ~200 znaków; widać je w archiwum i w podglądzie linku. |
| `prasowka:numer` | `12` | Poprzedni numer + 1. |
| `prasowka:okres` | `2026-11-23/2026-11-29` | Omawiany tydzień, poniedziałek–niedziela, `RRRR-MM-DD/RRRR-MM-DD`. |

Linie `<script src="/prasowka/prasowka.js">` i
`<link rel="stylesheet" href="/prasowka/prasowka.css">` muszą zostać
**bez zmian**, a `<head>` ma być krótki (archiwum czyta metadane
z pierwszych 8 KB pliku).

## Układ wydania

Całe `<body>` to jeden element `<main class="wydanie">`. **Nie dodawaj**
nagłówka strony, stopki, nawigacji, spisu treści, numeru ani daty — wstawia
je strona. Działy idą w tej kolejności; dział bez treści pomiń.

| # | Element | Rola na stronie |
|---|---|---|
| 1 | `header.wydanie-head`: `<h1>` + `p.lead` (2–3 zdania: jaki był tydzień) | nagłówek |
| 2 | `section.w-skrocie`: `<h2>W skrócie</h2>` + `<ul>` 3–6 punktów po jednym zdaniu | ramka TL;DR |
| 3 | `section#matematyka` — `<h2>Matematyka</h2>` | **główna kolumna** |
| 4 | `section#ai` — `<h2>AI i technologia</h2>` | **główna kolumna** |
| 5 | `section#polityka` — `<h2>Polityka</h2>` | serwis: krótkie wiadomości `article.news` |
| 6 | `section#kosciol` — `<h2>Kościół</h2>` | skromny serwis |
| 7 | `section#liczba-tygodnia` | blok „Dodatki”: karta z dużą liczbą |
| 8 | `section#zadanie` | blok „Dodatki”: ramka „do rozwiązania” |
| 9 | `section#ksiazka` | blok „Dodatki”: karta polecajki |
| 10 | `section#warto-przeczytac` | blok „Dodatki”: lista z czasem czytania |
| 11 | `aside.cytat` (opcjonalnie) | cytat tygodnia |
| 12 | `p.od-redakcji` (opcjonalnie) | np. sprostowanie do poprzedniego numeru |

Strona sama grupuje działy (Matematyka · AI | Polityka · Kościół | Dodatki),
buduje z nich spis na górze i składa dodatki w osobny blok. Używaj dokładnie
tych `id` — po nich rozpoznaje dział. Wyjątkowo można dodać własny dział
główny (np. `section#nauka`, `<h2>Nauka</h2>`) między AI a Polityką.

### Wiadomość (Matematyka, AI)

```html
<article class="news">
  <h3>Nagłówek: konkretny, informacyjny, bez clickbaitu</h3>
  <p class="zrodlo"><a href="https://…">Nazwa źródła</a> · 18 listopada</p>
  <p>Co się stało, w 2–4 zdaniach. Opcjonalnie drugi akapit z ideą dowodu.</p>
  <p class="dlaczego">Co z tego wynika (opcjonalnie, 1–2 zdania).</p>
</article>
```

- `class="news wazne"` — **temat tygodnia**, wyraźnie wyróżniony. Dokładnie
  jeden na wydanie, pierwszy w dziale Matematyka (wyjątkowo w AI).
- `<span class="etykieta">…</span>` w `<h3>`: `preprint`, `zapowiedź`,
  `niepotwierdzone`, `recenzowane`, `Lean`. Rzeczy niepotwierdzone **zawsze**
  oznaczaj.
- `p.dlaczego` — strona sama dopisuje pogrubione „Dlaczego to ważne.”
- W `p.zrodlo` może być kilka źródeł: `<a>Quanta</a>, <a>arXiv</a> · 18 listopada`.
  Data: dzień publikacji źródła, słownie, bez roku.

### Polityka i Kościół

**Polityka** — 3–5 najważniejszych spraw tygodnia, głównie z Polski, 1–2 ze
świata. Każda jako `article.news`: 2–4 zdania, z których czytelnik zrozumie,
o co chodzi (kto, co, dlaczego to istotne, jaki jest kontekst), i link do
dłuższego tekstu, żeby mógł doczytać:

```html
<section id="polityka">
  <h2>Polityka</h2>
  <article class="news">
    <h3>Konkretny nagłówek</h3>
    <p class="zrodlo"><a href="https://…">Gość Niedzielny</a>, <a href="https://…">Do Rzeczy</a> · 19 listopada</p>
    <p>O co chodzi, w 2–4 zdaniach.</p>
    <p class="dlaczego">Opcjonalnie: co z tego wynika.</p>
  </article>
</section>
```

**Kościół** — 1–3 krótkie wiadomości, lista (`<strong>Watykan:</strong>`,
`<strong>Polska:</strong>`) albo `article.news`, jeśli sprawa wymaga 2–3 zdań.

**Źródła dla polityki i Kościoła.** Prowadzący chce rzetelnych informacji
z perspektywy katolickiej i konserwatywnej, bez lewicowej publicystyki.
Fakty zawsze sprawdzone; opinie i komentarze tylko jako wyraźnie przypisane
źródłu („jak pisze Do Rzeczy…”).

- Polityka, preferowane: Gość Niedzielny, Niedziela, Nasz Dziennik, Do Rzeczy,
  wPolityce / Sieci, PCh24, Fronda, Rzeczpospolita; suche fakty także z PAP
  i stron rządowych. Świat: Catholic News Agency, National Catholic Register,
  Catholic World Report, ewentualnie agencje (Reuters, AP) dla samych faktów.
- Kościół, preferowane źródła tradycyjne: Do Rzeczy, PCh24, Nasz Dziennik,
  Niedziela, Gość Niedzielny, Radio Maryja / TV Trwam, National Catholic
  Register, Catholic World Report, LifeSiteNews, Rorate Caeli; teksty
  pierwotne z vatican.va, Vatican News i episkopat.pl.
- Nie korzystaj z mediów lewicowych i lewicowo-liberalnych (np. Gazeta
  Wyborcza, OKO.press, Krytyka Polityczna, Newsweek Polska), a w sprawach
  Kościoła także z mediów modernistycznych (np. Tygodnik Powszechny, Więź,
  National Catholic Reporter).

### Dodatki

**Liczba tygodnia** — tylko jeśli naprawdę ciekawa. Liczba po dwukropku w `<h2>`
zostanie pokazana dużym krojem:

```html
<section id="liczba-tygodnia">
  <h2>Liczba tygodnia: 2026,87</h2>
  <p>Skąd ta liczba, w kilku zdaniach. <span class="zrodlo">· <a href="https://…">Źródło</a></span></p>
</section>
```

**Zadanie tygodnia** — naprawdę trudne: trudniejsze zadania olimpijskie
(IMO/ISL, finał OM), Putnam A5–A6/B5–B6, Miklós Schweitzer, trudne zadania ze
studiów magisterskich. Kilka kroków i co najmniej jedna nieoczywista idea;
coś w rodzaju „p² − 1 dzieli się przez 24” jest zdecydowanie za proste.
Zmieniaj dziedziny z tygodnia na tydzień. **Bez podpowiedzi** (najwyżej jedno
zdanie „dla wytrwałych”). Źródło zadania podajesz dopiero przy rozwiązaniu
w następnym numerze.

```html
<section id="zadanie">
  <h2>Zadanie tygodnia</h2>
  <details class="rozwiazanie">
    <summary>Rozwiązanie zadania z nr 11</summary>
    <p>Pełne rozwiązanie.</p>
    <p class="zrodlo">Źródło: IMO Shortlist 2019, N4.</p>
  </details>
  <div class="do-rozwiazania">
    <p>Treść nowego zadania.</p>
    <p class="bonus">Opcjonalnie trudniejsza wersja.</p>
    <p class="dla-wytrwalych">Opcjonalnie jedno zdanie dla wytrwałych.</p>
  </div>
</section>
```

Rozwiązanie jest domyślnie zwinięte, żeby nie psuć zabawy. W pierwszym
numerze (nie ma czego rozwiązywać) pomiń `details`.

**Książka tygodnia** — jedna pozycja, na zmianę podręcznik i książka
popularnonaukowa. Nie powtarzaj książek z poprzednich wydań (sprawdź
`grep -h -A2 'id="ksiazka"' wydania/*.html`).

```html
<section id="ksiazka">
  <h2>Książka tygodnia</h2>
  <article class="news">
    <h3>Autor, „Tytuł”</h3>
    <p class="zrodlo"><a href="https://…">Wydawca</a>, rok · <a href="https://…">darmowa wersja od autora</a></p>
    <p><strong>O czym jest.</strong> …</p>
    <p><strong>Dla kogo.</strong> Wymagania wstępne.</p>
    <p><strong>Dlaczego warto.</strong> …</p>
    <p><strong>Jak czytać.</strong> Od których rozdziałów zacząć, co pominąć.</p>
  </article>
</section>
```

Link do darmowej wersji tylko, jeśli jest legalna (od autora lub wydawcy).

**Warto przeczytać** — 1–2 naprawdę dobre, dłuższe teksty pisane przez
ludzi (eseje, reportaże, felietony). Lepiej pominąć dział, niż dać przeciętny
tekst. Czas czytania w `span.czas` — strona pokaże go po prawej:

```html
<ul class="lektury">
  <li><a href="https://…">Tytuł</a> <span class="zrodlo">· Autor, Źródło</span> <span class="czas">15 min</span><br>
    Jedno zdanie, dlaczego warto.</li>
</ul>
```

**Cytat tygodnia** (opcjonalnie): `<aside class="cytat">` z `<blockquote>`
i `<p>` z autorem i kontekstem (bez myślnika na początku).

### Wzory i dozwolone elementy

Wzory zapisuj tekstem: `<sub>`, `<sup>` i znaki Unicode (x², n ≥ 3, π, ∑,
√2, ℝ, ≡). Bez LaTeX-a. Wzór w osobnym wierszu: `<p class="wzor">…</p>`
(strona złoży go krojem matematycznym, wyśrodkowany).

Dozwolone: `h1` (tylko w nagłówku), `h2` (tylko tytuł działu), `h3` (tytuł
wiadomości), `p`, `ul`, `ol`, `li`, `a`, `strong`, `em`, `code`, `br`, `sub`,
`sup`, `blockquote`, `details`/`summary` (tylko w zadaniu),
`figure` + `img` + `figcaption`, oraz klasy opisane wyżej.

**Nie używaj:** atrybutów `style`, `<style>`, `<script>`, zewnętrznych
arkuszy i skryptów, `iframe`, `h4`–`h6`, tabel (zrób listę), emoji
w nagłówkach.

Obrazki tylko, gdy naprawdę coś pokazują i licencja pozwala: plik
`wydania/img/RRRR-MM-DD-nazwa.webp` (do ~300 KB), w HTML ścieżka bezwzględna
`/prasowka/wydania/img/…`, zawsze z `alt` i `<figcaption>` ze źródłem.

## Styl pisania

- **Po polsku**, rzeczowo, jak dobry dziennikarz naukowy: dla kogoś, kto zna
  matematykę akademicką. Konkret zamiast ogólników; idea dowodu lepsza niż
  przymiotniki.
- Każdy fakt ze źródła z linkiem, najlepiej pierwotnego (artykuł, preprint,
  ogłoszenie). Liczby, nazwiska i daty sprawdzone. Nie zmyślaj faktów,
  cytatów ani linków.
- Tylko wiadomości z omawianego tygodnia (wyjątek: dodatki).
- Nazwy własne w oryginale; terminy angielskie przy pierwszym użyciu
  w nawiasie, jeśli polski odpowiednik jest mało znany.
- Typografia: polskie cudzysłowy „…”, półpauza – w zakresach i jako myślnik.

## Lista kontrolna przed pushem

- [ ] Nazwa pliku `wydania/RRRR-MM-DD.html`; numer = poprzedni + 1; okres poprawny.
- [ ] `<title>` = `<h1>`; `description` wypełnione, zaczyna od matematyki.
- [ ] Linie `<script>` i `<link>` w `<head>` bez zmian; brak `style=`, `<style>`, `<script>`.
- [ ] Matematyka + AI w matematyce to wyraźnie większość tekstu; polityka 3–5 spraw, każda z linkiem do dłuższego tekstu.
- [ ] Dokładnie jedno `news wazne`, z matematyki albo AI w matematyce.
- [ ] Każda wiadomość ma źródło z działającym linkiem; niepotwierdzone oznaczone.
- [ ] Polityka i Kościół ze źródeł z listy (katolickich, konserwatywnych, tradycyjnych).
- [ ] Zadanie trudne, bez podpowiedzi; jest rozwiązanie zadania z poprzedniego numeru (ze źródłem).
- [ ] Książka nie powtarza się.
- [ ] `id` działów dokładnie jak w tabeli; plik jest poprawnym HTML-em (`&amp;` w adresach z `&`).
