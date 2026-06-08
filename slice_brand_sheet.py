import cv2
import numpy as np
from PIL import Image

img_path = r"C:\Users\user\.gemini\antigravity\brain\6001aa9b-589e-4bf0-bf67-8e93beb55880\media__1780858838584.jpg"
img = cv2.imread(img_path)

if img is None:
    print("Failed to load image")
    exit()

def crop_and_save(x1, y1, x2, y2, filename, make_trans=False):
    h, w = img.shape[:2]
    # Convert percentages/ratios to pixels if they are < 1
    if x1 < 1: x1 = int(x1 * w)
    if x2 <= 1: x2 = int(x2 * w)
    if y1 < 1: y1 = int(y1 * h)
    if y2 <= 1: y2 = int(y2 * h)
    
    cropped = img[y1:y2, x1:x2]
    
    if make_trans:
        # Simple threshold for white background
        rgba = cv2.cvtColor(cropped, cv2.COLOR_BGR2BGRA)
        mask = np.all(cropped[:, :, :3] > 240, axis=2)
        rgba[mask, 3] = 0
        
        # crop to bounding box
        coords = cv2.findNonZero((~mask).astype(np.uint8))
        if coords is not None:
            bx, by, bw, bh = cv2.boundingRect(coords)
            pad = 5
            bx = max(0, bx - pad)
            by = max(0, by - pad)
            bw = min(rgba.shape[1] - bx, bw + 2*pad)
            bh = min(rgba.shape[0] - by, bh + 2*pad)
            rgba = rgba[by:by+bh, bx:bx+bw]
            
        cv2.imwrite(f"public/images/{filename}", rgba)
    else:
        cv2.imwrite(f"public/images/{filename}", cropped)
    print(f"Saved {filename}")

# Based on typical layout
# Primary Logo (Vertical) - Top left
crop_and_save(0.0, 0.0, 0.33, 0.40, "primary-logo.png", True)

# Horizontal Logo
crop_and_save(0.33, 0.0, 0.60, 0.15, "horizontal-logo.png", True)

# Compact Logo
crop_and_save(0.33, 0.15, 0.60, 0.28, "compact-logo.png", True)

# Dark Logo (make black background transparent)
dark = img[int(0.28*682):int(0.40*682), int(0.33*1024):int(0.60*1024)]
rgba_dark = cv2.cvtColor(dark, cv2.COLOR_BGR2BGRA)
mask_dark = np.all(dark[:, :, :3] < 30, axis=2)
rgba_dark[mask_dark, 3] = 0
cv2.imwrite("public/images/dark-logo.png", rgba_dark)
print("Saved dark-logo.png")

# Circle Icon
crop_and_save(0.75, 0.05, 0.88, 0.22, "circle-icon.png", True)

# App Icon
crop_and_save(0.88, 0.05, 1.0, 0.22, "app-icon.png", False)

# OG Image (Bottom right)
crop_and_save(0.61, 0.63, 0.79, 0.80, "og-image.jpg", False)

print("Done slicing!")
