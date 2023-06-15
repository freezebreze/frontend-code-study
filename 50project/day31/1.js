const lis = document.querySelectorAll('nav li')
const imgs = document.querySelectorAll('.phone img')
console.log(lis)
console.log(imgs)
let activeLi = lis[0]
let activeImg = imgs[0]
lis.forEach((item, i) => {
    item.addEventListener('click', () => {
        activeLi.classList.toggle('active')
        activeImg.classList.toggle('show')
        item.classList.toggle('active')
        imgs[i].classList.toggle('show')
        activeLi = item
        activeImg = imgs[i]
    })
})