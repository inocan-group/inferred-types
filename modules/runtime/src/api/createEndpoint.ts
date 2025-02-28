import type {
    DefineObject,
    RestMethod,
    Uri,
    UrlPath,
} from "inferred-types/types";

interface State {
    base: Uri<"http" | "https">;
    endpoints?: any[];
}

type Response = [format: "text"]
    | [format: "md"]
    | [format: "html"]
    | [format: "json", structure: DefineObject];

export interface ConfigRestApi<
    TMethod extends RestMethod,
    TState extends State,
> {
    queryParameters: TMethod extends "GET"
        ? <T extends DefineObject>(body: T) => ConfigRestApi<TMethod, TState>
        : never;

    requestBody: TMethod extends "GET"
        ? never
        : <T extends DefineObject>(body: T) => ConfigRestApi<TMethod, TState>;

    response: (
        <TArgs extends Response>(...args: TArgs) => ConfigRestApi<TMethod, TState>
    );

    done: () => EndpointGenerator<TState>;
}

type ConfigCallback<
    _TMethod extends RestMethod,
> = any;

export interface EndpointGenerator<
    TState extends State,
> {
    get: <
        TPath extends UrlPath,
        TName extends string,
    >(
        path: TPath,
        name: TName,
        cb?: ConfigCallback<"GET">
    ) => EndpointGenerator<TState>;
    put: <
        TPath extends UrlPath,
        TName extends string,
    >(
        path: TPath,
        name: TName,
        cb?: ConfigCallback<"PUT">
    ) => EndpointGenerator<TState>;
    post: <
        TPath extends UrlPath,
        TName extends string,
    >(
        path: TPath,
        name: TName,
        cb?: ConfigCallback<"POST">
    ) => EndpointGenerator<TState>;
    patch: <
        TPath extends UrlPath,
        TName extends string,
    >(
        path: TPath,
        name: TName,
        cb?: ConfigCallback<"PATCH">
    ) => EndpointGenerator<TState>;
    delete: <
        TPath extends UrlPath,
        TName extends string,
    >(
        path: TPath,
        name: TName,
        cb?: ConfigCallback<"DELETE">
    ) => EndpointGenerator<TState>;

}

// interface EndpointState {
//   base: Uri<"http" | "https">;
//   endpoints?: any[];
// }

// const api = <TState extends EndpointState>(state: TState) => ({
//   get: <TName extends string>(name: TName, defn: any) => api({
//     ...state,
//     endpoints: [
//       ...(
//         state?.endpoints
//           ? state.endpoints.push("")
//           : [""]
//       )
//     ]
//   })
// })

// export function createEndpointsFrom<
//   TUri extends Uri<"http" | "https">,
// >(
//   base: TUri,
// ) {
//   return api({base}) as unknown as EndpointGenerator<{ base: TUri }>;
// }
