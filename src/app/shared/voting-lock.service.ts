import { Injectable } from '@angular/core';

@Injectable()
export class VotingLockService {
    private voteMap: Map<string, Array<number>>;
    constructor() {
        this.voteMap = new Map<string, Array<number>>();
    }

    public checkIfVoted(restaurantId: string, ingredientRatingId: number): boolean {
        if (this.voteMap.has(restaurantId)) {
            const exists = this.voteMap.get(restaurantId).find(item => item === ingredientRatingId);
            return exists !== undefined;
        }
        return false;
    }
    public setVoted(restaurantId: string, ingredientRatingId: number) {
        if (this.voteMap.has(restaurantId)) {
            const tab = this.voteMap.get(restaurantId);
            tab.push(ingredientRatingId);
        } else {
            // add to voted
            this.voteMap.set(restaurantId, new Array(ingredientRatingId));
        }
    }

    public getVotedByRestaurantId(restaurantId: string): Array<number> {
        const array = this.voteMap.get(restaurantId);
        return array !== undefined ? array : new Array();
    }
    public clearVotingMap(): void {
        this.voteMap = new Map<string, Array<number>>();
    }
}
