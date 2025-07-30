// Constants for consistent styling
export const FONT_SIZES = {
  hero: "text-6xl", // 62px equivalent
  sectionTitle: "text-4xl lg:text-5xl",
  subsectionTitle: "text-2xl lg:text-3xl",
  heading: "text-xl lg:text-2xl",
  subheading: "text-lg",
  body: "text-base",
  small: "text-sm",
  tiny: "text-xs",
};

export const SPACING = {
  sectionGap: "mb-20",
  subsectionGap: "mb-12",
  itemGap: "mb-8",
  smallGap: "mb-4",
};

// Typography constants for consistent styling
export const TYPOGRAPHY = {
  lineHeight: {
    tight: "1.1",
    normal: "1.5",
    relaxed: "1.6",
    loose: "1.8",
  },
  letterSpacing: {
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
  },
  fontSize: {
    tiny: "12px",
    small: "14px",
    base: "16px",
    large: "18px",
    hero: "62px",
  },
};

// Color constants for consistent styling
export const COLORS = {
  primary: "#1CABE2", // 파란색 강조
  text: {
    primary: "#282623", // 진한 회색 메인 텍스트
    secondary: "#58534e", // 중간 회색 보조 텍스트
    light: "#4b5563", // 연한 회색 부가 텍스트
    muted: "#6b7280", // 음소거된 회색 (gray-500)
    hover: "#374151", // 호버 시 색상 (gray-700)
  },
  background: {
    primary: "#ffffff", // 흰색 배경
    secondary: "#f9fafb", // 연한 회색 배경 (gray-50)
    dark: "#000000", // 검은색 배경
  },
};

// Animation constants
export const ANIMATION_DURATIONS = {
  modal: 0.4,
  modalContent: 0.5,
  stagger: 0.1,
};