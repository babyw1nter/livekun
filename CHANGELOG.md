# [1.0.0-alpha.10](https://github.com/hhui64/livekun-web/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2023-03-13)


### Bug Fixes

* 修复更新 broadcast 的生命周期相关 bug ([3b7473e](https://github.com/hhui64/livekun-web/commit/3b7473e66f649c4f691bda92da53e7101f9f7d28))


### Features

* 新增组件支持异步加载数据 ([16a9ad6](https://github.com/hhui64/livekun-web/commit/16a9ad62a8d319cd4631613d50071d1642d8fd11))


### Performance Improvements

* 优化 socket api 方法 ([9c29499](https://github.com/hhui64/livekun-web/commit/9c294993efbd6c01998e69081f7695610091c036))
* 优化登录成功时不再输出控制台信息 ([68c8160](https://github.com/hhui64/livekun-web/commit/68c8160eac8ece9a191b09a0446b44a5db5f1834))
* 优化获取默认配置对象时使用深拷贝 ([12f6d28](https://github.com/hhui64/livekun-web/commit/12f6d282e206862d9b4c7edf0cf0ba91514697a0))
* 优化项目的目录结构 ([5474276](https://github.com/hhui64/livekun-web/commit/54742761ef5a14d2633808ce6290500993e8302d))
* 优化页面切换时自动滚动到顶部 ([9fb4279](https://github.com/hhui64/livekun-web/commit/9fb4279619aa54e5470133acb1027a0d06e14a39))
* 优化异步组件加载时显示加载动画 ([693f060](https://github.com/hhui64/livekun-web/commit/693f0607440d891d863ce9e231195d4e1b2c8879))
* update slogan ([909a232](https://github.com/hhui64/livekun-web/commit/909a2322f7a080fa6c74b415f445e3c18bef1266))



# [1.0.0-alpha.9](https://github.com/hhui64/livekun-web/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2023-03-11)


### Bug Fixes

* 修复 ajax `Content-Type` 类型错误的 bug ([481130f](https://github.com/hhui64/livekun-web/commit/481130f2b00451793bf1829f55b02b2285418490))
* 修复 Ticket level-0 没有背景色样式的 bug ([4fe0f97](https://github.com/hhui64/livekun-web/commit/4fe0f971252d758561e4e7f60626650890c49792))
* 修复 v-bind prop 不正确的 bug ([1fe4622](https://github.com/hhui64/livekun-web/commit/1fe4622fa305f662da8ca3cb7a5bb56be0047a4b))
* 修复插件在 OBS 内背景不为透明的 bug ([8934a27](https://github.com/hhui64/livekun-web/commit/8934a278566a451e7b3263af1c5a7aefb27542f8))
* 修复预览组件插件名称错误的 bug ([dc48f20](https://github.com/hhui64/livekun-web/commit/dc48f208001d649b1f3efa7c8d303d5078ebf827))


### Features

* 新的插件配置页面 ([15c1ad6](https://github.com/hhui64/livekun-web/commit/15c1ad6cf639ad425189890fa0609dc911910a2f))
* 新的首页 UI 样式 ([1100329](https://github.com/hhui64/livekun-web/commit/1100329403d12e76d30539a1f871d6d4a61170cd))
* 新增 Ticket 的更多颜色分级 ([9cc4c75](https://github.com/hhui64/livekun-web/commit/9cc4c7555f02d21c04d5bdf151c5966dc4e61aed))
* 新增插件默认配置类型字段 ([c056ed4](https://github.com/hhui64/livekun-web/commit/c056ed47b7e719140149f92c78bc3750a8ab4d85))
* 新增插件配置系统 ([0bdbc04](https://github.com/hhui64/livekun-web/commit/0bdbc047cbec4ee377fcfaebe88e0957fe2daa8b))
* 新增插件预览框组件 ([000ecf4](https://github.com/hhui64/livekun-web/commit/000ecf477140bfe1e57bf9478555b962eca0ffe2))
* 新增登录页的申请使用权限提示 ([73e37b0](https://github.com/hhui64/livekun-web/commit/73e37b04b40500c00ecc69fe8b3628cb39c10df4))
* 新增聊天消息插件顶部的 Ticket 栏 ([767152a](https://github.com/hhui64/livekun-web/commit/767152a0b23f3a35719dbe9e9f73bdcfbfeafd47))
* 新增页脚版权信息公共组件 ([b0af43e](https://github.com/hhui64/livekun-web/commit/b0af43e6f5a896e88f9cbd5159de7f8de7b6dc02))
* 新增左侧导航的收缩和展开按钮 ([85df5da](https://github.com/hhui64/livekun-web/commit/85df5da9be4b706c0b3860281a4cbd3183a48754))
* **ChatMessage:** 新增更多可调整的配置 ([0f26f3d](https://github.com/hhui64/livekun-web/commit/0f26f3d07732823709690e9e7d8fe0d9373b4f91))
* **Home:** 新增页脚版权信息 ([f638878](https://github.com/hhui64/livekun-web/commit/f6388784a12b68fcf0bdedf7e8597805539922e1))


### Performance Improvements

* 移除不必要的嵌套标签 ([83846b8](https://github.com/hhui64/livekun-web/commit/83846b8252f286c9cbfe6cf11f4d59d917a4e15d))
* 优化 `Paid` 和 `Ticket` 插件配置页面的样式 ([d927870](https://github.com/hhui64/livekun-web/commit/d92787032bd09f2747cf5367728094988231f5b2))
* 优化 `PluginsConfig` 类型约束 ([8cfcdab](https://github.com/hhui64/livekun-web/commit/8cfcdabdea1398ceb618881ab8db7849a4ab5669))
* 优化插件设置页面的文案 ([0e03d6f](https://github.com/hhui64/livekun-web/commit/0e03d6f72688b70f48c62a79c1ab80edcd3a2dc3))
* 优化页面样式 ([e30ac33](https://github.com/hhui64/livekun-web/commit/e30ac33433e481486ac659bbf769ab7fae24c4c3))
* **app.config:** 优化版权信息 ([e1f0cae](https://github.com/hhui64/livekun-web/commit/e1f0cae0d27785e7237c502d6b7c21075183d1f4))



# [1.0.0-alpha.8](https://github.com/hhui64/livekun-web/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2023-03-04)


### Bug Fixes

* 修复点击导航时控制台输出警告 ([260ca7d](https://github.com/hhui64/livekun-web/commit/260ca7df86c3e505c0d958cdc989e587f64ac556))
* **api/socket:** 修复连接 ws 时没有 protocols 参数的 bug ([e7c9951](https://github.com/hhui64/livekun-web/commit/e7c9951537edf84dac56b0fd6fac3e3c9f20f9a3))
* type error ([b446fb3](https://github.com/hhui64/livekun-web/commit/b446fb3d3c28108969405b4f69ebf50bc2d2dc94))
* **User/Login:** 修复无法自动登录的问题 ([8e42eb5](https://github.com/hhui64/livekun-web/commit/8e42eb5eeef80ed1c06877784b19266e63023617))


### Features

* **api/socket:** 新增创建 socket 时的回调参数 ([5694870](https://github.com/hhui64/livekun-web/commit/5694870556dde65fdb8ff040aa1901c620fe893b))
* **paid:** 新增 Paid 插件，从旧版礼物卡片重写而来 ([28bde13](https://github.com/hhui64/livekun-web/commit/28bde13349889e25e4cbbd4db587b29deaad2aac))
* **ticket:** 新增 Ticket 插件，从旧版礼物胶囊重写而来 ([a2a96e3](https://github.com/hhui64/livekun-web/commit/a2a96e3b2e229224f1512f84563390f7a7fcb9e6))
* **views/Home:** 新增导航菜单上 Ticket 的 `全新` 标签 ([f00ff01](https://github.com/hhui64/livekun-web/commit/f00ff01b255b88f402871301ae384e111ef6e7bb))


### Performance Improvements

* 优化 mock 数据的请求时机 ([fccba26](https://github.com/hhui64/livekun-web/commit/fccba269d478d876c234ca899e21cbb881decb89))
* 优化 sc ticket 组件的动画样式 ([94fdc3b](https://github.com/hhui64/livekun-web/commit/94fdc3bd10e90123ac262ca161ae9841eb47baf3))
* 优化标签结构 ([d982232](https://github.com/hhui64/livekun-web/commit/d98223279b8b504f28bf947a6065082aade49706))
* 优化插件设置页面的文案 ([b95f1de](https://github.com/hhui64/livekun-web/commit/b95f1dec82500ce588618977de4c285fea343b82))
* 优化文本中的 Emoji 样式 ([f282dd7](https://github.com/hhui64/livekun-web/commit/f282dd7d6d27dd052a9e7d7d79711a4924ad211d))
* 优化消息数据类型，给消息添加唯一 key 值 ([0c62aeb](https://github.com/hhui64/livekun-web/commit/0c62aeb85474f0413ad7a435bb36757492da7e3f))
* 优化主页样式 ([6f0a48a](https://github.com/hhui64/livekun-web/commit/6f0a48ad3b537b351259776685b133cc5c73fce4))
* **api/common:** use reactive ([dd579bd](https://github.com/hhui64/livekun-web/commit/dd579bdd0ac6ac5063404b906f390bdfbc656faf))
* **api/mock:** 调整模拟数据随机金额范围 ([169b748](https://github.com/hhui64/livekun-web/commit/169b7484fb07305685dd41a0fa1d9f73305da992))
* **store:** 优化 ChatMessage 插件的默认字体大小值 ([05d74f1](https://github.com/hhui64/livekun-web/commit/05d74f18da90d083a866b0813bf177087129fa49))
* **store:** 优化 Ticket 插件的默认最大个数值 ([835687b](https://github.com/hhui64/livekun-web/commit/835687b11e4f3e6c3a63a3864200cc744dee99e7))



# [1.0.0-alpha.7](https://github.com/hhui64/livekun-web/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2023-02-20)


### Features

* 更新页脚备案号 ([c425f6e](https://github.com/hhui64/livekun-web/commit/c425f6ede1f16a224713f7b3d482190dddc38e9d))
* 新的礼物价值展示 ([ab67755](https://github.com/hhui64/livekun-web/commit/ab677559559631d391b1a11a017ba915117fc2f2))
* 新的字体样式 ([0346c3f](https://github.com/hhui64/livekun-web/commit/0346c3f1e168db402fd1d7b695fd5a1a76ccc97c))
* 新增自定义黑名单功能 ([7ff5e99](https://github.com/hhui64/livekun-web/commit/7ff5e99762d331d28ec65afc793e5439d96d8b81))
* 应用全局配置文件 ([14f7903](https://github.com/hhui64/livekun-web/commit/14f790384669ebde8b3301476eb2a21621cf4b20))
* **api/http:** 生产环境使用 https 和 wss 协议 ([7882f8a](https://github.com/hhui64/livekun-web/commit/7882f8a056fd36a40843d7f25022beb9524f2aca))
* **ChatMessage:** 新增支持粉丝牌显示 ([4f1c7f5](https://github.com/hhui64/livekun-web/commit/4f1c7f519e315863d2d32a72886b6d7689ead68c))
* **ChatMessageConfigPage:** 新增部分配置字段 ([10d5417](https://github.com/hhui64/livekun-web/commit/10d5417a4eab73f3af5417a16e086195f8caa99a))
* **HBadge:** 新增粉丝牌组件 ([9bcfea5](https://github.com/hhui64/livekun-web/commit/9bcfea5eabc024deae2ce2a12e408b3cfb2d8ef3))
* **TestPage:** 新增粉丝牌组件的测试用例 ([e1145e3](https://github.com/hhui64/livekun-web/commit/e1145e309e8d4c732c4516490cb417d7374d26ec))


### Performance Improvements

* 不再显示汉字之间的空格 ([ad53ccd](https://github.com/hhui64/livekun-web/commit/ad53ccd789f0aa640f3913bbd8576f328bb34909))
* 更新类名 ([172c224](https://github.com/hhui64/livekun-web/commit/172c224ba5c3d6303139e47f7ed88ccca4df8d3f))
* 优化 `SC卡片` 的样式 ([b0b90f1](https://github.com/hhui64/livekun-web/commit/b0b90f1cc6c39ebddb95513297c8fb4a7da3dedb))
* 优化部分组件的配置缺省值 ([9f60313](https://github.com/hhui64/livekun-web/commit/9f60313a25f94dc0ed9472c341598cadb625d1c1))
* 优化导航项目显示名称 ([2bfa6d4](https://github.com/hhui64/livekun-web/commit/2bfa6d4b59c3878db7c2e064b64f6d8e29521347))
* 优化昵称文字大小 ([0292494](https://github.com/hhui64/livekun-web/commit/029249418b5ca42a4ec63f8237386ac598057d63))
* 优化设置页面样式 ([65e5ff1](https://github.com/hhui64/livekun-web/commit/65e5ff1a980750879bcc052d7ee842e6dd789d38))
* 优化通用组件预览框背景样式 ([70538f0](https://github.com/hhui64/livekun-web/commit/70538f0cec3e6fc1aea2aa36dba63eca6c8ebe3b))
* 优化消息组件样式、暂时取消身份标识展示 ([266faca](https://github.com/hhui64/livekun-web/commit/266faca06dfa17bcbeab1285dab99eb699d7438d))
* 优化页脚版权样式 ([e78e1c5](https://github.com/hhui64/livekun-web/commit/e78e1c5fe25c48d5b93f8e6c3935d0973ff931c7))
* 优化一些组件样式 ([09debf1](https://github.com/hhui64/livekun-web/commit/09debf11abcb46b0fc02b365b63aef50fba17c53))
* **ChatMessage:** 优化组件样式 ([4020e23](https://github.com/hhui64/livekun-web/commit/4020e2314648363dd7674e67dc8a9eade9f0b692))
* **ChatMessageList:** 优化从 store 获取组件的配置 ([6583f38](https://github.com/hhui64/livekun-web/commit/6583f38d6365b530e8348c89c954654cf726fdc7))
* **HBadge:** 优化组件样式 ([e4fa835](https://github.com/hhui64/livekun-web/commit/e4fa83546a6144f9da23e7cbd100df481043ce24))
* **views/Home:** 优化右上角 tips 样式 ([ed79d45](https://github.com/hhui64/livekun-web/commit/ed79d454ca07e5925ce733069c1a9fb25a1f426d))



# [1.0.0-alpha.6](https://github.com/hhui64/livekun-web/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2022-06-08)


### Bug Fixes

* 修复登录页 footer 版权文字有误的问题 ([34cc9d1](https://github.com/hhui64/livekun-web/commit/34cc9d18db533f4ba1e4c17488837ec366b347ba))


### Features

* 新增支持多徽章图标显示 ([e19dd31](https://github.com/hhui64/livekun-web/commit/e19dd317f7673c461908fd0c17e7abf5fc9726b1))
* 新增支持显示守护图标 ([f21244c](https://github.com/hhui64/livekun-web/commit/f21244c4303365ecccb71dca74901f95ce7d8ca3))
* 页面文案通过接口获取 ([f6fd5ab](https://github.com/hhui64/livekun-web/commit/f6fd5ab7168df1e416b45a3827875700613fb91d))


### Performance Improvements

* 优化礼物卡片预览样式 ([5335e69](https://github.com/hhui64/livekun-web/commit/5335e69b5ebeefc888466c969ba0d0cff35fee30))
* 优化守护昵称颜色 ([1c8b890](https://github.com/hhui64/livekun-web/commit/1c8b890f35333729e28b80a1b8f960e8287baf6a))
* 优化页脚版权信息 ([cd20636](https://github.com/hhui64/livekun-web/commit/cd20636e430308806a60c01250048becfdf171e6))



# [1.0.0-alpha.5](https://github.com/hhui64/livekun-web/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2022-06-07)


### Features

* 新的消息列表样式 ([d182e3a](https://github.com/hhui64/livekun-web/commit/d182e3a97de30583940d4d755473740606336545))
* 新增消息列表支持显示礼物消息 ([71d9119](https://github.com/hhui64/livekun-web/commit/71d91193793d9a9976691e336a57a96915c3e88e))


### Performance Improvements

* 优化部分样式 ([12929b8](https://github.com/hhui64/livekun-web/commit/12929b8c46b8f5a3268742a2e1de2948bf7aa63a))



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



