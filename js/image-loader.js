class ImageLoader {

    getImagePathForPoints(points) {
        return `../svg/dice-face-${points}.svg`;
    }

    getImagePathForUnknown() {
        return `../svg/dice-face-unknown.svg`;
    }

}