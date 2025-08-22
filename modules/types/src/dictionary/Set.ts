import {
    Suggest,
    DotPathFor,
    Container
} from 'inferred-types/types';

type SetAtIndex<T extends readonly unknown[], K extends string, V> = 
    K extends keyof T
        ? { [P in keyof T]: P extends K ? V : T[P] }
        : T;

type StripLeadingDot<T> = T extends `.${infer Rest}` ? Rest : T;

type _Set<T, K, V> = StripLeadingDot<K> extends `${infer Head}.${infer Tail}`
    ? T extends readonly unknown[]
        ? Head extends keyof T
            ? { [P in keyof T]: P extends Head ? _Set<T[P], Tail, V> : T[P] }
            : T
        : T extends object
            ? Head extends keyof T
                ? { [P in keyof T]: P extends Head ? _Set<T[P], Tail, V> : T[P] }
                : T & { [P in Head]: _Set<unknown, Tail, V> }
            : T
    : StripLeadingDot<K> extends keyof T
        ? T extends readonly unknown[]
            ? SetAtIndex<T, StripLeadingDot<K> & string, V>
            : T extends object
                ? { [P in keyof T]: P extends StripLeadingDot<K> ? V : T[P] }
                : T
        : T extends object
            ? StripLeadingDot<K> extends string | number | symbol
                ? T & { [P in StripLeadingDot<K>]: V }
                : T
            : T;

export type Set<
    TContainer extends Container,
    TDotPath extends Suggest<DotPathFor<TContainer>>,
    TValue
> = _Set<TContainer, TDotPath, TValue>;


