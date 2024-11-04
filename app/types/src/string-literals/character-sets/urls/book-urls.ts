import { AMAZON_BOOKS } from "inferred-types";
import {  ReplaceAll } from "src/types/index";
type Books = typeof AMAZON_BOOKS[number];

export type AmazonBooks = ReplaceAll<Books, "{{ string }}", `${string}`>



