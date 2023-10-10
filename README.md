# Livekun

一个基于 [OBS Studio](https://obsproject.com/) 浏览器源，支持多直播平台 YouTube 风格的插件系统，该项目目前正在开发中

## 软件截图

![WEB](./screenshots/web.png)

![OBS](./screenshots/obs.png)

## 功能特性

* 📦开箱即用的 OBS Studio 浏览器源插件，无须繁琐的配置即可使用

* 💼内置类 YouTube 直播风格的礼物打赏信息插件、聊天弹幕插件

* 🖥️可在后台远程控制在 OBS Studio 中的添加的浏览器源插件，与插件交互

* 👍多直播平台支持，覆盖国内主流直播平台，更多平台正在适配中...

* 🚧更多插件和功能正在开发中...

## 适配详情

### 直播平台适配详情

下列表格列出了目前各个直播平台的适配情况，尚未列出的直播平台表示目前没有适配计划，但不确定未来是否会适配

| 直播平台/插件功能 | CC直播 | 哔哩哔哩直播 | 抖音直播 | 斗鱼TV | 虎牙直播 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 聊天消息插件 | ✅支持 | 🚧开发中 | 🚧开发中 | 🚧开发中 | 🚧开发中 |
| Ticket 价签栏插件 | ✅支持 | 🚧开发中 | 🚧开发中 | 🚧开发中 | 🚧开发中 |
| Paid 卡片插件 | ✅支持 | 🚧开发中 | 🚧开发中 | 🚧开发中 | 🚧开发中 |

### OBS 版本适配详情

如果无法正常使用，请尝试升级你的 OBS 版本，对于 OBS Classic 明确表示不再适配，请不要咨询关于适配 OBS Classic 的相关问题

| OBS 版本类型 | 最低版本 | 最高版本 |
| :---: | :---: | :---: |
| OBS Studio | [✅22.0.0](https://github.com/obsproject/obs-studio/releases/tag/22.0.0) | [✅Latest](https://github.com/obsproject/obs-studio/releases/latest) |
| OBS Classic | ❌不支持 | ❌不支持 |

## 常见问题 FAQ

### Q: 平台目前为什么无法注册账号？

A: 目前该项目尚在开发状态，如果你感兴趣，可以联系我参与内测，我会为你提供测试账号。

### Q: 我按照教程在 OBS 中添加了浏览器源插件，但依然不能使用？

A: 这可能是因为你的 OBS 版本过低的原因引起的，请尝试升级 OBS 版本；如果问题仍未解决，请提交 Issue。

### Q: 为什么我的 OBS 的添加菜单中没有“浏览器源”选项？

A: 请确认你正在使用的 OBS 版本类型是 **OBS Studio** 而不是 **OBS Classic**，且下载并安装的是文件名中带有 **Full** 字样的版本。

### Q: 是否支持类似“哔哩哔哩直播姬”的直播平台专用的直播推流软件？

A: 只要直播推流软件支持添加浏览器源且为 Chromium 内核就可以使用。

## 服务端

[livekun-server](https://github.com/hhui64/livekun-server)

## 开源许可信息

* [blivechat](https://github.com/xfgryujk/blivechat), Licensed under MIT license.

## License

[MIT](LICENSE)
