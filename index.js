const express = require('express')
const app = express()
app.use(express.static('public'))
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
    assignAttacks(attacks) {
        this.attacks = attacks
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

app.post('/mokepon/:playerId/attacks', (req, res) => {
    const playerId = req.params.playerId || ''
    const attacks = req.body.attacks || []

    const playerIndex = players.findIndex((player) => playerId === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].assignAttacks(attacks)
    }
    res.end()
})

app.get('/mokepon/:playerId/attacks', (req, res) => {
    const playerId = req.params.playerId || ''
    const player = players.find((player) => player.id === playerId)
    res.send({
        attacks: player.attacks || []
    })
})

app.listen(8080, () => {
    console.log('El servidor funciona.')
})