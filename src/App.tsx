/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Video, 
  Download, 
  ChevronRight, 
  ExternalLink, 
  Cpu, 
  Globe, 
  BookOpen, 
  Award,
  Menu,
  X,
  Mail
} from 'lucide-react';

// --- Types ---

interface Workshop {
  id: number;
  title: string;
  moderator: string;
  link: string;
  description: string;
  sessions: string[];
  special?: boolean;
}

// --- Data ---

const WORKSHOPS: Workshop[] = [
  {
    id: 1,
    title: "AI in ESP & Needs Analysis",
    moderator: "Halima Saadia Kouidri",
    link: "https://meet.google.com/hnv-vntu-vud",
    description: "Exploring the intersection of English for Specific Purposes and Artificial Intelligence, focusing on modern needs analysis techniques.",
    sessions: [
      "ESP Needs Analysis in the AI Era by Kouidri Halima Saadia",
      "AI Enhanced Needs Analysis in an EFL Context",
      "AI-Assisted Needs Analysis for Designing ESP Curricula"
    ]
  },
  {
    id: 2,
    title: "AI in EMI Pedagogy",
    moderator: "Dr. Souhila Korichi",
    link: "https://meet.google.com/nby-mmcv-ige",
    description: "Leveraging Artificial Intelligence in Algerian English Medium Instruction.",
    sessions: ["Inclusive Multilingual and Multicultural Pedagogies", "AI-Enhanced Learning in EMI"]
  },
  {
    id: 3,
    title: "Teachers’ Roles and Pedagogical Changes",
    moderator: "Dr. Hamzaoui Ahlem",
    link: "https://meet.google.com/iog-phht-ugf",
    description: "Bias Mitigation and Teacher Agency in AI-Integrated Classrooms.",
    sessions: ["Algorithmic Justice", "Pedagogical Shifts in EMI"]
  },
  {
    id: 4,
    title: "AI in Literature and Culture",
    moderator: "Dr. Guellil Assia",
    link: "https://meet.google.com/ztt-nrxy-iwc",
    description: "Bridging Literature and Patterns through AI analysis.",
    sessions: ["Voyant-Based Distant Reading", "AI as a Literary Collaborator"]
  },
  {
    id: 5,
    title: "AI, Cognition and Learning",
    moderator: "Dr. Ouafa OUARNIKI",
    link: "https://meet.google.com/mxx-soba-kex",
    description: "Neuroscientific Foundations of AI-Assisted Foreign Language Learning.",
    sessions: ["Cognitive Scaffold", "Adaptive Language Learning"]
  },
  {
    id: 6,
    title: "AI, Ethics and Society",
    moderator: "Dr. Keraghel Zineb",
    link: "https://meet.google.com/odd-cbuh-hkx",
    description: "Ethical Issues in the Use of AI in Higher Education.",
    sessions: ["Digital Conscience of Machines", "Algorithmic Futures"]
  },
  {
    id: 7,
    title: "AI, Translation and Multilingualism",
    moderator: "Dr. Seddiki Mohamed",
    link: "https://meet.google.com/gvk-jpcz-utp",
    description: "Transforming Students' Engagement through Intercultural Competence.",
    sessions: ["Human–AI Collaborative Pedagogy", "AI in Translation"]
  },
  {
    id: 8,
    title: "AI Tools and Writing",
    moderator: "Dr. Cherfaoui Samia",
    link: "https://meet.google.com/esf-uezi-ved",
    description: "Leveraging AI for Personalized Language Assessment and Feedback.",
    sessions: ["AI-Assisted Prewriting", "LLM Use in Academic Writing"]
  },
  {
    id: 9,
    title: "AI and Interdisciplinary Education",
    moderator: "Dr. BenRedda Djamel",
    link: "https://meet.google.com/ztw-oswk-mpn",
    description: "The Ethical Use of Generative AI in Educational Research.",
    sessions: ["Immersive ESP Pedagogy", "AI as a Co-Teacher"]
  },
  {
    id: 10,
    title: "AI in ESP Contexts",
    moderator: "Dr. Sarra Benchabaane",
    link: "https://meet.google.com/aez-xiar-ejj",
    description: "AI-Driven Pronunciation Training and Emotional Engagement.",
    sessions: ["Metacognitive Awareness", "AI-Powered Chatbots"]
  },
  {
    id: 11,
    title: "AI Mediated Education",
    moderator: "Dr. Mouissa Fattoum",
    link: "https://meet.google.com/fov-ruav-rro",
    description: "Examining how AI tools are reshaping the educational landscape and mediating student-teacher interactions.",
    sessions: [
      "Ethical Horizons in AI-Mediated Education",
      "Machine Creativity: Can AI Produce Literature?",
      "Prompt Pedagogy"
    ]
  },
  {
    id: 12,
    title: "AI Supported ESP and EMI",
    moderator: "Dr. Djihad Afaf Selt",
    link: "https://meet.google.com/iha-khdo-mjc",
    description: "Generative AI in Action: The Role of ChatGPT in Transforming ESP and EMI.",
    sessions: ["Prompt Literacy", "Epistemic Authority"]
  },
  {
    id: 13,
    title: "Perceptions of Generative AI",
    moderator: "Dr. Fetsi Esma",
    link: "https://meet.google.com/mhc-ephg-mfd",
    description: "AI as a Catalyst for Innovation in ESP Teaching and Learning.",
    sessions: ["AI-Supported Flipped Classroom", "Hybrid Narrative Forms"]
  },
  {
    id: 14,
    title: "Generative AI and Collaboration",
    moderator: "Amira Hiba Nouioua",
    link: "https://meet.google.com/thq-xcwe-pgi",
    description: "Redefining the Supervisor’s Role in the AI Era.",
    sessions: ["Strategic Human-Machine Collaboration", "AI as a Cultural Mediator"]
  },
  {
    id: 15,
    title: "Inteligencia Artificial y Enseñanza del Español",
    moderator: "Dr. Redjem Abdelhadi",
    link: "https://meet.google.com/fov-ruav-rro",
    description: "Un enfoque innovador sobre cómo la IA puede potenciar el aprendizaje del idioma español en contextos académicos.",
    sessions: [
      "Herramientas de la IA en la elaboración del TFM",
      "La inteligencia artificial como apoyo al aprendizaje del español",
      "Tecnologías inteligentes y educación intercultural"
    ],
    special: true
  }
];

// No need for ALL_WORKSHOPS with placeholders anymore
const ALL_WORKSHOPS = WORKSHOPS;

const SPEAKERS = [
  {
    name: "Prof. Chaker Abdelaziz KARRACHE",
    role: "Expert in AI Applications",
    institution: "Laghouat University",
    image: "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=7RNb1YAAAAAJ",
    bio: "Leading researcher in AI and distributed systems with over 20 years of experience."
  },
  {
    name: "Dr. Barkat TURQUI",
    role: "Expert in ESP and EMI",
    institution: "Biskra University",
    image: "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=oevbQU8AAAAJ",
    bio: "Specialist in English for Specific Purposes and English as a Medium of Instruction."
  },
  {
    name: "Dr. Ouafa OUARNIKI",
    role: "Expert in ESP, EMI and ICL",
    institution: "Djelfa University",
    image: "/ouafa.webp",
    bio: "Pioneer in teaching English for Specific Purposes, designing ESP courses, and professional development of language teachers"
  },
  {
    name: "Dr. Nadir MHAMEDI",
    role: "Expert In ESP and EMI",
    institution: "Laghouat University",
    image: "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=dXIi10QAAAAJ",
    bio: "Pioneer in implementing learning technologies in Higher Education."
  }
];

// --- Components ---

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectedWorkshop = ALL_WORKSHOPS.find(w => w.id === activeTab) || ALL_WORKSHOPS[0];

  return (
    <div className="min-h-screen bg-[#001f3f] text-white selection:bg-cyan selection:text-navy overflow-x-hidden">
      <NeuralBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan to-electric rounded-lg flex items-center justify-center">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
              AI FOR FUTURE LEARNING
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            <a href="#about" className="hover:text-cyan transition-colors">About</a>
            <a href="#speakers" className="hover:text-cyan transition-colors">Speakers</a>
            <a href="#program" className="hover:text-cyan transition-colors">Program</a>
            <a href="#contact" className="px-6 py-2 bg-cyan text-navy font-bold rounded-full hover:bg-white transition-all transform hover:scale-105">
              CONTACT US
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-navy pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-display font-bold">
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#speakers" onClick={() => setIsMenuOpen(false)}>Speakers</a>
              <a href="#program" onClick={() => setIsMenuOpen(false)}>Program</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-cyan text-navy rounded-xl text-center">CONTACT US</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold tracking-[0.2em] uppercase mb-8">
                <Calendar className="w-4 h-4" />
                18 April 2026 • Online Conference
              </div>
              
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
                AI FOR <span className="text-gradient">FUTURE</span> <br /> LEARNING
              </h1>
              
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-4 leading-relaxed">
                Innovation and Interdisciplinary Approaches in ESP and EMI Contexts. 
                Hosted by <span className="text-cyan font-bold">AILE Laboratory</span> and the <span className="text-cyan font-bold">Faculty of Letters and Languages</span>,<br />
                <span className="text-white font-bold">University of Amar Telidji - Laghouat</span>
              </p>

              <div className="mb-12">
                <p className="text-cyan font-bold tracking-widest uppercase text-sm mb-1">Conference President</p>
                <p className="text-2xl font-display font-bold">Dr. Houda Boumediene</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="group relative px-10 py-5 bg-cyan text-navy font-black text-lg rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.4)]">
                  <span className="relative z-10 flex items-center gap-2">
                    JOIN LIVE NOW <Video className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button 
                  onClick={() => {
                    const content = `
CONFERENCE PROGRAMME
The First National ONLINE Conference
AI for Future Learning: Innovation and Interdisciplinary Approaches in ESP and EMI Contexts
18 April 2026 | Online | Parallel workshops start at 11:00

CONFERENCE PRESIDENT:
Dr. Houda Boumediene

HOST INSTITUTION:
University of Amar Telidji - Laghouat
AILE Laboratory & Faculty of Letters and Languages

KEYNOTE SPEAKERS:
- Prof. Chaker Abdelaziz KARRACHE (Expert in AI Applications)
- Dr. Barkat TURQUI (Expert in ESP and EMI)
- Dr. Ouafa OUARNIKI (Expert in ESP, EMI and ICL)
- Dr. Nadir MHAMEDI (Expert in ESP and EMI)

WORKSHOP 1: AI in ESP & Needs Analysis
Moderator: Halima Saadia Kouidri
Link: https://meet.google.com/hnv-vntu-vud

WORKSHOP 5: AI, Cognition and Learning
Moderator: Dr. Ouafa OUARNIKI

WORKSHOP 15: Inteligencia Artificial y Enseñanza del Español
Moderator: Dr. Redjem Abdelhadi
Link: https://meet.google.com/fov-ruav-rro

... and 12 other parallel workshops.
                    `;
                    const blob = new Blob([content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'Conference_Programme_2026.txt';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center gap-2 px-10 py-5 glass-panel rounded-2xl font-bold hover:bg-white/10 transition-all"
                >
                  <Download className="w-5 h-5" /> DOWNLOAD PROGRAMME
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats / Info Bar */}
        <section className="py-12 border-y border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Speakers", value: "4" },
              { label: "Universities", value: "50+" },
              { label: "Participants", value: "+90" },
              { label: "Workshops", value: "15" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-display font-black text-cyan mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Honorary Presidents Section */}
        <section className="py-24 px-6 bg-white/[0.02] border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter">
                Honorary <span className="text-gradient">Presidents</span>
              </h2>
              <div className="w-20 h-1 bg-cyan mx-auto"></div>
            </div>
            <div className="flex flex-col gap-8">
              {/* Rector - Top Level */}
              <div className="flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-[2rem] bg-white/5 border border-white/10 text-center hover:border-cyan/50 transition-all duration-500 group relative overflow-hidden max-w-md w-full"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-cyan font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Rector of the University</div>
                  <h3 className="text-2xl font-display font-bold text-white/90 group-hover:text-white transition-colors leading-tight">Prof. Benbartal Djamel</h3>
                </motion.div>
              </div>

              {/* Other Presidents - Second Level */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
                {[
                  { name: "Prof. Dadoune Messaoud", role: "Dean of the Faculty" },
                  { name: "Prof. Lahcene Zohra Chahrazed", role: "Head of the Laboratory" },
                ].map((president, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 rounded-[2rem] bg-white/5 border border-white/10 text-center hover:border-cyan/50 transition-all duration-500 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="text-cyan font-bold text-[10px] uppercase tracking-[0.3em] mb-4">{president.role}</div>
                    <h3 className="text-2xl font-display font-bold text-white/90 group-hover:text-white transition-colors leading-tight">{president.name}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section id="speakers" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
                  Keynote <span className="text-gradient">Speakers</span>
                </h2>
                <p className="text-white/50 max-w-xl">
                  Learn from world-class experts at the forefront of AI research and educational innovation.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="w-12 h-1 bg-cyan"></div>
                <div className="w-4 h-1 bg-white/20"></div>
                <div className="w-4 h-1 bg-white/20"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {SPEAKERS.map((speaker, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Hover Info */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-xs text-cyan font-bold uppercase tracking-widest mb-2">Biography</p>
                      <p className="text-sm text-white/80 line-clamp-3">{speaker.bio}</p>
                    </div>
                  </div>
                  
                  <h3 className="font-display font-bold text-xl mb-1 group-hover:text-cyan transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-cyan text-xs font-bold uppercase tracking-widest mb-2">
                    {speaker.role}
                  </p>
                  <p className="text-white/40 text-sm">
                    {speaker.institution}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Program Section */}
        <section id="program" className="py-32 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-display text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
                Interactive <span className="text-gradient">Program</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Explore our 15 parallel workshops covering diverse aspects of AI in education. 
                Select a track to view details and join the live session.
              </p>
            </div>

            <div className="grid lg:grid-cols-[350px_1fr] gap-12">
              {/* Sidebar Tabs */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-white/30 uppercase tracking-[0.3em] mb-6 px-4">Parallel Workshops</p>
                <div className="flex flex-col gap-2">
                  {ALL_WORKSHOPS.map((workshop) => (
                    <button
                      key={workshop.id}
                      onClick={() => setActiveTab(workshop.id)}
                      className={`
                        w-full text-left px-6 py-5 rounded-2xl transition-all flex items-center justify-between group
                        ${activeTab === workshop.id 
                          ? (workshop.special ? 'bg-red-600/20 border-red-500/50 text-red-400' : 'bg-cyan/10 border-cyan/30 text-cyan') 
                          : 'bg-white/5 border-transparent hover:bg-white/10 text-white/60'}
                        border
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`
                          w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black
                          ${activeTab === workshop.id 
                            ? (workshop.special ? 'bg-red-500 text-white' : 'bg-cyan text-navy') 
                            : 'bg-white/10 text-white/40'}
                        `}>
                          {workshop.id}
                        </span>
                        <span className="font-bold text-sm truncate max-w-[180px]">{workshop.title}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === workshop.id ? 'translate-x-1' : 'opacity-0'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`
                      glass-panel rounded-[2rem] p-8 md:p-12 min-h-[500px] flex flex-col
                      ${selectedWorkshop.special ? 'border-red-500/30 shadow-[0_0_50px_rgba(220,38,38,0.1)]' : 'border-white/10'}
                    `}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-6 mb-12">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedWorkshop.special ? 'bg-red-500 text-white' : 'bg-cyan/20 text-cyan'}`}>
                            Workshop {selectedWorkshop.id}
                          </span>
                          {selectedWorkshop.special && (
                            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest">
                              Special Track
                            </span>
                          )}
                        </div>
                        <h3 className={`font-display text-3xl md:text-4xl font-black mb-4 ${selectedWorkshop.special ? 'text-red-400' : ''}`}>
                          {selectedWorkshop.title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/60">
                          <Users className="w-4 h-4 text-cyan" />
                          <span className="text-sm font-medium">Moderator: <span className="text-white">{selectedWorkshop.moderator}</span></span>
                        </div>
                      </div>
                      
                      <a 
                        href={selectedWorkshop.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all transform hover:scale-105
                          ${selectedWorkshop.special ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/20' : 'bg-cyan text-navy hover:bg-white'}
                        `}
                      >
                        JOIN VIA GOOGLE MEET <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 flex-1">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" /> Description
                        </h4>
                        <p className="text-white/70 leading-relaxed">
                          {selectedWorkshop.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                          <Award className="w-4 h-4" /> Key Sessions
                        </h4>
                        <ul className="space-y-4">
                          {selectedWorkshop.sessions.map((session, i) => (
                            <li key={i} className="flex gap-4 group">
                              <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${selectedWorkshop.special ? 'bg-red-500' : 'bg-cyan'}`} />
                              <span className="text-sm text-white/80 group-hover:text-white transition-colors">{session}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-bold uppercase tracking-widest">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Virtual Room {selectedWorkshop.id}</span>
                        <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> International Track</span>
                      </div>
                      <span>18 April 2026</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-panel rounded-[3rem] overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-16 bg-gradient-to-br from-cyan/20 to-electric/20 border-r border-white/10">
                  <h2 className="font-display text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">
                    Get in <span className="text-gradient">Touch</span>
                  </h2>
                  <p className="text-white/60 mb-12 text-lg">
                    Have questions about the conference, workshops, or participation? Our team is here to assist you.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-cyan/10 flex items-center justify-center shrink-0">
                        <Mail className="text-cyan w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-1">General Inquiries</p>
                        <a href="mailto:univ.boumediene@gmail.com" className="text-xl font-bold hover:text-cyan transition-colors">
                          univ.boumediene@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-cyan/10 flex items-center justify-center shrink-0">
                        <Mail className="text-cyan w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-1">Institutional Support</p>
                        <a href="mailto:h.boumediene@lagh-univ.dz" className="text-xl font-bold hover:text-cyan transition-colors">
                          h.boumediene@lagh-univ.dz
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 md:p-16 flex flex-col justify-center">
                  <div className="space-y-6">
                    <h3 className="font-display text-2xl font-bold">Conference Secretariat</h3>
                    <p className="text-white/50">
                      <span className="text-white font-bold">University of Amar Telidji - Laghouat</span><br />
                      <span className="text-cyan font-bold">Faculty of Letters and Languages</span><br />
                      Laghouat, Algeria
                    </p>
                    <div className="pt-8">
                      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold">
                        <Globe className="w-4 h-4 text-cyan" /> Response time: Within 24 hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Institutional Footer */}
        <footer className="py-20 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Cpu className="text-cyan w-6 h-6" />
                  </div>
                  <span className="font-display font-bold text-xl uppercase tracking-tighter">AI FOR FUTURE LEARNING</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">
                  Advancing the frontiers of interdisciplinary research in English for Specific Purposes and English as a Medium of Instruction through Artificial Intelligence.
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="font-display font-bold text-sm uppercase tracking-widest text-cyan">Host Institution</h4>
                <div className="space-y-2 text-sm text-white/60">
                  <p className="font-bold text-white">University of Amar Telidji - Laghouat</p>
                  <p className="text-cyan font-bold">Faculty of Letters and Languages</p>
                  <p>Laghouat, Algeria</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-display font-bold text-sm uppercase tracking-widest text-cyan">Research Laboratory</h4>
                <div className="space-y-2 text-sm text-white/60">
                  <p className="font-bold text-white">AILE Laboratory</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              <p>© 2026 <span className="text-white">University of Amar Telidji - Laghouat</span>. All Rights Reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-cyan transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-cyan transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-cyan transition-colors">Cookie Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
