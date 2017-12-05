学校项目
## 结构说明

* app                React-Native客户端
* init               Node server端
* spider/ backEnd    Python爬虫

## 运行环境：
* iOS 7+/Android 4.0+
* Python 3.5
* Express.js

## 技术说明

### React Native部分

使用React Native 0.33版本构建。

第三方库依赖：

* react-native-gallery
* react-native-image-picker
* react-native-scrollable-tab-view
* react-native-spinkit

MainController.js主功能界面，ChartWebView.js周报Web展示页，ArticleController.js文章展示页，ImageController.js图片展示页，NewsList.js文章列表，WeeklyReport.js周报列表。

## 部分
### 技术栈
本次的项目中后台使用Node的Express框架，数据库使用了较为方便的Sqlite，而返还给前端的webview页面是使用Echarts制作的数据可视化页面。而获取知乎的数据源使用了7sDream的zhihu-oauth项目。中文语意的处理使用了Bosonnlp的分析接口。

### 具体实现
通过zhihu-oauth抓取知乎评论数据。并将数据通过Bosonnlp处理后放入数据库中。然后通过Express获取数据源，通过接口交给移动端。
前端方面通过Echarts将数据可视化后生成jade渲染传给移动端。
