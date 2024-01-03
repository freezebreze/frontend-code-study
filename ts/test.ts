interface User {
  readonly code: number;
  name: string;
  age?: number;
}
const myobj: User = {
  code: 122,
  name: "ruansheng",
};

type ren = {
  name: string;
  age: number;
};
const a: ren = {
  name: "ras",
  age: 18,
};
declare const jQuery: (selector: string) => any;
type MyObject<T> = {
  [key: string]: T;
};

// Case1 = T = number | string
type Case1 = MyObject<number | string>[string];
type MyArrayLike<T> = {
    [key: number]: T;
  };
  // MyArrayLike<string> 的属性有 number
  // 所以可以通过索引签名访问的特性访问到 MyArrayLike<string>[number]
  type Case3 = ArrayLike<string>[number];