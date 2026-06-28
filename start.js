"use strict";

async function loadData() {
    const res = await fetch("BD.json");
    const allQuestions = await res.json();
    const total = allQuestions.length;

    sessionStorage.setItem("questions", JSON.stringify(allQuestions));

    document.getElementById("procent1").textContent = Math.floor(total * 0.10) + " вопросов (10%)";
    document.getElementById("procent2").textContent = Math.floor(total * 0.30) + " вопросов (30%)";
    document.getElementById("procent3").textContent = Math.floor(total * 0.50) + " вопросов (50%)";
    document.getElementById("procent4").textContent = total + " вопросов (100%)";
}

function check_value_questions(index) {
    const percents = [0.10, 0.30, 0.50, 1.00];
    sessionStorage.setItem("percent", percents[index]);
    window.location.href = "main.html";
}

loadData();