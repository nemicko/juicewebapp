import {JuiceWebApp} from "../src/JuiceWebApp";
import {Juice} from "@juice/juice/Juice";
import {SunshineVirtual} from "sunshine-dao/lib/SunshineVirtual";

(async function f() {

    await SunshineVirtual.connectVirtual(9000);

    const db = {
        host: "localhost:9000",
        username: "",
        password: "",
        database: "virtual"
    }

    await Juice.init()
        .connect(db)
        .start(JuiceWebApp);

})();

