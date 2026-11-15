from pathlib import Path
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageOps, ImageDraw
import io, json

root = Path(__file__).resolve().parents[1]
photos = {
 'kopi-susu': 'photo-1461023058943-07fcbe16d735',
 'latte': 'photo-1541167760496-1628856ab772',
 'americano': 'photo-1509042239860-f550ce710b93',
 'cappuccino': 'photo-1572442388796-11668a67e53d',
 'iced-coffee': 'photo-1517701604599-bb29b565090c',
 'matcha': 'photo-1515823064-d6e0c04616a7',
 'chocolate': 'photo-1517578239113-b03992dcdd25',
 'lemon-tea': 'photo-1556679343-c7306c1976bc',
 'rice-bowl': 'photo-1546069901-ba9599a7e63c',
 'pasta': 'photo-1473093295043-cdd812d0e601',
 'sandwich': 'photo-1528735602780-2552fd46c7af',
 'croissant': 'photo-1555507036-ab1f4038808a',
 'fries': 'https://upload.wikimedia.org/wikipedia/commons/8/83/French_Fries.JPG',
 'brownie': 'photo-1606313564200-e75d5e30476c',
 'cookie': 'photo-1499636136210-6f4ee915583e',
}
dest = root / 'public/images'
dest.mkdir(parents=True, exist_ok=True)
def download(pair):
 name, source = pair
 url = source if source.startswith('https:') else f'https://images.unsplash.com/{source}?auto=format&fit=crop&w=1000&q=85'
 path = dest / f'{name}.jpg'
 if not path.exists():
  with urlopen(Request(url, headers={'User-Agent': 'KoptumStudentProject/1.0 (local coursework)'}), timeout=40) as response:
   img = Image.open(io.BytesIO(response.read())).convert('RGB')
   img.thumbnail((1200,1200))
   img.save(path, quality=87, optimize=True)
 return {'file': f'public/images/{name}.jpg', 'source': url, 'provider': 'Wikimedia Commons — StockSnap, CC0' if source.startswith('https:') else 'Unsplash'}
with ThreadPoolExecutor(max_workers=5) as pool:
 results = list(pool.map(download, photos.items()))
(root / 'docs/image-sources.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
sheet = Image.new('RGB', (1000, 660), '#faf7f0')
draw = ImageDraw.Draw(sheet)
for i, item in enumerate(results):
 x, y = (i%5)*200, (i//5)*220
 sheet.paste(ImageOps.fit(Image.open(root/item['file']), (192,185)), (x,y))
 draw.text((x+5,y+190), Path(item['file']).stem, fill='black')
(root / 'test-results').mkdir(exist_ok=True)
sheet.save(root / 'test-results/photo-contact-sheet.jpg')
print(f'Downloaded and verified {len(results)} JPEG photographs.')
