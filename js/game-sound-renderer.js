// noinspection JSIgnoredPromiseFromCall
class GameSoundRenderer {

    diceSounds = [];
    coinSounds = [];
    lockSounds = [];

    constructor() {
        for (let i = 1; i <= DICE_THROW_SOUNDS_COUNT; i++) {
            this.diceSounds.push(new Audio(`../sound/dice-throw-${i}.wav`));
        }
        for (let i = 1; i <= COIN_PICK_SOUNDS_COUNT; i++) {
            this.coinSounds.push(new Audio(`../sound/coin-pick-${i}.wav`));
        }
        for (let i = 1; i <= LOCK_SOUNDS_COUNT; i++) {
            this.lockSounds.push(new Audio(`../sound/lock-${i}.wav`));
        }
    }

    onRoll() {
        this.getRandomThrowSound().play();
    }

    getRandomThrowSound() {
        return this.diceSounds[Math.floor(Math.random() * DICE_THROW_SOUNDS_COUNT)];
    }

    onPointsSet() {
        this.getRandomCoinPickSound().play();
    }

    getRandomCoinPickSound() {
        return this.coinSounds[Math.floor(Math.random() * COIN_PICK_SOUNDS_COUNT)];
    }

    onDiceLock() {
        this.getRandomDiceLockSound().play();
    }

    getRandomDiceLockSound() {
        return this.lockSounds[Math.floor(Math.random() * LOCK_SOUNDS_COUNT)];
    }

}