/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');

const images = [
    { src: 'C:\\Users\\OmarA\\.gemini\\antigravity\\brain\\f0b4a9ba-5fb0-422b-9f78-edb56093351e\\hero_bg_1776088882743.png', dest: 'e:\\netcore\\demos\\hospital\\public\\images\\hero-bg.webp' },
    { src: 'C:\\Users\\OmarA\\.gemini\\antigravity\\brain\\f0b4a9ba-5fb0-422b-9f78-edb56093351e\\doctor_patient_1776088896169.png', dest: 'e:\\netcore\\demos\\hospital\\public\\images\\doctor-patient.webp' },
    { src: 'C:\\Users\\OmarA\\.gemini\\antigravity\\brain\\f0b4a9ba-5fb0-422b-9f78-edb56093351e\\cta_bg_1776088980595.png', dest: 'e:\\netcore\\demos\\hospital\\public\\images\\cta-bg.webp' },
    { src: 'C:\\Users\\OmarA\\.gemini\\antigravity\\brain\\f0b4a9ba-5fb0-422b-9f78-edb56093351e\\heart_health_1776089013531.png', dest: 'e:\\netcore\\demos\\hospital\\public\\images\\news\\heart-health.webp' },
    { src: 'C:\\Users\\OmarA\\.gemini\\antigravity\\brain\\f0b4a9ba-5fb0-422b-9f78-edb56093351e\\diabetes_1776089049619.png', dest: 'e:\\netcore\\demos\\hospital\\public\\images\\news\\diabetes.webp' },
    { src: 'C:\\Users\\OmarA\\.gemini\\antigravity\\brain\\f0b4a9ba-5fb0-422b-9f78-edb56093351e\\dr_lina_husseini_1776089120743.png', dest: 'e:\\netcore\\demos\\hospital\\public\\images\\doctors\\dr-lina-husseini.webp' },
    { src: 'C:\\Users\\OmarA\\.gemini\\antigravity\\brain\\f0b4a9ba-5fb0-422b-9f78-edb56093351e\\dr_khaled_abuzeid_1776089138856.png', dest: 'e:\\netcore\\demos\\hospital\\public\\images\\doctors\\dr-khaled-abu-zeid.webp' }
];

async function convert() {
    for (const img of images) {
        try {
            await sharp(img.src)
                .webp({ quality: 80 })
                .toFile(img.dest);
            console.log(`Converted: ${img.dest}`);
        } catch (err) {
            console.error(`Error converting ${img.src}:`, err);
        }
    }
}

convert();
