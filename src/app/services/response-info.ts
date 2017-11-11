export class ResponseInfo {
    public key: string;
    public code: number;
    public desc: string;
    public object: object;
    public stringInfo(): string {
        return 'key: ' + this.key + ' code: ' + this.code + ' desc:' + this.desc + ' obj: ' + this.object;
    }
}
