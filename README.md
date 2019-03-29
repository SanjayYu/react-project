# [React Project](https://github.com/lovelope/react-project)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![npm (tag)](https://img.shields.io/npm/v/stylelint/latest.svg?label=stylelint)
![David](https://img.shields.io/david/lovelope/react-project.svg)
![npm (tag)](https://img.shields.io/npm/v/antd/latest.svg?label=antd)
![npm (tag)](https://img.shields.io/npm/v/mobx/mobx4.svg?label=mobx%40mobx4)
![npm (tag)](https://img.shields.io/npm/v/webpack/latest.svg?label=webpack)
![npm (tag)](https://img.shields.io/npm/v/@babel/preset-env/latest.svg?label=%40babel%2Fpreset-env)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/lovelope/react-project/feature/ts.svg)
![GitHub top language](https://img.shields.io/github/languages/top/lovelope/react-project.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/lovelope/react-project/pulls)

---

## 使用方法

```bash
# 启动命令
npm start

# 切换环境
npm start --qa # qa 环境

# 构建命令
npm run build
```

## 功能

- antd 主题修改
- editorconfig 文件规范
- prettier 代码规范
- eslint
- stylelint
- babel@7
- postcss
- webpack@4
- api proxy 支持环境切换
- mobx
- sourceMap 地址替换
- git commit msg 规范
- dll 支持

## 配置切换的文件

`tools/swtich.config.js`

## 禁止用户访问 map 文件的 nginx 配置

```nginx
server {
	# 禁止访问 txt、sh、map 文件
	location ~* \.(txt|sh|map)$ {
		deny all;
	}
}
```

## TODO

[TODO.md](./TODO.md)
