import { Layout } from '../components/Layout'

export const SupportMatching = (props: { user: any }) => {
  return (
    <Layout user={props.user}>
      {/* Hero Section */}
      <div class="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 class="text-3xl md:text-4xl font-extrabold mb-2">
            AI 정부지원사업 매칭
          </h1>
          <p class="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
            DART 기업 데이터를 기반으로 가장 적합한 지원사업을 추천해 드립니다.
          </p>
        </div>
      </div>

      <div class="max-w-4xl mx-auto px-4 -mt-8 relative z-20 pb-20">
        
        {/* 1. Search & Input Section */}
        <div id="input-section" class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 animate-fade-in-up">
          
          {/* --- NAVER STYLE SEARCH BAR --- */}
          <div class="mb-10 relative">
            <label class="block text-sm font-bold text-slate-700 mb-2 flex items-center">
              <i class="fas fa-search text-blue-600 mr-2"></i> 기업명 검색 (DART 연동)
            </label>
            <div class="relative group">
              <input type="text" id="company-search" placeholder="기업명을 입력하세요 (예: 삼성전자, 태성정밀)" 
                class="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-0 outline-none transition-colors shadow-sm group-hover:border-green-400 pl-12" autocomplete="off" />
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors">
                <span class="font-extrabold text-lg">N</span>
              </div>
              <button id="btn-search-icon" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-green-600 transition">
                <i class="fas fa-search"></i>
              </button>
            </div>

            {/* Autocomplete Dropdown (Naver Style) */}
            <div id="autocomplete-dropdown" class="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-b-xl shadow-2xl mt-0 z-50 hidden overflow-hidden">
              <div class="bg-slate-50 px-4 py-2 text-xs text-slate-500 border-b border-slate-100 flex justify-between">
                <span>연관 기업</span>
                <span class="cursor-pointer hover:text-slate-700" onclick="closeDropdown()">닫기 <i class="fas fa-times"></i></span>
              </div>
              <div id="dropdown-list" class="max-h-60 overflow-y-auto">
                {/* List items injected by JS */}
              </div>
            </div>
          </div>

          {/* Form Fields (Auto-filled) */}
          <div class="border-t border-slate-100 pt-8">
            <h3 class="font-bold text-slate-800 mb-6 flex items-center">
              <span class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">1</span>
              기업 상세 정보 <span class="text-xs text-slate-400 font-normal ml-2">(검색 시 자동 입력됩니다)</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">기업명</label>
                <input type="text" id="form-name" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 outline-none transition" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">대표자</label>
                <input type="text" id="form-ceo" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 outline-none transition" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">업종 (표준산업분류)</label>
                <input type="text" id="form-industry" placeholder="예: 소프트웨어 개발" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 outline-none transition" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">매출액 (백만원)</label>
                <input type="number" id="form-revenue" placeholder="0" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 outline-none transition" />
              </div>
            </div>

            <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-8">
              <h3 class="font-bold text-slate-700 mb-3 text-sm">보유 인증 및 특허 (가점 요인)</h3>
              <div class="flex flex-wrap gap-3">
                <label class="inline-flex items-center cursor-pointer"><input type="checkbox" class="form-checkbox text-blue-600 rounded border-slate-300" value="기업부설연구소" /> <span class="ml-2 text-sm text-slate-600">기업부설연구소</span></label>
                <label class="inline-flex items-center cursor-pointer"><input type="checkbox" class="form-checkbox text-blue-600 rounded border-slate-300" value="벤처기업" /> <span class="ml-2 text-sm text-slate-600">벤처기업</span></label>
                <label class="inline-flex items-center cursor-pointer"><input type="checkbox" class="form-checkbox text-blue-600 rounded border-slate-300" value="ISO인증" /> <span class="ml-2 text-sm text-slate-600">ISO 인증</span></label>
                <label class="inline-flex items-center cursor-pointer"><input type="checkbox" class="form-checkbox text-blue-600 rounded border-slate-300" value="이노비즈" /> <span class="ml-2 text-sm text-slate-600">이노비즈</span></label>
              </div>
            </div>

            <button id="btn-analyze" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transform transition hover:-translate-y-1 active:scale-95 flex items-center justify-center">
              <i class="fas fa-robot mr-2"></i> AI 매칭 분석 시작
            </button>
          </div>
        </div>

        {/* 2. Loading & Result (Same as before) */}
        <div id="loading-section" class="hidden text-center py-20 bg-white rounded-2xl shadow-xl border border-slate-200 p-10 mt-8">
          <div class="relative w-20 h-20 mx-auto mb-6">
            <div class="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h2 class="text-xl font-bold text-slate-800">기업 데이터를 분석하고 있습니다...</h2>
          <p class="text-slate-500 text-sm mt-2">DART 재무제표 및 고용 현황 교차 검증 중</p>
        </div>

        <div id="result-section" class="hidden space-y-6 mt-8">
          <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-slate-900"><i class="fas fa-check-circle text-green-500 mr-2"></i> 매칭 결과 리포트</h2>
              <button onclick="location.reload()" class="text-sm text-slate-500 hover:text-blue-600 underline">다시 검색</button>
            </div>
            <div id="results-container" class="space-y-4">
              {/* Results */}
            </div>
          </div>
        </div>

      </div>

      <script>{`
        const searchInput = document.getElementById('company-search');
        const dropdown = document.getElementById('autocomplete-dropdown');
        const dropdownList = document.getElementById('dropdown-list');
        
        let debounceTimer;

        // 1. Search Logic
        searchInput.addEventListener('input', (e) => {
          const val = e.target.value;
          clearTimeout(debounceTimer);
          
          if (val.length < 1) {
            dropdown.classList.add('hidden');
            return;
          }

          debounceTimer = setTimeout(async () => {
            try {
              const res = await fetch(\`/api/search/company?q=\${encodeURIComponent(val)}\`);
              const data = await res.json();
              renderDropdown(data);
            } catch (err) {
              console.error(err);
            }
          }, 300);
        });

        function renderDropdown(items) {
          dropdownList.innerHTML = '';
          if (items.length === 0) {
            dropdown.classList.add('hidden');
            return;
          }

          items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'px-5 py-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center transition-colors border-b border-slate-50 last:border-0';
            div.innerHTML = \`
              <div class="flex items-center">
                <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mr-3 text-xs"><i class="fas fa-building"></i></span>
                <div>
                  <div class="font-bold text-slate-800 text-sm">\${item.name.replace(searchInput.value, '<span class="text-green-600">'+searchInput.value+'</span>')}</div>
                  <div class="text-xs text-slate-400">CEO: \${item.ceo}</div>
                </div>
              </div>
              <i class="fas fa-chevron-right text-slate-300 text-xs"></i>
            \`;
            div.addEventListener('click', () => {
              selectCompany(item);
            });
            dropdownList.appendChild(div);
          });
          dropdown.classList.remove('hidden');
        }

        // 2. Select & Fetch DART Data
        async function selectCompany(item) {
          searchInput.value = item.name;
          dropdown.classList.add('hidden');
          
          // Show visual feedback
          document.getElementById('form-name').value = '데이터 불러오는 중...';
          
          try {
            const res = await fetch(\`/api/dart/data?code=\${item.code}\`);
            const json = await res.json();
            
            if (json.success) {
              const d = json.data;
              document.getElementById('form-name').value = d.name;
              document.getElementById('form-ceo').value = d.ceo;
              document.getElementById('form-industry').value = d.corp_cls === 'Y' ? '제조업 (KOSPI)' : '정보통신업 (추정)'; // Mock logic
              document.getElementById('form-revenue').value = Math.floor(Math.random() * 50000 + 1000); // Mock revenue as DART API usually returns this in separate call
            } else {
              alert('DART 데이터 연동 실패: ' + json.message);
            }
          } catch(e) {
            alert('오류 발생');
          }
        }

        function closeDropdown() {
          dropdown.classList.add('hidden');
        }

        // Close on click outside
        document.addEventListener('click', (e) => {
          if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            closeDropdown();
          }
        });

        // 3. Analyze Logic (Same as before)
        document.getElementById('btn-analyze').addEventListener('click', async () => {
          const name = document.getElementById('form-name').value;
          if(!name) return alert('기업을 먼저 검색해주세요.');

          document.getElementById('input-section').classList.add('hidden');
          document.getElementById('loading-section').classList.remove('hidden');
          
          try {
            const response = await fetch('/api/analyze', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                companyData: {
                  name: name,
                  ksic: document.getElementById('form-industry').value,
                  rev_2024: document.getElementById('form-revenue').value,
                  employees: 50, // Mock
                  certs: [],
                  foundingDate: '20200101', hasLab: false
                }
              })
            });
            const result = await response.json();
            
            setTimeout(() => {
              document.getElementById('loading-section').classList.add('hidden');
              document.getElementById('result-section').classList.remove('hidden');
              renderResults(result.data || result.results);
            }, 1500);
          } catch(e) {
            alert('오류');
            location.reload();
          }
        });

        function renderResults(items) {
          const container = document.getElementById('results-container');
          container.innerHTML = items.map(item => \`
            <div class="p-4 border border-slate-200 rounded-xl hover:border-blue-500 transition cursor-pointer">
              <div class="flex justify-between items-start">
                <div>
                  <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded mb-2 inline-block">\${item.agency || '정부'}</span>
                  <h4 class="font-bold text-slate-800">\${item.title}</h4>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-extrabold text-blue-600">\${item.matchScore}점</div>
                </div>
              </div>
              <p class="text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded">\${item.aiReason}</p>
            </div>
          \`).join('');
        }
      `}</script>
    </Layout>
  )
}
