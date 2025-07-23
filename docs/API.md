# API Documentation

This document describes the API endpoints and data structures used in the LEESEUNGHUN Portfolio website.

## 🌐 Base URL
```
Development: http://localhost:5000
Production: https://your-domain.com
```

## 🔗 Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-11T12:00:00.000Z"
}
```

### Static Assets
```http
GET /assets/*
```

**Description:** Serves static assets including images, videos, and other media files.

**Examples:**
- `/assets/images/contact-workspace.png`
- `/assets/videos/showreel-2025.mp4`
- `/assets/gallery/beauty.png`

## 📊 Data Structures

### Portfolio Item
```typescript
interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  year: string;
  client: string;
  role: string;
  tools: string[];
  images: string[];
}
```

### Gallery Item
```typescript
interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  client: string;
  category: string;
}
```

### Project Section
```typescript
interface ProjectSection {
  title: string;
  content: string;
  type: 'text' | 'list' | 'diagram';
  items?: string[];
}
```

## 🎨 Asset Management

### Image Categories
```
/assets/images/          # General UI images
/assets/gallery/         # Gallery showcase images
/assets/projects/        # Project-specific images
/assets/videos/          # Video content
```

### Supported Formats
- **Images**: JPG, PNG, WebP, SVG
- **Videos**: MP4, WebM
- **Documents**: PDF (if needed)

### Optimization
- **Compression**: Automatic image compression
- **Responsive**: Multiple sizes for different viewports
- **Lazy Loading**: On-demand loading implementation

## 🔧 Developer Mode API

### Content Updates
```typescript
// In-memory content updates (client-side only)
interface ContentUpdate {
  key: string;
  value: string;
  type: 'text' | 'image' | 'layout';
  timestamp: Date;
}
```

### State Management
```javascript
// Developer mode state
const DEVELOPER_MODE = {
  isActive: false,
  editingKey: null,
  changes: Map<string, any>(),
  history: ContentUpdate[]
};
```

## 📝 Content Schema

### Project Data
```json
{
  "id": "samsung-education",
  "title": "Samsung 교육 콘텐츠 기획 제작",
  "subtitle": "Screen Life 포맷 기반 교육 영상 제작",
  "description": "삼성전자 교육 부문의 Screen Life 포맷 기반 교육 콘텐츠 기획 및 제작 프로젝트",
  "category": "교육 콘텐츠",
  "year": "2023",
  "client": "Samsung Electronics",
  "role": "콘텐츠 기획, 영상 제작",
  "tools": ["Found Footage", "Photoshop", "After Effects", "Premiere Pro"],
  "images": [
    "/assets/projects/samsung-education-studio.jpg",
    "/assets/projects/samsung-education-filming.jpg",
    "/assets/projects/samsung-education-screenlife.jpg",
    "/assets/projects/samsung-education-multiscreen.jpg"
  ]
}
```

### Gallery Data
```json
{
  "id": "vr-cultural-heritage",
  "src": "/assets/gallery/vr-cultural-heritage.jpg",
  "alt": "VR 문화유산 프로젝트",
  "title": "VR 문화유산 콘텐츠 제작",
  "description": "한국의 문화유산을 VR로 체험할 수 있는 콘텐츠 제작",
  "client": "문화재청",
  "category": "VR Content"
}
```

## 🛡️ Error Handling

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

### Error Response Format
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found",
    "details": "Asset /assets/images/nonexistent.png does not exist"
  }
}
```

## 🔒 Security

### CORS Configuration
```javascript
// Development
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Production
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
  credentials: true
}));
```

### Content Security Policy
```javascript
res.setHeader('Content-Security-Policy', 
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline'; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data: https:; " +
  "media-src 'self';"
);
```

## 📊 Performance

### Caching Headers
```javascript
// Static assets
app.use('/assets', express.static('assets', {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// API responses
res.setHeader('Cache-Control', 'public, max-age=300');
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', apiLimiter);
```

## 🔄 WebSocket (Future Enhancement)

### Real-time Updates
```typescript
interface WebSocketMessage {
  type: 'content_update' | 'user_activity' | 'system_message';
  payload: any;
  timestamp: Date;
}

// Client connection
const ws = new WebSocket('ws://localhost:5000/ws');

ws.onmessage = (event) => {
  const message: WebSocketMessage = JSON.parse(event.data);
  handleRealtimeUpdate(message);
};
```

## 📈 Analytics API (Future Enhancement)

### Event Tracking
```http
POST /api/analytics/track
```

**Request Body:**
```json
{
  "event": "page_view",
  "page": "/",
  "user_agent": "Mozilla/5.0...",
  "timestamp": "2025-01-11T12:00:00.000Z"
}
```

### Performance Metrics
```http
POST /api/analytics/performance
```

**Request Body:**
```json
{
  "metrics": {
    "lcp": 2.5,
    "fid": 100,
    "cls": 0.1
  },
  "url": "/",
  "timestamp": "2025-01-11T12:00:00.000Z"
}
```

## 🧪 Testing

### API Testing
```bash
# Health check
curl -X GET http://localhost:5000/health

# Static asset
curl -X GET http://localhost:5000/assets/images/samsung-education.jpg

# Performance test
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:5000/
```

### Load Testing
```bash
# Using Apache Bench
ab -n 100 -c 10 http://localhost:5000/

# Using wrk
wrk -t12 -c400 -d30s http://localhost:5000/
```

## 📚 Integration Examples

### Frontend Integration
```typescript
// Fetch portfolio data
const fetchPortfolioData = async (): Promise<PortfolioItem[]> => {
  const response = await fetch('/api/portfolio');
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio data');
  }
  return response.json();
};

// Use with React Query
const { data: portfolio, isLoading, error } = useQuery({
  queryKey: ['portfolio'],
  queryFn: fetchPortfolioData
});
```

### Error Handling
```typescript
const handleApiError = (error: Error) => {
  console.error('API Error:', error);
  
  // Show user-friendly error message
  toast({
    title: "Error",
    description: "Unable to load content. Please try again.",
    variant: "destructive"
  });
};
```

---

*This API documentation is automatically generated and maintained alongside the codebase.*