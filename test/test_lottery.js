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
                lot.bet((0), toWei(betAmount[i]), i%2+1, { from: accounts[1], value: toWei(betAmount[i]) })
            }
        })
        // test records
        .then(() => lot.getRecord.call(0, 1, { from: accounts[1] }) )
        .then( ret => {
            assert.equal(fromWei(ret[0]), betAmount[0], 'Amount in record is not correct')
            assert.equal(ret[1], 1, 'Team in record is not correct')
        })
        .then(() => lot.getRecord.call(0, 2, { from: accounts[1] }) )
        .then( ret => {
            assert.equal(fromWei(ret[0]), betAmount[1], 'Amount in record is not correct')
            assert.equal(ret[1], 2, 'Team in record is not correct')
        })
        .then(() => lot.getRecord.call(0, 3, { from: accounts[1] }) )
        .then( ret => {
            assert.equal(fromWei(ret[0]), betAmount[2], 'Amount in record is not correct')
            assert.equal(ret[1], 1, 'Team in record is not correct')
        })
        .then(() => lot.getRecord.call(0, 4, { from: accounts[1] }) )
        .then( ret => {
            assert.equal(fromWei(ret[0]), betAmount[3], 'Amount in record is not correct')
            assert.equal(ret[1], 2, 'Team in record is not correct')
        })
        .then(() => lot.getRecord.call(0, 5, { from: accounts[1] }) )
        .then( ret => {
            assert.equal(fromWei(ret[0]), betAmount[4], 'Amount in record is not correct')
            assert.equal(ret[1], 1, 'Team in record is not correct')
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
        let betAmount1 = 0.5, paid1 = 1, betTeam1 = 1
        let betAmount2 = 2.0, paid2 = 4, betTeam2 = 2

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
            lot.bet(0, toWei(betAmount1), betTeam1, {from: accounts[1], value: toWei(paid1)});
            lot.bet(0, toWei(betAmount2), betTeam2, {from: accounts[2], value: toWei(paid2)});
            // lot.payback(0, betTeam1, {from: accounts[0]})
            // checkBalance(accounts[1], 1.5)
            account1_starting_balance = getBalance(accounts[1])
            account2_starting_balance = getBalance(accounts[2])
            /*
            ( async () => {
                account1_starting_balance = await getBalance(accounts[1])
                account2_starting_balance = await getBalance(accounts[2])
                lot.payback(0, betTeam1, {from: accounts[0]})
                account1_ending_balance   = await getBalance(accounts[1])
                account2_ending_balance   = await getBalance(accounts[2])
                console.log('hi')
                console.log(account1_starting_balance)
                console.log(account1_ending_balance)
                console.log(account2_starting_balance)
                console.log(account2_ending_balance)
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
            })();*/
        })
        .then(() => lot.getRecord.call(0, 1, { from: accounts[1] }))
        .then( ret => {
            assert.equal(fromWei(ret[0]), betAmount1, 'Amount in record is not correct')
            assert.equal(ret[1], 1, 'Team in record is not correct')
        })
        .then(() => lot.getRecord.call(0, 2, { from: accounts[2] }))
        .then( ret => {
            assert.equal(fromWei(ret[0]), betAmount2, 'Amount in record is not correct')
            assert.equal(ret[1], 2, 'Team in record is not correct')
        })
        .then(() => lot.payback(0, 1, 1, 0, {from: accounts[0]}))
        .then(() => {
            // web3.eth.getBalance(accounts[1]).then(b => { 
            //     console.log(fromWei(b))
            //     account1_ending_balance = fromWei(b)
            //     console.log(account1_ending_balance) 
            // })
            account1_ending_balance = getBalance(accounts[1])
            account2_ending_balance = getBalance(accounts[2])
            // account1_ending_balance.then(a => console.log(a))
            // console.log(account2_ending_balance)
            console.log(account1_starting_balance)
            while (typeof(account2_ending_balance) == Promise || typeof(account1_ending_balance) == Promise);
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

function checkBalance(addr, result) {
    web3.eth.getBalance(addr)
    .then(startBalance => {
        lot.payback(0, betTeam, {from: accounts[0]})
        web3.eth.getBalance(addr)
        .then(endBalance => {
            assert.equal(
                endBalance - startBalance,
                result,
                'Account balance is not correct'
            )
            console.log('yes')
        })
    })
}