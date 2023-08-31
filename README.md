# FormBuilder - Cod8 homework

## Lynx
Zde je odkaz na repo
https://github.com/JSpeci/FormBuilder/tree/main
Zde je odkaz na živou verzi
https://form-builder-cod8.web.app/
Použil jsem firebase, jako nejrychlejší řešení.

## Description
Vytvořil jsem malou aplikaci podle zadání, jak jsem to obecné zadání pochopil.
Na homepage jsou dvě možnosti kam jít, na builder a na tester.
### Builder
- Create new form vytvoří nový prázdný form
- Generate random stuff vytvoří do local storage za pomoci generatoru nějakou strukturu náhodných formulářů, aby bylo čím se proklikávat
- Přepínám mezi formy lze editovat formy v pravév straně
## Tester 
- z formů v loccal storage vytvoří validovaný formulář, který lze oklikat

## Technologie
Použil jsem volný design systém FluentUI. Částečně za mě řeší responzivitu a nějaký základní vzhled.
Kdybych to měl celé nakodit od nuly, tak by to zabralo násobně času.
State management pouze react contexty


## What to do
Dekujeme za zajem o nasi spolecnost. Na zkousku mame nasledujici kratke zadani, ktere byste mohl vypracovat, nasdilet nekam na Git a deploynout zive, abychom to mohli projit a probrat.
Aplikace nebude pouzivat DB a jako perzistentni storage pouzije web storage, tzn kdyz to otevru v anonymnim okne, tak se vse vymaze.
Naschval nedefinuju do podrobna vzhled a responzivitu, bude to soucasti vystupu (jinak receno ocekaval bych, ze aplikace bude vypadat a chovat se ok).
Umoznime uzivatelum stavet formulare a ty na separatni strance vyplnit. Tzn apliakce bude mit nejake menu s temito polozkami:
-   Form builder
-   Form tester
Form builder umozni spravovat formulare, tzn pridat/odebrat/editovat. Kazdy formular se sklada ze sady otazek, kdy otazky mohou byt nasledujiciho typu:
-   True/False
-   Vyplnit cislo
-   Vyplnit text
Zaroven form builder umozni pridavat validaci na existujic form. Validace jsou nasledujici:
-   Hodnota musi byt vyplnena
-   Cislo musi byt vetsi/mensi nez urcita hodnota
-   Text musi zacinat urcitym stringem
-   Text obsahuje urcity string
Form tester pak umozni vybrat nektery form a ten vyplnit (tzn je to spis takove testovaci hriste, abychom videli, ze to funguje spravne). Po vyplneni muzu kliknout tlacitko "Validate", ktere zvaliduje formular.
Vse by melo byt spravne navrzeno, abychom v budoucnu nemeli problem pridat novy typ otazky ci novou validaci.
Kdyby byly nejake dotazy, tak jsem tady na zodpovezeni.