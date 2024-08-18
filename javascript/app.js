const numbers = document.querySelector('.numbers')
const operations = document.querySelector('.operations')
const displayScreen = document.querySelector('.display')
let numArr = []
let displayString = ""

const opsSymbols = [
    {
        name: 'addition',
        symbol: '+',
    },
    {
        name: 'subtraction',
        symbol: '-',
    },
    {
        name: 'multiplication',
        symbol: 'X',
    },
    {
        name: 'division',
        symbol: '/'
    },
]

function createOps() {
    for (let i = 0; i <= opsSymbols.length - 1; i++) {
        const operationCard = document.createElement('div')

        operationCard.textContent = opsSymbols[i].symbol
        operationCard.classList.add('operation-card', 'fragment-mono-regular')
        operationCard.id = `${opsSymbols[i].name}-op`
        operations.appendChild(operationCard)
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

numCard.forEach(card => {
    card.addEventListener('click', (e) => {
        e.target.textContent === '.' ? numArr.push(e.target.textContent) : numArr.push(parseInt(e.target.textContent))
        displayString = numArr.join('')
        displayScreen.textContent = displayString

    })
})

deleteBtn.addEventListener('click', e => {
    numArr = []
    displayScreen.textContent = '-'
})