# DOM

## 01DOM对象课程精讲

### 01初识DOM

- DOM（Document Object Model）：文档对象模型

- 其实就是操作html中的标签的一些能力
  - 获取一个元素
  - 移除一个元素
  - 创建一个元素
  - 向页面里面添加一个元素
  - 给元素绑定一些事件
  - 获取元素的属性
  - 给元素添加一些css样式
  - 。。。
- DOM的核心对象就是document对象
- document对象是浏览器内置的一个对象，里面存储着专门用来操作元素的各种方法
- DOM：页面中的标签，我们通过js获取到以后，就把这个对象叫做DOM对象

### 02获取元素的方法

- html, head, body 非常规
- 常规=>id, class
- h5的querySelector

```js
document.documentElement // html rem
document.head // head
document.body // body

document.getElementById("box")
document.getElementsByClassName("newsitem")
document.getElementsByTagName("li")
document.getElementsByName("username")

document.querySelector("ul li") // querySelector 返回第一个对象
document.querySelectorAll("ul li.newsitem") // querySelectorAll 返回所有对象
```

### 03操作元素属性

- 元素自带属性

  ```js
  box.innerHTML = "2222"
  username.type = "password"
  photo.src = ''
  ```

- 自定义属性

  - setAttribute getAttribute removeAttribute

    ```js
    var oitems = document.getElementsByTagName("li")
    for (let i = 0; i < oitems.length; i++) {
        oitems[i].setAttribute("minghlindex", i)
    
    }
    ```

  - h5 ===> 约定 data-

    ```js
    var oitems = document.getElementsByTagName("li")
    for (let i = 0; i < oitems.length; i++) {
        oitems[i].dataset.index = i
    
    }
    ```

- Checked

  ​	

  ```js
  <input type="checkbox" id="all"> 全选/全不选
  
  oAll.onclick = function() {
      for (var i = 0; i < oitems.length; i++) {
          oitems[i].checked = oAll.checked
      }
  }
  ```

### 04操作元素文本内容

- 除了表单元素，交互的只有内部的html，表单元素可以操作value

- 表单元素：input, select, option

  ```js
  console.log(box.innerHTML);
  box.innerHTML = "<h1>11111</h1>"
  
  console.log(box.innerText); // 获取只有文本
  box.innerText = "<h1>11111</h1>" // 不解析html
  ```

### 05渲染页面

- 代码

  ```js
  var filmItems = filmList.map(item => {
              return `<li> 
              <img src="${item.url}" alt="">
              <h3>${item.title}</h3>
              <p>观众评分 ${item.grade}</p>
          </li>`
          }) // 模版字符串
  
          var oul = document.querySelector("ul")
          oul.innerHTML = filmItems.join("")
  ```

### 06操作元素样式

```js
// 行内样式方法 style -- 读写

console.log(box.style.color);
console.log(box.style["background-color"]); // 符合类型
console.log(box.style.backgroundColor); //驼峰

box.style.width = "200px"
box.style.backgroundColor = "red"

// 内部样式，外部样式，行内样式 getComputedStyle 获取，不能赋值写样式
console.log(getComputedStyle(box));
console.log(getComputedStyle(box)["background-color"]);
console.log(getComputedStyle(box).backgroundColor);
```



### 07操作元素类名

```js
// .className
console.log(box.className);
box.className = '' // 修改

// classList属性
box.classList.add('item3')
box.classList.remove('item2')
console.log(box.classList);

// 切换 toggle
btn.onclick = function() {
    box.classList.toggle("item")
}
```

### 08简易选项卡

```js
item1.onclick = function() {
    item1.classList.add('active')
    item2.classList.remove('active')
}
item2.onclick = function() {
    item1.classList.remove('active')
    item2.classList.add('active')
}
```

### 09选项卡

```js
var oHeaderItems = document.querySelectorAll(".header li")
var oBoxItems = document.querySelectorAll(".box li")

for (var i = 0; i < oHeaderItems.length; i++) {
    // 自定义属性
    oHeaderItems[i].dataset.index = i
    oHeaderItems[i].onclick = handler
}

function handler() {
    // 获取自身的属性
    // console.log(this.dataset.index);
    var index = this.dataset.index
    for (let m = 0; m < oHeaderItems.length; m++) {
        oHeaderItems[m].classList.remove("active")
        oBoxItems[m].classList.remove("active")
    }

    oHeaderItems[index].classList.add("active")
    oBoxItems[index].classList.add("active")
}
```

### 10DOM节点

- DOM节点我们一般分为常用的三大类 **元素节点/文本节点/属性节点**
- 元素节点（标签节点），通过各种方法获取到的
- 比如我们在标签里写的文字，就是文本节点
- 写在每一个标签上的属性，就是属性节点

- 元素节点

  - 我们通过getElementBy...获取到的都是元素节点（有父子关系）（可父可子）

- 属性节点

  - 我们通过getAttribute获取的就是元素的属性节点（没有父子关系）

- 文本节点

  - 我们通过innerText获取到的就是元素的文本节点（有父子关系）（子）

- 节点分类

  - Document：根节点
  - html：根元素节点
  - head/body/div/ul/...：元素节点
  - 文本内容：文本节点
  - 元素属性：属性节点
  - 注释内容：注释节点

  ```js
  <div>
          minghl
          <p>11111</p>
          <!--我是注释-->>
      </div>
      <script>
          /*
                      1. \n
                      minghl
                          \n
                      2. <p>111</p>
                      3. \n
                      4. <!--我是注释-->
                      5. \n
                  */
      </script>
  ```

### 11获取节点的方式

```js
console.log(box.childNodes) // 所有节点
console.log(box.children) // 所有元素

// firstChild firstElementChild
console.log(box.firstChild); // 第一个节点
console.log(box.firstElementChild); // 第一个元素节点

// lastChild lastElementChild
console.log(box.lastChild); // 最后一个节点
console.log(box.lastElementChild); // 最后一个元素节点

// previousSibling previousElementSibling
console.log(box.previousSibling) // 上一个兄弟节点
console.log(box.previousElementSibling) // 上一个兄弟元素节点

// nextSibling nextElementSibling
console.log(box.nextSibling) // 下一个兄弟节点
console.log(box.nextElementSibling) // 下一个兄弟元素节点

// parentNode vs parentElement 大部分都是元素节点一样的，因为父节点一般是元素节点
console.log(box.parentNode.parentNode.parentNode)
console.log(box.parentElement.parentElement.parentElement)

// attributes 拿到所有属性节点 getAttribute("id") 拿到某个属性
console.log(box.attributes)
```

### 12节点操作

- 代码

  ```js
      <div id="box">
          <div id="child">11111</div>
      </div>
      <script>
          // 创建节点
          var odiv = document.createElement("div")
          odiv.className = "aaaa"
          odiv.id = "aaa"
          odiv.style.background = "yellow"
          odiv.innerHTML = "我是新创建的节点"
          console.log(odiv);
  
          // 插入节点
          box.appendChild(odiv)
          // insertBefore(要插入的节点,谁的前面)
          box.insertBefore(odiv, child)
  
          // 删除节点(节点对象)
          box.removeChild(child)
          box.remove() // 删除自己以及后代节点
  
          // 替换节点 replaceChild(新的节点, 老的节点)
          var odiv2 = document.createElement("div")
          odiv2.innerHTML = "2222222"
          box.replaceChild(odiv2, child)
  
          // 克隆节点()false不克隆后代 true克隆后代
          var oCloneBox = box.cloneNode(true)
          console.log(oCloneBox);
          oCloneBox.id = 'box2'
          document.body.appendChild(oCloneBox)
      </script>
  ```

### 13动态删除

- 代码

  ```js
    var arr = ['111', '222', '333']
    for (var i = 0; i < arr.length; i++) {
        var oli = document.createElement("li")
        oli.innerHTML = arr[i]
  
        var obutton = document.createElement("button")
        obutton.innerHTML = 'delete'
        obutton.onclick = handler
        oli.appendChild(obutton)
        list.appendChild(oli)
    }
  
    function handler() {
        // console.log(this);
        this.parentNode.remove()
    }
  ```

### 14节点属性

```js
// node.nodeType 
for (let i = 0; i < obox.childNodes.length; i++) {
    if (obox.childNodes[i].nodeType === 1) {
        console.log(obox.childNodes[i]);
    }
}

// node.nodeValue
console.log(obox.attributes[0].nodeValue)

// node.nodeName
console.log(obox.attributes[0].nodeName)
```

### 15获取元素尺寸

```js
<script>
    // console.log(getComputedStyle(box).width)
    // console.log(box.style.width)

    // offset*(border+padding+content)
    console.log(box.offsetWidth, box.offsetHeight);

    // 注意
    /*
        1. 单位 数字
        2. box-sizing 没有任何冲突，计算方式没有影响
        3. display:none 拿不到offset
    */

    // client*(padding+content)
    console.log(box.clientWidth, box.clientHeight);
</script>
```

### 16获取元素偏移量

```js
console.log(child.offsetLeft, child.offsetTop);
console.log(myparent.offsetLeft, myparent.offsetTop);
console.log(box.offsetLeft, box.offsetTop);

/*
    参考点：是定位父级
    如果父级元素没有定位，偏移量相对于body
*/

console.log(list.clientLeft, list.clientTop);

/*
    边框大小
*/
```

### 17获取可视窗口的尺寸

```js
console.log("宽度",innerWidth); // bom 包括滚动条
console.log("高度",innerHeight);
console.log("宽度",document.documentElement.clientWidth); // dom 不包括滚动条
console.log("高度",document.documentElement.clientHeight);
```

### 18懒加载

- 几个重要的api来判断是否到底需要懒加载
- offsetHeight：元素尺寸，元素的大小
- offsetTop：元素偏移量，与顶部差多少
- scrollTop：滚动距离（BOM里面学的，但是是DOM里面的知识）
- clientHeight：可视窗口尺寸
- 通过可视窗口的变化与原始原始大小对比，从而来自判断是否到底

```js
renderHTML(arr1)

function renderHTML(arr) {
    for (var i = 0; i < arr.length; i++) {
        var oli = document.createElement("li")
        oli.innerHTML = `<img src="${arr[i].url}" alt="">
            <h3>${arr[i].name}</h3`
        list.appendChild(oli)
    }
}
isLoading = false
window.onscroll = function() {
    // console.log("111");
    var listHeight = list.offsetHeight
    var listTop = list.offsetTop
        // console.log(listHeight + listTop);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    var windowHeight = document.documentElement.clientHeight

    if (isLoading) return
    if ((listHeight + listTop) - Math.round(windowHeight + scrollTop) < 50) {
        console.log("到底了");
        isLoading = true
            // 渲染下一页数据
  	setTimeout(() => {
              renderHTML(arr2)

              isLoading = false // 下一次到底事件继续触发
          }, 1000);
      }
  }
```

## 02DOM事件绑定操作

### 01初识事件

- 事件由什么组成

  - 触发谁的事件：事件源

  - 触发什么事件：事件类型

  - 触发以后做什么：事件处理函数

    ```js
    // dom0 类型 -- 后面会覆盖前面的，只绑定一个函数
    				box.onclick = function() {
                    console.log("1111");
                }
            box.onclick = function() {
                console.log("2222");
            }
    				// 1111
     // dom2 类型 绑定多个事件处理函数，按照顺序执行
            box2.addEventListener("click",function(){
                console.log("111");
            })
            box2.addEventListener("click",function(){
                console.log("222");
            })
            box2.addEventListener("click",function(){
                console.log("333");
            })
    				// 111 222 333
    ```

### 02事件解绑

- dom0和dom2的事件解绑

  ```js
  // 事件解绑-dom0 dom节点.onclick = null
  btn.onclick = function() {
      console.log("谢谢惠顾");
      this.onclick = null
  }
  
  // 事件解绑dom2
  function handler() {
      console.log("谢谢惠顾")
      this.removeEventListener('click', handler)
  }
  btn.addEventListener("click", handler)
  ```

### 03事件类型

- 浏览器事件

  - load：页面全部资源加载完毕
  - scroll：浏览器滚动的时候触发

- 鼠标事件

  ```js
  // 鼠标事件
  // click
  btn.ondblclick = function() {
      console.log("单击执行");
  }
  
  // dblclick:双击
  btn.ondblclick = function() {
      console.log("双击执行");
  }
  
  // contextmenu 右键单击
  btn.oncontextmenu = function() {
      console.log("右键单击，自定义右键菜单");
  }
  
  // mousedown mousemove mouseup
  box.onmousedown = function() {
      console.log("鼠标按下");
  }
  // box.onmousemove = function() {
      console.log("鼠标移动");
  }
  box.onmouseup = function() {
      console.log("鼠标抬起");
  }
  
  // 移入移出 mouseover mouseout 孩子也会触发
  box.onmouseover = function() {
      console.log("移入");
  }
  box.onmouseout = function() {
      console.log("移出");
  }
  
  // 移入移出 mouseenter mouseleave 孩子不触发
  box.onmouseenter = function() {
      console.log("移入");
  }
  box.onmouseleave = function() {
      console.log("移出");
  }
  ```

  

- 键盘事件

  ```js
  // window,document,输入框
  username.onkeydown = function() {
      console.log("按下键盘", "判断是不是回车键");
  }
  username.onkeyup = function() {
      console.log("抬起键盘", "判断是不是回车键");
  }
  ```

  

- 表单事件

  ```js
  // focus blur
  username.onfocus = function() {
      console.log("获取焦点");
  }
  
  username.onblur = function() {
      console.log("失去焦点");
  }
  
  // change 获取焦点 失去焦点的对比里面内容不一样才会触发
  username.onchange = function() {
      console.log("change");
  }
  
  // input 内容不一样就会触发
  username.oninput = function() {
      console.log("input");
  }
  
  // submit, reset
  myform.onsubmit = function() {
      console.log("submit", "校验表单内容");
      return false // 阻止默认行为
  }
  myform.onreset = function() {
      console.log("reset");
  }
  ```

  

- 触摸事件

  ```js
  box.ontouchstart = function() {
      console.log("touchstart");
  }
  
  box.ontouchmove = function() {
      console.log("touchmove");
  }
  
  box.ontouchend = function() {
      console.log("touched");
  }
  
  box.ontouchcancel = function() { // 用得少，电话打进来了，touch才cancel
      console.log("touchcancel");
  }
  ```

### 04事件对象

- 每一个事件都会有一个对应的对象来描述这些信息，我们就把这个对象叫做事件对象

- 浏览器给了我们一个黑盒子，叫做window.event，就是对事件信息的所有描述

- 一个形参

  ```js
  box.onclick = function(e) {
      console.log(e);
  }
  ```

### 05事件对象-鼠标事件

```js
// clientX clientY 距离浏览器可是窗口左上角的坐标值，非固定（滚动条变动）
// pageX pageY 距离文档左上角的坐标值，固定的
// offsetX offsetY 距离出发元素左上角的坐标值(实际触发的盒子，child只看child，不看大盒子)冒泡
box.onclick = function(e) {
    console.log(e.clientX, e.clientY);
    console.log(e.pageX, e.pageY);
    console.log(e.offsetX, e.offsetY);
}
```

### 06鼠标跟随

```js
#box p {
    width: 300px;
    height: 200px;
    background-color: red;
    position: absolute;
    left: 100px;
    top: 100px;
    pointer-events: none;
    /* 穿透 */
}

box.onmousemove = function(e) {
    console.log(e.offsetX, e.offsetY);
    this.firstElementChild.style.left = e.offsetX + "px"
    this.firstElementChild.style.top = e.offsetY + "px"
}
```

### 07鼠标拖拽

- 计算div的top和left，利用元素尺寸，可视窗口尺寸来做

- 代码

  ```js
  box.onmousedown = function() {
      console.log("down");
      document.onmousemove = function(e) {
          // console.log("move");
          var x = e.clientX - box.offsetWidth / 2
          var y = e.clientY - box.offsetHeight / 2
  
          if (y <= 0) y = 0
          if (x <= 0) x = 0
  
          if (x >= document.documentElement.clientWidth - box.offsetWidth) x = document.documentElement.clientWidth - box.offsetWidth
  
          if (y >= document.documentElement.clientHeight - box.offsetHeight) y = document.documentElement.clientHeight - box.offsetHeight
  
          box.style.left = x + "px"
          box.style.top = y + "px"
      }
  }
  box.onmouseup = function() {
      console.log("up");
      document.onmousemove = null
          }
  ```

### 08DOM事件流

<img src="/Users/liminghao/Library/Application Support/typora-user-images/Screenshot 2023-02-10 at 21.43.33.png" alt="Screenshot 2023-02-10 at 21.43.33" style="zoom:25%;" />

- 标准的dom事件流：

  - 捕获：window->document->body->...
  - 目标：inner
  - 冒泡：outer->body->document->window

  

  - 默认情况下：只在冒泡时触发
  - 按照dom2事件绑定，并进行配置，才能看到捕获的回调函数被触发
  - Inner.addEventListener("click",function(){},true) // 捕获触发

### 09阻止事件传播

- 代码

  ```js
  function handler(e) {
      this.parentNode.remove()
      // 阻止事件传播
      e.stopPropagation()
  }
  ```

### 10阻止事件默认

- 代码

  ```js
  // dom0 return false 阻止默认行为
  document.oncontextmenu = function() {
      console.log("右键单击，自定义右键菜单");
      return false
  }
  
  // dom2 e.preventDefault
  document.addEventListener("contextmenu", function(e) {
      console.log("右键单击，自定义右键菜单");
      e.preventDefault()
  })
  ```

### 11右键自定义菜单

- 逻辑

  - 清除右键默认行为
  - 利用clientX和clientY来计算距离左上角的坐标，减去元素的长宽offsetHeight和offsetWidth，防止越过视口。

  ```js
          document.addEventListener("contextmenu", function(e) {
              e.preventDefault()
              list.style.display = "block"
              var x = e.clientX
              var y = e.clientY
              if (x >= document.documentElement.clientWidth - list.offsetWidth)
                  x = document.documentElement.clientWidth - list.offsetWidth
              if (y >= document.documentElement.clientHeight - list.offsetHeight)
                  y = document.documentElement.clientHeight - list.offsetHeight
              list.style.left = x + "px"
              list.style.top = y + "px"
          })
  
          document.addEventListener("click", () => {
              list.style.display = "none"
          })
  ```

## 03DOM事件委托

- 因为我们的冒泡机制，点击子元素的时候，会触发父元素的相同事件，所以我们就可以把子元素的事件委托给父元素来做

- 事件触发：
  - 点击子元素的时候，不管子元素有没有点击事件，只要父元素有点击事件，那么就可以触发父元素的点击事件
- target：
  - target这个属性是事件对象里面的属性e，表示你点击的目标
  - 当你触发点击事件的时候，你点击在哪个元素上，target就是哪个元素

```js
list.onclick = function(e) {
    console.log(e.target);
    if (e.target.nodeName === "BUTTON") {
        e.target.parentNode.remove()
    }
}

// 减少多个函数的绑定的性能损耗
// 动态添加li，也会有事件处理
```

