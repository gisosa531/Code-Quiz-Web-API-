function displayScores() {
    //Gets scores from localstorage or uses empty array
    var getScores = JSON.parse(window.localStorage.getItem("getScores")) || [];
    // Adds descending order to scores
    getScores.sort(function(a, b) {
        return b.score - a.score;
    });
    //Creates li element for scores and displays them on page
    getScores.forEach(function(score){
        var listEl = document.createElement("li");
        listEl.textContent = score.initials + " - " + score.score;

        var displayOl = document.getElementById("getScores");
        displayOl.appendChild(listEl);
    });
}
//Adds function to remove the displayed scores from localstorage
function clearScores() {
    window.localStorage.removeItem("getScores");
    window.location.reload();
}

document.getElementById("remove").onclick = clearScores;

displayScores();