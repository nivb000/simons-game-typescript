module.exports = {
    createRound,
    createRounds,
    makeId
}

function createRound(roundNumber, sequence) {
    return {
        roundNumber,
        sequence,
        playerInput: [],
        roundOver: false
    }
}

function createRounds() {
    console.log('creating demo rounds')
    let colors = ['red', 'blue', 'green', 'yellow']
    const rounds = []
    for (let i = 0; i < 20; i++) {
        let sequence = []
        if(i != 0){
            sequence.push(...rounds[i-1].sequence)
        }
        for (let j = 0; j < 1; j++) {
            const color = colors[_getRandomIntInclusive(0, colors.length - 1)]
            sequence.push(color)
        }
        rounds.push(createRound(i+1,sequence))
    }
    return rounds
}

function makeId(length = 3) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}