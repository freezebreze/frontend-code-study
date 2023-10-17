const boxes = document.querySelectorAll('.box')
const checkBoxes = _.throttle(() => {

    console.log(Date.now())
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if (boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}, 300)

checkBoxes()
window.addEventListener('scroll', checkBoxes)