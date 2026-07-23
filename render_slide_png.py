import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1340, "height": 780})
        await page.goto("file:///Users/gabi/Projetos_Automacoes/01-plugin-illustrator/slide_esquadro.html")
        await page.wait_for_selector(".slide-canvas")
        element = await page.query_selector(".slide-canvas")
        await element.screenshot(path="/Users/gabi/Projetos_Automacoes/01-plugin-illustrator/slide_esquadro.png")
        await browser.close()
        print("Slide PNG generated.")

asyncio.run(main())
