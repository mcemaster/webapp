// Government Grant Matching Logic
document.addEventListener('DOMContentLoaded', () => {
  console.log('Matching Logic Module Loaded');

  // --- Constants & Data ---
  const corporateDB = {
    "태성정밀": {
      name: "태성정밀", bizNum: "123-45-67890", corpNum: "110111-1234567", ceoName: "김태성", foundingDate: "2015-03-15", 
      address: "경기 수원시 팔달구 효원로 123", ksic: "C29271", mainProduct: "반도체 장비 부품",
      // Financials (DART)
      rev_2024: 11000, rev_2025: 12500, op_2024: 600, op_2025: 850, net_2024: 400, net_2025: 600,
      assets: 8000, liabilities: 4000, capital: 4000, debtRatio: 100,
      // R&D & Certs (KIPRIS, KOITA)
      rndSpend: 300, researchers: 5, hasLab: '기업부설연구소 보유',
      certs: ['벤처기업', '이노비즈', 'ISO9001', '소부장전문'],
      // HR (NPS)
      employees: 45, youthEmp: 12
    },
    "삼성전자": {
       name: "삼성전자(주)", bizNum: "124-81-00998", corpNum: "130111-0006246", ceoName: "한종희", foundingDate: "1969-01-13",
       address: "경기 수원시 영통구 삼성로 129", ksic: "C264", mainProduct: "가전제품, 통신기기",
       rev_2024: 2589355, rev_2025: 3000000, op_2024: 65670, op_2025: 100000, net_2024: 55000, net_2025: 80000,
       assets: 4559000, liabilities: 922000, capital: 3637000, debtRatio: 25,
       rndSpend: 280000, researchers: 50000, hasLab: '기업부설연구소 보유',
       certs: ['메인비즈', '녹색인증', 'ISO9001', 'ISO14001'],
       employees: 120000, youthEmp: 40000
    }
  };

  const grantDatabase = [
    { 
      id: 1, title: '2026년 창업성장기술개발사업 디딤돌 창업과제', agency: '중소벤처기업부', type: 'R&D', maxAmount: '1.2억원', region: '전국', targetAge: '7년미만', certs: [], tags: ['기술개발', '초기창업'], deadline: '2026-02-28',
      link: 'https://www.smtech.go.kr/front/main/main.do',
      reasonTemplate: '귀사는 <strong>창업 7년 미만 기업</strong>으로 본 사업의 핵심 지원 대상입니다. 특히 <strong>기업부설연구소</strong>를 보유하고 있어 R&D 역량 평가에서 높은 가점이 예상됩니다. 최근 매출 성장세가 뚜렷하여 사업화 가능성 평가에서도 긍정적인 결과를 얻을 수 있습니다.'
    },
    { 
      id: 2, title: '2026년 스마트공장 보급확산사업', agency: '중기부', type: 'Smart', maxAmount: '5천만원', region: '전국', tags: ['제조혁신'], deadline: '2026-03-15',
      link: 'https://www.smart-factory.kr/',
      reasonTemplate: '제조업종(C29)을 영위하고 계시므로 <strong>제조 혁신을 위한 스마트공장 도입</strong>이 필수적입니다. 현재 매출 규모(100억 이상)를 고려할 때, 기초 단계보다는 <strong>고도화 단계 진입</strong>을 목표로 하는 것이 유리하며, 생산성 향상을 위한 자동화 설비 도입에 최적화된 사업입니다.'
    },
    { 
      id: 3, title: '수출바우처사업', agency: 'KOTRA', type: 'Export', maxAmount: '3천만원', region: '전국', tags: ['해외진출'], deadline: '2026-01-31',
      link: 'https://www.exportvoucher.com/',
      reasonTemplate: '<strong>글로벌 시장 진출</strong>을 계획 중이시라면 반드시 신청해야 할 사업입니다. 귀사의 주력 품목은 해외 수요가 높은 분야로, 해외 마케팅 및 전시회 참가 지원을 통해 수출 실적을 단기간에 끌어올릴 수 있는 잠재력이 매우 큽니다. 수출 실적이 없더라도 내수기업 전형으로 지원 가능합니다.'
    },
    { 
      id: 4, title: '청년일자리 도약장려금', agency: '고용노동부', type: 'Hiring', maxAmount: '1,200만원', region: '전국', tags: ['채용지원'], deadline: '2026-12-31',
      link: 'https://www.work.go.kr/youthjob/',
      reasonTemplate: '최근 <strong>청년 근로자 고용 실적</strong>이 확인되어 지원 가능성이 매우 높습니다. 만 34세 이하 청년을 정규직으로 채용하고 6개월 이상 고용 유지 시, 인건비 부담을 획기적으로 줄일 수 있습니다. 귀사의 고용 증가 추세를 볼 때, 최대 지원 한도까지 혜택을 받을 수 있을 것으로 분석됩니다.'
    },
    { 
      id: 5, title: '중소기업 혁신바우처', agency: '중진공', type: 'Consulting', maxAmount: '5천만원', region: '전국', tags: ['마케팅', '컨설팅'], deadline: '2026-04-30',
      link: 'https://www.mssmiv.com/',
      reasonTemplate: '최근 3년 평균 매출액 120억 이하의 제조 소기업에게 주어지는 혜택입니다. <strong>기술지원, 마케팅, 컨설팅</strong> 등 필요한 분야를 선택하여 패키지 형태로 지원받을 수 있습니다. 특히 귀사와 같이 성장기에 진입한 제조기업의 경우, 마케팅 바우처를 통해 브랜드 인지도를 높이는 전략이 유효합니다.'
    },
    { 
      id: 6, title: '스마트공장 고도화 지원사업', agency: '중기부', type: 'Smart', maxAmount: '2억원', region: '전국', tags: ['고도화', 'AI적용'], deadline: '2026-03-31',
      link: 'https://www.smart-factory.kr/',
      reasonTemplate: '기존 스마트공장 구축 경험이 있거나, 생산 공정의 데이터 수집이 가능한 수준이라면 <strong>고도화 사업</strong>에 도전해 보십시오. AI 및 IoT 기술을 접목하여 공정 불량률을 획기적으로 개선할 수 있습니다. 귀사의 기술력과 R&D 투자 현황은 고도화 사업 선정에 긍정적인 요소로 작용할 것입니다.'
    },
    { 
      id: 7, title: '수출유망중소기업 지정', agency: '중기부', type: 'Export', maxAmount: '지원우대', region: '전국', tags: ['수출지원'], deadline: '2026-05-31',
      link: 'https://www.smes.go.kr/exportcenter/',
      reasonTemplate: '수출 지원사업 참여 시 가점 부여, 정책자금 금리 우대 등 다양한 혜택이 있는 <strong>인증 제도</strong>입니다. 귀사의 기술력과 제품 경쟁력을 바탕으로 수출유망중소기업으로 지정된다면, 향후 2년간 정부 지원사업에서 유리한 고지를 선점할 수 있습니다. 벤처/이노비즈 인증과 시너지 효과가 큽니다.'
    },
    { 
      id: 8, title: 'IP나래 프로그램', agency: '특허청', type: 'R&D', maxAmount: '1,750만원', region: '지역별', tags: ['특허전략'], deadline: '2026-02-15',
      link: 'https://www.ripc.org/pms/html/support/business_guide.do',
      reasonTemplate: '창업 7년 이내의 기술 기반 기업에게 <strong>강력한 특허 포트폴리오</strong> 구축을 지원합니다. 귀사가 보유한 기술을 특허로 권리화하고, 경쟁사의 특허 침해를 방지하는 전략을 수립할 수 있습니다. R&D 투자 비중이 높은 귀사의 특성상, IP 경영 전략 수립은 필수적입니다.'
    },
    { 
      id: 9, title: '데이터바우처 지원사업', agency: '과기부', type: 'Smart', maxAmount: '6천만원', region: '전국', tags: ['AI가공'], deadline: '2026-04-10',
      link: 'https://kdata.or.kr/datavoucher/',
      reasonTemplate: '비즈니스 혁신을 위해 <strong>데이터 구매 및 가공</strong>이 필요한 경우 최적의 사업입니다. AI 솔루션 도입이나 마케팅 데이터 분석 등 다양한 목적으로 활용 가능합니다. 귀사의 업종 특성상 데이터 기반의 의사결정 체계를 구축한다면 생산 효율성을 크게 높일 수 있을 것입니다.'
    },
    { 
      id: 10, title: '예비창업패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '5천만원', region: '전국', tags: ['예비창업'], deadline: '2026-02-28',
      link: 'https://www.k-startup.go.kr/',
      reasonTemplate: '혁신적인 아이디어를 보유한 예비 창업자에게 <strong>사업화 자금과 멘토링</strong>을 지원합니다. 아직 사업자 등록을 하지 않으셨거나, 새로운 법인 설립을 고려 중이시라면 가장 먼저 검토해야 할 사업입니다. 귀사의 기술 아이템은 시장성이 높아 선정 가능성이 매우 긍정적으로 평가됩니다.'
    },
    { 
      id: 11, title: '초기창업패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '7천만원', region: '전국', tags: ['3년미만'], deadline: '2026-03-20',
      link: 'https://www.k-startup.go.kr/',
      reasonTemplate: '창업 3년 이내의 기업에게 <strong>시제품 제작 및 판로 개척</strong> 비용을 지원합니다. 귀사는 초기 시장 진입에 성공하여 매출이 발생하고 있는 단계이므로, 본 사업을 통해 스케일업(Scale-up)의 발판을 마련할 수 있습니다. 특히 초기 투자 유치 실적이 있다면 선정 확률이 더욱 높아집니다.'
    },
    { 
      id: 12, title: '창업도약패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '1.2억원', region: '전국', tags: ['3-7년'], deadline: '2026-03-31',
      link: 'https://www.k-startup.go.kr/',
      reasonTemplate: '창업 3~7년차, 이른바 데스밸리(Death Valley)를 극복하고 <strong>도약(Jump-up)</strong>하려는 기업을 위한 사업입니다. 귀사의 매출 성장세와 고용 창출 실적은 이 단계의 기업이 보여줄 수 있는 모범적인 지표입니다. 사업 모델 고도화 및 글로벌 진출 자금으로 활용하기에 매우 적합합니다.'
    },
    { 
      id: 13, title: '산재예방시설 융자', agency: '안전보건공단', type: 'Loan', maxAmount: '10억원', region: '전국', tags: ['안전설비'], deadline: '상시접수',
      link: 'https://clean.kosha.or.kr/',
      reasonTemplate: '제조 현장의 <strong>안전성 확보 및 작업 환경 개선</strong>을 위한 자금을 장기 저리로 융자 지원합니다. 노후 설비 교체나 위험 공정 개선이 필요한 경우, 이 사업을 통해 금융 비용 부담을 최소화하면서 시설 투자를 진행할 수 있습니다. 클린사업장 인정과 연계하면 추가 혜택도 가능합니다.'
    }
  ];

  // --- Elements ---
  const btnFillDemo = document.getElementById('btn-fill-demo');
  const btnAutoFetch = document.getElementById('btn-auto-fetch');
  const btnNext = document.getElementById('next-btn');
  const btnPrev = document.getElementById('prev-btn');
  const btnSubmit = document.getElementById('submit-btn');
  const btnCloseSuccess = document.getElementById('btn-close-success');
  const btnManualInput = document.getElementById('btn-manual-input');
  const companyInput = document.getElementById('company-search-input');
  
  // --- Wizard Logic ---
  let currentStep = 1;
  const totalSteps = 4;

  function updateUI() {
     document.querySelectorAll('.step-content').forEach((el, idx) => {
        if(idx+1 === currentStep) el.classList.remove('hidden'); else el.classList.add('hidden');
     });
     document.querySelectorAll('.step-dot').forEach((el, idx) => {
        if(idx+1 <= currentStep) { el.classList.remove('bg-slate-200','text-slate-500'); el.classList.add('bg-blue-600','text-white'); }
        else { el.classList.remove('bg-blue-600','text-white'); el.classList.add('bg-slate-200','text-slate-500'); }
     });
     if(currentStep === 1) btnPrev.classList.add('hidden'); else btnPrev.classList.remove('hidden');
     if(currentStep === totalSteps) { btnNext.classList.add('hidden'); btnSubmit.classList.remove('hidden'); }
     else { btnNext.classList.remove('hidden'); btnSubmit.classList.add('hidden'); }
     document.getElementById('step-wizard').scrollIntoView({ behavior: 'smooth' });
  }

  if(btnNext) btnNext.addEventListener('click', () => { if(currentStep < totalSteps) { currentStep++; updateUI(); } });
  if(btnPrev) btnPrev.addEventListener('click', () => { if(currentStep > 1) { currentStep--; updateUI(); } });
  
  // --- Demo Fill ---
  if(btnFillDemo) {
    btnFillDemo.addEventListener('click', () => {
       if(companyInput) companyInput.value = '태성정밀';
       alert('데모 기업명(태성정밀)이 입력되었습니다. [데이터 연동] 버튼을 눌러주세요.');
    });
  }
  
  // --- Auto Fetch Logic ---
  if(btnAutoFetch) {
    btnAutoFetch.addEventListener('click', () => {
       const name = companyInput.value.trim();
       if(!name) return alert('기업명을 입력하세요.');
       
       // Show Loading Modal
       const loadingModal = document.getElementById('data-loading-modal');
       if(loadingModal) loadingModal.classList.remove('hidden');
       
       // Reset logs
       const logNps = document.getElementById('log-nps');
       const logCert = document.getElementById('log-cert');
       if(logNps) logNps.classList.add('hidden');
       if(logCert) logCert.classList.add('hidden');

       // Simulate Multi-source Fetching
       setTimeout(() => { if(logNps) logNps.classList.remove('hidden'); }, 800);
       setTimeout(() => { if(logCert) logCert.classList.remove('hidden'); }, 1600);

       setTimeout(() => {
          if(loadingModal) loadingModal.classList.add('hidden');
          
          const data = corporateDB[name];
          if(data) {
             // SUCCESS: Fill Data
             document.getElementById('companyName').value = data.name;
             document.getElementById('bizNum').value = data.bizNum;
             document.getElementById('corpNum').value = data.corpNum;
             document.getElementById('ceoName').value = data.ceoName;
             document.getElementById('foundingDate').value = data.foundingDate;
             document.getElementById('address').value = data.address;
             
             // 2. HR Info
             document.getElementById('employees').value = data.employees;
             document.getElementById('youthEmp').value = data.youthEmp;

             // 3. Financials
             document.getElementById('rev_2024').value = data.rev_2024;
             document.getElementById('rev_2025').value = data.rev_2025;
             document.getElementById('op_2024').value = data.op_2024;
             document.getElementById('op_2025').value = data.op_2025;
             document.getElementById('net_2024').value = data.net_2024;
             document.getElementById('net_2025').value = data.net_2025;
             document.getElementById('assets').value = data.assets;
             document.getElementById('liabilities').value = data.liabilities;
             document.getElementById('capital').value = data.capital;
             document.getElementById('debtRatio').value = data.debtRatio + '%';

             // 4. R&D & Certs
             document.getElementById('labStatus').value = data.hasLab;
             document.getElementById('researchers').value = data.researchers;
             document.getElementById('rndSpend').value = data.rndSpend;
             
             // Auto-check Certs
             if(data.certs) {
                data.certs.forEach(cert => {
                   const checkbox = document.getElementById('cert-'+cert);
                   if(checkbox) checkbox.checked = true;
                });
             }

             // Show Badges & Success Modal
             const statusArea = document.getElementById('data-status-area');
             if(statusArea) statusArea.classList.remove('hidden');
             
             ['badge-dart', 'badge-nps', 'badge-cert'].forEach(id => {
                const el = document.getElementById(id);
                if(el) el.classList.remove('hidden');
             });
             
             const successModal = document.getElementById('custom-success-modal');
             if(successModal) successModal.classList.remove('hidden');
          } else {
             // FAILURE: Show Manual Input Modal
             const notFoundModal = document.getElementById('not-found-modal');
             if(notFoundModal) notFoundModal.classList.remove('hidden');
          }
       }, 2500);
    });
  }

  // --- Modal Close Handlers ---
  if(btnCloseSuccess) {
    btnCloseSuccess.addEventListener('click', () => {
      document.getElementById('custom-success-modal').classList.add('hidden');
    });
  }
  if(btnManualInput) {
    btnManualInput.addEventListener('click', () => {
      document.getElementById('not-found-modal').classList.add('hidden');
      document.getElementById('companyName').focus(); 
    });
  }

  // --- Submit Logic ---
  if(btnSubmit) {
     btnSubmit.addEventListener('click', () => {
       const loadingOverlay = document.getElementById('loading-overlay');
       if(loadingOverlay) loadingOverlay.classList.remove('hidden');
       
       const bar = document.getElementById('loading-bar');
       let w=0;
       const intv = setInterval(() => { 
         w+=2; 
         if(bar) bar.style.width=w+'%'; 
         if(w>100) clearInterval(intv); 
       }, 50);
       
       setTimeout(() => {
          if(loadingOverlay) loadingOverlay.classList.add('hidden');
          const resultsArea = document.getElementById('matching-results');
          if(resultsArea) resultsArea.classList.remove('hidden');
          
          const list = document.getElementById('results-list');
          list.innerHTML = '';
          
          let count = 0;
          grantDatabase.forEach((item) => {
             // Mock Score
             let score = 80 + Math.floor(Math.random() * 15);
             
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
               
               <!-- AI Reason Section -->
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
             count++;
          });
       }, 3000);
     });
  }
});
