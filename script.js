const questions = [
  "Tell me about yourself.",
  "What are your strengths?",
  "Describe a challenge you faced and how you handled it.",
  "Why should we hire you?",
  "Where do you see yourself in 5 years?"
];

let current = 0;
let answers = [];

function showQuestion() {
  if (current < questions.length) {
    document.getElementById("question").innerText = questions[current];
  } else {
    localStorage.setItem("answers", JSON.stringify(answers));
    window.location.href = "feedback.html";
  }
}

function nextQuestion() {
  const ans = document.getElementById("answer").value;
  answers.push({ question: questions[current], answer: ans });
  document.getElementById("answer").value = "";
  current++;
  showQuestion();
}

window.onload = showQuestion;
