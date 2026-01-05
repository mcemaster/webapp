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

// UI 업데이트 함수 (안전하게 요소 찾기)
function updateDashboardUI(data) {
  // 1. Total Users (첫 번째 카드)
  const card1 = document.querySelector('div.bg-white:nth-child(1) h3');
  if (card1) card1.innerText = (data.total_users || 0).toLocaleString();

  // 2. AI Analysis (두 번째 카드)
  const card2Title = document.querySelector('div.bg-white:nth-child(2) p');
  const card2Value = document.querySelector('div.bg-white:nth-child(2) h3');
  if (card2Title) card2Title.innerText = 'AI 분석 횟수';
  if (card2Value) card2Value.innerText = (data.ai_usage || 0).toLocaleString();

  // 3. Crawler Data (세 번째 카드)
  const card3Title = document.querySelector('div.bg-white:nth-child(3) p');
  const card3Value = document.querySelector('div.bg-white:nth-child(3) h3');
  if (card3Title) card3Title.innerText = '수집된 공고 수';
  if (card3Value) card3Value.innerText = (data.crawler_usage || 0).toLocaleString();
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
