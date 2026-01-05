// Matching Logic (Powered by MCE Core)
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
      companyType: "중소기업 (비상장)", mainBank: "IBK기업은행", creditRating: "BBB+", entry1yr: 15, exit1yr: 3, turnoverRate: 6.7
    },
    "(주)태성정밀": { 
      name: "태성정밀", bizNum: "123-45-67890", corpNum: "110111-1234567", ceoName: "김태성", foundingDate: "2015-03-15", 
      address: "경기 수원시 팔달구 효원로 123", ksic: "C29271", mainProduct: "반도체 장비 부품", 
      rev_2024: 11000, rev_2025: 12500, op_2024: 600, op_2025: 850, net_2024: 400, net_2025: 600, 
      assets: 8000, liabilities: 4000, capital: 4000, debtRatio: 100, 
      rndSpend: 300, researchers: 5, hasLab: '기업부설연구소 보유', 
      certs: ['벤처기업', '이노비즈', 'ISO9001', '소부장전문'], 
      employees: 45, youthEmp: 12,
      companyType: "중소기업 (비상장)", mainBank: "IBK기업은행", creditRating: "BBB+", entry1yr: 15, exit1yr: 3, turnoverRate: 6.7
    },
    "삼성전자": { 
      name: "삼성전자(주)", bizNum: "124-81-00998", corpNum: "130111-0006246", ceoName: "한종희", foundingDate: "1969-01-13", 
      address: "경기 수원시 영통구 삼성로 129", ksic: "C264", mainProduct: "가전제품, 통신기기", 
      rev_2024: 2589355, rev_2025: 3000000, op_2024: 65670, op_2025: 100000, net_2024: 55000, net_2025: 80000, 
      assets: 4559000, liabilities: 922000, capital: 3637000, debtRatio: 25, 
      rndSpend: 280000, researchers: 50000, hasLab: '기업부설연구소 보유', 
      certs: ['메인비즈', '녹색인증', 'ISO9001', 'ISO14001'], 
      employees: 120000, youthEmp: 40000,
      companyType: "코스피 상장기업", mainBank: "우리은행", creditRating: "AAA", entry1yr: 5000, exit1yr: 1200, turnoverRate: 1.0
    },
    "삼성물산": { name: "삼성물산", bizNum: "101-81-00000", corpNum: "110111-0000000", ceoName: "이재용", foundingDate: "1938-03-22", address: "서울시 강동구", employees: 5000, youthEmp: 1000, rev_2024: 300000, rev_2025: 320000, op_2024: 10000, op_2025: 12000, net_2024: 8000, net_2025: 9000, assets: 500000, liabilities: 200000, capital: 300000, debtRatio: 66, rndSpend: 1000, researchers: 200, hasLab: '보유', certs: [], companyType: "상장기업", mainBank: "우리은행", creditRating: "AA+", entry1yr: 200, exit1yr: 50, turnoverRate: 2.0 },
    "삼성SDI": { name: "삼성SDI", bizNum: "101-81-00001", corpNum: "110111-0000001", ceoName: "최윤호", foundingDate: "1970-01-01", address: "경기도 용인시", employees: 10000, youthEmp: 3000, rev_2024: 200000, rev_2025: 250000, op_2024: 15000, op_2025: 18000, net_2024: 12000, net_2025: 14000, assets: 400000, liabilities: 150000, capital: 250000, debtRatio: 60, rndSpend: 5000, researchers: 1000, hasLab: '보유', certs: ['ISO14001'], companyType: "상장기업", mainBank: "신한은행", creditRating: "AA", entry1yr: 500, exit1yr: 100, turnoverRate: 3.0 }
  };

  const grantDatabase = [
    { id: 1, title: '2026년 창업성장기술개발사업 디딤돌 창업과제', agency: '중소벤처기업부', type: 'R&D', maxAmount: '120,000천원', region: '전국', targetAge: '7년미만', certs: [], tags: ['기술개발', '초기창업'], deadline: '2026-02-28', link: 'https://www.smtech.go.kr/front/main/main.do', reasonTemplate: '귀사는 <strong>창업 7년 미만 기업</strong>으로 본 사업의 핵심 지원 대상입니다. 특히 <strong>기업부설연구소</strong>를 보유하고 있어 R&D 역량 평가에서 높은 가점이 예상됩니다.' },
    { id: 2, title: '2026년 스마트공장 보급확산사업', agency: '중기부', type: 'Smart', maxAmount: '50,000천원', region: '전국', tags: ['제조혁신'], deadline: '2026-03-15', link: 'https://www.smart-factory.kr/', reasonTemplate: '제조업종(C29)을 영위하고 계시므로 <strong>제조 혁신을 위한 스마트공장 도입</strong>이 필수적입니다.' },
    { id: 3, title: '수출바우처사업', agency: 'KOTRA', type: 'Export', maxAmount: '30,000천원', region: '전국', tags: ['해외진출'], deadline: '2026-01-31', link: 'https://www.exportvoucher.com/', reasonTemplate: '<strong>글로벌 시장 진출</strong>을 계획 중이시라면 반드시 신청해야 할 사업입니다.' },
    { id: 4, title: '청년일자리 도약장려금', agency: '고용노동부', type: 'Hiring', maxAmount: '12,000천원', region: '전국', tags: ['채용지원'], deadline: '2026-12-31', link: 'https://www.work.go.kr/youthjob/', reasonTemplate: '최근 <strong>청년 근로자 고용 실적</strong>이 확인되어 지원 가능성이 매우 높습니다.' },
    { id: 5, title: '중소기업 혁신바우처', agency: '중진공', type: 'Consulting', maxAmount: '50,000천원', region: '전국', tags: ['마케팅', '컨설팅'], deadline: '2026-04-30', link: 'https://www.mssmiv.com/', reasonTemplate: '성장기에 진입한 제조기업의 경우, 마케팅 바우처를 통해 브랜드 인지도를 높이는 전략이 유효합니다.' },
    { id: 6, title: '스마트공장 고도화 지원사업', agency: '중기부', type: 'Smart', maxAmount: '200,000천원', region: '전국', tags: ['고도화', 'AI적용'], deadline: '2026-03-31', link: 'https://www.smart-factory.kr/', reasonTemplate: '기존 스마트공장 구축 경험이 있거나, 생산 공정의 데이터 수집이 가능한 수준이라면 <strong>고도화 사업</strong>에 도전해 보십시오.' },
    { id: 7, title: '수출유망중소기업 지정', agency: '중기부', type: 'Export', maxAmount: '지원우대', region: '전국', tags: ['수출지원'], deadline: '2026-05-31', link: 'https://www.smes.go.kr/exportcenter/', reasonTemplate: '수출 지원사업 참여 시 가점 부여, 정책자금 금리 우대 등 다양한 혜택이 있는 <strong>인증 제도</strong>입니다.' },
    { id: 8, title: 'IP나래 프로그램', agency: '특허청', type: 'R&D', maxAmount: '17,500천원', region: '지역별', tags: ['특허전략'], deadline: '2026-02-15', link: 'https://www.ripc.org/pms/html/support/business_guide.do', reasonTemplate: '창업 7년 이내의 기술 기반 기업에게 <strong>강력한 특허 포트폴리오</strong> 구축을 지원합니다.' },
    { id: 9, title: '데이터바우처 지원사업', agency: '과기부', type: 'Smart', maxAmount: '60,000천원', region: '전국', tags: ['AI가공'], deadline: '2026-04-10', link: 'https://kdata.or.kr/datavoucher/', reasonTemplate: '비즈니스 혁신을 위해 <strong>데이터 구매 및 가공</strong>이 필요한 경우 최적의 사업입니다.' },
    { id: 10, title: '예비창업패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '50,000천원', region: '전국', tags: ['예비창업'], deadline: '2026-02-28', link: 'https://www.k-startup.go.kr/', reasonTemplate: '혁신적인 아이디어를 보유한 예비 창업자에게 <strong>사업화 자금과 멘토링</strong>을 지원합니다.' },
    { id: 11, title: '초기창업패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '70,000천원', region: '전국', tags: ['3년미만'], deadline: '2026-03-20', link: 'https://www.k-startup.go.kr/', reasonTemplate: '창업 3년 이내의 기업에게 <strong>시제품 제작 및 판로 개척</strong> 비용을 지원합니다.' },
    { id: 12, title: '창업도약패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '120,000천원', region: '전국', tags: ['3-7년'], deadline: '2026-03-31', link: 'https://www.k-startup.go.kr/', reasonTemplate: '창업 3~7년차, 이른바 데스밸리(Death Valley)를 극복하고 <strong>도약(Jump-up)</strong>하려는 기업을 위한 사업입니다.' },
    { id: 13, title: '산재예방시설 융자', agency: '안전보건공단', type: 'Loan', maxAmount: '1,000,000천원', region: '전국', tags: ['안전설비'], deadline: '상시접수', link: 'https://clean.kosha.or.kr/', reasonTemplate: '제조 현장의 <strong>안전성 확보 및 작업 환경 개선</strong>을 위한 자금을 장기 저리로 융자 지원합니다.' }
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

      // Normalize helper: remove spaces, (주), special chars
      const normalize = (str) => str.replace(/\(주\)/g, '').replace(/\s+/g, '').toLowerCase();
      const normQuery = normalize(query);

      const keys = Object.keys(corporateDB);
      // Filter: if normalized key includes normalized query
      const matches = keys.filter(k => normalize(k).includes(normQuery));

      if (matches.length > 0) {
        renderDropdown(matches);
        searchDropdown.classList.remove('hidden');
      } else {
        searchDropdown.classList.add('hidden');
      }
    });

    // Hide dropdown when clicking outside
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
        // Optional: Trigger fetch immediately or just let user click button
      });
      searchResultsList.appendChild(li);
    });
  }

  // Demo Fill (Updated to use 태성정밀 which exists in DB)
  bind('btn-fill-demo', 'click', () => {
    if(companyInput) {
      companyInput.value = '태성정밀';
      // MCE.ui.toast('데모 데이터(태성정밀)가 입력되었습니다.', 'success'); // MCE might not be ready if loaded order differs, use alert fallback or assume MCE ready
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
    
    // Simulate Fetch
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

  // Submit Logic
  bind('submit-btn', 'click', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    if(loadingOverlay) loadingOverlay.classList.remove('hidden');
    
    const bar = document.getElementById('loading-bar');
    let w = 0;
    const interval = setInterval(() => {
      w += 5;
      if (bar) bar.style.width = w + '%';
      if (w >= 100) clearInterval(interval);
    }, 100);

    setTimeout(() => {
      if(loadingOverlay) loadingOverlay.classList.add('hidden');
      const resultsArea = document.getElementById('matching-results');
      if(resultsArea) resultsArea.classList.remove('hidden');
      renderResults();
    }, 2500);
  });

  function renderResults() {
    const list = document.getElementById('results-list');
    if (!list) return;
    list.innerHTML = '';

    grantDatabase.forEach(item => {
      const score = 85 + Math.floor(Math.random() * 10);
      const div = document.createElement('div');
      div.className = 'bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 shadow-sm mb-4 transition-all hover:shadow-md';
      div.innerHTML = `
        <div class="flex justify-between items-start">
           <div>
             <span class="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded mb-2">${item.agency}</span>
             <h4 class="font-bold text-lg text-slate-800 mb-1">${item.title}</h4>
             <p class="text-sm text-slate-500 mb-3">${item.tags.join(', ')} | 최대 ${item.maxAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
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
                  <p class="text-sm text-slate-700 leading-relaxed text-justify">${item.reasonTemplate}</p>
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
    if(companyInput) companyInput.focus();
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
