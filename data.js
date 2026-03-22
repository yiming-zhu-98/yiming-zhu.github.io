// ===== SITE DATA =====
// Edit this file to add/modify your posts, research, and blogs

window.SITE_DATA = {

  // ===== TRANSLATIONS =====
  i18n: {
    en: {
      nav_home: "Home",
      nav_research: "Research",
      nav_about: "About Me",
      nav_blogs: "Blogs",
      latest_posts: "Latest Posts",
      research_title: "Research",
      blogs_title: "Blogs",
      about_title: "About Me",
      read_more: "[ READ → ]",
      back: "◀ BACK",
      search_title: "// SEARCH",
      search_placeholder: "Type keywords...",
      search_btn: "🔍",
      no_results: "No results found in this galaxy...",
      hero_greeting: "Welcome, Space Traveler!",
      hero_subtitle: "Exploring the cosmos of knowledge",
      about_badge: "ONLINE",
      footer: "Made with ♥ in the cosmos · GitHub Pages",
      tag_research: "RESEARCH",
      tag_blog: "BLOG",
      posted_on: "Posted on",
      lang_btn: "EN/中",
      theme_day: "☀",
      theme_night: "☾",
      search_icon: "🔍",
    },
    zh: {
      nav_home: "主页",
      nav_research: "研究",
      nav_about: "关于我",
      nav_blogs: "博客",
      latest_posts: "最新发布",
      research_title: "研究",
      blogs_title: "博客",
      about_title: "关于我",
      read_more: "[ 阅读全文 → ]",
      back: "◀ 返回",
      search_title: "// 搜索",
      search_placeholder: "输入关键词...",
      search_btn: "🔍",
      no_results: "在这片星系中没有找到结果...",
      hero_greeting: "欢迎，太空旅行者！",
      hero_subtitle: "探索知识的宇宙",
      about_badge: "在线",
      footer: "用 ♥ 在宇宙中制作 · GitHub Pages",
      tag_research: "研究",
      tag_blog: "博客",
      posted_on: "发布于",
      lang_btn: "中/EN",
      theme_day: "☀",
      theme_night: "☾",
      search_icon: "🔍",
    }
  },

  // ===== ABOUT ME =====
  about: {
    name: "Your Name",
    name_zh: "你的名字",
    tagline: "Researcher · Developer · Explorer",
    tagline_zh: "研究员 · 开发者 · 探索者",
    avatar: "", // Put your avatar image path here, e.g. "images/avatar.png"
    avatar_emoji: "👨‍🚀",
    bio: {
      en: `Hello! I'm a researcher and developer passionate about the intersection of science, technology, and creativity. I explore topics ranging from machine learning to space science, always seeking to understand the universe a little better.\n\nFeel free to reach out — let's explore the cosmos together!`,
      zh: `你好！我是一名热爱科学、技术与创意交叉领域的研究者和开发者。我探索从机器学习到太空科学的各种话题，始终努力更好地理解这个宇宙。\n\n欢迎联系我，让我们一起探索宇宙！`
    },
    skills: [
      { label: "Research", label_zh: "科研", level: 85 },
      { label: "Programming", label_zh: "编程", level: 80 },
      { label: "Writing", label_zh: "写作", level: 75 },
      { label: "Data Analysis", label_zh: "数据分析", level: 70 },
    ],
    socials: [
      { label: "GitHub", url: "https://github.com/yourusername" },
      { label: "Twitter/X", url: "https://twitter.com/yourusername" },
      { label: "Email", url: "mailto:you@example.com" },
    ]
  },

  // ===== RESEARCH POSTS =====
  // Each post: id, emoji (for placeholder), date, title/title_zh, excerpt/excerpt_zh, content/content_zh (markdown)
  research: [
    {
      id: "research-1",
      emoji: "🔭",
      image: "", // Optional: "images/research1.png"
      date: "2025-03-15",
      title: "Deep Learning for Astronomical Image Classification",
      title_zh: "用于天文图像分类的深度学习",
      excerpt: "An investigation into convolutional neural networks applied to classifying galaxies and nebulae from telescope imagery.",
      excerpt_zh: "研究将卷积神经网络应用于从望远镜图像中分类星系和星云的方法。",
      content: `
# Deep Learning for Astronomical Image Classification

## Abstract

This research explores the application of **convolutional neural networks (CNNs)** to classify astronomical objects from telescope imagery, achieving 94.3% accuracy on the benchmark dataset.

## Introduction

The universe contains billions of galaxies, each with unique morphological features. Manual classification is impractical at scale...

## Methodology

We trained a ResNet-50 model on the Galaxy Zoo dataset:

- 270,000 labeled galaxy images
- Data augmentation: rotation, flipping, color jitter
- Transfer learning from ImageNet weights

\`\`\`python
import torch
model = torchvision.models.resnet50(pretrained=True)
model.fc = nn.Linear(2048, num_classes)
\`\`\`

## Results

| Model | Accuracy | F1 Score |
|-------|----------|----------|
| ResNet-50 | 94.3% | 0.941 |
| VGG-16 | 91.2% | 0.909 |
| Custom CNN | 87.5% | 0.872 |

## Conclusion

Deep learning significantly outperforms classical methods for astronomical classification tasks.
      `,
      content_zh: `
# 用于天文图像分类的深度学习

## 摘要

本研究探索将**卷积神经网络（CNN）**应用于从望远镜图像中分类天文对象，在基准数据集上达到了94.3%的准确率。

## 引言

宇宙中有数十亿个星系，每个都有独特的形态特征。大规模手动分类是不切实际的……

## 方法论

我们在Galaxy Zoo数据集上训练了ResNet-50模型：

- 270,000张有标签的星系图像
- 数据增强：旋转、翻转、色彩抖动
- 基于ImageNet权重的迁移学习

\`\`\`python
import torch
model = torchvision.models.resnet50(pretrained=True)
model.fc = nn.Linear(2048, num_classes)
\`\`\`

## 结果

| 模型 | 准确率 | F1分数 |
|------|--------|--------|
| ResNet-50 | 94.3% | 0.941 |
| VGG-16 | 91.2% | 0.909 |
| 自定义CNN | 87.5% | 0.872 |

## 结论

深度学习在天文分类任务中显著优于传统方法。
      `
    },
    {
      id: "research-2",
      emoji: "🌌",
      image: "",
      date: "2025-02-08",
      title: "Mapping Dark Matter Distribution in Galaxy Clusters",
      title_zh: "绘制星系团中暗物质分布图",
      excerpt: "Using gravitational lensing data to reconstruct the dark matter halo profile in nearby galaxy clusters.",
      excerpt_zh: "利用引力透镜数据重建附近星系团的暗物质晕轮廓。",
      content: `
# Mapping Dark Matter Distribution in Galaxy Clusters

Dark matter constitutes roughly **27% of the universe's total mass-energy content**, yet it remains invisible to electromagnetic detection.

## Gravitational Lensing as a Probe

When light from a distant galaxy passes a massive object, its path bends. We exploit this effect to **infer the mass distribution** of galaxy clusters.

## Key Findings

- Dark matter halos extend far beyond visible matter
- NFW profile fits with concentration parameter c ≈ 5-10
- Substructure reveals past merger events

> "The invisible architecture of the cosmos shapes everything we can see." 
      `,
      content_zh: `
# 绘制星系团中暗物质分布图

暗物质构成宇宙总质量-能量含量的约**27%**，但它对电磁探测仍然不可见。

## 引力透镜作为探针

当来自遥远星系的光经过大质量物体时，其路径会弯曲。我们利用这种效应来**推断**星系团的质量分布。

## 主要发现

- 暗物质晕延伸远超可见物质
- NFW轮廓拟合，集中参数c≈5-10
- 子结构揭示了过去的并合事件

> "宇宙的隐形架构塑造了我们所能看见的一切。"
      `
    },
    {
      id: "research-3",
      emoji: "⚛️",
      image: "",
      date: "2024-12-20",
      title: "Quantum Computing Approaches to N-Body Simulation",
      title_zh: "量子计算在N体模拟中的应用",
      excerpt: "Exploring variational quantum algorithms as a potential speedup for gravitational N-body simulations in astrophysics.",
      excerpt_zh: "探索变分量子算法作为天体物理学中引力N体模拟加速的潜在方案。",
      content: `
# Quantum Computing Approaches to N-Body Simulation

Classical N-body simulations scale as O(N²) — prohibitively expensive for large systems. Quantum algorithms offer potential polynomial speedups.

## Variational Quantum Eigensolver (VQE)

We adapt VQE to approximate energy states in gravitational systems...

## Circuit Design

\`\`\`
|0⟩ ─ H ─ Rz(θ₁) ─ CNOT ─ Rz(θ₂) ─ Measure
|0⟩ ─ H ─ Rx(φ₁) ─────────────────── Measure
\`\`\`

## Challenges

- Decoherence limits circuit depth
- NISQ devices introduce gate errors
- Classical optimization bottleneck
      `,
      content_zh: `
# 量子计算在N体模拟中的应用

经典N体模拟的复杂度为O(N²)——对于大型系统来说代价高昂。量子算法提供了潜在的多项式加速。

## 变分量子本征求解器（VQE）

我们改编VQE来近似引力系统中的能量态……

## 电路设计

\`\`\`
|0⟩ ─ H ─ Rz(θ₁) ─ CNOT ─ Rz(θ₂) ─ 测量
|0⟩ ─ H ─ Rx(φ₁) ─────────────────── 测量
\`\`\`

## 挑战

- 退相干限制电路深度
- NISQ设备引入门误差
- 经典优化瓶颈
      `
    }
  ],

  // ===== BLOG POSTS =====
  blogs: [
    {
      id: "blog-1",
      emoji: "🚀",
      image: "",
      date: "2025-03-20",
      title: "My Journey Setting Up a Home Observatory",
      title_zh: "我搭建家庭天文台的历程",
      excerpt: "From a cheap refractor to a motorized equatorial mount — how I built my backyard observatory step by step.",
      excerpt_zh: "从一台廉价折射望远镜到电动赤道仪——我是如何一步步搭建后院天文台的。",
      content: `
# My Journey Setting Up a Home Observatory

It started with a **$89 refractor telescope** on a wobbly tripod. Three years later, I'm imaging galaxies from my backyard.

## Phase 1: The Humble Beginning

My first night with a real telescope was humbling. I couldn't even find Jupiter — the city lights turned the sky into an orange soup.

## Phase 2: Getting Serious

After joining my local astronomy club, I learned:

1. Light pollution maps are essential
2. A goto mount changes everything  
3. **Astrophotography** requires patience above all

## Phase 3: The Current Setup

- **OTA**: Explore Scientific 102mm APO
- **Mount**: Sky-Watcher EQ6-R Pro
- **Camera**: ZWO ASI294MC Pro
- **Software**: PixInsight + NINA

## What's Next

Planning a remote observatory session in the mountains this summer. Clear skies! 🌟
      `,
      content_zh: `
# 我搭建家庭天文台的历程

一切从一台**89美元的折射望远镜**和一个摇摇晃晃的三脚架开始。三年后，我已经在后院拍摄星系了。

## 第一阶段：谦逊的开始

用真正望远镜的第一个夜晚让我感到谦卑。我甚至找不到木星——城市灯光把天空变成了橙色的汤。

## 第二阶段：认真起来

加入当地天文俱乐部后，我学到了：

1. 光污染地图至关重要
2. 自动导向赤道仪改变了一切
3. **天文摄影**最需要的是耐心

## 第三阶段：当前配置

- **镜筒**：Explore Scientific 102mm APO
- **赤道仪**：Sky-Watcher EQ6-R Pro
- **相机**：ZWO ASI294MC Pro
- **软件**：PixInsight + NINA

## 下一步计划

今年夏天计划在山区进行远程天文台拍摄。晴空万里！🌟
      `
    },
    {
      id: "blog-2",
      emoji: "💫",
      image: "",
      date: "2025-03-01",
      title: "Five Habits That Made Me a Better Researcher",
      title_zh: "让我成为更好研究者的五个习惯",
      excerpt: "After five years in academia, here are the habits that transformed my research productivity and quality.",
      excerpt_zh: "在学术界五年后，这些习惯改变了我的研究效率和质量。",
      content: `
# Five Habits That Made Me a Better Researcher

Academia is brutal. Here's what actually helped me survive and thrive.

## 1. Write Every Day, Even Badly

Don't wait for inspiration. Set a **25-minute timer** and write. Anything. The editing comes later.

## 2. Read Outside Your Field

My best research ideas came from reading **biology papers** and **economics journals** — domains completely foreign to my field.

## 3. Maintain a Research Journal

Every experiment, every failed attempt, every random thought. Future-you will thank present-you.

## 4. Teach What You Learn

When you can explain a concept to a first-year student, **you actually understand it**.

## 5. Protect Your Deep Work Time

Disable notifications. Block your calendar. Your best thinking happens in uninterrupted blocks.

---

What habits have helped you? Reach out!
      `,
      content_zh: `
# 让我成为更好研究者的五个习惯

学术界很残酷。以下是真正帮助我生存和发展的方法。

## 1. 每天写作，哪怕写得不好

不要等待灵感。设置**25分钟计时器**然后写作，写任何东西。编辑工作留到以后。

## 2. 阅读你领域之外的内容

我最好的研究想法来自阅读**生物学论文**和**经济学期刊**——完全陌生的领域。

## 3. 保持研究日志

每一个实验、每一次失败的尝试、每一个随机想法都记录下来。未来的你会感谢现在的你。

## 4. 教你所学

当你能向大一学生解释一个概念时，**你才真正理解了它**。

## 5. 保护你的深度工作时间

关闭通知，锁定日历。你最好的思考发生在不被打断的时间块中。

---

哪些习惯帮助了你？欢迎联系！
      `
    },
    {
      id: "blog-3",
      emoji: "🌙",
      image: "",
      date: "2025-02-14",
      title: "The Night I Saw the Andromeda Galaxy for the First Time",
      title_zh: "我第一次看到仙女座星系的那个夜晚",
      excerpt: "A personal account of that magical moment when a fuzzy smear in an eyepiece became the most profound thing I'd ever witnessed.",
      excerpt_zh: "一段个人回忆——当目镜中的一块模糊斑点变成了我见过的最震撼景象的那个魔幻时刻。",
      content: `
# The Night I Saw the Andromeda Galaxy for the First Time

It was a cold October night, and my fingers were numb. I'd been hunting it for two hours — sweeping back and forth across Cassiopeia with my little 8x42 binoculars.

Then there it was.

A **ghostly oval smear**, barely distinct from the background sky. Fainter than I expected. Smaller than the photos. But utterly, completely real.

## What I Was Actually Seeing

That fuzzy blob contains approximately **one trillion stars**. Light that left it **2.537 million years ago** — when our ancestors were using stone tools — had just entered my eyes.

I sat down on the cold grass and stayed there for a long time.

## The Universe Doesn't Care — And That's Okay

There's something simultaneously humbling and liberating about realizing how insignificant we are cosmically. It puts everything — deadlines, arguments, worries — in perspective.

The Andromeda Galaxy will collide with the Milky Way in about **4.5 billion years**. We'll be fine.

*Clear skies, always.* 🌌
      `,
      content_zh: `
# 我第一次看到仙女座星系的那个夜晚

那是一个寒冷的十月夜晚，我的手指已经麻木。我用8x42双筒望远镜在仙后座附近来回扫视了两个小时，一直在寻找它。

然后，它出现了。

一个**幽灵般的椭圆模糊斑点**，与背景星空几乎没有区别。比我预期的更暗淡，比照片上的更小。但它是完全真实的。

## 我实际上看到的是什么

那个模糊斑点包含大约**一万亿颗恒星**。**253.7万年前**离开它的光——那时我们的祖先还在使用石器——刚刚进入了我的眼睛。

我坐在冰冷的草地上，在那里待了很长时间。

## 宇宙不在乎——这没关系

意识到我们在宇宙中是多么渺小，这既让人谦卑，又令人解脱。它把一切——截止日期、争论、担忧——都放到了应有的位置。

仙女座星系将在大约**45亿年后**与银河系碰撞。我们会没事的。

*愿晴空常在。* 🌌
      `
    }
  ]
};
