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
                    categories: ["Frederik Metz", "Finn Alber", "Luca Metz", "Leonie Boos", "Aileen Lettau", "Riccarda Maier" ]
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
            const votingContract = await new web3.eth.Contract(abi.abi, "0xeD24ae82E68bAC247d77e3cd17F8dfC0e8B04dCB");

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
