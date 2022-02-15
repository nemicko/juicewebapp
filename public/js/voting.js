module.exports = {
    data() {
        return {
            votingChoices: [],
            votes: []
        }
    },
    mounted:function(){
        this.choices()
    },
    methods: {
            async choices() {
                this.votingChoices = await ( await fetch("/gateway/voting/get-choices", {
                    method: "post"
                })).json();

                this.votingChoices.forEach( function(v) {
                    var button= document.createElement('button');
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

                this.votes = await ( await fetch("/gateway/voting/set-votes", {
                    method: "post"
                })).json();
            }
        }
    }

