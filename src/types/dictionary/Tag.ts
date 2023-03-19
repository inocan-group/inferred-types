type Split<S extends string, P extends string> = S extends `${infer A}${P}${infer C}` ? [A, ...Split<C, P>] : [S];
type ToString<T> = T extends string?T:never;
type Universe = {[k in string]:never};
type RemoveUniverse<T> = T extends Universe & (infer A)?keyof A:never;
const w = Symbol();
type Sym = typeof w;
type GetTagsHelper<B> = 
  Equal<B,any> extends true? []:
  (Sym extends keyof B ? (Split<ToString<RemoveUniverse<B[Sym]>>,"/">) : false);
type GetTags<B,C=B extends unknown? GetTagsHelper<B>: never> = false extends C?[]:C;
type Tag<B, T extends string> = 
  Equal<B,any> extends false?
    Equal<B,never> extends false?
    ((Equal<Equal<B,null>,Equal<B,undefined>> extends false ? B:
      Sym extends keyof B ? UnTag<B> & { [x in Sym]?: Universe & {[x in `${ToString<RemoveUniverse<B[Sym]>>}/${T}`]?:true} }: B & { [x in Sym]?: Universe&{[x in T]?:true} })): Tag<1,T>:Tag<1,T>;
type UnTag<B> = Sym extends keyof B? Omit<B, Sym>:B;
type HasTag<B, T extends string> = any;
type HasTags<B, T extends readonly string[]> = any;
type HasExactTags<B, T extends readonly string[]> = any;
