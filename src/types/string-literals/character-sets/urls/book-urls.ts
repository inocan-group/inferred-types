import { AMAZON_BOOKS } from "inferred-types/dist/constants/index";
import {  ReplaceAll } from "inferred-types/dist/types/index";
type Books = typeof AMAZON_BOOKS[number];

export type AmazonBooks = ReplaceAll<Books, "{{ string }}", `${string}`>



