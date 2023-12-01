const button = document.querySelector('#button')
const toast_class = ['info', 'success', 'error']
const messages = [
    'Message One',
    'Message Two',
    'Message Three',
    'Message Four',
]
const toasts = document.getElementById('toasts')
button.addEventListener('click', (e) => {
    const div = document.createElement('div')
    div.classList.add('toast')
    div.classList.add(getClassName())
    div.innerText = getToastMeessage()
    toasts.appendChild(div)
    setTimeout(() => {
        div.remove()
    }, 3000);
})

function getClassName() {
    return toast_class[getRandomIntInclusive(0, 3)]
}

function getToastMeessage() {
    return messages[getRandomIntInclusive(0, 3)]
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}
