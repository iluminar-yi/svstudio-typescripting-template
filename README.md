# svstudio-typescripting-template

English | [简体中文](/README_zh-CN.md) (link only available in the GitHub repo page)

This is a template repository that is set up to build scripts that can run in Synthesizer V Pro.
This boilerplate configures TypeScript, Webpack, ESLint, Jest, and uses core-js to polyfill.
Original scaffolding found at this [ts-loader example](https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin).

## How to Use
1. Click `Use this template` to generate your own repository with this template.
1. Modify `package.json`, `LICENSE` (there is author name in it).
1. Start coding in the `src` folder! (But make sure `src/index.ts` exports a `SVScriptFactory`)

## NPM Commands Explained
* `start`: Runs Webpack in watch mode, and continuously build the project and outputs to the `dist` folder.
* `doc`: Runs `typedoc` to regenerate the API documentation.
* `prebuild`: Deletes all the files in `dist` folder.
* `build`: Runs Webpack with minification turned on to build a production build.
* `test`: Runs `jest` to test this project.
* `test:watch`: Runs `jest` while watching for file changes that could impact test output.
* `lint`: Lints this project.
* `lint-rule-timings`: Runs `eslint` but only outputs the timing of each linting rule.
