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

//前序  后序可以把结果反转
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param root TreeNode
 */
preorderTraversal = (root) => {
    const res = []
    const stk = [root]
    while (stk.length) {
        const node = stk.pop()
        if (node != null) {
            res.push(node.val)
            stk.push(node.right, node.left)
        }
    }
    return res
}
//中序
var inorderTraversal = function (root) {
    const res = [];
    const stk = [];
    while (root || stk.length) {
        while (root) {
            stk.push(root);
            root = root.left;
        }
        root = stk.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
};