'use client';

import { useEffect } from 'react';

const AsciiBackground: React.FC = () => {
  useEffect(() => {
    // Load UnicornStudio runtime once
    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head||document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    // Periodically remove any UnicornStudio branding injected into the DOM
    const hideBranding = () => {
      document.querySelectorAll('[data-us-project] *').forEach((el) => {
        const htmlEl = el as HTMLElement;
        const text  = (htmlEl.textContent  || '').toLowerCase();
        const title = (htmlEl.getAttribute('title') || '').toLowerCase();
        const href  = (htmlEl.getAttribute('href')  || '').toLowerCase();
        if (
          text.includes('unicorn') || text.includes('made with') ||
          title.includes('unicorn') || href.includes('unicorn.studio')
        ) {
          try { htmlEl.remove(); } catch (_) {
            htmlEl.style.display = 'none';
          }
        }
      });
    };

    hideBranding();
    const timer = setInterval(hideBranding, 200);
    [500, 1500, 3000, 6000].forEach((ms) => setTimeout(hideBranding, ms));

    return () => {
      clearInterval(timer);
      try { document.head.removeChild(embedScript); } catch (_) {}
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
      {/* Desktop: sculpture pinned to top-right — small canvas keeps FPS high */}
      <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-[75%]">
        <div
          data-us-project="OMzqyUv6M3kSnv0JeAtC"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Mobile fallback: star field */}
      <div className="lg:hidden w-full h-full ascii-stars-bg" />
    </div>
  );
};

export default AsciiBackground;
