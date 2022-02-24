module.exports = {
    data() {
        return {
            choiceAddress: [],
            votingChoices: [],
            votingTitle: "title",
            users: [],
            type: 'type',
            code: [],
            availableVotings: [],
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
            this.votingChoices = text.split(',').map(item=>item.trim());
        },
        async addAddress() {
            let text = document.getElementById('address').value;
            this.choiceAddress = text.split(',').map(item=>item.trim());
        },
        async finishEntry() {

            debugger;

            const abi = await (await fetch("/js/Voting.json")).json();

            const web3 = new Web3(window.ethereum);
            const votingContract = await new web3.eth.Contract(abi.abi, "0x20D8CE9790ADEe71d41Ccbd91dFeA6f970a5eEDc");

            let accounts = [];
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                .catch((e) => {
                    console.error(e.message)
                    return
                })

            let response = await votingContract.methods
                .createVoting()  //function in contract
                .send({
                    from: accounts[0],
                    gasPrice: '20000000000'
                });
            console.log("response: ", response);


            /*
            let response = await votingContract.methods
                .getVotes(0)  //function in contract
                .call();
            console.log("response: ", response);

             */

            let title = document.getElementById('title').value;
            this.votingTitle = title;

            if(this.choiceAddress.length == 0 || this.choiceAddress === undefined) {
                alert("Unadded ADDRESS Enries")
            }
            if(this.votingChoices.length == 0) {
                alert("Unadded CHOICES Entries")
            }
            else if (this.votingTitle == "") {
                alert("Missing TITLE")
            }
            else if (this.choiceAddress.length != this.votingChoices.length){
                alert("Not the same number of CHOICES and their ADDRESSES")
            }
            else {
                let vot = [];
                let vote = {
                    title: this.votingTitle,
                    choices: this.votingChoices,
                    address: this.choiceAddress
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
                this.choiceAddress = [];
                this.votingChoices = [];
                */
            }
        }
    }
}
