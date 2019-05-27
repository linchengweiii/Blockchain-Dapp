pragma solidity ^0.5.0;

import './Ownable.sol';

contract Lottery is Ownable {
    mapping (uint => Bet[]) game2Bets;
    mapping (address => uint) addr2betCount;
    uint numGames = 0;

    struct Bet {
        uint betAmount;
        uint betTeam;
        address payable addr;
    }

    /* Events */
    event SuccessfullyBet(address indexed addr, uint gameId, uint betAmount, uint team);
    event Transfer(address indexed addr, uint transferAmount);

    /* public functions */
    function holdNewLot () public onlyOwner returns (uint) {
        // first bet of each game is the information of the game
        game2Bets[numGames].push(Bet(0,0,address(0)));
        numGames++;
        return numGames;
    }

    function bet (uint _gameId, uint _betAmount, uint _team) public payable returns (bool) {
        uint fee = 0;
        require(_gameId < numGames, "Game ID out of range");
        require (msg.value >= _betAmount + fee, "Not enough paid value");
        game2Bets[_gameId].push(Bet(_betAmount, _team, msg.sender));
        addr2betCount[msg.sender]++;
        emit SuccessfullyBet(msg.sender, _gameId, _betAmount, _team);
        return true;
    }

    function payback (uint _gameId, uint _team) public onlyOwner {
        require(_gameId < numGames, "Game ID out of range");
        // set winning team
        game2Bets[_gameId][0].betTeam = _team;

        Bet[] memory bets = game2Bets[_gameId];
        uint odd = getOdd(_gameId, _team);
        for (uint i = 1; i < bets.length; i++) {
            if (bets[i].betTeam == _team) {
                address payable dest = bets[i].addr;
                uint transferAmount = bets[i].betAmount * odd;
                dest.transfer(transferAmount);
                emit Transfer(dest, transferAmount);
            }
        }
    }

    function getOdd (uint _gameId, uint _team) public view returns (uint) {
        uint total = getTotalAmount(_gameId);
        uint betAmount = getTeamAmount(_gameId, _team);
        return total / betAmount;
    }

    function getRecords () public view returns (uint[] memory, uint[] memory) {
        uint[] memory retAmount = new uint[](addr2betCount[msg.sender]);
        uint[] memory retTeam = new uint[](addr2betCount[msg.sender]);
        uint index = 0;
        for (uint i = 0; i < numGames; i++) {
            for (uint j = 0; j < game2Bets[i].length; j++) {
                Bet memory b = game2Bets[i][j];
                if (b.addr == msg.sender) {
                    retAmount[index] = b.betAmount;
                    retTeam[index] = b.betTeam;
                    index++;
                }
            }
        }
        return (retAmount, retTeam);
    }

    function getTotalAmount (uint _gameId) public view returns (uint) {
        return getTeamAmount(_gameId, 1) + getTeamAmount(_gameId, 2);
    }

    function getTeamAmount (uint _gameId, uint _team) public view returns (uint) {
        Bet[] memory bets = game2Bets[_gameId];
        uint total = 0;
        for (uint i = 0; i < bets.length; i++) {
            if (bets[i].betTeam == _team){
                total += bets[i].betAmount;
            }
        }
        return total;
    }

    /* private functions */
}