const text = document.getElementById('text');
const str = 'hello world! how are you?';
const ipt = document.getElementsByTagName('input')[0];
let idx = 1
let speed = 300 / ipt.value
console.log(speed);
add();
function add() {
    text.innerText = str.slice(0, idx);
    idx++;
    if (idx > str.length) {
        idx = 1;
    }
    setTimeout(add, speed)
}

ipt.addEventListener('input', (e) => {
    speed = 300 / e.target.value;
    console.log(speed);
});
//这种方式不能改变速度 因为一开始就已经设定好的
// function add2() {
//     text.innerText = str.slice(0, idx);
//     idx++;
//     if (idx > str.length) {
//         idx = 1;
//     }
//     // setTimeout(add, speed)
// }
// setInterval(add2, speed);