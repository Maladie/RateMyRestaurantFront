export class ResponseInfo {
    public key: string;
    public code: number;
    public desc: string;
    public object: object;
    constructor() {
        this.key = '';
        this.code = -1;
        this.desc = '';
    }
    public stringInfo(): string {
        return 'key: ' + this.key + ' code: ' + this.code + ' desc:' + this.desc + ' obj: ' + this.object;
    }
}
