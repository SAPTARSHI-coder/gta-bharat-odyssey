import cv2
import numpy as np
import os

scenes = [
    {
        "name": "los_santos_beach",
        "file": "public/assets/los_santos_beach.jpg",
        "horizon": 0.42,
        # Protagonist bounding box roughly (ymin, xmin, ymax, xmax) normalized
        "fg_boxes": [
            (0.32, 0.56, 0.95, 0.68, 1.0),   # Protagonist
            (0.52, 0.64, 0.98, 1.00, 0.95),  # Red Sports Car & road edge
            (0.38, 0.00, 0.90, 0.15, 0.85),  # Palm tree near left
        ]
    },
    {
        "name": "portal_scene",
        "file": "public/assets/portal_scene.jpg",
        "horizon": 0.50,
        "fg_boxes": [
            (0.32, 0.33, 0.95, 0.48, 1.0),   # Protagonist
            (0.60, 0.05, 0.90, 0.30, 0.85),  # Left alley dumpsters
            (0.60, 0.70, 0.90, 0.95, 0.85),  # Right alley structures
        ]
    },
    {
        "name": "mumbai_taj_scene",
        "file": "public/assets/mumbai_taj_scene.jpg",
        "horizon": 0.48,
        "fg_boxes": [
            (0.28, 0.30, 0.96, 0.46, 1.0),   # Protagonist
            (0.58, 0.00, 1.00, 1.00, 0.90),  # Stone balustrade & promenade
            (0.42, 0.85, 0.62, 0.95, 0.65),  # Double decker bus
        ]
    },
    {
        "name": "delhi_india_gate",
        "file": "public/assets/delhi_india_gate.jpg",
        "horizon": 0.48,
        "fg_boxes": [
            (0.33, 0.33, 0.97, 0.47, 1.0),   # Protagonist
            (0.50, 0.08, 0.76, 0.32, 0.85),  # Ambassador car left
            (0.50, 0.60, 0.78, 0.95, 0.85),  # Auto-rickshaws right
        ]
    },
    {
        "name": "kolkata_victoria_memorial",
        "file": "public/assets/kolkata_victoria_memorial.jpg",
        "horizon": 0.45,
        "fg_boxes": [
            (0.30, 0.25, 0.96, 0.39, 1.0),   # Protagonist
            (0.68, 0.00, 1.00, 0.50, 0.92),  # Stone terrace lookout
            (0.60, 0.60, 0.85, 0.98, 0.82),  # Yellow taxis on road
        ]
    }
]

for s in scenes:
    img_path = s["file"]
    if not os.path.exists(img_path):
        print(f"Skipping {img_path} (not found)")
        continue
    img = cv2.imread(img_path)
    h, w, _ = img.shape
    
    # 1. Base depth from ground perspective
    depth = np.zeros((h, w), dtype=np.float32)
    horizon_y = int(h * s["horizon"])
    
    # Sky region (above horizon): far away
    depth[:horizon_y, :] = 0.12
    # Slight gradient in sky
    for y in range(horizon_y):
        depth[y, :] = 0.05 + 0.10 * (y / horizon_y)
        
    # Ground/water region (below horizon): slopes from midground (0.3) to near foreground (0.85)
    for y in range(horizon_y, h):
        ratio = (y - horizon_y) / (h - horizon_y)
        depth[y, :] = 0.25 + 0.60 * (ratio ** 1.3)
        
    # 2. Add foreground objects using saliency/edges and bounding boxes
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    for (ymin, xmin, ymax, xmax, target_val) in s["fg_boxes"]:
        y1, y2 = int(ymin * h), int(ymax * h)
        x1, x2 = int(xmin * w), int(xmax * w)
        
        # Create an elliptical / rounded mask for the object
        mask = np.zeros((h, w), dtype=np.float32)
        cv2.ellipse(
            mask,
            ((x1 + x2) // 2, (y1 + y2) // 2),
            ((x2 - x1) // 2, (y2 - y1) // 2),
            0, 0, 360, 1.0, -1
        )
        
        # Soften edges
        blur_k = max(21, (x2 - x1) // 5 | 1)
        mask = cv2.GaussianBlur(mask, (blur_k, blur_k), 0)
        
        # Blend target value into depth
        depth = depth * (1.0 - mask * 0.85) + (target_val) * (mask * 0.85)
        
    # 3. Overall gentle blur to prevent harsh depth tearing
    depth = cv2.GaussianBlur(depth, (31, 31), 0)
    
    # 4. Normalize and save as 8-bit image
    depth_uint8 = np.clip(depth * 255.0, 0, 255).astype(np.uint8)
    out_name = f"public/assets/{s['name']}_depth.jpg"
    cv2.imwrite(out_name, depth_uint8)
    print(f"Generated depth map: {out_name} ({w}x{h})")
