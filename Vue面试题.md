# Vue核心原理总结

## 01. MVVM的理解

MVVM 由 Model，View，ViewModel 三部分构成，Model 代表数据模型，View 代表 UI组件，ViewModel 负责同步 View 和 Model(双向绑定)，Model 变化了，View 会自动跟着变化，同样的 View 变化了，Model 也会跟着变化。

补充：为什么 Vue 的官网说 Vue 没有完全遵循 MVVM 的思想？

严格的 MVVM 要求 Model 和 View 是不能直接通信的，但是 Vue 提供了 $refs 属性，让 Model 可以直接操作 View

## 02. 数据响应式

1. 首先判断数据的类型，如果是基础数据类型，直接返回，如果已经有 `__ob__` 属性，表示已经是响应式的数据了，直接返回该数据。如果是对象就走第2步，如果是数组就走第3步
2. 对象是通过 Object.defineProperty，在 getter 里收集依赖，在 setter 里触发更新
3. 数组是首先拷贝数组的原型，然后基于拷贝的原型改写(push,pop,unshift,shift,sort,reverse,splice)七个可以改变数组长度的方法，然后将改写后的原型赋给数组的隐式原型
4. 对数组的隐式原型赋值后，还要观测数组的每一项，重复第一步
5. 如果 Object.defineProperty 的 setter 里赋值，如果新赋的值是对象，也要进行观测
6. 如果对数组的操作是有数据新增(push,unshift,splice)，还需要观测数组新增的每一项，同第4步(这里Vue源码的实现是给每个响应式数据[对象和数组]新增了一个不可枚举的属性 `__ob__`，它的作用有三，其一是用来判断数据是否已经是响应式的数据，如果是就不需再次观测，其二是属性 `__ob__` 是 Observer 类的一个实例，实例上有对数组每一项进行响应式处理的方法)，其三是 $set 方法中，`__ob__` 用来判断要设置属性的对象是不是响应式的对象，如果它本身就不是响应式对象，则该属性无需定义为响应式的属性

对象是在 Object.defineProperty 的 getter 里进行依赖的收集，在 setter 里触发更新。具体是通过观察者模式，每一个属性都有一个 Dep 类的实例，Dep.target 有值即指向 watcher 的时候，在 dep 内收集 watcher，并且在 watcher 内收集 dep，dep 和 watcher 是多对多的关系，因为一个组件会有多个属性，而 watcher 是组件级的，所以 一个 watcher 可能对应多个 dep ，dep 可能对应多个组件，组件内部的 computed 和 watch 都是 watcher。
不管是根组件还是非根组件(函数)，它们的 data 最终的值都是对象，所以只会在 data 最外层对象的某些属性值是数组，所以在 Object.defineProperty 的 getter 里对数组进行依赖收集，我们知道依赖的收集是调用 dep 类上收集依赖的方法，Vue 的做法是在创建 Observer 类的实例的时候，定义了一个属性 dep，dep 是 Dep 类的实例。对于多维数组和数组新增的数据，Vue 的做法是，在创建 Observer 类的实例的时候，设置了一个不可枚举的属性 __ob__ ，它的值是 Observer 类的实例，所以我们在对多维数组进行依赖收集的时候，可以调用 __ob__ 的 dep 的方法，对于数组新增的数据，调用 __ob__ 上的方法对数组的每一项做数据响应式，并且调用 __ob__.dep 上的 notify 方法触发更新。

### 2.1 数据初始化的顺序：props -> methods -> data -> computed -> watch

data 中能否直接访问 props 中的数据？

可以，因为 data 是在 props 之后初始化的

### 2.2 通过对 data 进行递归的 Object.defineProperty() 对对象的每一个 key 做数据劫持和派发更新

- 如果 data 的层级过深会影响性能
- 对象有新增和删除属性没办法做数据的响应式处理(通过$set解决)
- 如果给对象的属性赋值为对象，也会对赋值后的对象进行响应式处理

### 2.3 data 中数组的响应式处理是通过改写数组原型上的七个方法(push/pop/shift/unshift/sort/reverse/splice)

- 在重写数组原型之前，Vue 给每个响应式数据新增了一个不可枚举的 __ob__ 属性，这个属性指向了 Observer 实例，可以用来防止已经被响应式处理的数据反复被响应式处理，其次，响应式的数据可以通过 __ob__ 获取到 Observer 实例的相关方法
- 对于数组的新增操作(push/unshift/splice)，会对新增的数据也做响应式处理
- 通过索引修改数组内容和直接修改数组长度是观测不到的

## 03. Vue如何进行依赖收集的？

1. 每个属性都有 dep 实例，dep 实例用来收集它所依赖的 watcher
2. 在模板编译的时候，会取值触发依赖的收集
3. 当属性发生变化时会触发 watcher 更新

## 04. Vue的更新粒度是组件级？

首先渲染 watcher 是组件级的。在初始化的时候，会调用 _init 方法，_init 内部会调用 $mount 方法，$mount 方法会调用 mountComponent 方法，mountComponent 方法内部定义了 updateComponent 方法，updateComponent 方法内部就是调用 _update 方法将 vnode 渲染成真实 DOM，mountComponent 方法会 new 一个渲染 watcher，并把 updateComponent 传给渲染 watcher ，所以渲染 watcher 可以重新渲染DOM(试想一下，如果我们没有把更新DOM渲染的方法传递给 watcher ，更改数据后，我们需要手动去调用DOM渲染的方法；传递给 watcher 后，数据变化后，可以让 watcher 自动的去调用更新DOM渲染的方法)

在 render 函数生成 vnode 时，会判断是否是原生的HTML标签，如果不是原生HEML标签即是 `组件`，会创建组件的 vnode，子组件本质是 VueComponent 函数，VueComponent 内部会调用 _init 方法，所以创建子组件 vnode 的时候，也会 new 一个渲染 watcher，所以说渲染 watcher 是组件级的，也就是说 Vue 的更新粒度是组件级的

## 05. 模板编译原理

注意一：我们平时开发中使用的是不带编译的 Vue 版本(runtime-only)，所以在传入选项的时候是不能使用 template 的

注意二：我们 .vue 文件中的 template 是经过 vue-loader 处理的，vue-loader 其实也是使用 vue-template-compiler 处理的

1. 如果选项 options 里有 render 直接使用 render，如果没有 render 看选项里有没有 tempalte，如果有就用 template，如果没有就看选项里有没有 el，如果有 template = document.querySelector(el)，最后用 compileToFunctions(tempalte) 生成render

最终都是生成 render 函数，优先级是 render > tempalte > el

2. 模板编译的整体逻辑主要分为三个部分：

  - 第一步：将模板字符串转换成 element ASTs (解析器)
  - 第二步：对 AST 进行静态节点标记，主要用来做虚拟 DOM 的渲染优化 (优化器)(进行新旧vnode对比的时候可以跳过静态节点)
  - 第三步：使用 elements ASTs 生成 render 函数代码字符串 (代码生成器)

## 05.1 生成 AST 的过程

其实就是 while 循环里不断的通过正则匹配字符串，如果是匹配到是开始标签，就触发 start 钩子处理开始标签和属性，如果匹配到文本，就触发 chars 钩子处理文本，如果匹配到结束标签，就调用 end 钩子处理结束标签。处理完后就把模板中已经匹配到子串截取出来，一直这样循环操作，直到模板的字符串被截取成空串跳出 while 循环。

在匹配到开始标签后，就把开始标签压入栈中，匹配到结束标签就把栈顶元素出栈。第一个进栈的元素就是根节点，除了第一根元素外，其他元素在进栈之前，栈顶的元素就是该元素的父亲节点，所以可以维护元素之间的父子关系(入栈元素的parent是栈顶元素，该入栈元素是栈顶元素的儿子)，当栈被清空之后，根节点就是生成的 AST
匹配到文本内容是没有子节点的，所以它直接作为栈顶元素的儿子即可。

### 解析器运行过程

AST 是用 JS 中的对象来描述节点，一个对象代表一个节点，对象的属性用来保存节点所需的各种数据。

解析器内部分了好几个子解析器，比如 HTML解析器，文本解析器，过滤器解析器。其中最主要的是 HTML解析器，HTML解析器的作用就是解析HTML，它在解析的过程中会不断的触发各种钩子函数。这些钩子函数包括，开始标签钩子函数(start)、结束标签钩子函数(end)，文本钩子函数(chars)和注释钩子函数(comment)。

实际上，模板解析的过程就是不断的调用钩子函数的过程，读取 template，使用不同的正则表达式匹配到不同的内容，然后触发对应的钩子函数处理匹配到的字符串截取片段。比如比配到开始标签，触发 start 钩子函数，start 钩子函数处理匹配到开始标签片段，生成一个标签节点添加到抽象语法树上。

HTML解析器解析HTML的过程就是循环(while循环)的过程，简单来说就是利用 HTML 模板字符串来循环，每轮循环都从 HTML字符串中截取一小段字符串，重复以上过程，一直到 HTML字符串被截取成一个空串结束循环，解析完毕。

在解析开始标签和结束标签是用栈来维护的，解析到开始标签就压入栈中，解析到结束标签，就从栈顶取出对应的开始标签的AST，栈顶的前一个开始标签就是该标签的父元素，然后就可以建立父子元素之间的关系。

文本解析器是对 HTML 解析器解析出来的文本进行二次加工。文本分为两种类型，一种是纯文本，一种是带变量的文本。HTML解析器在解析文本的时候，并不会区分是纯文本还是带变量的文本，如果是纯文本，不需要进行任何处理，带变量的文本需要文本解析器的进一步解析，因为带变量的文本在使用虚拟DOM进行渲染时，需要将变量替换成变量中的值。

文本解析器通过正则匹配出变量，把变量改写成 _s(x)的形式添加到数组中

## 初始渲染原理

1. 首先是生成 render 函数
2. vm._render 函数生成虚拟DOM
  render 函数主要返回了这样的代码 _c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))，所以需要定义 _c, _v, _s 这样的函数才能真正转换成虚拟DOM
3. vm._update 方法将生成的虚拟DOM进行实例挂载
  update 方法的核心是利用 patch 方法来渲染和更新视图，这里是初次渲染，patch 方法的第一个参数是真实DOM，更新阶段第一个参数是 oldVnode

## 06. 生命周期钩子(Hook)是如何实现的？

生命周期钩子就是回调函数，在创建组件实例的时候，会在相应的时间节点(渲染的不同时期)调用这些钩子函数；Vue内部会对这些钩子函数进行处理，在内部将钩子函数维护成数组

## 07. Vue.mixin 的使用场景和原理

- Vue.mixin的作用就是抽离公共的业务逻辑，原理类似 “对象的继承”，当组件初始化的时候会调用 mergeOptions 方法进行合并，对于不同的 key(data,hooks,components...)有不同的合并策略。如果混入的数据和组件本身的数据有冲突，会采用“就近原则”，以组件本身的为准。
- mixin有很多的缺陷：命名冲突，来源不清晰，依赖问题

## 08. Vue 组件中的 data 为什么必须是一个函数？

组件可能被多个地方使用，如果 data 是一个对象，那么多个组件之间的 data 共用的是一个引用，在某个地方修改了 data 中的数据，其他地方也会跟着修改。data 使用一个函数，组件在每个地方被使用都是返回一个新的对象(新的引用地址)，这样彼此之间不会互相影响

## 09. nextTick 在哪里使用？原理是什么？

- nextTick 可用于获取更新后的 DOM
- Vue的数据更新是异步的，会把所有的数据更新操作都放入任务队列中，然后在 nextTick 中去依次执行这些任务，nextTick 是一个异步任务，采用的是优雅降级(Promise -> MutationObserver -> setImmediate -> setTimeout)

## 10. computed 和 watch 的区别

- computed 和 watch 都是基于 watcher 实现的
- computed 是具有缓存的，依赖的值不发生变化，不会重新计算值
- watch 是监控值的变化，当值变化后就调用对应的回调函数

## 11. watch 原理

1. watch 的使用方式，可以是对象，可以是函数，也可以是数组
2. 不论是哪种使用方式，watch 的每一个属性对应的函数(数组的使用方式，数组中的每一项(函数))都是一个 用户watcher，其实现都是调用的 `$watch(vm, handler)`
3. $watch 方法的实现都是 `new Watcher()`，只不过是 options 参数里标记了是用户自定义的 watcher(`options.user = true`)
4. watch 的属性对应的函数里有新值和旧值，我们是如何返回新值和旧值的呢？
5. new Watcher() 的时候传递的是属性的 key，我们要把它包装成一个函数(函数内部就是根据 key 取值)，赋值给 Watcher类的 getter 属性，在 Watcher 类实例化的时候，会调用一次 get 方法，我们就可以拿到它的值(取值同时会进行依赖收集)
6. 在值更新后，会再次调用 Watcher 类的 get 方法获得新值
7. 然后判断 watcher 的类型，如果是用户 watcher ，执行 callback，把新值旧值传递给 callback

watch api 不管是哪种使用方式，最终都是一个 key, 一个函数，对应一个 user watcher ，每一个 watcher 都有一个 getter 方法，watch api 对应的 getter 方法是根据 key 来封装的，getter 方法就是取 key 对应的数据，因为 watcher 在初始化的时候默认会调用一次 getter ，所以就拿到 key 对应的旧值了，取值也就进行了依赖收集，当 key 对应的数据改变了，watcher 的 getter 方法会再次执行，这时就拿到了新值，然后调用 key 对应的回调函数，将新值和旧值传给它

## 12. computed 原理

1. 每个计算属性本质上也是一个用户 watcher，在它取值的时候进行依赖收集，computed 依赖的值改变后触发更新
2. 计算属性的 watcher 在初始化的时候会有两个属性 lazy 和 dirty
3. watcher 在初始化的时候，会默认调用一次 get 方法，但是 computed 默认是不执行的，所以用 lazy 属性来标记是 computed watcher
4. computed 是有缓存的，即依赖的值没有发生改变，多次获取，是不会多次调用 watcher 的 get 方法获取值的，所以用 dirty 属性来标记是否需要重新计算值，如果不需要计算，直接返回 watcher 的 value，如果需要计算，再来调用 get 方法获取新的值，再返回 watcher 的 value

补充：什么时候 dirty 的值是 true 呢？

- computed watcher 初始化的时候
- computed watcher 依赖的值改变时(调用了 computed watcher 的 update 方法，即可表示依赖的值改变了)

## 13. Vue.set的实现原理

Vue.set 是为了解决给对象新增属性，以及直接通过索引修改数组时，数据不是响应式的问题

- 如果是通过索引来修改数组，会使用数组的 `splice` 方法替换对应索引的操作
- 如果是对象，通过 defineReactive 方法将新增属性定义为响应式的数据

## 14. 虚拟DOM的作用

- 虚拟DOM就是用JS对象来描述真实DOM，是对真实DOM的抽象
- 由于直接操作DOM性能低，但是JS的操作效率高，可以将对 DOM 的操作转化为对JS的操作，最终通过 diff 算法比对差异进行更新DOM
- 虚拟DOM不依赖真实的平台环境，从而可以实现跨平台

## 15. diff算法

Vue的diff算法是平级比较，不考虑跨级比较的情况。内部采用深度递归和双指针的方式

- 首先比对是否是相同的节点，如果不是删除旧的DOM，生成新的DOM插入
- 如果是相同的节点，比对更新属性
- 判断是否是文本节点，如果是，判断文本内容是否相同，不同更新文本内容
- 比对新旧子节点，如果只有新的有子节点，新增子节点插入；如果只有旧的有子节点，将元素的 innerHTML 置为空
- 如果新旧都有子节点，比对新旧子节点(采用双指针)
- 依次是头头、尾尾、头尾、尾头比较，没有匹配到，就乱序比对
- 乱序比对：建立旧的节点的映射表(key->index)
- 新的起始节点是否能在旧的映射表中找到，不能找到直接在旧的前面插入，如果找到，将映射表找到的旧的节点，移动到前面，并将该位置置为null
- 因为在乱序比对中，有将旧节点置为 null 的情况，所以在进行子节点比对前，先判断该节点是否为null，为null顺移
- 比对完之后如果新的节点还有，插入新的节点(插入的位置要判断是否在哪里插入)，如果旧的节点还有，删除旧的节点(null的位置跳过)

## 16. 既然Vue通过数据劫持可以精准探测数据变化，为什么还需要虚拟DOM进行diff算法比对差异呢？

如果给每个属性都添加 watcher 用于更新的话，会产生大量的 watcher 从而降低性能。一个组件才有一个渲染 watcher 用于更新，降低了粒度，所以需要 diff 算法来比对差异

## 17. Vue中key的作用和原理，谈谈你的理解

- diff 算法比对差异的时候，会通过 tag 和 key 来判断是否是相同的节点，相同节点可以复用
- 无 key 的时候，tag 相同就会被当做是相同的节点，在更新的时候可能会导致问题(实际工作中有遇到下拉框选项内容不对的问题)
- 尽量不要用索引作为 key

## 18. 谈一谈对组件化的理解

- 组件化开发可以大幅提高应用开发效率、测试性、复用性等
- 常用的组件化技术：属性，自定义事件、插槽等
- 降低更新范围，只重新渲染变化的组件(Vue的更新是组件级的)
- 组件的特点：高内聚、低耦合、单向数据流

## 19. Vue组件的粒度越细越好吗？

在创建 vnode 的过程中，如果遇到组件，会创建组件 vnode，用来维护组件的状态和数据，拆分的粒度过细，导致组件嵌套层级过深，在应用的初始化时，会消耗更长的时间，并占用更多的内存空间

## 20. 异步组件的实现原理

所谓异步组件，就是刚开始渲染的时候是拿不到组件的实际内容，异步执行的时候才能拿到组件的实际内容

- 一开始渲染一个占位符
- 等组件的实际内容拿到之后，强制更新(局部更新)

## 21. 函数式组件的优势及原理

- 函数式组件的特性：无状态(data)、无生命周期、无this
- 函数式组件优势：性能更高(普通组件继承自Vue，创建vnode的需要new VueComponent，函数式组件直接执行render方法生成vnode)

## 22. 组件间的通信方式

- 父子：(props和$emit)、($parent和$children)、($attrs和$listeners`Vue2.4`)、$refs
- 祖代：provide和inject
- 兄弟: 通过父亲($parent.$emit/$parent.$on)
- 无任何关系：事件总线(evnet-bus)`发布订阅模式`
- vuex

### props和$emit的实现原理

子组件会把父组件提供的 props定义到自己的 _props 上，并且把 _props 上的数据代理到子组件自己的 vm 上，所以我们可以跟 data 中的数据一样，直接通过 this.xxx 访问 props 上的数据

### $parent和$children的实现原理

在子组件 initLifecycle 的时候，首先子组件自己不是抽象组件(抽象组件是不建立父子关系的)时，会在子组件的options里拿到parent，把parent设为自己的$parent，再把自己push到parent的$children中

### $attrs和$listeners的实现原理

在子组件 initRender 的时候，会给子组件定义个只读的响应式属性 $attrs，它的值是父组件 vnode 的 attrs，也会给子组件定义一个只读的响应式属性 $listeners，它的值是父组件 vnode 的 _parentListeners

### $refs的实现原理

- 如果是组件，ref的值组件的实例，如果是真实的HTML元素，ref的值是真实的HTML元素
- 如果 ref 是在 v-for 里定义的，ref的值就是一个数组

### provide和inject的实现原理

- provide 的组件会在实例上新增一个 _provided 属性提供数据
- inject 的组件会一直向上查找 $parent._provided 获取值
- 将找到所有值在定义到自己的身上

## 23. $attrs是为了解决什么问题出现的？

$attrs 的主要作用就是实现批量传递数据，组件A传递给组件B的数据，组件B没有在 props 中接收的话，就可以直接通过 $attrs 传递给组件C。$attrs 没有层级的限制，只要是祖代关系的组件都可以传递。

## 24. v-for 和 v-if 的优先级哪个高？

v-for 的优先级更高，在模板编译的时候，会先处理 v-for ，再处理 v-if 
v-if 会编译成三元表达式，如果值为false，就创建空节点

## 25. v-model 的实现原理

- 普通元素：[input/textarea => :value + @input] 、[checkbox/radio => :checked + @change]、[select => :value + @change]
- 组件：默认是 value + input，在model上可以通过 prop 和 event 修改名字

## 26. slot 的实现原理

- 普通插槽：父组件渲染完毕后替换子组件的内容(编译成_t(slotName)，_t(slotName)替换子组件中的vnode)
- 作用域插槽：子组件中渲染父组件中的内容(编译成_u([{}]))

## 27. Vue.use 是干什么的的？原理是什么？

Vue.use是用来注册插件的，可以扩展全局组件、指令、原型方法等

- Vue.use注册插件是单例模式的，已经注册过的插件不会重复注册，内部的 _installedPlugins 存储了所有注册过的插件
- Vue.use函数内部会判断插件的类型，如果是函数，直接执行该函数，如果是对象，会执行对象的install方法，并把Vue构造函数传给插件的install方法，这样插件内部可以使用Vue，而不需依赖Vue库

## 28. Vue 的事件修饰符有哪些？实现原理是什么？

- .stop
- .prevent
- .capture
- .self
- .once
- .passive

在模板编译的时候会给绑定的事件名前面加上一些标记符号(capture -> `!`, once -> `~`, passive -> `&`)
在给元素绑定事件的时候在去添加相应的配置

## 29. .sync 修饰符的原理

在模板编译的时候除了绑定的 value 还会添加 "update:value" 函数

## 30. 自定义指令的实现原理

- 在生成抽象语法树的时候，遇到指令会给当前元素添加 directives 属性
- 通过 genDirectives 生成指令代码
- 在 patch 前将指令的钩子提取到 cbs 中，在 patch 过程中，调用对应的钩子
- 当执行 cbs 对应的钩子时，调用指令定义的方法

## 31. keep-alive的实现原理

- 对于 keep-alive 的组件，首次渲染的时候会添加 keepAlive 标记
- 再次渲染的时候会判断时候有 keepAlive 属性，如果有直接返回 vnode

## 32. Vue中的性能优化有哪些？

- 数据层级不易过深(递归设置响应式数据)，合理设置响应式的数据(页面中用不到的数据没必要定义在 data 上)
- 使用数据时，合理缓存值的结果，而不是每次都去获取值
- 合理设置 key
- 合理使用 v-if 和 v-show
- v-for 和 v-if 不要使用在同一个元素上
- 合理使用异步组件(借助webpack的分包能力)
- 合理采用函数式组件(无状态组件可以使用函数式组件降低开销)
- 控制组件粒度(组件级更新)
- 使用 keep-alive 缓存组件

## 33. Vue中使用哪些设计模式

- 工厂模式 - 传入参数即可创造实例(vnode)
- 单例模式(插件注册)
- 发布订阅模式($emit,$on)
- 观察者模式(Dep,Watcher)
- 策略模式(mixin配置项和合并)
- 代理模式(Vue3 Proxy)
- 装饰器模式


## 34. Vue各个生命周期做了哪些事情？

1. beforeCreate

- 在 initLifecycle 里，给组件初始化了 $parent, $root, $children, $ref
- 在 initEvents 里，初始化了组件的事件监听
- 在 initRender 里，定义 $createElement 函数和 $attrs 和 $listeners

2. created

- 在 initInjections 里，初始化 inject
- 在 initState 里，初始化 props, methods, data, computed, watch
- 在 initProvides 里，初始化 provide

3. beforeMount

在定义 updateComponent 方法和 new Watcher(vm, updateComponent) 之前调用 beforeMount

4. mounted

在 new Wacther 之后调用 mounted，在 new Watcher 的时候将 updateComponent 方法传给了 watcher ，updateComponent 内部在生产环境就做了一件事情，就是调用 _update 方法将 _render 方法返回的 vnode 渲染成真实节点，挂载到页面上。渲染 watcher 在初始化实例的时候，默认会调用一次传入的函数。

总结：

  1. 在 beforeCreate 生命周期 里可以访问 $parent, $children, $root, $ref
  2. 在 created 生命周期里 可以访问 props, methods, data, computed





## 35. Vue的初始化渲染流程

- 首先是调用 _init 方法，init 方法里面初始化了状态(数据)，调用了 beforeCreate 和 created，最后调用 $mount 方法进行渲染
- $mount 方法里面调用 mountComponent 方法
- mountComponent 方法首先调用 beforeMount ，然后定义了 updateComponent 方法，接着 new Watcher 将 updateComponent 传给 watcher，最后调用 mounted
- updateComponent 方法在生成环境就做了一件事情，就是调用 _update 方法将 _render 方法生成的 vnode 渲染成真实节点，挂载到页面上
- _update 方法里面渲染的核心方法是 __patch__
- __patch__ 方法根据第一个参数是真实 DOM 元素还是 VNode 来判断是初次渲染还是更新渲染



## 36. Vue异步更新的原理

我们可能在一个操作中，可能修改一个或多个数据，一个属性对应一个 dep，一个属性它可能在模板中被访问，也可能在 computed 里面被访问，还可能在 watcher 中被访问，不管是在模板、computed 还是 watcher 中访问，它们都是相应的 watcher ，也就是说，该属性对应的 dep 会收集到多个 watcher ，当属性对应的数据改变后，这些 watcher 都应该执行 update 方法。所以我们应该把这些 watcher 先用队列收集起来，然后批量更新。


## 37. Vue.extend 方法的作用

Vue.extend 方法的作用是创建一个继承自 Vue 的类 VueComponent，它具有 Vue 所有的功能

- VueComponent 的原型是拷贝的 Vue 的原型，所以它具有 Vue 所有的功能
- VueComponent 的 options 合并了 Vue 的 options，所以通过 Vue.mixin 给 Vue options 扩展的选项，VueComponent 的 options 中也有
- VueComponent 函数内部就做了一件事，就是调用 Vue 的 _init 方法(VueComponent 也是一个 render watcher)



## 38. computed 里属性 c 依赖 data 中属性 a 和 属性 b 值，如果 c 的值并没有地方使用到，如果修改了 a 和 b 值，c 会重新计算吗？

不会。因为没有地方访问 c ，所以 c 就没有执行，也就是没有访问 a 和 b，a 和 b 的 dep 属性不会收集 c 的 computed watcher


## 39. Dep.target 为什么要用一个数组来维护呢？

因为 computed 里依赖的数据，不仅要收集 computed watcher ，也要收集渲染 watcher 。假设 Dep.target 不是用一个栈来维护的，当 computed 里的数据先被访问，data 中的数据后被访问，那么当模板编译的时候，访问到 data 中的数据时，此时该数据的 dep 收集到的只是 computed watcher ，那么当它的值改变后页面的值并不会更新。如果 Dep.target 用一个栈来维护，当 computed 取值完成后，computed watcher 的 get 方法执行后，此时 Dep.target 指向渲染 watcher

## vue-router有几种钩子函数，具体是什么及执行流程

钩子函数种类：全局守卫，路由守卫，组件守卫

流程：
1. 失活组件内部 `beforeRouteLeave`
2. 全局 `beforeEach`
3. 在重用的组件 `beforeRouteUpdate`
4. 在路由配置里调用 `beforeEnter`
5. 在激活组件里调用 `beforeRouteEnter`
6. 调用全局的 `beforeResolve`
7. 调用全局的 `afterEach`