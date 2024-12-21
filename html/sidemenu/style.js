document.addEventListener('DOMContentLoaded', async() => {
    try{
        await loadHTML('menu-container', '../html/sidemenu/menu.html');
        initializeSideMenu({
            menuBtnId: 'menuBtn',
            closeBtnId: 'closeBtn',
            sideMenuId: 'sideMenu',
            mainContentId: 'mainContent',
            shiftWidth: 250 // 與側邊菜單寬度一致
        });
    }
    catch(e){

    }
    // 初始化畫廊滑動功能
    
});

/**
 * 初始化側邊導航菜單功能
 * @param {Object} params - 配置參數
 * @param {string} params.menuBtnId - 打開菜單的按鈕 ID
 * @param {string} params.closeBtnId - 關閉菜單的按鈕 ID
 * @param {string} params.sideMenuId - 側邊菜單的 ID
 * @param {string} params.mainContentId - 主內容容器的 ID
 * @param {number} params.shiftWidth - 主內容滑動的寬度
 */
function initializeSideMenu({ menuBtnId, closeBtnId, sideMenuId, mainContentId, shiftWidth }) {
    const sideMenu = document.getElementById(sideMenuId);
    const menuBtn = document.getElementById(menuBtnId);
    const closeBtn = document.getElementById(closeBtnId);
    const mainContent = document.getElementById(mainContentId);

    // 打開側邊菜單
    menuBtn.addEventListener('click', () => {
        sideMenu.style.left = '0';
        mainContent.classList.add('shifted');
        menuBtn.style.display = 'none';
    });

    // 關閉側邊菜單
    closeBtn.addEventListener('click', () => {
        sideMenu.style.left = `-${shiftWidth}px`;
        mainContent.classList.remove('shifted');
        menuBtn.style.display = 'block';
    });

    // 點擊側邊菜單外部關閉菜單
    window.addEventListener('click', (event) => {
        if (event.target === sideMenu) {
            sideMenu.style.left = `-${shiftWidth}px`;
            mainContent.classList.remove('shifted');
            menuBtn.style.display = 'block';
        }
    });
}

/**
 * 初始化畫廊滑動功能
 * @param {Object} params - 配置參數
 * @param {string} params.gallerySliderId - 畫廊滑動區域的 ID
 * @param {string} params.prevBtnId - 上一張按鈕的 ID
 * @param {string} params.nextBtnId - 下一張按鈕的 ID
 */
function initializeGallerySlider({ gallerySliderId, prevBtnId, nextBtnId }) {
    const gallerySlider = document.getElementById(gallerySliderId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const images = gallerySlider.getElementsByTagName('img');
    const totalImages = images.length;
    let currentIndex = 0;

    // 計算滑動距離
    function updateSlider() {
        if (images.length === 0) return;
        const slideWidth = images[0].clientWidth;
        gallerySlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // 下一張
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalImages - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // 循環回第一張
        }
        updateSlider();
    });

    // 上一張
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalImages - 1; // 循環到最後一張
        }
        updateSlider();
    });

    // 確保滑動距離在窗口調整時更新
    window.addEventListener('resize', () => {
        updateSlider();
    });

    // 初始設定
    updateSlider();
}

/**
 * 初始化子選單功能
 */
function initializeSubmenu() {
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const parent = toggle.parentElement;
            const submenu = document.getElementById(toggle.getAttribute('aria-controls'));

            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // 關閉其他開啟的子選單
            submenuToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.parentElement.classList.remove('active');
                }
            });

            if (isExpanded) {
                toggle.setAttribute('aria-expanded', 'false');
                parent.classList.remove('active');
            } else {
                toggle.setAttribute('aria-expanded', 'true');
                parent.classList.add('active');
            }
        });
    });
}


function scroll_to_disappear(){
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const btn = document.getElementById('menuBtn');

            // 初始化上一個滾動位置
            // 獲取當前滾動位置
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // 向下滾動，顯示按鈕
            btn.style.display = 'none';
            lastScrollTop = scrollTop;
        } else {
            // 向上滾動，隱藏按鈕
            btn.style.display = 'block';
            lastScrollTop = scrollTop;
        }

        // 更新上一個滾動位置
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 防止負值
    });
}

function loadHTML(containerId, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`無法載入 ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            initializeSideMenu({
                menuBtnId: 'menuBtn',
                closeBtnId: 'closeBtn',
                sideMenuId: 'sideMenu',
                mainContentId: 'mainContent',
                shiftWidth: 250 // 與側邊菜單寬度一致
            }); // 初始化菜單功能
        
            // 初始化子選單功能
            initializeSubmenu();
            scroll_to_disappear();
        })
        .catch(error => {
            console.error(error);
        });
}

