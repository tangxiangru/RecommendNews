from sqlalchemy import *
from sqlalchemy.orm import *
from zhihu_oauth import ZhihuClient
from zhihu_oauth.zhcls.activity import ActType

client = ZhihuClient()
client.load_token('token.pkl')
engine = create_engine('sqlite:///./sqlalchemy.db', echo=True)
metadata = MetaData(engine)

user_table = Table('users', metadata, \
