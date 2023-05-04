const ratings = document.querySelectorAll('.rating')
const ratingsContainer = document.querySelector('.ratings-container')
const sendBtn = document.querySelector('#send')
const panel = document.querySelector('#panel')
let selectedRating = 'Satisfied'

ratingsContainer.addEventListener('click', (e) => {
    //如果触发事件的元素 的父元素 存在类rating 且 我还有下一个兄弟元素 就是非最后一个元素的意思
    if (e.target.parentNode.classList.contains('rating') && e.target.nextElementSibling) {
        removeActive()//移除所有rating元素上的active元素
        e.target.parentNode.classList.add('active')//给当前rating添加active元素
        selectedRating = e.target.nextElementSibling.innerHTML//将选择的值修改
        //否则如果存在active且 前一个兄弟元素存在 且前一个元素为img  
        //previousSibling 属性可返回某节点之前紧跟的节点（处于同一树层级）
    } else if (
        e.target.parentNode.classList.contains('rating') &&
        e.target.previousSibling &&
        e.target.previousElementSibling.nodeName === 'IMG'
    ) {
        removeActive()
        e.target.parentNode.classList.add('active')
        selectedRating = e.target.innerHTML
    }

})

sendBtn.addEventListener('click', (e) => {
    panel.innerHTML = `
        <i class="fas fa-heart"></i>
        <strong>Thank You!</strong>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support</p>
    `
})

function removeActive() {
    for (let i = 0; i < ratings.length; i++) {
        ratings[i].classList.remove('active')
    }
}


/**
 * nextSibling 属性返回元素节点之后的兄弟节点（包括文本节点、注释节点）；
nextElementSibling 属性只返回元素节点之后的兄弟元素节点（不包括文本节点、注释节点）；
 */

/**
 * previousSibling 属性与 previousElementSibling 属性的差别：

previousSibling 属性返回元素节点之前的兄弟节点（包括文本节点、注释节点）；
previousElementSibling 属性只返回元素节点之前的兄弟元素节点（不包括文本节点、注释节点）；
 */