document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on the Overview tab
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab') || 'overview';

  if (tab === 'overview') {
    fetchAdminStats();
  }
});

async function triggerDeploy() {
  if (!confirm('정말 배포를 시작하시겠습니까?\n약 3~5분이 소요됩니다.')) return;

  try {
    const btn = document.querySelector('button[onclick="triggerDeploy()"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 요청 중...';

    const response = await fetch('/api/admin/deploy', { method: 'POST' });
    const result = await response.json();

    if (result.success) {
      alert(result.message);
    } else {
      alert('오류: ' + result.message);
    }
    
    btn.disabled = false;
    btn.innerHTML = originalText;
  } catch (e) {
    alert('배포 요청 중 오류가 발생했습니다.');
  }
}

async function fetchAdminStats() {
  try {
    // Add timestamp to prevent caching
    const response = await fetch('/api/admin/stats?t=' + new Date().getTime());
    if (!response.ok) return;

    const data = await response.json();
    console.log("Admin Stats Loaded:", data); // Debug log
    
    // 1. Total Users
    const totalUsersCard = document.querySelector('div.bg-white:nth-child(1) h3');
    if (totalUsersCard) totalUsersCard.innerText = (data.total_users || 0).toLocaleString();

    // 2. AI Analysis Count (Use 2nd card)
    const aiCardTitle = document.querySelector('div.bg-white:nth-child(2) p');
    const aiCardValue = document.querySelector('div.bg-white:nth-child(2) h3');
    if (aiCardTitle) aiCardTitle.innerText = 'TOTAL AI ANALYSIS';
    if (aiCardValue) aiCardValue.innerText = (data.ai_usage || 0).toLocaleString();

    // 3. Crawler Count (Use 3rd card)
    const crawlCardTitle = document.querySelector('div.bg-white:nth-child(3) p');
    const crawlCardValue = document.querySelector('div.bg-white:nth-child(3) h3');
    if (crawlCardTitle) crawlCardTitle.innerText = 'CRAWLED GRANTS';
    if (crawlCardValue) crawlCardValue.innerText = (data.crawler_usage || 0).toLocaleString();

  } catch (e) {
    console.error("Failed to fetch admin stats", e);
  }
}

function updateCardValue(label, newValue) {
  // Helper to find card by label text
  const titles = document.querySelectorAll('p.text-xs.font-bold.text-slate-500');
  titles.forEach(p => {
    if (p.innerText.includes(label)) {
      const h3 = p.nextElementSibling;
      if (h3) h3.innerText = newValue.toLocaleString();
    }
  });
}
