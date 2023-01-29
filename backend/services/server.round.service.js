const fs = require('fs')
var gRounds = require('../data/rounds.json')
var utilService = require('./util.service')

module.exports = {
    query,
    save,
    remove
}

function query() {
    if(gRounds.length === 0 || !gRounds){
        let rounds = utilService.createRounds()
        gRounds = rounds
        _saveRoundsToFile()
    }
    return Promise.resolve(gRounds)
}

function save(round) {
    if (round._id) {
        gRounds.find(currRound => round._id === currRound._id ? currRound = round : currRound)
    } else {
        round._id = utilService.makeId()
        gRounds.push(round)
    }
    return _saveRoundsToFile().then(() => round)
}

function remove() {
    if(gRounds.length !== 0){
        gRounds.splice(0)
        _saveRoundsToFile()
    }
    return Promise.resolve()
}

function _saveRoundsToFile() {
    return new Promise((resolve, reject) => {
        const rounds = JSON.stringify(gRounds, null, 2)
        fs.writeFile('data/rounds.json', rounds, (err) => {
            if (err) return reject("cannot Save Rounds")
            resolve()
        })
    })
}