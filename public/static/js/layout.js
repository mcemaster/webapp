// Layout & Global Navigation Logic (Powered by MCE Core)
document.addEventListener('DOMContentLoaded', () => {
  console.log('Layout Module Loaded');

  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // 이벤트 버블링 방지
      menu.classList.toggle('hidden');
    });

    // 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });
  }

  // 2. Chat Window Toggle
  const chatBtn = document.getElementById('quick-chat-btn');
  const chatWin = document.getElementById('chat-window');
  const closeChat = document.getElementById('close-chat-btn');

  if (chatBtn && chatWin) {
    chatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      chatWin.classList.toggle('hidden');
    });
  }

  if (closeChat && chatWin) {
    closeChat.addEventListener('click', () => {
      chatWin.classList.add('hidden');
    });
  }

  // 3. Dropdown Menu Safety (Desktop)
  // CSS hover로 처리되지만, 터치 디바이스 호환성을 위해 추가 가능 (현재는 CSS 유지)
});
