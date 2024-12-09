import type { AMAZON_BOOKS } from "inferred-types/constants";
import type { ReplaceAll } from "inferred-types/types";

type Books = typeof AMAZON_BOOKS[number];

export type AmazonBooks = ReplaceAll<Books, "{{ string }}", `${string}`>;
