interface User {
    readonly code: number;
    name: string;
    age?: number;
}
const myobj: User = {
    code: 122,
    name: 'ruansheng'
}

type ren = {
    name: string;
    age: number
}
const a: ren = {
    name: 'ras',
    age: 18,
}