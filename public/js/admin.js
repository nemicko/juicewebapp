module.exports = {
    data() {
        return {
            //choiceAddress: [],
            //votingChoices: [],
            choices: [{
                name: "",
                address: ""
            }],
            votingTitle: "title",
            users: [],
            type: 'type',
            code: [],
            //availableVotings: [],
            adm: 'login',
        }
    },
    mounted:function(){
        this.adminLogin()
    },
    methods: {

        async adminLogin(){
            let adm = prompt("Input ADMIN Login: ");
            //this can be checked from database but for now it can be a simple if, mby implement later
            if (adm == '1'){
                return true
            }
            else{
                alert("Wrong ADMIN Login")
                await this.$router.push({name: 'Landing'})
            }
        },

        async addChoices() {
            let text = document.getElementById('choices').value;
            this.choices.name = text.split(',').map(item=>item.trim());
        },

        async finishEntry() {

            const abi = await (await fetch("/js/Voting.json")).json();

            const web3 = new Web3(window.ethereum);
            const votingContract = await new web3.eth.Contract(abi.abi, "0x281C2f279c0A32d7DF6Ff8eBc9445Bc3d801D455");

            let accounts = [];
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                .catch((e) => {
                    console.error(e.message)
                    return
                })

            debugger;

            /*
            let response = await votingContract.methods
                .addOption(1, "Spezi")  //function in contract
                .send({
                    from: accounts[0]
                });
            console.log("response: ", response);
            */
            /*
            let response = await votingContract.methods
                .createVoting("PreTest")  //function in contract
                .send({
                    from: accounts[0]
                });
            console.log("response: ", response);
            */


            let response = await votingContract.methods
                .addVoter("0xC1d14D4Ef200747733087655F2AfE94e5733060e", 1, 5)  //function in contract
                .send({
                    from: accounts[0],
                    gasPrice: '20000000000'
                });
            console.log("response: ", response.events);


            /*
            let response = await votingContract.methods
                .availableVotings()  //function in contract
                .call();
            console.log("response: ", response);
             */

            let title = document.getElementById('title').value;
            this.votingTitle = title;

            /*
            if(this.choices.address.length == 0 || this.choices.address === undefined) {
                alert("Unadded ADDRESS Enries")
            }
            if(this.choices.name.length == 0) {
                alert("Unadded CHOICES Entries")
            }
            else if (this.votingTitle == "") {
                alert("Missing TITLE")
            }
            else if (this.choices.address.length != this.choices.name.length){
                alert("Not the same number of CHOICES and their ADDRESSES")
            }
            else {
                let vot = [];
                let vote = {
                    title: this.votingTitle,
                    choices: [{
                        name: this.choices.name,
                        address: this.choices.address
                    }]
                }
                vot.push(vote);



                /*
                await fetch("/gateway/voting/create-voting", {
                    method: "post",
                    body:   JSON.stringify([vot]),
                    headers: {
                        "content-type": "application/json"
                    }

                });

                this.availableVotings = await ( await fetch("/gateway/voting/fetch-votings", {
                    method: "post"
                })).json();

                let form = document.getElementsByName('form')[0];
                form.reset();
                this.votingTitle = "";


            }*/
        }
    }
}
