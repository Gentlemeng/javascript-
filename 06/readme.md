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
##### （1）创建一个新对象

##### （2）将构造函数的作用于赋给新对象（因此this就指向了这个新对象）

##### （3）执行构造函数中的代码（为这个新对象添加属性）

##### （4）返回新对象
##### person1和person2这两个对象都有一个constructor（构造函数）属性，指向Person。对象的constructor属性最初是来表示对象类型的。但是提到检测对象类型，还是instanceof操作符要更可靠一些。
```
    alert(person1 instanceof Object) //true
    alert(person1 instanceof Person) //true
    alert(person2 instanceof Object) //true
    alert(person2 instanceof Person) //true
```
#### 创建自定义的构造函数意味着将来可以将他的实例标识为一种特定的类型；而这正式构造函数胜过工厂模式的地方
##### 1.将构造函数当做函数

##### 2.构造函数的问题 ：每个方法都要在每个实例上重新创建一遍

#### 6.2.3 原型模式（P147）
##### 我们创建的每个函数都有一prototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。prototype就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是**可以让所有对象实例共享它包含的属性和方法**。换句话说，不必在构造函数中定义对象实例信息，而是直接添加到原型对象中。
```
    function Person(){}
    Person.prototype.name = "Nicholas"
    Person.prototype.age = "29"
    Person.prototype.job = "Software Engineer"
    Person.prototype.sayName = function(){alert(this.name)}
    var person1 = new Person()
    var person2 = new Person()
    alert(person1.sayName == person2.sayName) //true
```
1.理解原型对象（P148）

isPrototypeOf():确定原型对象与实例之间关系
    
     alert(Person.prototype.isPrototyprOf(person1)) // true

ECMAscript5增加了一个新方法：Object.getPrototypeOf 返回对象的原型

    alert(Object.getPrototyOf(person1) == Person.prototype) //true

##### 每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是给定名字的属性。首先从**对象实例**本身开始，然后搜索指针指向的原型对象。
##### 虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。
##### 可以使用delete操作符完全删除实例属性，从而能够重新访问原型中的属性。
hasOwnProperty:检测属性是存在于实例中，还是原型中。存在于实例中才返回true

***ECMAscript5的Object.getOwnpropertyDescriptor()方法只能用于实例属性，要想取得原型属性的描述符，必须直接在原型对象上调用该方法***

2.原型与in操作符
##### 有两种方式使用in操作符：单独使用和在for-in中循环中使用。单独使用时，in操作符会在通过对象能够访问给属性时返回true，无论属性存在实例中还是原型中。

``` 
//确定属性是否存在于原型中
fucntion hasPrototypeProperty(object,name){
    return (name in object) && !object.hasOwnProperty(name)
}
```
##### 在使用for-in循环时，返回的是所有能够通过对象访问的、可枚举的（enumerated）属性，既包括实例中，也包括原型中的。**屏蔽了原型中不可枚举属性的实例属性也会在for-in循环中返回，因为根据规定，所有开发人员定义的属性都是可枚举的——只有IE8以及更早版本中例外。
##### Object.keys()接受一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。
##### Object.getOwnPropertyNames()返回所有实例属性，无论它是否可枚举
3.更简单的原型语法
```
function Person(){}
Person.prototype = {
    name:"Nicholas",
    age:29,
    job:"Software Engineer",
    sayName:function(){alert(this.name)}
}
//constructor属性变成了新对象的constructor属性（指向Object构造函数）不再指向Person。
```
##### 再进一步
```
Person.prototype={
    constructor:Person,
    ...
}
```
##### 以上特意包含了一个constructor属性，并设置为Person，虽然确保了通过该属性能够正确访问到适当的值。但是会导致它的[[enumerable]]特性被设置为true。默认原生的constructor属性是不可枚举的，试一下Object.defineProperty()
```
Object.definePerproty(Person,"constructor",{
    enumerable:false,
    value:Person
})
```
4.原型的动态性
##### 由于在原型中查找值的过程是一次搜索，因此对原型对象所做的任何修改都能够立即从实例上反映出来——即使是**先创建了实例后修改原型**也是照样如此。（实例与原型之间只不过是一个指针，而非副本）
##### 尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反应出来，但是如果是重写整个原型对象，那么情况就不一样了。调用构造函数时会为实例添加一个指向最初原型对象的[[prototype]]指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。**实例中的指针仅指向原型，而不指向构造函数**（P157）
5.原生对象的原型

***不推荐产品化的程序中修改原生对象的原型***

6.原型对象的问题
##### 对于包含引用类型值的属性来说，所有实例中会共享这个属性
```
Person.prototy = {
    ...
    friends:["shelby","court"],
    ...
}
var person1 = new Person();
var person2 = new Person();
person1.friends.push("van");
alert(person1.friends) // "shelby","court","van"
alert(person2.friends) // "shelby","court","van"
// 鉴于此，很少有人单独使用原型模式
```
#### 6.2.4 组合使用构造函数模式和原型模式（P1159）
##### 创建自定义类型最常见的方式。构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性。结果，每一个实例会有自己的一份实例属性副本，但又共享着对方法的引用。最大限度的节省了内存。
```
function Person(name, age, job){     
    this.name = name;     
    this.age = age;     
    this.job = job;     
    this.friends = ["Shelby", "Court"]; 
} 
 
Person.prototype = {     
    constructor : Person,     
    sayName : function(){         
        alert(this.name);     
    } 
} 
 
var person1 = new Person("Nicholas", 29, "Software Engineer"); 
var person2 = new Person("Greg", 27, "Doctor"); 
 
person1.friends.push("Van"); 
alert(person1.friends);    //"Shelby,Count,Van"
 alert(person2.friends);    //"Shelby,Count" 
alert(person1.friends === person2.friends);    //false 
alert(person1.sayName === person2.sayName);    //true
```

**这种构造函数与原型混成的模式，是目前在 ECMAScript中使用广泛、认同度高的一种创建自 定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。**
#### 动态原型模式（P159）
#### 寄生构造函数模式（P160）
##### 基本思想：创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象。
```
    function Person(name){
        var o = new Object();
        o.name = name;
        o.sayName = function(){
            alert(this.name);
        }
        return o;
    }
    var friend = new Person("Nicholas");
    friend.sayName(); // "Nicholas"
    // 除了使用new操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样。
    //构造函数在不返回值的情况下，默认会返回新对象实例。而通过构造函数的末尾添加一个return语句，可以重写调用构造函数时返回的值。
```
##### 这个模式可以在特殊情况下用来**为对象创建构造函数**。假设想创建一个具有额外方法的特殊数组。由于不能直接修改Array构造函数，因此可以用这个模式
```
    function SpecialArray(){
        //创建数组
        var values = new Array();
        //添加值
        values.push.apply(values,arguments);
        //添加方法
        values.toPipedString = function(){
            return values.split("|");
        }
        return values;
    }
    var colors = new SpecialArray("red","yellow","blue");
    alert(colors) // "red|yellow|blue"
```
##### 关于寄生构造函数，返回的对象与构造函数或者与构造函数的原型属性之间没有关系；也就是说构造函数返回的对象与在构造函数外部创建的对象没有什么不同。为此，不能依赖instanceof操作符来确定对象类型。（可以使用其他模式的情况下，不要使用这种模式）
#### 6.2.7 稳妥构造函数模式
##### 道格拉斯.克罗克福德发明了Javascript的稳妥对象。所谓稳妥对象指的是没有公共属性，而且其方法也不引用this。与寄生构造函数模式类似，但有l两点不同：新创建的对象的实例方法不引用this;二是不使用new操作符调用构造函数
```
    function Person(){
        var o = new Object()
        //可以在这里定义私有变量和函数

        o.sayName = function(){
            alert(name);
        }
        return o;
    }
    // 除了使用sayName方法之外，没有其他办法访问name的值
    var friend = Person("Nicholas")
    friend.sayName(); // "Nicholas"
```
##### 稳妥构造函数提供这种安全性，使得非常适合在某些安全执行环境下使用
### 6.3 继承(P162) 
##### ECMAScript只支持实现继承，主要是依靠原型链实现。
#### 6.3.1 原型链
##### 原型链继承基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法。
##### 原型链概念：每个构造函数都有一个原型对象，原型对象包含一个指向构造函数的指针（constructor），而实例包含一个指向原型对象的内部指针（[[prototype]]）。假如我们让原型对象等于另一个类型的实例，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。
```
    function SuperType(){
        this.property = true;
    }
    SuperType.prototype.getSuperValue = function(){
        return this.property;
    }
    function SubType(){
        this.subproperty = false;
    }
    //继承了SuperType 重写原型对象，代之以一个新类型的实例
    SubType.prototype = new SuperType()
    SubType.prototype.getSubValue = function({
        return this.subproperty;
    })
    var instance = new SubType();
    alert(instance.getSuperValue()); //true
```
![原型链基本实现：实例以及构造函数和原型之间的关系]('https://github.com/Gentlemeng/javascript-/blob/master/06/img/6-4.jpg')








