# 运算符
a = 10
b = 2
d = 2

c = a + b
print(c)
c = a - b
print(c)
c = a / b
print(c)
c = a * b
print(c)
c = a % b
print(c)
c = b ** d  # b的d次幂
print(c)
c = a // 3
print(c)
# 12
# 8
# 5.0
# 20
# 0
# 4
# 3
# 比较运算符  > < >= <= != ==  基本和js php 一致
# 赋值运算符 基本也一致  多出来的是 **= //=
c **= d  # c = c**d   3**2 = 9
print(c)

# 成员运算符
a = 10
b = 20
list = [1, 2, 3, 4, 5]
if (a in list):
    print('1')
else:
    print('2')

if (b not in list):print(3)