function fixLengthNum(num, length) {
    let current = "";
    for (let i = length; i > 0; i--) {
        current += '0';
    }
    current += num;
    return current.slice(-length);
}

export default class Score {
    constructor(point, maxNumber) {
        const now = new Date();
        this.point = point;
        this.maxNumber = maxNumber;
        this.createdAt = `${fixLengthNum(now.getFullYear(), 4)}-${fixLengthNum(now.getMonth() + 1, 2)}-` +
            `${fixLengthNum(now.getDate(), 2)} ${fixLengthNum(now.getHours(), 2)}:` +
            `${fixLengthNum(now.getMinutes(), 2)}:${fixLengthNum(now.getSeconds(), 2)}`;
    }
}