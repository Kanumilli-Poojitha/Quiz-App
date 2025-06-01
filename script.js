const questions = [
    {
        question: "Which of the following is not an application of generative AI?",
        answers: [
            { text: "Image synthesis", correct: false},
            { text: "Text generation", correct: false},
            { text: "Fraud detection", correct: true},
            { text: "Music composition", correct: false}
        ]
    },
    {
         question: "Which of the following models is commonly used in generative AI for text generation?",
        answers: [
            { text: "CNN", correct: false},
            { text: "LSTM", correct: false},
            { text: "Transformer", correct: true},
            { text: "K-NN", correct: false}
        ]
    },
    {
         question: "what are the two main components of a GAN?",
        answers: [
            { text: "Encoder and Decoder", correct: false},
            { text: "Generator and Discriminator", correct: true},
            { text: "Actor and Critic", correct: false},
            { text: "Transformer and Attention", correct: false}
        ]
    },
    {
         question: "In GANs, what is the role of the Discriminator?",
        answers: [
            { text: "To create realistic images", correct: false},
            { text: "To detect  overfitting", correct: false},
            { text: "To classify real vs fake data", correct: true},
            { text: "To update the generator's weights", correct: false}
        ]
    },
    {
         question: "What kind of learning process do GAN use?",
        answers: [
            { text: "Supervised learning", correct: false},
            { text: "Reinforcement learning", correct: false},
            { text: "Adversarial training", correct: true},
            { text: "Unsupervised clustering", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; 
    let questionNo =  currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();