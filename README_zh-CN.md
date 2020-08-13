# svstudio-typescripting-template

[English](/README.md) | 简体中文

这是一个用于搭建Synthesizer V Pro脚本的模板库。里面集成了TypeScript, Webpack, ESLint, Jest，并使用core-js来polyfill。
这个模板来自于这个[ts-loader的实例工程](https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin)。

## 如何使用
1. 点击`Use this template`来用这个模板生成你自己的库。
1. 修改`package.json`、`LICENSE`（这个文件里也有"作者姓名"）。
1. 可以开始在`src`文件夹里写代码啦！（但请确保`src/index.ts`文件导出一个`SVScriptFactory`.

## NPM命令解释
* `start`：让Webpack在监视模式下，持续编译整个工程并输出至`dist`文件夹。
* `doc`: 运行`typedoc`以重新生成API文档
* `prebuild`：删除`dist`文件夹内所有文件。
* `build`：让Webpack在打开所有精简功能的情况下编译出用于生产环境的文件。
* `test`：用`jest`来测试工程内代码。
* `test:watch`：让`jest`在监视文件变更的模式下持续对工程内文件进行测试。
* `lint`：修正工程内代码样式的相关问题。
* `lint-rule-timings`：运行`eslint`，但只生成每条样式检查运行所需的时间。
