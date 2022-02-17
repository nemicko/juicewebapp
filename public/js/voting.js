module.exports = {

    data() {
        return {
/*            voting: {},*/
            votingChoices: [],
            votes: {}
        }
    },
    mounted:function(){
        this.choices()
    },
    methods: {
            async choices() {

/*                this.voting = await ( await fetch("/gateway/voting/fetch-votings", {
                    method: "post"
                })).json();

                console.log(this.voting)*/

                this.votingChoices = await ( await fetch("/gateway/voting/get-choices", {
                    method: "post"
                })).json();

                this.votingChoices.forEach(function(v) {
                    let button = document.createElement('button');
                    button.type= 'button';
                    button.appendChild(document.createTextNode(v));
                    button.id = v;
                    button.onclick = async function() {
                        await fetch("/gateway/voting/set-votes", {
                            method: "post",
                            body:   JSON.stringify([v]),
                            headers: {
                                "content-type": "application/json"
                            }
                        });
                    };
                    document.getElementById("buttons").appendChild(button);

                } );



            }
        }
    }

