import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import learnImage from "@assets/image_1751652728317.png";
import latestTutorialImage from "@assets/image_1751652758213.png";

export default function CombinedLanding() {
  const [currentTime, setCurrentTime] = useState("");
  const { scrollY } = useScroll();
  const [animationStarted, setAnimationStarted] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('3D_DESIGN');

  // Optimized scroll points for very fast transitions
  const SCROLL_CONFIG = {
    VIDEO_SCALING: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
    VIDEO_TRANSFORMS: [
      "translate(0px, 0px) scale(1)",
      "translate(0px, 0px) scale(1.5)",
      "translate(0px, 0px) scale(2.5)",
      "translate(0px, 0px) scale(4)",
      "translate(0px, 0px) scale(6)",
      "translate(-50%, -50%) scale(10)",
      "translate(-50%, -80%) scale(10)",
      "translate(-50%, -120%) scale(10)",
      "translate(-50%, -160%) scale(10)",
      "translate(-50%, -200%) scale(10)"
    ],
    VIDEO_FIXED_POINT: 45,
    ROSS_SECTION_REVEAL: [60, 70, 80, 90],
    INDICATOR_FADE: 50
  };

  // Helper functions for service content
  const getServiceImage = (service: string) => {
    switch (service) {
      case '3D_DESIGN':
        return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
      case 'ART_DIRECTION':
        return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
      case 'ANIMATION':
        return "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
      default:
        return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
    }
  };

  const getServiceTitle = (service: string) => {
    switch (service) {
      case '3D_DESIGN':
        return "Bring your ideas to life";
      case 'ART_DIRECTION':
        return "Creative vision and direction";
      case 'ANIMATION':
        return "Dynamic animation workflows";
      default:
        return "Bring your ideas to life";
    }
  };

  const getServiceDescription = (service: string) => {
    switch (service) {
      case '3D_DESIGN':
        return "Pushing beyond reality and creating visuals beyond physicality, 3D allows us to explore and create without boundaries. Whether it's product visualization, architectural renders, or abstract art, I help bring your vision to reality.";
      case 'ART_DIRECTION':
        return "Crafting compelling visual narratives that resonate with your audience. From concept development to final execution, I guide the creative process to ensure every element serves your brand's story and objectives.";
      case 'ANIMATION':
        return "Bringing static designs to life through fluid animations and dynamic workflows. Creating engaging visual experiences that capture attention and communicate your message with impact and style.";
      default:
        return "Pushing beyond reality and creating visuals beyond physicality, 3D allows us to explore and create without boundaries.";
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const slideVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: i * 0.2
      }
    })
  };

  const tutorialData = [
    {
      title: "Simple Studio Setup",
      tags: ["C4D", "Redshift"],
      duration: "00:28:43",
      month: "January",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D studio setup tutorial"
    },
    {
      title: "Bottle Scene Lighting",
      tags: ["C4D", "Redshift"],
      duration: "00:43:55",
      month: "December",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D bottle scene tutorial"
    },
    {
      title: "Designer Lamp Part 2",
      tags: ["C4D", "Redshift"],
      duration: "01:00:14",
      month: "November",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D lamp design tutorial"
    },
    {
      title: "Designer Lamp Part 1",
      tags: ["C4D", "Redshift"],
      duration: "01:16:19",
      month: "November",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D interior design tutorial"
    },
    {
      title: "Cocktail Scene",
      tags: ["C4D", "Redshift"],
      duration: "03:03:52",
      month: "October",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D cocktail scene tutorial"
    },
    {
      title: "X-Ray Effects",
      tags: ["C4D", "Redshift"],
      duration: "00:53:56",
      month: "September",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D abstract forms tutorial"
    }
  ];

  const benefits = [
    {
      number: "01.",
      title: "In-depth tutorials",
      description: "Step-by-step breakdowns of complex 3D scenes using Cinema 4D and Redshift rendering."
    },
    {
      number: "02.",
      title: "Project files included",
      description: "Download and explore the complete project files for every tutorial to accelerate your learning."
    },
    {
      number: "03.",
      title: "Monthly new content",
      description: "Fresh tutorials and techniques released monthly to keep your skills sharp and current."
    }
  ];

  return (
    <div className="bg-white text-black scroll-smooth">
      {/* McCann Section */}
      <section className="min-h-[300vh] relative">
        {/* Header */}
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white/80 backdrop-blur-md rounded-full px-8 py-3 shadow-lg">
            <div className="flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                <a href="#" className="text-base uppercase tracking-wide hover:opacity-75">Agence</a>
                <a href="#" className="text-base uppercase tracking-wide hover:opacity-75">Creations</a>
              </nav>
              
              <nav className="flex items-center space-x-6">
                <a href="#" className="text-base uppercase tracking-wide hover:opacity-75">Equipe</a>
                <a href="#" className="text-base uppercase tracking-wide hover:opacity-75">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section with Video */}
        <div className="relative home__video" style={{ height: "120vh" }}>
          <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="sentence relative">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12">
                    <div className="mb-4">Dites bonjour</div>
                    <div className="mb-4 home__hero__line">
                      <div className="sentence">
                        aux idées&nbsp;
                        <motion.div 
                          className="pin-spacer"
                          style={{
                            order: 0,
                            placeSelf: "auto",
                            gridArea: "auto",
                            zIndex: 1,
                            float: "none",
                            flexShrink: 1,
                            display: "inline-block",
                            margin: "0px",
                            inset: "auto",
                            position: "relative",
                            flexBasis: "auto",
                            overflow: "visible",
                            boxSizing: "border-box",
                            width: "230px",
                            height: "87px",
                            padding: "0px"
                          }}
                        >
                          <motion.div 
                            className="home__hero__video video-container-visible"
                            data-cursor="sound on"
                            data-cursor-click="sound off"
                            animate={{ opacity: 1 }}
                            style={{
                              translate: "none",
                              rotate: "none",
                              inset: "0px auto auto 0px",
                              margin: "0px",
                              maxWidth: "230px",
                              width: "230px",
                              maxHeight: "87px",
                              height: "87px",
                              padding: "0px",
                              transform: useTransform(scrollY, SCROLL_CONFIG.VIDEO_SCALING, SCROLL_CONFIG.VIDEO_TRANSFORMS),
                              position: useTransform(scrollY, [SCROLL_CONFIG.VIDEO_FIXED_POINT - 1, SCROLL_CONFIG.VIDEO_FIXED_POINT], ["static", "fixed"]),
                              zIndex: useTransform(scrollY, [SCROLL_CONFIG.VIDEO_FIXED_POINT - 1, SCROLL_CONFIG.VIDEO_FIXED_POINT], [1, 9999]),
                              top: useTransform(scrollY, [SCROLL_CONFIG.VIDEO_FIXED_POINT - 1, SCROLL_CONFIG.VIDEO_FIXED_POINT], ["auto", "50%"]),
                              left: useTransform(scrollY, [SCROLL_CONFIG.VIDEO_FIXED_POINT - 1, SCROLL_CONFIG.VIDEO_FIXED_POINT], ["auto", "50%"]),
                              transformOrigin: "center"
                            }}
                          >
                            <video
                              className="video-always-visible"
                              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                              loop
                              playsInline
                              muted
                              autoPlay
                              crossOrigin="anonymous"
                              style={{
                                top: "0px",
                                left: "0px",
                                height: "87px",
                                width: "230px",
                                objectFit: "cover",
                                opacity: 1,
                                border: "2px solid rgba(255, 255, 255, 0.8)",
                                borderRadius: "0"
                              }}
                            />
                          </motion.div>
                        </motion.div>
                        &nbsp;qui
                      </div>
                    </div>
                    <div className="mb-4">transforment <sup className="text-sm">(vraiment)</sup></div>
                    <div>la vie des gens<span className="text-red-500">.</span></div>
                  </h1>
                </div>
              </motion.div>
              
              {/* Scroll Indicator */}
              <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                  opacity: useTransform(scrollY, [0, SCROLL_CONFIG.INDICATOR_FADE], [1, 0]),
                  zIndex: 99999
                }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-sm text-white bg-black bg-opacity-50 px-3 py-1 rounded-full mb-2"
                >
                  Scroll to explore
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
                  className="w-6 h-10 border-2 border-white bg-black bg-opacity-50 rounded-full mx-auto relative"
                >
                  <motion.div
                    animate={{ y: [0, 16, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-1 h-3 bg-white rounded-full absolute left-1/2 top-1 transform -translate-x-1/2"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Full Screen Section */}
      <section className="relative bg-white" style={{ height: "50vh" }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* This section provides scroll space for video animations */}
        </div>
      </section>

      {/* Ross Mason Section */}
      <motion.div 
        className="bg-white text-black relative z-20"
        style={{
          transform: useTransform(scrollY, SCROLL_CONFIG.ROSS_SECTION_REVEAL, ["translateY(100vh)", "translateY(50vh)", "translateY(20vh)", "translateY(0vh)"])
        }}
      >
        {/* Professional Resume Section - Patreon Style */}
        <motion.div 
          className="py-20 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Header - Patreon Style */}
            <div className="mb-32">
              <motion.h1 
                className="text-6xl md:text-8xl font-bold uppercase leading-tight mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                LEARN 3D<br />
                <em className="italic font-light">wizardry</em>
              </motion.h1>
              <motion.div 
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-black text-white px-4 py-2 text-sm font-medium">C4D &</div>
                <div className="bg-red-600 text-white px-4 py-2 text-sm font-medium">REDSHIFT</div>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div>
                  <p className="font-medium">Self-taught 3D artist passionate about teaching others the craft.</p>
                  <p className="text-gray-600 mt-2">Over 10 years of experience in commercial 3D visualization and motion graphics.</p>
                </div>
                <div>
                  <p className="font-medium">Specializing in Cinema 4D and Redshift rendering.</p>
                  <p className="text-gray-600 mt-2">Creating premium educational content for aspiring 3D artists worldwide.</p>
                </div>
                <div>
                  <p className="font-medium">Building a community of creative professionals.</p>
                  <p className="text-gray-600 mt-2">Mentoring the next generation through comprehensive tutorials and workshops.</p>
                </div>
              </motion.div>
            </div>

            {/* Hero Image Section */}
            <div className="mb-32">
              <motion.div
                className="relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
                  alt="3D Visualization Work"
                  className="w-full h-[400px] object-cover"
                />
              </motion.div>
            </div>

            {/* Why Join Section */}
            <div className="mb-32">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold uppercase mb-8">
                  LEVEL UP YOUR 3D SKILLS<br />
                  AND DO <em className="italic font-light">the work</em> YOU'VE<br />
                  <em className="italic font-light">always</em> WANTED TO DO.
                </h2>
                <a
                  href="#"
                  className="inline-block text-lg font-medium underline decoration-2 underline-offset-4 hover:decoration-4 transition-all duration-300"
                >
                  Unlock your 3D capabilities - Patreon
                </a>
              </motion.div>
            </div>

            {/* Recent Tutorials Section */}
            <div className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold uppercase">RECENT <em className="italic font-light">tutorials</em></h3>
                  <a href="#" className="text-sm underline">View all</a>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Interior Lighting",
                    "Product Render",
                    "Motion Graphics",
                    "Character Work"
                  ].map((title, index) => (
                    <motion.div
                      key={index}
                      className="group cursor-pointer"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-2">
                        <img
                          src={`https://images.unsplash.com/photo-${1650000000000 + index * 234567}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300`}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-sm font-medium">{title}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Download Section */}
            <div className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold uppercase mb-6">
                      DOWNLOAD<br />
                      <em className="italic font-light">free</em> SAMPLE<br />
                      TUTORIAL.
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Get started with a comprehensive sample tutorial that showcases the quality and depth of content available in our premium courses.
                    </p>
                    <motion.a
                      href="#"
                      className="inline-block bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Free Tutorial Sample
                    </motion.a>
                  </div>
                  <div className="relative">
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
                        alt="Free tutorial sample"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[12px] border-l-black border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Made by Patreon Section */}
            <div className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold uppercase">MADE BY <em className="italic font-light">patreons</em></h3>
                  <a href="#" className="text-sm underline">View all</a>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Student Work A",
                    "Student Work B", 
                    "Student Work C",
                    "Student Work D"
                  ].map((title, index) => (
                    <motion.div
                      key={index}
                      className="group cursor-pointer"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-2">
                        <img
                          src={`https://images.unsplash.com/photo-${1700000000000 + index * 345678}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300`}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-sm font-medium">{title}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Final Feature Section */}
            <div className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <h2 className="text-5xl font-bold uppercase mb-8">
                    A-GRADE<br />
                    <em className="italic font-light">tutorials</em>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-2">DIRECT</h3>
                      <p className="text-sm text-gray-600">MESSAGING</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-2">EXCLUSIVE</h3>
                      <p className="text-sm text-gray-600">CONTENT</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-2">UNCUT</h3>
                      <p className="text-sm text-gray-600">WORKFLOWS</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-2">A-GRADE</h3>
                      <p className="text-sm text-gray-600">TUTORIALS</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Section */}
            <div className="mb-20">
              <motion.div
                className="bg-black text-white p-12 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold uppercase mb-4">
                    3D WIZARD<br />
                    <em className="italic font-light">from the UK</em>
                  </h2>
                  <p className="text-lg mb-8">PASSIONATE ABOUT SHARING</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                      <p className="font-medium mb-2">Teaching Experience</p>
                      <p className="text-gray-300">Over 50,000 students worldwide</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Industry Experience</p>
                      <p className="text-gray-300">10+ years in commercial 3D</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Community Impact</p>
                      <p className="text-gray-300">Building the next generation</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>



            {/* Services Section with Interactive Images */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
              <motion.div 
                className="md:col-span-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h4 className="text-base uppercase tracking-wide text-gray-600 mb-8">[Services list]</h4>
                
                <div className="space-y-6">
                  <motion.div 
                    className={`group cursor-pointer ${selectedService === '3D_DESIGN' ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    onClick={() => setSelectedService('3D_DESIGN')}
                  >
                    <div className="flex items-center">
                      <h3 className="text-3xl md:text-4xl font-bold uppercase transition-opacity">
                        3D DESIGN
                      </h3>
                      <span className="ml-4 text-xs text-gray-500">01.</span>
                    </div>
                    <div className={`h-px ${selectedService === '3D_DESIGN' ? 'bg-black' : 'bg-gray-200'} transition-colors duration-300 mt-2`}></div>
                  </motion.div>

                  <motion.div 
                    className={`group cursor-pointer ${selectedService === 'ART_DIRECTION' ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    onClick={() => setSelectedService('ART_DIRECTION')}
                  >
                    <div className="flex items-center">
                      <h3 className="text-3xl md:text-4xl font-bold uppercase transition-opacity">
                        ART DIRECTION
                      </h3>
                      <span className="ml-4 text-xs text-gray-500">02.</span>
                    </div>
                    <div className={`h-px ${selectedService === 'ART_DIRECTION' ? 'bg-black' : 'bg-gray-200'} transition-colors duration-300 mt-2`}></div>
                  </motion.div>

                  <motion.div 
                    className={`group cursor-pointer ${selectedService === 'ANIMATION' ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    onClick={() => setSelectedService('ANIMATION')}
                  >
                    <div className="flex items-center">
                      <h3 className="text-3xl md:text-4xl font-bold uppercase transition-opacity">
                        ANIMATION
                      </h3>
                      <span className="ml-4 text-xs text-gray-500">03.</span>
                    </div>
                    <div className={`h-px ${selectedService === 'ANIMATION' ? 'bg-black' : 'bg-gray-200'} transition-colors duration-300 mt-2`}></div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="md:col-span-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="h-full flex flex-col justify-between">
                  {/* Service Image with Scaling Video */}
                  <motion.div 
                    className="mb-8 relative overflow-hidden rounded-lg"
                    key={selectedService}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={getServiceImage(selectedService)}
                      alt={`${selectedService} work example`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                    />
                    {/* Simple video overlay for demonstration */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    >
                      <video
                        className="w-24 h-16 object-cover rounded opacity-90"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source
                          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </motion.div>
                  </motion.div>

                  {/* Service Description */}
                  <div>
                    <motion.p 
                      className="text-xl font-medium mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {getServiceTitle(selectedService)}
                    </motion.p>
                    <motion.p 
                      className="text-gray-600 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {getServiceDescription(selectedService)}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Clients and Partners Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
              <motion.div 
                className="md:col-span-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-lg mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Below is a list of some of my favourite clients and partners that I have worked with. Let's work together to add your name to that list.
                </motion.p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h5 className="text-base uppercase tracking-wide text-gray-600 mb-6">[Client List]</h5>
                    <div className="space-y-4">
                      <motion.a 
                        href="#" 
                        className="flex items-center group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Glossier</span>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="flex items-center group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Louis Poulsen</span>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="flex items-center group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Logitech</span>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="flex items-center group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">OneFineStay</span>
                      </motion.a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h5 className="text-base uppercase tracking-wide text-gray-600 mb-6">[Partners]</h5>
                    <div className="space-y-4">
                      <motion.a 
                        href="#" 
                        className="flex items-center group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">ManvsMachine</span>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="flex items-center group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Frame</span>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="flex items-center group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Steelworks</span>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="flex items-center group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Builders Club</span>
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Featured Image Section - Reversed Layout */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Left: Featured Image */}
              <motion.div 
                className="md:col-span-6 order-2 md:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800"
                    alt="Ross Mason 3D Work"
                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
              
              {/* Right: CTA Content */}
              <motion.div 
                className="md:col-span-6 flex items-end order-1 md:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div>
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Ready to <em className="italic">work</em><br />
                    together<br />
                    on <em className="italic">your</em><br />
                    project?
                  </motion.h2>
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Looking to bring your brand to life? Want to put your product in a surreal environment? Need help learning 3D? Shoot me a message and we'll see what we can do together.
                    </p>
                  </motion.div>
                  <motion.button
                    className="text-lg border-b-2 border-black hover:opacity-75 transition-opacity"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                  >
                    Let's work together
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Join Section */}
        <motion.div 
          className="py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-3 mb-6 md:mb-0">
                <h3 className="text-base uppercase tracking-wide">[Why join?]</h3>
              </div>
              <div className="md:col-span-9">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                  LEVEL UP YOUR 3D SKILLS AND DO <em className="italic">the work</em> YOU'VE <em className="italic">always</em> WANTED TO DO.
                </h2>
                <a href="#" className="text-lg hover:opacity-75 transition-opacity border-b border-black">
                  Unlock your 3D capabilities - Patreon
                </a>
                
                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-sm opacity-50 mb-3">{benefit.number}</span>
                      <h4 className="text-lg font-semibold mb-3">{benefit.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-base">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>



        {/* CTA Section */}
        <motion.div 
          className="py-16 bg-black text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to elevate your 3D skills?
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Join hundreds of 3D artists who are already mastering Cinema 4D and Redshift with our comprehensive tutorials.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning on Patreon
              </motion.a>
              <motion.a
                href="#"
                className="border border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Free Samples
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Ross Mason</h3>
                <p className="text-gray-400 mb-6 text-base">
                  3D Artist & Educator specializing in Cinema 4D and Redshift rendering techniques.
                </p>
              </div>
              <div className="flex flex-col md:items-end">
                <div className="flex space-x-6 mb-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                    Patreon
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                    Instagram
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                    Twitter
                  </a>
                </div>
                <p className="text-gray-500 text-sm">
                  © 2024 Ross Mason. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}