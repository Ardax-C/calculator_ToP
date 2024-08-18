const numbers = document.querySelector('.numbers')
const operations = document.querySelector('.operations')
let displayScreen = document.querySelector('.display')
let numArr = []
let opArr = []
let displayString = ""
let store = {
    numSeqOne: null,
    numSeqTwo: null,
    operation: null,
    total: null,
}

const opsSymbols = [
    { name: 'addition', symbol: '+' },
    { name: 'subtraction', symbol: '-' },
    { name: 'multiplication', symbol: 'X' },
    { name: 'division', symbol: '/' }
]

function createOps() {
    for (let i = 0; i < opsSymbols.length; i++) {
        const operationCard = document.createElement('div');
        operationCard.textContent = opsSymbols[i].symbol;
        operationCard.classList.add('operation-card', 'fragment-mono-regular');
        operationCard.id = `${opsSymbols[i].name}-op`;
        operations.appendChild(operationCard);
    }
}

function createNumbers() {
    for (let i = 9; i >= 0; i--) {
        const numberCard = document.createElement('div');
        numberCard.textContent = i.toString();
        numberCard.classList.add('number-card', 'fragment-mono-regular');
        numberCard.id = `number-${i}`;
        numbers.appendChild(numberCard);
    }

    // Add the decimal button
    const decimalCard = document.createElement('div');
    decimalCard.textContent = '.';
    decimalCard.classList.add('number-card', 'fragment-mono-regular');
    decimalCard.id = 'number-decimal';
    numbers.appendChild(decimalCard);
}

createNumbers()
createOps()

const numCard = document.querySelectorAll('.number-card')
const deleteBtn = document.querySelector('#clear-btn')
const opsCard = document.querySelectorAll('.operation-card')
const equalBtn = document.querySelector('#equal-btn')

equalBtn.addEventListener('click', () => {
    let op = store.operation;

    switch (op) {
        case '+':
            store.total = parseFloat(store.numSeqOne) + parseFloat(store.numSeqTwo);
            break;
        case '-':
            store.total = parseFloat(store.numSeqOne) - parseFloat(store.numSeqTwo);
            break;
        case 'X':
            store.total = parseFloat(store.numSeqOne) * parseFloat(store.numSeqTwo);
            break;
        case '/':
            store.total = parseFloat(store.numSeqOne) / parseFloat(store.numSeqTwo);
            break;
    }
    reset();
});

function reset() {
    displayScreen.textContent = Number.isInteger(store.total) ? store.total.toString() : store.total.toFixed(2);
    numArr = [];
    store.numSeqOne = store.total.toString();
    store.numSeqTwo = null;
    store.operation = null;
}

numCard.forEach(card => {
    card.addEventListener('click', (e) => {
        numArr.push(e.target.textContent);
        displayString = numArr.join('');
        displayScreen.textContent = displayString;
        if (store.operation === null) {
            store.numSeqOne = displayScreen.textContent;
        } else {
            store.numSeqTwo = displayScreen.textContent;
        }
        console.log(`1: ${store.numSeqOne}\n2: ${store.numSeqTwo}\nOp: ${store.operation}`);
    });
});

opsCard.forEach(card => {
    card.addEventListener('click', (e) => {
        if (store.numSeqTwo !== null) {
            equalBtn.click();
        }
        opArr = e.target.textContent;
        let op = opArr[0].toString();
        store.operation = op;
        let temp = numArr.join('');
        displayScreen.textContent = `${temp} ${op}`;
        numArr = [];
    });
});

deleteBtn.addEventListener('click', () => {
    numArr = [];
    displayScreen.textContent = '-';
    store.numSeqOne = null;
    store.numSeqTwo = null;
    store.operation = null;
    store.total = null;
});