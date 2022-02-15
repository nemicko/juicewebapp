import {JuiceWebApp} from "../src/JuiceWebApp";
import {Juice} from "@juice/juice/Juice";

(async function f() {

    await Juice.init()
        .connect({
            connectionString: "mongodb+srv://votings:0nVeGKVzfBlQfwdI@cluster0.mv1sq.mongodb.net/voting?retryWrites=true&w=majority"
        })
        .start(JuiceWebApp);

})();

