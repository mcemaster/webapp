// Matching Logic (Powered by MCE Core)
document.addEventListener('DOMContentLoaded', () => {
  
  // 데이터 및 로직 생략 (기존 구조 유지하되 MCE Core 유틸리티 활용)
  const corporateDB = {
    "태성정밀": { name: "태성정밀", bizNum: "123-45-67890", corpNum: "110111-1234567", ceoName: "김태성", foundingDate: "2015-03-15", address: "경기 수원시 팔달구 효원로 123", ksic: "C29271", mainProduct: "반도체 장비 부품", rev_2024: 11000, rev_2025: 12500, op_2024: 600, op_2025: 850, net_2024: 400, net_2025: 600, assets: 8000, liabilities: 4000, capital: 4000, debtRatio: 100, rndSpend: 300, researchers: 5, hasLab: '기업부설연구소 보유', certs: ['벤처기업', '이노비즈', 'ISO9001', '소부장전문'], employees: 45, youthEmp: 12 },
    "삼성전자": { name: "삼성전자(주)", bizNum: "124-81-00998", corpNum: "130111-0006246", ceoName: "한종희", foundingDate: "1969-01-13", address: "경기 수원시 영통구 삼성로 129", ksic: "C264", mainProduct: "가전제품, 통신기기", rev_2024: 2589355, rev_2025: 3000000, op_2024: 65670, op_2025: 100000, net_2024: 55000, net_2025: 80000, assets: 4559000, liabilities: 922000, capital: 3637000, debtRatio: 25, rndSpend: 280000, researchers: 50000, hasLab: '기업부설연구소 보유', certs: ['메인비즈', '녹색인증', 'ISO9001', 'ISO14001'], employees: 120000, youthEmp: 40000 }
  };

  const grantDatabase = [
    { id: 1, title: '2026년 창업성장기술개발사업 디딤돌 창업과제', agency: '중소벤처기업부', type: 'R&D', maxAmount: '1.2억원', region: '전국', targetAge: '7년미만', certs: [], tags: ['기술개발', '초기창업'], deadline: '2026-02-28', link: 'https://www.smtech.go.kr/front/main/main.do', reasonTemplate: '귀사는 <strong>창업 7년 미만 기업</strong>으로 본 사업의 핵심 지원 대상입니다. 특히 <strong>기업부설연구소</strong>를 보유하고 있어 R&D 역량 평가에서 높은 가점이 예상됩니다.' },
    // ... (기타 데이터 생략 - 기존과 동일하게 유지)
    { id: 2, title: '2026년 스마트공장 보급확산사업', agency: '중기부', type: 'Smart', maxAmount: '5천만원', region: '전국', tags: ['제조혁신'], deadline: '2026-03-15', link: 'https://www.smart-factory.kr/', reasonTemplate: '제조업종(C29)을 영위하고 계시므로 <strong>제조 혁신을 위한 스마트공장 도입</strong>이 필수적입니다.' },
    { id: 3, title: '수출바우처사업', agency: 'KOTRA', type: 'Export', maxAmount: '3천만원', region: '전국', tags: ['해외진출'], deadline: '2026-01-31', link: 'https://www.exportvoucher.com/', reasonTemplate: '<strong>글로벌 시장 진출</strong>을 계획 중이시라면 반드시 신청해야 할 사업입니다.' }
  ];

  // 안전한 요소 바인딩
  const bind = (id, event, handler) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, handler);
  };

  // Demo Fill
  bind('btn-fill-demo', 'click', () => {
    const input = MCE.$('#company-search-input');
    if(input) {
      input.value = '태성정밀';
      MCE.ui.toast('데모 데이터(태성정밀)가 입력되었습니다.', 'success');
    }
  });

  // Auto Fetch
  bind('btn-auto-fetch', 'click', () => {
    const input = MCE.$('#company-search-input');
    if(!input || !input.value.trim()) {
      MCE.ui.toast('기업명을 입력해주세요.', 'error');
      return;
    }
    
    const name = input.value.trim();
    MCE.$('#data-loading-modal')?.classList.remove('hidden'); // Show Modal

    // Simulate Fetch
    setTimeout(() => {
      MCE.$('#data-loading-modal')?.classList.add('hidden');
      
      const data = corporateDB[name];
      if (data) {
        fillForm(data);
        MCE.$('#custom-success-modal')?.classList.remove('hidden');
        MCE.ui.toast('12종 데이터를 성공적으로 불러왔습니다.', 'success');
      } else {
        MCE.$('#not-found-modal')?.classList.remove('hidden');
      }
    }, 2000);
  });

  function fillForm(data) {
    // 안전한 값 주입 (값이 없어도 에러 안나게)
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if(el) el.value = val;
    };

    setVal('companyName', data.name);
    setVal('bizNum', data.bizNum);
    setVal('corpNum', data.corpNum);
    setVal('ceoName', data.ceoName);
    setVal('foundingDate', data.foundingDate);
    setVal('address', data.address);
    setVal('employees', data.employees);
    setVal('youthEmp', data.youthEmp);
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
    
    // 뱃지 표시
    document.getElementById('data-status-area')?.classList.remove('hidden');
    ['badge-dart', 'badge-nps', 'badge-cert'].forEach(id => document.getElementById(id)?.classList.remove('hidden'));
  }

  // Submit Logic
  bind('submit-btn', 'click', () => {
    MCE.$('#loading-overlay')?.classList.remove('hidden');
    
    // Progress Bar Animation
    const bar = document.getElementById('loading-bar');
    let w = 0;
    const interval = setInterval(() => {
      w += 5;
      if (bar) bar.style.width = w + '%';
      if (w >= 100) clearInterval(interval);
    }, 100);

    setTimeout(() => {
      MCE.$('#loading-overlay')?.classList.add('hidden');
      MCE.$('#matching-results')?.classList.remove('hidden');
      renderResults();
    }, 2500);
  });

  function renderResults() {
    const list = document.getElementById('results-list');
    if (!list) return;
    list.innerHTML = '';

    grantDatabase.forEach(item => {
      const score = 85 + Math.floor(Math.random() * 10); // Mock Score
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

  // Modals
  bind('btn-close-success', 'click', () => MCE.$('#custom-success-modal')?.classList.add('hidden'));
  bind('btn-manual-input', 'click', () => {
    MCE.$('#not-found-modal')?.classList.add('hidden');
    MCE.$('#companyName')?.focus();
  });

  // Wizard Nav
  let currentStep = 1;
  const updateStep = () => {
    document.querySelectorAll('.step-content').forEach((el, idx) => {
      if(idx + 1 === currentStep) el.classList.remove('hidden'); else el.classList.add('hidden');
    });
    // Dots logic omitted for brevity, but similar safe selection should apply
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
