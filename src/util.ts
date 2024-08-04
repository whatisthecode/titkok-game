export function random(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
}

export function getPlayTimes() {
    return Math.floor(random(1, 2));
}

export function getWishingResult() {
    return random(0, 8);
}

export function generateDefaultResult(playCount: number) {
    const result = [];
    for (let i = 0; i < playCount; i++) {
        result[i] = -1;
    }
    return result;
}