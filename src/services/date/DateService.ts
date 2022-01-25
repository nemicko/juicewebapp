import {IService} from "@juice/juice/core/service/IService";
import {Injectable} from "@juice/juice/core/decorators/Injectable";
import {Remotable} from "@juice/juice/core/gateway/Remotable";

@Injectable({
    key: "date",
    name: "Date Service",
    schema: "service",
    options: {}
})
export class DateService implements IService {

    options: any;

    @Remotable(['string'])
    async getTime(name: string){
        return (new Date()).getHours() + ":" +  (new Date()).getMinutes() + "-" + name;
    }

    async onUpdate(options: any): Promise<boolean> {
        this.options =  options;
        return true;
    }

}
