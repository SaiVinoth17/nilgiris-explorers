import urllib.request
import json
import os
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

def get_wiki_image(search_query, save_path):
    # Fetch image from Wikipedia API
    url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={urllib.parse.quote(search_query)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            page = list(pages.values())[0]
            if 'original' in page:
                image_url = page['original']['source']
                
                # Download the image
                print(f"Downloading {image_url} for {search_query}...")
                req_img = urllib.request.Request(image_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req_img) as response_img, open(save_path, 'wb') as out_file:
                    out_file.write(response_img.read())
                print(f"Saved to {save_path}")
                return True
    except Exception as e:
        print(f"Failed for {search_query}: {e}")
    return False

images_to_fetch = [
    ("Ooty", "public/images/tour_ooty.jpg"),
    ("Nilgiri Mountain Railway", "public/images/tour_train.jpg"),
    ("Rose Garden, Ooty", "public/images/tour_rose_garden.jpg"),
    ("Doddabetta", "public/images/tour_doddabetta_view.jpg"),
    ("Stone House, Ooty", "public/images/tour_stone_house.jpg"),
    ("Avalanche Lake, Ooty", "public/images/tour_adventure.jpg"),
    ("Government Botanical Gardens, Udhagamandalam", "public/images/tour_botanical.jpg")
]

for query, path in images_to_fetch:
    if not os.path.exists(path):
        get_wiki_image(query, path)
