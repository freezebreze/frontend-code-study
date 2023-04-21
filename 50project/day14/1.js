const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')

fill.addEventListener('dragstart', dragStart)
fill.addEventListener('dragend', dragEnd)

for(const empty of empties) {
    //给每个元素添加事件监听
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

//dragstart 事件在用户开始拖动元素或被选择的文本时调用。
function dragStart(e) {
    this.className += ' hold' 
    setTimeout(() => this.className = 'invisible', 0)
}
//dragend 事件在拖放操作结束时触发（通过释放鼠标按钮或单击 escape 键）。
function dragEnd() {
    //在当前元素上加上拖拽元素的样式
    this.className = 'fill'
}
//dragover 事件在可拖动的元素或者被选择的文本被拖进一个有效的放置目标时（每几百毫秒）触发。该事件在放置目标上触发。
function dragOver(e) {
    e.preventDefault()
}
//dragenter 事件在可拖动的元素或者被选择的文本进入一个有效的放置目标时触发。
function dragEnter(e) {
    e.preventDefault()
    this.className += ' hovered'
}
//dragleave 事件在拖动的元素或选中的文本离开一个有效的放置目标时被触发。
function dragLeave() {
    this.className = 'empty'
}
//drop 事件在元素或选中的文本被放置在有效的放置目标上时被触发。
function dragDrop() {
    this.className = 'empty'
    this.append(fill)
}

/*
1、dragstart 拖动开始，只触发一次，鼠标变成禁止
2、drag 拖动时连续触发
3、dragenter 拖动进入目标元素时触发，阻止默认事件，可使鼠标变回move
4、dragover 在目标元素内移动触发
5、dragleave 离开目标元素触发
6、dragend 拖动结束触发
7、drop 拖动至目标元素触发
 */