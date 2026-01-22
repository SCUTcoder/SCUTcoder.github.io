# 章程的个人主页 | Personal Portfolio

```
 _____ _                           _____ _                       
|__  /| |__   __ _ _ __   __ _   / ____| |__   ___ _ __   __ _ 
  / / | '_ \ / _` | '_ \ / _` | | |    | '_ \ / _ \ '_ \ / _` |
 / /__| | | | (_| | | | | (_| | | |____| | | |  __/ | | | (_| |
/____|_| |_|\__,_|_| |_|\__, |  \_____|_| |_|\___|_| |_|\__, |
                        |___/                           |___/ 
```

## 🚀 GitHub.io 极客风格个人主页

这是一个采用 GitHub.io 极客风格设计的个人技术主页，专注于展示后端开发、分布式系统和AI技术方面的专业能力。

### ✨ 特色

- 🎨 **深色主题**: 类似 GitHub 的深色配色方案 (`#0d1117` 背景)
- 💻 **终端风格**: 使用等宽字体 (JetBrains Mono) 和命令行提示符元素
- 🎯 **极简设计**: 去除华丽装饰，专注内容展示
- 📱 **响应式布局**: 完美适配各种屏幕尺寸
- ⚡ **性能优化**: 轻量级代码，快速加载

### 🎨 设计元素

**配色方案** (GitHub Style):
- 主色 (Primary): `#58a6ff` - GitHub 蓝
- 强调色 (Secondary): `#39d353` - GitHub 绿
- 警告色 (Accent): `#f78166` - GitHub 橙
- 深色背景: `#0d1117`
- 更深背景: `#010409`
- 卡片背景: `#161b22`
- 主文字: `#c9d1d9`
- 次要文字: `#8b949e`
- 边框: `#30363d`

**字体系统**:
```css
font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'Monaco', monospace;
```

### 🛠️ 技术栈

- **HTML5** - 语义化标签
- **CSS3** - 现代CSS特性 (Grid, Flexbox, Custom Properties)
- **Vanilla JavaScript** - 无框架依赖
- **Font Awesome 6.4.0** - 图标库
- **Google Fonts** - JetBrains Mono 字体

### 📂 文件结构

```
githubio/
├── index.html          # 主页面
├── styles.css          # 样式表 (GitHub 极客风格)
├── script.js           # 交互脚本
├── 照片.jpg            # 个人照片
├── 壁纸.jpg            # 可选背景壁纸
├── 章程的简历.pdf       # 简历文档
└── README.md           # 说明文档
```

### 🎯 核心功能

#### 1. 导航栏
- 固定顶部，半透明毛玻璃效果
- 平滑滚动导航
- 响应式汉堡菜单
- 壁纸切换开关

#### 2. Hero 区域
- 终端风格的标题和副标题
- 带有命令提示符 (`$`, `>`) 的文本
- 闪烁光标动画
- 统计数据展示
- 行动号召按钮

#### 3. 教育背景
- 卡片式布局
- 图标徽章
- 悬停效果

#### 4. 技能矩阵
- 分类展示技术栈
- 三级熟练度标识:
  - 🟢 Expert (绿色)
  - 🔵 Advanced (蓝色)
  - 🟡 Intermediate (黄色)

#### 5. 工作经验
- GitHub 风格时间线
- 详细职责描述
- 技术标签

#### 6. 项目展示
- GitHub 仓库卡片风格
- 技术栈标签
- 性能指标展示
- 源码链接

#### 7. 研究成果
- 学术论文展示
- 作者信息和影响力标识
- 期刊/会议链接

#### 8. 联系方式
- 多渠道联系信息
- 表单验证
- 终端风格图标

### 🎨 风格特点

#### 终端风格元素
```
# Section 标题        → Markdown 标题语法
// 副标题            → 代码注释风格
$ 命令提示符         → Shell 提示符
> 列表项            → 终端输出指示符
~/zhangcheng        → Unix 路径风格
█                   → 闪烁光标
```

#### GitHub 风格特性
- ✅ 简洁的卡片设计
- ✅ 清晰的边框和层次
- ✅ 细腻的悬停效果
- ✅ 代码块风格的标签
- ✅ 点阵网格背景
- ✅ 自定义滚动条
- ✅ GitHub 绿色提交图风格

### 🚀 快速开始

#### 本地预览

```bash
# 克隆仓库
git clone <your-repo-url>
cd githubio

# 使用 Python 启动本地服务器
python -m http.server 8000

# 或使用 Node.js
npx serve

# 访问 http://localhost:8000
```

#### 部署到 GitHub Pages

1. 创建 GitHub 仓库
2. 上传文件到仓库
3. 进入 Settings → Pages
4. 选择分支和目录
5. 保存并等待部署完成

### 📝 自定义指南

#### 修改个人信息
编辑 `index.html` 文件中的相应部分:
```html
<h1 class="hero-title">你的名字</h1>
<div class="hero-subtitle">你的职位</div>
```

#### 更换照片
替换 `照片.jpg` 文件，保持文件名不变

#### 调整配色方案
修改 `styles.css` 中的 CSS 变量:
```css
:root {
    --primary-color: #58a6ff;     /* 主色 */
    --secondary-color: #39d353;    /* 强调色 */
    --accent-color: #f78166;       /* 警告色 */
    /* ... */
}
```

#### 添加新项目
在项目部分添加新的项目卡片:
```html
<a href="your-github-link" target="_blank" class="project-card-link">
    <div class="project-card">
        <!-- 项目内容 -->
    </div>
</a>
```

### 🔧 浏览器支持

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### 📊 性能优化

- 使用 CSS 变量减少重复代码
- 优化图片加载
- 最小化 JavaScript 依赖
- 使用 GPU 加速的 CSS 动画
- 懒加载非关键资源

### 🎯 未来改进

- [ ] 添加暗色/亮色主题切换
- [ ] 集成博客功能
- [ ] 添加更多终端动画效果
- [ ] 多语言支持
- [ ] PWA 支持

### 📄 许可证

MIT License - 随意使用和修改

### 👤 作者

**章程** - 全栈软件开发工程师

- 📧 Email: 1210611347@qq.com
- 💼 GitHub: [@SCUTcoder](https://github.com/SCUTcoder)
- 💼 LinkedIn: [zhangcheng-scut](https://linkedin.com/in/zhangcheng-scut)
- 📱 Phone: +86 13612979060

### 🙏 致谢

- GitHub 的优秀设计语言
- Font Awesome 图标库
- Google Fonts
- 开源社区

---

**Built with ❤️ and ☕**

© 2024-2026 章程 | 专注于分布式系统与后端技术创新

```bash
$ git commit -m "Create awesome GitHub.io style portfolio"
$ git push origin main
$ echo "Mission accomplished! 🚀"
```
