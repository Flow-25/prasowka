# Prasówka — instrukcje dla Claude'a

Tu powstaje cotygodniowa prasówka publikowana na https://campusflorum.pl/prasowka/.
**Przede wszystkim matematyka** (ok. połowa), potem AI w matematyce; polityka
(3–5 spraw z wyjaśnieniem) i Kościół w serwisie, ze źródeł katolickich,
konserwatywnych i tradycyjnych (lista w README).

**Pełny format, proporcje i zasady są w `README.md` — przeczytaj go w całości,
zanim cokolwiek napiszesz.** Wzór do skopiowania: `szablon.html`.

Najważniejsze:

- Nowe wydanie = jeden nowy plik `wydania/RRRR-MM-DD.html` (data publikacji),
  skopiowany z `szablon.html`. Numer = poprzedni + 1 (sprawdź `ls wydania/`
  i `prasowka:numer` w najnowszym pliku).
- Działy i ich `id` dokładnie jak w README (`matematyka`, `ai`, `polityka`,
  `kosciol`, `liczba-tygodnia`, `zadanie`, `ksiazka`, `warto-przeczytac`) —
  po nich strona układa wydanie.
- Każde wydanie ma też wersję angielską `wydania/en/RRRR-MM-DD.html`:
  wierne tłumaczenie, ta sama struktura i `id` (szczegóły w README,
  „Wersja angielska”). Commit obejmuje oba pliki.
- Zmieniasz tylko treść i cztery pola w `<head>`. Żadnych własnych stylów
  ani skryptów; wygląd daje strona.
- Każdy fakt ze źródła z linkiem. Nie zmyślaj faktów, cytatów ani linków.
  Przy Anthropic/Claude zaznacz konflikt interesów.
- Zadanie tygodnia: naprawdę trudne, bez podpowiedzi; w następnym numerze
  rozwiązanie ze źródłem. Książki się nie powtarzają.
- Nie ruszaj `szablon.html`, `README.md` ani tego pliku, chyba że prowadzący
  o to poprosi.
- Commit: `Prasówka nr N (RRRR-MM-DD)`, push na `main`. Strona odświeża się
  sama w ciągu 30 minut.
