function add(value: string, other: string): string {
  let length = Math.max(value.length, other.length);
  value = value.padStart(length, "0");
  other = other.padStart(length, "0");
  let result = ""; //结果
  let c = 0; //进位
  for (let i = length - 1; i >= 0; i--) {
    let t = parseInt(value[i]) + parseInt(other[i]) + c;
    //取进位
    c = Math.floor(t / 10);
    //取余数
    t = t % 10;
    result = t + result;
  }
  if (c === 1) {
    result = "1" + result;
  }
  return result;
}
