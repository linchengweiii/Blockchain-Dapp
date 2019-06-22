export let lotteryContract, userAccount;
let web3js = window.web3js;

export function load(){
    if (typeof web3 !== 'undefined'){
        web3js = new Web3(web3.currentProvider);
        web3js.currentProvider.enable()
        web3js.eth.getAccounts()
        .then((acc)=>{
            console.log(acc);
            userAccount = acc[0];
            startApp();
        })
    }
    else {
        window.alert("Please install Metamask first!")
    }
}

function startApp() {
    if (userAccount === undefined) window.alert("Please log in your metamask account!")
    var updateAccount = setInterval(function(){
        web3js.eth.getAccounts()
        .then((acc)=>{
            userAccount = acc[0];
        })
    }, 200)
    var lotteryAddress = "0xc102aB400C3bfa6C126B31917337E50B49E513b3";
    lotteryContract = new web3js.eth.Contract(lotteryAbi, lotteryAddress);
    console.log(lotteryContract)
    lotteryContract.events.NewGameCreated()
    .on("data", function(event) {
        let id = event.returnValues.gameIndex;
        console.log(id)
        document.getElementById("gameNum").innerHTML = id.toString();
    })
    lotteryContract.events.SuccessfullyBet()
    .on("data", function(event) {
        let index = event.returnValues.index;
        console.log(index.toString()+"-th bet");
    })
    lotteryContract.events.Transfer()
    .on("data", function(event){
        let transferAmount = event.returnValues.transferAmount;
        console.log("Receive " + transferAmount.toString());
    })
}

export async function holdNewLot(matchId) {
    const transaction = await lotteryContract.methods.holdNewLot(matchId).send({from: userAccount})
    // await console.log(transaction)
}

export async function bet(gameId, betAmount, team) {
    const betWei = web3js.utils.toWei(betAmount.toString(), 'ether')
    const transaction = await lotteryContract.methods.bet(gameId, betWei, team).send({from: userAccount, value: betWei})
}

export async function payback(gameId, team, score1, score2){
    const transaction = await lotteryContract.methods.payback(gameId, team, score1, score2).send({from: userAccount});
}

export async function getRecord(gameId, index) {
    return await lotteryContract.methods.getRecord(gameId, index).call();
}

export async function getGameInfo(gameId) {
    return await lotteryContract.methods.getGameInfo(gameId).call();
}

export async function getTotalAmount (gameId) {
    return await lotteryContract.methods.getTotalAmount(gameId).call();
}

export async function getTeamAmount (gameId, team) {
    return await lotteryContract.methods.getTeamAmount(gameId, team).call();
}