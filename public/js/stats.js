module.exports = {
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return {
            votings: [],
            options: [],
            datacollection: null,
            optionsChart: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: ["Coca Cola", "Fanta", "Spezi"]
                }
            },
            series: []
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
                            1: "https://mainnet.infura.io/v3/9866d71dd4694c5cb8dca31a8822e2c6"
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
            const votingContract = await new web3.eth.Contract(abi.abi, "0x3079E3D3eebD999110d2f199C62c88aD90D226CD");

            let accounts = [];
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            this.options = await votingContract.methods
                .getVotingOptions(votingId)  //function in contract
                .call({from: accounts[0]});


            const series = {
                name: "Options",
                data: []
            };

            for(let i=0;i<this.options.length;i++){
                const response = await votingContract.methods
                    .getVoters(votingId, i)
                    .call({from: accounts[0]});
                this.votings.push(response.length);
                series.data.push(response.length);
            }

            this.series =[series];

        }
    }
}
