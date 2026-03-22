---
id: research-3
emoji: 
image: "images/research/GOAE.png"
date: 2023-03-15
title: Make Encoder Great Again in 3D GAN Inversion through Geometry and Occlusion-Aware Encoding
title_zh: 通过几何与遮挡感知构建3D GAN反演编码器
excerpt: ICCV2023
excerpt_zh: ICCV2023
---

# [Make Encoder Great Again in 3D GAN Inversion through Geometry and Occlusion-Aware Encoding](https://eg3d-goae.github.io/)

## Abstract

This is an **open-source** work which achieves high reconstruction fidelity and reasonable 3D geometry simultaneously from a single image input. Our work could be aplied in Novel View Synthesis, 3D-Consistent Editing. 

## Methodology

Our framework could be divided into two parts. 
- W space inversion.  We design an encoder E to invert input image I into w+ latent codes
- Complement the F space. We calculate the image residual △I between the input image and its reconstruction and propose AFA module to refine the F latent maps.

## [Project WebPage 🔗](https://eg3d-goae.github.io/)

---zh---

# 通过几何与遮挡感知构建3D GAN反演编码器

## 摘要

这是一项**开源**工作，它仅需单张图像输入即可同时实现高保真度的重建和合理的3D几何形状。我们的工作可应用于新视角合成和3D一致性编辑。

## 方法论

我们的框架可以分为两部分：

- W 空间反转。我们设计了一个编码器 E，将输入图像 I 反转为 w+ 个潜在编码。

- F 空间补全。我们计算输入图像与其重建图像之间的图像残差 △I，并提出 AFA 模块来优化 F 潜在映射。

## [项目主页 🔗](https://eg3d-goae.github.io/)

