// Game consts
const DICE_COUNT = 5;
const MAX_THROWS = 3;

// Resources consts
const DICE_THROW_SOUNDS_COUNT = 3;
const COIN_PICK_SOUNDS_COUNT = 5;
const LOCK_SOUNDS_COUNT = 5;

const game = {

    currentGameState: null,
    uIRenderer: null,
    imageLoader: null,
    soundRenderer: null,

    /**
     * Initialize the game.
     */
    initGame: function () {
        this.imageLoader = new ImageLoader();
        this.uIRenderer = new GameUIRenderer(this.imageLoader);
        this.soundRenderer = new GameSoundRenderer();
        this.currentGameState = new GameState(this.uIRenderer, this.soundRenderer);
    },

    /**
     * Roll the dice.
     */
    roll: function () {
        // Check if we can roll
        if (this.currentGameState.canRoll() !== true) {
            return;
        }
        this.currentGameState.roll();
    },

    /**
     * Set the points for combo.
     *
     * @param comboId Combination id
     */
    triggerCombo: function (comboId) {
        // Check if we can set points
        if (this.currentGameState.canSetPoints(comboId) !== true) {
            return;
        }
        this.currentGameState.setPointsForCombo(comboId);
    },

    /**
     * Switch the dice lock.
     *
     * @param diceIndex index of dice
     */
    switchDiceLock(diceIndex) {
        if (this.currentGameState.canSwitchDiceLock() !== true) {
            return;
        }
        this.currentGameState.switchDiceLock(diceIndex);
    }

}

class GameState {

    throws = 0;
    dicePoints = [];
    uIRenderer = null;
    soundRenderer = null;
    possiblePointsForCombos = new Map();
    currentPointsForCombos = new Map();
    blockedDices = [];

    constructor(uIRenderer, soundRenderer) {
        this.uIRenderer = uIRenderer;
        this.soundRenderer = soundRenderer;
        this.resetBlockedDices();
        this.resetPossiblePointsForCombos();
        for (const combo in combos) {
            this.currentPointsForCombos.set(combo, null);
        }
    }

    resultIsDoubled() {
        return this.throws === 1;
    }

    canRoll() {
        return this.throws < MAX_THROWS;
    }

    canSwitchDiceLock() {
        return this.throws > 0 && this.throws < MAX_THROWS;
    }

    roll() {
        // set throws
        this.throws++;
        // set dice points
        for (let i = 0; i < DICE_COUNT; i++) {
            if (this.blockedDices[i] !== true) {
                this.dicePoints[i] = this.getRandomPoints();
            }
        }
        // set possible points
        this.possiblePointsForCombos.clear();
        for (const combo in combos) {
            if (this.currentPointsForCombos.get(combo) === null) {
                this.possiblePointsForCombos.set(combo, this.calculatePointsForCombo(combo));
            } else {
                this.possiblePointsForCombos.set(combo, null);
            }
        }

        this.uIRenderer.onStateChange(
            this.dicePoints,
            this.throws,
            this.resultIsDoubled(),
            this.canRoll(),
            this.possiblePointsForCombos,
            this.currentPointsForCombos,
            this.getTotalPoints(),
            this.blockedDices
        );
        this.soundRenderer.onRoll();
    }

    getRandomPoints() {
        return Math.floor(Math.random() * 5) + 1;
    }

    canSetPoints(comboId) {
        if (this.currentPointsForCombos === null || this.currentPointsForCombos.get(comboId) !== null) {
            return false;
        }
        return this.throws > 0;
    }

    setPointsForCombo(comboId) {
        this.currentPointsForCombos.set(comboId, this.calculatePointsForCombo(comboId));

        this.uIRenderer.onStateChange(
            this.dicePoints,
            this.throws,
            this.resultIsDoubled(),
            this.canRoll(),
            this.possiblePointsForCombos,
            this.currentPointsForCombos,
            this.getTotalPoints(),
            this.blockedDices
        );
        this.soundRenderer.onPointsSet();

        this.nextTurn();
    }

    calculatePointsForCombo(comboId) {
        let points = combos[comboId](this.dicePoints, this.currentPointsForCombos);
        if (this.resultIsDoubled()) {
            points *= 2;
        }
        return points;
    }

    nextTurn() {
        this.dicePoints = [];
        this.throws = 0;

        this.resetBlockedDices();
        this.resetPossiblePointsForCombos();

        this.uIRenderer.onStateChange(
            this.dicePoints,
            this.throws,
            this.resultIsDoubled(),
            this.canRoll(),
            this.possiblePointsForCombos,
            this.currentPointsForCombos,
            this.getTotalPoints(),
            this.blockedDices
        );
    }

    resetPossiblePointsForCombos() {
        this.possiblePointsForCombos.clear();
        for (const combo in combos) {
            this.possiblePointsForCombos.set(combo, null);
        }
    }

    resetBlockedDices() {
        this.blockedDices = [];
        for (let i = 1; i <= DICE_COUNT; i++) {
            this.blockedDices.push(false);
        }
    }

    getTotalPoints() {
        let currentPointsForCombosCopy = new Map(this.currentPointsForCombos);
        let total = 0;
        for (let key of currentPointsForCombosCopy.keys()) {
            if (currentPointsForCombosCopy.get(key) !== null) {
                total += currentPointsForCombosCopy.get(key);
            }
        }
        return total;
    }

    switchDiceLock(diceIndex) {
        this.blockedDices[diceIndex] = !this.blockedDices[diceIndex];

        this.uIRenderer.onStateChange(
            this.dicePoints,
            this.throws,
            this.resultIsDoubled(),
            this.canRoll(),
            this.possiblePointsForCombos,
            this.currentPointsForCombos,
            this.getTotalPoints(),
            this.blockedDices
        );
        this.soundRenderer.onDiceLock();
    }

}
