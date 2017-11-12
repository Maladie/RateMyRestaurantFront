export class ResponseInfo {
    public key: string;
    public code: 0;
    public desc: string;
    public object: object;
    public stringInfo(): string {
        return 'key: ' + this.key + ' code: ' + this.code + ' desc:' + this.desc + ' obj: ' + this.object;
    }
}
