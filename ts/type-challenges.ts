//实现内置returntype
type myReturn<T> = T extends (...arg: any[]) => infer r ? r : never;
let somePerson: myReturn<() => { name: string; age: number }>;
let valueofreturn: myReturn<string>;
//实现内置omit
type myOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = myOmit<Todo, "description">;
