const open = document.querySelector('.open-btn')
const close = document.querySelector('.close-btn')
const nav = document.querySelectorAll('.nav')

function toggleNav() {
    nav.forEach(item => {
        item.classList.toggle('visible')
    })
}

open.addEventListener('click', () => {
    toggleNav()
})

close.addEventListener('click', () => {
    toggleNav()
})