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

type GeneratedMedia = {
  farm: string;
  selection: string;
  processing: string;
  roasting: string;
  cup: string;
};

const stages: Stage[] = [
  {
    id: 'farm',
    number: '01',
    eyebrow: 'Born at origin',
    title: 'The journey begins as a ripe coffee cherry.',
    body: 'Morning light, highland air and healthy coffee trees shape the first chapter of every remarkable cup.',
    state: 'Ripe cherry',
    detail: 'Farm · Highlands',
  },
  {
    id: 'selection',
    number: '02',
    eyebrow: 'Harvest and selection',
    title: 'The fruit gives way to the seed inside.',
    body: 'Ripe cherries are selected carefully before the seed is separated and prepared for processing.',
    state: 'Selected seed',
    detail: 'Harvest · Selection',
  },
  {
    id: 'green',
    number: '03',
    eyebrow: 'Green coffee',
    title: 'Processed, dried and prepared for export.',
    body: 'Drying, sorting and grading protect the structure and character created at origin.',
    state: 'Green bean',
    detail: 'Drying · Sorting',
  },
  {
    id: 'roasting',
    number: '04',
    eyebrow: 'Transformed by heat',
    title: 'Colour deepens as the roast develops.',
    body: 'Controlled heat transforms the green seed and unlocks its aromatic potential.',
    state: 'Developing roast',
    detail: 'Heat · First crack',
  },
  {
    id: 'roasted',
    number: '05',
    eyebrow: 'Roasted coffee',
    title: 'A finished bean carrying the character of origin.',
    body: 'The roasted bean becomes the concentrated expression of place, process and craft.',
    state: 'Roasted bean',
    detail: 'Roasted · Ready',
  },
  {
    id: 'cup',
    number: '06',
    eyebrow: 'From Ethiopia to the cup',
    title: 'One bean becomes a complete coffee experience.',
    body: 'The journey ends in a warm cup that carries the work of landscapes, people and careful preparation.',
    state: 'Served coffee',
    detail: 'Brewed · Shared',
  },
];

const assetBase = `${import.meta.env.BASE_URL}assets/`;

const assetFiles = {
  farm: ['farm.webp.b64'],
  selection: ['selection.webp.b64'],
  processing: ['processing.webp.b64'],
  roasting: [
    'roasting.webp.b64.part1',
    'roasting.webp.b64.part2',
    'roasting.webp.b64.part3',
    'roasting.webp.b64.part4',
    'roasting.webp.b64.part5',
  ],
  cup: ['cup.webp.b64'],
} satisfies Record<keyof GeneratedMedia, string[]>;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const segment = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));
const fadeWindow = (progress: number, start: number, peak: number, end: number) =>
  progress <= peak ? segment(progress, start, peak) : 1 - segment(progress, peak, end);

async function loadBase64Asset(parts: string[]) {
  const chunks = await Promise.all(
    parts.map(async (part) => {
      const response = await fetch(`${assetBase}${part}`);
      if (!response.ok) throw new Error(`Unable to load ${part}`);
      return (await response.text()).trim();
    }),
  );

  return `data:image/webp;base64,${chunks.join('')}`;
}

function useGeneratedMedia() {
  const [media, setMedia] = useState<GeneratedMedia | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      (Object.entries(assetFiles) as [keyof GeneratedMedia, string[]][]).map(async ([key, parts]) => {
        const source = await loadBase64Asset(parts);
        return [key, source] as const;
      }),
    )
      .then((entries) => {
        if (!cancelled) setMedia(Object.fromEntries(entries) as GeneratedMedia);
      })
      .catch((error) => {
        console.error('Generated coffee imagery could not be loaded.', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return media;
}

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
        '--scene-shift': `${(progress - 0.5) * 3}%`,
      } as CSSProperties}
      aria-hidden="true"
    >
      <div className="photo-scene__image" />
      <div className="photo-scene__grade" />
    </div>
  );
}

function CompanyContent({ media }: { media: GeneratedMedia }) {
  const origins = [
    { name: 'Guji', image: media.farm },
    { name: 'Sidama', image: media.processing },
    { name: 'Yirgacheffe', image: media.selection },
  ];

  return (
    <section className="company-site" aria-label="Coffee company website content">
      <div className="company-intro content-shell">
        <p className="section-kicker">A complete story from origin to cup</p>
        <div className="company-intro__grid">
          <h2>Origin should be experienced before it is explained.</h2>
          <div>
            <p>
              This production structure is ready for verified company information, sourcing regions, processing capability,
              available lots, certifications and export contact details.
            </p>
            <a className="text-link" href="#contact">Start an export enquiry <span>↗</span></a>
          </div>
        </div>
      </div>

      <div className="origin-section content-shell">
        <div className="section-heading">
          <p className="section-kicker">Coffee origins</p>
          <h2>Coffees organised by place, process and availability.</h2>
        </div>
        <div className="origin-grid">
          {origins.map((origin, index) => (
            <article className="origin-card" key={origin.name}>
              <span>0{index + 1}</span>
              <div className="origin-card__photo" style={{ backgroundImage: `url("${origin.image}")` }} />
              <div className="origin-card__body">
                <p>Example origin profile</p>
                <h3>{origin.name}</h3>
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
        <div className="contact-section__image" style={{ backgroundImage: `url("${media.cup}")` }} />
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
        <p>Fictional demonstration brand using custom-generated cinematic imagery.</p>
        <a href="#top">Return to origin ↑</a>
      </footer>
    </section>
  );
}

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLElement>(null);
  const media = useGeneratedMedia();
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const loading = !introComplete || !media;

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
    const letters = animate('.loader-letter', {
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
    const timer = window.setTimeout(() => setIntroComplete(true), reduced ? 50 : 1600);

    return () => {
      clearTimeout(timer);
      letters.pause();
      mark.pause();
    };
  }, []);

  useEffect(() => {
    if (loading || !appRef.current) return;
    const elements = appRef.current.querySelectorAll('.stage-copy.is-active .reveal-item');
    if (!elements.length) return;
    const entrance = animate(elements, {
      opacity: [0, 1],
      y: [28, 0],
      delay: stagger(70),
      duration: 700,
      ease: 'out(4)',
    });
    return () => entrance.pause();
  }, [activeStage, loading]);

  const sceneOpacity = useMemo(() => ({
    farm: 1 - segment(progress, 0.1, 0.22),
    selection: fadeWindow(progress, 0.1, 0.23, 0.37),
    processing: fadeWindow(progress, 0.28, 0.43, 0.59),
    roasting: fadeWindow(progress, 0.5, 0.69, 0.87),
    cup: segment(progress, 0.79, 0.96),
  }), [progress]);

  const current = stages[activeStage];
  const percentage = Math.round(progress * 100);

  return (
    <div ref={appRef} className={`real-app ${loading ? 'is-loading' : 'is-ready'}`}>
      <div className={`loader ${loading ? '' : 'loader-hidden'}`} aria-hidden={!loading}>
        <div className="loader-bean"><span /></div>
        <div className="loader-name" aria-label="Buna Origin">
          {'BUNA ORIGIN'.split('').map((letter, index) => (
            <span className="loader-letter" key={`${letter}-${index}`}>{letter === ' ' ? '\u00A0' : letter}</span>
          ))}
        </div>
        <div className="loader-line"><span /></div>
        <p>{media ? 'Preparing the journey' : 'Loading cinematic scenes'}</p>
      </div>

      <header className="site-header">
        <a className="brand" href="#top"><span className="brand-mark" /><span>Buna Origin</span></a>
        <nav>
          <a href="#journey">Journey</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="header-note">Generated visual experience</span>
      </header>

      <main id="top">
        <section ref={journeyRef} className="journey" id="journey">
          <div className="journey-fixed">
            {media && (
              <>
                <BackgroundScene image={media.farm} opacity={sceneOpacity.farm} className="photo-scene--farm" progress={progress} />
                <BackgroundScene image={media.selection} opacity={sceneOpacity.selection} className="photo-scene--selection" progress={progress} />
                <BackgroundScene image={media.processing} opacity={sceneOpacity.processing} className="photo-scene--processing" progress={progress} />
                <BackgroundScene image={media.roasting} opacity={sceneOpacity.roasting} className="photo-scene--roasting" progress={progress} />
                <BackgroundScene image={media.cup} opacity={sceneOpacity.cup} className="photo-scene--cup" progress={progress} />
              </>
            )}

            <div className="cinematic-vignette" />
            <div className="cinematic-grain" />

            <div className="chapter-rail">
              <span>{current.number}</span>
              <div><i style={{ height: `${percentage}%` }} /></div>
              <span>06</span>
            </div>

            <div className="copy-panel">
              {stages.map((stage, index) => (
                <article className={`stage-copy ${index === activeStage ? 'is-active' : ''}`} key={stage.id}>
                  <p className="eyebrow reveal-item">{stage.eyebrow}</p>
                  <h1 className="reveal-item">{stage.title}</h1>
                  <p className="stage-body reveal-item">{stage.body}</p>
                </article>
              ))}
            </div>

            <div className="object-panel" aria-hidden="true">
              <div className="object-caption object-caption--top"><span>The life of</span><strong>One coffee bean</strong></div>
              <div className="scene-focus" />
              <div className="object-caption object-caption--bottom">{current.detail}</div>
            </div>

            <aside className="fact-panel">
              <span>Current state</span>
              <strong>{current.state}</strong>
              <i />
              <dl>
                <div><dt>Journey</dt><dd>{percentage}%</dd></div>
                <div><dt>Chapter</dt><dd>{current.number}</dd></div>
                <div><dt>Origin</dt><dd>Ethiopia</dd></div>
              </dl>
            </aside>

            {activeStage === 3 && (
              <div className="heat-particles" aria-hidden="true">
                {Array.from({ length: 20 }).map((_, index) => <span key={index} style={{ '--i': index } as CSSProperties} />)}
              </div>
            )}

            <div className="scroll-progress"><span>Scroll to transform</span><i><b style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} /></i></div>
          </div>

          <div className="journey-spacer" aria-hidden="true">
            {stages.map((stage) => <div key={stage.id} />)}
          </div>
        </section>

        {media && <CompanyContent media={media} />}
      </main>
    </div>
  );
}
