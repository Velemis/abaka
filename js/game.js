// Game consts
const DICE_COUNT = 5;
const MAX_THROWS = 3;

// Resources consts
const DICE_THROW_SOUNDS_COUNT = 3;

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
        this.uIRenderer = new UIRenderer(this.imageLoader);
        this.soundRenderer = new SoundRenderer();
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
    setPoints: function (comboId) {
        alert(comboId);
    }

}

class GameState {

    throws = 0;
    dicePoints = [];
    uIRenderer = null;
    soundRenderer = null;

    constructor(uIRenderer, soundRenderer) {
        this.uIRenderer = uIRenderer;
        this.soundRenderer = soundRenderer;
    }

    resultIsDoubled() {
        return this.throws === 1;
    }

    canRoll() {
        return this.throws < MAX_THROWS;
    }

    roll() {
        this.throws++;
        this.dicePoints = [];
        for (let i = 0; i < DICE_COUNT; i++) {
            this.dicePoints.push(this.getRandomPoints());
        }

        this.uIRenderer.onRoll(this.dicePoints, this.throws, this.resultIsDoubled(), this.canRoll());
        this.soundRenderer.onRoll();
    }

    getRandomPoints() {
        return Math.floor(Math.random() * 5) + 1;
    }

}

class UIRenderer {

    imageLoader = null;
    diceElements = [];
    throwCounterElement = null;
    resultDoubleElement = null;
    rollButtonElement = null;

    constructor(imageLoader) {
        this.imageLoader = imageLoader;
        for (let i = 1; i <= DICE_COUNT; i++) {
            this.diceElements.push(document.getElementById("dice" + i));
        }
        this.throwCounterElement = document.getElementById("throwCounter");
        this.resultDoubleElement = document.getElementById("resultDouble");
        this.rollButtonElement = document.getElementById("rollButton");
        let comboElements = document.getElementsByClassName("combo");
        for (const comboElement of comboElements) {
            comboElement.addEventListener("click", () => game.setPoints(comboElement.id));
        }
    }

    onRoll(dicePoints, throws, resultIsDoubled, canRoll) {
        this.onDicePointsChanged(dicePoints);
        this.onThrowsChanged(throws, canRoll);
        this.onResultIsDoubledChanged(resultIsDoubled);
    }

    onDicePointsChanged(dicePoints) {
        for (let i = 0; i < dicePoints.length && i < DICE_COUNT; i++) {
            const dicePoint = dicePoints[i];
            let diceElement = this.diceElements[i];
            diceElement.src = this.imageLoader.getImagePathForPoints(dicePoint);
        }
    }

    onThrowsChanged(throws, canRoll) {
        this.throwCounterElement.innerHTML = `Throws: ${throws}/${MAX_THROWS}`;
        let classList = this.rollButtonElement.classList;
        if (canRoll) {
            if (classList.contains("disabled")) {
                classList.remove("disabled");
            }
        } else {
            if (!classList.contains("disabled")) {
                classList.add("disabled");
            }
        }
    }

    onResultIsDoubledChanged(resultIsDoubled) {
        let classList = this.resultDoubleElement.classList;
        if (resultIsDoubled) {
            if (classList.contains("invisible")) {
                classList.remove("invisible");
            }
            if (!classList.contains("visible")) {
                classList.add("visible");
            }
        } else {
            if (classList.contains("visible")) {
                classList.remove("visible");
            }
            if (!classList.contains("invisible")) {
                classList.add("invisible");
            }
        }
    }

}

class ImageLoader {

    getImagePathForPoints(points) {
        return `../svg/dice-face-${points}.svg`;
    }

}

// noinspection JSIgnoredPromiseFromCall
class SoundRenderer {

    diceSound = [];

    constructor() {
        for (let i = 1; i <= DICE_THROW_SOUNDS_COUNT; i++) {
            this.diceSound.push(new Audio(`../sound/dice-throw-${i}.wav`));
        }
    }

    onRoll() {
        this.getRandomThrowSound().play();
    }

    getRandomThrowSound() {
        return this.diceSound[Math.floor(Math.random() * 2) + 1];
    }

}


