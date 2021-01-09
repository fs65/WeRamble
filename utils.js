
module.exports = {
    //Global Variables
    ip: "192.168.1.96", //Change this to match your computer's IP 
    port: "80",

    //Useful functions
    quote: (string) => {
        return `'${string}'`
    },
    request: (route, callback) => fetch(route)
        .then(res => res.json())
        .then(data => {
            if (data) {
                callback(data)
            }
        })
        .catch(error => {
            console.error(error)
        })
}