try:
    fh = open('123123')
    try:
        fh.write('123123')
    finally:
        print('关闭文件')
        fh.close()
except:
    IOError
    print('error io error')
#老实说 python这缩进我也是醉了 不要{} 真的垃圾