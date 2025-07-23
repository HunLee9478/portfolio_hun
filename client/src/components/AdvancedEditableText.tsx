import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Type, AlignLeft, Image } from "lucide-react";

interface AdvancedEditableTextProps {
  textKey: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isTextArea?: boolean;
  isImageEditable?: boolean;
  imageSrc?: string;
  onImageChange?: (newSrc: string) => void;
}

interface StyleControls {
  fontSize: string;
  letterSpacing: string;
  lineHeight: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
}

const FONT_FAMILIES = [
  { name: "기본", value: "inherit" },
  { name: "Noto Sans", value: "'Noto Sans', sans-serif" },
  { name: "Playfair Display", value: "'Playfair Display', serif" },
  { name: "Inter", value: "'Inter', sans-serif" },
  { name: "League Mono", value: "'League Mono', monospace" },
  { name: "Pretendard", value: "'Pretendard', sans-serif" },
];

const FONT_WEIGHTS = [
  { name: "Light", value: "300" },
  { name: "Regular", value: "400" },
  { name: "Medium", value: "500" },
  { name: "SemiBold", value: "600" },
  { name: "Bold", value: "700" },
];

export default function AdvancedEditableText({
  textKey,
  children,
  className = "",
  style = {},
  isTextArea = false,
  isImageEditable = false,
  imageSrc,
  onImageChange,
}: AdvancedEditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [styleControls, setStyleControls] = useState<StyleControls>(() => {
    // localStorage에서 저장된 스타일 불러오기
    const savedStyle = localStorage.getItem(`editedStyle_${textKey}`);
    if (savedStyle) {
      return JSON.parse(savedStyle);
    }
    return {
      fontSize: style.fontSize?.toString() || "16px",
      letterSpacing: style.letterSpacing?.toString() || "0px",
      lineHeight: style.lineHeight?.toString() || "1.5",
      fontFamily: style.fontFamily?.toString() || "inherit",
      fontWeight: style.fontWeight?.toString() || "400",
      color: style.color?.toString() || "#000000",
    };
  });
  const [imageUrl, setImageUrl] = useState(imageSrc || "");
  const [showImageEditor, setShowImageEditor] = useState(false);
  
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isDeveloperMode = localStorage.getItem("developerMode") === "true";

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setShowStylePanel(false);
        setShowImageEditor(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    if (!isDeveloperMode) return;
    
    const textContent = typeof children === "string" ? children : "";
    setEditedText(textContent);
    setIsEditing(true);
  };

  const handleSave = () => {
    // localStorage에 저장하여 새로고침 후에도 유지
    localStorage.setItem(`editedText_${textKey}`, editedText);
    localStorage.setItem(`editedStyle_${textKey}`, JSON.stringify(styleControls));
    console.log(`Saving ${textKey}:`, editedText);
    setIsEditing(false);
    // 강제 리렌더링을 위해 상태 업데이트
    window.location.reload();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTextArea) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleStyleChange = (property: keyof StyleControls, value: string) => {
    setStyleControls(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const handleImageUrlChange = (newUrl: string) => {
    setImageUrl(newUrl);
    if (onImageChange) {
      onImageChange(newUrl);
    }
  };

  const appliedStyle = {
    ...style,
    fontSize: styleControls.fontSize,
    letterSpacing: styleControls.letterSpacing,
    lineHeight: styleControls.lineHeight,
    fontFamily: styleControls.fontFamily,
    fontWeight: styleControls.fontWeight,
    color: styleControls.color,
  };

  if (!isDeveloperMode) {
    return (
      <span className={className} style={appliedStyle}>
        {children}
      </span>
    );
  }

  return (
    <div className="relative group">
      {/* 메인 컨텐츠 */}
      <div
        onClick={handleClick}
        className={`${className} ${isDeveloperMode ? "cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 transition-all" : ""}`}
        style={appliedStyle}
      >
        {isEditing ? (
          <div className="relative">
            {isTextArea ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border-2 border-blue-500 rounded resize-none"
                style={appliedStyle}
                rows={3}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border-2 border-blue-500 rounded"
                style={appliedStyle}
              />
            )}
            
            {/* 저장/취소 버튼 */}
            <div className="absolute -bottom-12 left-0 flex gap-2 bg-white shadow-lg rounded p-2 z-50">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                저장
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          localStorage.getItem(`editedText_${textKey}`) || children
        )}
      </div>

      {/* 스타일 편집 버튼 */}
      {isDeveloperMode && !isEditing && (
        <div className="absolute -top-8 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowStylePanel(!showStylePanel);
              }}
              className="p-1 bg-purple-500 text-white rounded shadow hover:bg-purple-600 transition-colors"
              title="스타일 편집"
            >
              <Type size={12} />
            </button>
            
            {isImageEditable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImageEditor(!showImageEditor);
                }}
                className="p-1 bg-green-500 text-white rounded shadow hover:bg-green-600 transition-colors"
                title="이미지 편집"
              >
                <Image size={12} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 스타일 편집 패널 */}
      <AnimatePresence>
        {showStylePanel && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">스타일 편집</h3>
              <button
                onClick={() => setShowStylePanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {/* 폰트 크기 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  폰트 크기
                </label>
                <input
                  type="text"
                  value={styleControls.fontSize}
                  onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="16px"
                />
              </div>

              {/* 자간 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  자간
                </label>
                <input
                  type="text"
                  value={styleControls.letterSpacing}
                  onChange={(e) => handleStyleChange("letterSpacing", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="0px"
                />
              </div>

              {/* 행간 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  행간
                </label>
                <input
                  type="text"
                  value={styleControls.lineHeight}
                  onChange={(e) => handleStyleChange("lineHeight", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="1.5"
                />
              </div>

              {/* 폰트 패밀리 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  폰트
                </label>
                <select
                  value={styleControls.fontFamily}
                  onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  {FONT_FAMILIES.map(font => (
                    <option key={font.value} value={font.value}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 폰트 굵기 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  폰트 굵기
                </label>
                <select
                  value={styleControls.fontWeight}
                  onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  {FONT_WEIGHTS.map(weight => (
                    <option key={weight.value} value={weight.value}>
                      {weight.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 색상 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  색상
                </label>
                <input
                  type="color"
                  value={styleControls.color}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 이미지 편집 패널 */}
      <AnimatePresence>
        {showImageEditor && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">이미지 편집</h3>
              <button
                onClick={() => setShowImageEditor(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {/* 이미지 URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이미지 URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* 이미지 미리보기 */}
              {imageUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    미리보기
                  </label>
                  <img
                    src={imageUrl}
                    alt="미리보기"
                    className="w-full h-32 object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              <div className="text-xs text-gray-500">
                팁: 이미지 URL을 입력하면 즉시 적용됩니다.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}