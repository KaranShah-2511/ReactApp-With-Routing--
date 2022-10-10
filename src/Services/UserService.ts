
import { Http } from '../Core/Services/HttpService';

export type LoginParam = {
    Email: string;
    Password: string;
    UserType: string;
    AccessedVia?: string;
    Device?: string;
    OS?: string | null;
    PushToken?: string;
}

export class User {

    _id: string | undefined;
    Email: string | undefined;
    FullName: string | undefined;
    Token: string | undefined;
    UserType: string | undefined;
}

export class UserService {

    login(params: LoginParam): Promise<User> {
        return new Promise((resolve, reject) => {
            Http.post('/login', params)
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }
}