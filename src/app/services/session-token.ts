export class SessionToken {
    expiresAt: number;
    token: string;
    constructor(expiresAt: number, token: string) {
        this.expiresAt = expiresAt;
        this.token = token;
    }
}
