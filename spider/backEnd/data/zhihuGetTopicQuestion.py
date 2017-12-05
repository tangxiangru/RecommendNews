# nlp
from __future__ import print_function, unicode_literals

# HTMLParser
import re
pattern = re.compile(r'<.*?>')

# zhihu
from zhihu_oauth import ZhihuClient
import json
import requests

# sqlite3
import sqlite3
conn = sqlite3.connect('zhihuInfomation.db')

conn.execute('''
        CREATE TABLE ANSWER_TABLE
       (A_QUESTION_ID INT     NOT NULL,
        A_ID INT    NOT NULL,
        A_QUESTION_TITLE TEXT NOT NULL,
        A_FEELING      REAL ,
        A_AUTHOR  TEXT NOT NULL,
        A_CONTENT   TEXT  NOT NULL,
        A_UPDATED_TIME TEXT NOT NULL,
        PRIMARY KEY (A_QUESTION_ID,A_ID));
        ''')

conn.execute('''
        CREATE TABLE COMMENTS_TABLE
        (C_QUESTION_ID INT     NOT NULL,
        C_ANSER_ID INT    NOT NULL,
        C_AUTHOR TEXT NOT NULL,
        C_VOTECOUNT TEXT NOT NULL,
        C_CONTENT TEXT NOT NULL,
        C_CREATEDTIME TEXT NOT NULL);
        ''')

conn.execute('''
        CREATE TABLE TOPIC_TABLE
        (T_ID INT PRIMARY KEY NOT NULL,
        T_BEST_ANSWERS_COUNT TEXT NOT NULL,
        T_FOLLOWERS_COUNT TEXT NOT NULL,
        T_QUESTIONS_COUNT TEXT NOT NULL);
        ''')

# posturl
SUMMARY_URL = 'http://api.bosonnlp.com/summary/analysis'
SENTIMENT_URL = 'http://api.bosonnlp.com/sentiment/analysis'

# X-Token
headers = {'X-Token': 'afA7ckHA.7771.3EQV8MutdTWw'}

client = ZhihuClient()
client.load_token('token.pkl')
# replace it  as user input

# topic
internet = client.from_url('https://www.zhihu.com/topic/19550517')
political = client.from_url('https://www.zhihu.com/topic/19551424')
computer = client.from_url('https://www.zhihu.com/topic/19555547')
occupation = client.from_url('https://www.zhihu.com/topic/19552488')
fishing = client.from_url('https://www.zhihu.com/topic/20022251')
society = client.from_url('https://www.zhihu.com/topic/19566933')

# internet

print(internet.id)
print(internet.best_answers_count)
print(internet.followers_count)
print(internet.questions_count)

conn.execute(
            "INSERT INTO TOPIC_TABLE (T_ID, T_BEST_ANSWERS_COUNT, T_FOLLOWERS_COUNT, T_QUESTIONS_COUNT) \
            VALUES ("+str(internet.id)+", "+str(internet.best_answers_count)+", "+str(internet.followers_count)+","+str(internet.questions_count)+" )");
conn.commit()

for answer in internet.best_answers:

    print('internet')
    print(answer.question.title)
    print(answer.author.name)

    re = pattern.sub('', answer.content)
    source = {
        'not_exceed': 0,
        'percentage': 0.2,
        'title': '',
        'content': re
    }
    resp = requests.post(
        SUMMARY_URL,
        headers = headers,
        data = json.dumps(source).encode('utf-8'))



    # what we want!
    print(resp.text)

    data = json.dumps(resp.text)
    respSentiment = requests.post(SENTIMENT_URL, headers=headers, data=data.encode('utf-8'))

    print(respSentiment.text)

    params = (answer.question.id, answer.id, answer.question.title, respSentiment.text, answer.author.name, resp.text, answer.updated_time)

    conn.execute("INSERT INTO ANSWER_TABLE VALUES(?,?,?,?,?,?,?)", params)

    conn.commit()

    for comments in answer.comments:
        print(comments.content)

        print(comments.vote_count)

        params = (answer.question.id, answer.id, comments.author.name, comments.vote_count, comments.content, comments.created_time)
        conn.execute("INSERT INTO COMMENTS_TABLE VALUES(?,?,?,?,?,?)", params)
        conn.commit()

# political
print(political.id)
print(political.best_answers_count)
print(political.followers_count)
print(political.questions_count)

conn.execute(
            "INSERT INTO TOPIC_TABLE (T_ID, T_BEST_ANSWERS_COUNT, T_FOLLOWERS_COUNT, T_QUESTIONS_COUNT) \
            VALUES ("+str(political.id)+", "+str(political.best_answers_count)+", "+str(political.followers_count)+","+str(political.questions_count)+" )");
conn.commit()

for answer in political.best_answers:

    print('political')
    print(answer.question.title)
    print(answer.author.name)
    print(answer.content)
    re = pattern.sub('', answer.content)
    source = {
        'not_exceed': 0,
        'percentage': 0.2,
        'title': '',
        'content': re
    }
    resp = requests.post(
        SUMMARY_URL,
        headers = headers,
        data = json.dumps(source).encode('utf-8'))


    # what we want!
    print(resp.text)

    data = json.dumps(resp.text)
    respSentiment = requests.post(SENTIMENT_URL, headers=headers, data=data.encode('utf-8'))

    print(respSentiment.text)

    params = (answer.question.id, answer.id, answer.question.title, respSentiment.text, answer.author.name, resp.text, answer.updated_time)

    conn.execute("INSERT INTO ANSWER_TABLE VALUES(?,?,?,?,?,?,?)", params)

    conn.commit()

    for comments in answer.comments:
        print(comments.content)

        print(comments.vote_count)

        params = (answer.question.id, answer.id, comments.author.name, comments.vote_count, comments.content, comments.created_time)
        conn.execute("INSERT INTO COMMENTS_TABLE VALUES(?,?,?,?,?,?)", params)
        conn.commit()
# computer

print(computer.id)
print(computer.best_answers_count)
print(computer.followers_count)
print(computer.questions_count)

conn.execute(
            "INSERT INTO TOPIC_TABLE (T_ID, T_BEST_ANSWERS_COUNT, T_FOLLOWERS_COUNT, T_QUESTIONS_COUNT) \
            VALUES ("+str(computer.id)+", "+str(computer.best_answers_count)+", "+str(computer.followers_count)+","+str(computer.questions_count)+" )");
conn.commit()

for answer in computer.best_answers:

    print('computer')
    print(answer.question.title)
    print(answer.author.name)

    re = pattern.sub('', answer.content)
    source = {
        'not_exceed': 0,
        'percentage': 0.2,
        'title': '',
        'content': re
    }
    resp = requests.post(
        SUMMARY_URL,
        headers = headers,
        data = json.dumps(source).encode('utf-8'))



    # what we want!
    print(resp.text)

    data = json.dumps(resp.text)
    respSentiment = requests.post(SENTIMENT_URL, headers=headers, data=data.encode('utf-8'))

    print(respSentiment.text)

    params = (answer.question.id, answer.id, answer.question.title, respSentiment.text, answer.author.name, resp.text, answer.updated_time)

    conn.execute("INSERT INTO ANSWER_TABLE VALUES(?,?,?,?,?,?,?)", params)

    conn.commit()

    for comments in answer.comments:
        print(comments.content)

        print(comments.vote_count)

        params = (answer.question.id, answer.id, comments.author.name, comments.vote_count, comments.content, comments.created_time)
        conn.execute("INSERT INTO COMMENTS_TABLE VALUES(?,?,?,?,?,?)", params)
        conn.commit()

# occupation

print(occupation.id)
print(occupation.best_answers_count)
print(occupation.followers_count)
print(occupation.questions_count)

conn.execute(
            "INSERT INTO TOPIC_TABLE (T_ID, T_BEST_ANSWERS_COUNT, T_FOLLOWERS_COUNT, T_QUESTIONS_COUNT) \
            VALUES ("+str(occupation.id)+", "+str(occupation.best_answers_count)+", "+str(occupation.followers_count)+","+str(occupation.questions_count)+" )");
conn.commit()

for answer in occupation.best_answers:

    print('occupation')
    print(answer.question.title)
    print(answer.author.name)

    re = pattern.sub('', answer.content)
    source = {
        'not_exceed': 0,
        'percentage': 0.2,
        'title': '',
        'content': re
    }
    resp = requests.post(
        SUMMARY_URL,
        headers = headers,
        data = json.dumps(source).encode('utf-8'))



    # what we want!
    print(resp.text)

    data = json.dumps(resp.text)
    respSentiment = requests.post(SENTIMENT_URL, headers=headers, data=data.encode('utf-8'))

    print(respSentiment.text)

    params = (answer.question.id, answer.id, answer.question.title, respSentiment.text, answer.author.name, resp.text, answer.updated_time)

    conn.execute("INSERT INTO ANSWER_TABLE VALUES(?,?,?,?,?,?,?)", params)

    conn.commit()

    for comments in answer.comments:
        print(comments.content)

        print(comments.vote_count)

        params = (answer.question.id, answer.id, comments.author.name, comments.vote_count, comments.content, comments.created_time)
        conn.execute("INSERT INTO COMMENTS_TABLE VALUES(?,?,?,?,?,?)", params)
        conn.commit()

# fishing

print(fishing.id)
print(fishing.best_answers_count)
print(fishing.followers_count)
print(fishing.questions_count)

conn.execute(
            "INSERT INTO TOPIC_TABLE (T_ID, T_BEST_ANSWERS_COUNT, T_FOLLOWERS_COUNT, T_QUESTIONS_COUNT) \
            VALUES ("+str(fishing.id)+", "+str(fishing.best_answers_count)+", "+str(fishing.followers_count)+","+str(fishing.questions_count)+" )");
conn.commit()

for answer in fishing.best_answers:

    print('fishing')
    print(answer.question.title)
    print(answer.author.name)

    re = pattern.sub('', answer.content)
    source = {
        'not_exceed': 0,
        'percentage': 0.2,
        'title': '',
        'content': re
    }
    resp = requests.post(
        SUMMARY_URL,
        headers = headers,
        data = json.dumps(source).encode('utf-8'))



    # what we want!
    print(resp.text)

    data = json.dumps(resp.text)
    respSentiment = requests.post(SENTIMENT_URL, headers=headers, data=data.encode('utf-8'))

    print(respSentiment.text)

    params = (answer.question.id, answer.id, answer.question.title, respSentiment.text, answer.author.name, resp.text, answer.updated_time)

    conn.execute("INSERT INTO ANSWER_TABLE VALUES(?,?,?,?,?,?,?)", params)

    conn.commit()

    for comments in answer.comments:
        print(comments.content)

        print(comments.vote_count)

        params = (answer.question.id, answer.id, comments.author.name, comments.vote_count, comments.content, comments.created_time)
        conn.execute("INSERT INTO COMMENTS_TABLE VALUES(?,?,?,?,?,?)", params)
        conn.commit()

# society

print(society.id)
print(society.best_answers_count)
print(society.followers_count)
print(society.questions_count)

conn.execute(
            "INSERT INTO TOPIC_TABLE (T_ID, T_BEST_ANSWERS_COUNT, T_FOLLOWERS_COUNT, T_QUESTIONS_COUNT) \
            VALUES ("+str(society.id)+", "+str(society.best_answers_count)+", "+str(society.followers_count)+","+str(society.questions_count)+" )");
conn.commit()

for answer in society.best_answers:

    print('society')
    print(answer.question.title)
    print(answer.author.name)

    re = pattern.sub('', answer.content)
    source = {
        'not_exceed': 0,
        'percentage': 0.2,
        'title': '',
        'content': re
    }
    resp = requests.post(
        SUMMARY_URL,
        headers = headers,
        data = json.dumps(source).encode('utf-8'))



    # what we want!
    print(resp.text)

    data = json.dumps(resp.text)
    respSentiment = requests.post(SENTIMENT_URL, headers=headers, data=data.encode('utf-8'))

    print(respSentiment.text)

    params = (answer.question.id, answer.id, answer.question.title, respSentiment.text, answer.author.name, resp.text, answer.updated_time)

    conn.execute("INSERT INTO ANSWER_TABLE VALUES(?,?,?,?,?,?,?)", params)

    conn.commit()

    for comments in answer.comments:
        print(comments.content)

        print(comments.vote_count)

        params = (answer.question.id, answer.id, comments.author.name, comments.vote_count, comments.content, comments.created_time)
        conn.execute("INSERT INTO COMMENTS_TABLE VALUES(?,?,?,?,?,?)", params)
        conn.commit()
