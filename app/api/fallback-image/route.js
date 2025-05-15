// Required for server component to work correctly
export const dynamic = 'force-dynamic';

// Handles fallback image generation
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || 'unknown';
  const width = searchParams.get('width') || 400;
  const height = searchParams.get('height') || 300;
  
  // Create a simple SVG placeholder
  const svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e0f2fe;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#bae6fd;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)" />
    <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="16" 
          font-weight="bold" fill="#0369a1" text-anchor="middle" dominant-baseline="middle">
      Image Not Found
    </text>
    <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="12" 
          font-weight="normal" fill="#0369a1" text-anchor="middle" dominant-baseline="middle">
      ${path.substring(path.lastIndexOf('/') + 1)}
    </text>
  </svg>`;
  
  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 