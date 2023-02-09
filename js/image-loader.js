class ImageLoader {

    getImagePathForDice(points) {
        return `../svg/dice-face-${points}.svg`;
    }

    getImagePathForBlockedDice(points) {
        return `../svg/dice-face-locked-${points}.svg`;
    }

    getImagePathForUnknown() {
        return `../svg/dice-face-unknown.svg`;
    }

}