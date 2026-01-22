// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化...');
    
    // 优先初始化欢迎页面的打字效果
    initializeWelcomeTyping();
    
    // 然后初始化其他效果
    initializeLightBeams();
    initializeParticleTrails();
    initializeMouseGlow();
    initializeNavigation();
    initializeScrollAnimations();
    initializeFormValidation();
    initializeResponsiveMenu();
    initializeMatrixRain();
    initializeCodeParticles();
    
    console.log('所有初始化完成');
});

// Welcome Screen Typing Effect (欢迎页面打字效果)
function initializeWelcomeTyping() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) {
        console.error('找不到typing-text元素');
        return;
    }
    
    const text = '你好，我是章程，欢迎来到我的技术主页';
    let index = 0;
    
    // 确保元素可见
    typingElement.style.visibility = 'visible';
    
    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 120); // 每个字120ms
        }
    }
    
    // 延迟800ms开始打字，确保页面已完全加载
    setTimeout(() => {
        console.log('开始打字效果');
        type();
    }, 800);
}

// Dynamic Light Beams (动态光束效果)
function initializeLightBeams() {
    const container = document.getElementById('light-beams');
    if (!container) return;
    
    function createLightBeam() {
        const beam = document.createElement('div');
        beam.className = 'light-beam';
        
        // 随机位置
        beam.style.left = Math.random() * 100 + '%';
        
        // 随机高度
        const height = 150 + Math.random() * 200;
        beam.style.height = height + 'px';
        
        // 随机延迟
        beam.style.animationDelay = Math.random() * 5 + 's';
        
        // 随机透明度
        beam.style.opacity = 0.2 + Math.random() * 0.3;
        
        container.appendChild(beam);
        
        // 动画结束后移除
        setTimeout(() => {
            beam.remove();
        }, 12000);
    }
    
    // 初始创建一批光束
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createLightBeam(), Math.random() * 2000);
    }
    
    // 持续创建新光束
    setInterval(() => {
        if (container.children.length < 20) {
            createLightBeam();
        }
    }, 1000);
}

// Particle Trails (粒子轨迹效果)
function initializeParticleTrails() {
    const canvas = document.getElementById('particle-trails');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    const colors = ['#00f0ff', '#ff006e', '#b026ff', '#39d353'];
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = 1 + Math.random() * 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = 0.5 + Math.random() * 0.5;
            this.life = 0;
            this.maxLife = 100 + Math.random() * 100;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life++;
            
            // 边界检测
            if (this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height || 
                this.life > this.maxLife) {
                this.reset();
            }
            
            // 渐隐效果
            this.alpha = 1 - (this.life / this.maxLife);
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            
            // 发光效果
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // 绘制连线
        ctx.globalAlpha = 0.15;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = particles[i].color;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 窗口大小改变时调整canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Mouse Glow Effect (鼠标跟随光效)
function initializeMouseGlow() {
    const mouseGlow = document.getElementById('mouse-glow');
    if (!mouseGlow) return;
    
    document.addEventListener('mousemove', (e) => {
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
    });
}

// 导航栏滚动效果
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const welcomeSection = document.getElementById('welcome');
    
    if (!navbar || !welcomeSection) return;

    // 滚动时改变导航栏样式和显示状态
    window.addEventListener('scroll', () => {
        const welcomeHeight = welcomeSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // 当滚动超过欢迎页面高度的50%时显示导航栏
        if (scrollPosition > welcomeHeight * 0.3) {
            navbar.classList.add('visible');
            
            if (scrollPosition > welcomeHeight + 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        } else {
            navbar.classList.remove('visible');
            navbar.classList.remove('scrolled');
        }

        // 更新活动链接
        updateActiveNavLink();
    });

    // 点击导航链接时的平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 减去导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 更新活动导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// 滚动动画
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // 观察所有section
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // 观察技能标签
    document.querySelectorAll('.skill-tag').forEach(tag => {
        observer.observe(tag);
    });

    // 观察项目卡片
    document.querySelectorAll('.project-card, .research-card, .experience-card').forEach(card => {
        observer.observe(card);
    });
}

// 表单验证
function initializeFormValidation() {
    const form = document.querySelector('.form');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // 清除之前的错误信息
        clearFormErrors();

        let isValid = true;

        // 验证姓名
        if (!name) {
            showError('name', '请输入您的姓名');
            isValid = false;
        }

        // 验证邮箱
        if (!email) {
            showError('email', '请输入您的邮箱');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', '请输入有效的邮箱地址');
            isValid = false;
        }

        // 验证主题
        if (!subject) {
            showError('subject', '请输入主题');
            isValid = false;
        }

        // 验证消息
        if (!message) {
            showError('message', '请输入消息内容');
            isValid = false;
        }

        if (isValid) {
            // 模拟表单提交
            showSuccessMessage();
            form.reset();
        }
    });

    // 实时验证
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// 验证单个字段
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;

    clearFieldError(field);

    switch (fieldName) {
        case 'name':
            if (!value) {
                showError('name', '请输入您的姓名');
            }
            break;
        case 'email':
            if (!value) {
                showError('email', '请输入您的邮箱');
            } else if (!isValidEmail(value)) {
                showError('email', '请输入有效的邮箱地址');
            }
            break;
        case 'subject':
            if (!value) {
                showError('subject', '请输入主题');
            }
            break;
        case 'message':
            if (!value) {
                showError('message', '请输入消息内容');
            }
            break;
    }
}

// 显示错误信息
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');

    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    field.classList.add('error');
}

// 清除字段错误
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    if (errorElement) {
        errorElement.remove();
    }

    field.classList.remove('error');
}

// 清除所有表单错误
function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
}

// 验证邮箱格式
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示成功消息
function showSuccessMessage() {
    const form = document.querySelector('.form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '消息发送成功！我会尽快回复您。';
    successMessage.style.cssText = `
        background: linear-gradient(135deg, #00ff88, rgba(0, 255, 136, 0.2));
        color: #00ff88;
        padding: 12px 16px;
        border-radius: 8px;
        margin-top: 20px;
        text-align: center;
        border: 1px solid #00ff88;
    `;

    form.appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Matrix Rain Effect (矩阵雨效果)
function initializeMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // 设置canvas尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 字符集 - 使用编程相关的字符
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|~`';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // 每列的Y位置
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        // 半透明黑色背景，产生拖尾效果
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 设置文字样式
        ctx.fillStyle = '#39d353';
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;
        
        // 绘制字符
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            // 随机重置位置
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // 启动动画
    setInterval(draw, 33);
    
    // 窗口大小改变时调整canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Floating Code Particles (浮动代码片段)
function initializeCodeParticles() {
    const container = document.getElementById('code-particles');
    if (!container) return;
    
    // 编程关键字和符号
    const codeSnippets = [
        'const', 'let', 'var', 'function', 'return', 'if', 'else',
        'for', 'while', 'class', 'import', 'export', 'async', 'await',
        '=>', '{}', '[]', '()', '==', '===', '!=', '&&', '||',
        'git', 'npm', 'node', 'docker', 'k8s', 'api', 'http',
        '0x', '0b', '&&', '||', '>>', '<<', '++', '--'
    ];
    
    function createCodeParticle() {
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // 随机位置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        
        // 随机动画时长
        const duration = 15 + Math.random() * 15;
        particle.style.animationDuration = duration + 's';
        
        // 随机延迟
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
        
        // 动画结束后移除
        setTimeout(() => {
            particle.remove();
        }, (duration + 5) * 1000);
    }
    
    // 初始创建一批粒子
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createCodeParticle(), Math.random() * 3000);
    }
    
    // 持续创建新粒子
    setInterval(() => {
        if (container.children.length < 30) {
            createCodeParticle();
        }
    }, 2000);
}

// 响应式菜单
function initializeResponsiveMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');

        // 改变汉堡菜单图标
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // 点击菜单项后关闭菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');

            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');

            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}



// 技能标签动画
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('animate-in');
    });
}

// 数字计数动画
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// 页面加载动画
function initializePageLoad() {
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');

        // 开始各种动画
        setTimeout(() => {
            animateNumbers();
            animateSkillTags();
        }, 500);
    });
}

// 鼠标跟随效果
function initializeMouseEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #00d4ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;

    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // 鼠标悬停效果
    document.querySelectorAll('a, button, .btn, .skill-tag, .project-card, .research-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#ff0080';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#00d4ff';
        });
    });
}

// 滚动进度条
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #ff0080);
        z-index: 1001;
        transition: width 0.25s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        progressBar.style.width = scrollPercent + '%';
    });
}

// 图片懒加载
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 初始化所有功能
function initializeAll() {
    initializePageLoad();
    initializeMouseEffect();
    initializeScrollProgress();
    initializeLazyLoading();
}

// 启动所有功能
initializeAll();

// 添加错误处理
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// 添加性能监控
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
    }
});