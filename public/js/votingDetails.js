module.exports = {

    data() {
        return {
            votingOptions: [],
        }
    },
    mounted:function(){
        this.choices()
    },
    methods: {
        async choices() {

            const abi = await (await fetch("/js/Voting.json")).json();

            const web3 = new Web3(window.ethereum);
            const votingContract = await new web3.eth.Contract(abi.abi, "0x6905915e0a77E78d94b3d71a9B718e272F1f7fcC");

            let accounts = [];
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                .catch((e) => {
                    console.error(e.message)
                    return
                })

            let response = await votingContract.methods
                .getVotingOptions(0)  //function in contract
                .call();
            console.log("response: ", response.args);

            this.votingOptions = response


            this.options.forEach(function(v) {
                let button = document.createElement('button');
                let counter = 0;
                button.type= 'button';
                button.className = 'buttons btn btn-lg voting-button'

                for (let i = 0; i < choiceAddress.length; i++){
                    button.id = choiceAddress[i];
                }

                button.appendChild(document.createTextNode(v));
                button.onclick = async function() {
                    await window.ethereum.request({
                        method: 'eth_sendTransaction',
                        params: [
                            {
                                from: currentAddr[0], //needs to be the CURRENT users address
                                to: button.id, //choice address, get it from button id?
                                value: web3.utils.toWei('0.0000001', 'ether')

                            },
                        ],
                    });
                };
                document.getElementById("buttons").appendChild(button);
                document.getElementById("title").innerHTML = title;

                button.onclick = function() {
                    counter++
                    alert(v + ' clicked')
                    for (let btn of document.querySelectorAll('.buttons')) {
                        btn.disabled = true;
                    }
                }
            });

        }
    }
}


