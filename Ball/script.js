let ball = document.getElementById("ball");
let hole1 = document.getElementById("hole1");
const alertMsg = document.getElementById("alertMsg");

let startGameBtn = document.querySelector("#start-game");
let startGameCont = document.querySelector(".startgame-cont");
let endGameText = document.querySelector(".startgame-cont div");

let time1;
let time2;

startGameBtn.addEventListener('click', function () {
    ball.style.top = "50%";
    ball.style.left = "50%";
    startGameCont.style.display = "none";
    time1 = Date.now();
    window.addEventListener('deviceorientation', moveMe);
    console.log(time1);
});

function moveMe(e) {
    let alfa = e.alpha;
    let beta = e.beta;
    let gamma = e.gamma;

    let distA = (gamma * 4.5) + 160;
    let distB = (beta * 4.5) + 240;

    ball.style.left = distA + "px";
    console.log('left: ' + ball.style.left);
    console.log('distA: ' + distA);
    console.log('distB: ' + distB);

    //left & right

    if (distA < 0) {
        ball.style.left = 0;
    }

    if (distA > 310) {
        ball.style.left = 310 + "px";
    }

    // up & down

    ball.style.top = distB + "px";

    if (distB < 0) {
        ball.style.top = 0;
    }

    if (distB > 490) {
        ball.style.top = 490 + "px";
    }

    // ball in the trap

    if ((ball.style.top >= "100px" && ball.style.top <= "120px") && (ball.style.left >= "150px" && ball.style.left <= "170px")) {
        window.removeEventListener('deviceorientation', moveMe);
        startGameCont.style.display = "flex";
        endGameText.innerHTML = `Finish, You Lose`;
        startGameBtn.innerHTML = "Start Again?";
    }

    // ball reaches the target

    if ((ball.style.top >= "50px" && ball.style.top <= "70px") && (ball.style.left >= "150px" && ball.style.left <= "170px")) {
        time2 = Date.now();
        window.removeEventListener('deviceorientation', moveMe);
        startGameCont.style.display = "flex";
        endGameText.innerHTML = `Finish, Your time: ${parseInt((time2 - time1) / 1000)}s ${(time2 - time1) - parseInt((time2 - time1) / 1000) * 1000}ms`;
        startGameBtn.innerHTML = "Start Again?";
    }
}

