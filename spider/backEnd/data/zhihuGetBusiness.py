from zhihu_oauth import ZhihuClient

client = ZhihuClient()
client.load_token('token.pkl')
# replace it  as user input
user = client.people('SakuraNekoq')

# Obtain the mapping
print('business', user.business.name)
print('locations', user.locations[0].name)
