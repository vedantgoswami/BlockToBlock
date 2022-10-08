const redis = require("redis");

const CHANNEL = {
    TEST: "TEST"
}

class PubSub{
    constructor(){
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();
        
        this.subscriber.subscribe(CHANNEL.TEST);
        this.subscriber.on("message",(channel,message)=>
            this.handleMessage(channel,message)
        );
    }
    handleMessage(channel,message){
            console.log(`Message Recieved. Channel: ${channel} Message: ${message}`);
        }
}
const checkPubSub = new PubSub();
// checkPubSub.publisher.publish(CHANNEL.TEST,"Hellloooo")
setTimeout(
    ()=>checkPubSub.publisher.publish(CHANNEL.TEST,"Hellloooo"),
    1000
);
module.exports = PubSub;


