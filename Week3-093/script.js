const quiz = [
  { question: "Which team won the IPL 2020?", options: ["CSK", "MI", "SRH", "DC"], answer: "MI" },
  { question: "Which player scored most runs in one IPL edition?", options: ["Suresh Raina", "Chris Gayle", "Virat Kohli", "AB de Villiers"], answer: "Virat Kohli" },
  { question: "Which team lost the IPL final in 2016?", options: ["CSK", "RCB", "SRH", "DC"], answer: "RCB" }
];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(quiz);
let index = 0;
let score = 0;
let time = 30;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");
function loadQuestion() {
  questionEl.textContent = quiz[index].question;
  let html = "";
  quiz[index].options.forEach(option => {
    html += `<label><input type="radio" name="ans" value="${option}"> ${option}</label><br>`;
  });
  optionsEl.innerHTML = html;
}
function nextQuestion() {
  const selected = document.querySelector('input[name="ans"]:checked');
  if (selected && selected.value === quiz[index].answer) {
    score++;
  }
  index++;
  if (index < quiz.length) {
    loadQuestion();
  } else {
    finishQuiz("Score: " + score + "/" + quiz.length);
  }
}
function finishQuiz(message) {
  clearInterval(timer);
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  resultEl.textContent = message;
}
function updateTimer() {
  time--;
  if (time <= 0) {
    timerEl.textContent = "Time: 0";
    finishQuiz("Time Over! Score " + score + "/" + quiz.length);
  } else {
    timerEl.textContent = "Time: " + time;
  }
}
loadQuestion();
const timer = setInterval(updateTimer, 1000);