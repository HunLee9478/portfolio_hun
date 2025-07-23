import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FONT_SIZES, SPACING } from "@/constants/styles";

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

export default function Home() {
  const [animationStarted, setAnimationStarted] = useState(false);

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

  return (
    <div className="bg-white text-black scroll-smooth">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 pt-6 md:pt-8 text-white mix-blend-difference">
        <nav className="site-grid">
          <div className="col-span-6 md:col-span-3">
            <a href="#" className="text-lg font-medium">Ross Mason</a>
          </div>
          <div className="col-span-6 md:col-span-9 flex justify-end">
            <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
              Send me a message
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between pt-110 md:pt-120 pb-10">
        <div className="site-grid flex-1 flex items-center">
          <div className="col-span-12">
            <h1 className="hero-text font-black uppercase leading-none">
              <div className="overflow-hidden-text">
                <motion.div
                  className="slide-content"
                  variants={slideVariants}
                  initial="hidden"
                  animate={animationStarted ? "visible" : "hidden"}
                  custom={0}
                >
                  Learn 3D
                </motion.div>
              </div>
              <div className="overflow-hidden-text">
                <motion.div
                  className="slide-content"
                  variants={slideVariants}
                  initial="hidden"
                  animate={animationStarted ? "visible" : "hidden"}
                  custom={1}
                >
                  Mastery
                </motion.div>
              </div>
            </h1>
            <motion.div
              className="mt-12 md:mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <a
                href="#"
                className="inline-block bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Get a free patreon tutorial sample
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Hero Image */}
        <motion.div
          className="relative h-screen overflow-hidden mt-12"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
            alt="3D rendered modern interior"
            className="media-fill object-cover"
          />
        </motion.div>
      </section>

      {/* Latest Tutorial Section */}
      <section className="py-20 bg-black text-white">
        <div className="site-grid">
          <div className="col-span-12 flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-8">
              <div className="text-sm uppercase tracking-wide mb-2 md:mb-0">Latest tutorial</div>
              <div className="text-lg font-medium">
                Creating Interiors
                <div className="text-sm opacity-75">[C4D & REDSHIFT]</div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm hidden md:inline">02:12:58</span>
              <a href="#" className="uline-double hover:opacity-75 transition-opacity">
                Visit Patreon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-200 md:py-225">
        <div className="site-grid">
          <div className="col-span-12 md:col-span-3 mb-8 md:mb-0">
            <h3 className="text-sm uppercase tracking-wide">[Why join?]</h3>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
              LEVEL UP YOUR 3D SKILLS AND DO <em className="italic">the work</em> YOU'VE <em className="italic">always</em> WANTED TO DO.
            </h2>
            <a href="#" className="uline-double text-lg hover:opacity-75 transition-opacity">
              Unlock your 3D capabilities - Patreon
            </a>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-24">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span className="text-sm opacity-50 mb-4">{benefit.number}</span>
                  <h4 className="text-xl font-semibold mb-4">{benefit.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="site-grid">
          <div className="col-span-12">
            <h3 className="text-2xl font-bold mb-12">Recent Tutorials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tutorialData.map((tutorial, index) => (
                <motion.article
                  key={index}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">
                    <span className="text-sm text-gray-500 uppercase tracking-wide">
                      [{tutorial.tags.join(", ")}]
                    </span>
                  </div>
                  <div className="relative mb-4 aspect-4-5 overflow-hidden rounded-lg">
                    <img
                      src={tutorial.image}
                      alt={tutorial.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{tutorial.duration} / {tutorial.month}</span>
                    <span>{tutorial.title}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white text-center">
        <div className="site-grid">
          <div className="col-span-12">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to elevate your 3D skills?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
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
              <a
                href="#"
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Start Learning on Patreon
              </a>
              <a
                href="#"
                className="border border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-colors"
              >
                View Free Samples
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="site-grid">
          <div className="col-span-12 md:col-span-6">
            <h3 className="text-2xl font-bold mb-4">Ross Mason</h3>
            <p className="text-gray-400 mb-6">
              3D Artist & Educator specializing in Cinema 4D and Redshift rendering techniques.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col md:items-end">
            <div className="flex space-x-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Patreon
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Ross Mason. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
