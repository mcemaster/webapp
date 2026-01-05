// Matching Logic (Powered by MCE Core) - Real AI & DB Integration
document.addEventListener('DOMContentLoaded', () => {
  
  // Expanded Corporate Data (Deep Scraping Simulation)
  const corporateDB = {
    "태성정밀": { 
      name: "태성정밀", bizNum: "123-45-67890", corpNum: "110111-1234567", ceoName: "김태성", foundingDate: "2015-03-15", 
      address: "경기 수원시 팔달구 효원로 123", ksic: "C29271", mainProduct: "반도체 장비 부품", 
      rev_2024: 11000, rev_2025: 12500, op_2024: 600, op_2025: 850, net_2024: 400, net_2025: 600, 
      assets: 8000, liabilities: 4000, capital: 4000, debtRatio: 100, 
      rndSpend: 300, researchers: 5, hasLab: '기업부설연구소 보유', 
      certs: ['벤처기업', '이노비즈', 'ISO9001', '소부장전문'], 
      employees: 45, youthEmp: 12,
      companyType: "중소기업", companyAge: 11, // 2026기준 11년차
      mainBank: "IBK기업은행", creditRating: "BBB+", entry1yr: 15, exit1yr: 3, turnoverRate: 6.7
    },
    "(주)태성정밀": { 
      name: "태성정밀", bizNum: "123-45-67890", corpNum: "110111-1234567", ceoName: "김태성", foundingDate: "2015-03-15", 
      address: "경기 수원시 팔달구 효원로 123", ksic: "C29271", mainProduct: "반도체 장비 부품", 
      rev_2024: 11000, rev_2025: 12500, op_2024: 600, op_2025: 850, net_2024: 400, net_2025: 600, 
      assets: 8000, liabilities: 4000, capital: 4000, debtRatio: 100, 
      rndSpend: 300, researchers: 5, hasLab: '기업부설연구소 보유', 
      certs: ['벤처기업', '이노비즈', 'ISO9001', '소부장전문'], 
      employees: 45, youthEmp: 12,
      companyType: "중소기업", companyAge: 11,
      mainBank: "IBK기업은행", creditRating: "BBB+", entry1yr: 15, exit1yr: 3, turnoverRate: 6.7
    },
    "삼성전자": { 
      name: "삼성전자(주)", bizNum: "124-81-00998", corpNum: "130111-0006246", ceoName: "한종희", foundingDate: "1969-01-13", 
      address: "경기 수원시 영통구 삼성로 129", ksic: "C264", mainProduct: "가전제품, 통신기기", 
      rev_2024: 2589355, rev_2025: 3000000, op_2024: 65670, op_2025: 100000, net_2024: 55000, net_2025: 80000, 
      assets: 4559000, liabilities: 922000, capital: 3637000, debtRatio: 25, 
      rndSpend: 280000, researchers: 50000, hasLab: '기업부설연구소 보유', 
      certs: ['메인비즈', '녹색인증', 'ISO9001', 'ISO14001'], 
      employees: 120000, youthEmp: 40000,
      companyType: "중견/대기업", companyAge: 57,
      mainBank: "우리은행", creditRating: "AAA", entry1yr: 5000, exit1yr: 1200, turnoverRate: 1.0
    }
  };

  // 안전한 요소 바인딩
  const bind = (id, event, handler) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, handler);
  };

  // --- Autocomplete Logic (Updated) ---
  const companyInput = document.getElementById('company-search-input');
  
  // Create Dropdown Element dynamically if not exists
  let searchDropdown = document.getElementById('search-dropdown');
  if (!searchDropdown) {
    const wrapper = document.createElement('div');
    wrapper.id = 'search-dropdown';
    wrapper.className = 'hidden absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 mt-2 max-h-60 overflow-y-auto';
    wrapper.innerHTML = '<ul id="search-results-list" class="divide-y divide-slate-100"></ul>';
    
    // Insert after input's parent div (to align with the search bar)
    if (companyInput) {
       companyInput.parentElement.style.position = 'relative'; // Make parent relative
       companyInput.parentElement.appendChild(wrapper);
    }
    searchDropdown = wrapper;
  }
  const searchResultsList = document.getElementById('search-results-list');

  if (companyInput && searchDropdown && searchResultsList) {
    companyInput.addEventListener('input', async (e) => {
      const query = e.target.value.trim();
      
      if (query.length < 1) {
        searchDropdown.classList.add('hidden');
        return;
      }

      // Fetch from API
      try {
        const res = await fetch(`/api/search/company?q=${encodeURIComponent(query)}`);
        const { results } = await res.json();

        if (results.length > 0) {
          renderDropdown(results);
          searchDropdown.classList.remove('hidden');
        } else {
          searchDropdown.classList.add('hidden');
        }
      } catch (err) {
        console.error(err);
      }
    });

    // Hide when clicking outside
    document.addEventListener('click', (e) => {
      if (!companyInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.add('hidden');
      }
    });
  }

  function renderDropdown(matches) {
    searchResultsList.innerHTML = '';
    matches.forEach(item => {
      const li = document.createElement('li');
      li.className = 'px-5 py-3 hover:bg-slate-50 cursor-pointer text-sm flex justify-between items-center group transition-colors';
      
      li.innerHTML = `
        <div class="flex items-center">
          <div class="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mr-3 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
            <i class="fas fa-building"></i>
          </div>
          <div>
            <p class="font-bold text-slate-800 group-hover:text-blue-700">${item.name}</p>
            <p class="text-xs text-slate-400">${item.category} | 대표: ${item.boss}</p>
          </div>
        </div>
        <i class="fas fa-chevron-right text-xs text-slate-300 group-hover:text-blue-400"></i>
      `;
      
      li.addEventListener('click', () => {
        if(companyInput) companyInput.value = item.name;
        searchDropdown.classList.add('hidden');
        
        // Optional: Auto fetch data when clicked
        // document.getElementById('btn-auto-fetch').click();
      });
      searchResultsList.appendChild(li);
    });
  }

  // Demo Fill
  bind('btn-fill-demo', 'click', () => {
    if(companyInput) {
      companyInput.value = '태성정밀';
      alert('데모 데이터(태성정밀)가 입력되었습니다.');
    }
  });

  // Auto Fetch
  bind('btn-auto-fetch', 'click', () => {
    if(!companyInput || !companyInput.value.trim()) {
      alert('기업명을 입력해주세요.');
      return;
    }
    
    const name = companyInput.value.trim();
    const loadingModal = document.getElementById('data-loading-modal');
    if(loadingModal) loadingModal.classList.remove('hidden');
    
    setTimeout(() => {
      if(loadingModal) loadingModal.classList.add('hidden');
      
      const data = corporateDB[name];
      if (data) {
        fillForm(data);
        const successModal = document.getElementById('custom-success-modal');
        if(successModal) successModal.classList.remove('hidden');
      } else {
        const notFoundModal = document.getElementById('not-found-modal');
        if(notFoundModal) notFoundModal.classList.remove('hidden');
      }
    }, 2000);
  });

  function fillForm(data) {
    const setVal = (id, val) => { const el = document.getElementById(id); if(el) el.value = val; };
    const setText = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };

    setVal('companyName', data.name);
    setVal('bizNum', data.bizNum);
    setVal('corpNum', data.corpNum);
    setVal('ceoName', data.ceoName);
    setVal('foundingDate', data.foundingDate);
    setVal('address', data.address);
    setVal('employees', data.employees);
    setVal('youthEmp', data.youthEmp);
    setVal('companyType', data.companyType);
    setVal('mainBank', data.mainBank);
    setVal('creditRating', data.creditRating);
    setText('entry1yr', data.entry1yr);
    setText('exit1yr', data.exit1yr);
    setText('turnoverRate', data.turnoverRate);
    setVal('rev_2024', data.rev_2024);
    setVal('rev_2025', data.rev_2025);
    setVal('op_2024', data.op_2024);
    setVal('op_2025', data.op_2025);
    setVal('net_2024', data.net_2024);
    setVal('net_2025', data.net_2025);
    setVal('assets', data.assets);
    setVal('liabilities', data.liabilities);
    setVal('capital', data.capital);
    setVal('debtRatio', data.debtRatio + '%');
    setVal('labStatus', data.hasLab);
    setVal('researchers', data.researchers);
    setVal('rndSpend', data.rndSpend);

    if(data.certs) {
      data.certs.forEach(cert => {
        const chk = document.getElementById('cert-'+cert);
        if(chk) chk.checked = true;
      });
    }
    
    const statusArea = document.getElementById('data-status-area');
    if(statusArea) statusArea.classList.remove('hidden');
    ['badge-dart', 'badge-nps', 'badge-cert'].forEach(id => {
       const el = document.getElementById(id);
       if(el) el.classList.remove('hidden');
    });
  }

  // --- Real AI Analysis Logic ---
  bind('submit-btn', 'click', async () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    if(loadingOverlay) loadingOverlay.classList.remove('hidden');
    
    // Animate progress bar (fake progress for UX)
    const bar = document.getElementById('loading-bar');
    let w = 0;
    const interval = setInterval(() => {
      if(w < 90) w += 0.5; // Slower progress
      if (bar) bar.style.width = w + '%';
    }, 50);

    // Get current company data
    const currentCompName = document.getElementById('company-search-input')?.value || '태성정밀';
    const companyData = corporateDB[currentCompName] || corporateDB['태성정밀']; // Fallback to demo if empty

    try {
      // API Call to Backend
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyData })
      });

      const result = await response.json();

      clearInterval(interval);
      if (bar) bar.style.width = '100%';

      if (!response.ok) {
        throw new Error(result.message || '분석 중 오류가 발생했습니다.');
      }

      setTimeout(() => {
        if(loadingOverlay) loadingOverlay.classList.add('hidden');
        const resultsArea = document.getElementById('matching-results');
        if(resultsArea) resultsArea.classList.remove('hidden');
        
        // Handle Remaining Count
        if(result.remaining !== undefined) {
           console.log(`Remaining uses: ${result.remaining}`);
        }

        const dataToRender = result.data || result.results || [];
        renderAIResults(dataToRender, companyData);
      }, 500);

    } catch (e) {
      clearInterval(interval);
      if(loadingOverlay) loadingOverlay.classList.add('hidden');
      alert(e.message);
    }
  });

  function renderAIResults(items, companyData) {
    const list = document.getElementById('results-list');
    if (!list) return;
    list.innerHTML = '';

    if (items.length === 0) {
      list.innerHTML = '<div class="text-center p-8 text-slate-500">추천할 만한 지원사업을 찾지 못했습니다.</div>';
      return;
    }

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 shadow-sm mb-4 transition-all hover:shadow-md animate-fade-in-up';
      
      const deadlineText = item.deadline ? `마감: ${item.deadline}` : '상시접수';
      const score = item.matchScore || item.score || 80;
      
      div.innerHTML = `
        <div class="flex justify-between items-start">
           <div>
             <span class="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded mb-2">${item.agency || '전담기관'}</span>
             <h4 class="font-bold text-lg text-slate-800 mb-1">${item.title}</h4>
             <p class="text-sm text-slate-500 mb-3">${(item.tags || []).join(', ')}</p>
           </div>
           <div class="text-right">
             <div class="text-2xl font-bold text-blue-600">${score}%</div>
             <div class="text-xs text-slate-400">매칭률</div>
           </div>
         </div>
         <div class="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div class="flex items-start">
               <i class="fas fa-robot text-blue-500 mt-1 mr-2"></i>
               <div>
                  <p class="text-xs font-bold text-slate-500 mb-1">AI 매칭 분석 결과</p>
                  <p class="text-sm text-slate-700 leading-relaxed text-justify">${item.aiReason}</p>
               </div>
            </div>
         </div>
         <div class="border-t border-slate-100 pt-3 mt-3 flex justify-between items-center">
            <span class="text-xs text-red-500 font-bold"><i class="far fa-clock mr-1"></i> ${deadlineText}</span>
            <a href="${item.link || '#'}" target="_blank" class="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-700 inline-flex items-center">
               공고 확인 <i class="fas fa-external-link-alt ml-2"></i>
            </a>
         </div>
      `;
      list.appendChild(div);
    });
  }

  bind('btn-close-success', 'click', () => {
    const el = document.getElementById('custom-success-modal');
    if(el) el.classList.add('hidden');
  });
  bind('btn-manual-input', 'click', () => {
    const el = document.getElementById('not-found-modal');
    if(el) el.classList.add('hidden');
    const input = document.getElementById('company-search-input'); // Fixed: focus correct input
    if(input) input.focus();
  });

  let currentStep = 1;
  const updateStep = () => {
    document.querySelectorAll('.step-content').forEach((el, idx) => {
      if(idx + 1 === currentStep) el.classList.remove('hidden'); else el.classList.add('hidden');
    });
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const subBtn = document.getElementById('submit-btn');
    
    if(prevBtn) prevBtn.classList.toggle('hidden', currentStep === 1);
    if(nextBtn) nextBtn.classList.toggle('hidden', currentStep === 4);
    if(subBtn) subBtn.classList.toggle('hidden', currentStep !== 4);
  };

  bind('next-btn', 'click', () => { if(currentStep < 4) { currentStep++; updateStep(); } });
  bind('prev-btn', 'click', () => { if(currentStep > 1) { currentStep--; updateStep(); } });
});