/* eslint-disable @typescript-eslint/no-explicit-any */
// import { IndexableObject, EmptyObject } from "src/types";

// /**
//  * **AnyObject**
//  * 
//  * Meant to represent _any_ valid object type (but excluding an array).
//  */
// export type AnyObject = (IndexableObject | EmptyObject) ;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmptyObject, IndexableObject } from "src/types";

/**
 * **AnyObject**
 * 
 * Meant to represent any valid object type (both indexable and not).
 */
export type AnyObject = IndexableObject | EmptyObject;

