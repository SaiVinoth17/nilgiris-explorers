import urllib.request
import json
import os

def fetch_wiki_image(query, filename):
    url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={query}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            for page_id in pages:
                if 'original' in pages[page_id]:
                    img_url = pages[page_id]['original']['source']
                    print(f"Downloading {img_url} to {filename}")
                    urllib.request.urlretrieve(img_url, f"public/images/{filename}")
                    return True
    except Exception as e:
        print(f"Failed to fetch {query}: {e}")
    return False

fetch_wiki_image("Ooty", "real_ooty_1.jpg")
fetch_wiki_image("Nilgiri_Mountain_Railway", "real_train.jpg")
fetch_wiki_image("Doddabetta", "real_doddabetta.jpg")
fetch_wiki_image("Pykara", "real_pykara.jpg")
fetch_wiki_image("Botanical_Garden,_Ooty", "real_botanical.jpg")
fetch_wiki_image("Coonoor", "real_coonoor.jpg")
