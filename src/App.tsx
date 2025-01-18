import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Briefcase,
  PenTool,
  Code,
  Palette,
  Figma,
} from "lucide-react";

// Centralized image configuration
const siteImages = {
  profile: "/images/profile.jpg",
  projects: {
    SuperEZ: [
      "/images/superEZopenSlide.png",
      "/videos/SuperEz1.mp4",
      "/videos/SuperEz2.mp4",
    ],
    GetPetMobile: [
      "/images/1.png",
      "/images/2.png",
      "/images/3.png",
      "/images/4.png",
      "/images/5.png",
      "/images/6.png",
    ],
    Bono: ["/images/bono.png", "/videos/bonoWebsite.mp4"],
    IritWebsite: [
      "/images/IritWebsite.png",
      "/videos/IritRanCohen.mp4",
    ],
  },
  logos: {
    techStartup: "/images/SuperEZlogo.png",
    ecoBrand: "/images/IritRanCohenlogo.jpg",
    fashionBrand: "/images/GetPetlogo.png",
    foodDelivery: "/images/Picologo.png",
  },
};

// Rest of the file remains exactly the same
interface Project {
  title: string;
  description: string;
  media: string[];
  tags: string[];
  links: {
    github?: string;
    Figma?: string;
    Live?: string;
  };
}

interface Logo {
  title: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    title: "Online SuperMarket Platform",
    description:
      "A full-stack platform that lets users compare shopping cart prices, including delivery fees, across supermarkets and automatically transfers their cart to the selected supermarket's checkout.",
    media: siteImages.projects.SuperEZ,
    tags: [
      "React",
      "Html",
      "CSS",
      "Python",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Material Design",
    ],
    links: {
      github: "https://github.com/ofekshp/SuperEZ",
      Figma:
        "https://www.figma.com/design/hvtMERuXEn6wGSgLbElbLA/SuperEZ?node-id=34-2280&t=zLtRCexOLNgRTois-1",
    },
  },
  {
    title: "Mobile Pet Adoption Application",
    description: "Enables search for pets to adopt by location on the map. ",
    media: siteImages.projects.GetPetMobile,
    tags: ["Kotlin", "XML", "Google Maps API", "Firebase"],
    links: {
      github: "https://github.com/mayageva11/GetPet.git",
    },
  },
  {
    title: "Social Food MarketPlace",
    description:
      "Complete FullStack brand identity design including logo, typography, and design system documentation.",
    media: siteImages.projects.Bono,
    tags: ["Branding", "UI Design", "Design Systems"],
    links: {
      Figma:
        "https://www.figma.com/design/BK5EoKF9MORGbtBLVB8dCI/Bono-Website?node-id=0-1&t=j5KK8GdWrg5QZY5C-1",
      Live: "https://www.bonoeat.com/",
    },
  },
  {
    title: "Lawyer Buisness Website",
    description:
      "A modern Lawyer Website focused on to convey professionalism with a clean design.",
    media: siteImages.projects.IritWebsite,
    tags: ["UI/UX" ,"React",
      "Html",
      "CSS",
      "TypeScript",
      "Node.js", "logo","marketing"],
    links: {
      github: "https://github.com/AdiNehama/irit_rancohen.git",
      Live:"https://irit-ran-cohen.onrender.com/",
    },
  },
];

const logos: Logo[] = [
  {
    title: "Supermarket Price Comparison Logo",
    image: siteImages.logos.techStartup,
    description:
      "A fun logo in the shape of a shopping cart that aligns with the website's message.",
  },
  {
    title: "Lawyer Brand Logo",
    image: siteImages.logos.ecoBrand,
    description:
      "Official and minimalist logo that conveys representation and professionalism.",
  },
  {
    title: "Pet adoption platform Logo",
    image: siteImages.logos.fashionBrand,
    description:
      "A friendly logo that catches the eye, with soft and pleasant colors.",
  },
  {
    title: "Gaming tech Startup Logo",
    image: siteImages.logos.foodDelivery,
    description: "Playful and modern logo for a gaming tech startup.",
  },
];
function MediaSlider({ media }: { media: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Add visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        threshold: 0.2 // Trigger when 20% of the element is visible
      }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  // Auto-slide functionality - only start when visible
  useEffect(() => {
    if (!isVisible) return; // Don't start timer if not visible

    const currentMedia = media[currentIndex];

    // If the current media is an image, set an interval
    if (!currentMedia.endsWith(".mp4")) {
      intervalRef.current = setTimeout(nextSlide, 6000);
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [currentIndex, media, isVisible]);

  // Handle video end
  const handleVideoEnd = () => {
    nextSlide();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  return (
    <div ref={sliderRef} className="intro-slider relative overflow-hidden">
      <div
        className={`slider flex transition-transform duration-500 ${
          !isVisible ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {media.map((src, index) =>
          src.endsWith(".mp4") ? (
            <video
              key={index}
              className="w-full h-auto"
              controls
              autoPlay={isVisible} // Only autoplay when visible
              muted
              ref={index === currentIndex ? videoRef : null}
              onEnded={handleVideoEnd}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              key={index}
              src={src}
              alt={`Media ${index + 1}`}
              className="w-full h-auto"
            />
          )
        )}
      </div>
      {/* Navigation Buttons - only show when visible */}
      {isVisible && (
        <>
          <button
            className="prev-btn absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-600 active:scale-95 transition-all duration-20"
            onClick={prevSlide}
          >
            ←
          </button>
          <button
            className="next-btn absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-600 active:scale-95 transition-all duration-20"
            onClick={nextSlide}
          >
            →
          </button>
        </>
      )}
    </div>
  );
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        threshold: 0.2 // Trigger when 20% of the element is visible
      }
    );

    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={projectRef}
      className={`bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-1000 transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <MediaSlider media={project.media} />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Github size={20} />
              <span>Code</span>
            </a>
          )}
          {project.links.Figma && (
            <a
              href={project.links.Figma}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Figma size={20} />
              <span>Figma</span>
            </a>
          )}
          {project.links.Live && (
            <a
              href={project.links.Live}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ExternalLink size={20} />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


function App() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".hidden-element");
    hiddenElements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Developer & Designer
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Crafting digital experiences through code and design
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/AdiNehama"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/adi-nehama-194222253/"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:adinehama6@gmail.com"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </header>
      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="hidden-element opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                About Me
              </h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse group-hover:animate-none transition-all duration-300"></div>
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                  <img
                    src={siteImages.profile}
                    alt="Adi"
                    className="absolute inset-2 rounded-full object-cover w-[calc(100%-16px)] h-[calc(100%-16px)] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Hey there! Thank you for visiting my website :)
                    <br /> My name is Adi Nehama, and I'm a passionate developer
                    and designer with a keen eye for detail and a love for
                    crafting beautiful, functional digital experiences. With a
                    bachelor's degree in Computer Science and a background in
                    design, I bring a unique perspective to every project
                    combining technical expertise with creative vision.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-indigo-50">
                      <Code size={20} className="text-indigo-600" />
                      <span className="text-indigo-600">Development</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50">
                      <Palette size={20} className="text-purple-600" />
                      <span className="text-purple-600">UI/UX Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-2 justify-center mb-2">
        <Briefcase size={24} className="text-indigo-600" />
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Featured Projects
        </h2>
      </div>
      <p className="text-gray-600 text-center mb-12">
        Some of my recent development work
      </p>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
      {/* Logo Design Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 justify-center mb-2">
            <PenTool size={24} className="text-purple-600" />
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Logo Design
            </h2>
          </div>
          <p className="text-gray-600 text-center mb-12">
            Selected branding projects
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 p-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-white p-4 rounded-lg">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={logo.image}
                      alt={logo.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {logo.title}
                  </h3>
                  <p className="text-sm text-gray-600">{logo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
