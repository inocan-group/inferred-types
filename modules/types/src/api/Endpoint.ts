import type {
    DefineObject,
    GetUrlDynamics,
    HttpHeaders,
    RestMethod,
    TypeSubtype,
    Uri,
    UrlPathChars
} from "inferred-types/types";

/**
 * Represents an API endpoint in a convenient fashion.
 */
export interface RestEndpoint<
    TMethod extends RestMethod,
    TBase extends Uri<"http" | "https">,
    TPath extends `/${UrlPathChars}${string}`,
    TQuery extends `?${string}` | undefined,
> {
    method: TMethod;
    base: TBase;
    path: TPath;
    qp: TQuery;

    type: {
        url: string;
        request: string;
        response: string;
    };

    params: GetUrlDynamics<`${TBase}${TPath}${TQuery}`>;

    requestHeaders: HttpHeaders;
    requestBody?: DefineObject;

    responseContentType?: TypeSubtype;
    responseBody?: DefineObject;

    // curl: <T extends GetUrlPathDynamics<TPath>>(...pathParams: T) => any;
    // wget: <T extends GetUrlPathDynamics<TPath>>(...pathParams: T) => any;

    // fetchConfig: <T extends GetUrlPathDynamics<TPath>>(...pathParams: T) => any;
}
