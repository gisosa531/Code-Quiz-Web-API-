// Variables to reference DOM elements and keep track of quiz state
var queryEl = document.getElementById("questions");
var timerCheck;
var timerShow = document.getElementById("time")
var questionArray = 0;
var time = questions.length * 10;
var quizChoices = document.getElementById("answers")
var answerResponse = document.getElementById("answerResponse")
var startBtn = document.getElementById("begin")

function startNow() {
    // Hides start screen by adding hide attribute
    var startEl = document.getElementById("startScreen");
    startEl.setAttribute("class","hide");
    queryEl.removeAttribute("class");
    timerCheck = setInterval(clockStart, 2000);
    timerShow.textContent = time;

    printQuestion();
}


function printQuestion() {
  var questionList = questions[questionArray];

  var titleDisplay = document.getElementById("questionTitle");
  titleDisplay.textContent = questionList.title;

  quizChoices.innerHTML = "";

  questionList.choices.forEach(function(choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);

    choiceBtn.textContent = i + 1 + ". " + choice;

    choiceBtn.onclick = questionResponse;

    quizChoices.appendChild(choiceBtn);
  });
}

function questionResponse() {
    if (this.value !== questions[questionArray].answer) {
        time -= 10;
    
        if (time < 0) {
          time = 0;
        }
    
        timerShow.textContent = time;
    
        incorrectSfx.play();
    
        answerResponse.textContent = "Wrong!";
      } else {
        correctSfx.play();
    
        answerResponse.textContent = "Correct!";
      }
    
      answerResponse.setAttribute("class", "feedback");
      setTimeout(function() {
        answerResponse.setAttribute("class", "feedback hide");
      }, 2000);
    
      questionArray++;
    
      if (questionArray === questions.length) {
        endQuiz();
      } else {
        printQuestion();
      }
    }

    function endQuiz() {
        clearInterval(timerCheck);
      
        var endScreen = document.getElementById("endPanel");
        endScreen.removeAttribute("class");
      
        var finalScoreDisplay = document.getElementById("finalScore");
        finalScoreDisplay.textContent = time;
      
        queryEl.setAttribute("class", "hide");
      }

      function clockStart() {
        time--;
        timerShow.textContent = time;



      }



function saveScore () {



}

startBtn.onclick = startNow;

var correctSfx = new Audio("./assets/sfx/correct.wav");
var incorrectSfx = new Audio ("./assets/sfx/incorrect.wav");