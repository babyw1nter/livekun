# [1.0.0-alpha.4](https://github.com/hhui64/livekun-web/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2021-09-11)


### Bug Fixes

* 修复在 Windows 下因字号小于 16px 导致的渲染发虚的问题 ([adf18ed](https://github.com/hhui64/livekun-web/commit/adf18ede9705822c6364a0a28a8f671082baff0a))
* **router:** 修复原插件 url 404 的问题 ([63cc85e](https://github.com/hhui64/livekun-web/commit/63cc85e7cf6742ca9de84e49f2a9a9a30bc920da))


### Features

* **GiftCard:** 新增礼物图标显示 ([d42ca01](https://github.com/hhui64/livekun-web/commit/d42ca01fa4a28e750332f10ec75fc1bae82b6b46))


### Performance Improvements

* 优化预览组件的宽度 ([dcc5a9b](https://github.com/hhui64/livekun-web/commit/dcc5a9b83e6d6b48ee0fa3c8c264db8f422550b3))
* 优化组件 url ([3ad4d36](https://github.com/hhui64/livekun-web/commit/3ad4d36da07e779f7f433ab45779fa5cf3937c0b))
* **ChatMessageList:** 优化聊天消息添加逻辑 ([f12d9b9](https://github.com/hhui64/livekun-web/commit/f12d9b92453b9878a269ee14e650c80ad1faaa52))



# [1.0.0-alpha.3](https://github.com/hhui64/livekun-web/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2021-09-03)


### Bug Fixes

* 修复当礼物价值低于第一档金额时风格样式异常的问题 ([1aedf7b](https://github.com/hhui64/livekun-web/commit/1aedf7bb92cb4be0f80f1e3f9f50346e33208aed))
* 修复礼物卡片留言功能失效的问题 ([7dcca24](https://github.com/hhui64/livekun-web/commit/7dcca247cd7f710aa2032980ea22da561220b7bd))
* **views/ConnectPage:** 修复进入房间失败时依然改变全局 status 的问题 ([de5d1ca](https://github.com/hhui64/livekun-web/commit/de5d1cae1f561c320435aeeb04d2deff1b6e0bb4))


### Features

* 新增设置页面对应组件的样式预览 ([d60beff](https://github.com/hhui64/livekun-web/commit/d60beffe1cdd2d91802fdff8c410093b3eb096ba))
* **views/Home:** 公告信息添加文字提示 ([c71f126](https://github.com/hhui64/livekun-web/commit/c71f126ac0421e75276156f925c29b884065c62c))
* **views/Home:** 新增从服务端获取公告的功能 ([18318e4](https://github.com/hhui64/livekun-web/commit/18318e457fc61971eb6b5d2c6fd9badf2fc4551c))
* **views/Home:** 新增页头组件 ([6f46b54](https://github.com/hhui64/livekun-web/commit/6f46b5415d624912a64976bd426db837433f40f4))
* **views/Home:** 新增主页右上角的小彩蛋文本 ([41f814d](https://github.com/hhui64/livekun-web/commit/41f814db983758ced56fd8f1253248f7e3204faa))


### Performance Improvements

* 优化 html lang 标识符 ([94e6c5f](https://github.com/hhui64/livekun-web/commit/94e6c5f411803152ca180cd5a3556db368fe73aa))
* 优化接口数据合并以减少请求数量 ([4f93b54](https://github.com/hhui64/livekun-web/commit/4f93b54ef72b951802f39b5de29403d2a7c16150))
* 优化页面样式 ([c0c3e98](https://github.com/hhui64/livekun-web/commit/c0c3e98944249891c1f9f48cd8733b4208fbdffb))
* **GiftCapsulePanel:** 优化礼物胶囊添加逻辑 ([303ca17](https://github.com/hhui64/livekun-web/commit/303ca17a8f2ba6e0d5472b7ea3413d0c8d3aa2c5))
* **GiftCardConfigPage:** 优化配置项说明文案 ([e0fe390](https://github.com/hhui64/livekun-web/commit/e0fe390a2ff74495f827966ddf0cc11ea72a39d8))
* **views/*:** 优化页面样式 ([c5db17f](https://github.com/hhui64/livekun-web/commit/c5db17f0e5bee6d3f945a59242f0dbbf5681f898))
* **views/Home:** 优化布局样式 ([aa3641f](https://github.com/hhui64/livekun-web/commit/aa3641f6cec267dc236b388bebfca9c2fcd0d769))
* **views/Home:** 优化主页样式 ([a67587d](https://github.com/hhui64/livekun-web/commit/a67587d14c8509d14c758a233d5873e54086d4f8))



# [1.0.0-alpha.2](https://github.com/hhui64/livekun-web/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2021-08-29)


### Features

* 新增组件错误时的反馈样式 ([863ac47](https://github.com/hhui64/livekun-web/commit/863ac47ac7ef86c3b98c79e7926226e8ea9da8db))
* **api/socket:** 新增支持 ArrayBuffer 传输 WS 数据 ([2097901](https://github.com/hhui64/livekun-web/commit/2097901e4f15a0df5f726216327681a4fa4817c7))


### Performance Improvements

* 使用 Day.js 替换 Moment.js 以减少打包的文件体积 ([09fe6df](https://github.com/hhui64/livekun-web/commit/09fe6df667f35dc49b549f05c37e2969e13c87bb))
* 优化路由懒加载以提升首屏加载速度 ([0afa15b](https://github.com/hhui64/livekun-web/commit/0afa15bc1c8101b49f564aed0fb382dbfe27c665))
* 优化组件按需引用以减少打包的文件体积 ([bf59e89](https://github.com/hhui64/livekun-web/commit/bf59e89e74101e8c4242c279585e61e2cee5b501))
* 优化组件样式 ([d643593](https://github.com/hhui64/livekun-web/commit/d643593b93b9c67a545e1d10612b5cb565c42b5f))



# [1.0.0-alpha.1](https://github.com/hhui64/livekun-web/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2021-08-29)


### Features

* 新增进入离开时的过渡动画 ([bd3d1c0](https://github.com/hhui64/livekun-web/commit/bd3d1c0e6c96a338223eb89a6d755d654619fde0))


### Performance Improvements

* 优化样式添加 scoped 属性 ([f8e9e13](https://github.com/hhui64/livekun-web/commit/f8e9e133f92b6acfe19354ff778872ced4852258))
* **views/ConfigPage:** 优化配置项说明文本 ([b00eebc](https://github.com/hhui64/livekun-web/commit/b00eebc5c5eaa73924db55e83268d508c32cb804))



# [1.0.0-alpha.0](https://github.com/hhui64/livekun-web/compare/v0.1.0-alpha.3...v1.0.0-alpha.0) (2021-08-26)


### Features

* **api/socket:** 新增根据 UUID 创建指定协议的 WS 实例 ([c19f2af](https://github.com/hhui64/livekun-web/commit/c19f2af675bd68f4b1cd611d3fcb6270795229c1))
* **api/user:** 新增用户类 api 接口模块 ([66fdafc](https://github.com/hhui64/livekun-web/commit/66fdafc22a8df8f202c604ef76f227fae45832b3))
* **App:** 新增全局配置 ([7dfd5c2](https://github.com/hhui64/livekun-web/commit/7dfd5c2ad77bdd036c0b79e953e94c15d1fa4cab))
* **router:** 新增多个页面 ([9936064](https://github.com/hhui64/livekun-web/commit/9936064657cf74506638d93824d9d998572ee0b5))
* **router:** 新增路由自动鉴权 ([fadee91](https://github.com/hhui64/livekun-web/commit/fadee91a88e6f3eb7602d24d2fcd059fdcc39692))
* **store:** 新增用户登录状态管理 ([4504a35](https://github.com/hhui64/livekun-web/commit/4504a351bdcaf0fdfb190b90f63cc894c5fcbdd0))
* **views/AccountPage:** 新增账号管理页面 ([7e2e9bf](https://github.com/hhui64/livekun-web/commit/7e2e9bf8aa1756e4162e5d850f66f83a101d974e))
* **views/ConnectPage:** 新增连接管理页面 ([bb92cd3](https://github.com/hhui64/livekun-web/commit/bb92cd39ea7f7c717153cef9e517f3e0f7def870))
* **views/User/Login:** 新增用户登录页面 ([28a5fec](https://github.com/hhui64/livekun-web/commit/28a5fec897ef585575faae8195c716988eabdb6c))


### Performance Improvements

* 完善类型声明 ([614df35](https://github.com/hhui64/livekun-web/commit/614df35c7402ce1b7687218f5a96201022e3afa0))
* **api/http:** 服务端返回 530 时自动跳转至登录页面 ([950f073](https://github.com/hhui64/livekun-web/commit/950f0738a352556b6e076f0956bbf763d1456ea6))
* **api/socket:** 优化 WS 连接重连逻辑 ([37b6169](https://github.com/hhui64/livekun-web/commit/37b61696a528e16d7d3497a0f9d4e314172ec8c8))
* **GiftCard*:** 优化礼物卡片的 props 定义 ([10d9be6](https://github.com/hhui64/livekun-web/commit/10d9be680223ff38b774da15a132848edcb2eb68))
* **views/*:** 优化组件控制逻辑 ([2065049](https://github.com/hhui64/livekun-web/commit/20650493d2f00d212abfce2dead079aeff6e731c))
* **views/ConfigPage:** 优化配置页面 ([88598da](https://github.com/hhui64/livekun-web/commit/88598dad9f75664901f121dcdce5ba26d718e3b5))



# [0.1.0-alpha.3](https://github.com/hhui64/livekun-web/compare/v0.1.0-alpha.2...v0.1.0-alpha.3) (2021-08-22)


### Bug Fixes

* **api/http:** 修复生产环境下 WS URL 错误的问题 ([dac1da4](https://github.com/hhui64/livekun-web/commit/dac1da45a6d99de538f86e908b793974742dfc8e))



# [0.1.0-alpha.2](https://github.com/hhui64/livekun-web/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2021-08-22)


### Features

* **api/http:** 新增 http 模块 ([ccbc2eb](https://github.com/hhui64/livekun-web/commit/ccbc2eb9a31dff5c2febd41df6a37e4c403ca34e))
* **api/socket:** 新增 socket 模块 ([1a3a8dd](https://github.com/hhui64/livekun-web/commit/1a3a8dd6dcf100712d3b2632fa19651559c4d2d4))
* **GiftCard*:** 新增礼物卡片组件留言滚动显示 ([0a3ade7](https://github.com/hhui64/livekun-web/commit/0a3ade740b698431a4c6ac205aae119d24cfdc69))


### Performance Improvements

* 优化 http 请求的调用方式 ([cb35e04](https://github.com/hhui64/livekun-web/commit/cb35e040639fd395417c707a2f4ab62667b02b8e))
* 优化 socket 的创建与调用方式 ([91130ee](https://github.com/hhui64/livekun-web/commit/91130eec8ca20de6a91c1833f520a4c789494176))
* 优化配置和状态更新逻辑策略 ([3b4145e](https://github.com/hhui64/livekun-web/commit/3b4145ea88c7fcab8b1668fb09604a69c1779a8b))
* **ChatMessage:** 优化组件样式 ([726fd38](https://github.com/hhui64/livekun-web/commit/726fd381fce4fd2ca62e89438b5354b8aa38905d))
* **PageFooter:** 优化页脚组件样式 ([4e2f763](https://github.com/hhui64/livekun-web/commit/4e2f763b80a3a9042ea04d8267ee88634e2e55cb))



# [0.1.0-alpha.1](https://github.com/hhui64/livekun-web/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2021-08-21)


### Features

* 支持发送模拟数据到礼物组件 ([1b053a1](https://github.com/hhui64/livekun-web/commit/1b053a17c10377f45905d7b8f6ce7f0534dcd938))
* **api/common:** 添加一些常用方法 ([d2230aa](https://github.com/hhui64/livekun-web/commit/d2230aad9e6437bde0e065c29d40dbe4f08a5373))
* **GiftCard:** 新增礼物卡片留言互动功能 ([9c02668](https://github.com/hhui64/livekun-web/commit/9c026687bd5bd1e947e095b3c9753fdf6a36e9ea))


### Performance Improvements

* 优化原子组件的金额文本格式 ([6cbc98c](https://github.com/hhui64/livekun-web/commit/6cbc98ca3e9a476943acdf6cf53e2e625e615ad5))



# [0.1.0-alpha.0](https://github.com/hhui64/livekun-web/compare/19544a02deb33d0a4b616bb1b91fa8f9e630220e...v0.1.0-alpha.0) (2021-08-20)


### Bug Fixes

* 代码逻辑优化 ([6a05f5b](https://github.com/hhui64/livekun-web/commit/6a05f5b364b1beb0510556e715570400f921d7ff))
* 修复`奶玲`错误拼写成`奶铃`的问题 ([bee3d6d](https://github.com/hhui64/livekun-web/commit/bee3d6db6b95aed0601582e85c6742cf964cf4c0))
* 修复测试页面的数据中的`奶玲`错误拼写成`奶铃`等问题 ([b0b46aa](https://github.com/hhui64/livekun-web/commit/b0b46aa401326248eef97254f434bd867fa33b53))
* 修复礼物胶囊持续时间进度不显示的问题 ([41bf23c](https://github.com/hhui64/livekun-web/commit/41bf23ce1c6895bf10173c4727c68cda52595a14))
* 修复留言的错别字问题 ([2ebaf6b](https://github.com/hhui64/livekun-web/commit/2ebaf6bcdcba97816c6c725c3402f02f464c73dd))
* adjust style ([d23335f](https://github.com/hhui64/livekun-web/commit/d23335f7b929c15cc69fe0139a42327c3303a07d))
* adjust style ([27250a9](https://github.com/hhui64/livekun-web/commit/27250a91341da505d5cfbddd547bc823ee3d3f2d))
* **ChatMessage:** 修复聊天消息原子组件标点符号无法自动换行的问题 ([b6d82e0](https://github.com/hhui64/livekun-web/commit/b6d82e05eadb50ff5823b18d8b0361c87566a469))
* chrome < 85 unsupport replace function ([e756f1f](https://github.com/hhui64/livekun-web/commit/e756f1f5d0a4230c83a01bb98016a67375a78f61))
* **GiftCardPage:** 修复礼物卡片组件未正确区分通信数据类型的问题 ([d3d753b](https://github.com/hhui64/livekun-web/commit/d3d753bbe5e2c0143bbe95004844754630f73d4e))


### Features

* 调整 UI 样式 ([0168a51](https://github.com/hhui64/livekun-web/commit/0168a511b4f5b8c89b6d05a0699af0be3ca0a0f2))
* 调整礼物胶囊尺寸样式 ([5b6c360](https://github.com/hhui64/livekun-web/commit/5b6c360c1e07b4f24dd234732f094eb6e50cb555))
* 调整礼物卡片的样式 ([24d3ac1](https://github.com/hhui64/livekun-web/commit/24d3ac1f70a3c224b5b8cdacda7baaf664fc12ce))
* 调整样式 ([81374f7](https://github.com/hhui64/livekun-web/commit/81374f7cc9694ab6e99415d3682fcb9133aae70a))
* 更多调试日志信息 ([3ebfcd5](https://github.com/hhui64/livekun-web/commit/3ebfcd5840cae8cfc8d96dab9e739507b3addca8))
* 回滚礼物卡片的样式 ([1808bfc](https://github.com/hhui64/livekun-web/commit/1808bfcd156cb2cc74cb083234656d83fac9b674))
* 聊天消息支持特定用户类型高亮用户名 ([021423c](https://github.com/hhui64/livekun-web/commit/021423cdec266fcdfe53ec7917d4f79536c3ba5e))
* 实时重连及刷新配置信息 ([59b1351](https://github.com/hhui64/livekun-web/commit/59b135125288863b6cc6d3b52c2428c1fce0955f))
* 添加所有组件的`clear`方法 ([f6a69cf](https://github.com/hhui64/livekun-web/commit/f6a69cfd2f91c41e80bb418bd2b1ffb323b3c489))
* 优化了部分操作 ([9d4d57a](https://github.com/hhui64/livekun-web/commit/9d4d57a9232b30742cc5928e747dabf9bdcf77da))
* 优化组件内部的类型注解 ([6a581bc](https://github.com/hhui64/livekun-web/commit/6a581bc2ad65b3b4dc5ea6e27d98343c01757716))
* add components ([84054bf](https://github.com/hhui64/livekun-web/commit/84054bf6ea9bf632be2641151cac03a0973282f2))
* add global custom style ([19544a0](https://github.com/hhui64/livekun-web/commit/19544a02deb33d0a4b616bb1b91fa8f9e630220e))
* **ChatMessage:** 调整聊天消息原子组件样式 ([6ee1b4b](https://github.com/hhui64/livekun-web/commit/6ee1b4bb21fbdb08c7da38d3d4f63b2658e3f98e))
* **ChatMessage:** 添加 ChatMessage 组件的 type 属性类型注解 ([a59b9e4](https://github.com/hhui64/livekun-web/commit/a59b9e423dbba9409e0b590b20c58fa7a9cde83a))
* **ChatMessageList:** auto smooth scroll ([9c95bd1](https://github.com/hhui64/livekun-web/commit/9c95bd1fec6e89c27611823458735b4fcf9c0723))
* dev ([01f759a](https://github.com/hhui64/livekun-web/commit/01f759ae2860858d67208b4f76a76661cb1c119d))
* **GiftCapsulePanel:** 礼物胶囊面板组件支持添加自定义`duration`和`message`属性 ([822957c](https://github.com/hhui64/livekun-web/commit/822957c5262dc1443e2e346df37c9cbef18814a1))
* guard types style ([2f24a4c](https://github.com/hhui64/livekun-web/commit/2f24a4c25e4c8d16445466c15d558b79d00b2589))
* liveroom title ([c88b994](https://github.com/hhui64/livekun-web/commit/c88b994ee99fdf715e0352b67162750cd7586775))
* new components ([2b7ee31](https://github.com/hhui64/livekun-web/commit/2b7ee31cbab68c653cbc892fb4400b4342555865))


### Performance Improvements

* 调整礼物胶囊的持续时间的单位 ([2caf23f](https://github.com/hhui64/livekun-web/commit/2caf23fc85ad0796660cd2c479f251a9d29e5ce1))



