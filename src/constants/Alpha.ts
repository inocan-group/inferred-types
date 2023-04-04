
/**
 * An array of all the lower-cased alphabetic characters
 */
export const LOWER_ALPHA_CHARS = [
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",] as const;

/**
 * An array of all the upper-cased alphabetic characters
 */
export const UPPER_ALPHA_CHARS = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
] as const;

/**
 * An array of all alphabetic characters (upper and lower)
 */
export const ALPHA_CHARS = [
  ...LOWER_ALPHA_CHARS,
  ...UPPER_ALPHA_CHARS
] as const;
