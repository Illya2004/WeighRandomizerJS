/**
 * @file weigh_randomizer.js
 * @description
 *      The `WeighRandomizer` is a probabilistic selector where each entry has an associated weight.
 *      The higher the weight, the lower the chance of the item being selected.
 *      Internally, the chance is calculated using inverse weighting (1 / weight).
 *
 *      This allows you to simulate "rarity": smaller weights represent more common items,
 *      and larger weights represent rarer ones.
 *
 *      Example usage:
 *
 *          let weighRandomizer = new WeighRandomizer();
 *
 *          weighRandomizer.add(1, "Very Common");
 *          weighRandomizer.add(2, "Common");
 *          weighRandomizer.add(5, "Uncommon");
 *          weighRandomizer.add(10, "Rare");
 *          weighRandomizer.add(20, "Very Rare");
 *
 *          let random = weighRandomizer.random(); // Returns one of the values based on their weight
 *
 * @class WeighRandomizer
 * @public methods:
 *    - add(x, y): Add a new entry to the map. `x` is the weight (must be unique), `y` is the value.
 *    - set(x, y): Add or overwrite an entry for a given weight.
 *    - random(): Randomly selects and returns a value, giving preference to entries with lower weights.
 */

export class WeighRandomizer{
    #map = new Map();


    add(x, y){
        if(this.#map.has(x)){
            throw new Error("Current weigh is exists!")
        }

        this.#map.set(x, y);

        return this;
    }

    set(x, y){
        this.#map.set(x, y);

        return this;
    }

    random() {
        const sorted = [...this.#map.entries()].sort((a, b) => a[0] - b[0]);

        const inverseWeights = sorted.map(([weight]) => 1 / weight);
        const totalInverseWeight = inverseWeights.reduce((sum, w) => sum + w, 0);

        const rand = Math.random() * totalInverseWeight;

        let cumulative = 0;
        for (let i = 0; i < sorted.length; i++) {
            cumulative += inverseWeights[i];
            if (rand < cumulative) {
                return sorted[i][1];
            }
        }

        return sorted[sorted.length - 1][1];
    }


}