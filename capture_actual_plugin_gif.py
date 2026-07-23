import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 600, "height": 700})
        
        url = "file:///Users/gabi/Projetos_Automacoes/01-plugin-illustrator/index.html"
        await page.goto(url)
        await page.wait_for_selector(".panel-container")
        
        frames = []
        shots = [
            ("Instagram", "ig_reels"),
            ("Instagram", "ig_square"),
            ("Facebook", "fb_cover_profile"),
            ("YouTube", "yt_cover")
        ]
        
        for platform, fmt_id in shots:
            await page.select_option("#platformSelect", platform)
            await page.dispatch_event("#platformSelect", "change")
            await page.wait_for_timeout(100)
            
            await page.select_option("#formatSelect", fmt_id)
            await page.dispatch_event("#formatSelect", "change")
            await page.wait_for_timeout(300)
            
            element = await page.query_selector(".panel-container")
            shot_bytes = await element.screenshot()
            
            img_path = f"/tmp/shot_{fmt_id}.png"
            with open(img_path, "wb") as f:
                f.write(shot_bytes)
            
            frames.append(Image.open(img_path))
            
        await browser.close()
        
        gif_path = "/Users/gabi/Projetos_Automacoes/01-plugin-illustrator/demo.gif"
        frames[0].save(
            gif_path,
            save_all=True,
            append_images=frames[1:],
            duration=1500,
            loop=0
        )
        print("Updated exact demo.gif:", gif_path)

asyncio.run(main())
