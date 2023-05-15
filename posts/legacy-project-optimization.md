---
title: webpack在舊專案中如何優化DX(Development Experience)?讓啟動server跟hot reload重新編譯的時間減少超過一半以上的時間
date: '2023-01-06'
tags: 優化 vue2 react webpack
---

![React Router](/images/post/legacy-project-optimization/g1.png)

最近公司內部的專案在開發 run server 時，花費的時間越來越久

主要是用 vue2 搭配 element-ui 然後還有許多大大小小的套件，
這個專案主要是做報表系統，有 50+以上的頁面，
所以相對應的 component 也不少
再配合上 webpack + babel 的編譯，
所以不光是起 server 連同編輯檔案後儲存重新編譯的時間也花上不少

```bash
// 此專案主要用的library && framework
"vue": "2.6.10",
"@vue/cli-service": "3.5.3",
"element-ui": "2.13.0",
"moment": "2.29.1",
```

最近專案需求剛好告一段落，所以開始著手研究相對應的優化

> 這邊專注的是 DX(Development Experience)優化，並不是頁面的優化

### 為此我們要先寫一個 webpack plugin 來看啟動時間要耗時多久

如此一來我們才能量化所需的時間(~我們的績效 😎~)

先創建一個 ConsolelogPlugin.js，放在根目錄

需要的 library

- [chalk](https://github.com/chalk/chalk#readme)
- [single-line-log](https://github.com/freeall/single-line-log)

```js
// ConsolelogPlugin.js
const chalk = require('chalk') /* console 顏色 */
const slog = require('single-line-log') /* 單行 Print console */

class ConsolegPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    /**
     * Monitor file change 記錄當前改動文件
     */
    compiler.hooks.watchRun.tap('ConsolePlugin', (watching) => {
      const changeFiles = watching.watchFileSystem.watcher.mtimes
      for (let file in changeFiles) {
        console.log(chalk.green('當前改動文件：' + file))
      }
    })
    /**
     *  before a new compilation is created.
     *  開始 compilation 編譯 。
     */
    compiler.hooks.compile.tap('ConsolePlugin', () => {
      this.beginCompile()
    })
    /**
     * Executed when the compilation has completed.
     * 一次 compilation 完成。
     */
    compiler.hooks.done.tap('ConsolePlugin', () => {
      this.timer && clearInterval(this.timer)
      const endTime = new Date().getTime()
      const time = (endTime - this.starTime) / 1000
      console.log(chalk.yellow(' 編譯完成'))
      console.log(chalk.yellow('編譯用時：' + time + '秒'))
    })
  }
  beginCompile() {
    const lineSlog = slog.stdout
    let text = '開始編譯：'
    /* 記錄開始時間 */
    this.starTime = new Date().getTime()
    this.timer = setInterval(() => {
      text += '█'
      lineSlog(chalk.green(text))
    }, 50)
  }
}

module.exports = ConsolegPlugin
```

![React Router](/images/post/legacy-project-optimization/g3.png)
[我們可以加上 cacheDirectory 的選項來 cache 之前編譯過的檔案，來避免每次都要全部重新編譯](https://webpack.docschina.org/loaders/babel-loader#babel-loader-is-slow)

接下來我們使用[HappyPack](https://github.com/amireh/happypack#readme)搭配[babel-loader](https://webpack.docschina.org/loaders/babel-loader)的 cache 來加速

### Vue2 版本(webpack)

```js
// vue.config.js

// import .. from ..
// import ... from ...
const ConsolelogPlugin = require('./ConsolelogPlugin')
const HappyPack = require('happypack');
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {

  // ....
  // ......
  configureWebpack: {

    // ....
    plugins: [
      new ConsolelogPlugin()
    ]

    chainWebpack(config) {
        // ...
        // 只想在 development 的環境執行
        config.when(process.env.NODE_ENV === 'development', config => {
            config.plugin('happypack')
                .use(HappyPack)
                .tap(options => {
                options[0] = {
                    id: 'babel',
                    loaders: ['babel-loader?cacheDirectory=true'], // 开启缓存
                    threadPool: happyThreadPool
                }
                return options
                })
            const hRule = config.module.rule('js')
            hRule.test(/\.js$/)
                .include.add(resolve('src'))
                .end()
            hRule.uses.clear()
            hRule.use('happypack/loader?id=babel')
                .loader('happypack/loader?id=babel')
                .end()
        })
    }
  }
}
```

### React (webpack 4.44.1)

```js
// webpack.config.dev.js

// ...
const ConsolelogPlugin = require('./ConsolelogPlugin')
const HappyPack = require('happypack');
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {

    module: {
        rules: [
            // 原本
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             presets: ["@babel/preset-react","@babel/preset-env"],
            //         },
            //     }
            // },

            //改為
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use:['happypack/loader?id=babel']
            }
        ]
    }

    // ....
    plugins: [
        //.... ,
        // .... ,
        new HappyPack({
            id:'babel', // 這邊對應
            loaders:['babel-loader?cacheDirectory=true'], // cache babel編譯過的檔案
            threadPool: happyThreadPool
        }),
        new ConsolelogPlugin()
    ]
}
```

### 結果

![React Router](/images/post/legacy-project-optimization/g2.png)

原本約 55 秒
改進後約 16 秒
只剩下原本不到 1/3 的時間

當然修改後儲存的編譯時間也有變快
但我這邊就不做記錄了
