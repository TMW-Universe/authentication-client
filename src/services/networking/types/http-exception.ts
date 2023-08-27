export enum ExceptionSection {
    http,
    auth,
    auth2fa,
    user,
}

export class HttpException {
    statusCode!: number;
    message!: string;
    section!: ExceptionSection;
}