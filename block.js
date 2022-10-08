const {GENESIS_DATA, MINING_RATE} = require('./config');
const cryptoHash = require('./cryptoHash');
const hextoBinary = require("hex-to-binary");
class Block{
    constructor({timestamp,prevHash,hash,data,nonce,difficulty}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
    static mineBlock({prevBlock,data}){
        let hash,timestamp;
        const prevHash = prevBlock.hash;
        let difficulty = prevBlock.difficulty;
        // console.log(prevHash);
        let nonce = 0;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({
                originalBlock: prevBlock,
                timestamp
            });
            hash = cryptoHash(timestamp,prevHash,data,nonce,difficulty)
            // console.log(hash);
        }
        while(hextoBinary(hash).substring(0,difficulty) !== "0".repeat(difficulty));
        return new Block({
            timestamp,
            prevHash,
            hash,
            nonce,
            difficulty,
            data
        })
    }
    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty} = originalBlock;
        if(difficulty<1) return 1;
        const difference = timestamp-originalBlock.timestamp;
        if(difference>MINING_RATE){
            return difficulty-1;
        }
        else{
            return difficulty+1;
        }
    }
}
// const block1 = new Block({
//     timestamp: '08/10/2022',
//     prevHash: '0xc12',
//     hash: '0xacb',
//     data: 'hello'});

// const genesisBlock = Block.genesis();
// console.log(genesisBlock);
// const result = Block.mineBlock({
//     prevBlock: block1,
//     data: "block2"
// });
// console.log(result);
// console.log(block1)
module.exports = Block;