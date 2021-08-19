export function Model<N extends string, _R extends {} = {}, _O extends {} = {}>(name: N) {
  // let tg: TypeGuard<any> = (_input: unknown) => {
  //   throw new Error(`No typeguard was assigned to the model ${name}`);
  // };

  return {
    required<P extends string>(_prop: P) {
      return Model(name);
    },
    optional<P extends string>(_prop: P) {
      return Model(name);
    },
    // typeGuard<TG extends TypeGuard<any>>(typeguard: TG) {
    //   tg = typeguard;
    //   return Model(name);
    // },
    done() {
      return {
        __model__: name,
        __kind__: "model" as const,
        // __tg__: tg,
      };
    },
  };
}
