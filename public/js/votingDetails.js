module.exports = {
    data() {
        return {
            web3: null,
            contract: null,
            accounts: [],
            options: [],
            results: [],
            votesLeft: 0,
        }
    },
    mounted: async function() {
        await this.connect();
    },
    methods: {
        async connect(){

            const Web3Modal = window.Web3Modal.default;
            const WalletConnectProvider = window.WalletConnectProvider.default;

            const providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        rpc: {
                            1: "wss://mainnet.infura.io/ws/v3/9866d71dd4694c5cb8dca31a8822e2c6"
                        }
                    }
                }
            };

            this.web3Modal = new Web3Modal({
                cacheProvider: false, // optional
                providerOptions, // required
                disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
            });

            console.log("Opening a dialog", this.web3Modal);
            try {
                this.provider = await this.web3Modal.connect();
            } catch (e) {
                console.log("Could not get a wallet connection", e);
                return;
            }

            await this.init();
            await this.choices()
        },
        async init() {
            const abi = await (await fetch("/js/Voting.json")).json();

            this.web3 = new Web3(this.provider);
            this.contract = await new this.web3.eth.Contract(abi.abi, "0x3079E3D3eebD999110d2f199C62c88aD90D226CD");

            this.accounts = await this.web3.eth.getAccounts();
        },
        async choices() {
            const votingId = this.$router.history.current.params.id;

            this.options = await this.contract.methods
                .getVotingOptions(votingId)  //function in contract
                .call({from: this.accounts[0]});

            await this.loadResults();
        },
        async loadResults(){
            debugger;
            const votingId = this.$router.history.current.params.id;

            const voted = await this.contract.methods
                .myVotes(votingId)
                .call({from: this.accounts[0]});

            const votes = await this.contract.methods
                .canIVote(votingId)
                .call({from: this.accounts[0]});

            this.votesLeft = parseInt(votes) - parseInt(voted);

            const results = [];
            for(let i=0;i<this.options.length;i++){
                const voted = await this.contract.methods
                    .getVoters(votingId, i)
                    .call({from: this.accounts[0]})


                for(let vote of voted){
                    if (vote == this.accounts[0]) {
                        if (results.length > i){
                            results[i]++;
                        }  else {
                            results.push(1);
                        }
                    }
                }
            }
            this.results = [...results];
        },
        async vote(index) {
            const votingId = this.$router.history.current.params.id;

            const doIt = confirm("Wollen Sie für '" + this.options[index] + "' ihre Stimme abgeben");

            if (doIt) {
                await this.contract.methods
                    .vote(votingId, index)  //function in contract
                    .send({from: this.accounts[0]});

                alert("Vielen dank für deine Wahl");
                document.location.reload();
            }
        }
    }
}


