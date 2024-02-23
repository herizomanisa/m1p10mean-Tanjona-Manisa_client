interface Response{
    message: string;
    code: number
}

export interface ResponseData<T>{
    status: boolean;
    message: string;
    details: T | null;
    http_response: Response
}