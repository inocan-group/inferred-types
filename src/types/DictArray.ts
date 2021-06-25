/* eslint-disable no-use-before-define */

import { ExpandRecursively } from "./ExpandRecursively";

export type DictArrayFilterCallback<K extends keyof T, T extends object> = (key: K, value: Pick<T, K>) => true | false;

/**
 * An element in a `DictArray` shaped as a two element tuple: `[key, kv]`.
 */
export type DictArrayKv<K extends keyof T, T> = [K, ExpandRecursively<Pick<T, K>>];

/**
 * Represents an object in an iterable array which preserves strong typing.
 * 
 * > Note: this is output artifact of the `dictToArray()` utility fn
 */
export type DictArray<T> = Array<{ [K in keyof T]: DictArrayKv<K, T> }[keyof T]>;


