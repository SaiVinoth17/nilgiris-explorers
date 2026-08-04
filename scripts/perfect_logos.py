import cv2
import numpy as np
import os

img_path = r"C:\Users\user\.gemini\antigravity\brain\6001aa9b-589e-4bf0-bf67-8e93beb55880\media__1780858838584.jpg"
img = cv2.imread(img_path)

def extract_logo_perfect(x1_pct, y1_pct, x2_pct, y2_pct, filename):
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
    print(f"Saved {filename} with size {rgba.shape}")

# Deducted correct sizes to include Mountain + Nilgiris + Explorers ONLY

# Primary Logo:
# Original was 0.0 to 0.40
# Mountain ~0.08 to 0.20
# NILGIRIS ~0.20 to 0.24
# EXPLORERS ~0.24 to 0.27
extract_logo_perfect(0.10, 0.08, 0.35, 0.28, "primary-logo-v3.png")

# Horizontal Logo:
# Original was 0.33 to 0.60, 0.0 to 0.15
# Mountain + text ~0.00 to 0.115
extract_logo_perfect(0.34, 0.00, 0.60, 0.12, "horizontal-logo-v3.png")

# Compact Logo:
# Original was 0.33 to 0.60, 0.15 to 0.28
# Mountain + text ~0.15 to 0.25
extract_logo_perfect(0.34, 0.15, 0.60, 0.26, "compact-logo-v3.png")

print("Perfect crops completed!")
