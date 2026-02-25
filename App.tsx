import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Clock, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Star,
  Quote
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants ---
// Para adicionar novas fotos, basta inserir um novo objeto nos arrays abaixo seguindo o padrão:
// { id: número, src: "link_da_imagem", title: "legenda" }

const BACKGROUND_IMAGES = [
  "https://i.postimg.cc/SR3Yx8dB/0e3140e8-7d36-4e87-a24b-408b8bc35fa7.jpg",
  "https://i.postimg.cc/vBRYqsX9/Full-Size-Render.jpg",
  "https://i.postimg.cc/8Pc26YmQ/IMG-8257.jpg",
];

// Galeria do Studio
const STUDIO_GALLERY = [
  { id: 1, src: "https://i.postimg.cc/R0qvZD3v/IMG_8310.jpg", title: "O Studio" },
  { id: 2, src: "https://i.postimg.cc/6QSt2fRG/IMG_8293.jpg", title: "O Studio" },
  { id: 3, src: "https://i.postimg.cc/DzDnJPs0/IMG_8294.jpg", title: "O Studio" },
  { id: 4, src: "https://i.postimg.cc/GpNd8xYD/IMG_8295.jpg", title: "O Studio" },
  { id: 5, src: "https://i.postimg.cc/DzDnJPsq/IMG_8296.jpg", title: "O Studio" },
  { id: 6, src: "https://i.postimg.cc/tTxyhntd/IMG_8297.jpg", title: "O Studio" },
  { id: 7, src: "https://i.postimg.cc/LX1RzgBN/IMG_8298.jpg", title: "O Studio" },
  { id: 8, src: "https://i.postimg.cc/26Zm4L7f/IMG_8299.jpg", title: "O Studio" },
  { id: 9, src: "https://i.postimg.cc/PxwhmvQs/IMG_8300.jpg", title: "O Studio" },
  { id: 10, src: "https://i.postimg.cc/yxCKn6LK/IMG_8301.jpg", title: "O Studio" },
  { id: 11, src: "https://i.postimg.cc/qqHrQB1p/IMG_8203.jpg", title: "O Studio" },
  { id: 12, src: "https://i.postimg.cc/Bbf3NZmv/Full_Size_Render.jpg", title: "O Studio" },
  { id: 13, src: "https://i.postimg.cc/6qVXPsPZ/IMG_8202.jpg", title: "O Studio" },
  { id: 14, src: "https://i.postimg.cc/tJGbDRBY/IMG_8204.jpg", title: "O Studio" },
  { id: 15, src: "https://i.postimg.cc/mk3snxnr/IMG_8206.jpg", title: "O Studio" },
  { id: 16, src: "https://i.postimg.cc/3NQh9rt4/IMG_8209.jpg", title: "O Studio" },
  { id: 17, src: "https://i.postimg.cc/NGRBFT0f/IMG_8306.jpg", title: "O Studio" },
  { id: 18, src: "https://i.postimg.cc/Pf1TJZqC/IMG_8307.jpg", title: "O Studio" },
];

// Galeria de Tatuagens
const TATTOO_GALLERY = [
  { id: 1, src: "https://i.postimg.cc/FFWtzGvf/IMG_8200.png", title: "Mit Tattoo" },
  { id: 2, src: "https://i.postimg.cc/xdMYbmRK/IMG_8192.jpg", title: "Mit Tattoo" },
  { id: 3, src: "https://i.postimg.cc/CKkYf8NH/IMG_8249.jpg", title: "Mit Tattoo" },
  { id: 4, src: "https://i.postimg.cc/5N6hCv9S/IMG_8215.jpg", title: "Mit Tattoo" },
  { id: 5, src: "https://i.postimg.cc/gknCZRcv/IMG_8193.jpg", title: "Mit Tattoo" },
  { id: 6, src: "https://i.postimg.cc/tCwLtT7M/IMG_8198.jpg", title: "Mit Tattoo" },
  { id: 7, src: "https://i.postimg.cc/HsRf4xj2/IMG_8194.jpg", title: "Mit Tattoo" },
  { id: 8, src: "https://i.postimg.cc/9FKvtMzx/IMG_8195.jpg", title: "Mit Tattoo" },
  { id: 9, src: "https://i.postimg.cc/rF3vCmzB/IMG_8197.jpg", title: "Mit Tattoo" },
  { id: 10, src: "https://i.postimg.cc/02FLdQbq/IMG_8216.png", title: "Mit Tattoo" },
  { id: 11, src: "https://i.postimg.cc/65ykvR6c/IMG_8217.jpg", title: "Mit Tattoo" },
  { id: 12, src: "https://i.postimg.cc/RCsrhGmB/IMG_8218.jpg", title: "Mit Tattoo" },
  { id: 13, src: "https://i.postimg.cc/QN4LCS32/IMG_8219.jpg", title: "Mit Tattoo" },
  { id: 14, src: "https://i.postimg.cc/6QrJQX6x/IMG_8221.jpg", title: "Mit Tattoo" },
  { id: 15, src: "https://i.postimg.cc/TPVMP62x/IMG_8222.jpg", title: "Mit Tattoo" },
  { id: 16, src: "https://i.postimg.cc/Rhb2YCd3/IMG_8223.jpg", title: "Mit Tattoo" },
  { id: 17, src: "https://i.postimg.cc/15fkq6RX/IMG_8230.jpg", title: "Mit Tattoo" },
  { id: 18, src: "https://i.postimg.cc/c19qCTWZ/IMG_8231.jpg", title: "Mit Tattoo" },
  { id: 19, src: "https://i.postimg.cc/2y5PTLQ8/IMG_8232.jpg", title: "Mit Tattoo" },
  { id: 20, src: "https://i.postimg.cc/XqDtPNLd/IMG_8233.jpg", title: "Mit Tattoo" },
  { id: 21, src: "https://i.postimg.cc/vZ6wpnCp/IMG_8244.jpg", title: "Mit Tattoo" },
  { id: 22, src: "https://i.postimg.cc/HWZGn3mn/IMG_8246.jpg", title: "Mit Tattoo" },
  { id: 23, src: "https://i.postimg.cc/wBLHsNV5/IMG_8247.jpg", title: "Mit Tattoo" },
  { id: 24, src: "https://i.postimg.cc/mZXxkV4z/IMG_8250.jpg", title: "Mit Tattoo" },
  { id: 25, src: "https://i.postimg.cc/Pf3GJKHx/IMG_8251.jpg", title: "Mit Tattoo" },
  { id: 26, src: "https://i.postimg.cc/L50GW4D1/IMG_8252.jpg", title: "Mit Tattoo" },
  { id: 27, src: "https://i.postimg.cc/fyb65SxB/IMG_8253.jpg", title: "Mit Tattoo" },
];

// Galeria de Piercings
const PIERCING_GALLERY = [
  { id: 1, src: "https://i.postimg.cc/fRKWHmXn/IMG_9668.jpg", title: "Mit Piercing" },
  { id: 2, src: "https://i.postimg.cc/CLbxqWxL/IMG_4905.jpg", title: "Mit Piercing" },
  { id: 3, src: "https://i.postimg.cc/9QpXxZTH/IMG_9665.jpg", title: "Mit Piercing" },
  { id: 4, src: "https://i.postimg.cc/mgR2N8Py/6946078f_8b47_4bda_a68a_00dc27bda9a2.jpg", title: "Mit Piercing" },
  { id: 5, src: "https://i.postimg.cc/Dy1wXtw5/IMG_4174.jpg", title: "Mit Piercing" },
  { id: 6, src: "https://i.postimg.cc/027ywLyf/703B89A1_30CA_4F78_8AA7_75A816A2A7A0.png", title: "Mit Piercing" },
  { id: 7, src: "https://i.postimg.cc/nhkVdB7j/IMG_4069.jpg", title: "Mit Piercing" },
  { id: 8, src: "https://i.postimg.cc/Qdsxk0B3/70765f39_c33d_4575_984b_897901c8b61c.jpg", title: "Mit Piercing" },
  { id: 9, src: "https://i.postimg.cc/BnsQcMjh/IMG_7552.jpg", title: "Mit Piercing" },
  { id: 10, src: "https://i.postimg.cc/RZ9VQX34/IMG_7553.jpg", title: "Mit Piercing" },
  { id: 11, src: "https://i.postimg.cc/Wb01kQ1J/IMG_8395.jpg", title: "Mit Piercing" },
  { id: 12, src: "https://i.postimg.cc/5239PLvc/IMG_9667.jpg", title: "Mit Piercing" },
];

// Depoimentos dos Clientes
const TESTIMONIALS = [
  {
    id: 1,
    name: "Gabriel Oliveira",
    text: "Lugar sensacional, atendimento nota 1000. Fiz minha primeira tattoo com o Mit e o traço ficou impecável. Recomendo demais!",
    rating: 5
  },
  {
    id: 2,
    name: "Mariana Santos",
    text: "Ambiente super limpo e profissionais muito qualificados. O piercing que coloquei foi super tranquilo e a cicatrização está ótima.",
    rating: 5
  },
  {
    id: 3,
    name: "Felipe Rocha",
    text: "Melhor estúdio da Vila Mariana. O traço é muito fino e delicado, exatamente como eu queria. Atendimento nota 10.",
    rating: 5
  }
];

// --- Components ---

const Logo = ({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "h-10",
    md: "h-16",
    lg: "h-32"
  };
  
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="https://i.postimg.cc/bNQ8VkbN/IMG-1543.png" 
        alt="Mit Tattoo Logo" 
        className={cn("object-contain", sizes[size])}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Galeria', href: '#gallery' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Contato', href: '#contact' },
    { name: 'Localização', href: '#location' },
    { name: 'Instagram', href: 'https://www.instagram.com/mit.tattoo', isExternal: true },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled ? "glass-nav py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif font-bold tracking-widest uppercase">
          Mit tattoo
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="text-sm font-medium uppercase tracking-wider hover:text-beige-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-beige-100 border-b border-beige-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-stone-950/50 z-10" />
            <img 
              src={BACKGROUND_IMAGES[currentImage]} 
              alt="Background" 
              className="w-full h-full object-cover opacity-70 grayscale-[0.3] sepia-[0.2] brightness-[1.1] contrast-[0.8]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <Logo size="lg" />
        </motion.div>
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="block text-sm uppercase tracking-[0.3em] mb-4 font-medium"
        >
          Vila Mariana • São Paulo
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-6xl md:text-8xl font-serif mb-8 leading-tight"
        >
          Mit tattoo <br />
          <span className="text-2xl md:text-3xl italic font-light block mt-4">Onde sua ideia vira obra de arte.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <a 
            href="#gallery" 
            className="inline-block border border-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Ver Galeria
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white opacity-50"
      >
        <div className="w-[1px] h-12 bg-white mx-auto" />
      </motion.div>
    </section>
  );
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<'tattoo' | 'piercing' | 'studio'>('tattoo');
  const [visibleCount, setVisibleCount] = useState(3);

  const getGalleryItems = () => {
    switch (activeTab) {
      case 'tattoo': return TATTOO_GALLERY;
      case 'piercing': return PIERCING_GALLERY;
      case 'studio': return STUDIO_GALLERY;
      default: return TATTOO_GALLERY;
    }
  };

  const items = getGalleryItems();
  const visibleItems = items.slice(0, visibleCount);

  // Reset visible count when switching tabs
  useEffect(() => {
    setVisibleCount(3);
  }, [activeTab]);

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Nossa Arte</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
            <button 
              onClick={() => setActiveTab('tattoo')}
              className={cn(
                "pb-2 text-sm uppercase tracking-widest transition-all",
                activeTab === 'tattoo' ? "border-b-2 border-beige-500 font-bold" : "opacity-50"
              )}
            >
              Tatuagens
            </button>
            <button 
              onClick={() => setActiveTab('piercing')}
              className={cn(
                "pb-2 text-sm uppercase tracking-widest transition-all",
                activeTab === 'piercing' ? "border-b-2 border-beige-500 font-bold" : "opacity-50"
              )}
            >
              Piercings
            </button>
            <button 
              onClick={() => setActiveTab('studio')}
              className={cn(
                "pb-2 text-sm uppercase tracking-widest transition-all",
                activeTab === 'studio' ? "border-b-2 border-beige-500 font-bold" : "opacity-50"
              )}
            >
              O Studio
            </button>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="group relative aspect-[3/4] overflow-hidden bg-beige-100 rounded-2xl"
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-serif text-xl italic">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < items.length && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="px-8 py-4 border border-stone-900 uppercase tracking-widest text-sm font-bold hover:bg-stone-900 hover:text-white transition-all"
            >
              Ver mais fotos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-beige-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">O que dizem nossos clientes</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">A satisfação de quem confia em nossa arte é o que nos move todos os dias.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {TESTIMONIALS.map((t) => (
            <motion.div 
              key={t.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-beige-200 flex flex-col items-center text-center w-full md:w-[calc(33.333%-1.5rem)] max-w-xs"
            >
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-beige-500 text-beige-500" />
                ))}
              </div>
              <Quote className="text-beige-300 mb-3" size={24} />
              <p className="text-stone-600 mb-4 italic leading-relaxed text-sm">"{t.text}"</p>
              <p className="font-serif font-bold text-base uppercase tracking-widest">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl mb-8">Entre em Contato</h2>
        <p className="text-stone-600 mb-12 text-lg">
          Tem uma ideia para sua próxima tattoo ou quer tirar dúvidas sobre um piercing? 
          Estamos prontos para te atender.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <a 
            href="https://wa.me/551120961631" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center space-y-4 group"
          >
            <div className="bg-beige-100 p-4 rounded-full group-hover:bg-beige-200 transition-colors">
              <Phone size={24} className="text-beige-500" />
            </div>
            <div>
              <p className="font-bold uppercase text-[10px] tracking-[0.2em] text-stone-400 mb-1">WhatsApp</p>
              <p className="text-lg group-hover:text-beige-500 transition-colors">(11) 2096-1631</p>
            </div>
          </a>
          
          <a 
            href="https://www.instagram.com/mit.tattoo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center space-y-4 group"
          >
            <div className="bg-beige-100 p-4 rounded-full group-hover:bg-beige-200 transition-colors">
              <Instagram size={24} className="text-beige-500" />
            </div>
            <div>
              <p className="font-bold uppercase text-[10px] tracking-[0.2em] text-stone-400 mb-1">Instagram</p>
              <p className="text-lg group-hover:text-beige-500 transition-colors">@mit.tattoo</p>
            </div>
          </a>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-beige-100 p-4 rounded-full">
              <Clock size={24} className="text-beige-500" />
            </div>
            <div>
              <p className="font-bold uppercase text-[10px] tracking-[0.2em] text-stone-400 mb-1">Horário</p>
              <p className="text-lg">Seg - Sex: 10h às 20h</p>
              <p className="text-lg">Sáb: 09h às 17h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Location = () => {
  return (
    <section id="location" className="bg-beige-100">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="section-padding flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl mb-6">Onde Estamos</h2>
          <div className="flex items-start space-x-4 mb-8">
            <MapPin className="text-beige-500 shrink-0 mt-1" />
            <div>
              <p className="text-xl font-serif mb-2">Rua Áurea, 168</p>
              <p className="text-stone-600">Vila Mariana, São Paulo - SP</p>
              <p className="text-stone-600">CEP: 04015-070</p>
            </div>
          </div>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-beige-500 font-bold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform"
          >
            <span>Ver no Google Maps</span>
            <ChevronRight size={16} />
          </a>
        </div>
        <div className="h-[400px] lg:h-auto w-full grayscale hover:grayscale-0 transition-all duration-700">
          {/* Mock Map Embed */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.452601738743!2d-46.6455116!3d-23.5881023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a266395b057%3A0x6b7794358826d9c6!2sR.%20%C3%81urea%2C%20168%20-%20Vila%20Mariana%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004015-070!5e0!3m2!1spt-BR!2sbr!4v1708684215000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <h3 className="text-2xl font-serif uppercase tracking-widest mb-2">Mit tattoo</h3>
          <p className="text-stone-400 text-sm">© 2019 Mit tattoo Studio. Todos os direitos reservados.</p>
        </div>
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/mit.tattoo" target="_blank" rel="noopener noreferrer" className="hover:text-beige-500 transition-colors"><Instagram /></a>
          <a href="https://wa.me/551120961631" target="_blank" rel="noopener noreferrer" className="hover:text-beige-500 transition-colors"><MessageCircle /></a>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/551120961631"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -2, opacity: 1 }}
      className="fixed bottom-4 right-4 z-50 bg-[#25D366]/80 text-white px-4 py-2 flex items-center gap-2 shadow-xl hover:bg-[#25D366] transition-all uppercase tracking-widest text-[10px] font-bold backdrop-blur-sm"
    >
      <span>Agendar Agora</span>
      <Phone size={14} />
    </motion.a>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-beige-300 selection:text-stone-900">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <Testimonials />
        <Contact />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
