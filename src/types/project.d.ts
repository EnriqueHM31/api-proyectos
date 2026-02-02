export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | string;

export interface Endpoint {
    method: HttpMethod;
    path: string;
    description: string;
}

export interface Project {
    name: string;
    description: string;
    endpoints: Endpoint[];
}
