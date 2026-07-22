import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { animate, stagger } from 'animejs';

type Stage = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  state: string;
  detail: string;
};

const MEDIA = {
  cherry: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Coffee_cherries_on_white_background.png',
  bean: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Coffee_bean_transparent.png',
  farm: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Coffee_farm_with_the_surrounding_mountains.jpg',
  processing: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Coffee_Beans_Drying_%2811586771164%29.jpg',
  roasting: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Coffee_Roaster,_Harar,_Ethiopia_(14257683379).jpg',
  cup: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Coffee_ceremony_of_Ethiopia_and_Eritrea_4.jpg',
};

const stages: Stage[] = [
  {
    id: 'farm',
    number: '01',
    eyebrow: 'Born at origin',
    title: 'The journey begins as a ripe coffee cherry.',
    body: 'A photographic scroll experience following one coffee seed from the farm through processing, roasting and the final cup.',
    state: 'Ripe cherry',
    detail: 'Farm · Highlands',
  },
  {
    id: 'selection',
    number: '02',
    eyebrow: 'Harvest and selection',
    title: 'The fruit gives way to the seed inside.',
    body: 'The central object remains fixed while the environment changes around it, creating one continuous visual story.',
    state: 'Selected seed',
    detail: 'Harvest · Selection',
  },
  {
    id: 'green',
    number: '03',
    eyebrow: 'Green coffee',
    title: 'Processed, dried and prepared for export.',
    body: 'The same photographic bean is colour-graded into aligned stages, preventing the distracting jump between unrelated images.',
    state: 'Green bean',
    detail: 'Drying · Sorting',
  },
  {
    id: 'roasting',
    number: '04',
    eyebrow: 'Transformed by heat',
    title: 'Colour deepens as the roast develops.',
    body: 'Scroll position controls colour, scale, rotation, heat light and particle intensity around the photographic bean.',
    state: 'Developing roast',
    detail: 'Heat · First crack',
  },
  {
    id: 'roasted',
    number: '05',
    eyebrow: 'Roasted coffee',
    title: 'A finished bean carrying the character of origin.',
    body: 'Subtle cursor depth, studio light and tasting-note motion create a premium product moment without overpowering the photography.',
    state: 'Roasted bean',
    detail: 'Roasted · Ready',
  },
  {
    id: 'cup',
    number: '06',
    eyebrow: 'From Ethiopia to the cup',
    title: 'One bean becomes a complete coffee experience.',
    body: 'The cinematic story hands over to a practical company website with origins, process information and an export enquiry pathway.',
    state: 'Served coffee',
    detail: 'Brewed · Shared',
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const segment = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));
const fadeWindow = (progress: number, start: number, peak: number, end: number) =>
  progress <= peak ? segment(progress, start, peak) : 1 - segment(progress, peak, end);

function BackgroundScene({
  image,
  opacity,
  className,
  progress,
}: {
  image: string;
  opacity: number;
  className: string;
  progress: number;
}) {
  return (
    <div
      className={`photo-scene ${className}`}
      style={{
        opacity,
        '--scene-image': `url("${image}")`,
        '--scene-shift': `${(progress - 0.5) * 4}%`,
      } as CSSProperties}
      aria-hidden="true"
    >
      <div className="photo-scene__image" />
      <div className="photo-scene__grade" />
    </div>
  );
}

function CentralCoffee({ progress }: { progress: number }) {
  const cherryOpacity = 1 - segment(progress, 0.18, 0.34);
  const seedOpacity = fadeWindow(progress, 0.18, 0.29, 0.41);
  const greenOpacity = fadeWindow(progress, 0.29, 0.43, 0.61);
  const yellowOpacity = fadeWindow(progress, 0.49, 0.61, 0.73);
  const roastOpacity = segment(progress, 0.61, 0.76) * (1 - segment(progress, 0.91, 0.985));
  const objectOpacity = 1 - segment(progress, 0.91, 0.985);
  const rotate = -10 + progress * 78;
  const scale = 0.9 + Math.sin(progress * Math.PI) * 0.12;
  const glow = segment(progress, 0.48, 0.72) * (1 - segment(progress, 0.82, 0.94));

  return (
    <div
      className="coffee-stage"
      style={{
        '--object-rotation': `${rotate}deg`,
        '--object-scale': scale,
        '--object-opacity': objectOpacity,
        '--heat-glow': glow,
      } as CSSProperties}
      aria-hidden="true"
    >
      <div className="coffee-stage__halo" />
      <div className="coffee-stage__orbit coffee-stage__orbit--one" />
      <div className="coffee-stage__orbit coffee-stage__orbit--two" />

      <img
        className="coffee-object coffee-object--cherry"
        src={MEDIA.cherry}
        alt=""
        style={{ opacity: cherryOpacity }}
      />
      <img
        className="coffee-object coffee-object--bean coffee-object--seed"
        src={MEDIA.bean}
        alt=""
        style={{ opacity: seedOpacity }}
      />
      <img
        className="coffee-object coffee-object--bean coffee-object--green"
        src={MEDIA.bean}
        alt=""
        style={{ opacity: greenOpacity }}
      />
      <img
        className="coffee-object coffee-object--bean coffee-object--yellow"
        src={MEDIA.bean}
        alt=""
        style={{ opacity: yellowOpacity }}
      />
      <img
        className="coffee-object coffee-object--bean coffee-object--roast"
        src={MEDIA.bean}
        alt=""
        style={{ opacity: roastOpacity }}
      />

      <span className="taste-note taste-note--one">Floral</span>
      <span className="taste-note taste-note--two">Citrus</span>
      <span className="taste-note taste-note--three">Cocoa</span>
      <span className="taste-note taste-note--four">Caramel</span>
    </div>
  );
}

function CompanyContent() {
  return (
    <section className="company-site" aria-label="Coffee company website content">
      <div className="company-intro content-shell">
        <p className="section-kicker">A real company website after the story</p>
        <div className="company-intro__grid">
          <h2>Origin should be experienced before it is explained.</h2>
          <div>
            <p>
              This section is ready for verified company information: background, sourcing regions, processing capability,
              certifications, available lots and export contact details.
            </p>
            <a className="text-link" href="#contact">Start an export enquiry <span>↗</span></a>
          </div>
        </div>
      </div>

      <div className="origin-section content-shell">
        <div className="section-heading">
          <p className="section-kicker">Sample origin structure</p>
          <h2>Coffees organised by place, process and availability.</h2>
        </div>
        <div className="origin-grid">
          {['Guji', 'Sidama', 'Yirgacheffe'].map((origin, index) => (
            <article className="origin-card" key={origin}>
              <span>0{index + 1}</span>
              <div className="origin-card__photo" style={{ backgroundImage: `url("${index === 1 ? MEDIA.processing : MEDIA.farm}")` }} />
              <div className="origin-card__body">
                <p>Example origin profile</p>
                <h3>{origin}</h3>
                <small>Add verified process, altitude, grade and lot availability.</small>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="process-section content-shell">
        <div className="section-heading">
          <p className="section-kicker">Traceable process</p>
          <h2>A clear operational story for buyers and partners.</h2>
        </div>
        <ol className="process-list">
          {['Sourcing', 'Selection', 'Processing', 'Drying', 'Grading', 'Export preparation'].map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step}</h3>
              <p>Replace this demonstration line with the company’s verified process and control points.</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="contact-section" id="contact">
        <div className="contact-section__image" style={{ backgroundImage: `url("${MEDIA.cup}")` }} />
        <div className="contact-section__content content-shell">
          <p className="section-kicker">Coffee export enquiry</p>
          <h2>Let Ethiopia become the origin of your next coffee.</h2>
          <div className="contact-actions">
            <a href="mailto:export@example.com">Request samples</a>
            <a href="mailto:export@example.com" className="contact-actions__secondary">Contact export team</a>
          </div>
          <small>Demonstration contact details—replace before production use.</small>
        </div>
      </div>

      <footer className="real-footer content-shell">
        <div className="footer-brand"><span className="brand-mark" /> Buna Origin</div>
        <p>Fictional demonstration brand. Photographic credits are documented in the repository README.</p>
        <a href="#top">Return to origin ↑</a>
      </footer>
    </section>
  );
}

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Object.values(MEDIA).forEach((url) => {
      const image = new Image();
      image.src = url;
    });
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!journeyRef.current) return;
      const start = journeyRef.current.offsetTop;
      const distance = Math.max(journeyRef.current.offsetHeight - window.innerHeight, 1);
      const next = clamp((window.scrollY - start) / distance);
      setProgress(next);
      setActiveStage(Math.min(stages.length - 1, Math.floor(next * stages.length + 0.015)));
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const entrance = animate('.loader-letter', {
      opacity: [0, 1],
      y: ['1.2em', 0],
      delay: stagger(reduced ? 0 : 55),
      duration: reduced ? 1 : 650,
      ease: 'out(4)',
    });
    const mark = animate('.loader-bean', {
      opacity: [0, 1],
      scale: [0.55, 1],
      rotate: [-24, 0],
      duration: reduced ? 1 : 900,
      ease: 'out(4)',
    });
    const orbitOne = animate('.coffee-stage__orbit--one', {
      rotate: 360,
      loop: true,
      duration: reduced ? 1 : 14000,
      ease: 'linear',
    });
    const orbitTwo = animate('.coffee-stage__orbit--two', {
      rotate: -360,
      loop: true,
      duration: reduced ? 1 : 19000,
      ease: 'linear',
    });
    const tastes = animate('.taste-note', {
      y: [-6, 6],
      alternate: true,
      loop: true,
      delay: stagger(180),
      duration: reduced ? 1 : 2400,
      ease: 'inOutSine',
    });
    const timer = window.setTimeout(() => setLoading(false), reduced ? 50 : 1750);
    return () => {
      window.clearTimeout(timer);
      entrance.pause();
      mark.pause();
      orbitOne.pause();
      orbitTwo.pause();
      tastes.pause();
    };
  }, []);

  useEffect(() => {
    if (loading || !appRef.current) return;
    const targets = appRef.current.querySelectorAll('.stage-copy.is-active .reveal');
    const motion = animate(targets, {
      opacity: [0, 1],
      y: [28, 0],
      delay: stagger(70),
      duration: 720,
      ease: 'out(4)',
    });
    return () => motion.pause();
  }, [activeStage, loading]);

  const sceneOpacity = useMemo(() => ({
    farm: 1 - segment(progress, 0.24, 0.39),
    processing: fadeWindow(progress, 0.22, 0.43, 0.63),
    roasting: fadeWindow(progress, 0.51, 0.72, 0.9),
    cup: segment(progress, 0.82, 0.98),
  }), [progress]);

  const current = stages[activeStage];
  const percentage = Math.round(progress * 100);
  const journeyOpacity = 1 - segment(progress, 0.955, 1);
  const roastEnergy = segment(progress, 0.5, 0.78) * (1 - segment(progress, 0.82, 0.94));

  const goToStage = (index: number) => {
    if (!journeyRef.current) return;
    const distance = journeyRef.current.offsetHeight - window.innerHeight;
    const target = journeyRef.current.offsetTop + (index / (stages.length - 1)) * distance;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    event.currentTarget.style.setProperty('--pointer-x', x.toFixed(3));
    event.currentTarget.style.setProperty('--pointer-y', y.toFixed(3));
  };

  return (
    <div ref={appRef} className={`app ${loading ? 'is-loading' : 'is-ready'}`} id="top">
      <div className={`loader ${loading ? '' : 'loader--hidden'}`} aria-hidden={!loading}>
        <div className="loader-bean"><span /></div>
        <div className="loader-word" aria-label="Buna Origin">
          {'BUNA ORIGIN'.split('').map((letter, index) => (
            <span className="loader-letter" key={`${letter}-${index}`}>{letter === ' ' ? '\u00A0' : letter}</span>
          ))}
        </div>
        <div className="loader-progress"><i /></div>
        <p>Loading the life of one bean</p>
      </div>

      <section ref={journeyRef} className="journey" onPointerMove={handlePointer}>
        <div className="experience" style={{ opacity: journeyOpacity }}>
          <BackgroundScene image={MEDIA.farm} opacity={sceneOpacity.farm} className="photo-scene--farm" progress={progress} />
          <BackgroundScene image={MEDIA.processing} opacity={sceneOpacity.processing} className="photo-scene--processing" progress={progress} />
          <BackgroundScene image={MEDIA.roasting} opacity={sceneOpacity.roasting} className="photo-scene--roasting" progress={progress} />
          <BackgroundScene image={MEDIA.cup} opacity={sceneOpacity.cup} className="photo-scene--cup" progress={progress} />

          <div className="experience__vignette" />
          <div className="experience__grain" />
          <div className="heat-field" style={{ opacity: roastEnergy }} aria-hidden="true">
            {Array.from({ length: 22 }).map((_, index) => (
              <i key={index} style={{ '--ember-index': index } as CSSProperties} />
            ))}
          </div>

          <header className="site-header">
            <a className="site-brand" href="#top"><span className="brand-mark" /><strong>Buna Origin</strong></a>
            <div className="site-header__meta"><span>Photographic Anime.js study</span><i /><span>Scroll to transform</span></div>
            <button className="menu-button" type="button" aria-label="Open menu"><span /><span /></button>
          </header>

          <nav className="chapter-nav" aria-label="Journey chapters">
            {stages.map((stage, index) => (
              <button
                type="button"
                key={stage.id}
                className={index === activeStage ? 'is-active' : ''}
                onClick={() => goToStage(index)}
                aria-label={`Go to ${stage.eyebrow}`}
              >
                <span>{stage.number}</span><i />
              </button>
            ))}
          </nav>

          <div className="copy-panel">
            {stages.map((stage, index) => (
              <article className={`stage-copy ${index === activeStage ? 'is-active' : ''}`} key={stage.id} aria-hidden={index !== activeStage}>
                <p className="stage-copy__eyebrow reveal">{stage.eyebrow}</p>
                <h1 className="reveal">{stage.title}</h1>
                <p className="stage-copy__body reveal">{stage.body}</p>
                {index === stages.length - 1 && (
                  <a className="journey-cta reveal" href="#company">Explore the company website <span>↓</span></a>
                )}
              </article>
            ))}
          </div>

          <div className="object-panel">
            <div className="object-panel__top"><small>The life of</small><strong>One bean</strong></div>
            <CentralCoffee progress={progress} />
            <div className="object-panel__bottom"><span>{current.detail}</span></div>
          </div>

          <aside className="data-panel">
            <p>Current state</p>
            <h2>{current.state}</h2>
            <div className="data-panel__rule" />
            <dl>
              <div><dt>Journey</dt><dd>{percentage}%</dd></div>
              <div><dt>Chapter</dt><dd>{current.number}</dd></div>
              <div><dt>Origin</dt><dd>Ethiopia</dd></div>
              <div><dt>Medium</dt><dd>Photography</dd></div>
            </dl>
          </aside>

          <div className="scroll-progress" aria-hidden="true">
            <span>Scroll</span>
            <div><i style={{ transform: `scaleX(${Math.max(0.03, progress)})` }} /></div>
            <b>{String(percentage).padStart(2, '0')}</b>
          </div>
        </div>
        <div className="journey-spacer" aria-hidden="true">
          {stages.map((stage) => <div key={stage.id} id={stage.id} />)}
        </div>
      </section>

      <div id="company"><CompanyContent /></div>
    </div>
  );
}
