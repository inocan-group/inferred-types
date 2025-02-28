import type {
    AnyFunction,
    AsArray,
    Dictionary,
    Fail,
    Flatten,
    IsInteger,
} from "inferred-types/types";
import type { BCP47 } from "../string-literals/character-sets/BCP";

type ShallowCopy<T> = T;
type New<T> = T;

/**
 * **List**`<T,S>`
 *
 * A _list_ of elements. Meant to behave precisely as
 * [Javascript's Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
 * but with better behavior when using with `let` or `var`
 * variable declarations (versus `const` which is semantically peculiar).
 */
export interface List<T = unknown, ID extends string = string> {
    id: ID;
    length: number;
    [key: number]: T;
    [Symbol.iterator]: () => Iterator<T, Array<T>>;
    /**
     * **at**`(idx)`
     *
     * The `at()` method of Array instances takes an integer value
     * and returns the item at that index, allowing for positive and
     * negative integers. Negative integers count back from the last
     * item in the array.
     */
    at: <TIdx extends number>(idx: Fail<TIdx, IsInteger<TIdx>>) => T;
    /**
     * **concat**`(arr | list)`
     *
     * The concat() method of Array instances is used to merge two or more arrays.
     * This method does not change the existing arrays, but instead returns a new array.
     */
    concat: <TConcat extends List<T> | AsArray<T>>(list: TConcat) => List<T>;
    copyWithin: AnyFunction;
    /**
     * **entries**`()`
     *
     * Returns a new array iterator object that contains the key/value pairs
     * for each index in the array.
     */
    entries: () => Iterator<[number, T], Array<T>>;

    /**
     * **every**`(callback)`
     *
     * Tests whether all elements in the array pass the test implemented by the
     * provided callback function. It returns a Boolean value.
     */
    every: <
        TCall extends ((v: T) => boolean),
        TReturn extends boolean,
    >(cb: TCall
    ) => TReturn;

    /**
     * **fill**`(val)`
     *
     * Changes _all elements_ within a range of valid indices on the list to the
     * passed in value.
     */
    fill: <F extends T>(v: F) => List<F, `${ID} -> fill`>;

    /**
     * **filter**`(callback)`
     *
     * Returns a _shallow copy_ of a portion of a given List. The "portion" is filtered
     * down to just the elements from the given List that pass the test implemented by
     * the provided callback function.
     */
    filter: <TCall extends ((v: T) => boolean)>(cb: TCall) => ShallowCopy<List<T, `${ID}sc`>>;

    /**
     * **find**`(callback)`
     *
     * Returns the first element in the provided array that satisfies
     * the provided testing callback function.
     *
     * If no values satisfy the testing function, _undefined_ is returned.
     */
    find: <TCall extends ((v: T) => boolean)>(cb: TCall) => ShallowCopy<List<T, `${ID}f`>> | undefined;

    /**
     * **findIndex**`(callback)`
     *
     * Returns the index of the first element in an array that satisfies the provided
     * testing function.
     *
     * If no elements satisfy the testing function, -1 is returned.
     */
    findIndex: <TCall extends ((v: T) => boolean)>(cb: TCall) => number | undefined;

    /**
     * **findLast**`(callback)`
     *
     * iterates the List in reverse order and returns the first element
     * that satisfies the provided callback function.
     *
     * If no elements satisfy the callback function, _undefined_ is returned.
     */
    findLast: <TCall extends ((v: T) => boolean)>(cb: TCall) => ShallowCopy<List<T, `${ID}fl`>> | undefined;

    /**
     * iterates the array in reverse order and returns the index of the first element
     * that satisfies the provided testing function.
     *
     * If no elements satisfy the testing function, -1 is returned.
     */
    findLastIndex: (cb: ((v: T) => boolean)) => number | undefined;
    /**
     * **flat**`([depth])`
     *
     * Creates a new List with all sub-lists elements _flattened_ to the specified depth.
     *
     * **Note:** if no depth is specified `1` is used.
     */
    flat: <TDepth extends number = 1>(depth?: TDepth) => List<
        Flatten<
            T,
            TDepth extends 1 | 2 | 3 ? TDepth : 3,
            true
        >,
    `${ID} -> flattened${TDepth extends 1 ? "" : `(${TDepth})`}`
    >;
    /**
     * **flatMap**`(callback, [thisArg])`
     *
     * Returns a new List formed by applying the given callback function to each element
     * of the List, and then flattening the result by one level. It is identical to a
     * map() followed by a flat() of depth 1 (arr.map(...args).flat()),
     * but slightly more efficient than calling those two methods separately.
     *
     * **Note:** the value of `thisArg` sets the `this` value when executing the
     * callback.
     */
    flatMap: <
        TCall extends ((v: T) => unknown),
        TArg,
    >(cb: TCall,
        thisArg?: TArg) => List<
        Flatten<ReturnType<TCall>, 1, true>,
    `${ID} -> mapped`
    >;

    /**
     * **forEach**`(callback)`
     *
     * Executes a provided callback function once for each array element.
     *
     * **Note:** the callback is allowed to return values but these values will ignored
     * as the _forEach_ function never returns anything.
     */
    forEach: (cb: ((v: T) => unknown)) => void;

    /**
     * Determines whether an array includes a certain value among its entries,
     * returning true or false as appropriate.
     */
    includes: (val: T) => boolean;
    /**
     * **indexOf**`(find, [instance])`
     *
     * Returns the first index at which a given element can be found in the
     * List, or -1 if it is not present.
     */
    indexOf: (val: T, instance?: number) => number;
    /**
     * **join**`([separator])`
     *
     * Returns a new string by concatenating all of the elements in this List.
     *
     * If the optional _separator_ param is used then adjoining items in the List
     * will have the text provided.
     */
    join: <TSep extends string = "">(sep?: TSep) => string;

    /**
     * **keys**`()`
     *
     * returns a new `Iterator` that contains all of the keys for the List
     */
    keys: () => Iterator<T, Array<T>>;

    /**
     * **lastIndexOf**`(find)`
     *
     * Returns the last index at which a given element can be found in the array,
     * or -1 if it is not present.
     *
     * The array is searched backwards, starting at fromIndex.
     */
    lastIndexOf: (find: T) => number;

    /**
     * **map**`(callbackfn)`
     *
     * Calls a defined callback function on each element of an array, and returns an array
     * that contains the results.
     *
     * @param callbackfn — A function that accepts up to three arguments. The map method
     * calls the callbackfn function one time for each element in the array.
     *
     * @param thisArg — An object to which the this keyword can refer in the callbackfn
     * function. If thisArg is omitted, undefined is used as the this value.
     */
    map: <M extends ((v: T) => unknown)>(cb: M) => List<ReturnType<M>, `${ID} -> mapped`>;

    /**
     * **pop**`()`
     *
     * Returns the last element from an List _while_ removing it from the List.
     */
    pop: () => T;

    /**
     * **push**`(value)`
     *
     * Adds the specified elements to the end of an List and returns the new
     * length of the List.
     */
    push: <V extends readonly T[]>(...values: V) => number;

    /**
     *  **reduce**`(callback, initialValue)`
     *
     * Executes a user-supplied "reducer" callback function on each element of
     * the array, in order, passing in the return value from the calculation on
     * the preceding element. The final result of running the reducer across all
     * elements of the array is a single value.
     *
     * The first time that the callback is run there is no "return value of the
     * previous calculation". If supplied, an initial value may be used in its place.
     * Otherwise the array element at index 0 is used as the initial value and
     * iteration starts from the next element (index 1 instead of index 0).
     */
    reduce: <
        TCall extends ((acc: T[], v: T) => unknown),
        TVal = List<ReturnType<TCall>, `${ID} -> reduced`>,
    >(cb: TCall,
        initialValue?: TVal
    ) => TVal;

    /**
     * **reduceRight**`(callback, initialValue)`
     *
     * Applies a callback function against an accumulator and each value of
     * the array (from right-to-left) to reduce it to a single value.
     */
    reduceRight: <
        TCall extends ((acc: T[], v: T) => unknown),
        TVal = List<ReturnType<TCall>, `${ID} ->reducedRight`>,
    >(cb: TCall,
        initialValue?: TVal
    ) => TVal;

    /**
     * **reverse**`()`
     *
     * Reverses a List in place and returns the reference to the same List,
     * the first element now becoming the last, and the last element
     * becoming the first. In other words, elements order in the array will be
     * turned towards the direction opposite to that previously stated.
     */
    reverse: () => List<T, `${ID}r`>;

    /**
     * **shift**`()`
     *
     * Removes the first element from an array and returns that removed element.
     * This method changes the length of the array.
     */
    shift: () => T;
    /**
     * **slice**([start],[end])
     *
     * Returns a shallow copy of a portion of an array into a new array object
     * selected from start to end (end not included) where start and end represent
     * the index of items in that array. The original array will not be modified.
     */
    slice: <
        TStart extends number,
        TStop extends number,
    >(start?: TStart,
        stop?: TStop
    ) => ShallowCopy<List<T, `${ID}-> sliced`>>;
    /**
     * **some**`(callback)`
     *
     * Tests whether at least one element in the array passes the test implemented
     * by the provided callback function. It returns true if, in the array, it finds
     * an element for which the provided function returns true; otherwise it returns
     * false. It doesn't modify the List.
     */
    some: <TCall extends ((v: T) => boolean)>(cb: TCall) => boolean;

    /**
     *  **sort**`(callback)`
     *
     * Sorts the elements of an array in place and returns a reference to the same
     * List, now sorted.
     *
     * The default sort order is ascending, built upon converting the elements
     * into strings, then comparing their sequences of UTF-16 code units values.
     */
    sort: <TCall extends ((a: T, b: T) => number)>(cb: TCall) => List<T, `${ID} -> sorted`>;
    /**
     * **splice**`(start,[deleteCount],[...items])`
     *
     * Changes the contents of an array by removing or replacing existing elements
     * and/or adding new elements in place.
     */
    splice: (start: number, deleteCount?: number, ...items: T[]) => List<
        T,
    `${ID} -> spliced`
    >;

    /**
     * **toLocaleString**`()`
     *
     * Returns a string representing the elements of the array.
     *
     * The elements are converted to strings using their toLocaleString methods and
     * these strings are separated by a locale-specific string (such as a comma ",").
     */
    toLocaleString: <
        TLang extends BCP47,
        TOpts extends Dictionary,
    >(lang: TLang,
        opt?: TOpts
    ) => string;
    /**
     * **toReversed**`()`
     *
     * Is the _copying_ counterpart of the reverse() method. It returns a new array
     * with the elements in reversed order.
     */
    toReversed: () => List<T, `${ID}r`>;
    /**
     * **toSorted**`()`
     *
     *  Is the _copying_ version of the sort() method. It returns a new array with
     * the elements sorted in ascending order.
     */
    toSorted: () => List<T, `${ID}s`>;
    /**
     * **toSpliced**`(start, [deleteCount], ...[items])`
     *
     * Is the _copying_ version of the splice() method. It returns a new array with
     * some elements removed and/or replaced at a given index.
     */
    toSpliced: (start: number, deleteCount?: number, ...items: T[]) => List<
        T,
    `${ID} -> toSpliced`
    >;
    /**
     * **toString**`()`
     *
     * Returns a string representing the specified array and its elements.
     */
    toString: () => string;

    /**
     * **unshift**`(...elements)`
     *
     * Adds the specified elements to the beginning of an array and returns the
     * new length of the array.
     */
    unshift: (...elements: T[]) => number;
    /**
     * **values**`()`
     *
     * returns an _iterator_ that iterates the value of each item in the array.
     */
    values: () => Iterator<T, Array<T>>;
    /**
     * **with**`(idx, val)`
     *
     * Is the _copying_ version of using the bracket notation to change the value of a
     * given index. It returns a new array with the element at the given index replaced
     * with the given value.
     */
    with: (idx: number, val: T) => New<List<T, `${ID}w`>>;

}
