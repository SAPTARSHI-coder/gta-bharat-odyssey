import cv2
import numpy as np

img = cv2.imread("public/assets/journey_poster_default.jpg")
h, w, _ = img.shape
depth = np.zeros((h, w), dtype=np.float32)

# Central protagonist is in foreground
y1, y2 = int(0.36 * h), int(0.92 * h)
x1, x2 = int(0.38 * w), int(0.62 * w)
mask = np.zeros((h, w), dtype=np.float32)
cv2.ellipse(mask, ((x1+x2)//2, (y1+y2)//2), ((x2-x1)//2, (y2-y1)//2), 0, 0, 360, 1.0, -1)
mask = cv2.GaussianBlur(mask, (31, 31), 0)

# Ground balcony where character stands
depth[int(0.80*h):, :] = 0.70
depth = depth * (1.0 - mask * 0.9) + 1.0 * (mask * 0.9)
depth = cv2.GaussianBlur(depth, (31, 31), 0)

out = np.clip(depth * 255.0, 0, 255).astype(np.uint8)
cv2.imwrite("public/assets/journey_poster_default_depth.jpg", out)
print("Generated journey_poster_default_depth.jpg")
