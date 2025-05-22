const messages: Record<string, string> = {};

messages["SENSOREN_CATEGORY"] = "Sensoren";
messages["ACTUATOREN_CATEGORY"] = "Actuatoren";
messages["ADD_COMMENT"] = "Opmerking toevoegen";
messages["ARD_ANALOGWRITE"] = "Zet PWM";
messages["ARD_DIGITALWRITE"] = "Zet Digipin";
messages["ARD_SET_MULTIPLEXER"] = "Stel digitale multiplexer in op pin";
messages["ARD_PIN_WARN1"] =
    "Pin %1 is nodig voor %2 als pin %3. Al gebruikt als %4.";
messages["ARD_SERVO_READ"] = "Lees servo pin";
messages["ARD_SERVO_REGULAR_WRITE"] = "Servo";
messages["ARD_SERVO_ARM_WRITE"] = "Servo Arm";
messages["ARD_SERVO_WRITE"] = "Servo";
messages["ARD_SERVO_WRITE_DEG_180"] = "°";
messages["ARD_SERVO_WRITE_TO"] = "op";
messages["ARD_TIME_DELAY"] = "duurt";
messages["ARD_TIME_DELAY_TIP"] =
    "Wacht het gespecificeerde aantal milliseconden";
messages["ARD_TIME_MS"] = "ms"; // untranslated
messages["ARD_WRITE_TO"] = "op";
messages["CANNOT_DELETE_VARIABLE_PROCEDURE"] =
    'De variabele "%1" kan niet verwijderd worden omdat die onderdeel uitmaakt van de definitie van de functie "%2"';
messages["CHANGE_VALUE_TITLE"] = "Waarde wijzigen:";
messages["CLEAN_UP"] = "Blokken opschonen";
messages["COLLAPSED_WARNINGS_WARNING"] =
    "Samengevouwen blokken bevatten waarschuwingen.";
messages["COLLAPSE_ALL"] = "Blokken samenvouwen";
messages["COLLAPSE_BLOCK"] = "Blok samenvouwen";
messages["COLOUR_BLEND_COLOUR1"] = "kleur 1";
messages["COLOUR_BLEND_COLOUR2"] = "kleur 2";
messages["COLOUR_BLEND_HELPURL"] =
    "https://meyerweb.com/eric/tools/color-blend/#:::rgbp"; // untranslated
messages["COLOUR_BLEND_RATIO"] = "verhouding";
messages["COLOUR_BLEND_TITLE"] = "mengen";
messages["COLOUR_BLEND_TOOLTIP"] =
    "Mengt twee kleuren samen met een bepaalde verhouding (0.0 - 1.0).";
messages["COLOUR_PICKER_HELPURL"] = "https://nl.wikipedia.org/wiki/Kleur";
messages["COLOUR_PICKER_TOOLTIP"] = "Kies een kleur in het palet.";
messages["COLOUR_RANDOM_HELPURL"] = "http://randomcolour.com"; // untranslated
messages["COLOUR_RANDOM_TITLE"] = "willekeurige kleur";
messages["COLOUR_RANDOM_TOOLTIP"] = "Kies een willekeurige kleur.";
messages["COLOUR_RGB_BLUE"] = "blauw";
messages["COLOUR_RGB_GREEN"] = "groen";
messages["COLOUR_RGB_HELPURL"] =
    "https://www.december.com/html/spec/colorpercompact.html"; // untranslated
messages["COLOUR_RGB_RED"] = "rood";
messages["COLOUR_RGB_AMBIENT"] = "omgeving";
messages["COLOUR_RGB_TITLE"] = "kleuren met";
messages["COLOUR_RGB_TOOLTIP"] =
    "Maak een kleur met de opgegeven hoeveelheid rood, groen en blauw.  Alle waarden moeten tussen 0 en 100 liggen.";
messages["CONTROLS_FLOW_STATEMENTS_HELPURL"] =
    "https://github.com/google/blockly/wiki/Loops#loop-termination-blocks"; // untranslated
messages["CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK"] = "uit lus breken";
messages["CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE"] =
    "doorgaan met de volgende iteratie van de lus";
messages["CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK"] =
    "Uit de bovenliggende lus breken.";
messages["CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE"] =
    "De rest van deze lus overslaan en doorgaan met de volgende herhaling.";
messages["CONTROLS_FLOW_STATEMENTS_WARNING"] =
    "Waarschuwing: dit blok mag alleen gebruikt worden in een lus.";
messages["CONTROLS_FOREACH_HELPURL"] =
    "https://github.com/google/blockly/wiki/Loops#for-each"; // untranslated
messages["CONTROLS_FOREACH_TITLE"] = "voor ieder item %1 in lijst %2";
messages["CONTROLS_FOREACH_TOOLTIP"] =
    'Voor ieder item in een lijst, stel de variabele "%1" in op het item en voer daarna opdrachten uit.';
messages["CONTROLS_FOR_HELPURL"] =
    "https://github.com/google/blockly/wiki/Loops#count-with"; // untranslated
messages["CONTROLS_FOR_TITLE"] =
    "rekenen met %1 van %2 tot %3 in stappen van %4";
messages["CONTROLS_FOR_TOOLTIP"] =
    'Laat de variabele "%1" de waarden aannemen van het beginnummer tot het laatste nummer, tellende met het opgegeven interval, en met uitvoering van de opgegeven blokken.';
messages["CONTROLS_IF_ELSEIF_TOOLTIP"] =
    "Voeg een voorwaarde toe aan het als-blok.";
messages["CONTROLS_IF_ELSE_TOOLTIP"] =
    "Voeg een laatste, vang-alles conditie toe aan het als-statement.";
messages["CONTROLS_IF_HELPURL"] =
    "https://github.com/google/blockly/wiki/IfElse"; // untranslated
messages["CONTROLS_IF_IF_TOOLTIP"] =
    'Voeg stukken toe, verwijder of wijzig de volgorde om dit "als"-blok te wijzigen.';
messages["CONTROLS_IF_MSG_ELSE"] = "anders";
messages["CONTROLS_IF_MSG_ELSEIF"] = "anders als";
messages["CONTROLS_IF_MSG_IF"] = "als";
messages["CONTROLS_IF_MSG_THEN"] = "dan";
messages["CONTROLS_IF_TOOLTIP_1"] =
    "Als een waarde waar is, voer dan opdrachten uit.";
messages["CONTROLS_IF_TOOLTIP_2"] =
    "Als een waarde waar is, voert dan het eerste blok met opdrachten uit. Voer andere het tweede blok met opdrachten uit.";
messages["CONTROLS_IF_TOOLTIP_3"] =
    "Als de eerste waarde waar is, voer dan het eerste blok met opdrachten uit. Voer anders, als de tweede waarde waar is, het tweede blok met opdrachten uit.";
messages["CONTROLS_IF_TOOLTIP_4"] =
    'Als de eerste waarde "waar" is, voer dan het eerste blok uit. Voer anders wanneer de tweede waarde "waar" is, het tweede blok uit. Als geen van beide waarden waar zijn, voer dan het laatste blok uit.';
messages["CONTROLS_REPEAT_FOREVER_TITLE"] = "herhaal voor altijd";
messages["CONTROLS_REPEAT_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Repetitie_(informatica)#For_en_Foreach";
messages["CONTROLS_REPEAT_INPUT_DO"] = "";
messages["CONTROLS_REPEAT_TITLE"] = "herhaal %1 keer";
messages["CONTROLS_REPEAT_TOOLTIP"] =
    "Voer een aantal opdrachten meerdere keren uit.";
messages["CONTROLS_WHILEUNTIL_HELPURL"] =
    "https://github.com/google/blockly/wiki/Loops#repeat"; // untranslated
messages["CONTROLS_WHILEUNTIL_OPERATOR_UNTIL"] = "herhalen totdat";
messages["CONTROLS_WHILEUNTIL_OPERATOR_WHILE"] = "herhalen zolang";
messages["CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL"] =
    "Terwijl een waarde onwaar is de volgende opdrachten uitvoeren.";
messages["CONTROLS_WHILEUNTIL_TOOLTIP_WHILE"] =
    "Terwijl een waarde waar is de volgende opdrachten uitvoeren.";
messages["DELETE_ALL_BLOCKS"] = "Alle %1 blokken verwijderen?";
messages["DELETE_BLOCK"] = "Blok verwijderen";
messages["DELETE_VARIABLE"] = 'Verwijder de variabele "%1"';
messages["DELETE_VARIABLE_CONFIRMATION"] =
    '%1 gebruiken van de variabele "%2" verwijderen?';
messages["DELETE_X_BLOCKS"] = "%1 blokken verwijderen";
messages["DIALOG_CANCEL"] = "Annuleren";
messages["DIALOG_OK"] = "OK";
messages["DISABLE_BLOCK"] = "Blok uitschakelen";
messages["DUPLICATE_BLOCK"] = "Dupliceren";
messages["DUPLICATE_COMMENT"] = "Opmerking dupliceren";
messages["ENABLE_BLOCK"] = "Blok inschakelen";
messages["EXPAND_ALL"] = "Blokken uitvouwen";
messages["EXPAND_BLOCK"] = "Blok uitvouwen";
messages["EXTERNAL_INPUTS"] = "Externe invoer";
messages["HELP"] = "Hulp";
messages["INLINE_INPUTS"] = "Inline invoer";
messages["LEAPHY_ANALOG_READ"] = "Lees anapin";
messages["LEAPHY_BUZZ_BUZZ"] = "Buzz"; // untranslated
messages["LEAPHY_BUZZ_HERTZ"] = "Hertz"; // untranslated
messages["LEAPHY_BUZZ_MS"] = "ms"; // untranslated
messages["LEAPHY_CLICK_CATEGORY"] = "Leaphy Click"; // untranslated
messages["LEAPHY_COMPASS"] = "Lees kompas";
messages["LEAPHY_DIGITAL_READ"] = "Lees digipin";
messages["LEAPHY_CHOOSE_GAS"] = "Lees gas";
messages["LEAPHY_DISPLAY_CLEAR"] = "Maak display leeg";
messages["LEAPHY_DISPLAY_DISPLAY"] = "Toon op display";
messages["LEAPHY_DISPLAY_PRINT"] = "Stel display in - Rg.";
messages["LEAPHY_EXTRA_CATEGORY"] = "Leaphy Extra"; // untranslated
messages["LEAPHY_FLITZ_CATEGORY"] = "Leaphy Flitz"; // untranslated
messages["LEAPHY_FLITZ_LED"] = "Neuslamp -";
messages["LEAPHY_FLITZ_LED_B"] = "Blauw";
messages["LEAPHY_FLITZ_LED_G"] = "Groen";
messages["LEAPHY_FLITZ_LED_R"] = "Rood";
messages["LEAPHY_FUNCTIONS_CATEGORY"] = "Eigen blokken";
messages["LEAPHY_GET_DISTANCE"] = "Lees afstand";
messages["LEAPHY_TOF_GET_DISTANCE"] = "Lees ToF";
messages["LEAPHY_GET_AIR_PRESSURE"] = "Lees luchtdruk";
messages["LEAPHY_GET_GESTURE"] = "Lees gebaar";
messages["LEAPHY_LED"] = "Led";
messages["LEAPHY_LED_BASIC_BLUE"] = "B";
messages["LEAPHY_LED_BASIC_GREEN"] = "G";
messages["LEAPHY_LED_BASIC_LED"] = "Ledstrip - Zet aan - Led";
messages["LEAPHY_LED_BASIC_RED"] = "R";
messages["LEAPHY_LED_BLUE"] = "Blauw";
messages["LEAPHY_LED_GREEN"] = "Groen";
messages["LEAPHY_LED_RED"] = "Rood";
messages["LEAPHY_LED_SET_LEDS"] = "Leds";
messages["LEAPHY_LED_SET_PIN"] = "Pin";
messages["LEAPHY_LED_SET_SPEEDVALUE"] = "Ledstrip - Demo - Snelheid";
messages["LEAPHY_LED_SET_STRIP"] = "Ledstrip - Stel in";
messages["LEAPHY_LED_STRIP_BREATHE"] = "Ademen";
messages["LEAPHY_LED_STRIP_COLORGULF"] = "Kleur Golf";
messages["LEAPHY_LED_STRIP_DEMO"] = "Ledstrip - Demo";
messages["LEAPHY_LED_STRIP_GULF"] = "Golf";
messages["LEAPHY_LED_STRIP_LIGHTBANK"] = "Lichtbank";
messages["LEAPHY_LED_STRIP_RAINBOW"] = "Regenboog";
messages["LEAPHY_MOTOR_A_DROPDOWN"] = "Motor_A"; // untranslated
messages["LEAPHY_MOTOR_BACKWARD"] = "Achteruit";
messages["LEAPHY_MOTOR_B_DROPDOWN"] = "Motor_B"; // untranslated
messages["LEAPHY_MOTOR_DIRECTION"] = "Richting";
messages["LEAPHY_MOTOR_FORWARD"] = "Vooruit";
messages["LEAPHY_MOTOR_LEFT"] = "Links";
messages["LEAPHY_MOTOR_LEFT_DROPDOWN"] = "Motor_L"; // untranslated
messages["LEAPHY_MOTOR_RIGHT"] = "Rechts";
messages["LEAPHY_MOTOR_RIGHT_DROPDOWN"] = "Motor_R"; // untranslated
messages["LEAPHY_MOTOR_SPEED"] = "Snelheid";
messages["LEAPHY_MOTOR_TYPE"] = "Zet";
messages["LEAPHY_SERVO_SET"] = "Servo %1 met snelheid %2";
messages["LEAPHY_SERVO_MOVE"] = "Servo richting %1 met snelheid %2";
messages["LEAPHY_NUMBERS_CATEGORY"] = "Getal blokken";
messages["LEAPHY_OPERATORS_CATEGORY"] = "Functies";
messages["LEAPHY_ORIGINAL_CATEGORY"] = "Leaphy Original"; // untranslated
messages["LEAPHY_READ_HAND"] = "Lees handsensor";
messages["LEAPHY_READ_STOMACH"] = "Lees buiksensor";
messages["LEAPHY_RGB_COLOR_BLUE"] = "B-255";
messages["LEAPHY_RGB_COLOR_GREEN"] = "G-255";
messages["LEAPHY_RGB_COLOR_RED"] = "R-255";
messages["LEAPHY_RGB_RAW_COLOR_BLUE"] = "B-bron";
messages["LEAPHY_RGB_RAW_COLOR_GREEN"] = "G-bron";
messages["LEAPHY_RGB_RAW_COLOR_RED"] = "R-bron";
messages["LEAPHY_RGB_READ_SENSOR"] = "Lees RGB Sensor";
messages["LEAPHY_SERIAL_PRINT"] = "Toon op scherm";
messages["LEAPHY_SERIAL_AVAILABLE"] = "Beschikbaar op scherm";
messages["LEAPHY_SERIAL_READ_LINE"] = "Lees van scherm";
messages["LEAPHY_SITUATION_CATEGORY"] = "Denk stappen";
messages["LEAPHY_SONAR_READ_ECHO"] = "Echo"; // untranslated
messages["LEAPHY_SONAR_READ_TRIG"] = "Lees afstand Trig";
messages["LEAPHY_START"] = "Leaphy"; // untranslated
messages["LEAPHY_STOMACH_SENSOR_TYPE1"] = "soort 1";
messages["LEAPHY_STOMACH_SENSOR_TYPE2"] = "soort 2";
messages["LEAPHY_UNO_CATEGORY"] = "Arduino Uno"; // untranslated
messages["LEAPHY_VARIABLES_CATEGORY"] = "Variabelen";
messages["LEAPHY_LISTS_CATEGORY"] = "Lijsten";
messages["LEAPHY_LISTS_ADD"] = "voeg %1 toe aan %2";
messages["LEAPHY_LISTS_DELETE"] = "verwijder %1 van %2";
messages["LEAPHY_LISTS_CLEAR"] = "verwijder alles van %1";
messages["LEAPHY_LISTS_INSERT"] = "voeg %1 in op %2 van %3";
messages["LEAPHY_LISTS_REPLACE"] = "vervang %1 van %2 door %3";
messages["LEAPHY_LISTS_GET"] = "waarde %1 van %2";
messages["LEAPHY_LISTS_LENGTH"] = "lengte van %1";
messages["LISTS_CREATE_EMPTY_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#create-empty-list"; // untranslated
messages["LISTS_CREATE_EMPTY_TITLE"] = "maak een lege lijst";
messages["LISTS_CREATE_EMPTY_TOOLTIP"] =
    "Geeft een lijst terug met lengte 0, zonder items";
messages["LISTS_CREATE_WITH_CONTAINER_TITLE_ADD"] = "lijst";
messages["LISTS_CREATE_WITH_CONTAINER_TOOLTIP"] =
    "Voeg stukken toe, verwijder ze of wijzig de volgorde om dit lijstblok aan te passen.";
messages["LISTS_CREATE_WITH_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#create-list-with"; // untranslated
messages["LISTS_CREATE_WITH_INPUT_WITH"] = "maak een lijst met";
messages["LISTS_CREATE_WITH_ITEM_TOOLTIP"] = "Voeg iets toe aan de lijst.";
messages["LISTS_CREATE_WITH_TOOLTIP"] =
    "Maak een lijst met een willekeurig aantal items.";
messages["LISTS_GET_INDEX_FIRST"] = "eerste";
messages["LISTS_GET_INDEX_FROM_END"] = "# van einde";
messages["LISTS_GET_INDEX_FROM_START"] = "#";
messages["LISTS_GET_INDEX_GET"] = "haal op";
messages["LISTS_GET_INDEX_GET_REMOVE"] = "haal op en verwijder";
messages["LISTS_GET_INDEX_LAST"] = "laatste";
messages["LISTS_GET_INDEX_RANDOM"] = "willekeurig";
messages["LISTS_GET_INDEX_REMOVE"] = "verwijder";
messages["LISTS_GET_INDEX_TAIL"] = ""; // untranslated
messages["LISTS_GET_INDEX_TOOLTIP_GET_FIRST"] =
    "Geeft het eerste item in een lijst terug.";
messages["LISTS_GET_INDEX_TOOLTIP_GET_FROM"] =
    "Geeft het item op de opgegeven positie in een lijst.";
messages["LISTS_GET_INDEX_TOOLTIP_GET_LAST"] =
    "Geeft het laatste item in een lijst terug.";
messages["LISTS_GET_INDEX_TOOLTIP_GET_RANDOM"] =
    "Geeft een willekeurig item uit een lijst.";
messages["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST"] =
    "Geeft het laatste item in een lijst terug en verwijdert het.";
messages["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM"] =
    "Geeft het item op de opgegeven positie in een lijst terug en verwijdert het.";
messages["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST"] =
    "Geeft het laatste item uit een lijst terug en verwijdert het.";
messages["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM"] =
    "Geeft een willekeurig item in een lijst terug en verwijdert het.";
messages["LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST"] =
    "Verwijdert het eerste item in een lijst.";
messages["LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM"] =
    "Verwijdert het item op de opgegeven positie in een lijst.";
messages["LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST"] =
    "Verwijdert het laatste item uit een lijst.";
messages["LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM"] =
    "Verwijdert een willekeurig item uit een lijst.";
messages["LISTS_GET_SUBLIST_END_FROM_END"] = "naar # vanaf einde";
messages["LISTS_GET_SUBLIST_END_FROM_START"] = "naar item";
messages["LISTS_GET_SUBLIST_END_LAST"] = "naar laatste";
messages["LISTS_GET_SUBLIST_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#getting-a-sublist"; // untranslated
messages["LISTS_GET_SUBLIST_START_FIRST"] = "haal sublijst op vanaf eerste";
messages["LISTS_GET_SUBLIST_START_FROM_END"] =
    "haal sublijst op van positie vanaf einde";
messages["LISTS_GET_SUBLIST_START_FROM_START"] =
    "haal sublijst op vanaf positie";
messages["LISTS_GET_SUBLIST_TAIL"] = ""; // untranslated
messages["LISTS_GET_SUBLIST_TOOLTIP"] =
    "Maakt een kopie van het opgegeven deel van de lijst.";
messages["LISTS_INDEX_FROM_END_TOOLTIP"] = "Item %1 is het laatste item.";
messages["LISTS_INDEX_FROM_START_TOOLTIP"] = "Item %1 is het eerste item.";
messages["LISTS_INDEX_OF_FIRST"] = "zoek eerste voorkomen van item";
messages["LISTS_INDEX_OF_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#getting-items-from-a-list"; // untranslated
messages["LISTS_INDEX_OF_LAST"] = "zoek laatste voorkomen van item";
messages["LISTS_INDEX_OF_TOOLTIP"] =
    "Geeft de index terug van het eerste of laatste voorkomen van een item in de lijst. Geeft %1 terug als het item niet is gevonden.";
messages["LISTS_INLIST"] = "in lijst";
messages["LISTS_ISEMPTY_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#is-empty"; // untranslated
messages["LISTS_ISEMPTY_TITLE"] = "%1 is leeg";
messages["LISTS_ISEMPTY_TOOLTIP"] = "Geeft waar terug als de lijst leeg is.";
messages["LISTS_LENGTH_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#length-of"; // untranslated
messages["LISTS_LENGTH_TITLE"] = "lengte van %1";
messages["LISTS_LENGTH_TOOLTIP"] = "Geeft de lengte van een lijst terug.";
messages["LISTS_REPEAT_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#create-list-with"; // untranslated
messages["LISTS_REPEAT_TITLE"] = "Maak lijst met item %1, %2 keer herhaald";
messages["LISTS_REPEAT_TOOLTIP"] =
    "Maakt een lijst die bestaat uit de opgegeven waarde, het opgegeven aantal keer herhaald.";
messages["LISTS_REVERSE_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#reversing-a-list"; // untranslated
messages["LISTS_REVERSE_MESSAGE0"] = "%1 omkeren";
messages["LISTS_REVERSE_TOOLTIP"] = "Keert een kopie van een lijst om.";
messages["LISTS_SET_INDEX_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#in-list--set"; // untranslated
messages["LISTS_SET_INDEX_INPUT_TO"] = "als";
messages["LISTS_SET_INDEX_INSERT"] = "tussenvoegen op";
messages["LISTS_SET_INDEX_SET"] = "stel in";
messages["LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST"] =
    "Voegt het item toe aan het begin van de lijst.";
messages["LISTS_SET_INDEX_TOOLTIP_INSERT_FROM"] =
    "Voegt het item op een opgegeven positie in een lijst in.";
messages["LISTS_SET_INDEX_TOOLTIP_INSERT_LAST"] =
    "Voeg het item aan het einde van een lijst toe.";
messages["LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM"] =
    "Voegt het item op een willekeurige positie in de lijst in.";
messages["LISTS_SET_INDEX_TOOLTIP_SET_FIRST"] =
    "Stelt het eerste item in een lijst in.";
messages["LISTS_SET_INDEX_TOOLTIP_SET_FROM"] =
    "Zet het item op de opgegeven positie in de lijst.";
messages["LISTS_SET_INDEX_TOOLTIP_SET_LAST"] =
    "Stelt het laatste item van een lijst in.";
messages["LISTS_SET_INDEX_TOOLTIP_SET_RANDOM"] =
    "Stelt een willekeurig item uit de lijst in.";
messages["LISTS_SORT_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#sorting-a-list"; // untranslated
messages["LISTS_SORT_ORDER_ASCENDING"] = "oplopend";
messages["LISTS_SORT_ORDER_DESCENDING"] = "aflopend";
messages["LISTS_SORT_TITLE"] = "sorteer %1 %2 %3";
messages["LISTS_SORT_TOOLTIP"] = "Sorteer een kopie van een lijst.";
messages["LISTS_SORT_TYPE_IGNORECASE"] =
    "alfabetisch, negeer hoofd-/kleine letters";
messages["LISTS_SORT_TYPE_NUMERIC"] = "numeriek";
messages["LISTS_SORT_TYPE_TEXT"] = "alfabetisch";
messages["LISTS_SPLIT_HELPURL"] =
    "https://github.com/google/blockly/wiki/Lists#splitting-strings-and-joining-lists"; // untranslated
messages["LISTS_SPLIT_LIST_FROM_TEXT"] = "lijst maken van tekst";
messages["LISTS_SPLIT_TEXT_FROM_LIST"] = "tekst maken van lijst";
messages["LISTS_SPLIT_TOOLTIP_JOIN"] =
    "Lijst van tekstdelen samenvoegen in één stuk tekst, waarbij de tekstdelen gescheiden zijn door een scheidingsteken.";
messages["LISTS_SPLIT_TOOLTIP_SPLIT"] =
    "Tekst splitsen in een lijst van teksten op basis van een scheidingsteken.";
messages["LISTS_SPLIT_WITH_DELIMITER"] = "met scheidingsteken";
messages["LOGIC_BOOLEAN_FALSE"] = "0";
messages["LOGIC_BOOLEAN_HELPURL"] =
    "https://github.com/google/blockly/wiki/Logic#values"; // untranslated
messages["LOGIC_BOOLEAN_TOOLTIP"] = 'Geeft "waar" of "onwaar" terug.';
messages["LOGIC_BOOLEAN_TRUE"] = "1";
messages["LOGIC_COMPARE_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Ongelijkheid_(wiskunde)";
messages["LOGIC_COMPARE_TOOLTIP_EQ"] =
    'Geeft "waar", als beide waarden gelijk aan elkaar zijn.';
messages["LOGIC_COMPARE_TOOLTIP_GT"] =
    'Geeft "waar" terug als de eerste invoer meer is dan de tweede invoer.';
messages["LOGIC_COMPARE_TOOLTIP_GTE"] =
    'Geeft "waar" terug als de eerste invoer groter is of gelijk aan de tweede invoer.';
messages["LOGIC_COMPARE_TOOLTIP_LT"] =
    'Geeft "waar" als de eerste invoer kleiner is dan de tweede invoer.';
messages["LOGIC_COMPARE_TOOLTIP_LTE"] =
    'Geeft "waar" terug als de eerste invoer kleiner of gelijk is aan de tweede invoer.';
messages["LOGIC_COMPARE_TOOLTIP_NEQ"] =
    'Geeft "waar" terug als de waarden niet gelijk zijn aan elkaar.';
messages["LOGIC_NEGATE_HELPURL"] =
    "https://github.com/google/blockly/wiki/Logic#not"; // untranslated
messages["LOGIC_NEGATE_TITLE"] = "niet %1";
messages["LOGIC_NEGATE_TOOLTIP"] =
    'Geeft "waar" terug als de invoer "onwaar" is. Geeft "onwaar" als de invoer "waar" is.';
messages["LOGIC_NULL"] = "niets";
messages["LOGIC_NULL_HELPURL"] = "https://en.wikipedia.org/wiki/Nullable_type"; // untranslated
messages["LOGIC_NULL_TOOLTIP"] = "Geeft niets terug.";
messages["LOGIC_OPERATION_AND"] = "en";
messages["LOGIC_OPERATION_HELPURL"] =
    "https://github.com/google/blockly/wiki/Logic#logical-operations"; // untranslated
messages["LOGIC_OPERATION_OR"] = "of";
messages["LOGIC_OPERATION_TOOLTIP_AND"] =
    "Geeft waar als beide waarden waar zijn.";
messages["LOGIC_OPERATION_TOOLTIP_OR"] =
    'Geeft "waar" terug als in ieder geval één van de waarden waar is.';
messages["LOGIC_TERNARY_CONDITION"] = "test";
messages["LOGIC_TERNARY_HELPURL"] = "https://en.wikipedia.org/wiki/%3F:"; // untranslated
messages["LOGIC_TERNARY_IF_FALSE"] = "als onwaar";
messages["LOGIC_TERNARY_IF_TRUE"] = "als waar";
messages["LOGIC_TERNARY_TOOLTIP"] =
    'Test de voorwaarde in "test". Als de voorwaarde "waar" is, geef de waarde van "als waar" terug; geef anders de waarde van "als onwaar" terug.';
messages["MATH_ADDITION_SYMBOL"] = "+"; // untranslated
messages["MATH_ARITHMETIC_HELPURL"] = "https://nl.wikipedia.org/wiki/Rekenen";
messages["MATH_ARITHMETIC_TOOLTIP_ADD"] = "Geeft de som van 2 getallen.";
messages["MATH_ARITHMETIC_TOOLTIP_DIVIDE"] =
    "Geeft de gedeelde waarde van twee getallen.";
messages["MATH_ARITHMETIC_TOOLTIP_MINUS"] =
    "Geeft het verschil van de twee getallen.";
messages["MATH_ARITHMETIC_TOOLTIP_MULTIPLY"] =
    "Geeft het product terug van de twee getallen.";
messages["MATH_ARITHMETIC_TOOLTIP_POWER"] =
    "Geeft het eerste getal tot de macht van het tweede getal.";
messages["MATH_ATAN2_HELPURL"] = "https://en.wikipedia.org/wiki/Atan2"; // untranslated
messages["MATH_ATAN2_TITLE"] = "atan2 van X:%1 Y:%2";
messages["MATH_ATAN2_TOOLTIP"] =
    "Geef de boogtangens van punt (X, Y) terug in graden tussen -180 naar 180.";
messages["MATH_CHANGE_HELPURL"] =
    "https://en.wikipedia.org/wiki/Programming_idiom#Incrementing_a_counter"; // untranslated
messages["MATH_CHANGE_TITLE"] = "wijzig %1 met %2";
messages["MATH_CHANGE_TOOLTIP"] = 'Voegt een getal toe aan variabele "%1".';
messages["MATH_CONSTANT_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Wiskundige_constante";
messages["MATH_CONSTANT_TOOLTIP"] =
    "Geeft een van de vaak voorkomende constante waardes:  π (3.141…), e (2.718…), φ (1.618…), √2 (1.414…), √½ (0.707…), of ∞ (oneindig).";
messages["MATH_CONSTRAIN_HELPURL"] =
    "https://en.wikipedia.org/wiki/Clamping_(graphics)"; // untranslated
messages["MATH_CONSTRAIN_TITLE"] = "beperk %1 van minimaal %2 tot maximaal %3";
messages["MATH_CONSTRAIN_TOOLTIP"] =
    "Beperk een getal tussen de twee opgegeven limieten (inclusief).";
messages["MATH_DIVISION_SYMBOL"] = "÷"; // untranslated
messages["MATH_IS_DIVISIBLE_BY"] = "is deelbaar door";
messages["MATH_IS_EVEN"] = "is even";
messages["MATH_IS_NEGATIVE"] = "is negatief";
messages["MATH_IS_ODD"] = "is oneven";
messages["MATH_IS_POSITIVE"] = "is positief";
messages["MATH_IS_PRIME"] = "is priemgetal";
messages["MATH_IS_TOOLTIP"] =
    'Test of een getal even, oneven, een priemgetal, geheel, positief of negatief is, of deelbaar is door een bepaald getal. Geeft "waar" of "onwaar".';
messages["MATH_IS_WHOLE"] = "is geheel getal";
messages["MATH_MODULO_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Modulair_rekenen";
messages["MATH_MODULO_TITLE"] = "restgetal van %1 ÷ %2";
messages["MATH_MODULO_TOOLTIP"] =
    "Geeft het restgetal van het resultaat van de deling van de twee getallen.";
messages["MATH_MULTIPLICATION_SYMBOL"] = "×"; // untranslated
messages["MATH_NUMBER_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Getal_%28wiskunde%29";
messages["MATH_NUMBER_TOOLTIP"] = "Een getal.";
messages["MATH_ONLIST_HELPURL"] = ""; // untranslated
messages["MATH_ONLIST_OPERATOR_AVERAGE"] = "gemiddelde van lijst";
messages["MATH_ONLIST_OPERATOR_MAX"] = "hoogste uit lijst";
messages["MATH_ONLIST_OPERATOR_MEDIAN"] = "mediaan van lijst";
messages["MATH_ONLIST_OPERATOR_MIN"] = "laagste uit lijst";
messages["MATH_ONLIST_OPERATOR_MODE"] = "modi van lijst";
messages["MATH_ONLIST_OPERATOR_RANDOM"] = "willekeurige item van lijst";
messages["MATH_ONLIST_OPERATOR_STD_DEV"] = "standaarddeviatie van lijst";
messages["MATH_ONLIST_OPERATOR_SUM"] = "som van lijst";
messages["MATH_ONLIST_TOOLTIP_AVERAGE"] =
    "Geeft het gemiddelde terug van de numerieke waardes in een lijst.";
messages["MATH_ONLIST_TOOLTIP_MAX"] = "Geeft het grootste getal in een lijst.";
messages["MATH_ONLIST_TOOLTIP_MEDIAN"] = "Geeft de mediaan in de lijst.";
messages["MATH_ONLIST_TOOLTIP_MIN"] = "Geeft het kleinste getal uit een lijst.";
messages["MATH_ONLIST_TOOLTIP_MODE"] =
    "Geeft een lijst van de meest voorkomende onderdelen in de lijst.";
messages["MATH_ONLIST_TOOLTIP_RANDOM"] =
    "Geeft een willekeurig item uit de lijst terug.";
messages["MATH_ONLIST_TOOLTIP_STD_DEV"] =
    "Geeft de standaardafwijking van de lijst.";
messages["MATH_ONLIST_TOOLTIP_SUM"] =
    "Geeft de som van alle getallen in de lijst.";
messages["MATH_POWER_SYMBOL"] = "^"; // untranslated
messages["MATH_RANDOM_FLOAT_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Toevalsgenerator";
messages["MATH_RANDOM_FLOAT_TITLE_RANDOM"] = "willekeurige fractie";
messages["MATH_RANDOM_FLOAT_TOOLTIP"] =
    "Geeft een willekeurige fractie tussen 0.0 (inclusief) en 1.0 (exclusief).";
messages["MATH_RANDOM_INT_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Toevalsgenerator";
messages["MATH_RANDOM_INT_TITLE"] = "willekeurig getal van %1 tot %2";
messages["MATH_RANDOM_INT_TOOLTIP"] =
    "Geeft een willekeurig getal tussen de 2 opgegeven limieten in, inclusief.";
messages["MATH_ROUND_HELPURL"] = "https://nl.wikipedia.org/wiki/Afronden";
messages["MATH_ROUND_OPERATOR_ROUND"] = "afronden";
messages["MATH_ROUND_OPERATOR_ROUNDDOWN"] = "naar beneden afronden";
messages["MATH_ROUND_OPERATOR_ROUNDUP"] = "omhoog afronden";
messages["MATH_ROUND_TOOLTIP"] = "Rondt een getal af omhoog of naar beneden.";
messages["MATH_SINGLE_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Vierkantswortel";
messages["MATH_SINGLE_OP_ABSOLUTE"] = "absoluut";
messages["MATH_SINGLE_OP_ROOT"] = "wortel";
messages["MATH_SINGLE_TOOLTIP_ABS"] = "Geeft de absolute waarde van een getal.";
messages["MATH_SINGLE_TOOLTIP_EXP"] = "Geeft e tot de macht van een getal.";
messages["MATH_SINGLE_TOOLTIP_LN"] =
    "Geeft het natuurlijk logaritme van een getal.";
messages["MATH_SINGLE_TOOLTIP_LOG10"] =
    "Geeft het logaritme basis 10 van een getal.";
messages["MATH_SINGLE_TOOLTIP_NEG"] = "Geeft de negatief van een getal.";
messages["MATH_SINGLE_TOOLTIP_POW10"] = "Geeft 10 tot de macht van een getal.";
messages["MATH_SINGLE_TOOLTIP_ROOT"] = "Geeft de wortel van een getal.";
messages["MATH_SUBTRACTION_SYMBOL"] = "-"; // untranslated
messages["MATH_TRIG_ACOS"] = "acos";
messages["MATH_TRIG_ASIN"] = "asin";
messages["MATH_TRIG_ATAN"] = "arctan";
messages["MATH_TRIG_COS"] = "cos";
messages["MATH_TRIG_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Goniometrische_functie";
messages["MATH_TRIG_SIN"] = "sin";
messages["MATH_TRIG_TAN"] = "tan";
messages["MATH_TRIG_TOOLTIP_ACOS"] = "Geeft de arccosinus van een getal.";
messages["MATH_TRIG_TOOLTIP_ASIN"] = "Geeft de arcsinus van een getal.";
messages["MATH_TRIG_TOOLTIP_ATAN"] = "Geeft de arctangens van een getal.";
messages["MATH_TRIG_TOOLTIP_COS"] =
    "Geeft de cosinus van een graad (geen radialen).";
messages["MATH_TRIG_TOOLTIP_SIN"] =
    "Geeft de sinus van een graad (geen radialen).";
messages["MATH_TRIG_TOOLTIP_TAN"] =
    "Geeft de tangens van een graad (geen radialen).";
messages["NEW_COLOUR_VARIABLE"] = "Creëer kleurvariabele";
messages["NEW_NUMBER_VARIABLE"] = "Creëer numeriek variabele";
messages["NEW_STRING_VARIABLE"] = "Creëer tekstvariabele";
messages["NEW_VARIABLE"] = "Variabele maken...";
messages["NEW_VARIABLE_TITLE"] = "Nieuwe variabelenaam:";
messages["NEW_VARIABLE_TYPE_TITLE"] = "Nieuw soort variabele";
messages["ORDINAL_NUMBER_SUFFIX"] = ""; // untranslated
messages["PROCEDURES_ALLOW_STATEMENTS"] = "statements toestaan";
messages["PROCEDURES_BEFORE_PARAMS"] = "met:";
messages["PROCEDURES_CALLNORETURN_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Subprogramma";
messages["PROCEDURES_CALLNORETURN_TOOLTIP"] =
    'Voer de door de gebruiker gedefinieerde functie "%1" uit.';
messages["PROCEDURES_CALLRETURN_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Subprogramma";
messages["PROCEDURES_CALLRETURN_TOOLTIP"] =
    'Voer de door de gebruiker gedefinieerde functie "%1" uit en gebruik de uitvoer.';
messages["PROCEDURES_CALL_BEFORE_PARAMS"] = "met:";
messages["PROCEDURES_CREATE_DO"] = 'Maak "%1"';
messages["PROCEDURES_DEFNORETURN_COMMENT"] = "Deze functie beschrijven...";
messages["PROCEDURES_DEFNORETURN_DO"] = ""; // untranslated
messages["PROCEDURES_DEFNORETURN_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Subprogramma";
messages["PROCEDURES_DEFNORETURN_PROCEDURE"] = "naam";
messages["PROCEDURES_DEFNORETURN_TITLE"] = "Subprogramma";
messages["PROCEDURES_DEFNORETURN_TOOLTIP"] =
    "Maakt een functie zonder uitvoer.";
messages["PROCEDURES_DEFRETURN_HELPURL"] =
    "https://nl.wikipedia.org/wiki/Subprogramma";
messages["PROCEDURES_DEFRETURN_RETURN"] = "geef terug";
messages["PROCEDURES_DEFRETURN_TOOLTIP"] = "Maakt een functie met een uitvoer.";
messages["PROCEDURES_DEF_DUPLICATE_WARNING"] =
    "Waarschuwing: deze functie heeft parameters met dezelfde naam.";
messages["PROCEDURES_HIGHLIGHT_DEF"] = "Accentueer functiedefinitie";
messages["PROCEDURES_IFRETURN_HELPURL"] = "http://c2.com/cgi/wiki?GuardClause"; // untranslated
messages["PROCEDURES_IFRETURN_TOOLTIP"] =
    'Als de eerste waarde "waar" is, geef dan de tweede waarde terug.';
messages["PROCEDURES_IFRETURN_WARNING"] =
    "Waarschuwing: dit blok mag alleen gebruikt worden binnen de definitie van een functie.";
messages["PROCEDURES_MUTATORARG_TITLE"] = "invoernaam:";
messages["PROCEDURES_MUTATORARG_TOOLTIP"] =
    "Een invoer aan de functie toevoegen.";
messages["PROCEDURES_MUTATORCONTAINER_TITLE"] = "ingangen";
messages["PROCEDURES_MUTATORCONTAINER_TOOLTIP"] =
    "Invoer van deze functie toevoegen, verwijderen of herordenen.";
messages["REDO"] = "Opnieuw";
messages["REMOVE_COMMENT"] = "Opmerking verwijderen";
messages["RENAME_VARIABLE"] = "Variabele hernoemen...";
messages["RENAME_VARIABLE_TITLE"] = 'Alle variabelen "%1" hernoemen naar:';
messages["TEXT_APPEND_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#text-modification"; // untranslated
messages["TEXT_APPEND_TITLE"] = "voor%1 voeg tekst toe van %2";
messages["TEXT_APPEND_TOOLTIP"] = 'Voeg tekst toe aan de variabele "%1".';
messages["TEXT_CHANGECASE_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#adjusting-text-case"; // untranslated
messages["TEXT_CHANGECASE_OPERATOR_LOWERCASE"] = "naar kleine letters";
messages["TEXT_CHANGECASE_OPERATOR_TITLECASE"] = "naar Hoofdletter Per Woord";
messages["TEXT_CHANGECASE_OPERATOR_UPPERCASE"] = "naar HOOFDLETTERS";
messages["TEXT_CHANGECASE_TOOLTIP"] =
    "Geef een kopie van de tekst met veranderde hoofdletters terug.";
messages["TEXT_CHARAT_FIRST"] = "haal eerste letter op";
messages["TEXT_CHARAT_FROM_END"] = "haal letter # op vanaf einde";
messages["TEXT_CHARAT_FROM_START"] = "haal letter # op";
messages["TEXT_CHARAT_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#extracting-text"; // untranslated
messages["TEXT_CHARAT_LAST"] = "haal laatste letter op";
messages["TEXT_CHARAT_RANDOM"] = "haal willekeurige letter op";
messages["TEXT_CHARAT_TAIL"] = ""; // untranslated
messages["TEXT_CHARAT_TITLE"] = "letter %1 van %2";
messages["TEXT_CHARAT_TOOLTIP"] =
    "Geeft de letter op de opgegeven positie terug.";
messages["TEXT_COUNT_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#counting-substrings"; // untranslated
messages["TEXT_COUNT_MESSAGE0"] = "%1 in %2 tellen";
messages["TEXT_COUNT_TOOLTIP"] =
    "Tel hoe vaak bepaalde tekst voorkomt in andere tekst.";
messages["TEXT_CREATE_JOIN_ITEM_TOOLTIP"] = "Voegt een item aan de tekst toe.";
messages["TEXT_CREATE_JOIN_TITLE_JOIN"] = "samenvoegen";
messages["TEXT_CREATE_JOIN_TOOLTIP"] =
    "Toevoegen, verwijderen of volgorde wijzigen van secties om dit tekstblok opnieuw in te stellen.";
messages["TEXT_GET_SUBSTRING_END_FROM_END"] = "van letter # tot einde";
messages["TEXT_GET_SUBSTRING_END_FROM_START"] = "naar letter #";
messages["TEXT_GET_SUBSTRING_END_LAST"] = "naar laatste letter";
messages["TEXT_GET_SUBSTRING_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#extracting-a-region-of-text"; // untranslated
messages["TEXT_GET_SUBSTRING_INPUT_IN_TEXT"] = "in tekst";
messages["TEXT_GET_SUBSTRING_START_FIRST"] =
    "haal subtekst op van eerste letter";
messages["TEXT_GET_SUBSTRING_START_FROM_END"] =
    "haal subtekst op vanaf letter # vanaf einde";
messages["TEXT_GET_SUBSTRING_START_FROM_START"] =
    "haal subtekst op vanaf letter #";
messages["TEXT_GET_SUBSTRING_TAIL"] = ""; // untranslated
messages["TEXT_GET_SUBSTRING_TOOLTIP"] =
    "Geeft het opgegeven onderdeel van de tekst terug.";
messages["TEXT_INDEXOF_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#finding-text"; // untranslated
messages["TEXT_INDEXOF_OPERATOR_FIRST"] = "zoek eerste voorkomen van tekst";
messages["TEXT_INDEXOF_OPERATOR_LAST"] = "zoek het laatste voorkomen van tekst";
messages["TEXT_INDEXOF_TITLE"] = "in tekst %1 %2 %3";
messages["TEXT_INDEXOF_TOOLTIP"] =
    "Geeft de index terug van het eerste of laatste voorkomen van de eerste tekst in de tweede tekst. Geeft %1 terug als de tekst niet gevonden is.";
messages["TEXT_ISEMPTY_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#checking-for-empty-text"; // untranslated
messages["TEXT_ISEMPTY_TITLE"] = "%1 is leeg";
messages["TEXT_ISEMPTY_TOOLTIP"] =
    'Geeft "waar" terug, als de opgegeven tekst leeg is.';
messages["TEXT_JOIN_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#text-creation"; // untranslated
messages["TEXT_JOIN_TITLE_CREATEWITH"] = "voeg %1 en %2 samen";
messages["TEXT_JOIN_TOOLTIP"] =
    "Maakt een stuk tekst door één of meer items samen te voegen.";
messages["TEXT_LENGTH_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#text-modification"; // untranslated
messages["TEXT_LENGTH_TITLE"] = "lengte van %1";
messages["TEXT_LENGTH_TOOLTIP"] =
    "Geeft het aantal tekens terug (inclusief spaties) in de opgegeven tekst.";
messages["TEXT_INCLUDES_TITLE"] = "%1 bevat %2 ?";
messages["TEXT_PRINT_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#printing-text"; // untranslated
messages["TEXT_PRINT_TITLE"] = "tekst weergeven: %1";
messages["TEXT_PRINT_TOOLTIP"] =
    "Drukt de opgegeven tekst, getal of een andere waarde af.";
messages["TEXT_PROMPT_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#getting-input-from-the-user"; // untranslated
messages["TEXT_PROMPT_TOOLTIP_NUMBER"] =
    "Vraagt de gebruiker om een getal in te voeren.";
messages["TEXT_PROMPT_TOOLTIP_TEXT"] = "Vraagt de gebruiker om invoer.";
messages["TEXT_PROMPT_TYPE_NUMBER"] =
    "vraagt de gebruiker om een getal met de tekst";
messages["TEXT_PROMPT_TYPE_TEXT"] = "vraagt om invoer met bericht";
messages["TEXT_REPLACE_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#replacing-substrings"; // untranslated
messages["TEXT_REPLACE_MESSAGE0"] = "vervang %1 door %2 in %3";
messages["TEXT_REPLACE_TOOLTIP"] =
    "Vervang alle voorkomens van tekst in een andere tekst.";
messages["TEXT_REVERSE_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#reversing-text"; // untranslated
messages["TEXT_REVERSE_MESSAGE0"] = "%1 omkeren";
messages["TEXT_REVERSE_TOOLTIP"] =
    "Keert de volgorde van de tekens in de tekst om.";
messages["TEXT_TEXT_HELPURL"] =
    "https://nl.wikipedia.org/wiki/String_%28informatica%29";
messages["TEXT_TEXT_TOOLTIP"] = "Een letter, woord of een regel tekst.";
messages["TEXT_TRIM_HELPURL"] =
    "https://github.com/google/blockly/wiki/Text#trimming-removing-spaces"; // untranslated
messages["TEXT_TRIM_OPERATOR_BOTH"] = "spaties van beide kanten afhalen van";
messages["TEXT_TRIM_OPERATOR_LEFT"] =
    "spaties van de linkerkant verwijderen van";
messages["TEXT_TRIM_OPERATOR_RIGHT"] =
    "spaties van de rechterkant verwijderen van";
messages["TEXT_TRIM_TOOLTIP"] =
    "Geeft een kopie van de tekst met verwijderde spaties van één of beide kanten.";
messages["TEXT_TO_NUMBER"] = "Converteer %1 naar een nummer";
messages["TODAY"] = "Vandaag";
messages["UNDO"] = "Ongedaan maken";
messages["UNNAMED_KEY"] = "zonder naam";
messages["VARIABLES_DEFAULT_NAME"] = "item";
messages["VARIABLES_GET_CREATE_SET"] = 'Maak "verander %1"';
messages["VARIABLES_GET_HELPURL"] =
    "https://github.com/google/blockly/wiki/Variables#get"; // untranslated
messages["VARIABLES_GET_TOOLTIP"] = "Geeft de waarde van deze variabele.";
messages["VARIABLES_SET"] = "stel %1 in op %2";
messages["VARIABLES_SET_CREATE_GET"] = "Maak 'opvragen van %1'";
messages["VARIABLES_SET_HELPURL"] =
    "https://github.com/google/blockly/wiki/Variables#set"; // untranslated
messages["VARIABLES_SET_TOOLTIP"] =
    "Verandert de waarde van de variabele naar de waarde van de invoer.";
messages["VARIABLE_ALREADY_EXISTS"] =
    'Er bestaat al een variabele met de naam "%1".';
messages["VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE"] =
    "Een variabele met de naam '%1' bestaat al voor een ander soort variabele: '%2'.";
messages["WORKSPACE_ARIA_LABEL"] = "Blockly werkruimte";
messages["WORKSPACE_COMMENT_DEFAULT_TEXT"] = "Zeg iets...";
messages["CONTROLS_FOREACH_INPUT_DO"] = messages["CONTROLS_REPEAT_INPUT_DO"];
messages["CONTROLS_FOR_INPUT_DO"] = messages["CONTROLS_REPEAT_INPUT_DO"];
messages["CONTROLS_IF_ELSEIF_TITLE_ELSEIF"] =
    messages["CONTROLS_IF_MSG_ELSEIF"];
messages["CONTROLS_IF_ELSE_TITLE_ELSE"] = messages["CONTROLS_IF_MSG_ELSE"];
messages["CONTROLS_IF_IF_TITLE_IF"] = messages["CONTROLS_IF_MSG_IF"];
messages["CONTROLS_WHILEUNTIL_INPUT_DO"] = messages["CONTROLS_REPEAT_INPUT_DO"];
messages["LISTS_CREATE"] = "Maak lijst";
messages["LISTS_CREATE_WITH_ITEM_TITLE"] = messages["VARIABLES_DEFAULT_NAME"];
messages["LISTS_GET_INDEX_HELPURL"] = messages["LISTS_INDEX_OF_HELPURL"];
messages["LISTS_GET_INDEX_INPUT_IN_LIST"] = messages["LISTS_INLIST"];
messages["LISTS_GET_SUBLIST_INPUT_IN_LIST"] = messages["LISTS_INLIST"];
messages["LISTS_INDEX_OF_INPUT_IN_LIST"] = messages["LISTS_INLIST"];
messages["LISTS_SET_INDEX_INPUT_IN_LIST"] = messages["LISTS_INLIST"];
messages["MATH_CHANGE_TITLE_ITEM"] = messages["VARIABLES_DEFAULT_NAME"];
messages["PROCEDURES_DEFRETURN_COMMENT"] =
    messages["PROCEDURES_DEFNORETURN_COMMENT"];
messages["PROCEDURES_DEFRETURN_DO"] = messages["PROCEDURES_DEFNORETURN_DO"];
messages["PROCEDURES_DEFRETURN_PROCEDURE"] =
    messages["PROCEDURES_DEFNORETURN_PROCEDURE"];
messages["PROCEDURES_DEFRETURN_TITLE"] =
    messages["PROCEDURES_DEFNORETURN_TITLE"];
messages["TEXT_APPEND_VARIABLE"] = messages["VARIABLES_DEFAULT_NAME"];
messages["TEXT_CREATE_JOIN_ITEM_TITLE_ITEM"] =
    messages["VARIABLES_DEFAULT_NAME"];

messages["LEAPHY_HUE"] = "188";
messages["LOGIC_HUE"] = "210";
messages["LOOPS_HUE"] = "120";
messages["MATH_HUE"] = "230";
messages["TEXTS_HUE"] = "160";
messages["LISTS_HUE"] = "260";
messages["COLOUR_HUE"] = "20";
messages["VARIABLES_HUE"] = "330";
messages["VARIABLES_DYNAMIC_HUE"] = "310";
messages["PROCEDURES_HUE"] = "290";
messages["LEAPHY_DISPLAY_SET_TEXT_SIZE"] = "Zet tekstgrootte op";
messages["EMPTY_BACKPACK"] = "Leeg rugzak";
messages["REMOVE_FROM_BACKPACK"] = "Verwijder uit rugzak";
messages["COPY_TO_BACKPACK"] = "Kopieer naar rugzak";
messages["COPY_ALL_TO_BACKPACK"] = "Kopieer alles naar rugzak";
messages["PASTE_ALL_FROM_BACKPACK"] = "Plak alles uit rugzak";
messages["USE_I2C_CHANNEL"] = "Gebruik I2C kanaal";
messages["USE_I2C_CHANNEL_TOOLTIP"] =
    "Gebruik het geselecteerde I2C kanaal voor sensoren in dit blok";
messages["I2C_LIST_DEVICES"] = "Zoek naar verbonden I2C apparaten";
messages["LEAPHY_SEGMENT_INIT"] = "Stel segment scherm in op CLK %1 DIO %2";
messages["LEAPHY_SEGMENT_SET"] = "Zet segment scherm op %1";
messages["LEAPHY_SEGMENT_CLEAR"] = "Leeg segment scherm";
messages["LEAPHY_SEGMENT_SET_BRIGHTNESS"] =
    "Zet helderheid van segment scherm op %1";
messages["LEAPHY_MATRIX_INIT"] = "Stel matrix scherm in op DIN %1 CLK %2 CS %3";
messages["LEAPHY_MATRIX_SET"] = "Zet matrix scherm led op x %1 y %2 naar %3";
messages["LEAPHY_MATRIX_SET_BRIGHTNESS"] =
    "Zet helderheid van matrix scherm op %1";
messages["LEAPHY_MATRIX_CLEAR"] = "Leeg matrix scherm";
messages["LEAPHY_MATRIX_FILL"] = "Toon op matrix scherm %1 %2";
messages["LEAPHY_SOUND_INIT"] = "Stel speaker in op RX %1 TX %2";
messages["LEAPHY_SOUND_PLAY"] = "Speel audio %1 af";
messages["LEAPHY_SOUND_SET_VOLUME"] = "Stel volume in op %1";
messages["LEAPHY_SOUND_STOP"] = "Stop audio";
messages["LEAPHY_MESH_SETUP"] = "Stel mesh network in met naam %1";
messages["LEAPHY_MESH_UPDATE"] = "Update mesh";
messages["LEAPHY_MESH_ADD_PROCEDURE"] = "Voeg blok %1 toe aan mesh";
messages["LEAPHY_MESH_CALL_PROCEDURE"] = "Roep mesh blok %1 aan op %2";
messages["LEAPHY_MESH_CALL_PROCEDURE_ALL"] = "Roep mesh blok %1 aan op alle %2";
messages["LEAPHY_MESH_ON_CONNECTION"] = "Wanneer verbinding wordt gemaakt";
messages["LEAPHY_MESH_CLIENT"] = "Afzender";
messages["LEAPHY_BLUETOOTH_SETUP"] = "Stel Bluetooth in met naam %1";
messages["LEAPHY_BLUETOOTH_ON_CONNECT"] = "Wanneer verbinding wordt gemaakt";
messages["LEAPHY_BLUETOOTH_ON_DISCONNECT"] = "Wanneer verbinding wordt verbroken";
messages["LEAPHY_BLUETOOTH_START_LEAPHY_FILTERED_SCAN"] = "Start scannen naar Leaphy's";
messages["LEAPHY_BLUETOOTH_START_NAME_FILTERED_SCAN"] = "Start scannen naar BLE apparaten met naam %1";
messages["LEAPHY_BLUETOOTH_STOP_SCAN"] = "Stop scannen";
messages["LEAPHY_BLUETOOTH_ON_DISCOVER"] = "Wanneer BLE-apparaat wordt ontdekt";
messages["LEAPHY_BLUETOOTH_CREATE_BINARY_CHARACTERISTIC"] = "Creeer binaire karakteristiek met identiteit\n%1 en beginwaarde %2";
messages["LEAPHY_BLUETOOTH_CREATE_STRING_CHARACTERISTIC"] = "Creeer string karakteristiek met identiteit\n%1 en beginwaarde %2";
messages["LEAPHY_BLUETOOTH_CHARACTERISTIC_ON_UPDATE"] = "Wanneer karakteristiek %1 wordt geupdate";
messages["LEAPHY_BLUETOOTH_READ_BINARY_CHARACTERISTIC"] = "Lees waarde van binaire karakteristiek %1";
messages["LEAPHY_BLUETOOTH_READ_STRING_CHARACTERISTIC"] = "Lees waarde van string karakteristiek %1";
messages["LEAPHY_RTC_GET"] = "Haal %1 op van tijd";
messages["LEAPHY_RTC_SET"] = "Stel tijd in op %1";
messages["LEAPHY_RTC_FORMAT"] = "Formatteer tijd";
messages["LEAPHY_FORMAT"] = "Formaat";
messages["LEAPHY_SECOND"] = "Seconde";
messages["LEAPHY_MINUTE"] = "Minuut";
messages["LEAPHY_HOUR"] = "Uur";
messages["LEAPHY_WEEKDAY"] = "Weekdag";
messages["LEAPHY_DAY"] = "Dag van maand";
messages["LEAPHY_MONTH"] = "Maand";
messages["LEAPHY_YEAR"] = "Jaar";
messages["LEAPHY_WITH_FORMAT"] = "in formaat: %1";
messages["LEAPHY_NUMERIC"] = "Getallen";
messages["LEAPHY_2_DIGITS"] = "2 Getallen";
messages["LEAPHY_TEXT"] = "Tekst";
messages["LEAPHY_FULL"] = "Volledig";
messages["LEAPHY_TEMPLATE_FULL_NUMERIC"] = "Volledig nummers";
messages["LEAPHY_TEMPLATE_DATE_NUMERIC"] = "Datum nummers";
messages["LEAPHY_TEMPLATE_FULL_TEXT"] = "Volledig tekst";
messages["LEAPHY_TEMPLATE_DATE_TEXT"] = "Datum tekst";
messages["LEAPHY_TEMPLATE_TIME"] = "Tijd";
messages["LEAPHY_TEMPLATE_CUSTOM"] = "Aangepast";
messages["LEAPHY_READ_ACCELEROMETER"] = "Accelerometer-as %1";
messages["LEAPHY_ACCELEROMETER_AXIS_X"] = "X";
messages["LEAPHY_ACCELEROMETER_AXIS_Y"] = "Y";
messages["LEAPHY_ACCELEROMETER_AXIS_Z"] = "Z";
messages["LEAPHY_READ_GYROSCOPE"] = "Gyroscoop-as %1";
messages["LEAPHY_GYROSCOPE_AXIS_X"] = "X";
messages["LEAPHY_GYROSCOPE_AXIS_Y"] = "Y";
messages["LEAPHY_GYROSCOPE_AXIS_Z"] = "Z";

export default messages;
