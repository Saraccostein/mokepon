const express = require('express')
const app = express()
app.use(express.json())

const shortUUID = require('short-uuid')
const uuid = shortUUID()

const cors = require('cors')
app.use(cors())

const players = []

class Player {
    constructor(id) {
        this.id = id
    }
    assignMokepon(mokepon) {
        this.mokepon = mokepon
    }
    movePosition(x, y) {
    this.x = x || 0
    this.y = y || 0
    }
}

class Mokepon {
    constructor(name) {
        this.name = name
    }
}

app.get('/join', (req, res) => {
    const id = `${uuid.new().substring(0, 7)}`
    const player = new Player(id)
    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post('/mokepon/:playerId', (req, res) => {
    const playerId = req.params.playerId || ''
    const name = req.body.mokepon || ''
    const mokepon = new Mokepon(name)
    
    const playerIndex = players.findIndex((player) => playerId === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].assignMokepon(mokepon)
    }
    res.end()
})

app.post('/mokepon/:playerId/coordinates', (req, res) => {
    const playerId = req.params.playerId || ''
    const x = req.body.x || 0
    const y = req.body.y || 0

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].movePosition(x, y)
    }
    
    const enemies = players.filter((player) => playerId !== player.id)


    res.send({
        enemies
    })
})

app.listen(8080, () => {
    console.log('El servidor funciona.')
})