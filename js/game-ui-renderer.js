class GameUIRenderer {

    imageLoader = null;
    diceElements = [];
    throwCounterElement = null;
    resultDoubleElement = null;
    rollButtonElement = null;
    comboContainers = [];
    totalResultElement = null;

    constructor(imageLoader) {
        this.imageLoader = imageLoader;
        for (let i = 1; i <= DICE_COUNT; i++) {
            this.diceElements.push(document.getElementById("dice" + i));
        }
        this.throwCounterElement = document.getElementById("throwCounter");
        this.resultDoubleElement = document.getElementById("resultDouble");
        this.rollButtonElement = document.getElementById("rollButton");
        this.totalResultElement = document.getElementById("totalResult");
        this.comboContainers = document.getElementsByClassName("combo-container");
        for (const comboElement of this.comboContainers) {
            comboElement.addEventListener("click", () => game.triggerCombo(comboElement.id));
        }
    }

    onStateChange(
        dicePoints,
        throws,
        resultIsDoubled,
        canRoll,
        possiblePointsForCombos,
        currentPointsForCombos,
        totalPoints
    ) {
        this.onDicePointsChanged(dicePoints);
        this.onPossibleOrCurrentPointsChanged(possiblePointsForCombos, currentPointsForCombos);
        this.onThrowsChanged(throws, canRoll);
        this.onResultIsDoubledChanged(resultIsDoubled);
        this.onTotalPointsChanged(totalPoints);
    }

    onDicePointsChanged(dicePoints) {
        if (dicePoints.length === 0) {
            for (let i = 0; i < DICE_COUNT; i++) {
                let diceElement = this.diceElements[i];
                diceElement.src = this.imageLoader.getImagePathForUnknown();
            }
        } else {
            for (let i = 0; i < dicePoints.length && i < DICE_COUNT; i++) {
                const dicePoint = dicePoints[i];
                let diceElement = this.diceElements[i];
                diceElement.src = this.imageLoader.getImagePathForDice(dicePoint);
            }
        }
    }

    onPossibleOrCurrentPointsChanged(possiblePointsForCombos, currentPointsForCombos) {
        if (possiblePointsForCombos == null || currentPointsForCombos == null) {
            return;
        }

        for (const comboElement of this.comboContainers) {
            let comboId = comboElement.id;
            let classList = comboElement.classList;
            classList.remove("table-danger", "table-success");
            if (currentPointsForCombos.get(comboId) !== null) {
                classList.add("table-success");

                let points = currentPointsForCombos.get(comboId);
                let comboContainer = document.getElementById(comboId);

                let currentComboResultElement = comboContainer.getElementsByClassName("currentComboResult");
                if (currentComboResultElement.length > 0) {
                    currentComboResultElement[0].innerHTML = points;
                }

                let currentThrowResultElement = comboContainer.getElementsByClassName("currentThrowResult");
                if (currentThrowResultElement.length > 0) {
                    currentThrowResultElement[0].innerHTML = "";
                }

                continue;
            }
            if (possiblePointsForCombos.get(comboId) === null) {
                classList.add("table-danger");

                let comboContainer = document.getElementById(comboId);

                let currentThrowResultElement = comboContainer.getElementsByClassName("currentThrowResult");
                if (currentThrowResultElement.length > 0) {
                    currentThrowResultElement[0].innerHTML = "";
                }
            } else {
                let points = possiblePointsForCombos.get(comboId);
                let comboContainer = document.getElementById(comboId);

                let currentThrowResultElement = comboContainer.getElementsByClassName("currentThrowResult");
                if (currentThrowResultElement.length > 0) {
                    currentThrowResultElement[0].innerHTML = points;
                }
            }
        }
    }

    onThrowsChanged(throws, canRoll) {
        this.throwCounterElement.innerHTML = `Throws: ${throws}/${MAX_THROWS}`;

        let classList = this.rollButtonElement.classList;
        if (canRoll) {
            classList.remove("disabled");
        } else {
            classList.add("disabled");
        }
    }

    onResultIsDoubledChanged(resultIsDoubled) {
        let classList = this.resultDoubleElement.classList;
        if (resultIsDoubled) {
            classList.remove("invisible");
            classList.add("visible");
        } else {
            classList.remove("visible");
            classList.add("invisible");
        }
    }

    onTotalPointsChanged(totalPoints) {
        this.totalResultElement.innerHTML = totalPoints;
    }

}
