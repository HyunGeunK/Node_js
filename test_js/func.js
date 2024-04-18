//var.js를 참조하는 파일

const { odd, even } = require('./var');

function checkOddOrEven(num){
    if (num % 2) {
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven;