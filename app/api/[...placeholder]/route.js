export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  // Extract any path segments after /api/
  const placeholder = params.placeholder || [];
  
  // Get parameters from either path segments or query params
  const { searchParams } = new URL(request.url);
  
  // Use first segment as width if it's a number, otherwise use query param or default
  const width = 
    placeholder[0] && !isNaN(parseInt(placeholder[0])) 
      ? parseInt(placeholder[0]) 
      : (searchParams.get('width') || 400);
      
  // Use second segment as height if it's a number, otherwise use query param or default
  const height = 
    placeholder[1] && !isNaN(parseInt(placeholder[1])) 
      ? parseInt(placeholder[1]) 
      : (searchParams.get('height') || 300);
      
  // Get path if provided in query params
  const path = searchParams.get('path') || 'Image';
  
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
      ${path.toString().split('/').pop() || 'Image'} ${width}×${height}
    </text>
  </svg>`;
  
  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 