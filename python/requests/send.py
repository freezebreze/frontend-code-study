import requests


class send:
    def getSeesion(self):
        return requests.Session()

    def getBaidu(self):
        session = self.getSeesion()
        params = {
            'id' : 1,
            'name' : 'ruansheng',
        }
        r = session.get('http://drawbook.com/api/v1/address/test', params = params)
        print(r.url)

if __name__ == '__main__':
    a = send()
    a.getBaidu()