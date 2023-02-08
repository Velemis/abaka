const DICE_COUNT = 5;

const game = {

    currentGameState: null,
    uIRenderer: null,
    imageLoader: null,

    /**
     * Initialize the game.
     */
    initGame: function () {
        this.imageLoader = new ImageLoader()
        this.currentGameState = new GameState();
        this.uIRenderer = new UIRenderer(this.imageLoader);
    },

    /**
     * Roll the dice.
     */
    roll: function () {
        // Check if we can roll
        if (this.currentGameState.canRoll() !== true) {
            return;
        }

        let dicePoints = this.currentGameState.roll();
        this.uIRenderer.onDicePointsChanged(dicePoints);
    }

}

class GameState {

    throws = 0;
    dicePoints = [];

    resultIsDoubled() {
        return this.throws === 1;
    }

    canRoll() {
        return this.throws < 3;
    }

    roll() {
        this.dicePoints = [];
        for (let i = 0; i < DICE_COUNT; i++) {
            this.dicePoints.push(this.getRandomPoints())
        }
        return this.dicePoints;
    }

    getRandomPoints() {
        return Math.floor(Math.random() * 5) + 1;
    }

}

class UIRenderer {

    imageLoader;
    diceElements = [];

    constructor(imageLoader) {
        this.imageLoader = imageLoader;
        for (let i = 1; i <= DICE_COUNT; i++) {
            this.diceElements.push(document.getElementById("dice" + i));
        }
    }

    onDicePointsChanged(dicePoints) {
        for (let i = 0; i < dicePoints.length && i < DICE_COUNT; i++) {
            const dicePoint = dicePoints[i];
            let diceElement = this.diceElements[i];
            diceElement.src = this.imageLoader.getImagePathForPoints(dicePoint);
        }
    }

}

class ImageLoader {

    getImagePathForPoints(points) {
        return "../svg/dice-face-" + points + ".svg";
    }

}


