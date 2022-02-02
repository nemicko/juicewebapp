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
        return "Voting ends: " + (new Date()).getDay() + (new Date()).getHours() + ":" +  (new Date()).getMinutes() + new Date() ;
    }

    async onUpdate(options: any): Promise<boolean> {
        this.options =  options;
        return true;
    }

}
