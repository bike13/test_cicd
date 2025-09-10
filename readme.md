# Hello World 应用

这是一个简单的Hello World应用，用于演示Jenkins CI/CD部署流程。

## 项目结构

```
test_cicd/
├── static/
│   └── chat.html          # 前端页面
├── server.js              # Node.js后端服务器
├── package.json           # 项目依赖配置
├── Jenkinsfile           # Jenkins CI/CD配置
└── README.md             # 项目说明文档
```

## 功能特性

- ✅ 美观的Hello World前端界面
- ✅ 实时时间显示
- ✅ 交互式测试按钮
- ✅ 用户代理信息显示
- ✅ 响应式设计
- ✅ 健康检查API
- ✅ Jenkins自动化部署

## 快速开始

### 本地运行

1. 安装依赖：
```bash
npm install
```

2. 启动服务器：
```bash
npm start
```

3. 访问应用：
- 主页：http://localhost:8080
- Hello World页面：http://localhost:8080/static/chat.html
- 健康检查：http://localhost:8080/health
- API端点：http://localhost:8080/api/hello

### Jenkins部署

1. 在Jenkins中创建新的Pipeline项目
2. 配置Pipeline脚本从SCM获取
3. 指定Jenkinsfile路径
4. 运行构建

## Jenkins Pipeline阶段

1. **Checkout**: 检出代码
2. **Build**: 构建项目
3. **Test**: 运行测试和健康检查
4. **Deploy**: 部署到临时目录
5. **Health Check**: 验证部署结果

## 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0
- Jenkins (用于CI/CD)
- Python (用于简单HTTP服务器，可选)

## 部署说明

Jenkins Pipeline会自动：
1. 检查项目文件完整性
2. 验证Hello World内容
3. 启动HTTP服务器
4. 执行健康检查
5. 提供访问地址

## 访问地址

部署成功后，可以通过以下地址访问：
- 前端页面：http://localhost:8080/static/chat.html
- 健康检查：http://localhost:8080/health
- API接口：http://localhost:8080/api/hello

## 故障排除

### 常见问题

1. **端口被占用**
   - 修改`DEPLOY_PORT`环境变量
   - 或修改`server.js`中的端口配置

2. **依赖安装失败**
   - 检查Node.js版本
   - 清理npm缓存：`npm cache clean --force`

3. **Jenkins构建失败**
   - 检查Jenkins环境配置
   - 查看构建日志获取详细错误信息

## 技术栈

- **前端**: HTML5, CSS3, JavaScript
- **后端**: Node.js, Express
- **部署**: Jenkins Pipeline
- **服务器**: Express HTTP Server

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！
