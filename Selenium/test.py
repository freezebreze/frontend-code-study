from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# msedgedriver.exe下载后放到浏览器的目录下
driver = webdriver.Edge("C:\Program Files (x86)\Microsoft\Edge\Application\msedgedriver.exe")
driver.get("http://baidu.com")
assert "百度一下，你就知道" in driver.title
elem = driver.find_element_by_name("q")
elem.send_keys("pycon")
elem.send_keys(Keys.RETURN)
assert "No results found." not in driver.page_source
driver.quit()
