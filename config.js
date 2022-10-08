const MINING_RATE = 1000; // 1s =1000ms
const INTIAL_DIFFICULTY = 5;
const GENESIS_DATA={
    timestamp: 1,
    prevHash: '0x000',
    hash: '0x123',
    difficulty: INTIAL_DIFFICULTY,
    nonce: 0,
    data: []
}
module.exports = {GENESIS_DATA,MINING_RATE};