import { FasAction } from "./types";

interface BoardState {
    liberal: number,
    fascist: number
}

class Board {
    public boardState: BoardState;
    public actions: FasAction[];

    constructor (players: number) {
        this.boardState = {
            liberal: 0,
            fascist: 0
        };

        if (players === 5 || players === 6) {
            this.actions = [
                "none",
                "none",
                "peek",
                "shot",
                "shot",
                "none"
            ]
        } else if (players === 7 || players === 8) {
            this.actions = [
                "none",
                "inv",
                "se",
                "shot",
                "shot",
                "none"
            ]
        } else if (players === 9 || players === 10) {
            this.actions = [
                "inv",
                "inv",
                "se",
                "shot",
                "shot",
                "none"
            ]
        }
    }

    public playLiberal (): boolean {
        if (this.boardState.liberal < 5) {
            this.boardState.liberal++;
            return true;
        } else {
            return false;
        }
    }

    public playFascist () {
        if (this.boardState.fascist < 6) {
            this.boardState.fascist++;
            return true;
        } else {
            return false;
        }
    }

    get nextAction () {
        return this.actions[this.boardState.fascist];
    }
}

export { Board }
