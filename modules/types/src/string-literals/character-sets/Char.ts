import {
    AlphanumericChar,
    Bracket,
    NBSP,
    PlusMinus,
    Punctuation,
    QuoteCharacter,
    SpecialChar,
    Whitespace,
    CurrencyChar,
    MatchChar
 } from "types/string-literals";


/**
 * **Char**
 *
 * Meant to represent a single character. Includes:
 *
 * - Alphanumeric characters
 * - Punctuation ( .  ,  ;  !  ? )
 * - Whitespace ( " "  "\t"   "\n"   "\b" )
 * - Bracket characters ( { [ ( ) ] } )
 * - Quote characters ( "  '  ` )
 * - Currency characters ( $  ¢  £  €  ฿  ¥  ₹  ₽ )
 * - Math characters ( +  -  *   /   ^  ✕  ÷  =  ≄  >  < )
 * - Special Chars ( @ ~ # & | \ # )
 */
export type Char = AlphanumericChar | Punctuation | Whitespace | Bracket | SpecialChar  | QuoteCharacter | PlusMinus | NBSP | CurrencyChar | MatchChar;
