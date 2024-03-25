function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.CurrentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.CurrentQuestionIndex++;
}

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.CurrentQuestionIndex];
};

Quiz.prototype.hasEnded = function()  {
    return this.CurrentQuestionIndex >= this.questions.length;
};
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) { 

    return this.answer === choice;
};
var QuizUI = {
    displayNext: function() {
        if (Quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion:  function() {
        this.populateIdwithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

    for(var i = 0; i < choices.length; i++) {
        this.populateIdwithHTML("choice" + i, choices[i]);
        this.guessHandler("guess" + i, choices[i]);
      }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + " /5 </h2>";
        this.populateIdwithHTML("quiz", gameOverHTML);
    },

    populateIdwithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess)  {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },

    displayProgress: function() {
        var getCurrentQuestionNumber = quiz.CurrentQuestionIndex + 1;
        this.populateIdwithHTML("progress", "Question" + getCurrentQuestionNumber + " of " + quiz. questions.length);
    }

};

//Create Questions
var questions = [
    new Question("which planet has the most moons?",["jupiter", "Uranus", "Mars", "Saturn"],
     "Saturn"),
     new Question("What country won the most world cups?", ["Brazil", "Argentina", "England", "France"], "Brazil"),
     
     new Question("What is the capital city of Cameroon?", ["Bamenda", "Douala", "Yaounde", "lagos"], "Yaounde"),

     new Question("In which country was football first recognized?", ["England", "Brazil", "France", "USA"], "England"),

     new Question("Where was the 2022 world cup played?", ["France", "Brazil", "Qatar", "Saudi Arabia"], "Qatar"),
];

//create Quiz
var quiz = new Quiz(questions);

//display Quiz
QuizUI.displayNext();