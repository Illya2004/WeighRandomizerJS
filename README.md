"# WeighRandomizerJS" 
     The `WeighRandomizer` is a probabilistic selector where each entry has an associated weight.
     The higher the weight, the lower the chance of the item being selected.
     Internally, the chance is calculated using inverse weighting (1 / weight).

     This allows you to simulate "rarity": smaller weights represent more common items,
     and larger weights represent rarer ones.
