const panels = document.querySelectorAll('.panel')

panels.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
        //移除所有active类
        removeActiveClasses();
        item.classList.add('active')
    })
})

function removeActiveClasses() {
    panels.forEach(item => {
        item.classList.remove('active')
    })
}