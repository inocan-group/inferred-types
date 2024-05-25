import { 
  AsLiteralFn,  
  FnArgsDefn, 
  FnPropertiesDefn, 
  FnReturnTypeDefn, 
  FromDefn, 
  FromWideTokens 
} from "src/types/index";


export const fn = <TArgs extends readonly FnArgsDefn[]>(..._args: TArgs) => ({
  returns: <TReturn extends FnReturnTypeDefn>(_rtn: TReturn) => ({
    addProperties: <TProps extends FnPropertiesDefn>(_kv: TProps) => {
      // TODO
      return null as unknown as AsLiteralFn<
        FromWideTokens<TArgs, FromDefn<TArgs>>,
        FromWideTokens<TReturn, FromDefn<TReturn>>,
        FromDefn<TProps>
      >
    },
    done: () => {
      return null as unknown as AsLiteralFn<
        FromDefn<TArgs>,
        FromDefn<TReturn>
      >
    }
  }),
  done: () => {
    const result:unknown = null;
    return result as AsLiteralFn<FromDefn<TArgs>>;
  }
});
