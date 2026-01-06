import requests
import time
import zipfile
import io
import xml.etree.ElementTree as ET

KEY = "33ec337705ab9c8dc5edf6002e6d246e70871fbe"
URL = "https://webapp-913.pages.dev/api/admin/companies/import-detail"

print("=" * 50)
print("  DART 기업정보 수집기")
print("=" * 50)

print("\n1. 기업코드 다운로드 중...")
res = requests.get(f"https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key={KEY}")
with zipfile.ZipFile(io.BytesIO(res.content)) as z:
    root = ET.fromstring(z.read('CORPCODE.xml'))

corps = []
for c in root.findall('.//list'):
    if c.findtext('stock_code'):
        corps.append({
            'corp_code': c.findtext('corp_code'),
            'name': c.findtext('corp_name'),
            'stock_code': c.findtext('stock_code')
        })

print(f"   {len(corps)}개 상장사 발견!")

print("\n2. 상세정보 수집 시작...")
batch = []
total = 0

for i, c in enumerate(corps):
    try:
        d = requests.get(f"https://opendart.fss.or.kr/api/company.json?crtfc_key={KEY}&corp_code={c['corp_code']}", timeout=10).json()
        if d.get('status') != '000':
            continue
        
        print(f"[{i+1}/{len(corps)}] {d.get('corp_name')} - {d.get('ceo_nm', '-')}")
        
        batch.append({
            'stock_code': c['stock_code'],
            'corp_code': c['corp_code'],
            'corp_name': d.get('corp_name'),
            'ceo_nm': d.get('ceo_nm'),
            'bizr_no': d.get('bizr_no'),
            'adres': d.get('adres'),
            'induty_code': d.get('induty_code'),
            'est_dt': d.get('est_dt'),
            'hm_url': d.get('hm_url'),
            'phn_no': d.get('phn_no')
        })
        
        if len(batch) >= 50:
            print("   >>> 50개 업로드 중...")
            r = requests.post(URL, json={'companies': batch})
            print(f"   >>> {r.json().get('message', 'OK')}")
            total += len(batch)
            batch = []
        
        time.sleep(0.2)
    except Exception as e:
        pass

if batch:
    print("   >>> 마지막 업로드...")
    r = requests.post(URL, json={'companies': batch})
    print(f"   >>> {r.json().get('message', 'OK')}")
    total += len(batch)

print("\n" + "=" * 50)
print(f"  완료! 총 {total}개 기업 정보 업로드됨")
print("=" * 50)
