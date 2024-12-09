document.addEventListener('DOMContentLoaded', function() {
    // 获取页面元素
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-screen');

    // 登录表单提交事件
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交事件
        loginScreen.style.display = 'none'; // 隐藏登录页面
        mainScreen.style.display = 'flex'; // 显示主页面
        showSection('home'); // 显示首页内容
    });

    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', { hour12: false });
        const dateString = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('current-time').textContent = timeString;
        document.getElementById('current-date').textContent = dateString;
    }

    setInterval(updateTime, 1000);
    updateTime();

    function setActiveNav(sectionId) {
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function showSection(sectionId) {
        const sections = document.querySelectorAll('main section');
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    // 为每个导航链接添加点击事件监听器
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认跳转行为
            const sectionId = link.getAttribute('href').substring(1);
            setActiveNav(sectionId);
            showSection(sectionId);
        });
    });

    setActiveNav('home'); // 默认首页
    showSection('home'); // 默认显示首页内容

    const toggleButtons = document.querySelectorAll('.toggle-button');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (button.textContent === '开') {
                button.textContent = '关';
            } else {
                button.textContent = '开';
            }
        });
    });
    function fetchWeather() {
        const apiKey = 'YOUR_API_KEY';
        const city = 'Beijing';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherContainer = document.querySelector('.weather');
                weatherContainer.innerHTML = '';

                for (let i = 0; i < 5; i++) {
                    const weatherDay = data.list[i * 8];
                    const date = new Date(weatherDay.dt_txt).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
                    const tempMin = weatherDay.main.temp_min;
                    const tempMax = weatherDay.main.temp_max;
                    const description = weatherDay.weather[0].description;

                    const weatherElement = document.createElement('div');
                    weatherElement.className = 'weather-day';
                    weatherElement.innerHTML = `
                        <h4>${date}</h4>
                        <p>${description}</p>
                        <p>最低温度: ${tempMin}°C</p>
                        <p>最高温度: ${tempMax}°C</p>
                    `;
                    weatherContainer.appendChild(weatherElement);
                }
            })
            .catch(error => console.error('获取天气信息失败:', error));
    }

    fetchWeather();

    document.getElementById('logout-button').addEventListener('click', function() {
        mainScreen.style.display = 'none';
        loginScreen.style.display = 'flex';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-button');
    
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            // 切换按钮视觉状态
            this.classList.toggle('toggle-on');
            const isOn = this.classList.contains('toggle-on');
            this.textContent = isOn ? '开' : '关';

            // 发送请求到后端
            fetch('/toggle-light', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: isOn
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status !== 'success') {
                    // 如果后端返回错误，恢复按钮状态
                    this.classList.toggle('toggle-on');
                    this.textContent = !isOn ? '开' : '关';
                    console.error('Server error:', data.message);
                }
            })
            .catch(error => {
                // 发生错误时恢复按钮状态
                this.classList.toggle('toggle-on');
                this.textContent = !isOn ? '开' : '关';
                console.error('Error:', error);
            });
        });
    }
});
