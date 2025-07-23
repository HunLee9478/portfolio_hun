import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function McCannLanding() {
  const [currentTime, setCurrentTime] = useState("");

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

  const projects = [
    {
      client: "Chivas",
      title: "Chivas XV x Dolly Cohen",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000"
    },
    {
      client: "Nespresso",
      title: "GC x OL",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000"
    },
    {
      client: "Chandon",
      title: "Garden Spritz",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000"
    },
    {
      client: "Prada",
      title: "Les Infusions",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000"
    },
    {
      client: "Moncler",
      title: "Summer of lightness",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000"
    }
  ];

  const handleContinueClick = () => {
    window.location.href = "/ross-mason";
  };

  return (
    <div className="mccann-landing bg-white text-black min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-sm uppercase tracking-wide hover:opacity-75">Agence</a>
              <a href="#" className="text-sm uppercase tracking-wide hover:opacity-75">Creations</a>
            </nav>
            
            <div className="flex-1 flex justify-center">
              <svg viewBox="0 0 107 20" className="h-5 fill-current">
                <path d="M0 0.321777H3.4102L9.8294 12.5552L16.2486 0.321777H19.4983V19.7182H16.4091V5.8751L10.7522 16.5391H8.70604L3.08924 5.8751V19.7182H0V0.321777Z"/>
                <path d="M21.5444 12.8771C21.5444 8.53105 24.1522 5.75439 28.084 5.75439C31.2133 5.75439 33.7008 7.44454 34.2625 10.6236H31.1732C30.6517 9.09443 29.6086 8.37009 28.084 8.37009C25.9175 8.37009 24.5534 9.93951 24.5534 12.8771C24.5534 15.8148 25.8774 17.3842 28.084 17.3842C29.6487 17.3842 30.7319 16.6598 31.2134 14.9294H34.3026C33.7008 18.1085 31.2936 19.9999 28.084 19.9999C24.1121 20.0401 21.5444 17.2232 21.5444 12.8771Z"/>
                <path d="M35.7469 9.97988C35.7469 4.10463 39.438 0 44.8943 0C49.2273 0 52.477 2.53521 53.3997 6.72032H50.15C49.3877 4.10463 47.5021 2.85714 44.8943 2.85714C41.2033 2.85714 38.9164 5.6338 38.9164 10.0201C38.9164 14.4064 41.2033 17.1831 44.8943 17.1831C47.5021 17.1831 49.4279 15.8551 50.1901 13.1187H53.3997C52.477 17.4245 49.2674 20.0402 44.8943 20.0402C39.3979 20 35.7469 16.0161 35.7469 9.97988Z"/>
                <path d="M60.541 0.321777H63.7105L70.9321 19.7182H67.6423L65.877 14.7685H58.2943L56.529 19.7182H53.2793L60.541 0.321777ZM64.874 11.9918L62.0656 4.06423L59.2572 11.9918H64.874Z"/>
                <path d="M72.4567 0.321777H75.3453L85.0543 14.4063V0.321777H87.9831V19.7182H85.1346L75.3854 5.63365V19.7182H72.4567V0.321777Z"/>
                <path d="M91.4735 0.321777H94.3621L104.071 14.4063V0.321777H107V19.7182H104.151L94.4023 5.63365V19.7182H91.4735V0.321777Z"/>
              </svg>
            </div>
            
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-sm uppercase tracking-wide hover:opacity-75">Equipe</a>
              <a href="#" className="text-sm uppercase tracking-wide hover:opacity-75">Contact</a>
              <div className="flex items-center space-x-2">
                <span className="text-sm">FR</span>
                <span className="text-sm opacity-50">|</span>
                <span className="text-sm opacity-50">EN</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12">
              <div className="mb-4">Dites bonjour</div>
              <div className="mb-4">
                aux idées 
                <span className="relative inline-block mx-4">
                  <video 
                    className="w-32 h-20 object-cover rounded-lg"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  </video>
                </span>
                qui
              </div>
              <div className="mb-4">transforment <sup className="text-sm">(vraiment)</sup></div>
              <div>la vie des gens<span className="text-red-500">.</span></div>
            </h1>
          </motion.div>
        </div>
        
        {/* Location and Time */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>N 48° 53' 34.915"</div>
              <div className="font-mono">{currentTime}</div>
              <div>E 02° 15' 52.038"</div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}