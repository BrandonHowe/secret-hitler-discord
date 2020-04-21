import { Board } from "./board";
import { Player } from "./player";

interface QueuedPlayer {
    id: number,
    name: string
}

class Game {
    board: Board;
    playerQueue: QueuedPlayer[];
    players: Player[];

    constructor (public playerCount: number) {
        this.board = new Board(playerCount);
    }

    joinPlayer (id: number, name: string) {
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

    assignPlayers () {
        let fascArr: number[] = [];
        while (fascArr.length < 3) {
            const random = Math.floor(Math.random() * this.playerQueue.length);
            if (fascArr.indexOf(random) === -1) {
                fascArr.push(random);
            }
        }
        let players: Player[] = [];
        for (let i = 0; i < this.playerQueue.length; i++) {
            const randPlayerIdx = Math.floor(Math.random() * this.playerQueue.length);
            const randPlayer = this.playerQueue[randPlayerIdx];
            if (fascArr.indexOf(randPlayerIdx) === 0) {
                players.push({
                    id: randPlayer.id,
                    name: randPlayer.name,
                    party: "fascist",
                    role: "hitler",
                    seat: Number(i),
                    dead: false
                });
            } else if (fascArr.indexOf(randPlayerIdx) === -1) {
                players.push({
                    id: randPlayer.id,
                    name: randPlayer.name,
                    party: "liberal",
                    role: "liberal",
                    seat: Number(i),
                    dead: false
                });
            } else {
                players.push({
                    id: randPlayer.id,
                    name: randPlayer.name,
                    party: "fascist",
                    role: "fascist",
                    seat: Number(i),
                    dead: false
                });
            }
        }
        this.players = players;
        return players;
    }
}
