var express = require('express')
var path = require('path')
var fetch = require('node-fetch')
var app = express()
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

isEmpty = obj => {
	for ( var key in obj ) {
		if ( obj.hasOwnProperty(key) )
			return false
	}
	return true
}

checkAccount = (account, password) => {
	// TODO
	// check whether account and password pair are correct
	// if correct return true
	// else if account not exist, create one and return true
	// else wrong password, return false
	return true
}

getUserId = (account) => {
	// TODO
	// get a(the) blockchain accountId from the user defined account
	// return accountId
	return 'userId'
}

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/holdable_matches', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/bettable_games', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/ongoing_games', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/ended_games', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/matches/:matchId', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/user', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/login', (req, res) => {
	if (isEmpty(req.query))
		res.sendFile(path.join(__dirname, 'public', 'index.html'))
	else{
		if (checkAccount(req.query.account, req.query.password)){
			var userInfo = {
				userId: getUserId(req.query.account),
				account: req.query.account
			}
			res.json(userInfo)
		}else{
			res.json('error: account with wrong password')
		}
	}
})

app.get('/matches_data/:matchId', async(req, res) => {
	var response = await fetch('http://localhost:3001/match_data/'+req.params.matchId)
	var match_data = await response.json()
	res.json(match_data)
})
app.get('/matches_data', async (req, res) => {
	var response = await fetch('http://localhost:3001/matches_data')
	var games = await response.json()
	res.json(games)
})
app.get('/scores', async(req, res) => {
	var response = await fetch('http://localhost:3001/score?id='+req.query.id)
	var scores = await response.json()
	res.json(scores)
})
app.get('/result', async(req, res) => {
	var response = await fetch('http://localhost:3001/result?id='+req.query.id)
	var result = await response.json()
	res.json(result)
})
app.get('/status', async(req, res) => {
	var response = await fetch('http://localhost:3001/status?id='+req.query.id)
	var status = await response.json()
	res.json(status)
})



server = app.listen(port , () => console.log('Listening on port ' + port))
