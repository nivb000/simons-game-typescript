const fs = require('fs')
var gGameStats = require('../data/gameStats.json')

module.exports = {
    query,
    save,
    newStats
}

function query() {
    if (Object.keys(gGameStats).length === 0) {
        gGameStats = newStats()
    }
    return Promise.resolve(gGameStats)
}

function save(stats) {
    gGameStats.highScore = stats.highScore > gGameStats.highScore ? stats.highScore : gGameStats.highScore
    return _saveGameStatsToFile().then(() => stats)
}
function newStats() {
    const newStats = { highScore: 0 }
    _saveGameStatsToFile()
    return newStats
}

function _saveGameStatsToFile() {
    return new Promise((resolve, reject) => {
        const gameStats = JSON.stringify(gGameStats, null, 2)
        fs.writeFile('data/gameStats.json', gameStats, (err) => {
            if (err) return reject("cannot Save GameStats")
            resolve()
        })
    })
}