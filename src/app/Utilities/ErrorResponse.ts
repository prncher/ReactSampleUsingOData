export interface ErrorResponse {
    code: number;
    status: string;
    message: string;
    detailedErrorMessages?: Map<string, string>;
}