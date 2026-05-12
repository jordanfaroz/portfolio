import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export default function Portfolio() {
  return (
    <FlowArt aria-label="Jordan Ambrose Faroz — Portfolio">

      {/* ── 01 ABOUT ─────────────────────────────────────────────── */}
      <FlowSection
        aria-label="About Jordan"
        style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-90">
          01 — Jordan Ambrose Faroz
        </p>

        <hr className="my-[2vw] border-t border-white/10" />

        <div>
          <h1 className="text-[clamp(3.5rem,11vw,13rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Build
            <br />
            Systems
            <br />
            That
            <br />
            <span className="text-[#7C6FFF]">Think.</span>
          </h1>
        </div>

        <hr className="my-[2vw] border-t border-white/10" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[52ch] text-[clamp(1rem,2.2vw,1.75rem)] font-normal leading-relaxed opacity-80">
            Software Engineer specialising in LLM evaluation, prompt engineering, and
            production-ready AI integrations — turning research into reliable systems.
          </p>
          <div className="flex flex-col gap-2 text-right text-sm opacity-50">
            <span>Mumbai, India</span>
            <span>+91 09881230156</span>
            <a
              href="mailto:jordanfaroz.jf@gmail.com"
              className="underline underline-offset-4 transition-opacity hover:opacity-100"
            >
              jordanfaroz.jf@gmail.com
            </a>
          </div>
        </div>
      </FlowSection>

      {/* ── 02 SKILLS ────────────────────────────────────────────── */}
      <FlowSection
        aria-label="Skills"
        style={{ backgroundColor: '#F5F0E8', color: '#0A0A0A' }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-90">02 — The Arsenal</p>

        <hr className="my-[2vw] border-t border-black/20" />

        <div>
          <h2 className="text-[clamp(3.5rem,11vw,13rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Code
            <br />
            Meets
            <br />
            AI
          </h2>
        </div>

        <hr className="my-[2vw] border-t border-black/20" />

        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider">Languages</p>
            {['Python', 'JavaScript', 'TypeScript', 'Groovy', 'C#', 'SQL'].map((s) => (
              <p key={s} className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
                {s}
              </p>
            ))}
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider">Frameworks & AI</p>
            {['React', 'Django / DRF', 'TensorFlow', 'spaCy', 'Flair (NER)', 'XSLT'].map((s) => (
              <p key={s} className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
                {s}
              </p>
            ))}
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider">Tools & Integrations</p>
            {['SOAP / REST APIs', 'SQL Server', 'AES & RSA Encryption', 'SoapUI', 'Git', 'Visual Studio'].map((s) => (
              <p key={s} className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
                {s}
              </p>
            ))}
          </div>
        </div>

        <hr className="my-[2vw] border-t border-black/20" />

        <p className="mt-auto max-w-[52ch] text-[clamp(1rem,2.2vw,1.75rem)] font-normal leading-relaxed">
          From encrypted SOAP payloads to neural networks — every tool chosen for the job, not
          the résumé.
        </p>
      </FlowSection>

      {/* ── 03 PROJECTS ──────────────────────────────────────────── */}
      <FlowSection
        aria-label="Projects"
        style={{ backgroundColor: '#1A3DE8', color: '#ffffff' }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-90">03 — The Work</p>

        <hr className="my-[2vw] border-t border-white/20" />

        <div>
          <h2 className="text-[clamp(3.5rem,11vw,13rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Ideas
            <br />
            Shipped
          </h2>
        </div>

        <hr className="my-[2vw] border-t border-white/20" />

        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[200px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">SOAP Automation Engine</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Template-driven engine supporting SaveObject, FetchObject &amp; GetEDSResult APIs —
              eliminated manual XML creation and cut integration errors by 80% in production.
            </p>
          </div>
          <div className="min-w-[200px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">NLP Chatbot</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              TensorFlow-powered chatbot with sentiment analysis and contextual awareness — built
              end-to-end from corpus design to deployment.
            </p>
          </div>
          <div className="min-w-[200px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Resume Parser</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Automated extraction engine using spaCy + Flair NER, handling inconsistent date
              formats across real-world resumes — improved accuracy by 25%.
            </p>
          </div>
        </div>

        <hr className="my-[2vw] border-t border-white/20" />

        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[200px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Clothing Classifier</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Neural network trained on fashion datasets for image-based clothing classification,
              optimised for inference speed and accuracy.
            </p>
          </div>
          <div className="min-w-[200px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">EDS Integrations</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Enterprise Data Services connecting CRM to banking backends via C#, XSLT, and
              AES-128-CBC / RSA encrypted payloads for Java interoperability.
            </p>
          </div>
          <div className="min-w-[200px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">API Test Frameworks</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Python + SoapUI + Groovy validation frameworks with dynamic mock response generation
              and real-time error logging.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* ── 04 EXPERIENCE ────────────────────────────────────────── */}
      <FlowSection
        aria-label="Work experience"
        style={{ backgroundColor: '#18181B', color: '#ffffff' }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-90">04 — The Journey</p>

        <hr className="my-[2vw] border-t border-white/10" />

        <div>
          <h2 className="text-[clamp(3.5rem,11vw,13rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Built
            <br />
            Across
            <br />
            <span className="text-[#7C6FFF]">Industries</span>
          </h2>
        </div>

        <hr className="my-[2vw] border-t border-white/10" />

        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[220px] flex-[2]">
            <p className="mb-1 text-sm font-bold uppercase tracking-wider">
              BUSINESSNEXT · Software Developer / Integration Engineer
            </p>
            <p className="mb-3 text-xs opacity-50 uppercase tracking-wide">May 2025 – Present · Mumbai</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Architected a SOAP Automation Engine, designed 100+ SQL Server stored procedures,
              implemented AES-128-CBC + RSA encryption in XSLT, and built end-to-end EDS
              integrations for enterprise CRM-to-banking system communication.
            </p>
          </div>
          <div className="min-w-[220px] flex-1">
            <p className="mb-1 text-sm font-bold uppercase tracking-wider">
              Prep Study · Software Engineer
            </p>
            <p className="mb-3 text-xs opacity-50 uppercase tracking-wide">Aug – Dec 2024 · Hybrid</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Built NLP resume parsing pipelines using spaCy and Flair, improving NER accuracy
              by 25% across diverse real-world document formats.
            </p>
          </div>
        </div>

        <hr className="my-[2vw] border-t border-white/10" />

        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[220px] flex-1">
            <p className="mb-1 text-sm font-bold uppercase tracking-wider">
              Alpha Payments LLP · Software Engineer
            </p>
            <p className="mb-3 text-xs opacity-50 uppercase tracking-wide">Aug 2023 – May 2024 · Mumbai</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Led Python-based SOAP/REST API automation, Groovy scripting for JSON validation,
              and AES encryption for secure mock request simulation.
            </p>
          </div>
          <div className="min-w-[220px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider">Education</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              <strong className="opacity-100">AI & Machine Learning</strong> — Aptech, Mumbai (2023)
              <br />
              <strong className="opacity-100">BE Engineering</strong> — Fr Agnel College, Mumbai
              (2022) · GPA 7.1
            </p>
          </div>
        </div>
      </FlowSection>

      {/* ── 05 CONTACT ───────────────────────────────────────────── */}
      <FlowSection
        aria-label="Contact"
        style={{ backgroundColor: '#7C3AED', color: '#ffffff' }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-90">05 — Let&apos;s Connect</p>

        <hr className="my-[2vw] border-t border-white/20" />

        <div>
          <h2 className="text-[clamp(3.5rem,11vw,13rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Ready
            <br />
            To
            <br />
            Build?
          </h2>
        </div>

        <hr className="my-[2vw] border-t border-white/20" />

        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Email</p>
            <a
              href="mailto:jordanfaroz.jf@gmail.com"
              className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100"
            >
              jordanfaroz.jf@gmail.com
            </a>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">LinkedIn</p>
            <a
              href="https://linkedin.com/in/jordan-faroz"
              target="_blank"
              rel="noreferrer"
              className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100"
            >
              linkedin.com/in/jordan-faroz
            </a>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Phone</p>
            <a
              href="tel:+910988123015"
              className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100"
            >
              +91 09881230156
            </a>
          </div>
        </div>

        <hr className="my-[2vw] border-t border-white/20" />

        <p className="mt-auto max-w-[52ch] text-[clamp(1rem,2.2vw,1.75rem)] font-normal leading-relaxed opacity-90">
          Whether it&apos;s an enterprise integration, an AI pipeline, or something entirely new —
          let&apos;s build something that matters.
        </p>
      </FlowSection>

    </FlowArt>
  );
}
