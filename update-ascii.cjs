const fs = require('fs');
const htmlPath = '/Users/phoenixechoes/Documents/AgentEval/public/ascii-art.html';
const asciiPath = '/Users/phoenixechoes/Documents/AgentEval/asciiart';

let html = fs.readFileSync(htmlPath, 'utf8');
const asciiContent = fs.readFileSync(asciiPath, 'utf8').trim();

// The regex will find the exact placeholder and replace it.
const placeholderRegex = /<!-- PASTE THE REST OF YOUR VIDEO AND SCRIPT TAGS HERE -->[\s\S]*?(?=<\/body>)/;

const replacement = `
    ${asciiContent}
    <script>
        const video = document.getElementById('source-video-1773608572237');
        const canvas = document.getElementById('ascii-canvas-1773608572237');
        
        // Safety check if IDs exist
        if (video && canvas) {
            const ctx = canvas.getContext('2d');
            
            const chars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];
            
            // Define ASCII resolution
            let w = 120;
            let h = 60;
            
            video.addEventListener('loadedmetadata', () => {
                h = Math.floor((video.videoHeight / video.videoWidth) * w * 0.45); // Adjust for character aspect ratio
                canvas.width = w * 8;
                canvas.height = h * 12;
                video.play().catch(e => console.log("Autoplay prevented:", e));
                requestAnimationFrame(draw);
            });
            
            // Attempt to play immediately if already loaded
            if (video.readyState >= 1) {
                h = Math.floor((video.videoHeight / video.videoWidth) * w * 0.45);
                canvas.width = w * 8;
                canvas.height = h * 12;
                video.play().catch(e => console.log("Autoplay prevented:", e));
                requestAnimationFrame(draw);
            }
            
            function draw() {
                if (video.paused || video.ended) {
                    requestAnimationFrame(draw);
                    return;
                }
                
                const offscreen = document.createElement('canvas');
                offscreen.width = w;
                offscreen.height = h;
                const octx = offscreen.getContext('2d');
                octx.drawImage(video, 0, 0, w, h);
                
                const pixels = octx.getImageData(0, 0, w, h).data;
                
                ctx.fillStyle = '#020617'; // Match slate-950 background
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Let's use a nice amber-rose-blue gradient mimicking the brand
                ctx.fillStyle = '#3b82f6'; // default blue
                ctx.font = '12px monospace';
                ctx.textBaseline = 'top';
                
                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        const idx = (y * w + x) * 4;
                        const r = pixels[idx];
                        const g = pixels[idx+1];
                        const b = pixels[idx+2];
                        // Calculate brightness (0 to 1)
                        const brightness = (r + g + b) / (3 * 255);
                        // Map brightness to character
                        const charIdx = Math.floor((1 - brightness) * (chars.length - 1));
                        
                        // Optional colorization based on x/y
                        if (x < w/3) ctx.fillStyle = '#f59e0b'; // amber
                        else if (x < 2*w/3) ctx.fillStyle = '#ef4444'; // rose
                        else ctx.fillStyle = '#3b82f6'; // blue
                        
                        ctx.fillText(chars[charIdx], x * 8, y * 12);
                    }
                }
                requestAnimationFrame(draw);
            }
        }
    </script>
    </span>
    </span>
`;

html = html.replace(placeholderRegex, replacement);
fs.writeFileSync(htmlPath, html);
console.log('Done replacing.');
