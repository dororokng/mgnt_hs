"use strict"

let currentQuestion = null;
let allQuestions = [];
let currentIndex = 0;
let questionsLimit = 0;
let questionsAnswered = 0;
let correctCount = 0;
let wrongCount = 0;

function shuffle(array){
    
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}



async function loadData() {
    
    const saved = sessionStorage.getItem("questions");
    const percent = parseFloat(sessionStorage.getItem("percent"));

    if (!saved || !percent) {
        window.location.href = "index.html";
        return;
    }

    allQuestions = shuffle(JSON.parse(saved));
    questionsLimit = Math.max(1, Math.floor(allQuestions.length * percent));
    main();
}

function main() {
    if (questionsAnswered >= questionsLimit) {
        showResults();         
        return;
    }

    if (currentIndex >= allQuestions.length) {
        currentIndex = 0;
        shuffle(allQuestions);
    }

    currentQuestion = allQuestions[currentIndex++];
    questionsAnswered++;

    document.getElementById("nextBtn").classList.add("hidden");
    document.getElementById("question").textContent = currentQuestion.questions;

    for (let i = 0; i < 4; i++) {
        let btn = document.getElementById(`answer${i + 1}`);
        btn.textContent = currentQuestion.answer[i];
        btn.classList.remove("correct", "wrong");
        btn.disabled = false;
    }
    updateProgress();
}

function showResults() {
    const total = correctCount + wrongCount;
    const pct = Math.round(correctCount / total * 100);
    const CIRC = 2 * Math.PI * 70;
    const correctDash = (correctCount / total) * CIRC;
    const wrongDash   = (wrongCount   / total) * CIRC;

    document.querySelector(".button").classList.add("hidden");
    document.getElementById("nextBtn").classList.add("hidden");
    document.getElementById("question").classList.add("hidden");
    document.querySelector(".progress-wrap").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");

    document.getElementById("arc-correct").setAttribute(
        "stroke-dasharray", `${correctDash} ${CIRC}`);
    document.getElementById("arc-wrong").setAttribute(
        "stroke-dasharray", `${wrongDash} ${CIRC}`);
    document.getElementById("arc-wrong").setAttribute(
        "stroke-dashoffset", `-${correctDash}`);

    document.getElementById("pct-num").textContent = pct + "%";
    document.getElementById("cnt-correct").textContent = correctCount;
    document.getElementById("cnt-wrong").textContent = wrongCount;
}

function updateProgress() {
    const pct = Math.round(questionsAnswered / questionsLimit * 100);
    document.getElementById("progFill").style.width = pct + "%";
    document.getElementById("progLabel").textContent =`Вопрос ${questionsAnswered} из ${questionsLimit}`;
    document.getElementById("progPct").textContent = pct + "%";
}



function answer(result) {
    const isCorrect = currentQuestion.correct === result;
    const btn_arr = [
        document.getElementById("answer1"),
        document.getElementById("answer2"),
        document.getElementById("answer3"),
        document.getElementById("answer4"),
    ];

    if (isCorrect) {
        correctCount++;
    } else {
        wrongCount++;
    }

    btn_arr[result].classList.add(isCorrect ? "correct" : "wrong");
    if (!isCorrect) btn_arr[currentQuestion.correct].classList.add("correct");
    btn_arr.forEach(b => b.disabled = true);
    document.getElementById("nextBtn").classList.remove("hidden");
}

loadData();