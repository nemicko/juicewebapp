import {IJuiceApplication} from "@juice/juice/core/IJuiceApplication";
import {Juice} from "@juice/juice/Juice";
import {DateService} from "./services/date/DateService";
import {ApplicationConfiguration} from "@juice/juice/core/decorators/ApplicationConfiguration";
import {Networking} from "@juice/networking/Networking";
import * as Path from "path";
import {VotingService} from "./services/vote/VotingService";
import {ValidationService} from "./services/validate/ValidationService";

@ApplicationConfiguration({
    key: "webapp",
    options: {}
})
export class JuiceWebApp implements IJuiceApplication {

    async configure(): Promise<boolean> {
        return Promise.resolve(false);
    }

    prepare(): any {
        Juice.install(DateService);
        Juice.import(Networking);
        Juice.install(VotingService);
        Juice.install(ValidationService);
    }

    async ready(): Promise<any> {
        let networking = Juice.service<Networking>("networking");
        Juice.publish(networking.getGatewayApplication());

        await networking.deployStaticPath("/", Path.join(__dirname, "../public"), {
            rewriteUrl: "*",
            targetPath: Path.join(__dirname, "../public"),
            targetFile: "index.html"

        });

        return true;
    }

}
