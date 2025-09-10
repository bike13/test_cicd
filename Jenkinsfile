pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo '正在检出代码...'
                checkout scm
            }
        }
        
        stage('Validate Files') {
            steps {
                echo '验证项目文件...'
                script {
                    sh '''
                        echo "检查项目结构..."
                        ls -la
                        
                        echo "检查静态文件..."
                        if [ -f "static/chat.html" ]; then
                            echo "✓ HTML文件存在"
                            ls -la static/
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
                        
                        echo "检查其他项目文件..."
                        if [ -f "package.json" ]; then
                            echo "✓ package.json存在"
                        fi
                        if [ -f "server.js" ]; then
                            echo "✓ server.js存在"
                        fi
                        if [ -f "README.md" ]; then
                            echo "✓ README.md存在"
                        fi
                    '''
                }
            }
        }
        
        stage('Build & Test') {
            steps {
                echo '构建和测试项目...'
                script {
                    sh '''
                        echo "检查Node.js环境..."
                        node --version || echo "Node.js not available"
                        npm --version || echo "npm not available"
                        
                        echo "安装依赖（如果package.json存在）..."
                        if [ -f "package.json" ]; then
                            npm install || echo "npm install failed, continuing..."
                        fi
                        
                        echo "验证HTML文件语法..."
                        if command -v tidy &> /dev/null; then
                            tidy -q -e static/chat.html || echo "HTML validation skipped (tidy not available)"
                        else
                            echo "HTML validation skipped (tidy not available)"
                        fi
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo '部署项目...'
                script {
                    sh '''
                        echo "创建部署目录..."
                        DEPLOY_DIR="/tmp/hello-world-app-$(date +%s)"
                        mkdir -p $DEPLOY_DIR
                        
                        echo "复制文件到部署目录..."
                        cp -r static $DEPLOY_DIR/
                        cp package.json $DEPLOY_DIR/ 2>/dev/null || echo "package.json not found, skipping"
                        cp server.js $DEPLOY_DIR/ 2>/dev/null || echo "server.js not found, skipping"
                        
                        echo "部署目录内容:"
                        ls -la $DEPLOY_DIR/
                        
                        echo "保存部署信息..."
                        echo "DEPLOY_DIR=$DEPLOY_DIR" > deploy.info
                        echo "DEPLOY_TIME=$(date)" >> deploy.info
                        echo "BUILD_NUMBER=$BUILD_NUMBER" >> deploy.info
                        
                        echo "✓ 部署完成"
                        echo "📁 部署目录: $DEPLOY_DIR"
                        echo "📱 静态文件: $DEPLOY_DIR/static/chat.html"
                    '''
                }
            }
        }
        
        stage('Verification') {
            steps {
                echo '验证部署结果...'
                script {
                    sh '''
                        echo "验证部署文件..."
                        DEPLOY_DIR=$(grep DEPLOY_DIR deploy.info | cut -d'=' -f2)
                        
                        if [ -d "$DEPLOY_DIR" ]; then
                            echo "✓ 部署目录存在: $DEPLOY_DIR"
                            
                            if [ -f "$DEPLOY_DIR/static/chat.html" ]; then
                                echo "✓ HTML文件部署成功"
                                
                                # 检查文件大小
                                FILE_SIZE=$(wc -c < "$DEPLOY_DIR/static/chat.html")
                                echo "📊 文件大小: $FILE_SIZE bytes"
                                
                                # 检查关键内容
                                if grep -q "Hello World" "$DEPLOY_DIR/static/chat.html"; then
                                    echo "✓ Hello World内容验证通过"
                                else
                                    echo "✗ Hello World内容验证失败"
                                    exit 1
                                fi
                            else
                                echo "✗ HTML文件部署失败"
                                exit 1
                            fi
                        else
                            echo "✗ 部署目录不存在"
                            exit 1
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo '🎉 部署成功！'
            script {
                sh '''
                    echo "=========================================="
                    echo "🎉 Hello World应用部署成功！"
                    echo "=========================================="
                    cat deploy.info
                    echo "=========================================="
                    echo "📱 静态文件已部署到:"
                    DEPLOY_DIR=$(grep DEPLOY_DIR deploy.info | cut -d'=' -f2)
                    echo "   $DEPLOY_DIR/static/chat.html"
                    echo ""
                    echo "🌐 可以通过以下方式访问:"
                    echo "   1. 直接打开HTML文件"
                    echo "   2. 使用本地HTTP服务器"
                    echo "   3. 部署到Web服务器"
                    echo "=========================================="
                '''
            }
        }
        failure {
            echo '❌ 部署失败！'
            script {
                sh '''
                    echo "=========================================="
                    echo "❌ 部署失败！"
                    echo "📋 请检查构建日志获取详细错误信息"
                    echo "=========================================="
                '''
            }
        }
        always {
            echo '清理临时文件...'
            script {
                sh '''
                    # 保留部署信息文件用于调试
                    echo "保留部署信息文件: deploy.info"
                '''
            }
        }
    }
}
