const Lottery = artifacts.require("Lottery")

let toWei = x => web3.utils.toWei(x.toString())
let fromWei = x => web3.utils.fromWei(x, 'ether')

contract('Lottery', accounts => {
    let lot
    let betNum = 5
    // betAmount is in 'ether'
    let betAmount = []
    for (let i = 0; i < betNum; i++)
        betAmount.push(0.02*i+0.01)

    it('should allow user to bet and retrieve records (single game)', () => {
        
        return Lottery.deployed()
        .then(instance => {
            lot = instance
            return lot.holdNewLot({from: accounts[0]});
        })
        .then(() => {
            for (let i = 0; i < betNum; i++) {
                // pass value to contract in Wei
                lot.bet(0, toWei(betAmount[i]), i%2+1, { from: accounts[1], value: toWei(betAmount[i]) })
            }
        })
        // test records
        .then(() => lot.getRecords.call({ from: accounts[1] }))
        .then( ret => {
            let retAmount = ret[0]
            let retTeam = ret[1]
            for (let i = 0; i < betNum; i++) {
                assert.equal(
                    fromWei(retAmount[i]),
                    betAmount[i],
                    'Amount in record is not correct'
                )
                assert.equal(
                    retTeam[i],
                    i%2+1,
                    'Team in record is not correct'
                )
            }
        })
    })
    it('should get correct betAmounts of teams (single game)', () => {
        // test total amount on team1
        return Lottery.deployed()
        .then(() => lot.getTeamAmount.call(0,1))
        .then((team1Amount) => {
            let team1Total = betAmount.reduce((p, c, i) => i % 2 == 0? p + c: p, 0)
            assert.equal(
                fromWei(team1Amount),
                team1Total,
                'Total of team1 is not correct'
            )
        })
        // test total amount on team2
        .then(() => lot.getTeamAmount.call(0,2))
        .then((team2Amount) => {
            let team2Total = betAmount.reduce((p, c, i) => i % 2 == 1? p + c: p, 0)
            assert.equal(
                fromWei(team2Amount),
                team2Total,
                'Total of team2 is not correct'
            )
        })
    })
})

contract('Lottery', accounts => {
    it('should pay users back correctly', () => {
        let lot
        let betAmount1 = 0.5, betTeam1 = 1
        let betAmount2 = 1.0, betTeam2 = 2

        let account1_starting_balance
        let account2_starting_balance
        let account1_ending_balance
        let account2_ending_balance

        return Lottery.deployed()
        .then(instance => {
            lot = instance
            return lot.holdNewLot({from: accounts[0]})
        })
        .then(() => {
            lot.bet(0, toWei(betAmount1), betTeam1, {from: accounts[1], value: toWei(betAmount1)})
            lot.bet(0, toWei(betAmount2), betTeam2, {from: accounts[2], value: toWei(betAmount2)})
            account1_starting_balance = getBalance(accounts[1])
            account2_starting_balance = getBalance(accounts[2])
        })
        .then(() => lot.getRecords.call({ from: accounts[1] }))
        .then(ret => {
            let retAmount = ret[0]
            let retTeam = ret[1]

            assert.equal(
                fromWei(retAmount[0]),
                betAmount1,
                'Amount in record of user1 is not correct'
            )
            assert.equal(
                retTeam,
                betTeam1,
                'Team in record of user1 is not correct'
            )
        })
        .then(() => lot.getRecords.call({ from: accounts[2] }))
        .then(ret => {
            let retAmount = ret[0]
            let retTeam = ret[1]
            assert.equal(
                fromWei(retAmount[0]),
                betAmount2,
                'Amount in record of user2 is not correct'
            )
            assert.equal(
                retTeam,
                betTeam2,
                'Team in record of user2 is not correct'                
            )
        })
        .then(() => lot.payback(0, 1, {from: accounts[0]}))
        .then(() => {
            // web3.eth.getBalance(accounts[1]).then(b => { 
            //     console.log(fromWei(b))
            //     account1_ending_balance = fromWei(b)
            //     console.log(account1_ending_balance) 
            // })
            account1_ending_balance = getBalance(accounts[1])
            console.log(account1_starting_balance)
            console.log(account1_ending_balance)
            account2_ending_balance = getBalance(accounts[2])
            // account1_ending_balance.then(a => console.log(a))
            // console.log(account2_ending_balance)
            assert.equal(
                1.5,
                account1_ending_balance - account1_starting_balance,
                'Return of user1 is incorrect'
            )
            assert.equal(
                0,
                account2_ending_balance - account2_starting_balance,
                'Return of user2 is incorrect'
            )
        })
    })
})

async function getBalance(addr) {
    let balance = await web3.eth.getBalance(addr)
    // console.log(balance)
    return balance
}