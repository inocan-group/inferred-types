import type {
    AsStaticFn,
    FnArgsDefn,
    FnPropertiesDefn,
    FnReturnTypeDefn,
    FromDefn,
    FromWideTokens,
} from "inferred-types/types";

/**
 * **fn**
 *
 * provides an API surface for function definition
 */
export function fn<TArgs extends readonly FnArgsDefn[]>(..._args: TArgs) {
    return {
        returns: <TReturn extends FnReturnTypeDefn>(_rtn: TReturn) => ({
            addProperties: <TProps extends FnPropertiesDefn>(_kv: TProps) => {
                // TODO
                return null as unknown as AsStaticFn<
                    FromWideTokens<TArgs, FromDefn<TArgs>>,
                    FromWideTokens<TReturn, FromDefn<TReturn>>,
                    FromDefn<TProps>
                >;
            },
            done: () => {
                return null as unknown as AsStaticFn<
                    FromDefn<TArgs>,
                    FromDefn<TReturn>
                >;
            },
        }),
        done: () => {
            const result: unknown = null;
            return result as unknown as AsStaticFn<FromDefn<TArgs>>;
        },
    };
}
