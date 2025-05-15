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
    const questionText = questions[current];
    document.getElementById("question").innerText = questionText;
    speakQuestion(questionText);
  } else {
    localStorage.setItem("answers", JSON.stringify(answers));
    window.location.href = "feedback.html";
  }
}

function nextQuestion() {
  const userAnswer = document.getElementById("answer").value.trim();
  answers.push({ question: questions[current], answer: userAnswer });
  document.getElementById("answer").value = "";
  current++;
  showQuestion();
}

window.onload = showQuestion;

// =========== 🎤 Voice Input (Answer) ===========
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  function startListening() {
    recognition.start();
  }

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("answer").value = transcript;
  };

  recognition.onerror = function (event) {
    alert("Voice input error: " + event.error);
  }

  window.startListening = startListening;
} else {
  alert("Speech recognition is not supported in your browser.");
}

// =========== 🔊 Voice Output (Speak Question) ===========
function speakQuestion(text) {
  const synth = window.speechSynthesis;
  if (!synth) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.pitch = 1;
  utterance.rate = 1;
  synth.cancel();  // stop any previous speaking
  synth.speak(utterance);
}
