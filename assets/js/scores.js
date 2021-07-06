var highScoreList = document.querySelector("#highScores");
var backButton = document.querySelector("#go-back");
var clearScores = document.querySelector("#clear-highscores");

initScores();

//gets scores from localstorage
function initScores() {
    storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedScores !== null) {
        scoreList = storedScores;
    }
    renderScores();
}

//Clears Scoreboard
function clearAll() {
    window.localStorage.clear();
}

//displays scores
function renderScores() {
    if (storedScores !== null) {
        scoreList.sort(function (a, b) {
            return a.newScore - b.newScore;
        });
        scoreList.reverse(function (a, b) {
            return a.newScore - b.newScore
        })

        for (i = 0; i < scoreList.length; i++) {
            var scoreListItem = scoreList[i];
            var tr = document.createElement("tr");
            var nameCell = document.createElement("td");
            var nameCellText = document.createTextNode(scoreListItem.name);
            var scoreCell = document.createElement("td");
            var scoreCellNum = document.createTextNode(scoreListItem.newScore);

            tr.setAttribute("tr-index", i);
            document.getElementById("highScores").appendChild(tr);
            tr.appendChild(nameCell);
            nameCell.appendChild(nameCellText);
            tr.appendChild(scoreCell);
            scoreCell.appendChild(scoreCellNum);

        }
    }
}

//run functions when clicked//
clearScores.addEventListener("click", function () {
    clearAll();
    window.location.href = "scores.html";
})
backButton.addEventListener("click", function () {
    window.location.href = "index.html";
})