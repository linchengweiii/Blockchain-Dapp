var express = require('express')
var path = require('path')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')
var port = process.env.PORT || 3001
const DIR_PATH = './db'

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/games_data", (req, res)=>{
	res.json(games);
})

app.get("/game_data/:gameId", (req, res)=>{
	game = games.find(g=>g.id === parseInt(req.params.gameId));
	res.json(game);
})

app.get("/result", (req,res)=>{
	game = games.find(g=>g.id === parseInt(req.query.id));
	res.json(game.result);
})

app.get("/score", (req,res)=>{
	game = games.find(g=>g.id === parseInt(req.query.id));
	res.json(game.scores)
})

app.get("/status", (req,res)=>{
	game = games.find(g=>g.id === parseInt(req.query.id));
	res.json(game.status)
})

app.get("/start", (req,res)=>{
	game = games.find(g=>g.id === parseInt(req.query.id));
	// timeString = (new Date())
	res.send({start: game.start})
})

app.get("/end", (req,res)=>{
	game = games.find(g=>g.id === parseInt(req.query.id));
	// timeString = (new Date())
	res.send({start: game.end})
})

app.get("/type", (req,res)=>{
	game = games.find(g=>g.id === parseInt(req.query.id));
	// timeString = (new Date())
	res.send({start: game.type})
})

server = app.listen(port , () => console.log('Server listening on port ' + port))
init()

var CLI = require('clui'),
	clc = require("cli-color");

var Line = CLI.Line,
	LineBuffer = CLI.LineBuffer;

var stdin = process.stdin;
var cmdBuf = '';
var statusBuf = '';
var currentId = 5;
var games = [];

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', function(key) {
	if(key === '\u0003'){
        process.exit();
	}
	else if(key === '\u0008') {
		cmdBuf = cmdBuf.substring(0, cmdBuf.length-1);
	}
    else if(typeof key == 'string' && ((key >= '0' && key <= '9') || (key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z') || key == ' ' || key == '-' || key == ':')) {
        cmdBuf += key;
    }
    else if(key.charCodeAt(0) === 13) {
		var arr = cmdBuf.split(' ')
		if (arr.length < 2){
			statusBuf = "Not Enough arguments!";
		}
		else if (arr[0] === "add"){
			if (arr.length < 6 || arr.length > 6){
				statusBuf = "Try \"add Type Team1 Team2 yr-mth-day h:m:s\"";
			}
			else{
				timeString = arr[4] + ' ' + arr[5]
				// TODO: handle timeString error
				newGame = {
					id: currentId,
					type: arr[1],
					teams: [arr[2], arr[3]],
					start: (new Date(timeString)).getTime(),
					end: 0, // 0 for unended
					result: -1, // -1 for unended, 0 or 1 for the winning team
					status: 'Ready'  // ready, ongoing, end
				}
				games.push(newGame);
				statusBuf = "Game ID " + currentId.toString() + " is added!";
				currentId++;
			}
		}
		else if (arr[0] === "del"){
			if (arr.length > 2){
				statusBuf = "Extra arguments!"
			}
			else{
				newGames = games.filter(game => game.id !== Number(arr[1]))
				if (newGames.length === games.length){
					statusBuf = "Game ID " + arr[1] + " not found!";
				}
				else{
					statusBuf = "Game ID " + arr[1] + " is deleted!";
					games = newGames;
				}
			}
		}
		// else if (arr[0] === "view"){
		// 	if (arr.length > 2){
		// 		statusBuf = "Try \"view [history, current, future]\"";
		// 	}
		// 	else{
		// 		if (arr[1] === 'history'){

		// 		}
		// 	}
		// }
		// else if (arr[0] === "sort"){
			
		// }
		// else if (arr[0] === "edit"){
			
		// }
		else if (arr[0] === "end"){
			if (arr.length < 3 || arr.length > 3){
				statusBuf = "Try \"end ID winning_Team\"";
			}
			else {
				id = games.findIndex(g=>g.id === Number(arr[1]))
				if (id === -1) statusBuf = "Game ID " + arr[1] + " not found!";
				else{
					games[id].end = (new Date()).getTime();
					games[id].status = "End";
					games[id].result = (games[id].teams[0] === arr[2])?0:1;
				}
			}
		}
		else{
			statusBuf = "Command not found!"
		}
		cmdBuf = '';
	}
})
// displayGames = [];

function init(dir_path=DIR_PATH){
	try {
		fs.readFile(path.join(dir_path, 'data.json'), (err, data) => {  
			if (err){
				console.log("data.json not found, new data.json created!");
				games = init_games();
				fs.writeFile(path.join(dir_path, 'data.json'), JSON.stringify(games), (err) => {
					if (err) return console.log(err);
				});
			}
			else{
				console.log("Found data.json!")
				games = JSON.parse(data);
			}	
		});
	}
	catch(err) {
		
	}
}

function init_games(){
	let new_games = [];
	for (var i = 0;i<5;i++){
		new_games.push(
			{
				id: i,
				type: 'LoL',
				teams: ['IG', 'TPA'],
				scores: [0, 0],
				start: new Date().getTime(),
				end: 0, // 0 for unended
				result: -1, // -1 for unended, 0 or 1 for the winning team
				status: 'Ongoing'  // Ready, Ongoing, End
			}
		)
	}
	return new_games;
}
	

function ms2ds(ms){
	return (new Date(ms)).toLocaleString();
}

setInterval(() => {
    var outputBuffer = new LineBuffer({
        x: 0,
        y: 0,
        width: 'console',
        height: 'console'
    });
	var line;
	line = new Line(outputBuffer)
		.column('System Time:', 14, [clc.yellowBright])
		.column((new Date()).toLocaleString(), 20, [clc.yellowBright])
		.fill()
		.store();
    line = new Line(outputBuffer)
        .column('Game ID', 8, [clc.whiteBright])
        .column('Type', 8, [clc.whiteBright])
		.column('Team 1', 10, [clc.whiteBright])
		.column('Team 2', 10, [clc.whiteBright])
		.column('Score', 7, [clc.whiteBright])
		.column('Start Time', 20, [clc.whiteBright])
		.column('End Time', 20, [clc.whiteBright])
		.column('Result', 12, [clc.whiteBright])
		.column('Status', 8, [clc.whiteBright])
        .fill()
        .store();
    for(var i = 0; i < games.length; ++i) {
        line = new Line(outputBuffer)
			.column(games[i].id.toString(), 8, [clc.green])
			.column(games[i].type, 8, [clc.green])
			.column(games[i].teams[0], 10, [clc.cyan])
			.column(games[i].teams[1], 10, [clc.red])
			.column(games[i].scores[0].toString(), 2, [clc.cyan])
			.column(':', 1, [clc.white])
			.column(games[i].scores[1].toString(), 4, [clc.red])
			.column(ms2ds(games[i].start), 20, [clc.green])
			.column(games[i].end==0?'Not Ended Yet':ms2ds(games[i].end), 20, [clc.green])
			.column(games[i].result==-1?'Unknown':games[i].teams[games[i].result]+" wins", 12, [clc.green])
			.column(games[i].status, 8, [clc.green])
            .fill()
            .store();
    }
    line = new Line(outputBuffer)
        .column(cmdBuf, 100)
        .fill()
        .store();
    line = new Line(outputBuffer)
        .column(statusBuf, 100, [clc.bgCyanBright, clc.yellow])
        .fill()
        .store();
    outputBuffer.output();
}, 100);

setInterval(() => {
	// console.log("test")
	currentMs = (new Date()).getTime();
	games = games.map(game => {
		if (currentMs >= game.start && game.end === 0){
			// console.log("change to ongoing");
			game.status = 'Ongoing';
		}
		if (game.status === 'Ongoing'){
			if (Math.random()>0.9) game.scores[0] += 1;
			if (Math.random()>0.9) game.scores[1] += 1
			
		}
		return game
	})
	fs.writeFile(path.join(DIR_PATH, 'data.json'), JSON.stringify(games), (err) => {
		if (err) return console.log(err);
	});
}, 1000);
