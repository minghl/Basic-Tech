# Rest

## 01MVC

Model Views Controller（前后端不分离模式）

我们之前编写的服务器都是传统的服务器，服务器的结构是基于MVC模式
	Model -- 数据模型
	View -- 视图，用来呈现
	Controller -- 控制器，复杂加载数据并选择视图来呈现数据
	- 传统服务器是直接为客户端返回一个页面
	- 但传统服务器并不能适用于现在的应用场景

现在的应用场景，一个应用通常都会有多个客户端（client）存在
	web端 移动端（app）pc端
	如果服务器直接返回html页面，那么服务器只能为web端提供服务
		其他类型的客户端还需要单独开发服务器，这样就提高了开发和维护的成本

如何解决这个问题？
	- 传统服务器需要做两件事情，第一个加载数据，第二个要将模型渲染进视图
 - 解决方案将渲染视图的功能从服务器中剥离出来
   - 服务器只负责向客户端返回数据，渲染视图的功能由客户端自行完成。
 - 分离以后，服务器只提供数据，一个服务器可以同时为多种客户端提供服务器
   - 同时将视图渲染的工作交给客户端以后，简化了服务器代码的编写

## 02Rest

- REpresentational State Transfer
- 表示层状态的传输
- Rest实际上就是一种服务器的设计风格
- 他的主要特点就是，服务器只返回数据
- 服务器和客户端传输数据时通常会使用JSON作为数据格式
- 请求的方法：（写路由时用这些方法）
  - GET ：加载数据
  - POST ：新建或添加数据
  - PUT ：添加或修改数据
  - PATCH ：修改数据
  - DELETE ：删除数据
  - OPTION ：由浏览器自动发送，检查请求的一些权限
- API（接口）Endpoint（端点）
  - GET /user
  - POST /user
  - DELETE /user/:id

## 03api增删改查

postman
	这是一个软件，通过它可以帮助向服务器发送各种请求
		帮助我们测试API

1. 增

```js
app.post("/students", (req, res) => {
    console.log("收到students的post请求", req.body);
    // 获取学生信息
    const { name, age, gender, address } = req.body
        // 创建学生信息
    const stu = {
            id: +STU_ARR.at(-1).id + 1 + "",
            name,
            age,
            gender,
            address
        }
        // 将学生信息添加到数组
    STU_ARR.push(stu)

    // 添加成功
    res.send({
        status: "ok",
        data: stu
    })
})
```

2. 删

```js
// 定义一个删除学生的路由
app.delete("/students/:id", (req, res) => {
    // 获取学生id
    const id = req.params.id

    // 遍历数组
    for (let i = 0; i < STU_ARR.length; i++) {
        if (STU_ARR[i].id === id) {
            const delStu = STU_ARR[i]
            STU_ARR.splice(i, 1)
                // 数据已经删除成功
            res.send({
                status: "ok",
                data: delStu
            })
            return
        }
    }

    // 如果执行到这里，说明学生不存在
    res.status(403).send({
        status: "error",
        data: "学生id不存在"
    })
})
```

3. 改

```js
// 定义一个修改学生的路由
app.put("/students", (req, res) => {
    // 获取数据
    const { id, name, age, gender, address } = req.body

    // 根据id查询学生
    const updateStu = STU_ARR.find(item => item.id === id)

    if (updateStu) {
        updateStu.name = name
        updateStu.age = age
        updateStu.gender = gender
        updateStu.address = address

        res.send({
            status: "ok",
            data: updateStu
        })
    } else {
        res.status(403).send({
            status: "error",
            data: "学生id不存在"
        })
    }
})
```

4. 查

```js
app.get("/students", (req, res) => {
    console.log("收到students的get请求");
    // 返回学生信息
    res.send({
        status: "ok",
        data: STU_ARR
    })
})
```

# AJAX

客户端和服务器不会放在一起，一般会放在两个服务器里。

在js中向服务器发送的请求加载数据的技术叫AJAX

AJAX
	A 异步 J Javascript A 和 X xml
	异步的js和xml
	它的作用就是通过js向服务器发送请求来加载数据
	xml是早期AJAX使用的数据格式
		<student><name>孙悟空</name></student>
	目前数据格式都使用json
		{"name":"孙悟空"}
	可以选择的方案：
		1 XMLHTTPRequest（xhr）
		2 Fetch
		3 Axios

## 01xhr

- CORS(跨域资源共享)

  - 跨域请求

    - 如果两个网站的完整的域名不相同
      - a：http://haha.com
      - b：http://heihei.com
    - 跨域需要检查三个东西
      - 协议 域名 端口号
      - 三个只要有一个不同，就算跨域
    - 当我们通过AJAX去发送跨域请求时，
      - 浏览器为了服务器的安全，会阻止JS读取到服务器的数据

  - 解决方案

    - 在服务器中设置一个允许跨域的头 Access-Control-Allow-Origin

      - 允许哪些客户端访问我们的服务器

      - 在api里面设置中间件

        ```js
        app.use((req, res) => {
            // 设置相应头
            res.setHeader("Access-Control-Allow-Origin", "*") // * 表示谁都行
            res.setHeader("Access-Control-Allow-Methods", "GET,POST") // * 表示谁都行
            res.setHeader("Access-Control-Allow-Headers", "Content-type") // * 表示谁都行
                // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500") // * 表示谁都行
                // Access-Control-Allow-Origin 设置的指定值时只能设置一个
                // Access-Control-Allow-Methods 允许的请求的方式
                // Access-Control-Allow-Headers 允许传递的请求头
          	next()
        })
        ```

- xhr方法逻辑

  ```js
  const xhr = new XMLHttpRequest()
  xhr.open("get", "http://localhost:3000/students")
  xhr.send()
  xhr.onload = function() {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.response)
    }
  }
  ```

## 02fetch

- Fetch是xhr升级版，采用的是Promise API
- 作用和AJAX是一样的，但是使用起来更加友好
- fetch原生js就支持的一种ajax请求的方式
- fetch逻辑:普通GET

```js
 btn.onclick = () => { // 
            fetch("http://localhost:3000/students")
                .then(res => {
                    if (res.status === 200) {
                        // res.json() 可以用来读取json格式的数据
                        return res.json();
                    } else {
                        throw new Error("加载失败！")
                    }
                })
                .then(res => {
                    // 获取到数据后，将数据渲染到页面中
              		if (res.status === 'ok') {
                    console.log(res.data)
                  }
            		}
               	.catch(err=>{
                     console.log("出错了", err);
                })
        }
```

- fetch逻辑: 其他方法及配置

```js
btn2.onclick = () => { // POST 设置第二个参数的method
            fetch("http://localhost:3000/students", {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                // 通过body去发送数据时，必须通过请求头来指定数据的类型
                body: JSON.stringify({
                    name: "白骨精",
                    age: 16,
                    gender: "女",
                    address: "白骨洞"
                })
            })
        }
```

### 01登录功能

- 取消默认提交
  - button的type改成button，而不是submit就不会跳转
  - 或者在函数里面取消默认行为 e.preventDefault()

```js
loginBtn.onclick = () => {
            // 获取用户输入的用户名和密码
            // e.preventDefault()
            const username = document.getElementById("username").value.trim()
            const password = document.getElementById("password").value.trim()

            // 用fetch发送请求来完成登录
            fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                })
                .then((res) => res.json())
                .then((res) => 
                      if(res.status !== "ok"){
              					throw new Error('登录失败')
            }
                      console.log(res)) // 登录成功
                .catch((err) => {
                    console.log("出错了", err) // 登录失败
                })
        }
```

### 02本地存储

- cookie服务器创建浏览器存储（rest风格不使用cookie，因为跨域，配置很复杂）
- session不能用。session是基于cookie的
- 登录成功后，需要保持用户的登录的状态，需要将用户的信息存储到某个地方。需要将用户信息存储到本地。
- 所谓的本地存储就是指浏览器自身的存储空间，可以将用户的数据存储到浏览器内部。
  - sessionStorage中存储的数据 页面一关闭就会丢失
  - localStorage存储的时间比较长
    - setItem('name','value')用来存储数据
    - getItem()获取数据
    - removeItem()删除数据
    - clear()清空数据
  - localStorage存在两个问题
    - 主要存在两个问题：
      - 数据安全问题
      - 服务器不知道你有没有登录

### 03Token

- 解决问题

  - 如何告诉服务器客户端的登录状态
    - rest风格的服务器是无状态的服务器，所以不要在服务器中存储用户的数据（别用session）
    - 服务器中不能存储用户信息，可以将用户信息发送给客户端保存
      - {id:"xxx",username:"xxx",email:"xxx"}
      - 客户端每次访问服务器时，直接将用户信息发回，服务器就可以根据用户信息来识别用户的身份
    - 但是如果将数据直接发送给客户端，同样会有数据安全问题。
      - 所以我们必须对数据进行加密，加密以后再发送给客户端保存，这样即可避免数据的泄漏
    - 在node中可以直接使用jsonwebtoken这个包来对数据进行加密
      - jwt --> 通过对json加密后，生成一个web令牌
    - 使用步骤：(服务器中使用)
      - 安装：
        - npm add jsonwebtoken
      - 引入
      - ...

  ```js
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
      expiresIn: "1"
  })
  
  try {
      // 服务器收到客户端的token后
      const decodeData = jwt.verify(token, "secretekey")
      console.log(decodeData);
  } catch (e) {
      // 说明token解码无效，说明token
      console.log("无效的token");
  }
  ```

  - 验证客户端传来的token

  ```js
  app.get("/students", (req, res) => {
      // 对token进行解码
      try {
          // 这个路由必须在用户登录后才能访问
          // 需要检查用户是否登录
          // 读取请求头
          const token = req.get("Authorization").split(" ")[1]
          const decodeToken = jwt.verify(token, "secretekey")
          // 解码成功，token有效
          // 返回学生信息
          res.send({
              status: "ok",
              data: STU_ARR
          })
      } catch (e) {
          // 解码错误，用户token无效
          res.status(403).send({
              status: "error",
              data: "token无效"
          })
      }
  })
  ```

  - 前端获取token，并发送token给服务器作为请求头来验证

    ```js
    fetch("http://localhost:3000/login", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                username,
                                password
                            })
                        })
                        .then((res) => res.json())
                        .then((res) => {
                                if (res.status !== 'ok') {
                                    throw new Error("用户名或密码错误")
                                }
                                // 登录成功后，需要保持用户的登录的状态，需要将用户的信息存储到某个地方
                                // 需要将用户信息存储到本地
                                // 登录成功，向本地存储中插入用户信息
                                localStorage.setItem("token", res.data.token)
                                localStorage.setItem("nickname", res.data.nickname)
     }
                              
                              
    // 当我们访问的是需要权限的api时，必须要在请求种附加权限的信息
    // token一般都是通过请求头来发送
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/students", {
                        headers: {
                            // "Bearer xxxxx" 权限认证技术方案
                            "Authorization": `Bearer ${token}`
                        }
                    }).then()
    ```

    

### 04fetch其他知识点

- AbortController 终止控制器

  ```js
  let controller
  // 方法一设置sto
  btn01.onclick = () => {
      // 创建一个AbortController
      controller = new AbortController()
          setTimeout(()=>{
               controller.abort()
           }, 3000)
  
      // 终止请求
      // 点击按钮向test发送请求
      fetch("http://localhost:3000/test", {
        // 这里设置signal控制器
              signal: controller.signal
          })
          .then((res) => console.log(res))
          .catch((err) => console.log("出错了", err))
  }
  
  // 方法二设置新按钮
  btn02.onclick = () => {
      controller && controller.abort()
  }
  ```

- Async await修改fetch

  ```js
  btn03.onclick = async() => {
      // fetch("http://localhost:3000/test").then()...
      // 注意：将promise改写为await时，一定要写try-catch
  
      try {
          const res = await fetch("http://localhost:3000/students")
          const data = await res.json()
          console.log(data)
      } catch (e) {
          console.log("出错了", e)
      }
  }
  ```

  

## 03Axios

基于promise，作用于node.js和浏览器中。服务器端使用原生node.js http 模块，在客户端（浏览器）则使用XMLHttpRequest。

- Axios与Fetch的区别
  - 不会设置application/json自动设置
  - 自动转数据结构不用调JSON去转
  - 默认2xx走then，不用自己写
  - 数据放data不是body

```js
axios({
          method: "post",
          url: "http://localhost:3000/students",
          data: {
              name: "唐僧",
              age: 18,
              gender: "男",
              address: "女儿国"
          } // 请求参数
          // data:"name=swk&age=18"
      })
      .then((result) => {
          // result是axios封装过
          console.log(result.data)
      })
      .catch((err) => {
          console.log("出错了！", err)
      })

// fetch
fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then((res) => res.json())
    .then((res) => 
          if(res.status !== "ok"){
            throw new Error('登录失败')
}
          console.log(res)) // 登录成功
    .catch((err) => {
        console.log("出错了", err) // 登录失败
    })
```

### 01axios配置

```js
// axios(config)
axios({
  // baseURL 指定服务器的根目录（路径的前缀）
  baseURL: "http://localhost:3000",
  // 请求地址
  url: "test",

  // 请求方法，默认是get
  method: "get",

  // 指定请求头：默认判断content这个不用设置，autho那个需要设置
  // headers:{"Content-type":"application/json"}

  // 请求体
  // data:"name=唐僧&age=16" //urlencode方式，自动设置contenttype
  data: {
      name: "唐僧",
      age: 18,
      gender: "男",
      address: "女儿国"
  },

  // params 用来指定路径中的查询字符串
  params: {
      id: 1,
      name: "swk"
  },

  //timeout 过期时间
  timeout: 1000,

  // 用来终止请求
  // signal

  // transformRequest 可以用来处理请求数据（data）
  // 它需要一个数组作为参数，数组可以接收多个函数，请求发送时多个函数会按照顺序执行
  // 函数在执行时，会接收到两个参数data和headers
  transformRequest:[function(data, headers){
      // 可以在函数中对data和headers进行修改
      data.name = "猪八戒"
      headers["Content-Type"] = "application/json"
      return data
  }, function(data, headers){
      // 最后一个函数必须返回一个字符串，才能使得数据有效
      return JSON.stringify(data)
  }]

})
.then((result) => {
  // result是axios封装过
  console.log(result.data)
})
.catch((err) => {
  console.log("出错了！", err)
})
```

- 响应数据的结构
- 默认配置

```js
axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
```

### 02axios实例

```js
// axios实例相当于是axios的一个副本，它的功能和axios一样
// axios默认配置在实例也会同样生效
// 但是我们可以单独修改axios实例的默认配置
// 通过修改不同实例的baseURL可以连接不同的端口，从而操作不同命令
const instance = axios.create({
            baseURL: "http://localhost:4000"
        })

        // instance.defaults.baseURL = "xxx"
        document.getElementById("btn1").onclick = () => {
            instance
                .get("students")
                .then((res) => console.log(res.data))
                .catch((err) => {
                    console.log("出错了", err);
                })
        }
```

### 03axios拦截器

类似于中间件

- axios的拦截器可以对请求或响应进行拦截，在请求发送前和响应读取前处理数据

- 添加请求拦截器

  - 进行修改请求头，在请求到达服务器前，进行操作
  - 拦截器只对当前实例有效，对其他的实例没效

  ```js
  // 添加请求拦截器
  axios.interceptors.request.use(
      function (config) {
          // console.log("拦截器执行了")
          // config 表示axios中的配置对象
          // config.data.name = "猪哈哈"
          config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
          // 在发送请求之前做些什么
          return config
      },
      function (error) {
          // 对请求错误做些什么
          return Promise.reject(error)
      }
  )
  ```

- 添加响应拦截器

  ```js
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      return response;
    }, function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  ```

  