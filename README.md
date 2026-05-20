# 《清明上河图》交互式导览

> 8 年级中国历史选做作业
> 作者：Anthony Pan
> 完成日期：2026 年 5 月

一个交互式网页,展示北宋张择端《清明上河图》。在画卷上叠加 10 个可点击的「热点」,每个热点对应画上的一个细节,点击后弹出讲解,引用《东京梦华录》等北宋史料。

---

## 一、项目背景

**《清明上河图》** 是北宋画家张择端的代表作,绢本设色,长 528 厘米、宽 24.8 厘米,描绘了北宋都城汴京(今河南开封)清明时节的城市风貌。它不只是一幅风俗画,更是一份**北宋社会经济的视觉档案**——城门、河运、店铺、行人、桥梁、街市……几乎每一个细节都能在《东京梦华录》等北宋史料中找到对应的文字描述。

这个网页的目的,是把"看画"和"读史"这两件事融合在一起：你点击画上的一处店铺,就能看到孟元老在《东京梦华录》卷二里对汴京酒楼的真实描写。

---

## 二、功能

### MVP

- 画卷横向滚动(拖拽 / 鼠标滚轮 / 触屏滑动)
- **10 个可点击热点**,分 4 类(商业 / 交通 / 人物 / 建筑),不同颜色
- 详情面板：标题、副标题、80+ 字讲解、史料原文引用
- 上一处 / 下一处 / ESC 关闭 / 方向键导航
- 顶部分类筛选
- 底部缩略导航条 + 当前位置百分比
- 进入页面先看欢迎页

### 加分项

- **进度追踪**:localStorage 记录已探索热点,头部显示「已探索 X / 10」
- **小测验**:探索完全部 10 个热点后,右下角解锁 5 题选择题
- **响应式适配**:桌面端右侧抽屉、移动端底部弹出
- **键盘快捷键**:← → 翻页,ESC 关闭
- **DEV 模式坐标拾取**:URL 加 `?dev=1` 后,点击画卷任意位置,坐标输出到 console

---

## 三、技术栈

| 类别 | 技术 |
|---|---|
| 构建工具 | Vite 5 |
| 框架 | React 18 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 3 |
| 字体 | Noto Serif SC(标题) + Noto Sans SC(正文),Google Fonts |
| 数据 | 静态 JSON(`src/data/hotspots.json`) |
| 状态 | React useState + localStorage |
| 后端 | 无 |
| 部署 | Vercel |

整个项目无后端、无数据库,纯静态站点,可托管到任何 CDN。

---

## 四、本地运行

### 准备

```bash
node -v   # ≥ 18,我用的是 v25
pnpm -v   # 或 npm,本项目用 pnpm
```

### 步骤

```bash
# 1. 进入项目目录(注意路径有空格,要加引号)
cd "/path/to/2026选做"

# 2. 安装依赖
pnpm install

# 3. 把画卷图放进 public/images/ 目录
# 文件名必须是 qingming-full.jpg
# 详见 public/images/README.md

# 4. 启动开发服务器
pnpm dev
# 打开 http://localhost:5173

# 5. 生产构建
pnpm build
# 输出到 dist/

# 6. 本地预览构建结果
pnpm preview
```

---

## 五、文件结构

```
2026选做/
├── public/
│   └── images/
│       └── qingming-full.jpg     ← 自己下载放进来
├── src/
│   ├── components/
│   │   ├── IntroScreen.tsx       首屏欢迎页
│   │   ├── Scroll.tsx            画卷主组件(拖拽滚动 + 渲染)
│   │   ├── Hotspot.tsx           单个热点(脉冲动画 + tooltip)
│   │   ├── DetailPanel.tsx       详情面板(右抽屉/底部弹出)
│   │   ├── FilterBar.tsx         顶部分类筛选
│   │   ├── MiniMap.tsx           底部缩略导航条
│   │   └── Quiz.tsx              加分项:5 题小测验
│   ├── data/
│   │   └── hotspots.json         10 个热点的完整内容(在这里加新热点)
│   ├── hooks/
│   │   └── useProgress.ts        localStorage 进度追踪
│   ├── App.tsx                   主应用组件
│   ├── main.tsx                  入口
│   ├── index.css                 全局样式 + Tailwind 指令
│   └── types.ts                  TypeScript 类型定义
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 六、如何调整热点位置

热点坐标用画卷的**百分比**表示(x: 0–100 横向, y: 0–100 纵向),所有分辨率下都自动对齐。

### 简单方法:DEV 模式

1. 启动开发服务器 `pnpm dev`
2. 浏览器打开 `http://localhost:5173/?dev=1`
3. 进入主界面,点击画卷上想标记的位置
4. 打开控制台(F12),会看到类似输出:
   ```
   [DEV] hotspot coord:  "position": { "x": 42.5, "y": 58.3 }
   ```
5. 复制粘贴到 `src/data/hotspots.json` 对应热点的 `position` 字段
6. 关掉 DEV 模式(去掉 `?dev=1`)就回到正常浏览

### 加新热点

只改 `src/data/hotspots.json`,不动代码:

```json
{
  "id": 11,
  "category": "commerce",
  "title": "你的标题",
  "subtitle": "你的副标题",
  "position": { "x": 50, "y": 50 },
  "description": "至少 80 字的讲解,说清楚是什么 + 反映了北宋什么现象。",
  "source": {
    "book": "东京梦华录",
    "author": "孟元老",
    "volume": "卷X·节名",
    "quote": "原文引用"
  }
}
```

支持的 `category`:`commerce`(商业) / `transport`(交通) / `people`(人物) / `building`(建筑)。

---

## 七、史料参考

### 主要史料

- **《东京梦华录》**(北宋 · 孟元老)
  孟元老是北宋遗民,南渡后凭记忆写下汴京风物,共十卷,从城门、街道、酒楼、节令、伎艺到节日饮食,无所不包,是研究北宋城市生活最重要的第一手资料。所有热点的引文都源于此书。
  - 卷一:旧京城、河道、大内
  - 卷二:酒楼、东角楼街巷、潘楼东街巷
  - 卷三:雇觅人力、防火、马行街铺席
  - 卷五:京瓦伎艺、民俗
  - 卷六:收灯都人出城探春

### 辅助参考(背景知识)

- 《宋史》(元 · 脱脱等)— 食货志、河渠志、地理志
- 《续资治通鉴长编》(南宋 · 李焘)— 北宋编年史
- 余辉《隐忧与曲谏:〈清明上河图〉解码录》(2015)— 美术史
- 周宝珠《宋代东京研究》— 城市史

### 引文核对

本项目所有引文都标注了**卷次和篇目**。如需核对,可参考:
- 中华书局点校本《东京梦华录》(2006)
- 中国哲学书电子化计划:<https://ctext.org/wiki.pl?if=gb&res=4287>(全文可搜索)

---

## 八、部署到 Vercel

1. 把整个项目推到 GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: 清明上河图交互式导览 MVP"
   git remote add origin https://github.com/你的用户名/qingming-scroll.git
   git push -u origin main
   ```

2. 登录 <https://vercel.com>(用 GitHub 账号登录)

3. 点 **New Project** → 选你的 repo

4. Vercel 会自动检测出是 Vite 项目,**保持默认设置直接 Deploy**

5. 等 1–2 分钟,得到一个 `*.vercel.app` 链接,就是你的可访问地址

6. 之后每次 `git push` 都会自动重新部署

> **注意**:如果画卷图很大(>50MB),Vercel 免费版有 100 MB 文件上限,可以考虑压缩或托管到 Cloudflare R2 / GitHub Releases。

---

## 九、已知局限

- 画卷图当前需要手动下载放入 `public/images/`(版权问题不能内置)
- 缩放功能尚未实现(MVP 不需要)
- 不支持多语言切换(暂未实现)
- AI 对话气泡(脑洞功能)未实现

---

## 十、致谢

- 张择端,创造了这幅九百年不朽的画卷
- 孟元老,留下了汴京最生动的文字记录
- 故宫博物院 / 维基共享资源,公开高清图片
- React / Vite / Tailwind CSS 开源社区
- 历史老师

---

**Anthony Pan** · 8 年级中国历史 · 2026 选做作业
