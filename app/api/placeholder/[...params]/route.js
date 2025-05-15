export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const dimensions = params.params || [];
  
  // Default dimensions
  let width = 500;
  let height = 300;
  
  // If we have at least one dimension, use it as width
  if (dimensions && dimensions.length > 0) {
    width = parseInt(dimensions[0]) || width;
  }
  
  // If we have a second dimension, use it as height
  if (dimensions && dimensions.length > 1) {
    height = parseInt(dimensions[1]) || height;
  }
  
  // Create a simple SVG placeholder
  const svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e0f2fe;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#bae6fd;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)" />
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
          font-weight="bold" fill="#0369a1" text-anchor="middle" dominant-baseline="middle">
      ${width}×${height}
    </text>
  </svg>`;
  
  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 