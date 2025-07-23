# Developer Mode Documentation

The LEESEUNGHUN Portfolio includes an advanced developer mode that provides comprehensive content management capabilities directly in the browser.

## 🔓 Activation

### How to Activate Developer Mode
1. **Click 20 times** anywhere on the page
2. A notification will appear confirming activation
3. All editable elements will become interactive
4. The developer mode will remain active until page reload

### Visual Indicators
- Editable text elements show a subtle border on hover
- A developer mode indicator appears in the top-right corner
- Editing controls become visible when interacting with elements

## 📝 Text Editing Features

### In-place Text Editing
- **Single Click**: Enter edit mode for any text element
- **Double Click**: Select all text for quick replacement
- **Escape Key**: Cancel editing and revert changes
- **Enter Key**: Save changes and exit edit mode

### Font Styling Controls
When editing text, the following controls become available:

#### Letter Spacing
- **Tighter**: Reduces letter spacing for compact text
- **Normal**: Default letter spacing
- **Wider**: Increases letter spacing for better readability
- **Extra Wide**: Maximum letter spacing for emphasis

#### Line Height
- **Tight**: Reduces line height for compact paragraphs
- **Normal**: Default line height
- **Relaxed**: Increases line height for better readability
- **Loose**: Maximum line height for emphasis

#### Font Family
- **Sans Serif**: Modern, clean appearance (default)
- **Serif**: Traditional, elegant appearance
- **Monospace**: Fixed-width font for technical content
- **Display**: Decorative font for headings

## 🖼️ Image Editing Features

### Image Replacement
- **Drag & Drop**: Drag new images directly onto existing ones
- **Click to Upload**: Click on any image to open file browser
- **Supported Formats**: JPG, PNG, GIF, WebP, SVG
- **Automatic Optimization**: Images are automatically optimized for web

### Image Properties
- **Alt Text**: Edit accessibility descriptions
- **Aspect Ratio**: Maintain or adjust image proportions
- **Loading**: Configure lazy loading settings

## 🎨 Layout Editing

### Section Management
- **Reorder Sections**: Drag and drop to rearrange page sections
- **Hide/Show**: Toggle visibility of specific sections
- **Spacing**: Adjust margins and padding between elements

### Grid Layout
- **Column Count**: Adjust grid columns for portfolio items
- **Gap Size**: Modify spacing between grid items
- **Responsive**: Preview and adjust for different screen sizes

## 🔧 Advanced Features

### Project Modal Editing
- **Project Information**: Edit titles, descriptions, and metadata
- **Image Gallery**: Add, remove, or reorder project images
- **Technical Details**: Modify tools, technologies, and specifications
- **Timeline**: Update project dates and duration

### Content Export
- **Download Changes**: Export edited content as JSON
- **Backup**: Create backups of original content
- **Reset**: Restore to original state

## 🛠️ Technical Implementation

### Component Architecture
```typescript
interface AdvancedEditableTextProps {
  textKey: string;
  isImageEditable?: boolean;
  imageSrc?: string;
  onImageChange?: (newSrc: string) => void;
  children: React.ReactNode;
}
```

### State Management
- **Local Storage**: Changes persist across browser sessions
- **Undo/Redo**: Full history of editing actions
- **Auto-save**: Automatic saving of changes

### API Integration
```typescript
// Save changes to server
const saveChanges = async (changes: ContentChanges) => {
  await fetch('/api/content', {
    method: 'PUT',
    body: JSON.stringify(changes)
  });
};
```

## 📊 Usage Analytics

### Tracking
- **Edit Actions**: Track which elements are edited most
- **Session Length**: Monitor editing session duration
- **User Behavior**: Analyze editing patterns

### Performance
- **Render Speed**: Optimized for smooth editing experience
- **Memory Usage**: Efficient memory management
- **Undo Stack**: Configurable history depth

## 🔒 Security Considerations

### Input Validation
- **XSS Prevention**: All user input is sanitized
- **File Upload**: Secure file upload with type checking
- **Content Filtering**: Automatic content filtering

### Access Control
- **Local Only**: Developer mode works only in browser
- **No Server Changes**: Changes don't affect server by default
- **Session-based**: Changes expire with browser session

## 🎯 Best Practices

### Content Guidelines
- **Consistency**: Maintain consistent tone and style
- **Accessibility**: Ensure all content is accessible
- **SEO**: Optimize content for search engines
- **Performance**: Consider loading times when adding content

### Image Guidelines
- **Optimization**: Use appropriately sized images
- **Format**: Choose optimal file formats
- **Compression**: Balance quality and file size
- **Responsive**: Ensure images work on all devices

## 🐛 Troubleshooting

### Common Issues

#### Developer Mode Not Activating
- **Solution**: Ensure 20 clicks are registered on the page
- **Check**: Browser console for any JavaScript errors
- **Verify**: No other scripts are interfering

#### Text Not Editable
- **Solution**: Check if element has proper `textKey` prop
- **Verify**: Component is wrapped with `AdvancedEditableText`
- **Debug**: Browser console for component errors

#### Images Not Uploading
- **Solution**: Check file size limits and format support
- **Verify**: Browser permissions for file access
- **Debug**: Network tab for upload errors

### Debug Mode
```javascript
// Enable debug mode in console
window.DEVELOPER_MODE_DEBUG = true;

// Check current state
console.log(window.DEVELOPER_MODE_STATE);
```

## 📚 API Reference

### Event Handlers
```typescript
interface DeveloperModeEvents {
  onActivate: () => void;
  onDeactivate: () => void;
  onTextEdit: (key: string, value: string) => void;
  onImageChange: (key: string, src: string) => void;
  onLayoutChange: (changes: LayoutChanges) => void;
}
```

### Configuration
```typescript
interface DeveloperModeConfig {
  clickThreshold: number;
  autosave: boolean;
  historyDepth: number;
  allowedFileTypes: string[];
  maxFileSize: number;
}
```

## 🎓 Examples

### Basic Text Editing
```typescript
<AdvancedEditableText textKey="hero-title">
  <h1 className="text-4xl font-bold">Your Title Here</h1>
</AdvancedEditableText>
```

### Image Editing
```typescript
<AdvancedEditableText 
  textKey="project-image-1"
  isImageEditable={true}
  imageSrc="/assets/project-1.jpg"
  onImageChange={(newSrc) => updateImage(newSrc)}
>
  <img src="/assets/project-1.jpg" alt="Project 1" />
</AdvancedEditableText>
```

---

*For technical support or feature requests, please refer to the [Contributing Guide](CONTRIBUTING.md).*