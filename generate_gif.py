from PIL import Image, ImageDraw, ImageFont
import os

W, H = 320, 420
BG = (26, 26, 26)
HEADER_BG = (18, 18, 18)
CARD_BG = (36, 36, 36)
CANVAS_BG = (18, 18, 18)
RED = (230, 28, 0)
BLUE = (162, 210, 235)
TEXT_COLOR = (245, 245, 245)
BORDER_COLOR = (51, 51, 51)

def draw_dashed_rect(draw, xy, color, dash=(4, 4)):
    x0, y0, x1, y1 = xy
    for x in range(int(x0), int(x1), dash[0]+dash[1]):
        draw.line([(x, y0), (min(x+dash[0], x1), y0)], fill=color, width=1)
        draw.line([(x, y1), (min(x+dash[0], x1), y1)], fill=color, width=1)
    for y in range(int(y0), int(y1), dash[0]+dash[1]):
        draw.line([(x0, y), (x0, min(y+dash[0], y1))], fill=color, width=1)
        draw.line([(x1, y), (x1, min(y+dash[0], y1))], fill=color, width=1)

frames = []
formats = [
    {"platform": "Instagram", "format": "Reels (9:16)", "cw": 50, "ch": 90, "safe": (4, 8, 42, 75), "noinfo": (28, 55, 42, 75)},
    {"platform": "Instagram", "format": "Feed Quadrado (1:1)", "cw": 75, "ch": 75, "crop": (8, 0, 67, 75)},
    {"platform": "Facebook", "format": "Capa de Perfil (820x360)", "cw": 95, "ch": 42, "safe": (10, 3, 85, 39)}
]

for fmt in formats:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    
    # Header
    draw.rectangle([0, 0, W, 40], fill=HEADER_BG)
    draw.rectangle([0, 39, W, 40], fill=BORDER_COLOR)
    draw.text((15, 12), "ESQUADЯO", fill=TEXT_COLOR)
    draw.rectangle([W-75, 12, W-15, 28], fill=RED)
    draw.text((W-70, 15), "LÁPIS RAЯO", fill=(255, 255, 255))
    
    # Inputs
    draw.rectangle([15, 55, W-15, 80], fill=(20, 20, 20), outline=BORDER_COLOR)
    draw.text((25, 61), f"PLATAFORMA: {fmt['platform']}", fill=TEXT_COLOR)
    
    draw.rectangle([15, 95, W-15, 120], fill=(20, 20, 20), outline=BORDER_COLOR)
    draw.text((25, 101), f"FORMATO: {fmt['format']}", fill=TEXT_COLOR)
    
    # Preview Card
    draw.rectangle([15, 135, W-15, 330], fill=CARD_BG, outline=BORDER_COLOR)
    
    # Canvas Stage
    cw, ch = fmt['cw'], fmt['ch']
    cx0, cy0 = (W - cw) // 2, 145 + (140 - ch) // 2
    cx1, cy1 = cx0 + cw, cy0 + ch
    
    draw.rectangle([cx0, cy0, cx1, cy1], fill=CANVAS_BG, outline=(255, 255, 255))
    
    if "safe" in fmt:
        sx0, sy0, sx1, sy1 = fmt["safe"]
        draw_dashed_rect(draw, [cx0+sx0, cy0+sy0, cx0+sx1, cy0+sy1], RED)
    if "noinfo" in fmt:
        nx0, ny0, nx1, ny1 = fmt["noinfo"]
        draw.rectangle([cx0+nx0, cy0+ny0, cx0+nx1, cy0+ny1], fill=(230, 28, 0, 50), outline=RED)
    if "crop" in fmt:
        lx0, ly0, lx1, ly1 = fmt["crop"]
        draw_dashed_rect(draw, [cx0+lx0, cy0+ly0, cx0+lx1, cy0+ly1], BLUE)
        
    # Button
    draw.rectangle([15, 350, W-15, 390], fill=RED)
    draw.text((100, 363), "CRIAR PRANCHETA", fill=(255, 255, 255))
    
    frames.append(img)

gif_path = "/Users/gabi/Projetos_Automacoes/01-plugin-illustrator/demo.gif"
frames[0].save(gif_path, save_all=True, append_images=frames[1:], duration=1200, loop=0)
print("Saved GIF:", gif_path)
