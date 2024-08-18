document.addEventListener('DOMContentLoaded', () => {
    Calculator.init();
});

const Calculator = {
    displayElement: document.querySelector('.display'),
    numbersContainer: document.querySelector('.numbers'),
    operationsContainer: document.querySelector('.operations'),
    clearButton: document.getElementById('clear-btn'),
    equalButton: document.getElementById('equal-btn'),
    buttonSound: document.getElementById('button-sound'),
    trashSound: document.getElementById('crumple-sound'),
    operationSound: document.getElementById('operation-sound'),
    currentInput: '',
    previousInput: '',
    operator: null,
    operationJustCompleted: false,
    operationInProgress: false,

    init() {
        this.createNumberButtons();
        this.createOperationButtons();
        this.addEventListeners();
    },

    createNumberButtons() {
        for (let i = 9; i >= 0; i--) {
            const button = document.createElement('button');
            button.classList.add('number-card');
            button.textContent = i;
            button.dataset.value = i;
            this.numbersContainer.appendChild(button);
        }
    },

    createOperationButtons() {
        const operations = ['+', '-', '*', '/'];
        operations.forEach(op => {
            const button = document.createElement('button');
            button.classList.add('operation-card');
            button.textContent = op;
            button.dataset.value = op;
            this.operationsContainer.appendChild(button);
        });
    },

    addEventListeners() {
        this.numbersContainer.addEventListener('click', this.handleButtonClick.bind(this));
        this.operationsContainer.addEventListener('click', this.handleButtonClick.bind(this));
        this.clearButton.addEventListener('click', this.handleButtonClick.bind(this));
        this.equalButton.addEventListener('click', this.handleButtonClick.bind(this));
    },

    handleButtonClick(event) {
        if (event.target.matches('button')) {
            if (event.target.classList.contains('number-card')) {
                this.playSound(this.buttonSound);
                this.handleNumberClick(event);
            } else if (event.target.classList.contains('operation-card')) {
                this.playSound(this.operationSound);
                this.handleOperationClick(event);
            } else if (event.target.id === 'clear-btn') {
                this.playSound(this.trashSound);
                this.clearDisplay();
            } else if (event.target.id === 'equal-btn') {
                this.playSound(this.buttonSound);
                this.calculateResult();
            }
        }
    },

    playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    },

    handleNumberClick(event) {
        if (this.operationJustCompleted) {
            this.currentInput = '';
            this.operationJustCompleted = false;
        }
        if (this.operationInProgress) {
            this.currentInput = event.target.dataset.value + ' ' + this.operator;
            this.operationInProgress = false;
        } else {
            this.currentInput = this.currentInput.replace(this.operator, '').trim() + event.target.dataset.value + (this.operator ? ' ' + this.operator : '');
        }
        this.updateDisplay();
    },

    handleOperationClick(event) {
        if (this.currentInput === '') return;
        if (this.previousInput !== '') {
            this.calculateResult();
        }
        this.operator = event.target.dataset.value;
        this.previousInput = this.currentInput;
        this.currentInput = this.currentInput.replace(this.operator, '').trim() + ' ' + this.operator;
        this.operationInProgress = true;
        this.updateDisplay();
    },

    clearDisplay() {
        this.currentInput = '';
        this.previousInput = '';
        this.operator = null;
        this.operationJustCompleted = false;
        this.operationInProgress = false;
        this.updateDisplay();
    },

    calculateResult() {
        if (this.previousInput === '' || this.currentInput === '' || this.operator === null) return;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput.split(' ').shift());
        let result;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentInput = result.toString();
        this.operator = null;
        this.previousInput = '';
        this.operationJustCompleted = true;
        this.updateDisplay();
    },

    updateDisplay() {
        this.displayElement.textContent = this.currentInput || '-';
    }
};