/**
 * **KlassMeta**`<T>`
 *
 * Given a class constructor `CTor`, this will return a tuple:
 *
 * ```ts
 * {
 *  args: ConstructorParams<CTor>,
 *  instance: InstanceType<CTor>,
 *  class_decorators: ClassDecoratorContext<CTor>,
 *  field_decorators: ClassFieldDecoratorContext<CTor>
 * }
 * ```
 */
export type KlassMeta<
  CTor extends abstract new (...args: any[]) => any,
> = CTor extends abstract new (...args: infer P) => infer R
  ? {
      params: P;
      instance: R;
      class_decorators: ClassDecoratorContext<CTor>;
      field_decorators: ClassFieldDecoratorContext<CTor>;
    }
  : never;
