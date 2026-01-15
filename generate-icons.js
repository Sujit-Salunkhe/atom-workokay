const fs = require('fs');
const path = require('path');

const iconsFile = fs.readFileSync('./BrokerModelIcons.tsx', 'utf8');
const iconsDir = './src/assets/icons';
fs.mkdirSync(iconsDir, { recursive: true });

console.log('🔍 Cleaning ALL icons...');

// Split by "export const" and process each icon
const parts = iconsFile.split('export const ');
let count = 0;

for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  
  // Get icon name
  const nameMatch = part.match(/(\w+Icon)/);
  if (!nameMatch) continue;
  
  const iconName = nameMatch[1];
  
  // Extract SVG content between <svg> tags
  const svgMatch = part.match(/<svg[\s\S]*?<\/svg>/);
  if (!svgMatch) continue;
  
  let svg = svgMatch[0];
  
  // ✅ REMOVE ALL React/JSX garbage
  svg = svg
    .replace(/style\s*=\s*\{[^}]+\}/g, '')                    // Remove { color: ... }
    .replace(/\{\.\.\.props\}/g, '')                          // Remove {...props}
    .replace(/props\s*=/g, '')                                 // Remove props=
    .replace(/className\s*=/g, 'class=')                      // Fix className
    .replace(/strokeWidth\s*=/g, 'stroke-width=')              // Fix camelCase
    .replace(/strokeLinecap\s*=/g, 'stroke-linecap=')
    .replace(/strokeLinejoin\s*=/g, 'stroke-linejoin=')
    .replace(/fillOpacity\s*=/g, 'fill-opacity=')
    .replace(/\{' '\}|\s*\{\s*' '\s*\}/g, '')                  // Remove {' '}
    .replace(/&quot;/g, '"')                                   // Fix quotes
    .replace(/\s+/g, ' ')                                      // Normalize whitespace
    .trim();

  fs.writeFileSync(path.join(iconsDir, `${iconName}.svg`), svg);
  console.log(`✅ ${iconName}.svg (CLEAN)`);
  count++;
}

console.log(`\n🎉 Generated ${count} CLEAN SVG files → src/assets/icons/`);
