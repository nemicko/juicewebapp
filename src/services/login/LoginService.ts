import {IService} from "@juice/juice/core/service/IService";
import {Inject} from "@juice/juice/core/decorators/Inject";
import {Remotable} from "@juice/juice/core/gateway/Remotable";
import { Injectable } from "@juice/juice/core/decorators/Injectable";



@Injectable({
    key: "login",
    name: "Login Service",
    schema: "service",
    options: {}
})

export class LoginService implements IService {

    options: any;
    permissions: [] = [];

    async onUpdate(options: any): Promise<boolean> {
        this.options =  options;
        return true;
    }

    @Remotable([])
    public async setPermissons(pwd)
    {
        if (pwd === '1'){
            this.permissions.push({
                pwd: pwd,
                perm: 'admin'
            })
        }
        else if(validCodes.includes(pwd)) {
            this.permissions.push({
                pwd: pwd,
                perm: 'guest'
            })
        }

    }

    @Remotable([])
    public async getPermissons(pwd)
    {
        return this.permissions.perm;
    }

}
