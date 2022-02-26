module.exports = {

    data() {
        return {
            users: [],
            title: '',
            votings: [],
            connected: false
        }
    },
    mounted: function () {
        this.test();
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
                this.connected = true;
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
            const accounts = await web3.eth.getAccounts();

            const response = await votingContract.methods
                .availableVotings()
                .call({from: accounts[0]});

            this.votings = [...response.reduce((last, value) => {
                if (value.name.length > 0)
                    last.push({
                        id: parseInt(value.id),
                        name: value.name
                    });
                return last;
            }, [])];

            debugger;
        }
    }
}


