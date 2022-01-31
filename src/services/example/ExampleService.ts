import {IService} from "@juice/juice/core/service/IService";
import {DateService} from "../date/DateService";
import {Inject} from "@juice/juice/core/decorators/Inject";

export class ExampleService implements IService{

    options: any;

    @Inject("date")
    date: DateService;

    async onUpdate(options: any): Promise<boolean> {
        this.options =  options;
        return true;
    }

}
