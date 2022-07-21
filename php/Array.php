<?php


$data = [
    0 => [
        'id' => 1,
        'pid' => 0,
        'level' => 1,
    ],
    1 => [
        'id' => 2,
        'pid' => 1,
        'level' => 2,
    ],
    2 => [
        'id' => 3,
        'pid' => 1,
        'level' => 2,
    ],
    3 => [
        'id' => 4,
        'pid' => 2,
        'level' => 3,
    ],
];
/**
 * 将数组数组处理为树形数据
 * @param Array $data 
 * @param intger $id 
 * @param String $idField 
 * @param String $pidField 
 * @param String $child 
 * @return Array
 */

echo json_encode(itemMerge($data, 0));
function itemMerge($data, $pid = 0, $idField = "id", $pidField = 'pid', $child = 'children')
{
    

    // //存储最后处理完的数据
    // $tree = [];
    // //临时数组
    // $map = [];

    // //先遍历一遍数据 因为要改变$data的数据所以要 &引用 不然会修改无效 
    foreach ($data as &$v) {
        //每一项加上child key
        $v[$child] = [];
        //以每一项的id key为 下标 创建关联数组 用于后面比对key 指
        $map[$v[$idField]] = &$v;
    }

    foreach ($data as &$vo) {
        // 当前项的上级id 为key 取值 这里一定要&引用 不然无法修改顶层结点的值 
        // 例如id = 1 的项 已经被推入 ￥tree里  这里循环到id=2的项 pid =1 取到引用的值就是第一项
        // 父节点存在 把值推进它的 $child key 里 这样就会同步修改到刚才推入$tree里的 第一项 因为&引用 他们指向的都是同一块内存
        $parent = &$map[$vo[$pidField]];
        //如果上级存在 那么就把 当前项推入上级的child key 数组
        if ($parent) {
            $parent[$child][] = &$vo;
        } else {
            //如果顶级节点的值 等于 当前项的pid的值 证明该项是顶级项 推入tree数组  $tree[]= &$vo这种形式 = array.push($tree, &$vo)
            $pid == $vo[$pidField] && $tree[] = &$vo;
            // if ($pid == $vo[$pidField]) {
            //     $tree[] = &$vo;
            // }
        }
    }
    //释放内存 如果没有引用的情况下会释放
    unset($items, $map);
    return $tree;

}
?>