class ApiError extends Error {
    constructor({
        message = "Something went wrong",
        statusCode = 0,
        code = "UNKNOWN_ERROR",
        errors = [],
        isNetworkError = false,
    } = {}) {
        super(message);

        this.name = "ApiError";
        this.statusCode = statusCode;
        this.code = code;
        this.errors = errors;
        this.isNetworkError = isNetworkError;
    }
}

class Client {
    constructor() {
        this.serverUrl = import.meta.env.VITE_SERVER_URL;
        this.refreshPromise = null;
    }

    async request(path, options = {}) {
        let response;

        try {
            response = await this.fetch(path, options);

            // Access token expired
            if (response.status === 401 && path !== "/users/refreshtoken") {
                await this.refreshToken();

                // Retry original request
                response = await this.fetch(path, options);
            }

            return await this.handleResponse(response);
        } catch (error) {
            // Already our normalized error
            if (error instanceof ApiError) {
                throw error;
            }

            // Network / fetch error
            throw new ApiError({
                message: "Unable to connect to the server.",
                code: "NETWORK_ERROR",
                isNetworkError: true,
            });
        }
    }

    async fetch(path, options = {}) {
        return fetch(`${this.serverUrl}${path}`, {
            ...options,
            credentials: "include",
        });
    }

    async refreshToken() {
        // Prevent multiple simultaneous refresh requests
        if (!this.refreshPromise) {
            this.refreshPromise = this.fetch("/users/refreshtoken", {
                method: "POST",
            })
                .then(async (response) => {
                    if (!response.ok) {
                        throw new ApiError({
                            statusCode: response.status,
                            code: "REFRESH_TOKEN_FAILED",
                            message: "Your session has expired.",
                        });
                    }

                    return response;
                })
                .finally(() => {
                    this.refreshPromise = null;
                });
        }

        return this.refreshPromise;
    }

    async handleResponse(response) {
        let body = null;

        try {
            body = await response.json();
        } catch {
            // Response has no JSON body
        }

        if (!response.ok) {
            throw new ApiError({
                statusCode: response.status,
                code: body?.code || `HTTP_${response.status}`,
                message:
                    body?.message || this.getDefaultMessage(response.status),
                errors: body?.errors || [],
            });
        }

        return body;
    }

    getDefaultMessage(statusCode) {
        switch (statusCode) {
            case 400:
                return "Invalid request.";

            case 401:
                return "Please sign in to continue.";

            case 403:
                return "You don't have permission to perform this action.";

            case 404:
                return "The requested resource was not found.";

            case 409:
                return "This operation conflicts with existing data.";

            case 422:
                return "Please check the information you provided.";

            case 429:
                return "Too many requests. Please try again later.";

            case 500:
                return "Something went wrong on the server.";

            case 502:
            case 503:
            case 504:
                return "The server is temporarily unavailable.";

            default:
                return "Something went wrong.";
        }
    }
}

const client = new Client();

export { ApiError };
export default client;