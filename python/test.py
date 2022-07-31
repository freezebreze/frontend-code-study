#数据类型
# python 数字
var1 = 1;
var2 = 2;
# del语句可以删除变量的引用
del var1;
del var2;
# 字符串
s = '123123213';
s[0:1];#输出1字符  [头下标:尾下标] 可以看作是截取字符串 头小标 到尾下标的字符 但不包括尾下标
s[0];# output 1
s[1]; #  2
#步长截取  从0开始  取到下标为6  隔2个取值  
s[0:6:2]; #output 132
s+ 'aaa'#链接字符串 
(s+ 'aaa') * 2 #链接字符串操作*2   output 123123213aaa123123213aaa
# 列表?数组？ [] 标识
list = ['rs', 18 ,'zwy', 17]
#操作和上面字符串类似 可嵌套

#元组 () 标识 只能读 不能二次赋值  不能改值
tuple = ( 'runoob', 786 , 2.23, 'john', 70.2 ) #操作也和上面的类似 tuple[x:y:z]
#字典 key/value  {}对象？有点类似js里的对象了
dict = {}
dict['one'] = 'this is one';
dict[2] = 'this is two';

