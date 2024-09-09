// Array de perguntas do quiz
const quizData = [
    {
        question: 'Qual é a capital da França?',
        options: ['Paris', 'Londres', 'Roma', 'Berlim'],
        answer: 'Paris'
    },
    {
        question: 'Qual é o maior planeta do sistema solar?',
        options: ['Terra', 'Júpiter', 'Marte', 'Vênus'],
        answer: 'Júpiter'
    },
    {
        question: 'Quem escreveu "Dom Quixote"?',
        options: ['William Shakespeare', 'Miguel de Cervantes', 'J.K. Rowling', 'Gabriel García Márquez'],
        answer: 'Miguel de Cervantes'
    },
    {
        question: 'Quantos continentes existem?',
        options: ['5', '6', '7', '8'],
        answer: '7'
    },
    {
        question: 'Qual é a fórmula química da água?',
        options: ['H2O', 'CO2', 'O2', 'H2'],
        answer: 'H2O'
    }
];

// Elementos do DOM
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// Inicia o quiz ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});

// Carrega a pergunta atual
function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectAnswer(button, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });
}

// Reseta o estado para a próxima pergunta
function resetState() {
    nextButton.classList.add('hidden');
    optionsContainer.innerHTML = '';
}

// Lida com a seleção da resposta
function selectAnswer(selectedButton, correctAnswer) {
    const isCorrect = selectedButton.textContent === correctAnswer;
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Desabilita todos os botões após a resposta
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });

    nextButton.classList.remove('hidden');
}

// Lida com o clique no botão de próxima pergunta
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Exibe o resultado final do quiz
function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.textContent = `${score} de ${quizData.length}`;
}

// Reinicia o quiz
restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    loadQuestion();
});
