const string = `{{ string }}`;

export const AMAZON_BOOKS = [
  `https://www.amazon.com/${string}storeType=ebooks${string}`,
  `https://www.amazon.com/${string}ref=tmm_hrd_swatch${string}`,
  `https://www.amazon.com/${string}ref=tmm_pap_swatch${string}`,
  `https://www.amazon.com/${string}ref=tmm_aud_swatch${string}`,
  `https://www.amazon.com/books-used-books-textbooks/${string}`,
] as const;
