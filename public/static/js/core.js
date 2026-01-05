/**
 * MCE Core Framework
 * 시스템 전반의 안정성, 통신, 에러 핸들링을 담당하는 핵심 모듈
 */

const MCE = {
  // 1. 설정 및 상태
  config: {
    debug: true,
    apiBase: '/api'
  },

  // 2. 안전한 DOM 선택 (요소가 없어도 에러가 나지 않고 경고만 발생)
  $: (selector) => {
    const el = document.querySelector(selector);
    if (!el && MCE.config.debug) {
      console.warn(`[MCE Safety] 요소를 찾을 수 없습니다: ${selector}`);
    }
    return el;
  },

  // 3. 중앙 집중식 API 통신 (로그인, 데이터 연동 등)
  api: {
    post: async (url, data) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`[MCE API Error] ${url}:`, error);
        MCE.ui.toast(`통신 중 오류가 발생했습니다: ${error.message}`, 'error');
        throw error;
      }
    }
  },

  // 4. UI 유틸리티 (로딩, 알림)
  ui: {
    // 로딩 스피너 표시/숨김
    loading: (isLoading, text = '처리 중입니다...') => {
      // 기존 로딩 오버레이가 있다면 활용, 없으면 생성
      let overlay = document.getElementById('global-loading');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'global-loading';
        overlay.className = 'hidden fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm';
        overlay.innerHTML = `
          <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center">
            <div class="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-3"></div>
            <span id="global-loading-text" class="text-sm font-bold text-slate-700">${text}</span>
          </div>
        `;
        document.body.appendChild(overlay);
      }

      if (isLoading) {
        document.getElementById('global-loading-text').innerText = text;
        overlay.classList.remove('hidden');
      } else {
        overlay.classList.add('hidden');
      }
    },

    // 토스트 메시지 (알림)
    toast: (message, type = 'info') => {
      const container = document.getElementById('toast-container') || (() => {
        const c = document.createElement('div');
        c.id = 'toast-container';
        c.className = 'fixed top-4 right-4 z-[9999] space-y-2';
        document.body.appendChild(c);
        return c;
      })();

      const el = document.createElement('div');
      const colors = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-slate-800';
      const icon = type === 'error' ? 'fa-exclamation-circle' : type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
      
      el.className = `${colors} text-white px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300 translate-x-full flex items-center min-w-[300px]`;
      el.innerHTML = `<i class="fas ${icon} mr-3 text-lg"></i> <span class="font-bold text-sm">${message}</span>`;
      
      container.appendChild(el);
      
      // 애니메이션
      requestAnimationFrame(() => el.classList.remove('translate-x-full'));
      setTimeout(() => {
        el.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => el.remove(), 300);
      }, 3000);
    }
  },

  // 5. 초기화 (모든 페이지 공통)
  init: () => {
    console.log('%c MCE System Ready ', 'background: #2563eb; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
  }
};

// 즉시 실행
document.addEventListener('DOMContentLoaded', MCE.init);
