//实现内置returntype
type myReturn<T extends Function> = T extends (...arg: any) => infer r
  ? r
  : never;
let somePerson: myReturn<() => { name: string; age: number }>;
//实现内置omit
type myOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt?: number;
}
type TodoPreview = myOmit<Todo, "description">;
type myPartial<T> = {
  [k in keyof T]?: T[k];
};
type myRequired<T> = {
  [k in keyof T]-?: T[k];
};
type requiredTodo = myRequired<Todo>;
type Ptodo = myPartial<Todo>;
type myExclude<T, U> = T extends U ? never : T;
type myPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type picktodo = myPick<Todo, "description">;
type myReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
type ReadonlyTodo = myReadonly<Todo>;
type myRecord<K extends keyof any, T> = {
  [P in K]: T;
};
type todoKey = "title" | "description" | "completed" | "createdAt";
type myTodoRecord = myRecord<todoKey, string>;

type myExtract<T, U> = T extends U ? T : never;
type ExtractTodo = myExtract<keyof Todo, "title">;
type ExcludeTodo = myExclude<keyof Todo, "title">;
type myNonNullable<T> = T & {}; //{}包括了除 null undefined  和泛型取交集 就可以排除null undefined
type nonull = myNonNullable<undefined | null | "a">;
//实现内置Parameters
type myParameters<T extends (...args: any) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never;
declare function f1(arg: { a: number; b: string }): void;
type T1 = myParameters<(a: number) => any>;
type T3 = Parameters<typeof f1>;
let t3Value: T3 = [{ a: 1, b: "hello" }];

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type person = (typeof tuple)[number];
type TupleToObject<T extends PropertyKey[]> = {
  [P in T[number]]: P;
};
type Flatten<T> = T extends any[] ? T[number] : T;
type Features = {
  [n: number]: unknown;
  darkMode: () => void;
  newUserProfile: () => void;
};
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never;
