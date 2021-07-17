function displayScores() {
    var getScores = JSON.parse(window.localStorage.getItem("getScores")) || [];

    getScores.sort(function(a, b) {
        return b.score - a.score;
    });

    getScores.forEach(function(score){
        var listEl = document.createElement("li");
        listEl.textContent = score.initials + " - " + score.score;

        var displayOl = document.getElementById("getScores");
        displayOl.appendChild(listEl);
    });
}

function clearScores() {
    window.localStorage.removeItem("getScores");
    window.location.reload();
}

document.getElementById("remove").onclick = clearScores;

displayScores();