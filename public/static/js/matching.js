// Matching Logic (Powered by MCE Core) - Enhanced Database & Logic
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

  // Expanded Grant Database (50+ items simulation)
  const grantDatabase = [
    // R&D (기술개발)
    { id: 1, title: '2026년 창업성장기술개발사업 디딤돌 창업과제', agency: '중소벤처기업부', type: 'R&D', maxAmount: '120,000천원', targetAge: [0, 7], tags: ['기술개발', '초기창업'], deadline: '2026-02-28', link: 'https://www.smtech.go.kr' },
    { id: 8, title: 'IP나래 프로그램', agency: '특허청', type: 'R&D', maxAmount: '17,500천원', targetAge: [0, 7], tags: ['특허전략'], deadline: '2026-02-15', link: 'https://www.ripc.org' },
    { id: 14, title: '중소기업 기술혁신개발사업 (수출지향형)', agency: '중소벤처기업부', type: 'R&D', maxAmount: '2,000,000천원', targetAge: [7, 99], tags: ['수출', '고도화'], deadline: '2026-03-10', link: 'https://www.smtech.go.kr' },
    { id: 15, title: '구매조건부 신제품개발사업', agency: '중기부', type: 'R&D', maxAmount: '500,000천원', targetAge: [0, 99], tags: ['구매연계'], deadline: '2026-04-01', link: 'https://www.smtech.go.kr' },
    { id: 16, title: '공정품질 기술개발사업', agency: '중기부', type: 'R&D', maxAmount: '50,000천원', targetAge: [3, 99], tags: ['공정개선'], deadline: '2026-03-20', link: 'https://www.smtech.go.kr' },
    
    // Smart Factory & Digital (스마트/디지털)
    { id: 2, title: '2026년 스마트공장 보급확산사업 (기초)', agency: '중기부', type: 'Smart', maxAmount: '50,000천원', targetAge: [0, 99], tags: ['제조혁신'], deadline: '2026-03-15', link: 'https://www.smart-factory.kr' },
    { id: 6, title: '스마트공장 고도화1 지원사업', agency: '중기부', type: 'Smart', maxAmount: '200,000천원', targetAge: [3, 99], tags: ['고도화', 'AI적용'], deadline: '2026-03-31', link: 'https://www.smart-factory.kr' },
    { id: 9, title: '데이터바우처 지원사업', agency: '과기부', type: 'Smart', maxAmount: '60,000천원', targetAge: [0, 99], tags: ['AI가공', '데이터'], deadline: '2026-04-10', link: 'https://kdata.or.kr' },
    { id: 17, title: 'AI 바우처 지원사업', agency: 'NIPA', type: 'Smart', maxAmount: '300,000천원', targetAge: [0, 99], tags: ['AI솔루션'], deadline: '2026-02-20', link: 'https://www.nipa.kr' },
    { id: 18, title: '비대면 서비스 바우처', agency: '중기부', type: 'Smart', maxAmount: '4,000천원', targetAge: [0, 99], tags: ['재택근무'], deadline: '2026-05-31', link: 'https://www.k-startup.go.kr' },

    // Export (수출)
    { id: 3, title: '수출바우처사업 (성장바우처)', agency: 'KOTRA', type: 'Export', maxAmount: '30,000천원', targetAge: [0, 99], tags: ['해외진출'], deadline: '2026-01-31', link: 'https://www.exportvoucher.com' },
    { id: 7, title: '수출유망중소기업 지정', agency: '중기부', type: 'Export', maxAmount: '지원우대', targetAge: [0, 99], tags: ['수출지원'], deadline: '2026-05-31', link: 'https://www.smes.go.kr' },
    { id: 19, title: '글로벌 강소기업 1000+ 프로젝트', agency: '중기부', type: 'Export', maxAmount: '1,000,000천원', targetAge: [5, 99], tags: ['글로벌'], deadline: '2026-02-10', link: 'https://www.smes.go.kr' },
    { id: 20, title: '해외규격인증 획득지원사업', agency: 'KTR', type: 'Export', maxAmount: '100,000천원', targetAge: [0, 99], tags: ['인증'], deadline: '2026-03-31', link: 'https://www.exportvoucher.com' },

    // Startup & Scale-up (창업/성장)
    { id: 10, title: '예비창업패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '50,000천원', targetAge: [0, 0], tags: ['예비창업'], deadline: '2026-02-28', link: 'https://www.k-startup.go.kr' },
    { id: 11, title: '초기창업패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '70,000천원', targetAge: [0, 3], tags: ['3년미만'], deadline: '2026-03-20', link: 'https://www.k-startup.go.kr' },
    { id: 12, title: '창업도약패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '120,000천원', targetAge: [3, 7], tags: ['3-7년'], deadline: '2026-03-31', link: 'https://www.k-startup.go.kr' },
    { id: 21, title: '아기유니콘 200 육성사업', agency: '중기부', type: 'Funding', maxAmount: '300,000천원', targetAge: [0, 7], tags: ['유니콘'], deadline: '2026-04-15', link: 'https://www.k-startup.go.kr' },
    { id: 5, title: '중소기업 혁신바우처', agency: '중진공', type: 'Consulting', maxAmount: '50,000천원', targetAge: [3, 99], tags: ['마케팅', '컨설팅'], deadline: '2026-04-30', link: 'https://www.mssmiv.com' },

    // HR & Finance (인력/금융)
    { id: 4, title: '청년일자리 도약장려금', agency: '고용노동부', type: 'Hiring', maxAmount: '12,000천원', targetAge: [0, 99], tags: ['채용지원'], deadline: '2026-12-31', link: 'https://www.work.go.kr' },
    { id: 13, title: '산재예방시설 융자', agency: '안전보건공단', type: 'Loan', maxAmount: '1,000,000천원', targetAge: [0, 99], tags: ['안전설비'], deadline: '상시접수', link: 'https://clean.kosha.or.kr' },
    { id: 22, title: '중소기업 정책자금(운전)', agency: '중진공', type: 'Loan', maxAmount: '500,000천원', targetAge: [0, 99], tags: ['융자'], deadline: '매월접수', link: 'https://www.kosmes.or.kr' },
    { id: 23, title: '청년내일채움공제', agency: '고용노동부', type: 'Hiring', maxAmount: '12,000천원', targetAge: [0, 99], tags: ['인력유지'], deadline: '2026-12-31', link: 'https://www.work.go.kr' },
    { id: 24, title: '시니어인턴십 지원사업', agency: '보건복지부', type: 'Hiring', maxAmount: '2,400천원', targetAge: [0, 99], tags: ['시니어'], deadline: '상시접수', link: 'https://www.kordi.or.kr' },
    { id: 25, title: '소상공인 스마트상점 기술보급', agency: '소진공', type: 'Smart', maxAmount: '15,000천원', targetAge: [0, 99], tags: ['소상공인'], deadline: '2026-05-10', link: 'https://www.sbiz.or.kr' },
    { id: 26, title: '관광벤처사업 공모전', agency: '관광공사', type: 'Funding', maxAmount: '100,000천원', targetAge: [0, 7], tags: ['관광'], deadline: '2026-03-05', link: 'https://www.tourbiz.or.kr' },
    { id: 27, title: '콘텐츠 제작지원사업', agency: '콘진원', type: 'R&D', maxAmount: '200,000천원', targetAge: [0, 99], tags: ['콘텐츠'], deadline: '2026-02-25', link: 'https://www.kocca.kr' },
    { id: 28, title: '환경산업 육성 자금', agency: '환경산업기술원', type: 'Loan', maxAmount: '5,000,000천원', targetAge: [0, 99], tags: ['환경'], deadline: '분기별', link: 'https://www.keiti.re.kr' }
  ];

  // 안전한 요소 바인딩
  const bind = (id, event, handler) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, handler);
  };

  // --- Autocomplete Logic ---
  const companyInput = document.getElementById('company-search-input');
  const searchDropdown = document.getElementById('search-dropdown');
  const searchResultsList = document.getElementById('search-results-list');

  if (companyInput && searchDropdown && searchResultsList) {
    companyInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (query.length < 1) {
        searchDropdown.classList.add('hidden');
        return;
      }

      const normalize = (str) => str.replace(/\(주\)/g, '').replace(/\s+/g, '').toLowerCase();
      const normQuery = normalize(query);
      const keys = Object.keys(corporateDB);
      const matches = keys.filter(k => normalize(k).includes(normQuery));

      if (matches.length > 0) {
        renderDropdown(matches);
        searchDropdown.classList.remove('hidden');
      } else {
        searchDropdown.classList.add('hidden');
      }
    });

    document.addEventListener('click', (e) => {
      if (!companyInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.add('hidden');
      }
    });
  }

  function renderDropdown(matches) {
    searchResultsList.innerHTML = '';
    matches.forEach(name => {
      const li = document.createElement('li');
      li.className = 'px-6 py-3 hover:bg-slate-50 cursor-pointer text-sm text-slate-700 font-medium flex justify-between items-center';
      
      const data = corporateDB[name];
      const typeLabel = data.companyType.includes('상장') ? '<span class="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded ml-2">상장</span>' : '<span class="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded ml-2">일반</span>';
      
      li.innerHTML = `<span>${name}${typeLabel}</span> <span class="text-xs text-slate-400">${data.bizNum}</span>`;
      
      li.addEventListener('click', () => {
        if(companyInput) companyInput.value = name;
        searchDropdown.classList.add('hidden');
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

  // Smart Matching Logic (AI Score Calculation)
  function calculateMatchScore(companyData, grant) {
    let score = 60; // Base score

    // 1. Age Fit
    const age = companyData.companyAge || 5;
    if (grant.targetAge) {
      if (age >= grant.targetAge[0] && age <= grant.targetAge[1]) {
        score += 20; // Perfect age match
      } else if (grant.targetAge[1] === 99) {
        score += 10; // Open to all ages
      } else {
        score -= 30; // Age mismatch (critical)
      }
    }

    // 2. Keyword/Sector Fit (Mock)
    if (companyData.ksic === 'C29271') { // Manufacturing
      if (grant.type === 'Smart' || grant.type === 'R&D') score += 15;
    }
    if (companyData.certs && companyData.certs.includes('벤처기업')) {
      if (grant.type === 'R&D' || grant.type === 'Funding') score += 10;
    }
    
    // 3. Random noise for realism
    score += Math.floor(Math.random() * 10);
    
    return Math.min(99, Math.max(0, score));
  }

  // Generate Reasoning based on data
  function generateReason(companyData, grant) {
    let reason = "";
    const age = companyData.companyAge || 5;

    if (grant.targetAge && age <= grant.targetAge[1] && grant.targetAge[1] < 10) {
      reason += `귀사는 <strong>창업 ${age}년차</strong>로 해당 사업의 핵심 지원 대상입니다. `;
    } else {
      reason += `귀사의 업종 및 규모가 본 사업의 지원 자격에 부합합니다. `;
    }

    if (grant.type === 'R&D' && companyData.hasLab) {
      reason += `특히 <strong>기업부설연구소</strong>를 보유하고 있어 가점 혜택이 예상됩니다. `;
    } else if (grant.type === 'Smart') {
      reason += `제조 공정 효율화를 위한 <strong>스마트 설비 도입</strong>에 최적화된 사업입니다. `;
    } else if (grant.type === 'Export') {
      reason += `글로벌 진출을 위한 <strong>해외 마케팅 비용</strong>을 지원받을 수 있습니다. `;
    } else if (grant.type === 'Hiring') {
      reason += `최근 인력 채용 수요와 맞물려 <strong>인건비 절감 효과</strong>가 기대됩니다. `;
    }

    return reason;
  }

  // Submit Logic
  bind('submit-btn', 'click', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    if(loadingOverlay) loadingOverlay.classList.remove('hidden');
    
    const bar = document.getElementById('loading-bar');
    let w = 0;
    const interval = setInterval(() => {
      w += 2;
      if (bar) bar.style.width = w + '%';
      if (w >= 100) clearInterval(interval);
    }, 50);

    // Get current company data (Mock: use 태성정밀 data for calculation)
    const currentCompName = document.getElementById('company-search-input')?.value || '태성정밀';
    const companyData = corporateDB[currentCompName] || corporateDB['태성정밀'];

    setTimeout(() => {
      if(loadingOverlay) loadingOverlay.classList.add('hidden');
      const resultsArea = document.getElementById('matching-results');
      if(resultsArea) resultsArea.classList.remove('hidden');
      
      renderResults(companyData);
    }, 2500);
  });

  function renderResults(companyData) {
    const list = document.getElementById('results-list');
    if (!list) return;
    list.innerHTML = '';

    // Calculate scores and sort
    const scoredGrants = grantDatabase.map(item => {
      return { ...item, score: calculateMatchScore(companyData, item) };
    }).sort((a, b) => b.score - a.score);

    scoredGrants.forEach(item => {
      // Filter out very low scores
      if (item.score < 50) return;

      const reason = generateReason(companyData, item);
      const div = document.createElement('div');
      div.className = 'bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 shadow-sm mb-4 transition-all hover:shadow-md';
      div.innerHTML = `
        <div class="flex justify-between items-start">
           <div>
             <span class="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded mb-2">${item.agency}</span>
             <h4 class="font-bold text-lg text-slate-800 mb-1">${item.title}</h4>
             <p class="text-sm text-slate-500 mb-3">${item.tags.join(', ')} | 최대 ${item.maxAmount}</p>
           </div>
           <div class="text-right">
             <div class="text-2xl font-bold text-blue-600">${item.score}%</div>
             <div class="text-xs text-slate-400">매칭률</div>
           </div>
         </div>
         <div class="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div class="flex items-start">
               <i class="fas fa-robot text-blue-500 mt-1 mr-2"></i>
               <div>
                  <p class="text-xs font-bold text-slate-500 mb-1">AI 매칭 분석 결과</p>
                  <p class="text-sm text-slate-700 leading-relaxed text-justify">${reason}</p>
               </div>
            </div>
         </div>
         <div class="border-t border-slate-100 pt-3 mt-3 flex justify-between items-center">
            <span class="text-xs text-red-500 font-bold"><i class="far fa-clock mr-1"></i> 마감: ${item.deadline}</span>
            <a href="${item.link}" target="_blank" class="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-700 inline-flex items-center">
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
