export class IngredientRating {
    id: number;
    ingredientName: string;
    thumbUp: number;
    thumbDown: number;

    constructor() {
        this.id = 0;
        this.ingredientName = 'no-name';
        this.thumbUp = 0;
        this.thumbDown = 0;
    }
}
