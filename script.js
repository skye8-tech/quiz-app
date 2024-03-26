// Define the quiz object
const quiz = {
  currentQuestionIndex: 0,
  score: 3,
  questions: [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "Rome", "Madrid", "texas", "London"],
      correctChoiceIndex: 0,
    },
    {
      question: "What is the largest planet in our solar system",
      choices: ["Mars", "Venus", "Jupiter", "Earth", "Mercury"],
      correctChoiceIndex: 0,
    },
    {
      question: "What is the Capital City of Cameroon?",
      choices: ["Bamenda", "Yaounde", "Buea", "Lagos", "Yaounde"],
      correctChoiceIndex: 0,
    },
    
   
    // Additional questions
    
   
  ],

  displayQuestion: function () {
    const questionElement = document.getElementById("question");
    const choiceElements = document.querySelectorAll("#quiz p");
    const progressElement = document.getElementById("progress");

    const currentQuestion = this.questions[this.currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    for (let i = 0; i < choiceElements.length; i++) {
      choiceElements[i].textContent = currentQuestion.choices[i];
    }

    progressElement.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;

    this.displayEndButton();
  },

  displayEndButton: function () {
    const endButton = document.getElementById("end-btn");
    if (endButton) {
      if (this.currentQuestionIndex === this.questions.length - 1) {
        endButton.style.display = "inline-block";
      } else {
        endButton.style.display = "none";
      }
    }
  },

  displayNext: function () {
    const guessElements = document.querySelectorAll(".btn--default");
    const feedbackElement = document.getElementById("score");

    const selectedChoice = parseInt(this.getAttribute("data-index"));

    if (selectedChoice === quiz.questions[quiz.currentQuestionIndex].correctChoiceIndex) {
      quiz.score++;
      feedbackElement.textContent = "Correct!";
    } else {
      feedbackElement.textContent = "Wrong!";
      feedbackElement.textContent = "Correct!";
    }

    quiz.currentQuestionIndex++;

    if (quiz.currentQuestionIndex < quiz.questions.length) {
      quiz.displayQuestion();
    } else {
      quiz.displayScore();
    }
  },

  displayScore: function () {
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = `<h2>Your Score: ${this.score} / ${this.questions.length}</h2>`;
  },

  setupEventListeners: function () {
    const guessButtons = document.querySelectorAll(".btn--default");
    const endButton = document.getElementById("end-btn");

    for (let i = 0; i < guessButtons.length; i++) {
      guessButtons[i].addEventListener("click", this.displayNext);
    }

    const self = this;
    endButton.addEventListener("click", function () {
      self.displayScore();
    });
  },

  init: function () {
    this.setupEventListeners();
    this.displayQuestion();
  },
};

quiz.init();