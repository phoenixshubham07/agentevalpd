
import puppeteer from 'puppeteer';
import PptxGenJS from 'pptxgenjs';
import path from 'path';
import fs from 'fs';

// Configuration
const APP_URL = 'http://localhost:5173';
const OUTPUT_FILE = 'AgentEval_Presentation.pptx';
const VIEWPORT = { width: 1920, height: 1080 };

async function generatePPTX() {
    console.log('🚀 Starting PPTX Generation...');

    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: VIEWPORT
    });
    const page = await browser.newPage();

    try {
        console.log(`🌐 Navigating to ${APP_URL}...`);
        await page.goto(APP_URL, { waitUntil: 'networkidle0' });

        // Wait for initial render
        await new Promise(r => setTimeout(r, 2000));

        // Get Total Slides from the UI Counter
        const counterText = await page.$eval('.absolute.top-8.right-8', el => el.innerText);
        // Format is "01 / 15" -> split by / -> get last part -> parse int
        const totalSlides = parseInt(counterText.split('/')[1].trim(), 10);

        console.log(`📊 Detected ${totalSlides} slides.`);

        const pptx = new PptxGenJS();

        // Set 16:9 1080p Layout
        pptx.layout = 'LAYOUT_16x9';

        for (let i = 0; i < totalSlides; i++) {
            console.log(`📸 Capturing Slide ${i + 1}/${totalSlides}...`);

            // Ensure animations are done (wait a bit extra for safety)
            await new Promise(r => setTimeout(r, 1500));

            // 1. Capture Screenshot as Buffer
            const screenshotBuffer = await page.screenshot({
                encoding: 'base64',
                type: 'jpeg',
                quality: 90,
                fullPage: false
            });

            // 2. Add to PPTX
            const slide = pptx.addSlide();
            slide.addImage({
                data: `data:image/jpeg;base64,${screenshotBuffer}`,
                x: 0,
                y: 0,
                w: '100%',
                h: '100%'
            });

            // 3. Move to Next Slide
            if (i < totalSlides - 1) {
                await page.keyboard.press('ArrowRight');
            }
        }

        console.log('💾 Saving PPTX file...');
        await pptx.writeFile({ fileName: OUTPUT_FILE });
        console.log(`✅ Success! Presentation saved to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('❌ Error generating PPTX:', error);
    } finally {
        await browser.close();
    }
}

generatePPTX();
