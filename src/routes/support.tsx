import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { SupportMatching } from '../pages/SupportMatching'

type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
}

const support = new Hono<{ Bindings: Bindings }>()

// 1. UI Route (Input Page)
support.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<SupportMatching user={user} />)
})

// 2. API: Advanced AI Analysis (Top 20 Matching)
support.post('/analyze', async (c) => {
  try {
    const { companyData } = await c.req.json();
    const apiKey = c.env.OPENAI_API_KEY;

    // --- Mock Data Generator (For Stability & Speed) ---
    // 실제로는 DB나 OpenAI를 쓰지만, 20개의 상세 데이터를 보여주기 위해 정교한 모의 데이터를 생성합니다.
    
    const categories = ['R&D', '사업화', '수출/글로벌', '인력/고용', 'ESG/기타'];
    const agencies = ['중소벤처기업부', '과학기술정보통신부', '산업통상자원부', 'KOTRA', '창업진흥원', '기술보증기금'];
    
    const results = Array.from({ length: 20 }).map((_, i) => {
      const category = categories[i % categories.length];
      const agency = agencies[i % agencies.length];
      const score = 98 - (i * 2) + Math.floor(Math.random() * 3); // 98점부터 내림차순
      
      let title = '';
      let reason = '';

      if (category === 'R&D') {
        title = `2026년 ${companyData.ksic} 분야 핵심기술개발사업 (${i+1}차)`;
        reason = `귀사는 <strong>기업부설연구소</strong>를 보유하고 있으며, <strong>${companyData.ksic}</strong> 관련 특허 출원 가능성이 높습니다. 특히 매출액 대비 R&D 투자 비율을 강조하면 선정 확률이 매우 높습니다.`;
      } else if (category === '사업화') {
        title = `중소기업 혁신바우처 사업 (제조혁신)`;
        reason = `현재 매출액 <strong>${companyData.rev_2024}백만원</strong> 구간에서 가장 필요한 마케팅 및 시제품 제작을 지원합니다. 기존 제품의 고도화 전략으로 접근 시 가점을 받을 수 있습니다.`;
      } else if (category === '수출/글로벌') {
        title = `글로벌 강소기업 1000+ 프로젝트`;
        reason = `해외 시장 진출 의지가 확인되며, 수출바우처와 연계하여 <strong>해외 규격 인증</strong> 획득 비용을 지원받을 수 있는 최적의 사업입니다.`;
      } else if (category === '인력/고용') {
        title = `청년 일자리 도약 장려금`;
        reason = `최근 고용 인원 중 <strong>청년 채용</strong> 비중을 늘릴 계획이 있다면, 1인당 최대 1,200만원의 인건비를 절감할 수 있어 재무 구조 개선에 기여합니다.`;
      } else {
        title = `스마트공장 보급확산 사업 (고도화)`;
        reason = `제조 데이터 수집 및 분석 시스템(MES) 도입을 통해 생산성을 30% 이상 향상시킬 수 있으며, 귀사의 <strong>스마트팩토리 수준 확인</strong> 점수가 양호할 것으로 예상됩니다.`;
      }

      return {
        id: i + 1,
        rank: i + 1,
        title: title,
        agency: agency,
        category: category,
        matchScore: score,
        amount: Math.floor(Math.random() * 500) * 100 + 5000 + '만원', // 5000 ~ 55000만원
        deadline: `2026-0${(i % 5) + 3}-1${i % 9}`,
        aiReason: reason
      };
    });

    return c.json({ success: true, data: results });

  } catch (e: any) {
    return c.json({ success: false, error: e.message });
  }
})

export default support