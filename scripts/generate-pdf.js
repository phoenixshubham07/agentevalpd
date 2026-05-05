import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  console.log('Generating Syntrox.ai Pitch Deck PDF...');
  
  // Launch headless browser
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  console.log('Browser launched.');
  
  const page = await browser.newPage();
  console.log('Page created.');

  // Set the viewport exactly to 1080p to let the layout engine calculate perfectly
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2, // High DPI for crisp vector output
  });

  // Navigate to the slides route with the print flag enabled to bypass the slider logic
  const targetUrl = 'http://localhost:5173/deck?print=true';
  console.log(`Navigating to ${targetUrl}...`);
  
  try {
    const response = await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 60000 });
    console.log(`Navigated successfully with status: ${response.status()}`);
    
    // Explicitly emulate print media to trigger @media print rules
    await page.emulateMediaType('print');
    console.log('Emulated print media type.');
  } catch (e) {
    console.error('Error navigating. Is the dev server (npm run dev) running?');
    console.error(e);
    await browser.close();
    process.exit(1);
  }

  // Inject a longer wait (5 seconds) to be absolutely certain any Framer Motion 
  // initial animations settle and lazy components hydrate
  console.log('Waiting for components to settle (5s)...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Determine output path
  const outputPath = path.join(__dirname, '..', 'Syntrox_PitchDeck.pdf');

  console.log('Rendering pages into PDF with active hyperlinks...');
  await page.pdf({
    path: outputPath,
    printBackground: true, // MUST be true or backgrounds/gradients vanish
    landscape: true,
    width: '1920px',
    height: '1080px',
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });

  console.log(`Success! PDF saved to: ${outputPath}`);
  
  await browser.close();
}

generatePDF().catch(console.error);
