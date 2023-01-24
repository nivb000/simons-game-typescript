const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const roundService = require('./services/server.round.service')
const gameStatsService = require('./services/server.gameStats.service')
const app = express()
const http = require('http').createServer(app)


app.listen(3030, () => console.log('Server ready at port 3030!'))
app.use(cookieParser())
app.use(express.json())
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// get all rounds
app.get('/api/round', (req, res) => {
    roundService.query()
        .then(rounds => res.send(rounds))
})
// get all stats
app.get('/api/stats/', (req, res) => {
    gameStatsService.query()
        .then(stats => res.send(stats))
})

//update stats
app.post('/api/stats/', (req, res) => {
    const stats = req.body
    gameStatsService.save(stats)
        .then(stats => res.send(stats))
        .catch(err => res.status(403).send(err))
})
//reset stats
app.put('/api/stats/', (req, res) => {
    gameStatsService.newStats()
        .then(() => res.send({ msg: "Removed Successfully" }))
        .catch((err) => res.status(403).send(err))
})