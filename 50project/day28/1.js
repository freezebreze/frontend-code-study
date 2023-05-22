const startBtn = document.getElementById('start-btn')
const screen = document.getElementsByClassName('screen')
const chooseBtn = document.getElementsByClassName('choose-insect-btn')
const chooseBtnNum = chooseBtn.length
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let chooseImg = ''
let seconds = 0
let score = 0
startBtn.addEventListener('click', () => {
    screen[0].classList.add('up')
})

for(let i = 0; i< chooseBtnNum; i++) {
    chooseBtn[i].addEventListener('click', () => {
        chooseImg = chooseBtn[i].children[1].src
        screen[1].classList.add('up')
        //启动游戏
        setTimeout(createInsect, 1000);
        game()
    })
}

function game() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${chooseImg}"  style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchInsect() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}