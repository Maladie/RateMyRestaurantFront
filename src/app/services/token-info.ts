
export class TokenInfo {
    access_token: string;
    expires_in: number; // in sec.

    constructor(access_token: string, expiresIn: number) {
        this.access_token = access_token;
        this.expires_in = expiresIn;
    }
}
