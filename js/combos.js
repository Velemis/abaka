// noinspection JSUnusedGlobalSymbols
const combos = {
    pairCombo: function (dicePoints) {
        return comboCommons.getPointsForSeveralOfAKind(dicePoints, 2);
    },
    twoPairCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }

        let dicePointsCopy = [...dicePoints];

        let firstPairDice = comboCommons.getMaxDiceOfMinimumSame(dicePointsCopy, 2);
        if (firstPairDice == null) {
            return 0;
        }

        dicePointsCopy.splice(dicePointsCopy.indexOf(firstPairDice), 1);
        dicePointsCopy.splice(dicePointsCopy.indexOf(firstPairDice), 1);

        let pointsForSecondPair = comboCommons.getPointsForSeveralOfAKind(dicePointsCopy, 2);
        if (pointsForSecondPair === 0) {
            return 0;
        }

        return firstPairDice * 2 + pointsForSecondPair;
    },
    threeOfAKindCombo: function (dicePoints) {
        return comboCommons.getPointsForSeveralOfAKind(dicePoints, 3);
    },
    fourOfAKindCombo: function (dicePoints) {
        return comboCommons.getPointsForSeveralOfAKind(dicePoints, 4);
    },
    fiveOfAKindCombo: function (dicePoints) {
        return comboCommons.getPointsForSeveralOfAKind(dicePoints, 5);
    },
    smallStraightCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }

        let counts = [];
        for (const points of dicePoints) {
            counts[points] = counts[points] ? counts[points] + 1 : 1;
        }

        let straightPoints = 0;
        let straightCounter = 0;
        for (let i = 6; i > 0; i--) {
            if (typeof counts[i] === 'undefined') {
                straightPoints = 0;
                straightCounter = 0;
            } else {
                straightPoints += i;
                straightCounter++;
                if (straightCounter >= 4) {
                    return straightPoints;
                }
            }
        }

        return 0;
    },
    bigStraightCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }

        let counts = [];
        for (const points of dicePoints) {
            counts[points] = counts[points] ? counts[points] + 1 : 1;
        }

        let straightPoints = 0;
        let straightCounter = 0;
        for (let i = 6; i > 0; i--) {
            if (typeof counts[i] === 'undefined') {
                straightPoints = 0;
                straightCounter = 0;
            } else {
                straightPoints += i;
                straightCounter++;
                if (straightCounter >= 5) {
                    return straightPoints;
                }
            }
        }

        return 0;
    },
    fullHouseCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }

        let dicePointsCopy = [...dicePoints];

        let tripletDice = comboCommons.getMaxDiceOfMinimumSame(dicePointsCopy, 3);
        if (tripletDice == null) {
            return 0;
        }

        dicePointsCopy.splice(dicePointsCopy.indexOf(tripletDice), 1);
        dicePointsCopy.splice(dicePointsCopy.indexOf(tripletDice), 1);
        dicePointsCopy.splice(dicePointsCopy.indexOf(tripletDice), 1);

        let pointsForPair = comboCommons.getPointsForSeveralOfAKind(dicePointsCopy, 2);
        if (pointsForPair === 0) {
            return 0;
        }

        return tripletDice * 3 + pointsForPair;
    },
    maximumCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        return dicePoints.reduce((partialSum, a) => partialSum + a, 0);
    },
    minimumCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        return 35 - dicePoints.reduce((partialSum, a) => partialSum + a, 0);
    },
    evensCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        return dicePoints.filter(dice => dice % 2 === 0).reduce((partialSum, a) => partialSum + a, 0);
    },
    oddsCombo: function (dicePoints) {
        if (dicePoints == null || dicePoints.length === 0) {
            return 0;
        }
        return dicePoints.filter(dice => dice % 2 === 1).reduce((partialSum, a) => partialSum + a, 0);
    },
    jumbleCombo: function (dicePoints, currentPointsForCombos) {
        if (dicePoints == null || dicePoints.length === 0 || currentPointsForCombos === null) {
            return 0;
        }

        let currentPointsForCombosCopy = new Map(currentPointsForCombos);
        currentPointsForCombosCopy.delete("jumbleCombo");

        for (let key of currentPointsForCombosCopy.keys()) {
            if (currentPointsForCombosCopy.get(key) === null) {
                currentPointsForCombosCopy.delete(key);
            }
        }

        let maxPoints = 0;
        for (let key of currentPointsForCombosCopy.keys()) {
            maxPoints = Math.max(maxPoints, combos[key](dicePoints));
        }

        return maxPoints;
    }
}

const comboCommons = {
    getPointsForSeveralOfAKind: function (dicePoints, minimumCount) {
        if (dicePoints == null || dicePoints.length === 0 || minimumCount == null) {
            return 0;
        }

        let counts = [];
        for (const points of dicePoints) {
            counts[points] = counts[points] ? counts[points] + 1 : 1;
        }

        for (let i = 6; i > 0; i--) {
            if (typeof counts[i] !== 'undefined') {
                let count = counts[i];
                if (count >= minimumCount) {
                    return i * minimumCount;
                }
            }
        }

        return 0;
    },
    getMaxDiceOfMinimumSame: function (dicePoints, minimumCount) {
        if (dicePoints == null || dicePoints.length === 0 || minimumCount == null) {
            return null;
        }

        let counts = [];
        for (const points of dicePoints) {
            counts[points] = counts[points] ? counts[points] + 1 : 1;
        }

        for (let i = 6; i > 0; i--) {
            if (typeof counts[i] !== 'undefined') {
                let count = counts[i];
                if (count >= minimumCount) {
                    return i;
                }
            }
        }

        return null;
    }
}