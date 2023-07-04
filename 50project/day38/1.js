const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

function renderQuiz() {
    let data = quizData[currentQuiz];
    questionEl.innerText = data.question;
    a_text.innerText = data.a
    b_text.innerText = data.b
    c_text.innerText = data.c
    d_text.innerText = data.d
    answerEls.forEach(item => item.checked = false)
}

function renderResults() {
    quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>

                <button onclick="location.reload()">Reload</button>
            `
}
function reload() {
    currentQuiz = 0;
    score = 0;
    renderQuiz;
}
function changeScore(value) {
    let data = quizData[currentQuiz];
    if (data.correct == value) {
        score++
    }
    if (currentQuiz >= quizData.length - 1) {
        renderResults()
    } else {
        currentQuiz++
        renderQuiz()
    }

}

submitBtn.addEventListener('click', () => {
    //判断是否有选择的值 -> 有  判断对不对 对  score++ 无 不作加分， 然后判断是否最后一题 是  出结果  不是  渲染下一题
    answerEls.forEach(item => {
        if (item.checked) {
            changeScore(item.getAttribute('id'))
        }
    })
})
//运行页面时先调用一次
renderQuiz()