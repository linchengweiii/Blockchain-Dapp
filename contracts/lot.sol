pragma solidity ^0.5.0;

import './Ownable.sol';

contract Lottery is Ownable {
    mapping (uint32 => Bet[]) game2Bets;
    mapping (address => uint32) addr2betCount;
    uint32 numGames = 0;

    struct Bet {
        uint64 betAmount;
        uint8 betTeam;
        address payable addr;
    }

    modifier onlyOwnerOfGame (uint32 _gameId) {
        require(game2Bets[_gameId][0].addr == msg.sender, "Only owner of game can payback");
        _;
    }

    /* Events */
    event NewGameCreated(address indexed addr, uint32 gameIndex);
    event SuccessfullyBet(address indexed addr, uint32 gameId, uint index, uint64 betAmount, uint8 team);
    event ReturnChange(address indexed addr, uint change);
    event Transfer(address indexed addr, uint transferAmount);

    /* public functions */
    function holdNewLot () public returns (uint32) {
        // first bet of each game is the information of the game
        game2Bets[numGames].push(Bet(0,0,msg.sender));
        emit NewGameCreated(msg.sender, numGames);
        numGames++;
        return numGames - 1;
    }

    // Bet `amount` on `team` in game `gameId`
    function bet (uint32 _gameId, uint64 _betAmount, uint8 _team) public payable returns (uint, uint) {
        uint fee = 0;
        require(_gameId < numGames, "Game ID out of range");
        require (msg.value >= _betAmount + fee, "Not enough paid value");
        require(game2Bets[_gameId][0].betTeam == 0, "Game has already ended");
        game2Bets[_gameId].push(Bet(_betAmount, _team, msg.sender));
        addr2betCount[msg.sender]++;
        emit SuccessfullyBet(msg.sender, _gameId, game2Bets[_gameId].length - 1, _betAmount, _team);
        if (msg.value > _betAmount + fee) {
            uint change = msg.value - (_betAmount + fee);
            msg.sender.transfer(change);
            emit ReturnChange(msg.sender, change);
        }
        return (_gameId, game2Bets[_gameId].length - 1);
    }

    // Only used when a game is finished.
    // Given gameId, winning team, scores of both teams
    // contract will payback the people who wins the bet
    function payback (uint32 _gameId, uint8 _team, uint64 _score1, uint64 _score2) public {
        require(_gameId < numGames, "Game ID out of range");
        require(game2Bets[_gameId][0].betTeam == 0, "Can only payback once");
        require(_team != 0, "Winning team not specified");
        // set winning team
        game2Bets[_gameId][0].betTeam = _team;
        game2Bets[_gameId][0].betAmount = _score1 << 128 + _score2;

        Bet[] memory bets = game2Bets[_gameId];
        // uint odd = getOdd(_gameId, _team);
        uint total = getTotalAmount(_gameId);
        uint team = getTeamAmount(_gameId, _team);

        for (uint i = 1; i < bets.length; i++) {
            if (bets[i].betTeam == _team) {
                address payable dest = bets[i].addr;
                uint transferAmount = bets[i].betAmount * total / team;
                dest.transfer(transferAmount);
                emit Transfer(dest, transferAmount);
            }
        }
    }

    // Not used due to integer division
    // function getOdd (uint32 _gameId, uint8 _team) public view returns (uint) {
    //     uint total = getTotalAmount(_gameId);
    //     uint betAmount = getTeamAmount(_gameId, _team);
    //     return total / betAmount;
    // }

    // Get bet record by giving `gameId` and `index` of the bet in that game
    function getRecord (uint32 _gameId, uint _index) public view returns (uint, uint) {
        require(_gameId < numGames, "Game ID out of range");
        require(_index != 0, "Cannot retrieve info");
        Bet memory user_bet = game2Bets[_gameId][_index];
        require(msg.sender == user_bet.addr, "Cannot retrieve record: Permission denied");
        return (user_bet.betAmount, user_bet.betTeam);
    }

    // Get game info of game `gameId`
    function getGameInfo (uint32 _gameId) public view returns (address, uint, uint, uint, uint, uint) {
        require(_gameId < numGames, "Game ID out of range");
        Bet memory game_info = game2Bets[_gameId][0];
        uint score1 = game_info.betAmount >> 128;
        uint score2 = game_info.betAmount % (1 << 128);
        return (game_info.addr, game_info.betTeam, score1, score2, getTeamAmount(_gameId, 1), getTeamAmount(_gameId, 2));
    }

    // Get total bet amount of game `gameId`
    function getTotalAmount (uint32 _gameId) public view returns (uint) {
        return getTeamAmount(_gameId, 1) + getTeamAmount(_gameId, 2);
    }

    // Get bet amount on `team` of game `gameId`
    function getTeamAmount (uint32 _gameId, uint8 _team) public view returns (uint) {
        Bet[] memory bets = game2Bets[_gameId];
        uint total = 0;
        for (uint i = 1; i < bets.length; i++) {
            if (bets[i].betTeam == _team){
                total += bets[i].betAmount;
            }
        }
        return total;
    }

}