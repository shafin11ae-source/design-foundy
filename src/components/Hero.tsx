import React, { useState, useEffect, useRef } from 'react';
import { useMotion } from '../context/MotionContext';
import { ArrowDown, ArrowUpRight, Compass, Layers, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, playFeedbackSound } = useMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (settings.reducedMotion || settings.disableHoverMovement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.reducedMotion, settings.disableHoverMovement]);

  const pMult = settings.parallaxIntensity === 'off' ? 0 : settings.parallaxIntensity === 'subtle' ? 0.3 : settings.parallaxIntensity === 'strong' ? 1.5 : 0.8;

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    playFeedbackSound('click');
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top,
        behavior: settings.reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[92vh] pt-24 pb-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle anti-gravity background glow */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 transition-transform duration-700 ease-out"
        style={{
          backgroundColor: 'var(--text-muted)',
          transform: `translate3d(${mouseOffset.x * 25 * pMult}px, ${mouseOffset.y * 25 * pMult}px, 0)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full my-auto py-8">
        {/* Split Hero: Left typography & Right visual container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 z-10">
            {/* Studio kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
              <span>DESIGN FOUNDRY</span>
              <span aria-hidden="true">·</span>
              <span>EST. 2024</span>
              <span aria-hidden="true">·</span>
              <span>INDEPENDENT ATELIER</span>
            </div>

            {/* Oversized Editorial Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.06]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-main)', textWrap: 'balance' }}
            >
              We Forge Ideas Into Visual Identity.
            </h1>

            {/* Supporting Prose */}
            <p
              className="text-base sm:text-lg max-w-xl leading-relaxed opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              Independent creative studio crafting bold identities, striking visuals, and meaningful digital experiences. We synthesize Swiss typographic discipline with anti-gravity digital motion.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#portfolio"
                onClick={e => scrollToSection(e, 'portfolio')}
                onMouseEnter={() => playFeedbackSound('hover')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer shadow-sm hover:opacity-95 active:scale-98"
                style={{
                  backgroundColor: 'var(--accent-focal)',
                  color: 'var(--accent-inverted)',
                }}
              >
                <span>Explore Our Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={e => scrollToSection(e, 'contact')}
                onMouseEnter={() => playFeedbackSound('hover')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md border transition-all duration-200 cursor-pointer hover:border-white/40 active:scale-98"
                style={{
                  borderColor: 'var(--border-subtle)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                }}
              >
                <span>Start a Project</span>
              </a>
            </div>

            {/* Micro proof line */}
            <div className="flex items-center gap-3 pt-2 text-xs text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] opacity-60"></span>
              <span>Available for select brand commissions, international identity systems & bespoke web design</span>
            </div>
          </div>

          {/* Right Column: 3D Sculpture & Floating Anti-Gravity Objects (lg:col-span-5) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] lg:min-h-[500px]">
            {/* Visual Sculpture Card with responsive pointer tilt */}
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden border transition-transform duration-300 ease-out flex items-center justify-center group"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                transform: settings.disableHoverMovement
                  ? 'none'
                  : `perspective(1000px) rotateX(${mouseOffset.y * -6 * pMult}deg) rotateY(${mouseOffset.x * 6 * pMult}deg)`,
              }}
            >
              {/* High-fidelity generated 3D sculpture */}
              <img
                src="/src/assets/images/hero_sculptural_geometry_1791980133287.jpg"
                alt="DESIGN FOUNDRY 3D abstract titanium sculpture floating in anti-gravity atmosphere"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Floating anti-gravity card: Top-Left coordinate token */}
              <div
                className={`absolute top-5 left-5 px-3 py-1.5 rounded-lg border backdrop-blur-md text-[11px] font-mono tracking-wide flex items-center gap-2 pointer-events-none ${
                  settings.disableFloatingElements ? '' : 'float-levitate'
                }`}
                style={{
                  backgroundColor: 'rgba(var(--bg-surface), 0.75)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)',
                  transform: `translate3d(${mouseOffset.x * -12 * pMult}px, ${mouseOffset.y * -12 * pMult}px, 0)`,
                }}
              >
                <Compass className="w-3.5 h-3.5 opacity-70" />
                <span>FORM · BALANCE · AXIS</span>
              </div>

              {/* Floating anti-gravity card: Bottom-Right token */}
              <div
                className={`absolute bottom-5 right-5 px-3 py-2 rounded-lg border backdrop-blur-md text-xs font-medium flex items-center gap-2 pointer-events-none ${
                  settings.disableFloatingElements ? '' : 'float-levitate-slow'
                }`}
                style={{
                  backgroundColor: 'rgba(var(--bg-surface), 0.85)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)',
                  transform: `translate3d(${mouseOffset.x * 16 * pMult}px, ${mouseOffset.y * 16 * pMult}px, 0)`,
                }}
              >
                <Layers className="w-3.5 h-3.5 opacity-70" />
                <span>Anti-Gravity Spatial Layout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Craftsmanship Standards Strip (Full-width below hero split) */}
        <div
          className="mt-16 pt-8 pb-4 border-t grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <div
              className="text-2xl sm:text-3xl font-extrabold tabular-nums font-mono tracking-tight"
              style={{ color: 'var(--text-main)' }}
            >
              0.1mm
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-1">
              Vector Precision Grid
            </div>
          </div>

          <div>
            <div
              className="text-2xl sm:text-3xl font-extrabold tabular-nums font-mono tracking-tight"
              style={{ color: 'var(--text-main)' }}
            >
              100%
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-1">
              Bespoke Craftsmanship
            </div>
          </div>

          <div>
            <div
              className="text-2xl sm:text-3xl font-extrabold tabular-nums font-mono tracking-tight"
              style={{ color: 'var(--text-main)' }}
            >
              10
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-1">
              Core Design Disciplines
            </div>
          </div>

          <div>
            <div
              className="text-2xl sm:text-3xl font-extrabold tabular-nums font-mono tracking-tight"
              style={{ color: 'var(--text-main)' }}
            >
              48
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-1">
              Typographic Systems Built
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pt-8">
          <a
            href="#services"
            onClick={e => scrollToSection(e, 'services')}
            aria-label="Scroll to Services"
            className="flex flex-col items-center gap-1.5 text-xs text-[var(--text-muted)] opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest">Scroll</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
