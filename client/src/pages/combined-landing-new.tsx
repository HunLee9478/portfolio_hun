import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FONT_SIZES, SPACING, ANIMATION_DURATIONS, TYPOGRAPHY, COLORS } from "../constants/styles";
import AdvancedEditableText from "../components/AdvancedEditableText";

// Clean asset imports
const ContactWorkspaceImage = "/assets/images/contact-workspace.png";
const SamsungOfflineImage = "/assets/images/samsung-offline.png";
const SnapaskContentImage = "/assets/images/snapask-content.png";
const SamsungEducationImage = "/assets/images/samsung-education.jpg";
const JinairPromoImage = "/assets/images/jinair-promo.png";
const IntegratedOperationImage = "/assets/images/integrated-operation.jpg";
const TechSupportImage = "/assets/images/tech-support.jpg";
const SamsungSeminarRoomImage = "/assets/images/samsung-seminar-room.png";
const SamsungPresentationImage = "/assets/images/samsung-presentation.png";
const SamsungEventStageImage = "/assets/images/samsung-event-stage.png";
const OverseasEventImage = "/assets/images/overseas-event.jpg";
const OnlineEventImage = "/assets/images/online-event.jpg";

// Gallery images
const VRCulturalHeritageImage = "/assets/gallery/vr-cultural-heritage.jpg";
const KoreyaHospitalImage = "/assets/gallery/koreya-hospital.jpg";
const GalleryBeautyImage = "/assets/gallery/beauty.png";
const PersonalPortfolioImage = "/assets/gallery/personal-portfolio.png";
const GalleryInterviewImage = "/assets/gallery/interview.png";
const LikelionHackathonImage = "/assets/gallery/likelion-hackathon.png";
const GalleryMalePortraitImage = "/assets/gallery/male-portrait.png";
const JinairSurfingDayImage = "/assets/gallery/jinair-surfing.png";
const GalleryJinairPromotionImage = "/assets/gallery/jinair-promotion.png";

// Samsung Education Project images
const SamsungEducationStudio = "/assets/projects/samsung-education-studio.jpg";
const SamsungEducationFilming = "/assets/projects/samsung-education-filming.jpg";
const SamsungEducationScreenLife = "/assets/projects/samsung-education-screenlife.jpg";
const SamsungEducationMultiscreen = "/assets/projects/samsung-education-multiscreen.jpg";

// Jinair Project images
const JinairEsportsEvent = "/assets/projects/jinair-esports.png";
const JinairFanEvent = "/assets/projects/jinair-fan-event.png";
const JinairShillaBeauty = "/assets/projects/jinair-shilla-beauty.png";
const JinairShillaStore = "/assets/projects/jinair-shilla-store.png";

// Metaverse Project images
import MetaverseMainImage from '@assets/generated_images/Metaverse_campaign_hero_cb01be69.png';
import MetaverseOfficeSpace from '@assets/generated_images/Metaverse_office_space_76121093.png';
import MetaverseCafeSpace from '@assets/generated_images/Virtual_cafe_space_f25d46e9.png';
import MetaverseAnalytics from '@assets/generated_images/Metaverse_analytics_dashboard_e9fe9d5b.png';
import MetaverseQuest from '@assets/generated_images/Gaming_quest_system_416737f3.png';

gsap.registerPlugin(ScrollTrigger);

// Portfolio item interface
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

// MasonryGrid component
interface MasonryGridProps {
  items: PortfolioItem[];
  onProjectClick: (item: PortfolioItem) => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ items, onProjectClick }) => {
  const [columns, setColumns] = useState<{
    left: PortfolioItem[];
    right: PortfolioItem[];
    center?: PortfolioItem[];
  }>({
    left: [],
    right: [],
    center: [],
  });
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle image load and measure height
  const handleImageLoad = useCallback(
    (id: string, event: React.SyntheticEvent<HTMLImageElement>) => {
      // Use 16:9 aspect ratio for all images
      const containerWidth =
        window.innerWidth <= 768
          ? window.innerWidth - 48 // Mobile: full width minus padding
          : (1152 - 48) / 2; // Desktop: half container width minus gap
      const height = containerWidth * (9 / 16); // 16:9 ratio

      setImageHeights((prev) => ({
        ...prev,
        [id]: height,
      }));
    },
    [],
  );

  // Split images into balanced columns
  const distributeImages = useCallback(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Single column for mobile
      setColumns({ left: items, right: [] });
    } else {
      // Two columns for desktop
      const leftColumn: PortfolioItem[] = [];
      const rightColumn: PortfolioItem[] = [];
      let leftHeight = 0;
      let rightHeight = 0;

      items.forEach((item) => {
        const height = imageHeights[item.id] || 300;
        if (leftHeight <= rightHeight) {
          leftColumn.push(item);
          leftHeight += height;
        } else {
          rightColumn.push(item);
          rightHeight += height;
        }
      });

      setColumns({ left: leftColumn, right: rightColumn });
    }
  }, [items, imageHeights]);

  // Initial distribution and when heights change
  useEffect(() => {
    distributeImages();
  }, [distributeImages]);

  // Update when image heights change
  useEffect(() => {
    if (Object.keys(imageHeights).length > 0) {
      distributeImages();
    }
  }, [imageHeights, distributeImages]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Reset heights to trigger recalculation
      setImageHeights({});
      setIsLoading(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderColumn = (columnItems: PortfolioItem[]) => (
    <div className="flex flex-col gap-4">
      {columnItems.map((item) => (
        <motion.div
          key={item.id}
          className="group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onClick={() => onProjectClick(item)}
        >
          <div
            className="relative overflow-hidden bg-gray-100 rounded-lg"
            style={{ height: imageHeights[item.id] || 300 }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onLoad={(e) => handleImageLoad(item.id, e)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span
                  className={`title block ${FONT_SIZES.subheading} font-medium drop-shadow-lg`}
                >
                  {item.title}
                </span>
                <span
                  className={`subtitle block ${FONT_SIZES.small} opacity-90`}
                >
                  {item.subtitle}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="flex gap-4">
      {/* Left Column */}
      <div className="flex-1">{renderColumn(columns.left)}</div>

      {/* Right Column (Desktop only) */}
      {columns.right.length > 0 && (
        <div className="flex-1 hidden md:block">
          {renderColumn(columns.right)}
        </div>
      )}
    </div>
  );
};

export default function CombinedLanding() {
  const heroRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showSoundControl, setShowSoundControl] = useState(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  
  // 프로젝트 모달 상태 - 리팩토링
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);

  // 갤러리 전용 상태
  const [selectedGalleryItem, setSelectedGalleryItem] =
    useState<PortfolioItem | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isClosingGallery, setIsClosingGallery] = useState(false);

  // 개발자 모드 상태
  const [clickCount, setClickCount] = useState(0);
  const [isDeveloperMode, setIsDeveloperMode] = useState(() => {
    return localStorage.getItem("developerMode") === "true";
  });
  const [editableTexts, setEditableTexts] = useState<Record<string, string>>({
    heroTitle1: "메세지 전달을 넘어",
    heroTitle2: "<span style='color: #1CABE2'>후원자의 마음</span>을",
    heroTitle3: "움직이는",
    heroTitle4: "디지털 마케터 이승훈 입니다",
    aboutTitle: "> ALL-IN-ONE CAMPAIGN\nCREATOR",
    aboutDescription: "기획에서 후반작업까지 모든 제작 과정을 아우르는 올라운드 역량을 갖춘 콘텐츠 크리에이터입니다. 다양한 플랫폼과 장르에서 축적한 경험을 바탕으로 시청자 중심의 창의적 솔루션을 제시하며, 브랜드 가치 향상과 사용자 경험 개선을 통해 measurable한 성과를 달성합니다.",
    service1Title: "콘텐츠 기획, 제작",
    service1Description: "시청자 데이터와 시청환경 분석을 바탕으로 한 전략적 기획력과 촬영·편집·조명·미술까지 아우르는 올라운드 제작 역량으로 고품질 콘텐츠를 구현하여 제작비 최적화와 브랜드 가치 향상을 견인합니다.",
    service2Title: "프로젝트 매니지먼트",
    service2Description: "콘텐츠 제작 전문성과 IT 기술 활용 능력을 결합해 창작과 기술의 경계를 넘나들며, 혁신적인 제작 워크플로우 구축을 통해 프로젝트 성과를 극대화합니다.",
    service3Title: "온, 오프라인 콘텐츠 운영",
    service3Description: "라이브 콘텐츠를 직접 운영하며 출연자 관리와 제작 능력을 기반으로 한 기술적 이슈 대응을 통해 1년간 NPS 4.5 이상의 안정적인 성과를 달성합니다.",
    contactTitle: "I Keep Challenging Myself to Make Good and Meaningful Content",
    contactDescription: "저는 제작 역량을 기반으로 기획부터 연출, 촬영, 편집, 사용자 경험까지 모든 과정에서 '무엇을, 어떻게' 보여줄지를 고민해왔습니다. 심리를 설계하고, 이탈 데이터를 분석해 UI 개선을 제안했으며, AI 툴을 활용해 제작 속도와 품질을 동시에 끌어올렸습니다. 감성과 전략, 창의성과 기술을 넘나들며 종합적인 콘텐츠 구조를 설계하는 콘텐츠 크리에이터로 성장해왔으며, 앞으로도 명확한 메시지를 중심에 둔 콘텐츠를 만들어가겠습니다.",
  });
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [tempEditValue, setTempEditValue] = useState<string>("");
  const lastClickTime = useRef<number>(0);

  // 개발자 모드 기능들
  const handleDeveloperClick = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastClickTime.current < 500) { // 500ms 내 연속 클릭 감지
      setClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 30) {
          const shouldActivate = window.confirm("개발자 모드를 활성화하시겠습니까?");
          if (shouldActivate) {
            setIsDeveloperMode(true);
            localStorage.setItem("developerMode", "true");
          }
          setClickCount(0);
        }
        return newCount;
      });
    } else {
      setClickCount(1);
    }
    lastClickTime.current = now;
  };

  const handleTextEdit = (key: string, value: string) => {
    setEditableTexts(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const startEditing = (key: string) => {
    if (!isDeveloperMode) return;
    setIsEditing(key);
    setTempEditValue(editableTexts[key]);
  };

  const saveEdit = (key: string) => {
    handleTextEdit(key, tempEditValue);
    setIsEditing(null);
    setTempEditValue("");
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setTempEditValue("");
  };

  // EditableText 컴포넌트
  const EditableText = ({ 
    textKey, 
    children, 
    className = "", 
    isTextArea = false,
    ...props 
  }: {
    textKey: string;
    children: React.ReactNode;
    className?: string;
    isTextArea?: boolean;
    [key: string]: any;
  }) => {
    const isCurrentlyEditing = isEditing === textKey;
    const text = editableTexts[textKey] || "";

    if (isCurrentlyEditing) {
      return isTextArea ? (
        <textarea
          value={tempEditValue}
          onChange={(e) => setTempEditValue(e.target.value)}
          onBlur={() => saveEdit(textKey)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              saveEdit(textKey);
            } else if (e.key === 'Escape') {
              cancelEdit();
            }
          }}
          className={`${className} bg-yellow-100 border-2 border-yellow-400 outline-none resize-none`}
          autoFocus
          {...props}
        />
      ) : (
        <input
          value={tempEditValue}
          onChange={(e) => setTempEditValue(e.target.value)}
          onBlur={() => saveEdit(textKey)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              saveEdit(textKey);
            } else if (e.key === 'Escape') {
              cancelEdit();
            }
          }}
          className={`${className} bg-yellow-100 border-2 border-yellow-400 outline-none`}
          autoFocus
          {...props}
        />
      );
    }

    return (
      <div
        className={`${className} ${isDeveloperMode ? 'hover:bg-yellow-50 cursor-pointer border-2 border-dashed border-transparent hover:border-yellow-300' : ''}`}
        onClick={() => startEditing(textKey)}
        dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }}
        {...props}
      />
    );
  };

  // 새로운 프로젝트 모달 핸들러들
  const openProjectModal = (project: PortfolioItem) => {
    console.log("프로젝트 클릭됨:", project.id, project.title);
    setSelectedProject(project);
    setShowProjectModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setShowProjectModal(false);
      setSelectedProject(null);
      setIsClosingModal(false);
      document.body.style.overflow = 'auto';
    }, 400);
  };

  // Portfolio data
  const portfolioItems: PortfolioItem[] = [
    {
      id: "1",
      src: SamsungOfflineImage,
      alt: "Samsung 온·오프라인 콘텐츠 기획",
      title: "온·오프라인 캠페인 기획, 운영",
      subtitle: "통합 교육 프로그램 운영",
      description: "SAMSUNG\n온 오프라인 캠페인 기획, 운영",
      category: "Campagin",
      year: "2023-2024",
      client: "Samsung",
      role: "기획, 운영, 제작",
      tools: ["Adobe Premiere", "After Effects", "Photoshop"],
      images: [
        "/assets/projects/samsung-education-filming.jpg",
        "/assets/projects/samsung-education-multiscreen.jpg",
        "/assets/projects/samsung-education-screenlife.jpg",
        "/assets/projects/samsung-education-studio.jpg",
      ],
    },
    {
      id: "2",
      src: SnapaskContentImage,
      alt: "Snapask 프리미엄 콘텐츠 기획, 제작",
      title: "Snapask 프리미엄 콘텐츠 기획, 제작",
      subtitle: "교육 콘텐츠 기획 및 제작",
      description: "SNAPASK KOREA\n프리미엄 콘텐츠 제작",
      category: "Content Production",
      year: "2022-2023",
      client: "Snapask Korea",
      role: "콘텐츠 기획, 영상 제작",
      tools: ["BMPCC 6K", "브랜드 LUT", "Python", "FFmpeg", "DaVinci Resolve", "Premiere Pro", "After Effects"],
      images: [
        "/assets/projects/snapask-1.png",
        "/assets/projects/snapask-2.png",
        "/assets/projects/snapask-3.png",
        "/assets/projects/snapask-4.png",
      ],
    },
    {
      id: "3",
      src: SamsungEducationImage,
      alt: "컴플라이언스 캠페인 기획,제작",
      title: "컴플라이언스 캠페인 기획,제작",
      subtitle: "기업 교육 프로그램 개발",
      description: "SAMSUNG\n컴플라이언스 캠페인 콘텐츠 기획, 제작",
      category: "Campagin",
      year: "2023",
      client: "Samsung",
      role: "기획,제작,관리 ",
      tools: ["Learning Management", "Video Production", "Interactive Content"],
      images: [
        SamsungEducationStudio,
        SamsungEducationFilming,
        SamsungEducationScreenLife,
        SamsungEducationMultiscreen,
      ],
    },
    {
      id: "4",
      src: JinairPromoImage,
      alt: "Jinair 베트남 인플루언서 프로모션 콘텐츠 제작",
      title: "Jinair 베트남 인플루언서 프로모션 콘텐츠 제작",
      subtitle: "해외 마케팅 콘텐츠 기획",
      description: "JINAIR\n베트남 인플루언서 홍보 콘텐츠 제작",
      category: "Marketing Content",
      year: "2023",
      client: "Jinair",
      role: "마케팅 콘텐츠 기획",
      tools: ["Influencer Marketing", "Brand Content", "Video Production"],
      images: [
        JinairEsportsEvent,
        JinairFanEvent,
        JinairShillaBeauty,
        JinairShillaStore,
      ],
    },
    {
      id: "5",
      src: MetaverseMainImage,
      alt: "메타버스 기반 게임형 디지털 캠페인",
      title: "메타버스 기반 게임형 디지털 캠페인",
      subtitle: "AI 활용 메타버스 환경 구축",
      description: "METAVERSE CAMPAIGN\n게임형 디지털 캠페인 기획·제작",
      category: "Metaverse & AI",
      year: "2023",
      client: "NH농협, 삼성교육재단, 한국증권 외 2개사",
      role: "AI 기획, 메타버스 환경 구축",
      tools: ["Python", "ComfyUI", "Midjourney", "Stable Diffusion", "SnowFlake", "Gather API"],
      images: [
        MetaverseOfficeSpace,
        MetaverseCafeSpace,
        MetaverseAnalytics,
        MetaverseQuest,
      ],
    },
  ];

  // Gallery items
  const galleryItems: PortfolioItem[] = [
    {
      id: "gallery-1",
      src: VRCulturalHeritageImage,
      alt: "종로구 문화유산 VR 콘텐츠",
      title: "종로구 문화유산 VR 콘텐츠 기획",
      subtitle: "문화유산의 VR 콘텐츠 제작",
      description:
        "종로구의 문화유산을 가상현실(VR) 기술로 체험할 수 있는 콘텐츠를 기획했습니다. 전통 문화의 디지털 보존과 체험형 콘텐츠를 통해 문화유산의 가치를 확산시키는 프로젝트입니다.",
      category: "VR Content",
      year: "2024",
      client: "종로구청",
      role: "VR 콘텐츠 기획, 제작",
      tools: ["VR Development", "Cultural Research", "3D Modeling"],
      images: [],
    },
    {
      id: "gallery-2",
      src: KoreyaHospitalImage,
      alt: "고려대학교구로병원 사내방송 콘텐츠",
      title: "사내방송 콘텐츠",
      subtitle: "의료진 대상 사내 소통 프로그램",
      description:
        "고려대학교구로병원의 의료진과 직원들을 대상으로 한 사내방송 콘텐츠를 기획하고 제작했습니다. 병원 내 소통과 정보 공유를 위한 전문적인 방송 콘텐츠입니다.",
      category: "Broadcasting Content",
      year: "2024",
      client: "고려대학교구로병원",
      role: "방송 콘텐츠 기획, 제작",
      tools: ["Broadcasting", "Medical Communication", "Video Production"],
      images: [],
    },
    {
      id: "gallery-3",
      src: PersonalPortfolioImage,
      alt: "AI 뷰티 제품 광고",
      title: "개인 포트폴리오",
      subtitle: "AI 뷰티 제품 광고",
      description:
        "ComfyUI, FLUX를 활용하여 제작한 실사형 AI 뷰티 제품 광고 이미지입니다. AI 기술을 통해 자연스러운 모델 표현과 제품 배치를 구현한 개인 포트폴리오 작업입니다.",
      category: "Personal Project",
      year: "2024",
      client: "개인 포트폴리오",
      role: "AI 이미지 생성, 프롬프트 엔지니어링",
      tools: ["ComfyUI", "FLUX", "AI Image Generation"],
      images: [],
    },

    {
      id: "gallery-4",
      src: GalleryInterviewImage,
      alt: "인터뷰 및 대담 현장 촬영",
      title: "인터뷰 프로그램 제작",
      subtitle: "진솔한 대화의 순간",
      description: "자연스러운 인터뷰 분위기를 담은 현장 스냅입니다.",
      category: "Interview Program",
      year: "2024",
      client: "현대 글로비스",
      role: "현장 촬영, 프로그램 제작",
      tools: ["Documentary Style", "Interview Setup"],
      images: [],
    },
    {
      id: "gallery-5",
      src: LikelionHackathonImage,
      alt: "멋쟁이사자처럼 해커톤 홍보영상",
      title: "해커톤 홍보영상 제작",
      subtitle: "개발자 커뮤니티 행사 홍보",
      description:
        "멋쟁이사자처럼 해커톤 행사를 위한 홍보영상을 기획하고 제작했습니다. 개발자 커뮤니티의 열정과 도전 정신을 담아 참가자들의 참여를 유도하는 영상 콘텐츠입니다.",
      category: "Event Promotion",
      year: "2024",
      client: "멋쟁이사자처럼",
      role: "홍보영상 기획, 제작",
      tools: ["Video Production", "Motion Graphics", "Event Marketing"],
      images: [],
    },
    {
      id: "gallery-6",
      src: GalleryMalePortraitImage,
      alt: "개인 포트폴리오",
      title: "개인 포트폴리오",
      subtitle: "",
      description:
        "ComfyUI, FLUX, Python을 활용하여 실사형 제품 광고 이미지를 제작했습니다. 자연스러운 인물 표현과 디테일한 후보정을 통해 실제 촬영과 구분이 어려운 수준의 결과물을 구현했습니다.",
      category: "AI Portrait",
      year: "2024",
      client: "개인 포트폴리오",
      role: "개인 포트폴리오",
      tools: ["ComfyUI", "Python", "Photoshop"],
      images: [],
    },
    {
      id: "gallery-7",
      src: JinairSurfingDayImage,
      alt: "진에어 서핑 데이 프로모션",
      title: "진에어 서핑 데이 프로모션",
      subtitle: "12월 겨울철 서핑 여행 프로모션",
      description: "진에어의 겨울 서핑 여행 프로모션 '서핑 데이'를 위한 영상 콘텐츠를 제작했습니다. 12월 겨울철에도 따뜻한 해변에서 서핑을 즐길 수 있다는 메시지를 전달하며, 항공사 브랜드의 젊고 활동적인 이미지를 강조했습니다.",
      category: "Travel Promotion",
      year: "2024",
      client: "JINAIR",
      role: "시각 콘텐츠 기획, 디자인",
      tools: ["Photoshop", "Illustrator", "Brand Design"],
      images: [],
    },


  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!heroRef.current || !videoWrapRef.current) return;

      const hero = heroRef.current;
      const videoWrap = videoWrapRef.current;

      // Cache initial video position and calculate transforms
      const rect = videoWrap.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Calculate translation to center the video
      const centerX = vw / 2;
      const centerY = vh / 2;
      const currentCenterX = rect.left + rect.width / 2;
      const currentCenterY = rect.top + rect.height / 2;
      const x = centerX - currentCenterX;
      const y = centerY - currentCenterY;

      // Create ScrollTrigger for 12 scroll actions to fullscreen
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=1200vh",
        scrub: 2,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Ease-in-out cubic interpolation for smooth scaling
          const easedProgress =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          // Dynamic aspect ratio handling
          const viewportAspectRatio = window.innerWidth / window.innerHeight;

          // Apply square crop for portrait/square viewports
          if (viewportAspectRatio <= 1.0) {
            videoWrap.classList.add("square-crop");
          } else {
            videoWrap.classList.remove("square-crop");
          }

          // Calculate target scale to fit viewport
          const targetScale = Math.max(
            window.innerWidth / 140,
            window.innerHeight / 68,
          );

          const currentScale = 1 + (targetScale - 1) * easedProgress;

          // Add scaling class to remove clip-path
          if (progress > 0.05) {
            videoWrap.classList.add("scaling");
          } else {
            videoWrap.classList.remove("scaling");
          }

          // Apply transforms
          gsap.set(videoWrap, {
            x: x * easedProgress,
            y: y * easedProgress,
            scale: currentScale,
            transformOrigin: "50% 50%",
            zIndex: progress > 0.1 ? 9999 : 1,
            force3D: true,
          });

          // Update video fullscreen state for sound control
          setIsVideoFullscreen(progress >= 0.8);
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Sound control handlers
  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  const handleVideoMouseEnter = () => {
    if (isVideoFullscreen) {
      setShowSoundControl(true);
    }
  };

  const handleVideoMouseLeave = () => {
    setShowSoundControl(false);
  };

  // 프로젝트 모달 닫기
  const closeModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosingModal(false);
    }, 400);
  };

  // 갤러리 모달 닫기
  const closeGalleryModal = () => {
    setIsClosingGallery(true);
    setTimeout(() => {
      setSelectedGalleryItem(null);
      setIsClosingGallery(false);
      setCurrentGalleryIndex(0);
    }, 400);
  };

  // 갤러리 라이트박스 열기
  const openGalleryLightbox = (item: PortfolioItem) => {
    const index = galleryItems.findIndex(
      (galleryItem) => galleryItem.id === item.id,
    );
    if (index !== -1) {
      setCurrentGalleryIndex(index);
      setSelectedGalleryItem(item);
      setIsClosingGallery(false);
    }
  };

  // 갤러리 네비게이션
  const navigateGallery = (direction: "prev" | "next") => {
    if (galleryItems.length === 0) return;

    const newIndex =
      direction === "next"
        ? (currentGalleryIndex + 1) % galleryItems.length
        : (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;

    setCurrentGalleryIndex(newIndex);
    setSelectedGalleryItem(galleryItems[newIndex]);
  };

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedGalleryItem) {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            navigateGallery("prev");
            break;
          case "ArrowRight":
            e.preventDefault();
            navigateGallery("next");
            break;
          case "Escape":
            e.preventDefault();
            closeGalleryModal();
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedGalleryItem, currentGalleryIndex, galleryItems]);

  // Navigation handler with smooth scroll to section
  const handleNavigation = (section: string) => {
    closeModal();
    setTimeout(() => {
      switch (section) {
        case "home":
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "about":
          document
            .querySelector(".next")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "work":
          document
            .querySelector('[data-section="work"]')
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "contact":
          document
            .querySelector('[data-section="contact"]')
            ?.scrollIntoView({ behavior: "smooth" });
          break;
      }
    }, 500);
  };

  return (
    <div className="bg-white text-black overflow-x-hidden" onClick={handleDeveloperClick}>
      {/* 개발자 모드 종료 버튼 (우클릭으로만 표시) */}
      {isDeveloperMode && (
        <div
          className="fixed bottom-4 left-4 z-[99999] opacity-20 hover:opacity-100 transition-opacity"
          onContextMenu={(e) => {
            e.preventDefault();
            const shouldDeactivate = window.confirm("개발자 모드를 종료하시겠습니까?");
            if (shouldDeactivate) {
              setIsDeveloperMode(false);
              localStorage.removeItem("developerMode");
              setIsEditing(null);
            }
          }}
        >
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        </div>
      )}
      {/* Navigation Bar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[99999]">
        <div className="backdrop-blur-md rounded-full px-8 py-3" style={{ backgroundColor: "#1CABE2" }}>
          <div className="flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("home")}
              className={`${FONT_SIZES.small} transition-colors cursor-pointer text-white hover:text-white/80`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("about")}
              className={`${FONT_SIZES.small} transition-colors cursor-pointer text-white hover:text-white/80`}
            >
              About
            </button>
            <button
              onClick={() => handleNavigation("work")}
              className={`${FONT_SIZES.small} transition-colors cursor-pointer text-white hover:text-white/80`}
            >
              Work
            </button>
            <button
              onClick={() => handleNavigation("contact")}
              className={`${FONT_SIZES.small} transition-colors cursor-pointer text-white hover:text-white/80`}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section with Text Masking */}
      <section
        ref={heroRef}
        className="hero h-screen flex items-center justify-center relative bg-white overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className={`hero__heading font-bold leading-tight ${SPACING.itemGap}`}
            style={{ fontSize: "62px", lineHeight: "1.1" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="space-y-2 text-center max-w-4xl mx-auto">
              <EditableText
                textKey="heroTitle1"
                className="block text-left text-[#2D2926]"
                style={{ lineHeight: "1.1" }}
              >
                메세지 전달을 넘어
              </EditableText>
              <EditableText
                textKey="heroTitle2"
                className="block mt-[2px] mb-[2px] pt-[1px] pb-[1px] text-[#2D2926]"
                style={{ lineHeight: "1.1" }}
              >
                후원자의 마음만을
              </EditableText>
              <div
                className="block pt-[0px] pb-[0px] mt-[-4px] mb-[-4px]"
                style={{ lineHeight: "1.1" }}
              >
                <EditableText
                  textKey="heroTitle3"
                  className="inline text-[#2D2926]"
                  style={{ lineHeight: "1.1" }}
                >
                  움직이는
                </EditableText>
                <span
                  ref={videoWrapRef}
                  className="hero__videoWrap inline-block relative cursor-pointer"
                  style={{
                    width: "140px",
                    height: "68px",
                    verticalAlign: "baseline",
                    willChange: "transform",
                    marginLeft: "12px",
                    marginRight: "0px",
                  }}
                  onMouseEnter={handleVideoMouseEnter}
                  onMouseLeave={handleVideoMouseLeave}
                  onClick={toggleSound}
                >
                  <video
                    ref={videoRef}
                    src="/assets/videos/showreel-2025.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: "brightness(1.05)",
                      borderRadius: "0",
                    }}
                    className="mt-[10px] mb-[10px]"
                  />
                </span>
              </div>
              <div
                className="block pt-[3px] pb-[3px]"
                style={{ lineHeight: "1.1" }}
              >
                <EditableText
                  textKey="heroTitle4"
                  className="inline text-[#2D2926]"
                  style={{ lineHeight: "1.1" }}
                >
                  콘텐츠 제작자 이승훈 입니다
                </EditableText>
                <span className="text-[#FFDC0E]">.</span>
              </div>
            </div>
          </motion.h1>

          {/* Scroll Indicator */}
          <motion.div
            id="main-scroll-indicator"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-[99999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`${FONT_SIZES.small} ${SPACING.smallGap} transition-colors duration-300 ${isVideoFullscreen ? "text-white" : "text-black/80"}`}
            >
              {isVideoFullscreen ? "Keep to explore" : "Scroll to explore"}
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className={`w-6 h-10 border-2 rounded-full flex justify-center ml-[39px] mr-[39px] transition-colors duration-300 ${isVideoFullscreen ? "border-white/40" : "border-black/30"}`}
            >
              <div
                className={`w-1 h-3 rounded-full mt-2 transition-colors duration-300 ${isVideoFullscreen ? "bg-white/60" : "bg-black/50"}`}
              ></div>
            </motion.div>
          </motion.div>

          {/* Sound Control Overlay */}
          {isVideoFullscreen && (
            <motion.div
              className="fixed inset-0 z-[99999] pointer-events-auto cursor-pointer"
              onClick={toggleSound}
              onMouseEnter={handleVideoMouseEnter}
              onMouseLeave={handleVideoMouseLeave}
            >
              {/* Center Sound Control */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-lg px-6 py-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: showSoundControl ? 1 : 0,
                  scale: showSoundControl ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white text-lg font-medium tracking-wide">
                  {isVideoMuted ? "SOUND ON" : "SOUND OFF"}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
      {/* Next Section - Portfolio */}
      <section
        className="next bg-white text-black relative z-1 min-h-screen"
        data-section="about"
      >
        <div className="container mx-auto px-4 pt-20">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main About Section */}
            <div className={SPACING.sectionGap}>
              <div className="flex justify-between items-start mb-6">
                <h3 className="uppercase tracking-wide text-base font-semibold text-[#1cabe2]">
                  ABOUT Hun
                </h3>
                <span
                  className={`${FONT_SIZES.small} font-medium`}
                  style={{ color: COLORS.text.muted }}
                >
                  01
                </span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                {/* Left Column - Main Description */}
                <div className="lg:col-span-6">
                  <motion.h2 
                    className="leading-tight mb-4 font-light"
                    style={{
                      fontFamily: "'Noto Sans', sans-serif",
                      fontSize: "3.5rem",
                      fontWeight: "300",
                      letterSpacing: "0.05em",
                      lineHeight: "1.1",
                      color: COLORS.primary,
                    }}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <EditableText
                      textKey="aboutTitle"
                      className="leading-tight font-light text-[#1CABE2]"
                      style={{
                        fontFamily: "'Noto Sans', sans-serif",
                        fontSize: "3.5rem",
                        fontWeight: "300",
                        letterSpacing: "0.05em",
                        lineHeight: "1.1",
                        color: "#1CABE2",
                      }}
                    >
                      &gt; ALL-IN-ONE CAMPAIGN<br />CREATOR
                    </EditableText>
                  </motion.h2>
                  <EditableText
                    textKey="aboutDescription"
                    className={`${FONT_SIZES.small} pt-2 pb-2 mt-0 mb-0 leading-relaxed`}
                    isTextArea={true}
                    style={{
                      minHeight: "80px",
                      width: "100%",
                      resize: "vertical",
                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                      color: COLORS.text.hover
                    }}
                  >
                    기획에서 후반작업까지 모든 제작 과정을 아우르는 올라운드 역량을 갖춘 콘텐츠 크리에이터입니다. 다양한 플랫폼과 장르에서 축적한 경험을 바탕으로 시청자 중심의 창의적 솔루션을 제시하며, 브랜드 가치 향상과 사용자 경험 개선을 통해 measurable한 성과를 달성합니다.
                  </EditableText>
                </div>

                {/* Right Column - Services */}
                <div className="lg:col-span-6">
                  <div className="space-y-4">
                    <div>
                      <EditableText
                        textKey="service1Title"
                        className={`${FONT_SIZES.body} font-medium text-gray-900 mb-2`}
                      >
                        콘텐츠 기획, 제작
                      </EditableText>
                      <EditableText
                        textKey="service1Description"
                        className={`text-gray-600 ${FONT_SIZES.small} leading-relaxed`}
                        isTextArea={true}
                        style={{
                          minHeight: "60px",
                          width: "100%",
                          resize: "vertical"
                        }}
                      >
                        시청자 데이터와 시청환경 분석을 바탕으로 한 전략적 기획력과 촬영·편집·조명·미술까지 아우르는 올라운드 제작 역량으로 고품질 콘텐츠를 구현하여 제작비 최적화와 브랜드 가치 향상을 견인합니다.
                      </EditableText>
                    </div>

                    <div>
                      <EditableText
                        textKey="service2Title"
                        className={`${FONT_SIZES.body} font-medium text-gray-900 mb-2`}
                      >
                        프로젝트 매니지먼트
                      </EditableText>
                      <EditableText
                        textKey="service2Description"
                        className={`text-gray-600 ${FONT_SIZES.small} leading-relaxed`}
                        isTextArea={true}
                        style={{
                          minHeight: "60px",
                          width: "100%",
                          resize: "vertical"
                        }}
                      >
                        콘텐츠 제작 전문성과 IT 기술 활용 능력을 결합해 창작과 기술의 경계를 넘나들며, 혁신적인 제작 워크플로우 구축을 통해 프로젝트 성과를 극대화합니다.
                      </EditableText>
                    </div>

                    <div>
                      <EditableText
                        textKey="service3Title"
                        className={`${FONT_SIZES.body} font-medium text-gray-900 mb-2`}
                      >
                        온, 오프라인 콘텐츠 운영
                      </EditableText>
                      <EditableText
                        textKey="service3Description"
                        className={`text-gray-600 ${FONT_SIZES.small} leading-relaxed`}
                        isTextArea={true}
                        style={{
                          minHeight: "60px",
                          width: "100%",
                          resize: "vertical"
                        }}
                      >
                        라이브 콘텐츠를 직접 운영하며 출연자 관리와 제작 능력을 기반으로 한 기술적 이슈 대응을 통해 1년간 NPS 4.5 이상의 안정적인 성과를 달성합니다.
                      </EditableText>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-4 border-t border-gray-100">
                <div>
                  <h5
                    className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}
                  >
                    전문 분야
                  </h5>
                  <p
                    className={`text-gray-900 font-medium ${FONT_SIZES.small}`}
                  >콘텐츠 기획, 제작, 운영</p>
                </div>

                <div>
                  <h5
                    className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}
                  >
                    활동 지역
                  </h5>
                  <p
                    className={`text-gray-900 font-medium ${FONT_SIZES.small}`}
                  >
                    대한민국
                  </p>
                </div>

                <div>
                  <h5
                    className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}
                  >
                    경력
                  </h5>
                  <p
                    className={`text-gray-900 font-medium ${FONT_SIZES.small}`}
                  >
                    5+ years
                  </p>
                </div>

                <div>
                  <h5
                    className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}
                  >
                    플랫폼
                  </h5>
                  <p
                    className={`text-gray-900 font-medium ${FONT_SIZES.small}`}
                  >온라인, 오프라인 </p>
                </div>
              </div>
            </div>

            {/* Education & Career Section */}
            <div className={SPACING.sectionGap}>
              <div className="flex justify-between items-start mb-6">
                <h3 className="uppercase tracking-wide text-base font-semibold text-[#1CABE2]">
                  Education & Experience
                </h3>
                <span
                  className={`${FONT_SIZES.small} font-medium text-gray-500`}
                >
                  02
                </span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Education Section */}
                <div>
                  <h4
                    className={`${FONT_SIZES.heading} font-bold text-gray-900 mb-6`}
                  >
                    학력
                  </h4>
                  <div className="space-y-6">
                    <div className="border-l-2 pl-4" style={{ borderLeftColor: "#1CABE2" }}>
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          상명대학교(서울) 대학원(석사)
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2022.09 - 휴학중
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        감성공학과
                      </p>
                    </div>

                    <div className="border-l-2 pl-4" style={{ borderLeftColor: "#E2F0F6" }}>
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          상명대학교(서울)
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2022.08 졸업
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        컴퓨터과학과
                      </p>
                    </div>

                    <div className="border-l-2 pl-4" style={{ borderLeftColor: "#E2F0F6" }}>
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          한국애니메이션고등학교
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2010.07 - 2013.02
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        주전공: 영상연출과 | 부전공: 컴퓨터게임제작과
                      </p>
                    </div>
                  </div>
                </div>

                {/* Career Section */}
                <div>
                  <h4
                    className={`${FONT_SIZES.heading} font-bold text-gray-900 mb-6`}
                  >
                    주요 경력
                  </h4>
                  <div className="space-y-6">
                    <div className="border-l-2 pl-4" style={{ borderLeftColor: "#1CABE2" }}>
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          삼성 멀티캠퍼스
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2022.07 - 재직중
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        Professional
                      </p>
                      <div className={`text-gray-500 mt-2 ${FONT_SIZES.small}`}>
                        온, 오프라인 캠페인 기획, 운영, 제작 총괄, 라이브, 벤더사 및 클라이언트 관리
                      </div>
                    </div>

                    <div className="border-l-2 pl-4" style={{ borderLeftColor: "#E2F0F6" }}>
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          Snapask Korea
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2022.01 - 2022.07
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        Assistant Production Manager
                      </p>
                      <div className={`text-gray-500 mt-2 ${FONT_SIZES.small}`}>
                        교육 콘텐츠 기획·제작, 현장 촬영·연출, 편집·배포
                      </div>
                    </div>

                    <div className="border-l-2 pl-4" style={{ borderLeftColor: "#E2F0F6" }}>
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          프리랜서
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2019.01 - 2020.01
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        영상 제작·PD/편집자·콘텐츠기획{" "}
                      </p>
                      <div className={`text-gray-500 mt-2 ${FONT_SIZES.small}`}>
                        B2B 콘텐츠 기획·연출·제작, 촬영·조명·후반작업 전반
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              {/* 스킬/자격/언어 Section */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h4 className={`${FONT_SIZES.heading} font-bold text-gray-900 mb-6`}>
                  스킬/자격/언어
                </h4>
                
                {/* Core Skills Grid */}
                <div className="flex flex-wrap gap-3">
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>캠페인 기획, 전략 수립</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>미디어 콘텐츠 기획, 연출, 제작</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>프로젝트 매니지먼트</span>
                   <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>온,오프라인 캠페인 진행,운영</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>데이터 분석</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>Snowflake</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>Python</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>Premier Pro</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>DaVinci Resolve</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>After Effect</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>DaVinci Resolve</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>Photoshop</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>ComfyUI</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>Java</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>웹 콘텐츠 제작</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>콘텐츠 기획</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>정보처리기사</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>Midjourney</span>
                  <span className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full ${FONT_SIZES.small} font-medium`}>영어 (업무 수준)</span>
                </div>
              </div>
            </div>

            {/* Featured Work Section */}
            <div className={SPACING.sectionGap} data-section="work">
              <div className="flex justify-between items-start mb-6">
                <h3 className="uppercase tracking-wide text-base font-semibold text-[#1CABE2]">
                  MAIN PROJECT
                </h3>
                <span
                  className={`${FONT_SIZES.small} font-medium text-gray-500`}
                >
                  03
                </span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Portfolio Grid - Horizontal Scrollable Layout */}
              <div 
                className="overflow-x-auto overflow-y-hidden mb-8 cursor-grab active:cursor-grabbing"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const slider = e.currentTarget;
                  const startX = e.pageX - slider.offsetLeft;
                  const scrollLeft = slider.scrollLeft;
                  
                  const handleMouseMove = (e: MouseEvent) => {
                    const x = e.pageX - slider.offsetLeft;
                    const walk = (x - startX) * 2;
                    slider.scrollLeft = scrollLeft - walk;
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                    slider.classList.remove('cursor-grabbing');
                    slider.classList.add('cursor-grab');
                  };
                  
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                  slider.classList.remove('cursor-grab');
                  slider.classList.add('cursor-grabbing');
                }}
                style={{ 
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >

                <div className="flex gap-8 pb-4" style={{ width: 'max-content' }}>
                  {portfolioItems.slice(0, 5).map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="group cursor-pointer flex-shrink-0"
                      style={{ width: '320px' }}
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        // 드래그 중이 아닐 때만 모달 열기
                        if (!e.currentTarget.closest('[data-dragging="true"]')) {
                          openProjectModal(item);
                        }
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {/* 프로젝트 이미지 카드 */}
                      <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[4/3]">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                          draggable="false"
                        />
                        {/* 호버 오버레이 */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
                          <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span
                              className={`company block ${FONT_SIZES.small} opacity-90 font-medium drop-shadow-lg`}
                            >
                              {item.description.split("\n")[0]}
                            </span>
                            <span
                              className={`content block ${FONT_SIZES.subheading} font-medium drop-shadow-lg`}
                            >
                              {item.description.split("\n")[1]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            <div className={SPACING.sectionGap} data-section="gallery">
              <div className="flex justify-between items-start mb-6">
                <h3 className="uppercase tracking-wide text-base font-semibold text-[#1CABE2]">
                  VISUAL GALLERY
                </h3>
                <span
                  className={`${FONT_SIZES.small} font-medium text-gray-500`}
                >
                  04
                </span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Gallery Grid - Masonry Layout (Pinterest style) */}
              <div className="columns-2 md:columns-4 gap-4 mb-8 space-y-4">
                {galleryItems.map((item, index) => {
                  // 다양한 높이 패턴 생성 (rem 단위 사용) - 높이 증가
                  const heightVariants = [
                    "h-[16rem]",
                    "h-[26rem]",
                    "h-[18rem]",
                    "h-[24rem]",
                    "h-[14rem]",
                    "h-[28rem]",
                    "h-[43rem]",
                  ];
                  const randomHeight =
                    heightVariants[index % heightVariants.length];

                  return (
                    <motion.div
                      key={`gallery-${item.id}`}
                      className={`group cursor-pointer break-inside-avoid mb-4 ${randomHeight}`}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => openGalleryLightbox(item)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {/* 갤러리 이미지 카드 */}
                      <div className="relative overflow-hidden bg-gray-100 rounded-lg w-full h-full">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                        />
                        {/* 호버 오버레이 */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
                          <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span
                              className={`company block ${FONT_SIZES.small} opacity-90 font-medium drop-shadow-lg`}
                            >
                              {item.client}
                            </span>
                            <span
                              className={`content block ${FONT_SIZES.subheading} font-medium drop-shadow-lg`}
                            >
                              {item.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-0" data-section="contact">
              <div className="flex justify-between items-start mb-6">
                <h3 className="uppercase tracking-wide text-base font-semibold text-[#1CABE2]">Keep going</h3>
                <span
                  className={`${FONT_SIZES.small} font-medium text-gray-500`}
                >
                  05
                </span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* MAKE IT BETTER Section */}
              <div className="bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[500px]">
                  {/* Left Column - Image */}
                  <div className="relative">
                    <div className="w-full h-full bg-gray-100 overflow-hidden">
                      <img
                        src={ContactWorkspaceImage}
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                        alt="Professional Content Production Workspace"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Right Column - Content */}
                  <div className="p-8 lg:p-16 flex flex-col justify-center bg-[#ffffff]" style={{ color: COLORS.text.light }}>
                    <motion.h3
                      className="font-light mb-4"
                      style={{
                        fontFamily: "'Noto Sans', sans-serif",
                        fontWeight: "300",
                        fontSize: "3.5rem",
                        lineHeight: "1.1",
                        letterSpacing: "0.05em",
                        marginBottom: "2rem",
                        color: "#1cabe2",
                      }}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      &gt; AWAYS THINK<br />MAKE BETTER
                    </motion.h3>

                    <div
                      className="text-gray-700 leading-relaxed mb-4"
                      style={{
                        fontFamily: "'Noto Sans', sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      <p className={`${FONT_SIZES.small} mb-2 font-normal`} style={{ color: COLORS.text.light }}>저는 제작 역량을 기반으로 기획부터 연출, 촬영, 편집, 사용자 경험까지 모든 과정에서 '무엇을, 어떻게' 보여줄지를 고민해왔습니다.</p>
                      <p className={`${FONT_SIZES.small} mb-2 font-normal`} style={{ color: COLORS.text.light }}>심리를 설계하고, 이탈 데이터를 분석해 UI 개선을 제안했으며, AI 툴을 활용해 제작 속도와 품질을 동시에 끌어올렸습니다. 감성과 전략, 창의성과 기술을 넘나들며 종합적인 콘텐츠 구조를 설계하는 콘텐츠 크리에이터로 성장해왔으며, 앞으로도 명확한 메시지를 중심에 둔 콘텐츠를 만들어가겠습니다.</p>
                    </div>

                    <a
                      href="mailto:buen136003@gmail.com"
                      className={`inline-block text-gray-900 hover:text-gray-700 transition-colors underline ${FONT_SIZES.body} font-light`}
                      style={{
                        fontFamily: "'Noto Sans', sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      Contact With Me
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="pt-[35px] pb-[16px]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Separator Line - Same as other sections */}
            <div className="separator-wrap mb-4">
              <div className="separator-line h-px bg-gray-200"></div>
            </div>

            {/* Footer Content - Flexbox Layout for Perfect Center Alignment */}
            <div className="flex items-center justify-between">
              {/* Left - Back to top */}
              <div className="flex-1">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className={`text-gray-500 hover:text-gray-700 transition-colors cursor-pointer ${FONT_SIZES.small}`}
                >
                  Back to top ↑
                </button>
              </div>

              {/* Center - Copyright */}
              <div className="flex-1 text-center">
                <p className={`text-gray-500 ${FONT_SIZES.small}`}>© LEESEUNGHUN 2025</p>
              </div>

              {/* Right - Email */}
              <div className="flex-1 text-right">
                <a
                  href="mailto:buen136003@gmail.com"
                  className={`text-gray-500 hover:text-gray-700 transition-colors ${FONT_SIZES.small}`}
                >
                  buen136003@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Gallery Lightbox Modal */}
      {selectedGalleryItem && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-[999999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosingGallery ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.modal }}
          onClick={closeGalleryModal}
        >
          {/* Close Button */}
          <button
            onClick={closeGalleryModal}
            className="absolute top-6 right-6 z-[9999999] text-white hover:text-gray-300 transition-all duration-200 text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
            aria-label="Close gallery"
          >
            ×
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateGallery("prev");
            }}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-[9999999] text-white hover:text-gray-300 transition-all duration-200 text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
            aria-label="Previous image"
            disabled={galleryItems.length <= 1}
          >
            ←
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateGallery("next");
            }}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-[9999999] text-white hover:text-gray-300 transition-all duration-200 text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
            aria-label="Next image"
            disabled={galleryItems.length <= 1}
          >
            →
          </button>

          {/* Main Image Container */}
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: isClosingGallery ? 0.9 : 1,
              opacity: isClosingGallery ? 0 : 1,
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: ANIMATION_DURATIONS.modal }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            {galleryItems[currentGalleryIndex] && (
              <>
                <img
                  src={galleryItems[currentGalleryIndex].src}
                  alt={galleryItems[currentGalleryIndex].alt}
                  className="max-w-full max-h-full object-contain transition-opacity duration-300"
                  loading="lazy"
                  decoding="async"
                />

                {/* Image Info Overlay - Bottom Left */}
                <div className="absolute bottom-6 left-6 text-white max-w-sm">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-1">
                      {galleryItems[currentGalleryIndex].title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {galleryItems[currentGalleryIndex].client}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {galleryItems[currentGalleryIndex].description}
                    </p>
                  </div>
                </div>

                {/* Image Counter - Bottom Right */}
                <div className="absolute bottom-6 right-6 text-white">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-sm font-medium">
                      {currentGalleryIndex + 1} of {galleryItems.length}
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
      {/* 프로젝트 모달 - 이전 코드 구조 적용 */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl relative tracking-tight leading-relaxed overflow-hidden">
            <div className="h-full overflow-y-scroll">
              <div className="px-8 lg:px-16 pb-2 pt-16">
                {/* Back 버튼 */}
                <div className="mb-8">
                  <button 
                    onClick={closeProjectModal}
                    className="text-sm text-[#58534e] hover:text-[#282623] transition-colors flex items-center gap-1"
                  >
                    ← Back To All Work
                  </button>
                </div>

                {/* 제목 및 기본 정보 */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                      <h1 className="text-4xl lg:text-5xl text-[#282623] leading-tight mb-0 font-semibold">
                        <AdvancedEditableText
                          textKey={`project-${selectedProject.id}-title`}
                          className="text-4xl lg:text-5xl text-[#282623] leading-tight font-semibold"
                          style={{
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            lineHeight: "1.2",
                            fontWeight: "600",
                            color: "#282623"
                          }}
                        >
                          {selectedProject.title}
                        </AdvancedEditableText>
                      </h1>
                    </div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <h5 className="opacity-50 text-base font-normal mb-2">Categories</h5>
                        <AdvancedEditableText
                          textKey={`project-${selectedProject.id}-category`}
                          className="text-sm text-[#282623]"
                          style={{
                            fontSize: TYPOGRAPHY.fontSize.small,
                            color: "#282623"
                          }}
                        >
                          {selectedProject.category || "콘텐츠 기획·제작"}
                        </AdvancedEditableText>
                      </div>
                      <div>
                        <h5 className="opacity-50 text-base font-normal mb-2">Client</h5>
                        <AdvancedEditableText
                          textKey={`project-${selectedProject.id}-client`}
                          className="text-sm text-[#282623]"
                          style={{
                            fontSize: TYPOGRAPHY.fontSize.small,
                            color: "#282623"
                          }}
                        >
                          {selectedProject.client}
                        </AdvancedEditableText>
                      </div>
                      <div>
                        <h5 className="opacity-50 text-base font-normal mb-2">Role</h5>
                        <AdvancedEditableText
                          textKey={`project-${selectedProject.id}-role`}
                          className="text-sm text-[#282623]"
                          style={{
                            fontSize: TYPOGRAPHY.fontSize.small,
                            color: "#282623"
                          }}
                        >
                          {selectedProject.role}
                        </AdvancedEditableText>
                      </div>
                    </div>
                    <div>
                      {selectedProject.id === "1" && (
                        <AdvancedEditableText
                          textKey={`project-${selectedProject.id}-description`}
                          className="text-[#282623] text-sm tracking-tight leading-relaxed"
                          isTextArea={true}
                          style={{
                            fontSize: TYPOGRAPHY.fontSize.small,
                            lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                            color: "#282623",
                            minHeight: "80px",
                            width: "100%"
                          }}
                        >
                          삼성 그룹의 온·오프라인 캠페인 기획·진행 프로젝트를 담당했습니다. 진행과 동시에 콘텐츠 제작 기반의 기술 이슈 대응, 커뮤니케이션을 주도하여 고객 만족도 NPS 4.5+를 달성하였습니다.
                        </AdvancedEditableText>
                      )}
                      {selectedProject.id === "2" && (
                        <AdvancedEditableText
                          textKey={`project-${selectedProject.id}-description`}
                          className="text-[#282623] text-sm tracking-tight leading-relaxed"
                          isTextArea={true}
                          style={{
                            fontSize: TYPOGRAPHY.fontSize.small,
                            lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                            color: "#282623",
                            minHeight: "80px",
                            width: "100%"
                          }}
                        >
                          Snapask의 프리미엄 교육 콘텐츠를 위한 영상 제작 프로젝트로, 학습 효과를 극대화하는 교육용 영상 콘텐츠를 기획하고 제작했습니다. 사용자 중심의 UX를 고려한 영상 구성과 인터랙티브 요소를 통해 학습 참여도를 높이고 교육 성과를 개선했습니다.
                        </AdvancedEditableText>
                      )}
                      {selectedProject.id === "3" && (
                        <AdvancedEditableText
                          textKey={`project-${selectedProject.id}-description`}
                          className="text-[#282623] text-sm tracking-tight leading-relaxed"
                          isTextArea={true}
                          style={{
                            fontSize: TYPOGRAPHY.fontSize.small,
                            lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                            color: "#282623",
                            minHeight: "80px",
                            width: "100%"
                          }}
                        >
                          사용자 행동 분석을 통한 맞춤형 캠페인 기획,전략을 수립했습니다. 메세지 전달을 위한 컴퓨터 디스플레이를 활용한 연출 기법을 활용하여 콘텐츠를 제작하고, 경쟁사 대비 30% 높은 단가임에도 불구하고 수주에 성공하여 가치를 입증했습니다.
                        </AdvancedEditableText>
                      )}
                      {selectedProject.id === "4" && (
                        <AdvancedEditableText
                          textKey={`project-${selectedProject.id}-description`}
                          className="text-[#282623] text-sm tracking-tight leading-relaxed"
                          isTextArea={true}
                          style={{
                            fontSize: TYPOGRAPHY.fontSize.small,
                            lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                            color: "#282623",
                            minHeight: "80px",
                            width: "100%"
                          }}
                        >
                          Jinair의 베트남 인플루언서 프로모션 콘텐츠 제작을 통해 현지 시장에 맞춤화된 마케팅 콘텐츠를 기획하고 제작했습니다. 문화적 특성을 고려한 크리에이티브 전략으로 브랜드 인지도를 높이고 현지 고객들의 관심을 성공적으로 유도했습니다.
                        </AdvancedEditableText>
                      )}
                      {selectedProject.id === "5" && (
                        <AdvancedEditableText
                          textKey={`project-${selectedProject.id}-description`}
                          className="text-[#282623] text-sm tracking-tight leading-relaxed"
                          isTextArea={true}
                          style={{
                            fontSize: TYPOGRAPHY.fontSize.small,
                            lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                            color: "#282623",
                            minHeight: "80px",
                            width: "100%"
                          }}
                        >
                          AI를 활용한 '익숙한 일상 공간의 게임화' 컨셉으로 메타버스 기반 디지털 캠페인을 기획·제작했습니다. 데이터 분석을 통한 문제 진단부터 창의적 솔루션 설계, 실시간 최적화 운영까지 전 과정을 담당하며 5개 고객사 수주 성과를 달성했습니다.
                        </AdvancedEditableText>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 메인 콘텐츠 */}
              <div className="px-8 lg:px-16 pb-12">


                {/* 추가 이미지 갤러리 - 1번 프로젝트 전용 */}
                {selectedProject.id === "1" && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <h3 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        이미지
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src={SamsungPresentationImage} 
                          alt="삼성 프레젠테이션 발표 현장"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: samsung-presentation.png")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src={SamsungEventStageImage} 
                          alt="삼성 이벤트 무대 발표 현장"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: samsung-event-stage.png")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src={OverseasEventImage} 
                          alt="해외 이벤트 진행"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: overseas-event.jpg")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src={OnlineEventImage} 
                          alt="온라인 이벤트 기획"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: online-event.jpg")}
                        />
                      </div>
                    </div>
                    <div className="text-center mb-8">
                      <p className="text-sm text-[#58534e] italic">온·오프라인 통합 운영 및 기술 지원 활동</p>
                    </div>
                  </div>
                )}

                {/* 추가 이미지 갤러리 - 2번 프로젝트 전용 */}
                {selectedProject.id === "2" && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <h3 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        이미지
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/snapask-1.png" 
                          alt="Snapask 콘텐츠 제작 과정"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: snapask-1.png")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/snapask-2.png" 
                          alt="Snapask 영상 편집"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: snapask-2.png")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/snapask-3.png" 
                          alt="Snapask 품질 관리"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: snapask-3.png")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/snapask-4.png" 
                          alt="Snapask 최종 결과물"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: snapask-4.png")}
                        />
                      </div>
                    </div>
                    <div className="text-center mb-8">
                      <p className="text-sm text-[#58534e] italic">프리미엄 콘텐츠 제작 과정 및 품질 관리</p>
                    </div>
                  </div>
                )}

                {/* 추가 이미지 갤러리 - 3번 프로젝트 전용 */}
                {selectedProject.id === "3" && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <h3 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        이미지
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/samsung-education-filming.jpg" 
                          alt="Samsung 교육 콘텐츠 기획"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: samsung-education-filming.jpg")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/samsung-education-multiscreen.jpg" 
                          alt="Samsung 교육 콘텐츠 실행"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: samsung-education-multiscreen.jpg")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/samsung-education-screenlife.jpg" 
                          alt="Samsung 교육 시스템 구축"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: samsung-education-screenlife.jpg")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/samsung-education-studio.jpg" 
                          alt="Samsung 교육 성과 분석"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: samsung-education-studio.jpg")}
                        />
                      </div>
                    </div>
                    <div className="text-center mb-8">
                      <p className="text-sm text-[#58534e] italic">교육 콘텐츠 기획 및 제작 과정</p>
                    </div>
                  </div>
                )}

                {/* 추가 이미지 갤러리 - 4번 프로젝트 전용 */}
                {selectedProject.id === "4" && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <h3 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        이미지
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/jinair-new-1.png" 
                          alt="Jinair 프로모션 콘텐츠 기획"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: jinair-new-1.png")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/jinair-new-2.png" 
                          alt="Jinair 마케팅 전략"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: jinair-new-2.png")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/jinair-new-3.png" 
                          alt="Jinair 콘텐츠 제작"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: jinair-new-3.png")}
                        />
                      </div>
                      <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg relative">
                        <img 
                          src="/assets/projects/jinair-new-4.png" 
                          alt="Jinair 성과 분석"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error("이미지 로딩 실패:", e.currentTarget.src);
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                          }}
                          onLoad={() => console.log("이미지 로딩 성공: jinair-new-4.png")}
                        />
                      </div>
                    </div>
                    <div className="text-center mb-8">
                      <p className="text-sm text-[#58534e] italic">베트남 인플루언서 프로모션 기획 및 제작</p>
                    </div>
                  </div>
                )}

                {/* 메타버스 프로젝트 전용 상세 모달 */}
                {selectedProject.id === "5" && (
                  <div className="mb-12">
                    {/* 1. 프로젝트 기간 */}
                    <div className="mb-8">
                      <h3 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">1</span>
                        프로젝트 기간
                      </h3>
                      <div>
                        <span className="text-sm text-[#282623] tracking-tight leading-relaxed" style={{ fontSize: "14px", color: "rgb(40, 38, 35)", lineHeight: "1.6", letterSpacing: "0px", fontFamily: "inherit", fontWeight: "400" }}>
                          2023.02 - 2023.08 (8개월)
                        </span>
                      </div>
                    </div>

                    {/* 2. 이미지 */}
                    <div className="mb-8">
                      <h3 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">2</span>
                        프로젝트 상세
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <img 
                            src="/assets/projects/Gather_01.png"
                            alt="Gather 메타버스 환경 1"
                            className="w-full h-auto rounded-lg mb-3"
                          />
                          <p className="text-sm text-[#6b7280] text-center">Gather 메타버스 환경 1</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <img 
                            src="/assets/projects/Gather_02.png"
                            alt="Gather 메타버스 환경 2"
                            className="w-full h-auto rounded-lg mb-3"
                          />
                          <p className="text-sm text-[#6b7280] text-center">Gather 메타버스 환경 2</p>
                        </div>
                      </div>
                      
                      {/* Gather 서비스 설명 */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-4">
                        <p className="text-sm text-[#58534e] leading-relaxed">
                          <strong className="text-[#282623]">Gather:</strong> 픽셀 아트 스타일의 2D 메타버스 플랫폼으로 오피스, 카페 등 일상 공간을 가상으로 재현하여 아바타 기반 실시간 소통을 지원
                        </p>
                      </div>
                    </div>

                    {/* 3. 내용 */}
                    <div className="mb-8">
                      <h3 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">3</span>
                        내용
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="text-sm font-medium text-[#282623] mb-3">1. 데이터 기반 문제 진단</h4>
                          <p className="text-sm text-[#58534e] leading-relaxed">
                            사용자 행동 로그를 분석해 기존 온라인 교육의 형식적 참여 패턴을 도출하고, 진성 참여와 형식적 참여를 구분하는 지표 개발
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="text-sm font-medium text-[#282623] mb-3">2. 창의적 솔루션 설계</h4>
                          <p className="text-sm text-[#58534e] leading-relaxed">
                            친숙함과 호기심을 동시에 자극하는 메타버스 환경을 만들어 초기 진입 장벽은 낮추고 지속적인 탐험 동기는 높임
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="text-sm font-medium text-[#282623] mb-3">3. 실시간 최적화 운영</h4>
                          <p className="text-sm text-[#58534e] leading-relaxed">
                            자동화 대신 진행자가 직접 소통하며 참가자 반응을 즉시 파악하고 몰입도를 지속적으로 관리
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 4. 역할 */}
                    <div className="mb-8">
                      <h3 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">4</span>
                        역할
                      </h3>
                      <div className="space-y-6">
                        {/* 데이터 분석 관점 */}
                        <div>
                          <h4 className="text-sm font-medium text-[#282623] mb-3 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            데이터 분석 관점 - 근본 문제 발견
                          </h4>
                          <div className="ml-4 space-y-2">
                            <div className="text-sm text-[#58534e] leading-relaxed">
                              <span className="font-medium text-[#282623]">1.</span> 사용자 행동 로그 분석 → 온라인 캠페인 참여도 편차가 심해 기존 평균값이나 중위값으로는 실제 관심도를 측정할 수 없음을 확인
                            </div>
                            <div className="text-sm text-[#58534e] leading-relaxed">
                              <span className="font-medium text-[#282623]">2.</span> 설문조사 임의 체크, 교육 콘텐츠 빠른 스킵 등 형식적 참여 패턴을 수치로 확인하여 진성 참여 유도 전략의 필요성 도출
                            </div>
                          </div>
                        </div>

                        {/* 콘텐츠 제작 관점 */}
                        <div>
                          <h4 className="text-sm font-medium text-[#282623] mb-3 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            콘텐츠 제작 관점 - 혁신적 환경 구현
                          </h4>
                          <div className="ml-4 space-y-2">
                            <div className="text-sm text-[#58534e] leading-relaxed">
                              <span className="font-medium text-[#282623]">1.</span> Python, ComfyUI, Midjourney, Stable Diffusion을 활용해 사무실, 카페 등 친숙한 일상 공간에 퀘스트 요소를 자연스럽게 결합한 메타버스 맵 직접 제작
                            </div>
                            <div className="text-sm text-[#58534e] leading-relaxed">
                              <span className="font-medium text-[#282623]">2.</span> 완전히 새로운 공간이 아닌 '변화된 일상'을 통해 초기 진입 장벽은 낮추면서 지속적인 탐험 동기는 제공하는 UX 설계
                            </div>
                          </div>
                        </div>

                        {/* 현장 운영 관점 */}
                        <div>
                          <h4 className="text-sm font-medium text-[#282623] mb-3 flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            현장 운영 관점 - 실시간 소통 최적화
                          </h4>
                          <div className="ml-4">
                            <div className="text-sm text-[#58534e] leading-relaxed">
                              퀘스트를 자동화하지 않고 진행자가 직접 실시간 소통으로 참가자 반응을 즉시 파악하고 온라인 캠페인, 행사 호응 유도
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 메타버스 프로젝트 주요 성과 */}
                    {selectedProject.id === "5" && (
                      <div className="mb-8">
                        <h3 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                          <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">5</span>
                          주요 성과
                        </h3>
                        <div className="space-y-5">
                          <div>
                            <AdvancedEditableText
                              textKey={`project-${selectedProject.id}-achievement-1-title`}
                              className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                              style={{
                                fontSize: TYPOGRAPHY.fontSize.small,
                                color: "#282623",
                                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                fontWeight: "400",
                                display: "block",
                                marginBottom: "8px"
                              }}
                            >
                              • NH농협, 삼성교육재단, 한국증권 등 5개 고객사 수주
                            </AdvancedEditableText>
                          </div>
                          
                          <div>
                            <AdvancedEditableText
                              textKey={`project-${selectedProject.id}-achievement-2-title`}
                              className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                              style={{
                                fontSize: TYPOGRAPHY.fontSize.small,
                                color: "#282623",
                                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                fontWeight: "400",
                                display: "block",
                                marginBottom: "8px"
                              }}
                            >
                              • AI를 '익숙한 일상 공간의 게임화' 컨셉으로 현실 기반 가상공간 구축
                            </AdvancedEditableText>
                            <AdvancedEditableText
                              textKey={`project-${selectedProject.id}-achievement-2-desc`}
                              className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 block"
                              style={{
                                fontSize: TYPOGRAPHY.fontSize.small,
                                color: "#58534e",
                                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                marginLeft: "16px",
                                display: "block"
                              }}
                            >
                              AI 기반 메타버스 환경 구현으로 기존 온라인 이벤트 대비 향상된 참여도 달성
                            </AdvancedEditableText>
                          </div>
                          
                          <div>
                            <AdvancedEditableText
                              textKey={`project-${selectedProject.id}-achievement-3-title`}
                              className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                              style={{
                                fontSize: TYPOGRAPHY.fontSize.small,
                                color: "#282623",
                                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                fontWeight: "400",
                                display: "block",
                                marginBottom: "8px"
                              }}
                            >
                              • 미국 본사 및 자사 영업/운영/IT 부서와 개인화 데이터 수집 API 연동 협의로 기존 데이터에서 추가 인사이트 도출
                            </AdvancedEditableText>
                            <AdvancedEditableText
                              textKey={`project-${selectedProject.id}-achievement-3-desc`}
                              className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 block"
                              style={{
                                fontSize: TYPOGRAPHY.fontSize.small,
                                color: "#58534e",
                                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                marginLeft: "16px",
                                display: "block"
                              }}
                            >
                              기존 데이터와 신규 메타버스 데이터를 결합하여 고객 행동 패턴 분석 정확도 향상
                            </AdvancedEditableText>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* 주요 성과 */}
                <div className="mb-12">
                  <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                    <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                      <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">1</span>
                      주요 성과
                    </h2>
                  </div>
                  <div className="space-y-5 mb-8">
                    {selectedProject.id === "1" && (
                      <>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-1-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • 고객 만족도 NPS 4.5+ 달성
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-1-desc`}
                            className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#58534e",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            30+ 온 오프라인 행사, 교육에서 일관된 고품질 서비스 제공
                          </AdvancedEditableText>
                        </div>

                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-3-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • 운영 효율성 개선
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-3-desc`}
                            className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#58534e",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            자동화 프로그램 도입으로 인력 및 시간 비용 절감
                          </AdvancedEditableText>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "2" && (
                      <>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-1-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • 제작 비용 40% 이상 단축
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-1-desc`}
                            className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#58534e",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            인하우스 제작 프로세스 전과정 직접 수행으로 획기적인 비용 효율성 달성
                          </AdvancedEditableText>
                        </div>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-2-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • 프로모션 영상 10만+ 조회, 본사 BP 사례 선정
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-2-desc`}
                            className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#58534e",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            프리미엄 교육 콘텐츠의 시장 반응 검증 및 글로벌 품질 표준 확립
                          </AdvancedEditableText>
                        </div>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-3-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • 프리미엄 교육 콘텐츠 시장 경쟁력 확보
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-3-desc`}
                            className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#58534e",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            업계 최고 수준의 영상 품질과 제작 효율성을 동시에 달성하여 시장 내 독보적 경쟁력 확보
                          </AdvancedEditableText>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "3" && (
                      <>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-1-title`}
                            className="text-sm mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: COLORS.text.primary,
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • 경쟁사 대비 30% 높은 단가로 수주 성공
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-1-desc`}
                            className="text-sm tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: COLORS.text.secondary,
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            창의적 기법과 사용자 행동 분석의 효과적 결합으로 상업적 가치 입증
                          </AdvancedEditableText>
                        </div>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-2-title`}
                            className="text-sm mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: COLORS.text.primary,
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • 5초 이내 주의 집중 유도 시스템 구축
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-2-desc`}
                            className="text-sm tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: COLORS.text.secondary,
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            사용자 행동 분석을 바탕으로 몰입도 극대화 기법 개발
                          </AdvancedEditableText>
                        </div>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-3-title`}
                            className="text-sm mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: COLORS.text.primary,
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • Screen Life 포맷 전문성 확립
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-3-desc`}
                            className="text-sm tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: COLORS.text.secondary,
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            Found Footage 기법과 결합한 차별화된 교육 콘텐츠 제작 방법론 정립
                          </AdvancedEditableText>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "4" && (
                      <>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-1-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400"
                            }}
                          >
                            • 시즌2 기획 논의 확보
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-achievement-1-desc`}
                            className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#58534e",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px"
                            }}
                          >
                            진에어 측과 후속 프로젝트 진행을 위한 시즌2 기획 논의 성공적 확보
                          </AdvancedEditableText>
                        </div>
                      </>
                    )}

                  </div>
                </div>

                {/* 주요 역할 */}
                <div className="mb-12">
                  <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                    <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                      <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">2</span>
                      주요 역할
                    </h2>
                  </div>
                  <div className="space-y-4 mb-8">
                    {selectedProject.id === "1" && (
                      <>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-1-title`}
                            className="text-sm font-medium text-[#282623] mb-4 tracking-tight leading-relaxed"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "500"
                            }}
                          >
                            실시간 행사 운영 및 기술 대응
                          </AdvancedEditableText>
                          <div className="relative pl-4 mt-4 mb-6">
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                            <AdvancedEditableText
                              textKey={`project-${selectedProject.id}-role-1-context`}
                               className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                              style={{
                                fontSize: TYPOGRAPHY.fontSize.small,
                                color: "#58534e",
                                lineHeight: TYPOGRAPHY.lineHeight.relaxed
                              }}
                            >
                              삼성 그룹 대규모 행사 → 영상, 음향, 송출 등 여러 협력사 동시 작업 → 실시간 기술 이슈 & 출연자 변수 발생
                            </AdvancedEditableText>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <AdvancedEditableText
                                textKey={`project-${selectedProject.id}-role-1-sub-1-title`}
                                 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"

                                
                                style={{
                                  fontSize: TYPOGRAPHY.fontSize.small,
                                  color: "#282623",
                                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                  fontWeight: "500",
                                  marginBottom: "16px"
                                }}
                              >
                                협력사 커뮤니케이션
                              </AdvancedEditableText>
                              <div className="space-y-2">
                                <div>
                                  <AdvancedEditableText
                                    textKey={`project-${selectedProject.id}-role-1-sub-1-item-1-title`}
                                    className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                    style={{
                                      fontSize: TYPOGRAPHY.fontSize.small,
                                      color: "#58534e",
                                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                      display: "block",
                                      marginBottom: "4px"
                                    }}
                                  >
                                    • 영상: 앵글, 트랜지션 품질 확보

                                  </AdvancedEditableText>
                              
                                </div>
                                <div>
                                  <AdvancedEditableText
                                    textKey={`project-${selectedProject.id}-role-1-sub-1-item-2-title`}
                                    className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                    style={{
                                      fontSize: TYPOGRAPHY.fontSize.small,
                                      color: "#58534e",
                                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                      display: "block",
                                      marginBottom: "4px"
                                    }}
                                  >
                                    • 음향: 밸런스 조정 및 품질 관리
                                  </AdvancedEditableText>

                                </div>
                                <div>
                                  <AdvancedEditableText
                                    textKey={`project-${selectedProject.id}-role-1-sub-1-item-3-title`}
                                    className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                    style={{
                                      fontSize: TYPOGRAPHY.fontSize.small,
                                      color: "#58534e",
                                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                      display: "block",
                                      marginBottom: "4px"
                                    }}
                                  >
                                    • 송출: 실시간 기술 이슈 대응
                                  </AdvancedEditableText>

                                </div>
                              </div>
                            </div>
                            <div>
                              <AdvancedEditableText
                                textKey={`project-${selectedProject.id}-role-1-sub-2-title`}
                                 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                                style={{
                                  fontSize: TYPOGRAPHY.fontSize.small,
                                  color: "#282623",
                                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                  fontWeight: "500",
                                  marginBottom: "16px"
                                }}
                              >
                                돌발 상황 대응
                              </AdvancedEditableText>
                              <div className="space-y-2">
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-1-sub-2-item-1`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block",
                                    marginBottom: "8px"
                                  }}
                                >
                                  • 출연자 지각, 건강 이상 등
                                </AdvancedEditableText>
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-1-sub-2-item-2`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block",
                                    marginBottom: "8px"
                                  }}
                                >
                                  • 큐시트 실시간 수정
                                </AdvancedEditableText>
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-1-sub-2-item-3`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block"
                                  }}
                                >
                                  • 직접 대체 진행 수행
                                </AdvancedEditableText>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-2-title`}
                            className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "500"
                            }}
                          >
                            콘텐츠 제작 및 자동화 시스템 개발
                          </AdvancedEditableText>
                          <div className="relative pl-4 mt-4 mb-6">
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                            <AdvancedEditableText
                              textKey={`project-${selectedProject.id}-role-2-context`}
                              className="text-sm text-[#58534e] tracking-tight leading-relaxed"
                              style={{
                                fontSize: TYPOGRAPHY.fontSize.small,
                                color: "#58534e",
                                lineHeight: TYPOGRAPHY.lineHeight.relaxed
                              }}
                            >
                              행사별 다양한 그래픽 필요 + 송출 타이밍 오류 = 행사 품질 직접 영향 → 효율적 제작 & 자동화 필요
                            </AdvancedEditableText>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <AdvancedEditableText
                                textKey={`project-${selectedProject.id}-role-2-sub-1-title`}
                                className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                style={{
                                  fontSize: TYPOGRAPHY.fontSize.small,
                                  color: "#282623",
                                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                  fontWeight: "500",
                                  marginBottom: "16px"
                                }}
                              >
                                그래픽 제작 시스템
                              </AdvancedEditableText>
                              <div className="space-y-2">
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-2-sub-1-item-1`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block",
                                    marginBottom: "8px"
                                  }}
                                >
                                  • Midjourney, Stable Diffusion ComfyUI 활용
                                </AdvancedEditableText>
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-2-sub-1-item-2`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block",
                                    marginBottom: "8px"
                                  }}
                                >
                                  • Python , 오픈소스 (Pulid, Ipadater, Flux) 활용 후보정
                                </AdvancedEditableText>
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-2-sub-1-item-3`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block"
                                  }}
                                >
                                  • AI 생성 흔적 최소화 → 실사용급 완성
                                </AdvancedEditableText>
                              </div>
                            </div>
                            <div>
                              <AdvancedEditableText
                                textKey={`project-${selectedProject.id}-role-2-sub-2-title`}
                                className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                style={{
                                  fontSize: TYPOGRAPHY.fontSize.small,
                                  color: "#282623",
                                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                  fontWeight: "500",
                                  marginBottom: "16px"
                                }}
                              >
                                자동화 프로그램 (폐쇄망 환경)
                              </AdvancedEditableText>
                              <div className="space-y-2">
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-2-sub-2-item-1`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block",
                                    marginBottom: "8px"
                                  }}
                                >
                                  • Python + OCR 화면 인식 시스템 구축
                                </AdvancedEditableText>
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-2-sub-2-item-2`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block",
                                    marginBottom: "8px"
                                  }}
                                >
                                  • 화면 인식 기반 영상, 음악 송출 타이밍 자동 제어
                                </AdvancedEditableText>
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-2-sub-2-item-3`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block"
                                  }}
                                >
                                  • 수동 조작 대비 타이밍 오류 90% 감소
                                </AdvancedEditableText>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-3-title`}
                            className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "500"
                            }}
                          >
                            몰입 유도를 위한 온라인 캠페인 기획
                          </AdvancedEditableText>
                          <div className="relative pl-4 mt-4 mb-6">
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                            <AdvancedEditableText
                              textKey={`project-${selectedProject.id}-role-3-context`}
                              className="text-sm text-[#58534e] tracking-tight leading-relaxed"
                              style={{
                                fontSize: TYPOGRAPHY.fontSize.small,
                                color: "#58534e",
                                lineHeight: TYPOGRAPHY.lineHeight.relaxed
                              }}
                            >
                              기존 플랫폼 한계 (임직원 참여 데이터 확보 어려움) → 메타버스 환경에서 자연스러운 몰입 & 참여 유도 필요와 RAW DATA 확보
                            </AdvancedEditableText>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <AdvancedEditableText
                                textKey={`project-${selectedProject.id}-role-3-sub-1-title`}
                                className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                style={{
                                  fontSize: TYPOGRAPHY.fontSize.small,
                                  color: "#282623",
                                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                  fontWeight: "500",
                                  marginBottom: "16px"
                                }}
                              >
                                플랫폼 확장 기획
                              </AdvancedEditableText>
                              <div className="space-y-2">
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-3-sub-1-item-1`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block",
                                    marginBottom: "8px"
                                  }}
                                >
                                  • 외부 플랫폼 연동·상품화
                                </AdvancedEditableText>
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-3-sub-1-item-2`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block",
                                    marginBottom: "8px"
                                  }}
                                >
                                  • 실질적 임직원 참여 RAW 데이터 확보
                                </AdvancedEditableText>
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-3-sub-1-item-3`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block"
                                  }}
                                >
                                  • 현실 조직 공간 반영 맵 디자인
                                </AdvancedEditableText>
                              </div>
                            </div>
                            <div>
                              <AdvancedEditableText
                                textKey={`project-${selectedProject.id}-role-3-sub-2-title`}
                                className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                style={{
                                  fontSize: TYPOGRAPHY.fontSize.small,
                                  color: "#282623",
                                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                  fontWeight: "500",
                                  marginBottom: "16px"
                                }}
                              >
                                데이터 구조 설계
                              </AdvancedEditableText>
                              <div className="space-y-2">
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-3-sub-2-item-1`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block",
                                    marginBottom: "8px"
                                  }}
                                >
                                  • SnowFlake 기반 행동 로그 수집
                                </AdvancedEditableText>
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-3-sub-2-item-2`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block mb-2"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block",
                                    marginBottom: "8px"
                                  }}
                                >
                                  • API 연동 구조 협의
                                </AdvancedEditableText>
                                <AdvancedEditableText
                                  textKey={`project-${selectedProject.id}-role-3-sub-2-item-3`}
                                  className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                  style={{
                                    fontSize: TYPOGRAPHY.fontSize.small,
                                    color: "#58534e",
                                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                    display: "block"
                                  }}
                                >
                                  • 사용자 자율 탐색 유도
                                </AdvancedEditableText>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "2" && (
                      <>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-1-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • 프로젝트 목표
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-1-desc`}
                            className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#58534e",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            외주 제작의 한계를 극복하고 전 공정 인하우스 제작 체계를 구축하여 프리미엄 교육 콘텐츠 시장에서 차별화된 브랜드 메시지 전달 체계 구축
                          </AdvancedEditableText>
                        </div>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-2-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • 핵심 전략
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-2-desc`}
                            className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#58534e",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            인하우스 제작 체계 구축을 통한 품질 표준화 및 Python 자동화 시스템을 통한 대규모 워크플로우 최적화
                          </AdvancedEditableText>
                        </div>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-3-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400",
                              display: "block",
                              marginBottom: "8px"
                            }}
                          >
                            • 기술적 접근
                          </AdvancedEditableText>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-3-desc`}
                            className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 block"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#58534e",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              marginLeft: "16px",
                              display: "block"
                            }}
                          >
                            BMPCC 6K 시네마틱 촬영, 브랜드 전용 LUT 설계, FFmpeg 최적화를 통한 50분 분량 5개 클래스 동시 제작 시스템 구축
                          </AdvancedEditableText>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "3" && (
                      <>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-1-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400"
                            }}
                          >
                            • 사용자 행동 분석 및 대응 전략
                          </AdvancedEditableText>
                          <div className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 space-y-4">
                            <p><strong>주요 사용자 행동 패턴:</strong></p>
                            
                            {/* 사용자 행동 패턴 도식 */}
                            <div className="bg-white border border-gray-200 p-8 rounded-lg">
                              <div className="text-center mb-6">
                                <h4 className="text-sm font-medium text-[#282623] mb-2">사용자 집중도 변화 패턴</h4>
                                <p className="text-xs text-[#58534e]">교육 콘텐츠 시청 시간에 따른 집중도 하락 분석</p>
                              </div>
                              
                              <svg width="100%" height="260" viewBox="0 0 700 260" className="overflow-visible">
                                {/* 격자 배경 */}
                                <defs>
                                  <pattern id="grid" width="70" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 70 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                                  </pattern>
                                </defs>
                                <rect width="560" height="160" x="80" y="40" fill="url(#grid)"/>
                                
                                {/* 축 및 레이블 */}
                                <line x1="80" y1="200" x2="640" y2="200" stroke="#374151" strokeWidth="2"/>
                                <line x1="80" y1="200" x2="80" y2="40" stroke="#374151" strokeWidth="2"/>
                                
                                {/* 시간 축 눈금 */}
                                <line x1="150" y1="200" x2="150" y2="205" stroke="#374151" strokeWidth="1"/>
                                <text x="150" y="220" textAnchor="middle" className="text-xs fill-[#6b7280]">1분</text>
                                
                                <line x1="290" y1="200" x2="290" y2="205" stroke="#374151" strokeWidth="1"/>
                                <text x="290" y="220" textAnchor="middle" className="text-xs fill-[#6b7280]">3분</text>
                                
                                <line x1="430" y1="200" x2="430" y2="205" stroke="#374151" strokeWidth="1"/>
                                <text x="430" y="220" textAnchor="middle" className="text-xs fill-[#6b7280]">5분</text>
                                
                                <line x1="570" y1="200" x2="570" y2="205" stroke="#374151" strokeWidth="1"/>
                                <text x="570" y="220" textAnchor="middle" className="text-xs fill-[#6b7280]">7분</text>
                                
                                {/* 집중도 축 눈금 */}
                                <line x1="75" y1="60" x2="80" y2="60" stroke="#374151" strokeWidth="1"/>
                                <text x="70" y="65" textAnchor="end" className="text-xs fill-[#6b7280]">100%</text>
                                
                                <line x1="75" y1="100" x2="80" y2="100" stroke="#374151" strokeWidth="1"/>
                                <text x="70" y="105" textAnchor="end" className="text-xs fill-[#6b7280]">75%</text>
                                
                                <line x1="75" y1="140" x2="80" y2="140" stroke="#374151" strokeWidth="1"/>
                                <text x="70" y="145" textAnchor="end" className="text-xs fill-[#6b7280]">50%</text>
                                
                                <line x1="75" y1="180" x2="80" y2="180" stroke="#374151" strokeWidth="1"/>
                                <text x="70" y="185" textAnchor="end" className="text-xs fill-[#6b7280]">25%</text>
                                
                                {/* 축 레이블 */}
                                <text x="360" y="245" textAnchor="middle" className="text-sm fill-[#374151] font-medium">시간 (분)</text>
                                <text x="30" y="120" textAnchor="middle" className="text-sm fill-[#374151] font-medium" transform="rotate(-90 30 120)">집중도</text>
                                
                                {/* 곡선 - 집중도 하강 패턴 */}
                                <path 
                                  d="M 90 60 Q 140 73 200 90 Q 250 130 320 150 Q 400 170 500 175 Q 550 180 630 180" 
                                  stroke="#ef4444" 
                                  strokeWidth="3" 
                                  fill="none"
                                />
                                
                                {/* 채워진 영역 */}
                                <path 
                                  d="M 90 60 Q 140 73 200 90 Q 250 130 320 150 Q 400 170 500 175 Q 550 180 630 180 L 630 200 L 90 200 Z" 
                                  fill="#ef4444" 
                                  opacity="0.1"
                                />
                                
                                {/* 주요 포인트 도트 */}
                                <circle cx="140" cy="73" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
                                <circle cx="200" cy="90" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
                                <circle cx="320" cy="150" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
                                <circle cx="500" cy="175" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
                              </svg>
                            </div>
                            
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                              <h5 className="text-sm font-medium text-[#282623] mb-3">주요 분석 결과</h5>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">1.</span>
                                  <span className="text-[#58534e]">5초 이내 주의 집중 분산 - 초기 집중도가 급격히 감소하여 교육 효과 저하</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">2.</span>
                                  <span className="text-[#58534e]">창 최소화 및 다른 업무 처리 - 재생 중 멀티태스킹으로 인한 학습 방해</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">3.</span>
                                  <span className="text-[#58534e]">참여도 급격 하락 - 중간 지점 이후 교육 콘텐츠에 대한 흥미 상실</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">4.</span>
                                  <span className="text-[#58534e]">단순 반복 교육 회피 - 기존 교육 방식에 대한 저항 및 회피 현상</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-2-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400"
                            }}
                          >
                            • 맞춤형 교육 전략
                          </AdvancedEditableText>
                          <div className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 space-y-4">
                            <p><strong>Screen Life 솔루션 구조:</strong></p>
                            
                            {/* 솔루션 도식 */}
                            <div className="bg-white border border-gray-200 p-4 rounded-lg">
                              <div className="text-center mb-3">
                                <h4 className="text-sm font-medium text-[#282623] mb-1">Screen Life 솔루션 구조</h4>
                                <p className="text-xs text-[#58534e]">집중도 향상을 위한 4가지 핵심 전략</p>
                              </div>
                              <svg width="100%" height="220" viewBox="0 0 500 220" className="overflow-visible">
                                {/* 중앙 Screen Life 원 */}
                                <circle cx="250" cy="110" r="40" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="2"/>
                                <text x="250" y="107" textAnchor="middle" className="text-sm fill-[#374151] font-medium">Screen</text>
                                <text x="250" y="120" textAnchor="middle" className="text-sm fill-[#374151] font-medium">Life</text>
                                
                                {/* 4개 해결책 박스 */}
                                {/* 몰입도 향상 */}
                                <rect x="50" y="40" width="110" height="45" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="105" y="58" textAnchor="middle" className="text-xs fill-[#374151] font-medium">몰입도 향상</text>
                                <text x="105" y="72" textAnchor="middle" className="text-xs fill-[#6b7280]">실제 화면 활용</text>
                                <line x1="160" y1="62" x2="210" y2="85" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead1)"/>
                                
                                {/* 주의 집중 유도 */}
                                <rect x="340" y="40" width="110" height="45" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="395" y="58" textAnchor="middle" className="text-xs fill-[#374151] font-medium">주의 집중 유도</text>
                                <text x="395" y="72" textAnchor="middle" className="text-xs fill-[#6b7280]">자동 시스템</text>
                                <line x1="340" y1="62" x2="290" y2="85" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                                
                                {/* 메시지 단순화 */}
                                <rect x="50" y="135" width="110" height="45" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="105" y="153" textAnchor="middle" className="text-xs fill-[#374151] font-medium">메시지 단순화</text>
                                <text x="105" y="167" textAnchor="middle" className="text-xs fill-[#6b7280]">시각화 처리</text>
                                <line x1="160" y1="157" x2="210" y2="135" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                                
                                {/* 상호작용 증대 */}
                                <rect x="340" y="135" width="110" height="45" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="395" y="153" textAnchor="middle" className="text-xs fill-[#374151] font-medium">상호작용 증대</text>
                                <text x="395" y="167" textAnchor="middle" className="text-xs fill-[#6b7280]">참여도 향상</text>
                                <line x1="340" y1="157" x2="290" y2="135" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead4)"/>
                                
                                {/* 화살표 마커 정의 */}
                                <defs>
                                  <marker id="arrowhead1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                  <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                  <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                  <marker id="arrowhead4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                </defs>
                                
                                {/* 결과 표시 */}
                                <rect x="200" y="190" width="100" height="25" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="250" y="205" textAnchor="middle" className="text-xs fill-[#374151] font-medium">집중도 개선</text>
                                <line x1="250" y1="150" x2="250" y2="190" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead5)"/>
                                
                                <marker id="arrowhead5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                </marker>
                              </svg>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <p className="text-[#282623] font-medium">핵심 전략:</p>
                              <p>- Screen Life 포맷을 활용한 몰입도 향상</p>
                              <p>- 자동 주의 집중 유도 시스템 구축</p>
                              <p>- 복잡한 메시지의 단순화 및 시각화</p>
                              <p>- 상호작용 요소를 통한 참여도 증대</p>
                            </div>
                          </div>
                        </div>
                        <div>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "4" && (
                      <>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-1-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400"
                            }}
                          >
                            • 프로젝트 전략 구조
                          </AdvancedEditableText>
                          <div className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 space-y-4">
                            <p><strong>베트남 인플루언서 마케팅 접근법:</strong></p>
                            
                            {/* 전략 구조 도식 */}
                            <div className="bg-white border border-gray-200 p-6 rounded-lg">
                              <div className="text-center mb-4">
                                <h4 className="text-sm font-medium text-[#282623] mb-2">베트남 인플루언서 콘텐츠 제작 전략</h4>
                                <p className="text-xs text-[#58534e]">자연스러운 브랜드 노출과 현지 문화 체험의 조화</p>
                              </div>
                              
                              <svg width="100%" height="200" viewBox="0 0 600 200" className="overflow-visible">
                                {/* 중앙 핵심 전략 원 */}
                                <circle cx="300" cy="100" r="45" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="2"/>
                                <text x="300" y="95" textAnchor="middle" className="text-sm fill-[#374151] font-medium">한국 문화</text>
                                <text x="300" y="110" textAnchor="middle" className="text-sm fill-[#374151] font-medium">체험 콘텐츠</text>
                                
                                {/* 3개 전략 박스 */}
                                {/* 인플루언서 마케팅 */}
                                <rect x="50" y="30" width="120" height="50" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="110" y="50" textAnchor="middle" className="text-xs fill-[#374151] font-medium">베트남 인플루언서</text>
                                <text x="110" y="65" textAnchor="middle" className="text-xs fill-[#6b7280]">현지 마케팅</text>
                                <line x1="170" y1="55" x2="255" y2="85" stroke="#374151" strokeWidth="2" markerEnd="url(#arrow1)"/>
                                
                                {/* 현장 제작 */}
                                <rect x="430" y="30" width="120" height="50" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="490" y="50" textAnchor="middle" className="text-xs fill-[#374151] font-medium">현장 중심 제작</text>
                                <text x="490" y="65" textAnchor="middle" className="text-xs fill-[#6b7280]">유연한 대응</text>
                                <line x1="430" y1="55" x2="345" y2="85" stroke="#374151" strokeWidth="2" markerEnd="url(#arrow2)"/>
                                
                                {/* PPL 통합 */}
                                <rect x="240" y="140" width="120" height="50" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="300" y="160" textAnchor="middle" className="text-xs fill-[#374151] font-medium">자연스러운 PPL</text>
                                <text x="300" y="175" textAnchor="middle" className="text-xs fill-[#6b7280]">브랜드 통합</text>
                                <line x1="300" y1="145" x2="300" y2="140" stroke="#374151" strokeWidth="2" markerEnd="url(#arrow3)"/>
                                
                                {/* 화살표 마커 정의 */}
                                <defs>
                                  <marker id="arrow1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                  <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                  <marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                </defs>
                              </svg>
                            </div>
                            
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <h5 className="text-sm font-medium text-[#282623] mb-3">핵심 전략 포인트</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">1.</span>
                                  <span className="text-[#58534e]">베트남 현지 인플루언서의 자연스러운 한국 문화 체험</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">2.</span>
                                  <span className="text-[#58534e]">예측 불가능한 현장 상황에 대응하는 유연한 제작 방식</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">3.</span>
                                  <span className="text-[#58534e]">신라면세점·서지루텐 등 협찬 브랜드의 유기적 노출</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-2-title`}
                            className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "400"
                            }}
                          >
                            • 현장 제작 워크플로우
                          </AdvancedEditableText>
                          <div className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 space-y-4">
                            <p><strong>제작 프로세스 최적화:</strong></p>
                            
                            {/* 워크플로우 도식 */}
                            <div className="bg-white border border-gray-200 p-4 rounded-lg">
                              <div className="text-center mb-3">
                                <h4 className="text-sm font-medium text-[#282623] mb-1">현장 제작 워크플로우</h4>
                                <p className="text-xs text-[#58534e]">핸디캠 중심의 효율적 제작 과정</p>
                              </div>
                              <svg width="100%" height="140" viewBox="0 0 700 140" className="overflow-visible">
                                {/* 프로세스 단계들 */}
                                {/* 1단계 */}
                                <rect x="20" y="50" width="80" height="40" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="4"/>
                                <text x="60" y="68" textAnchor="middle" className="text-xs fill-[#374151] font-medium">현장 분석</text>
                                <text x="60" y="82" textAnchor="middle" className="text-xs fill-[#6b7280]">환경 파악</text>
                                
                                {/* 화살표 1 */}
                                <line x1="100" y1="70" x2="130" y2="70" stroke="#374151" strokeWidth="2" markerEnd="url(#flowArrow1)"/>
                                
                                {/* 2단계 */}
                                <rect x="130" y="50" width="80" height="40" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="4"/>
                                <text x="170" y="68" textAnchor="middle" className="text-xs fill-[#374151] font-medium">인플루언서</text>
                                <text x="170" y="82" textAnchor="middle" className="text-xs fill-[#6b7280]">커뮤니케이션</text>
                                
                                {/* 화살표 2 */}
                                <line x1="210" y1="70" x2="240" y2="70" stroke="#374151" strokeWidth="2" markerEnd="url(#flowArrow2)"/>
                                
                                {/* 3단계 */}
                                <rect x="240" y="50" width="80" height="40" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="4"/>
                                <text x="280" y="68" textAnchor="middle" className="text-xs fill-[#374151] font-medium">핸디캠</text>
                                <text x="280" y="82" textAnchor="middle" className="text-xs fill-[#6b7280]">촬영</text>
                                
                                {/* 화살표 3 */}
                                <line x1="320" y1="70" x2="350" y2="70" stroke="#374151" strokeWidth="2" markerEnd="url(#flowArrow3)"/>
                                
                                {/* 4단계 */}
                                <rect x="350" y="50" width="80" height="40" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="4"/>
                                <text x="390" y="68" textAnchor="middle" className="text-xs fill-[#374151] font-medium">PPL 삽입</text>
                                <text x="390" y="82" textAnchor="middle" className="text-xs fill-[#6b7280]">자연스러운 노출</text>
                                
                                {/* 화살표 4 */}
                                <line x1="430" y1="70" x2="460" y2="70" stroke="#374151" strokeWidth="2" markerEnd="url(#flowArrow4)"/>
                                
                                {/* 5단계 */}
                                <rect x="460" y="50" width="80" height="40" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="4"/>
                                <text x="500" y="68" textAnchor="middle" className="text-xs fill-[#374151] font-medium">후반 작업</text>
                                <text x="500" y="82" textAnchor="middle" className="text-xs fill-[#6b7280]">편집 완료</text>
                                
                                {/* 화살표 마커 정의 */}
                                <defs>
                                  <marker id="flowArrow1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                    <polygon points="0 0, 8 3, 0 6" fill="#374151"/>
                                  </marker>
                                  <marker id="flowArrow2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                    <polygon points="0 0, 8 3, 0 6" fill="#374151"/>
                                  </marker>
                                  <marker id="flowArrow3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                    <polygon points="0 0, 8 3, 0 6" fill="#374151"/>
                                  </marker>
                                  <marker id="flowArrow4" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                    <polygon points="0 0, 8 3, 0 6" fill="#374151"/>
                                  </marker>
                                </defs>
                              </svg>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <p className="text-[#282623] font-medium">제작 특징:</p>
                              <p>- 시네마 장비 대신 핸디캠 활용으로 자연스러운 분위기 연출</p>
                              <p>- 출연자와의 원활한 소통을 통한 협조적 촬영 환경 구축</p>
                              <p>- 현장 상황 변화에 즉시 대응 가능한 유연한 제작 방식</p>
                              <p>- 베트남 인플루언서와의 문화적 소통 및 현장 커뮤니케이션</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "5" && (
                      <>
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-1-title`}
                            className="text-sm font-medium text-[#282623] mb-4 tracking-tight leading-relaxed"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "500"
                            }}
                          >
                            AI 기반 메타버스 환경 설계
                          </AdvancedEditableText>
                          <div className="relative pl-4 mt-4 mb-6">
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                            <AdvancedEditableText
                              textKey={`project-${selectedProject.id}-role-1-context`}
                               className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                              style={{
                                fontSize: TYPOGRAPHY.fontSize.small,
                                color: "#58534e",
                                lineHeight: TYPOGRAPHY.lineHeight.relaxed
                              }}
                            >
                              각 고객사별 특성 분석 → 맞춤형 가상공간 설계 → AI 도구 활용한 콘텐츠 생성 → 게임화 요소 통합
                            </AdvancedEditableText>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <AdvancedEditableText
                                textKey={`project-${selectedProject.id}-role-1-sub-1-title`}
                                 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                                style={{
                                  fontSize: TYPOGRAPHY.fontSize.small,
                                  color: "#282623",
                                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                  fontWeight: "500",
                                  marginBottom: "16px"
                                }}
                              >
                                AI 도구 활용
                              </AdvancedEditableText>
                              <div className="space-y-2">
                                <div>
                                  <AdvancedEditableText
                                    textKey={`project-${selectedProject.id}-role-1-sub-1-item-1-title`}
                                    className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                    style={{
                                      fontSize: TYPOGRAPHY.fontSize.small,
                                      color: "#58534e",
                                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                      display: "block",
                                      marginBottom: "4px"
                                    }}
                                  >
                                    • ComfyUI: 일관된 캐릭터 생성

                                  </AdvancedEditableText>
                              
                                </div>
                                <div>
                                  <AdvancedEditableText
                                    textKey={`project-${selectedProject.id}-role-1-sub-1-item-2-title`}
                                    className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                    style={{
                                      fontSize: TYPOGRAPHY.fontSize.small,
                                      color: "#58534e",
                                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                      display: "block",
                                      marginBottom: "4px"
                                    }}
                                  >
                                    • Midjourney: 환경 디자인 컨셉
                                  </AdvancedEditableText>

                                </div>
                                <div>
                                  <AdvancedEditableText
                                    textKey={`project-${selectedProject.id}-role-1-sub-1-item-3-title`}
                                    className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                    style={{
                                      fontSize: TYPOGRAPHY.fontSize.small,
                                      color: "#58534e",
                                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                      display: "block",
                                      marginBottom: "4px"
                                    }}
                                  >
                                    • Stable Diffusion: 세부 요소 제작
                                  </AdvancedEditableText>

                                </div>
                              </div>
                            </div>
                            <div>
                              <AdvancedEditableText
                                textKey={`project-${selectedProject.id}-role-1-sub-2-title`}
                                 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed block"
                                style={{
                                  fontSize: TYPOGRAPHY.fontSize.small,
                                  color: "#282623",
                                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                  fontWeight: "500",
                                  marginBottom: "16px"
                                }}
                              >
                                데이터 연동
                              </AdvancedEditableText>
                              <div className="space-y-2">
                                <div>
                                  <AdvancedEditableText
                                    textKey={`project-${selectedProject.id}-role-1-sub-2-item-1-title`}
                                    className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                    style={{
                                      fontSize: TYPOGRAPHY.fontSize.small,
                                      color: "#58534e",
                                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                      display: "block",
                                      marginBottom: "4px"
                                    }}
                                  >
                                    • SnowFlake: 사용자 행동 데이터 분석

                                  </AdvancedEditableText>
                              
                                </div>
                                <div>
                                  <AdvancedEditableText
                                    textKey={`project-${selectedProject.id}-role-1-sub-2-item-2-title`}
                                    className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                    style={{
                                      fontSize: TYPOGRAPHY.fontSize.small,
                                      color: "#58534e",
                                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                      display: "block",
                                      marginBottom: "4px"
                                    }}
                                  >
                                    • Gather API: 실시간 상호작용 기능
                                  </AdvancedEditableText>

                                </div>
                                <div>
                                  <AdvancedEditableText
                                    textKey={`project-${selectedProject.id}-role-1-sub-2-item-3-title`}
                                    className="text-sm text-[#58534e] tracking-tight leading-relaxed block"
                                    style={{
                                      fontSize: TYPOGRAPHY.fontSize.small,
                                      color: "#58534e",
                                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                                      display: "block",
                                      marginBottom: "4px"
                                    }}
                                  >
                                    • Python: 자동화 스크립트 개발
                                  </AdvancedEditableText>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <AdvancedEditableText
                            textKey={`project-${selectedProject.id}-role-2-title`}
                            className="text-sm font-medium text-[#282623] mb-4 tracking-tight leading-relaxed"
                            style={{
                              fontSize: TYPOGRAPHY.fontSize.small,
                              color: "#282623",
                              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                              fontWeight: "500"
                            }}
                          >
                            게임화 시스템 설계
                          </AdvancedEditableText>
                          <div className="text-sm text-[#58534e] tracking-tight leading-relaxed space-y-4">
                            <p><strong>익숙한 일상 공간의 게임화 컨셉:</strong></p>
                            
                            {/* 게임화 시스템 도식 */}
                            <div className="bg-white border border-gray-200 p-4 rounded-lg">
                              <div className="text-center mb-3">
                                <h4 className="text-sm font-medium text-[#282623] mb-1">메타버스 게임화 시스템</h4>
                                <p className="text-xs text-[#58534e]">일상 공간 → 가상 환경 → 게임 요소 통합</p>
                              </div>
                              <svg width="100%" height="160" viewBox="0 0 600 160" className="overflow-visible">
                                {/* 오피스 공간 */}
                                <rect x="50" y="30" width="120" height="50" fill="#1CABE2" opacity="0.1" stroke="#1CABE2" strokeWidth="1" rx="6"/>
                                <text x="110" y="50" textAnchor="middle" className="text-xs fill-[#374151] font-medium">오피스 공간</text>
                                <text x="110" y="65" textAnchor="middle" className="text-xs fill-[#6b7280]">업무 환경</text>
                                <line x1="170" y1="55" x2="210" y2="55" stroke="#374151" strokeWidth="2" markerEnd="url(#metaArrow1)"/>
                                
                                {/* 카페 공간 */}
                                <rect x="50" y="100" width="120" height="50" fill="#1CABE2" opacity="0.1" stroke="#1CABE2" strokeWidth="1" rx="6"/>
                                <text x="110" y="120" textAnchor="middle" className="text-xs fill-[#374151] font-medium">카페 공간</text>
                                <text x="110" y="135" textAnchor="middle" className="text-xs fill-[#6b7280]">소셜 환경</text>
                                <line x1="170" y1="125" x2="210" y2="125" stroke="#374151" strokeWidth="2" markerEnd="url(#metaArrow2)"/>
                                
                                {/* 게임화 요소 */}
                                <rect x="220" y="65" width="120" height="50" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="1" rx="6"/>
                                <text x="280" y="85" textAnchor="middle" className="text-xs fill-[#374151] font-medium">퀘스트 시스템</text>
                                <text x="280" y="100" textAnchor="middle" className="text-xs fill-[#6b7280]">미션 & 보상</text>
                                <line x1="340" y1="90" x2="380" y2="90" stroke="#374151" strokeWidth="2" markerEnd="url(#metaArrow3)"/>
                                
                                {/* 데이터 수집 */}
                                <rect x="390" y="65" width="120" height="50" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="1" rx="6"/>
                                <text x="450" y="85" textAnchor="middle" className="text-xs fill-[#374151] font-medium">데이터 수집</text>
                                <text x="450" y="100" textAnchor="middle" className="text-xs fill-[#6b7280]">행동 분석</text>
                                
                                {/* 화살표 마커 정의 */}
                                <defs>
                                  <marker id="metaArrow1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                  <marker id="metaArrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                  <marker id="metaArrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                </defs>
                              </svg>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <p className="text-[#282623] font-medium">핵심 설계 원칙:</p>
                              <p>- 현실 공간의 친숙함과 가상 환경의 상호작용성 결합</p>
                              <p>- 자연스러운 사용자 참여를 유도하는 퀘스트 시스템</p>
                              <p>- 실시간 데이터 수집을 통한 개인화된 경험 제공</p>
                              <p>- 고객사별 맞춤 브랜딩과 메시지 전달</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>



                {/* 활용 기술 */}
                <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">{selectedProject.id === "1" ? "4" : "5"}</span>
                    활용 기술
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                  {selectedProject.id === "1" && (
                    <>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Adobe Creative Suite</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Premiere Pro, After Effects, Photoshop</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">생성형 AI</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Midjourney, Stable Diffusion ComfyUI</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">자동화 개발</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Python, OCR 화면 인식</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">데이터 설계</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">SnowFlake, API 연동</div>
                      </div>
                    </>
                  )}
                  {selectedProject.id === "2" && (
                    <>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">BMPCC 6K</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">시네마틱 품질 촬영 장비</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">브랜드 LUT</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">전용 컬러 그레이딩 시스템</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Python</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">대규모 편집 워크플로우 자동화</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">FFmpeg</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">오픈소스 비디오 처리 엔진</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">DaVinci Resolve</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">전문 색상 보정 도구</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Premiere Pro</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">영상 편집 및 구성</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">After Effects</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">모션 그래픽 및 합성</div>
                      </div>
                    </>
                  )}
                  {selectedProject.id === "3" && (
                    <>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Found Footage</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Screen Life 기법의 핵심 도구<br/>실제 화면 녹화 및 편집</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Photoshop</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">이미지 편집 및 합성</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">After Effects</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">모션 그래픽 및 애니메이션</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Premiere Pro</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">영상 편집 및 사운드</div>
                      </div>
                    </>
                  )}
                  {selectedProject.id === "4" && (
                    <>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">영상 편집</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Premiere Pro</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">모션 그래픽</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">After Effects</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">현장 커뮤니케이션</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">베트남 인플루언서 소통</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">촬영 장비</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">핸디캠 활용 자연스러운 촬영</div>
                      </div>
                    </>
                  )}
                  {selectedProject.id === "5" && (
                    <>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Python</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">자동화 스크립트 및 데이터 처리</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">ComfyUI</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">일관된 캐릭터 및 환경 생성</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Midjourney</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">고품질 컨셉 아트 및 환경 디자인</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Stable Diffusion</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">맞춤형 이미지 생성 및 편집</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">SnowFlake</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">대용량 데이터 분석 및 처리</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Gather API</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">메타버스 플랫폼 연동 및 제어</div>
                      </div>
                    </>
                  )}
                </div>

                {/* PM & 성과 (삼성 프로젝트만) */}
                {selectedProject.id === "3" && (
                  <div className="mb-12">
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">6</span>
                        PM & 성과
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">경쟁사 대비 30% 높은 단가임에도 불구하고 수주 성공</h3>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 프로젝트 관리 성과</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">실제 업무 환경을 반영한 효과적인 교육 콘텐츠 제작, 사용자 행동 분석 및 데이터 기반 의사결정, 프로젝트 일정 및 품질 관리 최적화</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 창의적 특성 확립</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">교육 콘텐츠 분야의 차별화된 접근 방식 개발, Screen Life 장르의 전문적 활용 능력 구축, 현실감 있는 교육 환경 구성 노하우 축적, 사용자 경험 중심의 콘텐츠 제작 프로세스 정립</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 주요 경쟁 우위 요소</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">사용자 친화적 분석 및 맞춤형 솔루션 제공, 창의적 기법과 사용자 행동 분석의 효과적 결합, 교육 효과와 브랜드 메시지 전달의 균형있는 통합, 지속 가능한 교육 콘텐츠 제작 방법론 구축</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pb-8"></div>
              </div>
            </div>

            {/* 닫기 버튼 */}
            <button 
              onClick={closeProjectModal}
              className="absolute top-6 right-6 w-10 h-10 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded-full flex items-center justify-center transition-all shadow-lg z-10"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
