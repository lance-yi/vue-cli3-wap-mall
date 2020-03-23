# vue-wap init

## Project setup
```
npm install
or
yarn install
```

### Compiles and hot-reloads for development
```
npm run serve
or
yarn serve
```

### Compiles and minifies for production
```
npm run build
or
yarn build
```

### Lints and fixes files
```
npm run lint
or
yarn lint
```

## 主要功能

- 使用vue-rooter路由
- 使用vuex状态管理
- 使用Vant UI组件
- 使用postcss-pxtorem插件，对样式px进行转换为rem
- 使用淘宝amfe-flexible适配布局
- 使用sass预编译插件
- 使用babel es6转换插件
- 使用eslint语法检测
- 封装axios库，针对不同服务器，请求方式进行了简单的封装，直接在 `main.js` 全局注册到 `vue.prototype` 下,组件直接通过 `this` 访问

## 文档结构说明

- `src`
  - `api`: http请求相关的操作放在该文件下
  - `assets`: 资源文件
    - `images`: 项目中需要使用的图片文件（默认会打包成base64格式）,请按项目模块将资源放在不同模块下
    - `scss`: 样式资源文件
      - `js-base.scss`: 全局通用样式 在`app.vue`入口文件引用
      - `js-variable.css`: 全局scss变量，便于全局控制主体和同一规格，各个模块样式文件必须导入改包，其中的变量可以增加
      - `index`: 模块文件
  - `components`: vue 自定义组件，由于使用了vant ui组件，如有需要多次封装或者无法满足的条件的组件，依旧按照划模块创建目录
  - `plugins`: 插件文件
  - `utils`: 工具包
    - `index.js`: 所有工具集合导出的出口，全局挂载在到`vue.prototype`下，在`main.js`中引用，即可全局访问，也可以不通过这个出口，在你需要的组件中导入你写`utils`包，使用即可。
  - `views`: 单文件组件（视图文件），依旧按照模块创建目录
  - `router.js`: vue路由管理，除了首页其余全部异步加载
  - `store.js`: 全局状态管理，如后期比较大，解决方案： 创建`store`状态管理文件夹，并按模块划分，存储状态。


## 团队开发规范

#### 相关技术点和插件说明

  - `Vant UI` vue组件
  - `Lodash.js` 一个一致性、模块化、高性能的 JavaScript 实用工具库。
  - `NPM` or `yarn` 工具包，建议都安装上
  - `EsLint` 语法监测
  - `vue-rooter` 路由管理
  - `vuex` 状态管理
  - `postcss-pxtorem` px转rem工具（**注意：默认字体大小16px, 根元素字体大小: 37.5px, 配合`amfe-flexible`来达到设配，在写样式的时候，记得使用`设计图宽度/2`进行编写**）
  - `sass` or `less` 都进行了配置，使用sass编写样式
  - `babel es6` es6语法在低版本流量器中兼容，IE>=8

#### 命名规则:
  1. Vue组件和视图: `Pascal Case`大驼峰式命名法;eg: OrderDetail.vue、NoticeBar.vue
  2. js文件: `Camel Case` 小驼峰式命名法;eg: baseUtils.js
  3. css文件: 文件包含多个单词时，单词之间建议使用半角的连词线 ( - ) 分隔
  4. 文件夹:
    - 文件名建议只使用小写字母,不使用大写字母；
    - 文件名包含多个单词时，单词之间建议使用半角的连词线 ( - ) 分隔；
    - 引入资源使用相对路径，不要指定资源所带的具体协议 (http:,https:)
  5. 函数：
    - `Camel Case`
    - 前缀为动词： get、set、is、can、has...
  6. 常量：
    - 全部大写
    - 使用大写字母和下划线来组合命名，下划线用以分割单词。 eg: var MAX_COUNT = 10;
  7. 类成员变量：
    - 私有属性使用前缀为下划线(_)

#### 注释规范
  1. 函数注释（功能，时间、版本、作者）
  2. 组件注释功能

#### css样式规范
  1. 文件命名：eg: js-base.scss
  2. clss命名：模块-功能-部位__特征 or 功能-部位--描述  eg:  goods-info 、 goods-info-order 、 goods-info-order__title or notice-bar--content ...

#### js规范
  1. 避免全局命名空间污染
  2. 使用严格模式
  3. js声明提前
  4. 使用严格等 `===`
  5. 设置默认参数
  6. 不使用eval()函数

#### 其他情况说明
  1. `vue-router` 使用异步加载路由组件;
  2. `js-base.scss` 全局样式多看看，不要在class中敲重复的代码;
  3. 设计页面中，复用的地方，封装成组件，按需引入;
  4. 全局函数和插件设计，进行提炼和封装
  5. 每个视图对应的样式，使用@import url方式引入，减少单文件组件的代码长度
  6. `vue.config.js`文件说明：
     - 由于是整合开发，所以路由模式不能用history模式，只能用hash模式
     - `modifyVars`: vant ui组件主题的一个修改，对对应的变量参数进行修改

#### !!!警告!!!

- `nodejs` api 接口参数，params为空的时候，字段必须传 ` '{}' `
-


## Page Writing Time：

  ```javascript
  @author   Lance YI
  @time   2019-8-8
  @version 1.0.0
  ```
