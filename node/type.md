# 记录ts中一些内置类型的学习

官方定义的内置类型  

```typescript
type Exclude<T, U> = T extends U ? never : T;
```

这里注意一些细节  类似官方示例

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">;
```

这里T0的类型会过滤掉a 返回 b | c ，因为extends 在用于泛型的时候， 在条件表达式里，如果是个联合类型会用分配律一个一个去判断，然后推导出的类型返回给类型

这里 a extends a? 是联合类型  所以返回never 又因为never  会被过滤掉，最后只返回了 bc


数组转联合类型用 [number] 作为下标 对象则是用 [keyof T] 作为下标