import time
from datetime import datetime
from zhihu_oauth import ZhihuClient
from zhihu_oauth.zhcls.activity import ActType

client = ZhihuClient()
client.load_token('token.pkl')
# replace it as the user input
user = client.people('edward-fu-91')

print('name', user.name)
print('headline', user.headline)
print('description', user.description)

for act in user.activities:
    if act.type == ActType.CREATE_ANSWER:
        time = datetime.now()
        print(time.ctime())
        print(act.target.created_time)
