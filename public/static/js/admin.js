document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on the Overview tab
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab') || 'overview';

  if (tab === 'overview') {
    fetchAdminStats();
  }
});

async function fetchAdminStats() {
  try {
    const response = await fetch('/api/admin/stats');
    if (!response.ok) return;

    const data = await response.json();
    
    // Update AI Usage (Service Usage)
    // Assuming the first card is "Total Users" or similar, we will repurpose or add to them.
    // Let's target specific elements if possible, or update the existing hardcoded ones.
    
    // Strategy: Update the text content of the cards based on their labels or position.
    // Since we don't have unique IDs on the cards in the HTML (based on previous read),
    // we will try to find them by text content or add IDs in the TSX file next time.
    // For now, let's look for the specific hardcoded numbers and replace them.
    
    // 1. Update "Total Users"
    updateCardValue('Total Users', data.total_users);

    // 2. Update "Active Partners" -> Let's change this to "AI Analysis Usage" for demo
    // We need to change the label too potentially, but let's just find the number.
    // Actually, it's better to update the Admin.tsx to have IDs.
    // But since I can't edit Admin.tsx and JS in one turn easily without context loss, 
    // I'll try to find elements by their context.
    
    const cards = document.querySelectorAll('.bg-white.p-6.rounded-xl.shadow-sm');
    
    // Card 1: Total Users
    if (cards[0]) {
       const valueEl = cards[0].querySelector('h3');
       if (valueEl) valueEl.innerText = data.total_users.toLocaleString();
    }

    // Card 2: Active Partners -> Reuse as "AI Analysis Runs"
    if (cards[1]) {
       const titleEl = cards[1].querySelector('p');
       if (titleEl) titleEl.innerText = 'AI Analysis Usage';
       
       const valueEl = cards[1].querySelector('h3');
       if (valueEl) valueEl.innerText = data.ai_usage.toLocaleString();
       
       const iconContainer = cards[1].querySelector('.bg-indigo-50');
       if (iconContainer) iconContainer.innerHTML = '<i class="fas fa-robot"></i>';
    }

    // Card 3: RFQ Requests -> Reuse as "Crawled Data"
    if (cards[2]) {
       const titleEl = cards[2].querySelector('p');
       if (titleEl) titleEl.innerText = 'Crawled Data Count';
       
       const valueEl = cards[2].querySelector('h3');
       if (valueEl) valueEl.innerText = data.crawler_usage.toLocaleString();
       
       const iconContainer = cards[2].querySelector('.bg-emerald-50');
       if (iconContainer) iconContainer.innerHTML = '<i class="fas fa-spider"></i>';
    }

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
