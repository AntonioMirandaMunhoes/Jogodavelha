const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Marque a opção que corresponde a um ser metafisicamente necessário:',
        choice1: 'Deus',
        choice2: 'Espaço-Tempo',
        choice3: 'Zeus',
        choice4: 'Alma',
        answer: 2,
    },
    {
        question: 'Qual país tem mais ateus em números absolutos?',
        choice1: 'Suécia',
        choice2: 'Brasil',
        choice3: 'China',
        choice4: 'Dinamarca',
        answer: 3,
    },
    {
        question: 'Deus pode ser um ser maximamente justo e maximamente misericordioso?',
        choice1: 'Sim! Pois ele é deus',
        choice2: 'Isso é um mistério',
        choice3: 'Não! Pois, são atributos contraditórios assim como circulos-quadrados',
        choice4: 'Sim! Pois, um não anula o outro',
        answer: 3,
    },
    {
        question: 'Os países mais pacificos do mundo tendem a ser:',
        choice1: 'Os países menos religiosos',
        choice2: 'Os países mais ateus',
        choice3: 'Os países mais religiosos',
        choice4: 'Os países mais radicais',
        answer: 1,
    },
    {
        question: 'Qual dessas personalidades é ateu?',
        choice1: 'Carl sagan',
        choice2: 'Edir Macedo',
        choice3: 'william Lane Craig',
        choice4: 'Neil deGrasse Tyson',
        answer: 1,
    },
    {
        question: 'Quem inventou a teoria do Big Bang?',
        choice1: 'O ateu, Stephen Hawking',
        choice2: 'O padre Belga, Georges Lemaître',
        choice3: 'O físico, Albert Heinstein',
        choice4: 'O naturalista, Charles Darwin',
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

