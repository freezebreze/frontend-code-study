let array = [4, 5, 8, 9, 1, 0, 3, 2, 7, 6]
let quickarr = [2, 3, 1, 4, 8, 7, 9, 6]

/**
 * 快速排序
 * @param {*} array 
 * @param {*} begin 
 * @param {*} end 
 */
function quickSort(arr, begin, end) {
    if (begin < end) {
        let i = begin;
        let j = end;
        let empty = arr[begin];
        while (i < j) {
            while (arr[j] > empty && i < j) {
                j--;
            }
            arr[i] = arr[j];
            while (arr[i] < empty && i < j) {
                i++;
            }
            arr[j] = arr[i];
        }
        arr[i] = empty;
        sort(arr, begin, i - 1);
        sort(arr, i + 1, end);
    } else {
        return;
    }
}




/**
 * 冒泡排序
 */
function bubSort(array) {
    const len = array.length
    for (let i = 0; i < len - 1; i++) {
        let done = true
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
            }
            done = false
        }
        if (done) {
            break
        }
    }
    return array
}

// console.log(`冒泡排序: ${bubSort(array)}`)

//立即执行函数的使用
// for (var i = 0; i < 10; i++) {
//     (function (j) {
//         setTimeout(() => {
//             console.log(j)
//         }, 10);
//     })(i)
// }