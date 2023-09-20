//实现内置returntype
type myReturn<T> = T extends (...arg: any[]) => infer r ? r : never;
let somePerson: myReturn<() => { name: string; age: number }>;
let valueofreturn: myReturn<string>;
