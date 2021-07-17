// Variables to reference DOM elements and keep track of quiz state
var queryEl = document.getElementById("questions");
var timerCheck;
var timerShow = document.getElementById("time");
var questionArray = 0;
var time = questions.length * 10;
var quizChoices = document.getElementById("answers");
var answerResponse = document.getElementById("answerResponse");
var startBtn = document.getElementById("begin");
var insertInitials = document.getElementById("initials");
var submitBtn = document.getElementById("submit");

function startNow() {
    // Hides start screen by adding hide attribute
    var startEl = document.getElementById("startScreen");
    startEl.setAttribute("class","hide");
    // removes class and un-hides questions
    queryEl.removeAttribute("class");
    //Starts timer 
    timerCheck = setInterval(clockStart, 2000);
    //shows the textContent of time
    timerShow.textContent = time;

    printQuestion();
}


function printQuestion() {
    //gets questions from array
  var questionList = questions[questionArray];
    // updates questions title with other questions
  var titleDisplay = document.getElementById("questionTitle");
  titleDisplay.textContent = questionList.title;

    //removes previous question choices
  quizChoices.innerHTML = "";
    //Loop choices and creates buttons for each choice
  questionList.choices.forEach(function(choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);

    choiceBtn.textContent = i + 1 + ". " + choice;
    //adds click to each choice
    choiceBtn.onclick = questionResponse;
    //displays choices
    quizChoices.appendChild(choiceBtn);
  });
}

function questionResponse() {
    //checks for answer value and if the response was correct
    if (this.value !== questions[questionArray].answer) {
        //10 second deduction for wrong answer
        time -= 10;
    
        if (time < 0) {
          time = 0;
        }
        //displays time on page
        timerShow.textContent = time;
        // if incorrect, it plays wrong sound effect
        incorrectSfx.play();
        answerResponse.textContent = "Wrong!";
      } else {
        // if correct, it plays right sound effect
        correctSfx.play();
        answerResponse.textContent = "Correct!";
      }
      // displays feedback 
      answerResponse.setAttribute("class", "feedback");
      setTimeout(function() {
        answerResponse.setAttribute("class", "feedback hide");
      }, 2000);
      //adds another question
      questionArray++;
      //checks for questoin amount
      if (questionArray === questions.length) {
        endQuiz();
      } else {
        printQuestion();
      }
    }

    function endQuiz() {
        //stops checking timer
        clearInterval(timerCheck);
      
        //displays end panel with final score
        var endScreen = document.getElementById("endPanel");
        endScreen.removeAttribute("class");
      
        var finalScoreDisplay = document.getElementById("finalScore");
        finalScoreDisplay.textContent = time;
        //hides the question pages
        queryEl.setAttribute("class", "hide");
      }

      function clockStart() {
          //adds time function and checks if time ran out
        time--;
        timerShow.textContent = time;

        if(time <=0) {
            endQuiz();
        }
      }



function saveScore () {
    //gets initials value from input
    var initials = insertInitials.value.trim();
    // gets initials from localstorage or sets to empty array
    if (initials !== "") {
        var getScores = 
        JSON.parse(window.localStorage.getItem("getScores")) || [];
        
        var editScore = {
            score: time,
            initials: initials
        };
        //locatstorage being utilized and scores page is accessed
        getScores.push(editScore);
        window.localStorage.setItem("getScores", JSON.stringify(getScores));
        window.location.href = "./scores.html";
        }
    }
//Submit and Start button works on click event
submitBtn.onclick = saveScore;
startBtn.onclick = startNow;

//Adds sound effects for answer response
var correctSfx = new Audio("./assets/sfx/correct.wav");
var incorrectSfx = new Audio ("./assets/sfx/incorrect.wav");