const questions = [
    {
        q: "Which HTML tag is used to define an unordered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        answer: "<ul>"
    },
    {
        q: "Which property is used to change text color in CSS?",
        options: ["color", "font-color", "text-color", "background-color"],
        answer: "color"
    },
    {
        q: "Which method is used to write output in JavaScript?",
        options: ["console.log()", "print()", "echo()", "write()"],
        answer: "console.log()"
    },
    {
        q: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Language", "Stylish Question Language", "Sample Query Language"],
        answer: "Structured Query Language"
    },
    {
        q: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<javascript>", "<script>", "<code>"],
        answer: "<script>"
    },
    {
        q: "Which CSS property controls the spacing between lines of text?",
        options: ["letter-spacing", "line-height", "word-spacing", "text-spacing"],
        answer: "line-height"
    },
    {
        q: "How do you create a function in JavaScript?",
        options: ["function = myFunction()", "function myFunction()", "create myFunction()", "def myFunction()"],
        answer: "function myFunction()"
    },
    {
        q: "Which HTML attribute is used to define inline styles?",
        options: ["class", "style", "font", "styles"],
        answer: "style"
    },
    {
        q: "Which symbol is used for comments in JavaScript?",
        options: ["//", "/* */", "#", "<!-- -->"],
        answer: "//"
    },
    {
        q: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<br>", "<lb>", "<hr>"],
        answer: "<br>"
    }
];

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const testScreen = document.getElementById("test-screen");
const resultScreen = document.getElementById("result-screen");
const scoreText = document.getElementById("score-text");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const timerDisplay = document.getElementById("timer");

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    testScreen.style.display = "block";
    loadQuestion();
    startTimer(15 * 60);
});

function loadQuestion() {
    let q = questions[currentQuestion];
    questionText.innerText = (currentQuestion + 1) + ". " + q.q;
    optionsContainer.innerHTML = "";

    q.options.forEach(opt => {
        let label = document.createElement("label");
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.value = opt;
        if (answers[currentQuestion] === opt) input.checked = true;
        input.addEventListener("change", () => answers[currentQuestion] = opt);
        label.appendChild(input);
        label.appendChild(document.createTextNode(opt));
        optionsContainer.appendChild(label);
    });

    if (currentQuestion === questions.length - 1) {
        submitBtn.style.display = "block";
        nextBtn.style.display = "none";
    } else {
        submitBtn.style.display = "none";
        nextBtn.style.display = "block";
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
});
prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});
submitBtn.addEventListener("click", () => {
    let score = 0;
    questions.forEach((q, i) => {
        if (answers[i] === q.answer) score++;
    });
    testScreen.style.display = "none";
    resultScreen.style.display = "block";
    scoreText.innerText = `You scored ${score} out of ${questions.length}`;
});

function startTimer(duration) {
    let time = duration;
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent =
            (minutes < 10 ? "0" : "") + minutes + ":" +
            (seconds < 10 ? "0" : "") + seconds;
        if (--time < 0) {
            clearInterval(timerInterval);
            submitBtn.click();
        }
    }, 1000);
}
