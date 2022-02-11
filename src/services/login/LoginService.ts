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
    public async getPermissons()
    {
        return this.permissions.perm;
    }

}
