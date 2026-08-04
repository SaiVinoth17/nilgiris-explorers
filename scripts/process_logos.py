import cv2
import numpy as np
from PIL import Image
import os

def make_transparent(img_path, out_path, is_dark_bg=False):
    # Read the image with OpenCV
    img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"Failed to load {img_path}")
        return

    # Convert to RGBA
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    # Determine background color to remove
    if is_dark_bg:
        # Assuming the dark background is #0B1D17 roughly, but let's just use top-left pixel
        bg_color = img[0, 0, :3]
        # Create a mask for the background
        diff = np.abs(img[:, :, :3].astype(int) - bg_color.astype(int))
        mask = np.all(diff < 30, axis=2)
    else:
        # White background
        mask = np.all(img[:, :, :3] > 240, axis=2)

    # Make background transparent
    img[mask, 3] = 0

    # Find bounding box of non-transparent pixels
    coords = cv2.findNonZero((img[:, :, 3] > 0).astype(np.uint8))
    if coords is not None:
        x, y, w, h = cv2.boundingRect(coords)
        
        # Add a little padding
        pad = 10
        x = max(0, x - pad)
        y = max(0, y - pad)
        w = min(img.shape[1] - x, w + 2*pad)
        h = min(img.shape[0] - y, h + 2*pad)
        
        img_cropped = img[y:y+h, x:x+w]
        
        cv2.imwrite(out_path, img_cropped)
        print(f"Saved optimized logo to {out_path}")
    else:
        print(f"Could not find bounding box for {img_path}")

try:
    import cv2
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "opencv-python-headless", "numpy"])
    import cv2
    import numpy as np

base_dir = "public/images"
# brand_1.png has the Primary Logo on a white background. It also has text "PRIMARY LOGO" at the bottom.
# To avoid the text, we'll just crop the top 80% of the image first, then process.
img1 = cv2.imread(f"{base_dir}/brand_1.png")
if img1 is not None:
    h, w = img1.shape[:2]
    # Crop bottom 20% to remove "PRIMARY LOGO" text
    img1 = img1[0:int(h*0.85), 0:w]
    cv2.imwrite(f"{base_dir}/brand_1_cropped.png", img1)
    make_transparent(f"{base_dir}/brand_1_cropped.png", f"{base_dir}/logo-light.png")

# brand_2.png has Logo Variants. The Dark Logo is at the bottom.
# Let's crop the bottom third of the image for the dark logo.
img2 = cv2.imread(f"{base_dir}/brand_2.png")
if img2 is not None:
    h, w = img2.shape[:2]
    img_dark = img2[int(h*0.66):h, 0:w]
    cv2.imwrite(f"{base_dir}/brand_2_dark.png", img_dark)
    # The dark logo is on a dark background. Let's make it transparent.
    make_transparent(f"{base_dir}/brand_2_dark.png", f"{base_dir}/logo-dark.png", is_dark_bg=True)

# brand_3.png has Icon & Marks. App/Favicon is in the top right.
img3 = cv2.imread(f"{base_dir}/brand_3.png")
if img3 is not None:
    h, w = img3.shape[:2]
    # The top half has the icons. The rightmost one is the favicon.
    img_fav = img3[0:int(h*0.4), int(w*0.66):w]
    cv2.imwrite(f"{base_dir}/fav_temp.png", img_fav)
    # Don't make transparent, just crop the bounding box of non-white
    mask = np.all(img_fav[:, :, :3] > 240, axis=2)
    coords = cv2.findNonZero((~mask).astype(np.uint8))
    if coords is not None:
        x, y, w_box, h_box = cv2.boundingRect(coords)
        img_fav_cropped = img_fav[y:y+h_box, x:x+w_box]
        # Resize to 32x32 for favicon.ico
        img_fav_32 = cv2.resize(img_fav_cropped, (32, 32))
        cv2.imwrite("public/images/fav_temp2.png", img_fav_32)
        from PIL import Image
        img_pil = Image.open("public/images/fav_temp2.png")
        img_pil.save("app/favicon.ico")
        img_pil.save("public/favicon.ico")
        print("Saved favicon.ico")
