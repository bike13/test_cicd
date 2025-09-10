const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// 设置静态文件目录
app.use('/static', express.static(path.join(__dirname, 'static')));

// 根路径重定向到Hello World页面
app.get('/', (req, res) => {
    res.redirect('/static/chat.html');
});

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// API端点示例
app.get('/api/hello', (req, res) => {
    res.json({
        message: 'Hello World from API!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 服务器已启动`);
    console.log(`📱 访问地址: http://localhost:${PORT}`);
    console.log(`🌐 Hello World页面: http://localhost:${PORT}/static/chat.html`);
    console.log(`❤️  健康检查: http://localhost:${PORT}/health`);
    console.log(`🔗 API端点: http://localhost:${PORT}/api/hello`);
    console.log(`⏰ 启动时间: ${new Date().toLocaleString('zh-CN')}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
    console.log('收到SIGTERM信号，正在关闭服务器...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('收到SIGINT信号，正在关闭服务器...');
    process.exit(0);
});
