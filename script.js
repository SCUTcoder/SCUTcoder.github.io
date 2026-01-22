// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeFormValidation();
    initializeParticleSystem();
    initializeResponsiveMenu();
    initializeTypingEffect();
    initializeWallpaperToggle();
});

// 导航栏滚动效果
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // 滚动时改变导航栏样式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
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

// 粒子系统
function initializeParticleSystem() {
    const heroSection = document.querySelector('.hero');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle(heroSection);
    }
}

// 创建粒子
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'dynamic-particle';

    // 随机大小
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // 随机位置
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // 随机颜色
    const colors = ['#00d4ff', '#ff0080', '#7928ca', '#00ff88'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

    // 随机动画延迟
    particle.style.animationDelay = `${Math.random() * 10}s`;

    container.appendChild(particle);

    // 动画结束后重新创建
    particle.addEventListener('animationend', () => {
        particle.remove();
        setTimeout(() => createParticle(container), Math.random() * 10000);
    });
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

// 打字效果
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // 延迟开始打字效果
    setTimeout(typeWriter, 1000);
}

// 壁纸切换功能
function initializeWallpaperToggle() {
    const toggle = document.getElementById('wallpaper-toggle');
    if (!toggle) return;

    // 从localStorage读取保存的状态
    const savedState = localStorage.getItem('wallpaper-mode');
    if (savedState === 'true') {
        toggle.checked = true;
        document.body.classList.add('wallpaper-mode');
    }

    // 监听切换事件
    toggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('wallpaper-mode');
            localStorage.setItem('wallpaper-mode', 'true');
        } else {
            document.body.classList.remove('wallpaper-mode');
            localStorage.setItem('wallpaper-mode', 'false');
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