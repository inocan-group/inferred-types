/* eslint-disable no-use-before-define */
import { IfEqual } from "src/types/boolean-logic/IfEqual";
import { IfLength } from "src/types/boolean-logic/IfLength";
import { AfterFirst, AsArray, First } from "src/types/lists";
import { TupleToUnion } from "src/types/type-conversion";

type DefaultPrefix = ["www"];

type DNS = `${string}.${string}`;

type _Names<
  TDomain extends readonly DNS[],
  TPrefixes extends readonly string[],
  TResults extends readonly DomainName[] = []
> = [] extends TDomain
? TResults
: IfLength<
    TPrefixes, 0,
    _Names<
      AfterFirst<TDomain>,
      TPrefixes,
      [...TResults, First<TDomain>]
    >,
    _Names<
      AfterFirst<TDomain>,
      TPrefixes,
      [
        ...TResults,
        ...([First<TDomain>, `${TupleToUnion<TPrefixes>}.${First<TDomain>}`])
      ]
    >
  >;

/**
 * **DomainName**
 * 
 * Designed to represents a DNS name. 
 * 
 * - Without the use of _any_ generics it will simply enforce
 * that the domain name have a `.` with strings surrounding it
 * - You _can_ specify one or more top level domains and in these
 * cases it will:
 *    - each domain name by itself is allowed
 *    - each domain name _prefixed_ by one or more 
 */
export type DomainName<
  TDomain extends DNS | readonly DNS[] = DNS,
  TPrefixes extends readonly string[] = DefaultPrefix
> = IfEqual<
  TDomain, DNS,
  DNS,
  TupleToUnion<_Names<AsArray<TDomain>,TPrefixes>>
>;

