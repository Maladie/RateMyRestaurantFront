export class RegisterData {
    username: string;
    password: string;
    // TODO email name, surname etc...
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
