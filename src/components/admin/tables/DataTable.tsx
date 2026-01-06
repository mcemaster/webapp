import { html } from 'hono/html'

export const DataTable = (props: { title: string, id: string, headers: string[] }) => html`
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-fade-in-up">
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-bold text-lg text-slate-900">${props.title}</h3>
      <div class="flex space-x-2">
        <input type="text" placeholder="검색..." class="text-xs border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition" />
        <button class="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-700 transition">검색</button>
      </div>
    </div>
    <div class="overflow-x-auto rounded-xl border border-slate-100">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
          <tr>
            ${props.headers.map(h => html`<th class="px-6 py-4 font-bold">${h}</th>`)}
          </tr>
        </thead>
        <tbody id="${props.id}" class="divide-y divide-slate-100">
          <tr><td colspan="${props.headers.length}" class="p-8 text-center text-slate-400">데이터를 불러오는 중입니다...</td></tr>
        </tbody>
      </table>
    </div>
  </div>
`