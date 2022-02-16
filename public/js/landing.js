module.exports = {
    data() {
        return {
            isAdmin: false,
            validCodes: [],
        }
    },
    methods: {
        async login(){
            var login = document.getElementById('login').value;

            this.validCodes = await ( await fetch("/gateway/validation/fetch-users", {
                method: "post"
            })).json();

            console.log(this.validCodes)
            /*
            if (pwd === "" || pwd.trim() === "") {
                alert("No input");
                return 0;
            }
            else if (pwd==='1') {
                this.isAdmin = true;
                await this.$router.push({name: 'Admin'})
            }
            else if (pwd) {
                // user typed something and hit OK
                //call set function that validates AND if valid sends it to usedCodes array
                this.validCodes = await ( await fetch("/gateway/validation/get-valid-codes", {
                    method: "post"
                })).json();


                if(this.validCodes.includes(pwd)) {
                    await this.$router.push({name: 'Voting'})
                    await fetch("/gateway/validation/remove-valid-codes", {
                        method: "post",
                        body:   JSON.stringify([pwd]),
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                }
                else {
                    alert("Wrong code");
                }
            }
            else {
                return 0;
            }*/
        },
    }
}
