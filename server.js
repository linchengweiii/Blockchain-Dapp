var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

matches = [{id: 0}, {id: 1}]

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/matches', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/matches/:matchId', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/user', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/matches_data', (req, res) => {
	res.json(matches)
})
app.post('/add_match', (req, res) => {
	matches.push(req.body)
	res.json('success')
})


server = app.listen(port , () => console.log('Listening on port ' + port))
