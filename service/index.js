const express = require("express")
const request = require("request")
const sha1 = require("sha1")
const app = express()
// const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(8000, ()=>{console.log("启动8000端口");})


let appId = "wx91edd816a7d93e2e"; //小程序ID
let AppSecret = "fe685d00af80e92273ed3468b5106563"; //小程序密钥

app.post("/login/user", async (req,res)=>{
    let {code, rawData} = req.body;
    console.log(code);
    if(code){
        await request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`, (err, resObj, body)=>{
            body = JSON.parse(body);
            console.log(body);
            // console.log("加密值：",  sha1(rawData+body.session_key));
            let  token = sha1(rawData+body.session_key);
            res.send({
                msg:{
                    token
                },
                status:200
            })
        })
    }else{
        res.send({
            msg:"你没传code",
            status:400
        })
    }
})

// sha加密/解密
// 发起请求
// 存储到数据库

/* 
 1. 监听前端的请求，接收code
 2. 发起请求，提交数据，获取session_key / openid
 3. 加密处理，生成token
 4. openid / token存储到数据库
 5. 把token返回给前端
*/