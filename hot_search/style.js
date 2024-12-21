// style.js

document.addEventListener('DOMContentLoaded', () => {
    initializeGallerySlider({
        gallerySliderId: 'gallerySlider',
        prevBtnId: 'prevBtn',
        nextBtnId: 'nextBtn'
    });
});

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
        const slideWidth = document.getElementById('slide').offsetWidth;
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
