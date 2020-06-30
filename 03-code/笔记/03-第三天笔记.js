/**
 * 
 * 1. Vue的开发,不仅可以通过在线或者本地的方式引入Vue的相关文件,同时也可以使用脚手架的方式进行Vue的开发,Vue开发的是单页面应用(SPA)
 * 
 * 2. vue-cli 工具(脚手架),用来做单页面应用开发(SPA)
 *   低版本:公司里有可能有一些项目就是用低版本的脚手架开发的,维护,开发
 *   高版本:升级,新的用法,开发
 * 
 * node -v 查看版本
 * npm -v 查看版本
 * 
 * 3. 脚手架安装
 *  脚手架2 安装的命令: npm install -g vue-cli   安装一次即可
 * vue -V 查看版本
 *  使用脚手架2 下载模版(工程): vue init webpack 工程的名字   
 * 
 * 
 * cd app 切换当前项目的目录
 * npm run dev  运行当前的项目 也可以使用  npm start
 * localhost:8080 地址 
 * 
 * -----------------------------运维:前端的帅哥,把你项目打包一份给我.
 * npm run build 打包  
 * 运行打包文件----测试打包是不是正常的
 * serve dist
 * 
 * build目录里面有webpack相关的一些配置, wepack.base.conf.js 中第25行中可以设置程序原型的主入口文件路径
 * config目录中index.js文件中第18行代码可以修改为true,表示的是运行项目后在浏览器中自动的打开(需要重启项目)
 * dist目录是项目的打包文件目录(需要进行打包才可以看得到)
 * node_modules 目录是当前的项目的依赖包目录
 * static目录 静态资源文件夹目录,页面中需要的所有的样式及一些图片资源或者图标字体都可以放在该目录中
 * .babelrc babel文件,可以做相关的配置及设置,js编译器(es6->es5)
 * 需要演示:
 * .eslintgnore 文件 设置eslint语法检查配置 /*.js当前目录下js文件中的eslint语法检查忽略, *.js 忽略所有的js文件的eslint语法检查
 * .eslintrc.js 文件 设置eslint语法检查配置 , 主要是一个一个的配置
 * .gitignore文件 设置相关的文件不再进行git 的提交操作
 *  index.html 项目的单页面文件
 * package.json 文件就是相关的一些命令 及插件安装包的设置
 * 
 * 
 * 
 *  重点
 * src目录 是项目的主入口目录,内部的main.js是项目路的主入口文件,App.vue所有组件的父级组件文件
 *   assets 目录 组件中需要的一些静态资源的目录
 *   components 目录 存放普通组件的目录
 *    .vue 文件是组件文件,内部可以有三种代码,分别是,html,js,css
 * 
 * 
 * 页面中的每一个部分 都单独抽取出来,形成一个新的文件,该文件是.vue文件
 * .vue文件中有html+css+js---->形成了组件文件
 * 当前这个文件内部整体称为:组件
 *
 * Header组件
 *
 * Main组件
 *
 * Footer组件
 * 
 * 组件:在页面的指定位置,具有特定功能效果的集合
 * 
 * 组件文件的名字的规范(不是规则): 首字母大写命名,多个单词,多个单词的首字母是大写,也可以直接使用index.vue来命名
 * 组件如何使用 ? 在使用的时候:标签怎么用,组件就怎么用
 * 组件在使用的时候的注意:可以用小写,但是多个单词需要用- 隔开, 尽量不小写使用,容易出现麻烦的事情
 *  
 * scoped 属性是style标签中的一个属性,如果Hello组件中没有设置该属性,App组件中也没有设置,那么两个组件的样式有可能会受到影响
 * 
 * 组件和组件的关系: 父子关系(直接/间接),兄弟关系
 * 组件可以重复的使用
 * 
 * 组件的使用步骤(思路):
 * 1. 引入组件
 * 2. 注册组件
 * 3. 使用组件
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *  安装脚手架命令  脚手架2的命令
 *  npm install -g vue-cli
 *  下载模版命令
 *  vue init webpack my-project
 * 
 *  npm run dev 运行项目命令或者npm run start ---不会自动打开浏览器
 *  npm run build 打包 产生dist目录
 *  serve dist 运行打包文件
 * 
 *  npm start 可以直接运行,此时不会自动打开浏览器
 *  如果你用的是yarn 下载的,那么运行项目的时候  yarn 是不需要写run的
 * 
 *  在config目录中的index.js文件中的第18行代码:autoOpenBrowser: true 修改为true,自动打开浏览器
 *  在build目录中的webpack.base.conf.js文件中第25行: app: './src/main.js' 是整个项目的入口文件
 * node_modules 依赖包目录
 * eslint检查的问题
 * build目录是webpack的相关的设置
 * config目录配置文件,里面的index.js中可以设置是否让浏览器自动打开
 * dist目录---打包后的目录文件
 * node-modules--依赖包---相关的文件
 * static---存放的是静态资源,css样式,图片,字体
 * babelrc---文件--babel的相关配置----mint-ui中配置
 * .eslintignore---->可以直接用 *.vue 或者*.js 的方式全局的忽略检查
 * .eslintrc.js 文件中 rules---一项一项的配置eslint的相关检查----看我操作
 * index.html----项目主入口html文件
 * package.json配置文件
 * src目录
 * main.js程序的主入口的js文件
 * App.vue父级组件文件
 * assets目录---图片---直接干掉----不用
 * components目录-------里面放的都是组件文件(.vue后缀的文件,叫组件文件)
 * 组件:html+css+js----形成的一个.vue文件---组件
 * 组件:具有一定功能效果的集合,里面包含html+css+js
 * 抽取了多个的组件,就形成了组件化
 * 源码的分析:
 * 
 * 
 * scoped:有可能会影响父子级组件之间的样式
 * 
 * 
 * 
 *
 */


 /**
  * 
  * npm run dev 或者npm start 都可以打开当前的程序
  * 希望运行命令后可以自动的在浏览器中打开当前页面  config目录中index.js中第18行 改为true,此时保存,重新执行命令在浏览器中打开即可
  * 
  * 执行上述命令成功后,可以进行打包的测试操作
  * npm run build 进行打包
  * serve dist 运行打包文件(安装serve------ npm install serve -g)
  * 可以继续正常的进行开发了
  * 
  * 由于本人习惯的原因,我电脑中使用的命令都是通过npm 的方式
  * 大家也可以使用yarn 的命令
  * 但是,注意:不要把npm 和yarn 混合使用,很容易出现一些错误信息
  * 
  * build目录里面主要是webpack的相关的配置,目前需要知道的就是webpack.base.conf.js文件中第25行代码可以设置程序的主入口目录及文件
  * dist目录主要是通过打包命令产生的,将来是需要把这个打包文件给运维工程师进行上线发布的
  * node_modules ----依赖包目录,里面各种目录各种js文件----1.js文件--->2.js文件--->3.js文件
  * 我从github上克隆你的项目的时候,里面没有依赖包,直接npm install 即可,自动的下载依赖包
  * src目录----程序的主入口目录,所有的代码我们都在这里写---很重要的
  * static目录----存放一些静态资源的,图标字体文件,图片等等,可以在index.html文件中进行引入
  * .babelrc---进行babel的设置或者说配置---mint-ui或者element-ui中可以进行配置
  * .eslintgnore----eslint语法检查的配置文件,里面可以设置各种目录或者各种文件的eslint语法检查的关闭
  * eslintrc.js-----eslint语法检查的配置文件,里面可以一个一个语法检查的设置
  * .gitignore---主要是设置git上传
  * index.html----整个下载后的模版中只有这么一个html文件
  * Vue脚手架,开发的是单页面应用---(配合vue-router路由器)---
  * package.json文件----一些插件包的配置(下载的插件/包---都能看到)
  * 
  * 
  * src目录
  * main.js----程序的主入口文件
  * App.vue所有组件的父级组件(根组件),其他的组件都需要在App.vue组件中引入
  * assets--可以存放一些静态资源---为组件服务的
  * components目录---存放普通组件
  * 
  * 
  * Vue中有组件,也有组件化,Vue中采用的就是组件化的方式进行开发
  *  组件:具有特定功能效果的集合,里面包含了html+css+js
  *  开发的过程中,使用了很多组件的方式叫组件化
  *  组件也可以复用(可以在任意的地方去使用这个组件,组件抽取的代码是可以复用的)
  *
  *  按照一块一块的方式抽取组件,组件和组件之间也有关系:
  *  如果是同级别关系:兄弟组件
  *  如果是嵌套关系:父子组件
  * 
  * 
  * App.vue是组件文件,而且还是所有的组件的父级组件
  * App就是组件的名字(起名的时候,尽量组件名字的首字母是大写的,组件是多个单词组合,每个单词的首字母都是大写的)
  * 
  * 
  * elint语法检查:的设置
  * eslintignore文件中和eslintrc.js文件中或者在某些代码的上面通过注释的方式来干掉语法检查
  * 
  * 使用HelloWorld组件,如果这个组件中要嵌入一些其他的标签或者内容那就写成对的,否则可以简写,组件的名字是大写的,使用的时候*可以小写,但是如果组件名字是多个单词,使用的时候,都是小写的,并且中间用-隔开,但是,一般我们就直接大写使用就可以了,因为有可*能你的组件的名字和html标签的名字重复了,容易出现各种问题,推荐:使用大写方式,组件怎么用,组件可以当成标签使用就行了
  * 
  * 
  * 组件内的style标签中如果有scoped 属性,则表示的是,组件之间的样式不受影响
  * 子级组件中最好加上这个scoped属性,不会影响父级组件的样式
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  */
