var lotteryAbi = [
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "matchId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "name": "gameIndex",
        "type": "uint32"
      }
    ],
    "name": "NewGameCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "gameId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "betAmount",
        "type": "uint64"
      },
      {
        "indexed": false,
        "name": "team",
        "type": "uint8"
      }
    ],
    "name": "SuccessfullyBet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "change",
        "type": "uint256"
      }
    ],
    "name": "ReturnChange",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "transferAmount",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_matchId",
        "type": "uint32"
      }
    ],
    "name": "holdNewLot",
    "outputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_gameId",
        "type": "uint32"
      },
      {
        "name": "_betAmount",
        "type": "uint64"
      },
      {
        "name": "_team",
        "type": "uint8"
      }
    ],
    "name": "bet",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_gameId",
        "type": "uint32"
      },
      {
        "name": "_team",
        "type": "uint8"
      },
      {
        "name": "_score1",
        "type": "uint64"
      },
      {
        "name": "_score2",
        "type": "uint64"
      }
    ],
    "name": "payback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_gameId",
        "type": "uint32"
      },
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getRecord",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_gameId",
        "type": "uint32"
      }
    ],
    "name": "getGameInfo",
    "outputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_gameId",
        "type": "uint32"
      }
    ],
    "name": "getTotalAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_gameId",
        "type": "uint32"
      },
      {
        "name": "_team",
        "type": "uint8"
      }
    ],
    "name": "getTeamAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]