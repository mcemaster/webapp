import requests, time, zipfile, io, xml.etree.ElementTree as ET

KEY = "33ec337705ab9c8dc5edf6002e6d246e70871fbe"
URL = "https://b79ea20f.webapp-913.pages.dev/api/admin/companies/import-detail"

print("=" * 60)
print("DART 전체 기업정보 수집기 (풀버전)")
print("=" * 60)

print("\n1. 기업코드 다운로드 중...")
res = requests.get(f"https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key={KEY}")
with zipfile.ZipFile(io.BytesIO(res.content)) as z:
    root = ET.fromstring(z.read("CORPCODE.xml"))

corps = []
for c in root.findall(".//list"):
    corps.append({
        "corp_code": c.findtext("corp_code"),
        "corp_name": c.findtext("corp_name"),
        "stock_code": c.findtext("stock_code") or ""
    })

print(f"   {len(corps):,}개 기업 발견!\n")

def get_financial(corp_code):
    try:
        for year in [2024, 2023, 2022]:
            url = f"https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?crtfc_key={KEY}&corp_code={corp_code}&bsns_year={year}&reprt_code=11011"
            r = requests.get(url, timeout=10).json()
            if r.get("status") == "000" and r.get("list"):
                data = {}
                for item in r["list"]:
                    name = item.get("account_nm", "")
                    val = item.get("thstrm_amount", "").replace(",", "")
                    if "자산총계" in name: data["total_assets"] = val
                    elif "부채총계" in name: data["total_liabilities"] = val
                    elif "자본총계" in name: data["total_equity"] = val
                    elif "매출액" in name or "수익(매출액)" in name: data["revenue"] = val
                    elif "영업이익" in name: data["operating_profit"] = val
                    elif "당기순이익" in name: data["net_income"] = val
                if data:
                    data["year"] = year
                    return data
    except:
        pass
    return {}

def get_executives(corp_code):
    try:
        url = f"https://opendart.fss.or.kr/api/exctvSttus.json?crtfc_key={KEY}&corp_code={corp_code}&bsns_year=2024&reprt_code=11011"
        r = requests.get(url, timeout=10).json()
        if r.get("status") == "000" and r.get("list"):
            return [{"name": e.get("nm"), "position": e.get("ofcps"), "role": e.get("chrg_job")} for e in r["list"][:10]]
    except:
        pass
    return []

def get_shareholders(corp_code):
    try:
        url = f"https://opendart.fss.or.kr/api/hyslrSttus.json?crtfc_key={KEY}&corp_code={corp_code}&bsns_year=2024&reprt_code=11011"
        r = requests.get(url, timeout=10).json()
        if r.get("status") == "000" and r.get("list"):
            return [{"name": s.get("nm"), "shares": s.get("trmend_posesn_stock_co"), "ratio": s.get("trmend_posesn_stock_qota_rt")} for s in r["list"][:5]]
    except:
        pass
    return []

def get_employees(corp_code):
    try:
        url = f"https://opendart.fss.or.kr/api/empSttus.json?crtfc_key={KEY}&corp_code={corp_code}&bsns_year=2024&reprt_code=11011"
        r = requests.get(url, timeout=10).json()
        if r.get("status") == "000" and r.get("list"):
            total = sum(int(e.get("sm_dc_mxmm_nmpr_co", "0").replace(",", "") or 0) for e in r["list"])
            avg_salary = r["list"][0].get("jan_salary_am", "") if r["list"] else ""
            return {"employee_count": total, "avg_salary": avg_salary}
    except:
        pass
    return {}

print("2. 상세정보 수집 시작...\n")

batch = []
total = 0
errors = 0

for i, c in enumerate(corps):
    try:
        d = requests.get(f"https://opendart.fss.or.kr/api/company.json?crtfc_key={KEY}&corp_code={c['corp_code']}", timeout=10).json()
        
        if d.get("status") != "000":
            continue
        
        company = {
            "corp_code": c["corp_code"],
            "stock_code": c["stock_code"],
            "corp_name": d.get("corp_name"),
            "corp_name_eng": d.get("corp_name_eng"),
            "ceo_nm": d.get("ceo_nm"),
            "corp_cls": d.get("corp_cls"),
            "bizr_no": d.get("bizr_no"),
            "adres": d.get("adres"),
            "hm_url": d.get("hm_url"),
            "ir_url": d.get("ir_url"),
            "phn_no": d.get("phn_no"),
            "fax_no": d.get("fax_no"),
            "induty_code": d.get("induty_code"),
            "est_dt": d.get("est_dt"),
            "acc_mt": d.get("acc_mt"),
        }
        
        fin = get_financial(c["corp_code"])
        if fin:
            company["financial"] = fin
            
        execs = get_executives(c["corp_code"])
        if execs:
            company["executives"] = execs
            
        shareholders = get_shareholders(c["corp_code"])
        if shareholders:
            company["shareholders"] = shareholders
            
        emp = get_employees(c["corp_code"])
        if emp:
            company["employees"] = emp
        
        fin_str = f"매출:{fin.get('revenue','?')}" if fin else "재무:-"
        emp_str = f"직원:{emp.get('employee_count','?')}" if emp else "직원:-"
        
        print(f"[{i+1:,}/{len(corps):,}] {d.get('corp_name')} | 대표:{d.get('ceo_nm','-')} | {fin_str} | {emp_str}")
        
        batch.append(company)
        
        if len(batch) >= 30:
            print(f"\n>>> {len(batch)}개 업로드 중...")
            try:
                r = requests.post(URL, json={"companies": batch}, timeout=30)
                print(f">>> 결과: {r.json().get('message', 'ok')}\n")
            except Exception as e:
                print(f">>> 업로드 오류: {e}\n")
            total += len(batch)
            batch = []
        
        time.sleep(0.3)
        
    except Exception as e:
        errors += 1
        continue

if batch:
    print(f"\n>>> 마지막 {len(batch)}개 업로드 중...")
    try:
        r = requests.post(URL, json={"companies": batch}, timeout=30)
        print(f">>> 결과: {r.json().get('message', 'ok')}")
    except:
        pass
    total += len(batch)

print("\n" + "=" * 60)
print(f"완료! 총 {total:,}개 기업 정보 업로드됨")
print(f"오류: {errors:,}개")
print("=" * 60)
