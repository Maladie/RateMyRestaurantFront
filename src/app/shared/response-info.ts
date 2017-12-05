export class ResponseInfo {
    public key: string;
    public code: number;
    public desc: string;
    public infoCode: string;
    public object: object;
    constructor() {
        this.key = '';
        this.code = -1;
        this.infoCode = '';
        this.desc = '';
    }
    public stringInfo(): string {
        return 'key: ' + this.key + ' code: ' + this.code + ' infoCode: ' + this.infoCode + ' desc:' + this.desc + ' obj: ' + this.object;
    }
}
