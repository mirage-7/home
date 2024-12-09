# 智能家居控制系统说明文档
## 1. 系统概述
这是一个基于Web的智能家居控制系统，采用前后端分离架构，通过网页界面控制Arduino设备，实现智能家居设备（如LED灯）的远程控制功能。
2. 系统架构
系统由三个主要部分组成：
前端界面：基于HTML/CSS/JavaScript的用户交互界面
后端服务：基于Flask的Python服务器
硬件控制：基于Arduino的硬件控制模块
2.1 技术栈
前端：HTML5, CSS3, JavaScript
后端：Python Flask
硬件：Arduino
通信：Serial通信，HTTP/JSON
3. 功能特性
用户登录界面
实时时钟显示
智能设备控制面板
设备状态实时反馈
错误处理和状态恢复
4. 系统组件
4.1 前端界面
4.2 后端服务
4.3 Arduino控制程序
5. 安装部署
5.1 环境要求
Python 3.7+
Arduino IDE
现代浏览器（Chrome, Firefox等）
5.2 依赖安装
5.3 硬件连接
LED接线：
LED正极 → 220Ω电阻 → Arduino 13号引脚
LED负极 → Arduino GND
Arduino连接：
通过USB线连接Arduino和电脑
6. 使用说明
6.1 启动系统
上传Arduino程序：
启动后端服务：
访问系统：
打开浏览器访问 http://localhost:5000
6.2 操作指南
登录系统
在控制面板中可以看到设备状态
点击开关按钮控制设备
观察设备状态变化和反馈信息
