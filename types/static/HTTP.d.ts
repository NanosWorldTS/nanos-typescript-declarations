/**
 * HTTP Requests Interface
 *
 * @remarks <i>Authority</i>: This can be accessed only on <b><u>Server</u></b>.
 */
declare class HTTP {

    /**
     * Makes an asynchronous HTTP Request.
     *
     * The request will be made asynchronously and returned safetly in the same thread in the callback provided when it's done.
     *
     * @param uri {@link string} The main URI
     * @param endpoint {@link string} The endpoint. Defaults to "/"
     * @param method {@link HttpMethod} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods">HTTP method</a> to be used. Defaults to GET
     * @param data {@link any} Payload. Defaults to empty string ("")
     * @param content_type {@link string} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types">content type</a> of the payload. Defaults to "application/json"
     * @param compress {@link boolean} Whether or not to compress the content with gzip. Defaults to false
     * @param headers {@link any} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers">Headers</a> to be used. Defaults to empty object ({})
     * @param callback {@link HttpCallback} The result will be called in the format. Defaults to null
     *
     * @remarks If a request is still running when unloading packages, the server will freeze until it's finished, then the package will unload.
     *
     * @noSelf
     */
    public static Request(uri: string, endpoint?: string, method?: HttpMethod, data?: string, content_type?: string, compress?: boolean, headers?: any, callback?: HttpCallback): void;

    /**
     * Makes a synchronous HTTP Request.
     *
     * The request will be made synchronously and will freeze the server until it's done.
     *
     * @param uri {@link string} The main URI
     * @param endpoint {@link string} The endpoint. Defaults to "/"
     * @param method {@link HttpMethod} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods">HTTP method</a> to be used. Defaults to GET
     * @param data {@link any} Payload. Defaults to empty string ("")
     * @param content_type {@link string} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types">content type</a> of the payload. Defaults to "application/json"
     * @param compress {@link boolean} Whether or not to compress the content with gzip. Defaults to false
     * @param headers {@link any} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers">Headers</a> to be used. Defaults to empty object ({})
     *
     * @noSelf
     */
    public static RequestSync(uri: string, endpoint?: string, method?: HttpMethod, data?: string, content_type?: string, compress?: boolean, headers?: any): { Status: number, Data: string };
}

type HttpMethod = string | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
type HttpCallback = (status: number, data: string) => void;
