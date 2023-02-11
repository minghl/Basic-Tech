// 引入jwt
const jwt = require("jsonwebtoken")

// 创建一个对象
const obj = {
    name: "swk",
    age: 18,
    gender: "男"
}

// 使用jwt来对json数据进行加密
const token = jwt.sign(obj, "secretekey", {
    expiresIn: "1h"
})

try {
    // 服务器收到客户端的token后
    const decodeData = jwt.verify(token, "secretekey")
    console.log(decodeData);
} catch (e) {
    // 说明token解码无效，说明token
    console.log("无效的token");
}