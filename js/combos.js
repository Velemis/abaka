// noinspection JSUnusedGlobalSymbols
const combos = {
    pairCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }

        let counts = [];
        for (const points of dicePoints) {
            counts[points] = counts[points] ? counts[points] + 1 : 1;
        }

        for (let i = 6; i > 0; i--) {
            if (typeof counts[i] !== 'undefined') {
                let count = counts[i];
                if (count >= 2) {
                    return i * 2;
                }
            }
        }

        return 0;
    },
    twoPairCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }

        let dicePointsCopy = [...dicePoints];

        let counts = [];
        for (const points of dicePointsCopy) {
            counts[points] = counts[points] ? counts[points] + 1 : 1;
        }

        let firstPair = null;
        for (let i = 6; i > 0; i--) {
            if (typeof counts[i] !== 'undefined') {
                let count = counts[i];
                if (count >= 2) {
                    firstPair = i * 2;
                    dicePointsCopy.splice(dicePointsCopy.indexOf(i), 1);
                    dicePointsCopy.splice(dicePointsCopy.indexOf(i), 1);
                    break;
                }
            }
        }

        if (firstPair == null) {
            return 0;
        }

        counts = [];
        for (const points of dicePointsCopy) {
            counts[points] = counts[points] ? counts[points] + 1 : 1;
        }

        for (let i = 6; i > 0; i--) {
            if (typeof counts[i] !== 'undefined') {
                let count = counts[i];
                if (count >= 2) {
                    return i * 2 + firstPair;
                }
            }
        }

        return 0;
    },
    threeOfAKindCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    },
    fourOfAKindCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    },
    fiveOfAKindCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    },
    smallStraightCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    },
    bigStraightCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    },
    fullHouseCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    },
    maximumCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    },
    minimumCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    },
    evensCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    },
    oddsCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    },
    jumbleCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        // Todo
        return Math.random();
    }
}