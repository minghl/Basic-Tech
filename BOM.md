# BOM

## 01获取浏览器信息

### 01初始BOM

- BOM（Browser Object Model）:浏览器对象模型
- 其实就是操作浏览器的一些能力
  - 获取一些浏览器的相关信息（窗口的大小）
  - 操作浏览器进行页面跳转
  - 获取当前浏览器地址栏的信息
  - 操作浏览器的滚动条
  - 浏览器的信息（浏览器的版本）
  - 让浏览器出现一个弹出框（alert/confirm/prompt）
  - 。。。
- BOM的核心就是window对象
- window是浏览器内置的一个对象，里面包含着操作浏览器的方法

### 02获取浏览器尺寸

- 代码

  ```js
  // 窗口的宽和高，滚动条也会在里面
          console.log(window.innerHeight, innerHeight);
          console.log(window.innerWidth, innerWidth);
  ```

### 03浏览器弹出层

- 代码

  ```js
  // 警告框
  btn.onclick = function() {
      alert("用户名密码不匹配")
  }
  
  // 询问框
  btn.onclick = function() {
      var res = confirm("sure?")
      console.log(res);
  }
  
  // 输入框
  btn.onclick = () => {
      var res = prompt("input")
      console.log(res);
  }
  
  // 会阻塞后续代码的执行
  ```

### 04浏览器地址栏

- 代码

  ```js
  console.log(location.href); // 地址 读
  
  btn.onclick = function() {
      location.href = "http://www.baidu.com" // 跳转 写
  }
  
  // reload
  btn2.onclick = function() {
      location
  }
  ```

## 02浏览器常见事件

### 01浏览器的常见事件

- 代码

  ```js
    window.onresize = function() {
        console.log('resize')
    }
  
    window.onscroll = function() {
        console.log("scroll", "滚动距离达到指定距离了吗？")
    }
  
    window.onload = function() {
              // 页面所有的资源都加载完后执行（图片，视频，dom）
              console.log("加载完成")
              console.log(btn);
    }
  ```

### 02浏览器的滚动距离

- 代码

  ```js
  window.onscroll = function() {
              // console.log(document.documentElement.scrollTop || document.body.scrollTop)
              // console.log(document.documentElement.scrollLeft || document.body.scrollLeft)
  
              if ((document.documentElement.scrollTop || document.body.scrollTop) > 100) {
                  console.log("显示回到顶部按钮");
              } else {
                  console.log("隐藏回到顶部按钮");
              }
          }
  
          btn.onclick = function() {
              // window.scrollTo(0, 0)
              // 1. 两个数字
  
              // 2. 对象
  
              window.scrollTo({
                  left: 0,
                  top: 0
              })
          }
  ```

### 03浏览器打开标签页

- 代码

  ```js
  // location.href = ""
  
  // window.open("")
  
  btn.onclick = () => {
      window.open("http://www.baidu.com")
  }
  btn2.onclick = () => {
      // 关闭本标签页
      window.close()
  }
  ```

### 04浏览器历史记录

- 代码

  ```js
  history.forward()
  history.back()
  history.go(-1)
  history.go(1)
  ```

## 03本地存储

- localStorage // 永久存储 

  ```js
  // 增
  localStorage.setItem("name","kerwin")
  // 改
  localStorage.setItem("name","kerwin2")
  // 取
  localStorage.getItem("name")
  // 删
  localStorage.remove("name")
  // 清空
  localStorage.clear()
  ```

  

- sessionStorage // 会话存储 关闭页面就消失

  ```js
  // 增
  sessionStorage.setItem("name","kerwin")
  // 改
  sessionStorage.setItem("name","kerwin2")
  // 取
  sessionStorage.getItem("name")
  // 删
  sessionStorage.remove("name")
  // 清空
  sessionStorage.clear()
  ```

- 代码

  ```js
      <script>
          // 先获取用户名 密码信息进行存储
          var uservalue = localStorage.getItem("username")
          var passvalue = localStorage.getItem("password")
  
          username.value = uservalue
          password.value = passvalue
  
          login.onclick = function() {
              localStorage.setItem("username", username.value)
              localStorage.setItem("password", password.value)
          }
      </script>
  ```

  

  

  ## 

