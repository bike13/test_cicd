pipeline {
    agent any
    
    environment {
        // 定义环境变量
        NODE_VERSION = '18'
        APP_NAME = 'hello-world-app'
        DEPLOY_PORT = '8080'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '正在检出代码...'
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo '开始构建项目...'
                script {
                    // 检查Node.js环境
                    sh 'node --version || echo "Node.js not found"'
                    sh 'npm --version || echo "npm not found"'
                }
            }
        }
        
        stage('Test') {
            steps {
                echo '运行测试...'
                script {
                    // 简单的健康检查
                    sh '''
                        echo "检查静态文件..."
                        if [ -f "static/chat.html" ]; then
                            echo "✓ HTML文件存在"
                        else
                            echo "✗ HTML文件不存在"
                            exit 1
                        fi
                        
                        echo "检查文件内容..."
                        if grep -q "Hello World" static/chat.html; then
                            echo "✓ Hello World内容存在"
                        else
                            echo "✗ Hello World内容不存在"
                            exit 1
                        fi
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo '开始部署...'
                script {
                    // 创建部署目录
                    sh '''
                        mkdir -p /tmp/${APP_NAME}
                        cp -r static /tmp/${APP_NAME}/
                        cp package.json /tmp/${APP_NAME}/ 2>/dev/null || echo "package.json not found, skipping"
                    '''
                    
                    // 启动简单的HTTP服务器
                    sh '''
                        cd /tmp/${APP_NAME}
                        echo "启动HTTP服务器在端口 ${DEPLOY_PORT}..."
                        
                        # 使用Python启动简单HTTP服务器
                        if command -v python3 &> /dev/null; then
                            nohup python3 -m http.server ${DEPLOY_PORT} > server.log 2>&1 &
                        elif command -v python &> /dev/null; then
                            nohup python -m SimpleHTTPServer ${DEPLOY_PORT} > server.log 2>&1 &
                        else
                            echo "Python not found, using Node.js http-server"
                            npx http-server -p ${DEPLOY_PORT} -d false > server.log 2>&1 &
                        fi
                        
                        echo $! > server.pid
                        sleep 3
                        
                        # 检查服务器是否启动成功
                        if curl -f http://localhost:${DEPLOY_PORT}/static/chat.html > /dev/null 2>&1; then
                            echo "✓ 服务器启动成功"
                        else
                            echo "✗ 服务器启动失败"
                            exit 1
                        fi
                    '''
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo '执行健康检查...'
                script {
                    sh '''
                        echo "等待服务器完全启动..."
                        sleep 5
                        
                        # 检查服务器响应
                        if curl -f http://localhost:${DEPLOY_PORT}/static/chat.html > /dev/null 2>&1; then
                            echo "✓ 健康检查通过"
                            echo "应用已成功部署到: http://localhost:${DEPLOY_PORT}/static/chat.html"
                        else
                            echo "✗ 健康检查失败"
                            exit 1
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo '部署成功！'
            script {
                sh '''
                    echo "=========================================="
                    echo "🎉 部署成功！"
                    echo "📱 访问地址: http://localhost:${DEPLOY_PORT}/static/chat.html"
                    echo "📁 部署目录: /tmp/${APP_NAME}"
                    echo "🆔 进程ID: $(cat /tmp/${APP_NAME}/server.pid 2>/dev/null || echo 'N/A')"
                    echo "=========================================="
                '''
            }
        }
        failure {
            echo '部署失败！'
            script {
                sh '''
                    echo "=========================================="
                    echo "❌ 部署失败！"
                    echo "📋 请检查日志信息"
                    echo "=========================================="
                '''
            }
        }
        always {
            echo '清理工作空间...'
            // 这里可以添加清理步骤
        }
    }
}
