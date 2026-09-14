'use strict';
// All text is local. This site needs no framework, service, or network API.
(() => {
  const english = {
    navContact:'Contact us',contactEyebrow:'CONTACT US',contactTitle:'Get in touch with ICX.',contactIntro:'For questions about our technical capabilities, ongoing projects or collaboration, please get in touch by email.',contactInfo:'CONTACT INFORMATION',
    skip:'Skip to content',navLabel:'Main navigation',navAbout:'About us',navExpertise:'Expertise',navApplications:'Applications',navValues:'Our values',
    heroLine1:'Precision in design.',heroLine2:'Connected intelligence.',heroDescription:'From RF communication to embedded sensor networks, we bring electronic design, sensing and data processing together in dependable system solutions.',explore:'Explore our expertise',scroll:'Scroll to explore',
    disciplinesLabel:'Core technologies',discipline1:'RF COMMUNICATION',discipline2:'EMBEDDED SYSTEMS',discipline3:'SENSOR NETWORKS',discipline4:'DATA PROCESSING',
    aboutEyebrow:'ABOUT US',since:'Established in 2019\nFocused on design. Always advancing.',aboutHeading:'From sensing to connection.\nEngineered as one system.',
    aboutP1:'Established in 2019, ICX is an electronics design house focused on RF communication, embedded sensor networks and remote sensing technologies. Our dedicated design team is committed to engineering quality, on-schedule delivery and continuous improvement.',
    aboutP2:'We integrate wired and wireless sensing, automated embedded systems, data management and high-throughput information processing. Our backend server-cluster architecture connects field sensing with the computing infrastructure behind it.',
    aboutP3:'Working with local and international partners, we develop tailored sensor networks and system solutions for enterprise, industrial and high-reliability applications.',aboutNote:'A system-level perspective. Attention to every design detail.',
    expertiseEyebrow:'OUR EXPERTISE',expertiseTitle:'Core technologies.\nA complete system perspective.',expertiseIntro:'Bringing electronic hardware, embedded systems and data architecture together, so every part works as one.',tagsLabel:'Technical areas',
    rfTitle:'RF & communication design',rfText:'Integrating RF, analog and digital design with wired and wireless connectivity to support dependable data transmission between sensing devices and systems.',rfTag1:'RF design',rfTag2:'Communication',rfTag3:'Wired / wireless',
    embeddedTitle:'Embedded system design',embeddedText:'Bringing electronic hardware and embedded design together to integrate sensing, control and data exchange for remote and automated applications.',embeddedTag1:'Electronic hardware',embeddedTag2:'Embedded integration',embeddedTag3:'Automation',
    sensingTitle:'Remote sensing & sensor networks',sensingText:'Connecting sensor nodes, data acquisition and network transmission. We develop wired and wireless sensor networks that turn distributed field information into manageable system data.',sensingTag1:'Remote sensing',sensingTag2:'Sensor nodes',sensingTag3:'Data acquisition',
    dataTitle:'Data processing & system integration',dataText:'Connecting front-end sensor networks to backend server clusters, with integrated data management and high-throughput information processing across the system architecture.',dataTag1:'Data management',dataTag2:'High throughput',dataTag3:'Server clusters',
    systemEyebrow:'SYSTEM INTEGRATION',systemTitle:'From sensor nodes to data insights.',systemIntro:'A complete system architecture connecting field signals with backend information processing.',flowLabel:'System data flow',flow1:'Sense & acquire',flow1sub:'Sensors · Signal data',flow2:'Embedded processing',flow2sub:'Node computing · Control',flow3:'Network & connect',flow3sub:'Wired · Wireless',flow4:'Data & computing',flow4sub:'Server clusters · Processing',systemCaption:'Wired and wireless integration · From field devices to backend architecture',
    applicationsEyebrow:'APPLICATIONS',applicationsTitle:'Different environments.\nThe same care in every design.',applicationsIntro:'Sensing, communication and data systems tailored to the demands of each application and operating environment.',enterpriseTitle:'Enterprise',enterpriseText:'Connecting devices, sensor data and backend platforms to create consistent information flows for enterprise data management and system collaboration.',enterpriseFocus:'Connected devices / Integrated data',industrialTitle:'Industrial',industrialText:'Combining field sensing, embedded control and communication networks for industrial system requirements, remote monitoring and automation.',industrialFocus:'Field sensing / Embedded control',reliabilityTitle:'High reliability',reliabilityText:'For applications where stability and information integrity matter, we focus on system architecture, engineering quality, consistency and continuous improvement.',reliabilityFocus:'System stability / Design quality',
    valuesEyebrow:'OUR VALUES',valuesTitle:'Three letters. One commitment.',valuesIntro:'ICX stands for our commitment to innovation, connection and expertise.',innovateLabel:'Keep advancing',innovateText:'Exploring new possibilities in semiconductor and electronic design, with a focus on performance, efficiency and intelligence in processor, sensor and SoC applications.',connectLabel:'Create connections',connectText:'Linking devices, data and systems. Our communication and sensing technologies connect the elements of IoT, automation and data computing.',xpertiseLabel:'Build on expertise',xpertiseText:'Drawing on analog, digital and RF knowledge to advance quality, reliability and scalability, from components to complete systems.',
    emailLabel:'EMAIL',addressLabel:'ADDRESS',address:'RM053, 24/F, HO KING COMM CTR,\n2-16 FAYUEN ST, MONG KOK, HONG KONG',rights:'All rights reserved.',backTop:'Back to top'
  };
  const textNodes = [...document.querySelectorAll('[data-i18n]')];
  const original = new Map(textNodes.map(el => [el, el.innerHTML]));
  const ariaNodes = [...document.querySelectorAll('[data-i18n-aria]')];
  const originalAria = new Map(ariaNodes.map(el => [el, el.getAttribute('aria-label')]));
  const nav = document.getElementById('main-nav');
  const menu = document.querySelector('.menu-toggle');
  const description = document.querySelector('meta[name="description"]');
  const originalDescription = description.content;
  const originalTitle = document.title;
  let language = 'zh-Hant';
  function closeMenu(restoreFocus = false) {
    nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');updateMenuLabel();
    if (restoreFocus) menu.focus();
  }
  function updateMenuLabel() {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-label', language === 'en' ? (expanded ? 'Close menu' : 'Open menu') : (expanded ? '關閉選單' : '開啟選單'));
  }
  function setLanguage(next) {
    language = next === 'en' ? 'en' : 'zh-Hant';
    document.documentElement.lang = language;
    textNodes.forEach(el => {
      if (language === 'en' && english[el.dataset.i18n] !== undefined) {
        el.replaceChildren(...english[el.dataset.i18n].split('\n').flatMap((line, index) => index ? [document.createElement('br'),document.createTextNode(line)] : [document.createTextNode(line)]));
      } else el.innerHTML = original.get(el);
    });
    ariaNodes.forEach(el => el.setAttribute('aria-label', language === 'en' ? english[el.dataset.i18nAria] : originalAria.get(el)));
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.lang === language)));
    document.title = language === 'en' ? 'About ICX Technology | Electronic Design, Sensing & Connectivity' : originalTitle;
    description.content = language === 'en' ? 'About ICX Technology — An electronics design house focused on RF communication, embedded sensor networks and remote sensing. Connecting field sensing with data processing.' : originalDescription;
    updateMenuLabel();
    try { localStorage.setItem('icx-language',language); } catch (_) { /* Private browsing may disable storage. */ }
  }
  let initial = 'zh-Hant';
  try { initial = localStorage.getItem('icx-language') || initial; } catch (_) { /* Traditional Chinese remains the default. */ }
  const requested = new URLSearchParams(location.search).get('lang');
  if (requested === 'en' || requested === 'zh-Hant') initial = requested;
  setLanguage(initial);
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click',() => {
    setLanguage(button.dataset.lang);
    // Keep explicit language links consistent after a manual switch.
    try {
      const url = new URL(location.href);
      if (url.searchParams.has('lang')) {
        url.searchParams.set('lang', language);
        history.replaceState(null, '', url);
      }
    } catch (_) { /* Some local file browsers restrict history updates. */ }
  }));
  menu.addEventListener('click',() => { const open = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);updateMenuLabel(); });
  nav.addEventListener('click',event => { if(event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown',event => { if(event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true); });
  document.addEventListener('click',event => { if(!event.target.closest('.site-header')) closeMenu(); });
  document.addEventListener('focusin',event => { if(!event.target.closest('.site-header')) closeMenu(); });
  const wide = matchMedia('(min-width: 801px)');
  if (wide.addEventListener) wide.addEventListener('change',() => closeMenu());
  document.getElementById('year').textContent = String(new Date().getFullYear());
  if ('IntersectionObserver' in window) {
    const links = [...nav.querySelectorAll('a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current','location');
            else link.removeAttribute('aria-current');
          });
        }
      });
    }, {rootMargin:'-15% 0px -55% 0px',threshold:0});
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
})();
