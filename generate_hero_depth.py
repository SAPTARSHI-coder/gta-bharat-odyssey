import cv2
import numpy as np

img = cv2.imread("public/assets/hero_cover_art.jpg")
h, w, _ = img.shape
depth = np.zeros((h, w), dtype=np.float32)

# Sky top: far away (0.1)
horizon_y = int(h * 0.45)
for y in range(horizon_y):
    depth[y, :] = 0.05 + 0.10 * (y / horizon_y)
    
# Ground: slopes from 0.25 to 0.85
for y in range(horizon_y, h):
    ratio = (y - horizon_y) / (h - horizon_y)
    depth[y, :] = 0.25 + 0.60 * (ratio ** 1.3)

# Foreground figures (Los Santos male protagonist left, Indian female protagonist right, supercars)
boxes = [
    (0.35, 0.24, 0.96, 0.40, 1.0), # Left protagonist
    (0.40, 0.60, 0.96, 0.74, 1.0), # Right protagonist
    (0.55, 0.02, 0.96, 0.25, 0.95), # Orange sports car
    (0.45, 0.44, 0.85, 0.56, 0.80), # Central portal rings
]

for (ymin, xmin, ymax, xmax, val) in boxes:
    y1, y2 = int(ymin * h), int(ymax * h)
    x1, x2 = int(xmin * w), int(xmax * w)
    mask = np.zeros((h, w), dtype=np.float32)
    cv2.ellipse(mask, ((x1+x2)//2, (y1+y2)//2), ((x2-x1)//2, (y2-y1)//2), 0, 0, 360, 1.0, -1)
    mask = cv2.GaussianBlur(mask, (31, 31), 0)
    depth = depth * (1.0 - mask * 0.85) + val * (mask * 0.85)

depth = cv2.GaussianBlur(depth, (31, 31), 0)
out = np.clip(depth * 255.0, 0, 255).astype(np.uint8)
cv2.imwrite("public/assets/hero_cover_art_depth.jpg", out)
print("Generated hero_cover_art_depth.jpg")
