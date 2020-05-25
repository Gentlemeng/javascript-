# javascript高级程序设计
## 第六章-面向对象的程序设计
### 6.1 理解对象（P138）
``` 
/*定义访问器属性 Object.defineProperty接受三个参数：属性所在的对象，
属性的名字和一个描述符对象（属性描述符或访问器描述符）*/
    let book = {
        _year:2004,
        edition:1
    }
    Object.defineProperty(book,'year',{
        get:function(){
            return this._year
        },
        set:function(newValue){
            if(newValue>2004){
                this._year = newValue;
                this.edition += newValue - 2004
            }
        }
    })

    book.year = 2005
    alert(book.edition); //2
```
```
/* 定义多个属性 Object.defineProperties接受两个对象参数：
第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个
要添加或修改的属性一一对应*/
    var book = {};
    Object.defineProperties(book,{
        _year:{
            value:2004
        },
        edition:{
            value:1
        },
        year:{
            get:function(){
                return this._year;
            },
            set:function(newValue){
                if(newValue>2004){
                    this._year = newValue;
                    this.edition += newValue - 2004
                }
            }
        }
    })
```
```
// 读取属性的特性 接受两个参数：属性所在对象和要读取其描述符的属性名称
    Object.getOwnPropertyDescriptor(book,"_year")
```
### 6.2 创建对象(P144) 
##### 虽然Object构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象会产生大量重复代码。未解决这个问题，人们开始使用工厂模式的一种变体。
#### 6.2.1 工厂模式
##### 考虑到在ECMAscript中无法创建类，开发人员就发明了一种函数，用函数来封装以特定接口创建对象的细节
```
    // 工厂模式
    function createPerson(name,age,job){
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function(){
            alert(this.name);
        }
        return o;
    }
    var person1 = createPerson("Nicholas",29,"Software Engineer");
    var person2 = createPerson("Greg",27,"Doctor");
```
##### 工厂模式虽然解决了创建多个相似对象的问题，但是却没有解决对象识别的问题（即怎样知道一个对象的类型）。随着javascript的发展，有一个新模式出现了。
#### 6.2.2 构造函数模式
##### 像Object和Array这样的原生构造函数，在运行时会自动出现在执行环境中。也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。例如，使用构造函数模式重写前面的例子
```
    function Person(name,age,job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function(){
            alert(this.name)
        }
    }
    var person1 = new Person("Nicholas",29,"Software Engineer");
    var person2 = new Person("Greg",27,"Doctor");
```
##### Person()中的代码除了与createPerson()中相同的部分外，还存在一下不同之处：
    - 没有显示地创建对象
    - 直接将属性和方法赋给了this对象
    - 没有return语句
##### 此外函数名Person使用的是大写字母P，主要区别于其他函数；因为构造函数本身也是函数，只不过可以用来创建对象而已。
##### 要创建Person的新实例，必须使用new操作符。以这种方式调用构造函数实际上会经历以下4个步骤
（1）创建一个新对象

（2）将构造函数的作用于赋给新对象（因此this就指向了这个新对象）

（3）执行构造函数中的代码（为这个新对象添加属性）

（4）返回新对象
##### person1和person2这两个对象都有一个constructor（构造函数）属性，指向Person。对象的constructor属性最初是来表示对象类型的。但是提到检测对象类型，还是instanceof操作符要更可靠一些。
```
    alert(person1 instanceof Object) //true
    alert(person1 instanceof Person) //true
    alert(person2 instanceof Object) //true
    alert(person2 instanceof Person) //true
```
#### 创建自定义的构造函数意味着将来可以将他的实例标识为一种特定的类型；而这正式构造函数胜过工厂模式的地方
1.将构造函数当做函数

2.构造函数的问题 ：每个方法都要在每个实例上重新创建一遍

#### 6.2.3 原型模式（P147）



