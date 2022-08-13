import pymysql
db = pymysql.connect(
    host='127.0.0.1',
    port=3306,
    user='root',
    password='root',
    database='wennuanka',
    charset='utf8mb4'
)


def key_value(detail):
    "构造数据库字段名和值的字典"
    key_value = {}
    for item in detail:
        for index in range(len(item)):
            if (index == 0):
                key_value[item[index]] = ''
                break
    return key_value


def dict_fmt(data, key_value):
    "为字典赋值"
    maxIndex = len(data)
    nowIndex = 0
    for it in key_value:
        if (nowIndex < maxIndex):
            key_value[it] = data[nowIndex]
            nowIndex += 1
    return key_value


try:
    with db.cursor() as cursor:
        list_data = []
        limit = 10
        sql = 'select * from you table name ' + str(limit)
        count = cursor.execute(sql)
        row = cursor.fetchall()
        detail = cursor.description
        # 先生成字典
        key_value = key_value(detail)
        for item in row:
            copy_key_value = key_value.copy()
            fmt_value = dict_fmt(item, copy_key_value)
            list_data.append(fmt_value)
        print(list_data)
except pymysql.MySQLError as err:
    print(type(err), err)
finally:
    # 5. 关闭连接释放资源
    db.close()