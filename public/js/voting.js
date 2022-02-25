
module.exports = {

    data() {
        return {
            users: [],
            title: '',
            votings: []
        }
    },
    mounted: function () {
        this.test();
        //this.choices()
    },
    methods: {
        async test(){

            const Web3Modal = window.Web3Modal.default;
            const WalletConnectProvider = window.WalletConnectProvider.default;

            const providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        rpc: {
                            4: "https://rinkeby.infura.io/v3/0259ffc6b3224ad18604966261aeb502"
                        }
                    }
                }
            };

            this.web3Modal = new Web3Modal({
                cacheProvider: false, // optional
                providerOptions, // required
                disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
            });
        },
        async connect(){
            console.log("Opening a dialog", this.web3Modal);
            try {
                this.provider = await this.web3Modal.connect();
                await this.choices();
            } catch (e) {
                console.log("Could not get a wallet connection", e);
                return;
            }

        },
        async disconnect() {
            if (this.provider.close)
                await this.provider.close();
        },
        async choices() {
            const abi = await (await fetch("/js/Voting.json")).json();

            const web3 = new Web3(this.provider);
            const votingContract = await new web3.eth.Contract(abi.abi, "0x3d8533e4ea8D1d6fA0b033c89Fc8240EcfE75bd3");

            let accounts = await web3.eth.getAccounts();
            /*
            let accounts = [];
            accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                .catch((e) => {
                    console.error(e.message)
                    return;
                })*/

            let response = await votingContract.methods
                .availableVotings()
                .call({from: accounts[0]});


            for (let voting of response) {
                let index = this.votings.findIndex(voting => voting.name == voting.name);
// here you can check specific property for an object whether it exist in your array or not

                index === -1 ? this.votings.push({
                    id: parseInt(voting.id),
                    name: voting.name
                }) : console.log("object already exists")


            }

        }
    }
}


