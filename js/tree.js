//前序 根 左  右  
//中序  左 根  右  
//前序  左  右  根 
// 调整顺序就可以
function TraversalTree(node) {
    //节点为空 退出函数
    if (!node) {
        return
    }

    console.log(node.val)
    TraversalTree(node.left)
    TraversalTree(node.right)
}