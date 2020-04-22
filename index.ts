import { Board } from "./board";
import { Player } from "./player";
import { shuffleArray } from "./helpers";

interface QueuedPlayer {
    id: number,
    name: string
}

type gameState = "presPick" | "playersVote" | "presDrop" | "chanEnact" | "presAction";

class Game {
    board: Board;
    playerQueue: QueuedPlayer[] = [];
    players: Player[] = [];
    votes: Boolean[] = [];

    currentPresident = 0;
    currentChancellor = 0;

    currentState: gameState;

    constructor (public playerCount: number) {
        this.board = new Board(playerCount);
    }

    public joinPlayer (id: number, name: string) {
        if (this.playerQueue.length < this.playerCount) {
            this.playerQueue.push({
                id,
                name
            });
            return true;
        } else {
            return false;
        }
    }

    private assignPlayers () {
        let fascArr: number[] = [];
        while (fascArr.length < 3) {
            const random = Math.floor(Math.random() * this.playerQueue.length);
            if (fascArr.indexOf(random) === -1) {
                fascArr.push(random);
            }
        }
        const shuffledPlayers = shuffleArray(this.playerQueue);
        const playerArr: Player[] = shuffledPlayers.map((player, index) => {
            if (fascArr.indexOf(index) === 0) {
                return {
                    id: player.id,
                    name: player.name,
                    role: "hitler",
                    party: "fascist",
                    seat: index,
                    dead: false
                }
            } else if (fascArr.indexOf(index) === -1) {
                return {
                    id: player.id,
                    name: player.name,
                    role: "liberal",
                    party: "liberal",
                    seat: index,
                    dead: false
                }
            } else {
                return {
                    id: player.id,
                    name: player.name,
                    role: "fascist",
                    party: "fascist",
                    seat: index,
                    dead: false
                }
            }
        });
        this.players = playerArr;
        return playerArr;
    }

    public pickChancellor (seat: number) {
        if (this.currentState !== "presPick" && seat > -1 && seat < this.playerCount && this.currentChancellor === 0) {
            this.currentChancellor = seat;
        } else {
            return false;
        }
    }

    public voteGov (seat: number, vote: boolean) {
        if (this.currentState === "playersVote" && seat > -1 && seat < this.playerCount) {
            this.votes[seat] = vote;
            return true;
        } else {
            return false;
        }
    }

    public startGame () {
        this.assignPlayers();
        this.currentPresident = 1;
    }
}

let myGame = new Game(7);
let players: QueuedPlayer[] = [];
for (let i = 0; i < 7; i++) {
    players.push({
        id: i,
        name: i.toString()
    })
}
players.map(l => {
    myGame.joinPlayer(l.id, l.name);
});
myGame.startGame();
console.log(myGame);
