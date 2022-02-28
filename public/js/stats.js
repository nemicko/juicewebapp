import PieChart from './PieChart.js'
module.exports = {
    components: {
        PieChart,
    },
    data() {
        return {
            votings: [],
            options: [],
            datacollection: null
        }
    },
    mounted: function () {
        this.stats();
        this.fillData();
    },
    methods: {
        async fillData () {
            this.datacollection = {
                labels: this.options,
                datasets: [
                    {
                        label: 'Votes',
                        data: this.votings,
                        backgroundColor: [
                            'rgba(246,187,20,0.9)',
                            'rgba(13,219,22,0.9)']
                    },
                ]
            }
        },
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
                await this.stats();
            } catch (e) {
                console.log("Could not get a wallet connection", e);
                return;
            }
        },
        async disconnect() {
            if (this.provider.close)
                await this.provider.close();
        },
        async stats() {
            const votingId = this.$router.history.current.params.id;

            const abi = await (await fetch("/js/Voting.json")).json();

            const web3 = new Web3(window.ethereum);
            const votingContract = await new web3.eth.Contract(abi.abi, "0x3d8533e4ea8D1d6fA0b033c89Fc8240EcfE75bd3");

            let accounts = [];
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            this.options = await votingContract.methods
                .getVotingOptions(votingId)  //function in contract
                .call({from: accounts[0]});

            for(let i=0;i<this.options.length;i++){
                const response = await votingContract.methods
                    .getVoters(votingId, i)
                    .call({from: accounts[0]});
                this.votings.push(response.length);
            }

        }
    }
}
