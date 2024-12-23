document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 載入水平導航欄
        await loadHTML('menu-container', '../html/sidemenu/menu.html');
        initializeNavbar(); // 初始化導航欄功能
    } catch (e) {
        console.error('載入導航欄時出錯:', e);
    }
});

/**
 * 初始化導航欄功能
 */
function initializeNavbar() {
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.querySelector('.nav-menu');
    const navItemsWithDropdown = document.querySelectorAll('.nav-item > .nav-link');

    // 切換導航菜單顯示（主要用於移動設備）
    menuBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // 防止事件冒泡
        navMenu.classList.toggle('active');
    });

    // 切換下拉菜單顯示（在移動設備上點擊）
    navItemsWithDropdown.forEach(function (link) {
        link.addEventListener('click', function (e) {
			console.log(window.innerWidth);
            if (window.innerWidth <= 768) {
                const parent = this.parentElement;
                const dropdown = parent.querySelector('.dropdown');

                if (dropdown) {
                    e.preventDefault(); // 阻止預設行為（如跳轉）
                    parent.classList.toggle('active');
                }
            }
        });
    });

    // 關閉菜單當點擊頁面其他地方
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            navItemsWithDropdown.forEach(function (item) {
                item.parentElement.classList.remove('active');
            });
        }
    });

    // 初始化滾動隱藏按鈕功能
    scroll_to_disappear();
}

/**
 * 隱藏或顯示菜單按鈕基於滾動方向
 */
function scroll_to_disappear() {
    let lastScrollTop = 0;
    const bar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > lastScrollTop) {
            // 向下滾動，隱藏按鈕
            bar.style.display = 'none';
        } else {
            // 向上滾動，顯示按鈕
            bar.style.display = 'block';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 防止負值
    });
}

/**
 * 載入外部HTML到指定容器
 * @param {string} containerId - 容器ID
 * @param {string} url - HTML文件URL
 */
function loadHTML(containerId, url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`無法載入 ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });
}

/**
 * 初始化畫廊滑動功能
 * @param {Object} params - 配置參數
 * @param {string} params.gallerySliderId - 畫廊滑動區域的 ID
 * @param {string} params.prevBtnId - 上一張按鈕的 ID
 * @param {string} params.nextBtnId - 下一張按鈕的 ID
 */