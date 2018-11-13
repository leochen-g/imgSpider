const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const ctr = require('./main/index')

app.set('trust proxy','loopback')
app.all('*',function (req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","POST,GET");
  res.header("X-Powered-By",' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
})
//设置解析数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
//定位首页
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendfile(`${__dirname}/public/index.html`)
})
function isEmpty(body) {
  for (i in body){
	if(body[i]==''||body[i]==undefined||body==null)
	  return true
  }
  return false
}
function filter(req,res,callback) {
  if(isEmpty(req.body)||isEmpty(req.query)){
	res.json({head: {code: 10000, msg: '请输入url信息'}, data: {}})
  }else {
   callback(req.body,res)
  }
}
//采集图片
app.post('/api/getImg',(req,res) => {
  filter(req,res,ctr.getImg)
})
//下载图片
app.get('/api/download',(req,res) => {
  ctr.tarTool(req.query,res)
  // filter(req,res,ctr.tarTool)
})
app.listen(5000, () => console.log('imgSpider listening on port 5000!'))
