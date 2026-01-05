// [DEBUG] 1. 파일이 로드되었는지 즉시 확인
console.log("Admin JS Loaded");
// alert("1단계: 자바스크립트 파일 로딩 성공!"); // 너무 시끄러우면 주석 처리

// 메인 실행 함수
(async function initDashboard() {
  
  // 현재 탭 확인 (없으면 overview로 간주)
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab') || 'overview';

  console.log("Current Tab:", tab);

  // overview 탭이 아니면 실행 중단 (다른 탭에서 불필요한 호출 방지)
  if (tab !== 'overview') return;

  try {
    console.log("Fetching stats...");
    
    // API 호출 (캐시 방지 적용)
    const response = await fetch('/api/admin/stats?t=' + new Date().getTime());
    
    // [DEBUG] 2. API 응답 상태 확인
    if (!response.ok) {
      alert(`⚠️ 서버 연결 실패! (Status: ${response.status})\n로그인이 풀렸거나, 권한이 없습니다.`);
      return;
    }

    const data = await response.json();
    console.log("Data received:", data);

    // [DEBUG] 3. 데이터 수신 확인
    // alert("✅ 데이터 수신 성공!\n" + JSON.stringify(data, null, 2));

    // DOM 업데이트
    updateDashboardUI(data);

  } catch (e) {
    console.error("Error:", e);
    alert("❌ 에러 발생: " + e.message);
  }
})();

// UI 업데이트 함수 (ID 기반으로 안전하게 수정)
function updateDashboardUI(data) {
  // 1. Total Users
  const totalUsersEl = document.getElementById('stat-total-users');
  if (totalUsersEl) {
    totalUsersEl.innerText = (data.total_users || 0).toLocaleString();
    // 애니메이션 효과 (선택사항)
    totalUsersEl.classList.add('animate-pulse');
    setTimeout(() => totalUsersEl.classList.remove('animate-pulse'), 1000);
  }

  // 2. AI Analysis Usage
  const aiUsageEl = document.getElementById('stat-ai-usage');
  if (aiUsageEl) {
    aiUsageEl.innerText = (data.ai_usage || 0).toLocaleString();
  }

  // 3. Crawler Usage
  const crawlerUsageEl = document.getElementById('stat-crawler-usage');
  if (crawlerUsageEl) {
    crawlerUsageEl.innerText = (data.crawler_usage || 0).toLocaleString();
  }
}

// 배포 버튼 함수
async function triggerDeploy() {
  if (!confirm('정말 배포를 시작하시겠습니까?')) return;
  try {
    const res = await fetch('/api/admin/deploy', { method: 'POST' });
    const json = await res.json();
    alert(json.message);
  } catch(e) {
    alert('배포 요청 실패');
  }
}
