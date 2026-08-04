import cv2
import numpy as np
import os

def crop_watermarks(filename, top_crop_pct, bottom_crop_pct, left_crop_pct=0, right_crop_pct=0):
    path = f"public/images/{filename}"
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"Could not read {path}")
        return
        
    h, w = img.shape[:2]
    
    y1 = int(h * top_crop_pct)
    y2 = int(h * (1 - bottom_crop_pct))
    x1 = int(w * left_crop_pct)
    x2 = int(w * (1 - right_crop_pct))
    
    cropped = img[y1:y2, x1:x2]
    
    # After cropping, we can also crop to the strict bounding box of non-transparent pixels
    # to remove any excess padding.
    if cropped.shape[2] == 4:
        coords = cv2.findNonZero((cropped[:, :, 3] > 0).astype(np.uint8))
        if coords is not None:
            bx, by, bw, bh = cv2.boundingRect(coords)
            pad = 5
            bx = max(0, bx - pad)
            by = max(0, by - pad)
            bw = min(cropped.shape[1] - bx, bw + 2*pad)
            bh = min(cropped.shape[0] - by, bh + 2*pad)
            cropped = cropped[by:by+bh, bx:bx+bw]
            
    cv2.imwrite(path, cropped)
    print(f"Cropped {filename}")

# Primary Logo: has "LOGO VARIANTS" at top, "PRIMARY LOGO" at bottom, and a scrollbar-like line on right
crop_watermarks("primary-logo.png", top_crop_pct=0.15, bottom_crop_pct=0.15, left_crop_pct=0.1, right_crop_pct=0.15)

# Horizontal Logo: text "HORIZONTAL LOGO" at bottom
crop_watermarks("horizontal-logo.png", top_crop_pct=0.05, bottom_crop_pct=0.20, left_crop_pct=0.05, right_crop_pct=0.05)

# Compact Logo: text "COMPACT LOGO" at bottom
crop_watermarks("compact-logo.png", top_crop_pct=0.05, bottom_crop_pct=0.20, left_crop_pct=0.05, right_crop_pct=0.05)

print("Done removing watermarks!")
