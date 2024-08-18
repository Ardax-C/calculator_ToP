const numbers = document.querySelector('.numbers')

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