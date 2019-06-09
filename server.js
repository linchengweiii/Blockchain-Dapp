var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

matches = [
	{id: 0, contestantA: {name: 'A', point: 10}, contestantB: {name: 'B', point: 20}},
	{id: 1, contestantA: {name: 'A', point: 20}, contestantB: {name: 'B', point: 20}},
]

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
app.get('/matches', (req, res) => {
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

app.get('/matches_data/:matchId', (req, res) => {
	match_data = matches[req.params.matchId]
	res.json(match_data)
})
app.get('/matches_data', (req, res) => {
	res.json(matches)
})
app.post('/add_match', (req, res) => {
	matches.push(req.body)
	res.json('success')
})


server = app.listen(port , () => console.log('Listening on port ' + port))
