# 1.模块化

  CommonJS规范

```
 - 引入模块
     - 使用require("模块的路径")函数来引入模块
     - 引入自定义模块时
       - 模块名要以./ 或 ../开头
       - 扩展名可以省略
         - 在CommonJS中，如果省略的js文件的扩展名
           node，会自动为文件补全扩展名
               ./m1.js 如果没有js 它会寻找 ./m1.json
               js --> json --> node（特殊）
     - 引入核心模块时
       - 直接写核心模块的名字即可
       - 也可以在核心模块前添加 node:

- 所有的CommonJS的模块都会被包装到一个函数中
(function(exports, require, module, __filename, __dirname) { // 模块代码会被放到这里    });
默认情况下，node中的模块化标准是CommonJS

    在定义模块时，模块中的内容默认是不能被外部看到的
        可以通过exports来设置要向外部暴露的内容

    访问exports的方式有两种：
        exports
        module.exports
        - 当我们在其他模块中引入当前模块时，require函数返回的就是exports
        - 可以将希望暴露给外部模块的内容设置为exports的属性
        // 可以通过exports 一个一个的导出值
        // 也可以直接通过module.exports同时导出多个值
// cjs为扩展名，表示是一个CommonJS标准的模块
```

ES6规范

```
要想使用ES的模块化，可以采用以下两种方案
            \1. 使用mjs作为扩展名
            \2. 修改package.json将模块化规范设置为ES模块
                当我们设置 "type": "module" 当前项目下所有的js文件都默认为es module
// 导入m4模块，es模块不能省略扩展名（官方标准）
// import { a, b, c } from "./m4.mjs"
// 通过as来指定别名
// import { a as hello, b, c } from "./m4.mjs"
// 开发时要尽量避免import * 情况
// import * as m4 from "./m4.mjs"
// console.log(m4.c)
// 导入模块的默认导出
// 默认导出的内容，可以随意命名
// import sum, { a } from "./m4.mjs"
// 通过ES模块化，导入的内容都是常量
// es模块都是运行在严格模式下的
// ES模块化，在浏览器中同样支持，但是通常我们不会直接使用
//          通常都会结合打包工具使用
```

核心模块

```
// 核心模块，是node中自带的模块，可以在node中直接使用
// window 是浏览器的宿主对象 node中是没有的
// global 是node中的全局对象，作用类似于window
// ES标准下，全局对象的标准名应该是 globalThis 
    核心模块
        process 
            - 表示当前的node进程
            - 通过该对象可以获取进程的信息，或者对进程做各种操作
            - 如何使用
                1. process是一个全局变量，可以直接使用
                2. 有哪些属性和方法：
                    process.exit()
                        - 结束当前进程，终止node
                    process.nextTick(callback[, …args])
                        - 将函数插入到 tick队列中
                        - tick队列中的代码，会在下一次事件循环之前执行
                            会在微任务队列和宏任务队列中任务之前执行
                    
                调用栈
                tick队列，老版微任务队列
                微任务队列
                宏任务队列
```

# 2.核心模块

## Process

```
process.exit([code])结束进程
process.nextTick(callback[,...args])向tick任务队列中添加任务
```

## Path

```
表示的路径
通过path可以用来获取各种路径
要是用path，需要先对其进行引入
方法
path.resolve([...paths])
- 用来生成一个绝对路径
	相对路径：./xxx ../xxx xxx
	绝对路径：
		- 在计算机本地
			c:\xxx
		- 在网络中
			http://www.xxxx/...
- 如果直接调用resolve，则返回当前的工作目录
	C:\Program Files\nodejs\node.exe .\03_包管理器\01_path.js
  c:\Users\lilichao\Desktop\Node-Course

  node .\01_path.js
  C:\Users\lilichao\Desktop\Node-Course\03_包管理器
  - 注意，我们通过不同的方式执行代码时，它的工作目录是有可能发生变化的
  
  - 如果将一个相对路径作为参数，
                    则resolve会自动将其转换为绝对路径
                    此时根据工作目录的不同，它所产生的绝对路径也不同

  - 一般会将一个绝对路径作为第一个参数，
                    一个相对路径作为第二个参数
                    这样它会自动计算出最终的路径

// 最终形态
// 以后在使用路径时，尽量通过path.resolve()来生成路径
// const result = path.resolve(__dirname, "./hello.js")

```

## fs

```
fs （File System）
        - fs用来帮助node来操作磁盘中的文件
        - 文件操作也就是所谓的I/O，input output
        - 使用fs模块，同样需要引入
```

1.同步读取

```
//readFileSync() 同步的读取文件的方法，会阻塞后边代码的执行
// 当我们通过fs模块读取磁盘中的数据时，读取到的数据总会以Buffer对象的形式返回
// Buffer是一个临时用来存储数据的缓冲区
// const buf = fs.readFileSync(path.resolve(__dirname, "./hello.txt"))
// console.log(buf.toString())
```

2.异步读取

```
// readFile() 异步的读取文件的方法
// fs.readFile(
//     path.resolve(__dirname, "./hello.txt"),
//     (err, buffer) => {
//         if (err) {
//             console.log("出错了~")
//         } else {
//             console.log(buffer.toString())
//         }
//     }
// )
```

3.Promise读取

```
    // fs.readFile(path.resolve(__dirname, "./hello.txt"))
    //     .then(buffer => {
    //         console.log(buffer.toString())
    //     })
    //     .catch(e => {
    //         console.log("出错了~")
    //     })
```

4.async await

```
    ; (async () => {
        try {
            const buffer = await fs.readFile(path.resolve(__dirname, "./hello.txt"))
            console.log(buffer.toString())
        } catch (e) {
            console.log("出错了~~")
        }
    })()
```

其他方法

```
		fs.readFile() 读取文件
    fs.appendFile() 创建新文件，或将数据添加到已有文件中
    fs.mkdir() 创建目录
    fs.rmdir() 删除目录
    fs.rm() 删除文件
    fs.rename() 重命名 (剪切)
    fs.copyFile() 复制文件（复制）
```

```
mkdir可以接收一个 配置对象作为第二个参数，
        通过该对象可以对方法的功能进行配置
            recursive 默认值为false
                - 设置true以后，会自动创建不存在的上一级目录
*/
// fs.mkdir(path.resolve(__dirname, "./hello/abc"), { recursive: true })
```

# 3.NPM包管理器

1. package.json

```
    package.json
        - package.json是包的描述文件
        - node中通过该文件对项目进行描述
        - 每一个node项目必须有package.json
```

2. 命令

```
        npm init 初始化项目，创建package.json文件（需要回答问题）
        npm init -y 初始化项目，创建package.json文件（所有值都采用默认值）
        npm install 包名 将指定包下载到当前项目中
            install时发生了什么？
                ① 将包下载当前项目的node_modules目录下
                ② 会在package.json的dependencies属性中添加一个新属性
                    "lodash": "^4.17.21"
                ③ 会自动添加package-lock.json文件
                    帮助加速npm下载的，不用动他

        npm install 自动安装所有依赖

        npm install 包名 -g 全局安装
            - 全局安装是将包安装到计算机中
            - 全局安装的通常都是一些工具

        npm uninstall 包名 卸载   
        
        https://docs.npmjs.com/cli/v8/commands
        引入从npm下载的包时，不需要书写路径，直接写包名即可
```

3. scripts

```
            - 可以自定义一些命令
            - 定义以后可以直接通过npm来执行这些命令
            - start 和 test 可以直接通过 npm start npm test执行
            - 其他命令需要通过npm run xxx 执行
```

# 4.HTTP协议

网络的服务器是基于请求和响应的

```
https:// 协议名  http ftp ...

lilichao.com 域名 domain
            整个网络中存在着无数个服务器，每一个我服务器都有它自己的唯一标识
                这个标识被称为 ip地址 192.168.1.17，但是ip地址不方便记忆
                域名就相当于是ip地址的别名
/hello/index.html
            网站资源路径
```

当在浏览器中输入地址以后发生了什么？

```
        ① DNS解析，获取网站的ip地址
        ② 浏览器需要和服务器建立连接（tcp/ip）（三次握手）
        ③ 向服务器发送请求（http协议）
        ④ 服务器处理请求，并返回响应（http协议）
        ⑤ 浏览器将响应的页面渲染
        ⑥ 断开和服务器的连接（四次挥手）
```

客户端如何和服务器建立（断开）连接

```
        - 通过三次握手和四次挥手
            - 三次握手（建立连接）
                - 三次握手是客户端和服务器建立连接的过程
                    1. 客户端向服务器发送连接请求
                                    SYN
                    2. 服务器收到连接请求，向客户端返回消息
                                    SYN ACK 
                    3. 客户端向服务器发送同意连接的信息
                                    ACK

            - 四次挥手（断开连接）
                    1. 客户端向服务器发送请求，通过之服务器数据发送完毕，请求断开来接
                                    FIN
                    2. 服务器向客户端返回数据，知道了
                                    ACK
                    3. 服务器向客户端返回数据，收完了，可以断开连接
                                    FIN ACK
                    4. 客户端向服务器发数据，可以断开了
                                    ACK

        请求和响应实际上就是一段数据，只是这段数据需要遵循一个特殊的格式，
            这个特殊的格式由HTTP协议来规定
```

# 5.TCP/IP协议族

网络通信四层协议

```
    - TCP/IP协议族中包含了一组协议
        这组协议规定了互联网中所有的通信的细节
    - 网络通信的过程由四层组成
        应用层
            - 软件的层面，浏览器 服务器都属于应用层
        传输层
            - 负责对数据进行拆分，把大数据拆分为一个一个小包
        网络层
            - 负责给数据包，添加信息
        数据链路层
            - 传输信息
```

HTTP协议及报文

```
- HTTP协议就是应用层的协议，
        用来规定客户端和服务器间通信的报文格式的
    - 报文（message）
        - 浏览器和服务器之间通信是基于请求和响应的
            - 浏览器向服务器发送请求（request）
            - 服务器向浏览器返回响应（response）
            - 浏览器向服务器发送请求相当于浏览器给服务器写信
                服务器向浏览器返回响应，相当于服务器给浏览器回信
                这个信在HTTP协议中就被称为报文
            - 而HTTP协议就是对这个报文的格式进行规定

        - 服务器
            - 一个服务器的主要功能：
                1.可以接收到浏览器发送的请求报文
                2.可以向浏览器返回响应报文

        - 请求报文（request）
            - 客户端发送给服务器的报文称为请求报文
            - 请求报文的格式如下：
                请求首行
                请求头
                空行
                请求体

                请求首行
                    - 请求首行就是请求报文的第一行
                        GET /index.html?username=sunwukong HTTP/1.1
                        第一部分 get 表示请求的方式，get表示发送的是get请求
                            现在常用的方式就是get和post请求
                            get请求主要用来向服务器请求资源
                            post请求主要用来向服务器发送数据

                        第二部分 /index.html?username=sunwukong
                            表示请求资源的路径，
                                ? 后边的内容叫做查询字符串
                                查询字符串是一个名值对结构，一个名字对应一个值
                                    使用=连接，多个名值对之间使用&分割
                                    username=admin&password=123123
                                get请求通过查询字符串将数据发送给服务器
                                    由于查询字符串会在浏览器地址栏中直接显示
                                        所以，它安全性较差
                                        同时，由于url地址长度有限制，所以get请求无法发送较大的数据

                                post请求通过请求体来发送数据
                                    - 在chrome中通过 载荷 可以查看
                                    post请求通过请求体发送数据，无法在地址栏直接查看
                                        所以安全性较好
                                    请求体的大小没有限制，可以发送任意大小的数据

                                如果你需要向服务器发送数据，能用post尽量使用post

                        第三部分
                            HTTP/1.1 协议的版本

                请求头
                    - 请求头也是名值对结构，用来告诉服务器我们浏览器的信息
                    - 每一个请求头都有它的作用：
                        Accept 浏览器可以接受的文件类型
                        Accept-Encoding 浏览器允许的压缩的编码
                        User-Agent 用户代理，它是一段用来描述浏览器信息的字符串

                空行
                    - 用来分隔请求头和请求体

                请求体
                    - post请求通过请求体来发送数据


            网页、css、 js、图片这些资源会作为响应报文中的哪一部分发送

            响应报文：
                响应首行
                响应头
                空行
                响应体

                响应首行
                    HTTP/1.1 200 OK
                        200 响应状态码
                        ok 对响应状态码的描述
                        - 响应状态码的规则
                            1xx 请求处理中
                            2xx 表示成功
                            3xx 表示请求的重定向
                            4xx 表示客户端错误
                            5xx 表示服务器的错误

                响应头
                    - 响应头也是一个一个的名值对结构，用来告诉浏览器响应的信息
                    - Content-Type 用来描述响应体的类型
                    - Content-Length 用来描述响应体大小
                    Content-Type: text/html; charset=UTF-8
                    Content-Length: 2017
                空行
                    - 空行用来分隔响应头和响应体

                响应体
                    - 响应体就是服务器返回给客户端的内容
```

# 6.Express

1. express简介

```
    express 是node中的服务器软件
        通过express可以快速的在node中搭建一个web服务器
    - 使用步骤：
        1. 创建并初始化项目
            yarn init -y
        2. 安装express
            yarn add express
        3. 创建index.js 并编写代码
        
流程
1. 引入express
const express = require("express")
2. 获取服务器实例（对象）
const app = express()
3. 设置路由（中间件）
app.use((req, res, next) => {}
app.get("/hello", (req, res) => {}
4. 启动服务器
app.listen(3000, () => {}
```

路由

```
    如果希望服务器可以正常访问，则需要为服务器设置路由，
        路由可以根据不同的请求方式和请求地址来处理用户的请求
    
        app.METHOD(...)
            METHOD 可以是 get 或 post ...

    中间件
        - 在express我们使用app.use来定义一个中间件
            中间件作用和路由很像，用法很像
            但是路由不区分请求的方式，只看路径

        - 和路由的区别
            1.会匹配所有请求
            2.路径设置父目录
```

```
// next() 是回调函数的第三个参数，它是一个函数，调用函数后，可以触发后续的中间件
// next() 不能在响应处理完毕后调用
app.use((req, res, next) => {
    console.log("111", Date.now())
    // res.send("<h1>111</h1>")

    next() // 放行，我不管了~~
})
```

```
// http://localhost:3000
// 路由的回调函数执行时，会接收到三个参数
// 第一个 request 第二个 response
// app.get("/hello", (req, res) => {
//     console.log("有人访问我了~")
//     // 在路由中，应该做两件事
//     // 读取用户的请求（request）
//     // req 表示的是用户的请求信息，通过req可以获取用户传递数据
//     // console.log(req.url)

//     // 根据用户的请求返回响应（response）
//     // res 表示的服务器发送给客户端的响应信息
//     //  可以通过res来向客户端返回数据
//     // sendStatus() 向客户端发送响应状态吗
//     // status() 用来设置响应状态吗，但是并不发送
//     // send() 设置并发送响应体
//     // res.sendStatus(404)
//     // res.status(200)
//     res.send("<h1>这是我的第一个服务器</h1>")
// })
```

```
// 启动服务器
// app.listen(端口号) 用来启动服务器
// 服务器启动后，我们便可以通过3000端口来访问了
// 协议名://ip地址:端口号/路径
// http://localhost:3000
// http://127.0.0.1:3000
```

2. nodemon

```
目前，服务器代码修改后必须要重启，
        我们希望有一种方式，可以自动监视代码的修改
        代码修改以后可以自动重启服务器

    要实现这个功能，我们需要安装一个模块 nodemon
        使用方式：
            1. 全局安装
                npm i nodemon -g
                yarn global add nodemon
                    - 同yarn进行全局安装时，默认yarn的目录并不在环境变量中
                    - 需要手动将路径添加到环境变量中
                - 启动：
                    nodemon  // 运行index.js
                    nodemon xxx // 运行指定的js

            2. 在项目中安装
                npm i nodemon -D
                yarn add nodemon -D

                - 启动
                    npx nodemon
```

3. 静态资源

```
// use() 中间件
/* 
    服务器中的代码，对于外部来说都是不可见的，
        所以我们写的html页面，浏览器无法直接访问
        如果希望浏览器可以访问，则需要将页面所在的目录设置静态资源目录
*/

// 设置static中间件后，浏览器访问时，会自动去public目录寻找是否有匹配的静态资源
app.use(express.static(path.resolve(__dirname, "./public")))

希望用户返回根目录时，可以给用户返回一个网页
		// res.send(`
    // <!doctype html>
    // <html>
    //     <head>
    //         <meta charset="utf-8">
    //         <title>这是一个网页</title>
    //     </head>
    //     <body>
    //         <h1>这是网页的标题</h1>
    //     </body>
    // </html>
    // `)
获取到用户输入的用户名和密码
req.query 表示查询字符串中的请求参数
验证用户输入的用户名和密码是否正确
if(req.query.username === "sunwukong" && req.query.password === "123123")
```

4. param和post请求

```
1. 配置静态资源的路径 app.use
public === http://localhost:3000
2. 引入解析请求体的中间件
app.use(express.urlencoded())
3. 配置路由 app.get/post
- /login ===> http://localhost:3000/login 斜杠代表前面的默认地址
- get请求发送参数的第一种方式：
req.query.username
- get请求发送参数的第二种方式：
req.params
/hello/:id 当用户访问/hello/xxx时就会触发
在路径中以冒号命名的部分我们称为param，在get请求它可以被解析为请求参数--->可以利用req.params属性来获取这些参数
param传参一般不会传递特别复杂的参数
约定好了不需要传属性名：约定优于配置
- app.post('/login',(req,res)=>{})
通过req.body来获取post请求的参数（请求体的参数）
默认情况下 express不会自动解析请求体，需要通过中间件来为其增加功能
app.use(express.urlencoded({extended:true})) // 解析请求体
app.use(express.json()) // 解析json格式的请求体
4. 可以在所有路由的后边配置错误路由
app.use((req,res)=>{ xxxx }) // 只要这个中间件一执行，说明上边的地址都没有匹配
5. 启动服务器 app.listen
```

注册

```
1. app.post()
2. 获取用户输入的数据 req.body
3. 验证这些数据是否正确，例：用户名是否存在 用find来判断
4. 进入判断说明用户不存在，可以注册users.push({username,password,nickname}) res.send("注册成功")
```

5. 模版引擎ejs

```
希望用户在访问students路由时，可以给用户返回一个显示有学生信息的页面
html页面属于静态页面，创建的时候什么样子，用户看到的就是什么样子，不会自动跟随服务器中数据的变化而变化
希望有这么一个东西，长得像网页，但是它里边可以嵌入变量 --> 这个东西在node中被称为模版
在node中存在很多的模版引擎，都各具特色，ejs比较好
ejs是node中的一款模版引擎，使用步骤：
	1. 安装ejs
	2. 配置express模版引擎为ejs
	app.set('view engine', 'ejs') // 不用require ejs
	3. 配置模版路径
	app.set('views,' path.resovle(__dirname,'views'))
	4. 创建views文件夹，与public同级。扩展名文件为.ejs。文件类似html。
	注意，模版引擎需要被express渲染后才能使用
	5. res.render("students",{name:'孙悟空',age:18}) 用来渲染一个模版引擎，并将其返回给浏览器 // 类似react，这是后台的渲染，react是把渲染放到了前端
	可以将一个对象作为render的第二个参数传递，这样在模版中可以访问到对象中的数据
	6. views里面的ejs文件，<%=name %>可以访问到render里的数据。XSS攻击
	<%= %> 在ejs中输出内容时，他会自动对字符串中的特殊符号进行转义alt
	*** 这个设计主要是为了避免xss攻击，会被植入恶意脚本
	<%- %> 原样输出
	<% %> 直接在里面写js代码，js与html结合，然后写逻辑
		<% if(name === "孙悟空") {%>
        <h2>大师兄来了</h2>
        <%} else{%>
        <h2>二师兄来了</h2>
        <%}%>
```

```
解决XSS攻击：
1. 转义输出。
2. 收到req.query时，就需要进行表单验证，有没有脚本，这样可以直接拒绝提交。
```

```
ejs注意点：
1. 注释
<%# address%>
<%
	// console.log(111)
%>
```

```
ejs显示学生信息：
1. res.render("students",{stus:STUDENT_ARR})
2. <% for(const stu of stus){ %>
                <tr>
                    <td><%=stu.id%></td>
                    <td><%=stu.name %></td>
                    <td><%=stu.age %></td>
                    <td><%=stu.gender %></td>
                    <td><%=stu.address %></td>
                    <td>
                        <a href="#">删除</a>
                        <a href="#">修改</a>
                    </td>
                </tr>
                <% } %>
 这是在服务器渲染后发送给浏览器，react是在浏览器渲染。
3. 创建一个添加学生信息的路由
app.post("/add-student",(req,res)=>{
	// 路由里要做什么？
	// 生成一个id
	const id = STUDENT_ARR.at(-1).id + 1
	// 1. 获取用户填写的信息
	const newUser = {
		id,
    name:req.body.name,
    age:req.body.age,
    gender:req.body.gender,
    address:req.body.address
	}
	// 2. 验证用户信息（略）
	
	// 3. 将用户信息添加到数组中
	STUDENT_ARR.push(newUser)
	// 将新的数据写入json文件中
	fs.writeFile(
		path.resolve(__dirname,'./data/students.json'),
		JSON.stringify(STUDENT_ARR)
	).then(()=>{
		res.redirect('/students') 用来发起重定向
	}).catch(()=>{})
	
	// 4. 返回响应
	res.send("添加成功！")
	// 直接在添加路由中渲染ejs，会面临表单重复提交的问题
	res.redirect('/students') 用来发起重定向
	// 重定向的作用是告诉浏览器你向另外一个地址在发起一次请求
})
```

```
删除和修改表单：
1. 删除
- 点击删除链接后，删除当前数据
- 点击 白骨精 删除 --> 删除id为5的学生
- 流程：
 1. 点击白骨精的删除链接
 2. 向路由发送请求（写一个路由）
 3. 路由怎么写？
 	- 获取学生的id n
 	- 删除id为n的学生
 	- 将新的数据写入文件
 	- 重定向到学生列表页面
app.get("/delete",(req,res)=>{
	// 获取要删除的学生的id
	const id = +req.query.id // 类型转换
	// 根据id删除学生
  STUDENT_ARR = STUDENT_ARR.filter((stu)=>stu.id!==id)
  // 将新的数据写入到json文件中
  fs.writeFile(
		path.resolve(__dirname,'./data/students.json'),
		JSON.stringify(STUDENT_ARR)
	).then(()=>{
		res.redirect('/students') 用来发起重定向
	}).catch(()=>{})
})

2. 修改
- 点击修改链接后，显示一个表单，表单中应该有要修改的学生的信息
	用户对学生信息进行修改，修改以后点击按钮提交表单
- 流程：
	1. 点击孙悟空的修改链接
	2. 跳转到一个路由
		- 这个路由会返回一个页面，页面中有一个表单，表单中应该显示孙悟空的各种信息
		。。。
		
```

6. Router

```
Router是express中创建的一个对象
router实际上是一个中间件，可以在该中间件上去绑定各种路由以及其他中间件
const router = express.Router()
router.get('/hello',(req,res)=>{
	res.send("haha")
})
module.exports = router

const userRouter = require('./routes/user')
app.use("/user",userRouter)
```

# 7. Cookie 和 Session

## 1. Cookie

```
登录形同虚设，使用url可以直接访问
	HTTP协议是一个无状态的协议
		服务器无法区分请求是否发送自同一个客户端
		
	cookie
		- cookie是HTTP协议中用来解决无状态问题的技术
		- cookie的本质就是一个头
			- 服务器以响应头的形式将cookie发送给客户端
				客户端收到以后会将其存储，并在下次想服务器发送请求时将其传回
				这样服务器就可以根据cookie来识别客户端
		res.cookie("username","admin")
		res.send("cookie已经发送")
		
		需要安装中间件来使得express可以解析cookie
			1. 安装cookie-parser
			2. 引入
			3. 设置为中间件
		// req.cookies 用来读取客户端发回的cookie
		
		学生列表的路由设置cookie判断
		if(req.cookies.username){
			res.render("students",{stus:STUDENT_ARR})
		}
		
		cookie是有有效期的
			- 默认情况下 cookie的有效期就是一次会话（session）
				会话就是一次从打开到关闭浏览器的过程
			res.cookie("name","sunwukong",{
				maxAge:1000*60*60*24*30 // 一个月
			})
		
		cookie一旦发送给浏览器我们不能在修改了
		但是我们可以通过发送新的cookie来替换就cookie，从而达到修改的目的
		
		cookie不足:
			- cookie是由服务器创建，浏览器保存
				每次浏览器访问服务器时都需要将cookie返回
				这就导致我们不能在cookie中存放较多的数据
				cookie直接存储在客户端，容易被篡改盗用
			- 注意：
				我们在使用cookie一定不会再cookie中存储敏感数据
			
```

## 2. Session

```
- 为了Cookie的不足，我们希望可以这样
	将用户的数据统一存储在服务器中，
		每一个用户的数据都有一个对应的id
		我们只需要通过cookie将id发送给浏览器
		浏览器只需每次访问时将id发回，即可读取到服务器中存储的数据
		这个技术我们称之为session（会话）

session
	- session是服务器中的一个对象，这个对象用来存储用户的数据
	- 每一个session对象都有一个唯一的id，id会通过cookie的形式发送给客户端
	- 客户端每次访问时只需将存储有id的cookie发回即可获取它在服务器中存储的数据
	- 通过express-session组件来实现session
	- 使用步骤
		1. 安装
		2. 引入
		3. 设置为中间件
		app.use(session({
			secret:'hello'
		}))
		有cookieid,记录
		没有cookieid，req设置上cookie
	登录成功后，要把用户信息存入到session中
		req.session.loginUser = username
		学生信息路由设置判断req.session.loginUser
		students以后的操作比如查看编辑必须要登录之后才能使用
		判断验证有无登录，利用中间件，在前面统一验证然后next
	session默认有效期是一次会话
	
	session是服务器中的一个对象，这个对象用来存储用户的信息
		每一个session都会有一个唯一的id，session创建后
			id会以cookie的形式发送给浏览器
		浏览器收到以后，每次访问都会将id发回，服务器中就可以根据id找到对应的session
	
	id（cookie）---> session对象
	
	session什么时候会失效？
		第一种 浏览器的cookie没了
		第二种 服务器的session没了
	
	express-session默认将session存储到内存中，所以服务器一旦重启session会自动重置
		所以我们使用session通常会对session进行一个持久化的操作（写到文件或数据库）
	
	如果将session存储到本文件中：
		- 需要引入一个中间件
			1. 安装
			2. 引入
			3. 设置为中间件
		// 引入file-store
		const FileStore = require("session-file-store")(session)
		app.use(session{
		 	store:new FileStore({
		 		path: path.resolve(__dirname,'./sessions'), 
		 		secret:'haha', // 数据自动加密
		 		ttl: 10, // session有效时间，秒为单位
		 		reapInterval:10 // 默认情况下，fileStore会每间隔一小时，清除一次session对象，用来指定清除session的间隔，单位秒，默认1h
		 	}),
		 	secret:'dazhaxie',
		 	cookie:{
		 		maxAge: 1000*3600
		 	}
		})
		
		使session失效
		req.session.destroy(()=>[
			res.redirect('/')
		])
```

```
修改bug
登录以后，req.session.loginUser是undefined

Req.session.loginUser = username //这里仅仅是将loginUser添加到了内存中的session，而没有写入到文件中

为了使session可以立刻存储，需要手动调用save立刻存储
Req.session.save(()=>{
Res.redirect()})
```

# 8.csrf攻击：

```
- 跨站请求伪造
- 现在大部分的浏览器都不会在跨域的情况下自动发送cookie
	这个设计就是为了避免csrf攻击
	
- 如何解决：
	1. 使用referer头来检查请求的来源
	2. 使用验证码
	3. 尽量使用post请求（token）
	
- token（令牌）
	- 可以在创建表单时随机生成一个令牌
	 然后将令牌存储到session中，并通过模版发送给用户
	 用户提交表单时，必须将token发回，才可以进行后续操作
	 （可以使用uuid来生成token）
	 if(req.session.csrfToken ===  req.body._csrf)
```

# 9. JWT

```
1. 基础环境搭建
跨域配置proxy：请求转发  "proxy": "http://localhost:8800/api/"
```

```
2. 验证用户名和密码
前端发送：
axios.post('/token'{
username,
password
})
后端接收：
tokenRouter.post('/token', async ctx => {
	const {username,password} = ctx.req.body
	
	const result = verifyUsername(username, password) // 不要再api里面写过多的逻辑
	
	ctx.body = {
		result
	}
})

function verifyUsername(username, password){
	users.findIndex(user=>{
		return user.username === username && user.password === password
	})
	const user = users[index]
	if(!user){
		return '错误'
	}
	return '成功'
}
```

```
3. 生成token
token.js
const token = generateToken(user.id, 2) // 权限数字2
if(!token){
	ctx.body = {
		errCode: xxx,
		msg: '用户名或密码不正确',
		request:'${ctx.method} ${ctx.path}'
	}
}

util.js
function generateToken(uid, scope){
	jwt.sign(
		{
			uid,
			scope
		},
		secretKey,
		{
			expiresIn
		}
	)
	
	return token
}
module.exports = {
	generateToken
}

config.js
module.exports = {
	secretKey: 'jk123uu_sasd!3&',
	expiresIn: 24*60*60
}
```

```
4. 验证token的有效性
tokenRouter.post('/verify', async ctx=>{  // 这个函数是中间件
	const token = ctx.request.body.token
	const isValid = Auth.verifyToken(token)
})

middlewares/auth.js
class Auth {
	static verifyToken(token) {
		try{
			jwt.verify(token,secretKey)
			return true
		}catch(e){
			return false
		}
	}
}
module.exports = Auth

// 存入localStorage
views/login.vue
localStorage.setItem('token', tokenResult.data.token)
verifyToken(){
	axios.post('/token/verify', {
		token: localStorage.getItem('token')
	})
}
```

```
5. 使用token实现权限控制
接口实现权限控制，使用中间件
```

