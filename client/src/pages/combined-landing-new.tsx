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
    <>
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
    </div>
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
    {/* 프로젝트 모달 - 간소화된 구조 */}
    {showProjectModal && selectedProject && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl relative overflow-hidden">
          <div className="h-full overflow-y-scroll p-8 pt-16">
            {/* Back 버튼 */}
            <div className="mb-8">
              <button 
                onClick={closeProjectModal}
                className="text-sm text-[#58534e] hover:text-[#282623] transition-colors flex items-center gap-1"
              >
                ← Back To All Work
              </button>
            </div>

            {/* 프로젝트 정보 */}
            <div className="mb-12">
              <h1 className="text-4xl lg:text-5xl text-[#282623] leading-tight mb-6 font-semibold">
                {selectedProject.title}
              </h1>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h5 className="opacity-50 text-base font-normal mb-2">Category</h5>
                  <p className="text-sm text-[#282623]">{selectedProject.category}</p>
                </div>
                <div>
                  <h5 className="opacity-50 text-base font-normal mb-2">Client</h5>
                  <p className="text-sm text-[#282623]">{selectedProject.client}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h5 className="opacity-50 text-base font-normal mb-2">Description</h5>
                <p className="text-sm text-[#58534e] leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
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
    </>
  );
}
