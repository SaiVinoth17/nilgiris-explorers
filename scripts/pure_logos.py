import cv2
import numpy as np
import os

img_path = r"C:\Users\user\.gemini\antigravity\brain\6001aa9b-589e-4bf0-bf67-8e93beb55880\media__1780858838584.jpg"
img = cv2.imread(img_path)

def extract_logo(x1_pct, y1_pct, x2_pct, y2_pct, filename):
    h, w = img.shape[:2]
    
    y1 = int(h * y1_pct)
    y2 = int(h * y2_pct)
    x1 = int(w * x1_pct)
    x2 = int(w * x2_pct)
    
    cropped = img[y1:y2, x1:x2]
    
    # Make background transparent
    rgba = cv2.cvtColor(cropped, cv2.COLOR_BGR2BGRA)
    mask = np.all(cropped[:, :, :3] > 240, axis=2)
    rgba[mask, 3] = 0
    
    # Crop to exact bounding box of non-transparent pixels
    coords = cv2.findNonZero((rgba[:, :, 3] > 0).astype(np.uint8))
    if coords is not None:
        bx, by, bw, bh = cv2.boundingRect(coords)
        pad = 5
        bx = max(0, bx - pad)
        by = max(0, by - pad)
        bw = min(rgba.shape[1] - bx, bw + 2*pad)
        bh = min(rgba.shape[0] - by, bh + 2*pad)
        rgba = rgba[by:by+bh, bx:bx+bw]
        
    cv2.imwrite(f"public/images/{filename}", rgba)
    print(f"Saved {filename}")

# Based on the visual layout, we need to carefully stop the bottom Y crop BEFORE the tagline "EXPLORE BEYOND THE MIST"

# Primary Logo: x: 0 to 33%, y: 5% to 28% (stops before tagline)
extract_logo(0.05, 0.05, 0.30, 0.29, "primary-logo.png")

# Horizontal Logo: x: 34% to 60%, y: 0% to 11% (stops before tagline)
extract_logo(0.34, 0.0, 0.60, 0.11, "horizontal-logo.png")

# Compact Logo: x: 34% to 60%, y: 15% to 24% (stops before tagline)
extract_logo(0.34, 0.15, 0.60, 0.24, "compact-logo.png")

print("Done generating pure transparent logos without taglines!")
