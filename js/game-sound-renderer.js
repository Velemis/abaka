// noinspection JSIgnoredPromiseFromCall
class GameSoundRenderer {

    diceSound = [];
    coinSound = [];

    constructor() {
        for (let i = 1; i <= DICE_THROW_SOUNDS_COUNT; i++) {
            this.diceSound.push(new Audio(`../sound/dice-throw-${i}.wav`));
        }
        for (let i = 1; i <= COIN_PICK_SOUNDS_COUNT; i++) {
            this.coinSound.push(new Audio(`../sound/coin-pick-${i}.wav`));
        }
    }

    onRoll() {
        this.getRandomThrowSound().play();
    }

    getRandomThrowSound() {
        return this.diceSound[Math.floor(Math.random() * DICE_THROW_SOUNDS_COUNT)];
    }

    onPointsSet() {
        this.getRandomCoinPickSound().play();
    }

    getRandomCoinPickSound() {
        return this.coinSound[Math.floor(Math.random() * COIN_PICK_SOUNDS_COUNT)];
    }

}