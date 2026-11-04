import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  Filter,
  Globe2,
  Headphones,
  Handshake,
  Laptop,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  Network,
  Phone,
  Printer,
  Route,
  Search,
  Server,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Sun,
  Wifi,
  X,
} from 'lucide-react'
import CiscoSyndication from './components/syndication/CiscoSyndication'
import { CartPage } from './components/cart/CartPage'
import { SiteFooter } from './components/SiteFooter'
import FortinetSyndication from './components/syndication/FortinetSyndication'
import HPSyndication from './components/syndication/HPSyndication'
import VendorSolutionLayout from './components/vendor/VendorSolutionLayout'
import { useCart } from './cart'
import { CSV_CATALOG_META, CSV_PRODUCTS } from './data/catalog'
import './App.css'
import './design-consistency.css'
import './theme-fixes.css'
import './professional-redesign.css'
import './layout-refinement.css'
import './header-polish.css'

const ROUTE_SEGMENTS = [
  'shop',
  'products',
  'products-hp',
  'product',
  'product-category',
  'hp-poly',
  'fortinet',
  'cisco',
  'network-security',
  'servers-storage',
  'infrastructure',
  'support',
  'case-studies',
  'case-study-1',
  'case-study-2',
  'case-study-3',
  'case-study-4',
  'case-study-5',
  'case-study-6',
  'cart',
  'checkout',
  'account',
  'profile',
  'register',
  'password-reset',
  'log-in',
]

function publicAsset(name) {
  const root =
    typeof window === 'undefined'
      ? '/'
      : (() => {
          const parts = window.location.pathname.split('/').filter(Boolean)
          const routeIndex = parts.findIndex((part) => ROUTE_SEGMENTS.includes(part))
          const rootParts = routeIndex === -1 ? parts : parts.slice(0, routeIndex)
          return rootParts.length ? `/${rootParts.join('/')}/` : '/'
        })()
  return `${root}${name}`
}

const ASSETS = {
  logoLight: publicAsset('ccs-logo-primary.png'),
  logoDark: publicAsset('ccs-logo-inverse.png'),
  favicon: 'https://ccs.al/wp-content/uploads/2025/04/cropped-Capture-111111-1.png',
  lightPattern: 'https://ccs.al/wp-content/uploads/2025/04/gplaypattern.png',
  darkPattern: 'https://ccs.al/wp-content/uploads/2025/04/diagmonds.png',
  heroVideo:
    'https://ccs.al/wp-content/uploads/2025/05/05072-online-video-cutter.com-1.mp4',
  shopHero: 'https://images.pexels.com/photos/36985767/pexels-photo-36985767.jpeg?auto=compress&cs=tinysrgb&w=2000',
  aboutOne: 'https://ccs.al/wp-content/uploads/2025/01/20241022_140111-scaled.jpg',
  aboutTwo: 'https://ccs.al/wp-content/uploads/2025/01/20241022_140826-scaled.jpg',
  cyber: 'https://images.pexels.com/photos/5380597/pexels-photo-5380597.jpeg?auto=compress&cs=tinysrgb&w=1600',
  servers: 'https://images.pexels.com/photos/5480781/pexels-photo-5480781.jpeg?auto=compress&cs=tinysrgb&w=1600',
  infrastructure: 'https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg?auto=compress&cs=tinysrgb&w=1600',
  support: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1600',
  gis: 'https://ccs.al/wp-content/uploads/2025/06/CCS-GIS-Systems-1.png',
  map: 'https://ccs.al/wp-content/uploads/2025/06/map.png',
  serverIcon: 'https://ccs.al/wp-content/uploads/2025/06/server.png',
  headset: 'https://ccs.al/wp-content/uploads/2025/06/customer-service-headset.png',
  hpLogo: 'https://ccs.al/wp-content/uploads/2025/04/HP_logo_630x630.png',
  hpPoly: 'https://ccs.al/wp-content/uploads/2025/04/HP-to-acquire-Poly-620x330-1-1-1.png',
  fortinet: 'https://ccs.al/wp-content/uploads/2025/04/fortinet-blob.png',
  cisco: 'https://ccs.al/wp-content/uploads/2025/02/images-2-1.png',
  partnerBackdrop:
    'https://ccs.al/wp-content/uploads/2025/01/360_F_721125176_RFdYa5aw7gPlLjiE8V64t67Oyqwoyb1h.jpg',
  solutionSecurity: 'https://images.pexels.com/photos/5380792/pexels-photo-5380792.jpeg?auto=compress&cs=tinysrgb&w=1600',
  solutionNetwork: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1600',
  solutionStorage: 'https://images.pexels.com/photos/5408005/pexels-photo-5408005.jpeg?auto=compress&cs=tinysrgb&w=1600',
  solutionInfrastructure: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=1600',
  caseTelecom: 'https://ccs.al/wp-content/uploads/2025/02/broadcast.png',
  caseOil: 'https://ccs.al/wp-content/uploads/2025/02/drilling-rig.png',
  caseEnergy: 'https://ccs.al/wp-content/uploads/2025/02/electric-pole.png',
  caseAgriculture: 'https://ccs.al/wp-content/uploads/2025/02/shovel.png',
  caseDefense: 'https://ccs.al/wp-content/uploads/2025/02/defence.png',
  caseData: 'https://ccs.al/wp-content/uploads/2025/02/10695198.png',
  hpe: 'https://ccs.al/wp-content/uploads/2025/06/hpe-new-logo-white.png',
  barracuda: 'https://ccs.al/wp-content/uploads/2025/02/barracuda-networks2232.jpg',
  esri: 'https://ccs.al/wp-content/uploads/2025/02/ESRI-ArcGIS.jpg',
  lenovo: 'https://ccs.al/wp-content/uploads/2025/02/Lenovo-Symbol-2.png',
  microsoft:
    'https://ccs.al/wp-content/uploads/2025/02/microsoft-logo-microsoft-icon-free-free-vector.jpg',
  schneider: 'https://ccs.al/wp-content/uploads/2025/02/Schneider_Electric_2007.svg_-5.png',
  trellix: 'https://ccs.al/wp-content/uploads/2025/02/Trellix-01-3.jpg',
  veeam: 'https://ccs.al/wp-content/uploads/2025/02/veeam-logo-png_seeklogo-345861.png',
  vmware: 'https://ccs.al/wp-content/uploads/2025/02/Vmware.svg_-5.png',
  xerox:
    'https://ccs.al/wp-content/uploads/2025/02/xerox-once-again-leads-with-document-security-innovation-with-ai-infused-rdocs-security-by-rpost-1.png',
  iso45001:
    'https://ccs.al/wp-content/uploads/2025/02/Certificazione-ISO-45001-2018-removebg-preview-1-1-1.png',
  iso20000: 'https://ccs.al/wp-content/uploads/2025/02/ISO-20000-1-2018-Standards-Logo-1.png',
  iso22301: 'https://ccs.al/wp-content/uploads/2025/02/ISO-22301-removebg-preview-1.png',
  iso9001: 'https://ccs.al/wp-content/uploads/2025/02/iso-logo-2018-1.png',
  iso27001: 'https://ccs.al/wp-content/uploads/2025/02/Logo-ISO-27001-1.png',
}

const KNOWN_ROUTE_SEGMENTS = new Set(ROUTE_SEGMENTS)

const COMMERCE_ROUTE_PREFIXES = ['/shop/', '/products/', '/products-hp/', '/hp-poly/', '/product/', '/product-category/', '/cart/', '/checkout/', '/account/', '/profile/', '/register/', '/password-reset/', '/log-in/']

function isCommerceRoute(path) {
  return COMMERCE_ROUTE_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix))
}

const NAV_GROUPS = [
  {
    labelKey: 'home',
    to: '/',
  },
  {
    labelKey: 'about',
    children: [
      { labelKey: 'aboutUs', to: '/#about' },
      { labelKey: 'certifications', to: '/#certification' },
      { labelKey: 'partners', to: '/#partners' },
    ],
  },
  {
    labelKey: 'products',
    children: [
      { labelKey: 'software', to: '/product-category/software/' },
      { labelKey: 'hardware', to: '/product-category/hardware/' },
      { labelKey: 'hpProducts', to: '/products-hp/' },
    ],
  },
  {
    labelKey: 'itSolution',
    children: [
      { labelKey: 'networkSecurity', to: '/network-security/' },
      { labelKey: 'serversStorage', to: '/servers-storage/' },
      { labelKey: 'infrastructure', to: '/infrastructure/' },
      { labelKey: 'technicalSupport', to: '/support/' },
    ],
  },
  {
    labelKey: 'caseStudies',
    to: '/case-studies/',
  },
  {
    labelKey: 'contactUs',
    to: '/#contact',
  },
]

const COPY = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      aboutUs: 'About Us',
      certifications: 'Certifications',
      partners: 'Partners',
      products: 'Products',
      software: 'Software',
      hardware: 'Hardware',
      hpProducts: 'HP products',
      itSolution: 'IT Solution',
      networkSecurity: 'Network & Security',
      serversStorage: 'Servers & Storage',
      infrastructure: 'Infrastructure',
      technicalSupport: 'Technical Support',
      caseStudies: 'Case Studies',
      contactUs: 'Contact Us',
    },
    common: {
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      language: 'Albanian translation',
      shopSearch: 'Shop search',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      readMore: 'Read More',
      viewShop: 'View shop',
      cart: 'Cart',
      addToCart: 'Add to cart',
      addedToCart: 'Added',
      searchPlaceholder: 'Search products by keyword',
      noProducts: 'No products match these filters.',
      clear: 'Clear',
      learnMore: 'Learn more',
      visitOriginal: 'Open original link',
    },
    home: {
      heroTitle: 'Good technology pushes the limits of the impossible.',
      heroText:
        'Integrated IT, security, infrastructure, and support for organizations that need systems they can trust.',
      aboutTitle: 'About us',
      aboutLead:
        'At CCS, we provide comprehensive expertise across all IT components, including networking, infrastructure, and operational systems.',
      aboutBody:
        'Our holistic approach extends beyond technology to encompass business consulting, security solutions, and educational services, ensuring that our clients are well-equipped to navigate the evolving digital landscape.',
      aboutBodyTwo:
        'CCS is more than a technology provider; we are a trusted partner dedicated to transforming the IT landscape and helping businesses thrive in an increasingly digital world.',
      lifecycle:
        'Our end-to-end services cover the entire project lifecycle, from defining business requirements to delivering fully managed IT services.',
      servicesTitle: 'Services',
      gisTitle: 'GIS & ArcGIS services',
      serviceContactTitle: 'Contact us for these services on:',
      partnersTitle: 'Some of our partners',
      partnersIntro:
        'At C.C.S, we believe in building strong, lasting partnerships based on trust, innovation, and shared success. Together, we can create solutions that drive growth, enhance customer experiences, and shape the future of our industry.',
      recommendedTitle: 'Recommended products',
      recommendedIntro:
        'We are here to help you find the perfect product for your needs. Click any product to get more information.',
      certificationsTitle: 'Our certifications',
      contactTitle: 'Get in Touch',
      contacts: 'Contacts',
      location: 'Location',
      hours: 'Working Hours',
      open: 'Open: 8:30 am',
      closed: 'Closed: 5:00 pm',
      address: 'Street Sulejman Delvina, No. 8, 1019, Tirana, Albania',
    },
    shop: {
      all: 'All',
      hardware: 'Hardware',
      software: 'Software',
      desktop: 'Desktop',
      laptop: 'Laptop',
      monitor: 'Monitor',
      printer: 'Printer',
      network: 'Network',
      accessories: 'Accessories',
      filter: 'Filter',
      sort: 'Sort',
      low: 'Lowest price',
      high: 'Highest price',
      showProducts: 'Show products',
      basket: 'Cart',
      welcome: 'Welcome to C.C.S shop',
      capture:
        'Discover a premium selection of the market leading hardware solutions, trusted by professionals and built for performance.',
      whatsapp:
        'Ready to buy? Reach out to us directly on WhatsApp for a seamless purchasing experience.',
      footer:
        'Computer Copier System (CCS), founded in 1993, offers technology, IT solutions, and services for the Albanian information technology market.',
    },
  },
  al: {
    nav: {
      home: 'Kryefaqja',
      about: 'Rreth',
      aboutUs: 'Rreth nesh',
      certifications: 'Certifikime',
      partners: 'Partneret',
      products: 'Produktet',
      software: 'Software',
      hardware: 'Hardware',
      hpProducts: 'Produkte HP',
      itSolution: 'Zgjidhje IT',
      networkSecurity: 'Rrjet & Siguri',
      serversStorage: 'Servera & Storage',
      infrastructure: 'Infrastrukture',
      technicalSupport: 'Suport Teknik',
      caseStudies: 'Raste studimi',
      contactUs: 'Kontakt',
    },
    common: {
      darkMode: 'Modaliteti i erret',
      lightMode: 'Modaliteti i hapur',
      language: 'Perkthe ne shqip',
      shopSearch: 'Kerkim dyqani',
      openMenu: 'Hap navigimin',
      closeMenu: 'Mbyll navigimin',
      readMore: 'Lexo me shume',
      viewShop: 'Shiko dyqanin',
      cart: 'Shporta',
      addToCart: 'Shto ne shporte',
      addedToCart: 'U shtua',
      searchPlaceholder: 'Kerko produktet me fjale kyce',
      noProducts: 'Asnje produkt nuk perputhet me filtrat.',
      clear: 'Pastro',
      learnMore: 'Me shume',
      visitOriginal: 'Hap lidhjen origjinale',
    },
    home: {
      heroTitle: 'Teknologjia e mire shtyn kufijte e te pamundures.',
      heroText:
        'IT, siguri, infrastrukture dhe suport i integruar per organizata qe kerkojne sisteme te besueshme.',
      aboutTitle: 'Rreth nesh',
      aboutLead:
        'Ne CCS ofrojme ekspertize te plote ne komponentet IT, duke perfshire rrjetin, infrastrukturen dhe sistemet operative.',
      aboutBody:
        'Qasja jone shkon pertej teknologjise dhe perfshin konsulence biznesi, zgjidhje sigurie dhe sherbime edukimi, qe klientet te jene gati per nje mjedis dixhital ne ndryshim.',
      aboutBodyTwo:
        'CCS eshte me shume se nje ofrues teknologjie; jemi partner i besuar per transformimin e IT dhe rritjen e bizneseve.',
      lifecycle:
        'Sherbimet tona mbulojne gjithe ciklin e projektit, nga kerkesat e biznesit deri te sherbimet IT te menaxhuara.',
      servicesTitle: 'Sherbime',
      gisTitle: 'Sherbime GIS & ArcGIS',
      serviceContactTitle: 'Na kontaktoni per keto sherbime:',
      partnersTitle: 'Disa nga partneret tane',
      partnersIntro:
        'Ne C.C.S besojme ne partneritete te forta, te qendrueshme dhe te bazuara ne besim, inovacion dhe sukses te perbashket.',
      recommendedTitle: 'Produkte te rekomanduara',
      recommendedIntro:
        'Jemi ketu per tju ndihmuar te gjeni produktin e duhur per nevojat tuaja. Klikoni cdo produkt per me shume informacion.',
      certificationsTitle: 'Certifikimet tona',
      contactTitle: 'Na kontaktoni',
      contacts: 'Kontaktet',
      location: 'Vendndodhja',
      hours: 'Orari',
      open: 'Hapur: 8:30',
      closed: 'Mbyllur: 17:00',
      address: 'Rruga Sulejman Delvina, Nr. 8, 1019, Tirane, Shqiperi',
    },
    shop: {
      all: 'Te gjitha',
      hardware: 'Hardware',
      software: 'Software',
      desktop: 'Desktop',
      laptop: 'Laptop',
      monitor: 'Monitor',
      printer: 'Printer',
      network: 'Network',
      accessories: 'Aksesore',
      filter: 'Filtro',
      sort: 'Rendit',
      low: 'Nga cmimi me i ulet',
      high: 'Nga cmimi me i larte',
      showProducts: 'Shfaq produktet',
      basket: 'Shporta',
      welcome: 'Mire se vini ne dyqanin C.C.S',
      capture:
        'Zbuloni nje perzgjedhje premium te zgjidhjeve hardware, te besuara nga profesionistet dhe te ndertuara per performance.',
      whatsapp:
        'Gati per blerje? Na kontaktoni direkt ne WhatsApp per nje eksperience te shpejte.',
      footer:
        'Computer Copier System (CCS), e themeluar me 1993, ofron teknologji, zgjidhje dhe sherbime informatike per tregun shqiptar.',
    },
  },
}

const SERVICES = [
  {
    key: 'network-security',
    title: 'Network & Security',
    alTitle: 'Rrjet & Siguri',
    short: 'Secure your network with advanced firewalls, VPNs, and real-time protection.',
    alShort: 'Siguroni rrjetin me firewall, VPN dhe mbrojtje ne kohe reale.',
    image: ASSETS.cyber,
    icon: ShieldCheck,
    to: '/network-security/',
  },
  {
    key: 'servers-storage',
    title: 'Servers & Storage',
    alTitle: 'Servera & Storage',
    short: 'Powerful, flexible server and storage solutions tailored to your needs.',
    alShort: 'Zgjidhje te fuqishme dhe fleksibel per servera dhe storage.',
    image: ASSETS.servers,
    icon: Server,
    to: '/servers-storage/',
  },
  {
    key: 'infrastructure',
    title: 'Infrastructure',
    alTitle: 'Infrastrukture',
    short: 'We build structured, scalable IT environments ready for your business growth.',
    alShort: 'Ndertojme mjedise IT te strukturuara dhe te shkallezueshme.',
    image: ASSETS.infrastructure,
    icon: Building2,
    to: '/infrastructure/',
  },
  {
    key: 'support',
    title: 'Technical Support',
    alTitle: 'Suport Teknik',
    short: 'Fast, reliable support from our expert team anytime you need it.',
    alShort: 'Suport i shpejte dhe i besueshem nga ekipi yne kurdo qe duhet.',
    image: ASSETS.support,
    icon: Headphones,
    to: '/support/',
  },
]

const GIS_SERVICES = [
  {
    key: 'planning',
    title: 'Planning',
    alTitle: 'Planifikim',
    subtitle: 'Building an ArcGIS technology Adoption Strategy',
    alSubtitle: 'Ndertimi i nje strategjie adoptimi per teknologjine ArcGIS',
    image: ASSETS.map,
    body:
      'At C.C.S, we offer tailored planning services that adapt to the scale and complexity of your GIS initiatives, from a focused assessment and roadmap to a multi-year Strategic Enterprise Plan.',
    steps: [
      ['Discovery & Assessment', 'We evaluate your current GIS setup and business goals.'],
      ['Data Governance Strategy', 'We define standards, responsibilities, and workflows.'],
      ['Technical Documentation', 'We create clear documentation for usage and scaling.'],
      ['Maintenance Planning', 'We design schedules for updates and continuity.'],
      ['Advisory & Support', 'We offer expert staffing, training, and on-call support.'],
    ],
  },
  {
    key: 'administration',
    title: 'GIS System Administration',
    alTitle: 'Administrim GIS',
    subtitle: 'Proactive and ongoing GIS Infrastructure Management',
    alSubtitle: 'Menaxhim i vazhdueshem dhe proaktiv i infrastruktures GIS',
    image: ASSETS.serverIcon,
    body:
      'C.C.S offers a fully managed service for IT and ArcGIS infrastructure needs, designed to reduce overhead, boost performance, and ensure system reliability.',
    steps: [
      ['System Architecture Design', 'Plan stable GIS architecture.'],
      ['ArcGIS Enterprise Implementation', 'Deploy and configure enterprise environments.'],
      ['Updates & Maintenance', 'Keep platforms current and reliable.'],
      ['Automation', 'Reduce manual work with scripted routines.'],
      ['Backups & Support', 'Protect systems and troubleshoot issues.'],
    ],
  },
  {
    key: 'on-call',
    title: 'GIS On-call',
    alTitle: 'GIS On-call',
    subtitle: 'Premium Support when you need it',
    alSubtitle: 'Suport premium kur ju nevojitet',
    image: ASSETS.headset,
    body:
      'When you are not sure of your exact needs, C.C.S can offer support on standby through an hourly services agreement.',
    steps: [
      ['Troubleshooting', 'Resolve incidents and unblock teams.'],
      ['Data cleanup', 'Improve datasets and geospatial layers.'],
      ['Training', 'Help teams use tools with confidence.'],
      ['Scripting', 'Automate repeated GIS workflows.'],
      ['Maps & apps', 'Reconfigure maps, dashboards, and apps.'],
    ],
  },
]

const PARTNER_LOGOS = {
  hp: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
  hpe: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Hewlett_Packard_Enterprise_logo_2025_expanded.svg',
  cisco: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg',
  fortinet: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Fortinet_logo.svg',
  microsoft: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
  vmware: 'https://upload.wikimedia.org/wikipedia/commons/1/11/VMware_logo.svg',
  veeam: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Veeam_logo.svg',
  trellix: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Trellix_Logo.svg',
  lenovo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Lenovo-Logo.svg',
  schneider: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Schneider_Electric_2007.svg',
  barracuda: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Barracuda_Networks_logo.svg',
  esri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/ArcGIS_Logo_2026.svg',
  xerox: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Xerox_logo.svg',
}

const PARTNERS = [
  ['HP', PARTNER_LOGOS.hp],
  ['HPE', PARTNER_LOGOS.hpe],
  ['Cisco', PARTNER_LOGOS.cisco],
  ['Fortinet', PARTNER_LOGOS.fortinet],
  ['Microsoft', PARTNER_LOGOS.microsoft],
  ['VMware', PARTNER_LOGOS.vmware],
  ['Veeam', PARTNER_LOGOS.veeam],
  ['Trellix', PARTNER_LOGOS.trellix],
  ['Lenovo', PARTNER_LOGOS.lenovo],
  ['Schneider Electric', PARTNER_LOGOS.schneider],
  ['Barracuda Networks', PARTNER_LOGOS.barracuda],
  ['ESRI ArcGIS', PARTNER_LOGOS.esri],
  ['Xerox', PARTNER_LOGOS.xerox],
]

const LOGO_CAROUSEL_AUTOPLAY_DELAY = 3000
const LOGO_CAROUSEL_SWIPE_THRESHOLD = 44

function getLogoCarouselSlidesPerPage() {
  if (typeof window === 'undefined') {
    return 6
  }

  if (window.innerWidth >= 1280) {
    return 6
  }

  if (window.innerWidth >= 1024) {
    return 5
  }

  if (window.innerWidth >= 768) {
    return 4
  }

  if (window.innerWidth >= 480) {
    return 3
  }

  return 2
}

const RECOMMENDED = [
  {
    title: 'HP',
    alTitle: 'HP',
    image: ASSETS.hpLogo,
    to: '/products-hp/',
    body: 'Reliable HP workstations, laptops, printers, displays, and business hardware.',
  },
  {
    title: 'HP Poly',
    alTitle: 'HP Poly',
    image: ASSETS.hpPoly,
    to: '/hp-poly/',
    body: 'Modern collaboration, conferencing, headsets, and meeting-room devices.',
  },
  {
    title: 'Fortinet',
    alTitle: 'Fortinet',
    image: ASSETS.fortinet,
    to: '/fortinet/',
    body: 'Network protection, firewalls, secure access, and threat intelligence.',
  },
  {
    title: 'Cisco',
    alTitle: 'Cisco',
    image: ASSETS.cisco,
    to: '/cisco/',
    body: 'Enterprise networking, switching, wireless, and collaboration systems.',
  },
]

const CERTIFICATIONS = [
  ['ISO 45001', ASSETS.iso45001],
  ['ISO 20000', ASSETS.iso20000],
  ['ISO 22301', ASSETS.iso22301],
  ['ISO 9001', ASSETS.iso9001],
  ['ISO 27001', ASSETS.iso27001],
]

const PAGE_DATA = {
  '/network-security/': {
    title: 'Network & Security',
    alTitle: 'Rrjet & Siguri',
    image: ASSETS.solutionNetwork,
    icon: ShieldCheck,
    solutionKey: 'network',
    intro:
      'We provide comprehensive network and security solutions to keep your business safe, compliant, and always connected.',
    alIntro:
      'Zgjidhje te plota per sigurine e rrjetit dhe mbrojtje ndaj kercenimeve moderne.',
    points: [
      'Advanced firewalls, secure VPN, endpoint protection, and real-time monitoring.',
      'Technologies such as Fortinet, Trellix, FortiMail, FortiEDR, XDR, and DDoS protection.',
      'Protection for ransomware, phishing, distributed attacks, and day-to-day risk exposure.',
    ],
  },
  '/servers-storage/': {
    title: 'Servers & Storage',
    alTitle: 'Servera & Storage',
    image: ASSETS.solutionStorage,
    icon: Server,
    solutionKey: 'storage',
    intro:
      'We provide secure, scalable, and high-performance server and storage solutions designed to meet the growing demands of your business.',
    alIntro:
      'Zgjidhje te sigurta, te shkallezueshme dhe performante per servera dhe storage.',
    points: [
      'Server maintenance, automated backup, recovery, and performance optimization.',
      'On-premise, cloud, and hybrid storage models matched to workload and compliance needs.',
      'Redundant storage systems and disaster recovery planning for critical data.',
    ],
  },
  '/infrastructure/': {
    title: 'Infrastructure',
    alTitle: 'Infrastrukture',
    image: ASSETS.solutionInfrastructure,
    icon: Building2,
    solutionKey: 'infrastructure',
    intro:
      'We provide robust and reliable IT infrastructure support, ensuring your business operates smoothly with seamless network management.',
    alIntro:
      'Suport i qendrueshem per infrastrukture IT te sigurt, rezistente dhe te shkallezueshme.',
    points: [
      'Structured IT environments, server maintenance, network management, and cybersecurity.',
      'Business continuity, backup, disaster recovery, scalability, and performance planning.',
      'Modern infrastructure that supports growth, reliability, and operational speed.',
    ],
  },
  '/support/': {
    title: 'Technical Support',
    alTitle: 'Suport Teknik',
    image: ASSETS.support,
    icon: Headphones,
    solutionKey: 'support',
    intro:
      'Write an issue to the form down below to contact us about your problem.',
    alIntro:
      'Suport i shpejte nga ekspertet e CCS per operacionet, incidentet dhe permiresimet.',
    points: [
      'Troubleshooting, maintenance, upgrades, user assistance, and operational guidance.',
      'On-call expertise for IT, network, server, storage, and GIS environments.',
      'Support designed to keep teams focused and systems available.',
    ],
  },
  '/products-hp/': {
    title: 'Products HP',
    alTitle: 'Produkte HP',
    image: ASSETS.hpLogo,
    icon: Laptop,
    intro:
      'Reliable, high-performance HP solutions tailored for business productivity and operational stability.',
    alIntro:
      'Zgjidhje HP te besueshme dhe performante per produktivitet dhe stabilitet biznesi.',
    points: [
      'Workstations, laptops, desktops, monitors, printers, and enterprise hardware.',
      'HP devices selected for professionals, offices, support teams, and IT departments.',
      'Pair HP products with CCS support, setup, security, and lifecycle services.',
    ],
    action: '/shop/',
  },
  '/hp-poly/': {
    title: 'HP Poly',
    alTitle: 'HP Poly',
    image: ASSETS.hpPoly,
    icon: Headphones,
    intro:
      'Modern collaboration products for clear meetings, smarter rooms, and reliable communication.',
    alIntro:
      'Produkte moderne bashkepunimi per takime te qarta dhe komunikim te besueshem.',
    points: [
      'Headsets, video bars, conferencing systems, and room devices.',
      'Designed for hybrid work, meeting rooms, call centers, and executive spaces.',
      'CCS helps with selection, setup, integration, and support.',
    ],
  },
  '/fortinet/': {
    title: 'Fortinet',
    alTitle: 'Fortinet',
    image: ASSETS.fortinet,
    icon: ShieldCheck,
    intro:
      'Security-driven networking solutions for firewall protection, secure access, and threat prevention.',
    alIntro:
      'Zgjidhje sigurie per firewall, akses te sigurt dhe parandalim kercenimesh.',
    points: [
      'FortiGate, secure VPN, SD-WAN, FortiMail, FortiEDR, and DDoS protection options.',
      'Policy design, deployment support, monitoring, and maintenance.',
      'Built for business continuity and modern cyber resilience.',
    ],
  },
  '/cisco/': {
    title: 'Cisco',
    alTitle: 'Cisco',
    image: ASSETS.cisco,
    icon: Wifi,
    intro:
      'Enterprise networking and collaboration solutions for secure connectivity and productive teams.',
    alIntro:
      'Zgjidhje rrjeti dhe bashkepunimi per lidhje te sigurta dhe ekipe produktive.',
    points: [
      'Switching, routing, wireless, security, and collaboration infrastructure.',
      'Network design, implementation, configuration, and operational support.',
      'Scalable systems for offices, campuses, and growing businesses.',
    ],
  },
  '/products/': {
    title: 'Products',
    alTitle: 'Produktet',
    image: ASSETS.hpLogo,
    icon: Cpu,
    intro:
      'Explore CCS product offerings across software, hardware, HP, networking, and security.',
    alIntro:
      'Eksploroni produktet CCS ne software, hardware, HP, rrjet dhe siguri.',
    points: [
      'Software and hardware solutions that improve efficiency and reliability.',
      'Professional product selection supported by CCS technical expertise.',
      'Use the shop search to filter available hardware quickly.',
    ],
    action: '/shop/',
  },
}

const CASE_STUDIES = [
  {
    path: '/case-study-1/',
    industry: 'Telecommunications',
    title: 'Fortifying Telecom Networks: Next-Gen Firewalls for Unmatched Security',
    image: ASSETS.caseTelecom,
    body: 'Carrier-grade firewall deployment for stronger network security and scalable traffic protection.',
  },
  {
    path: '/case-study-2/',
    industry: 'Oil & Gas',
    title: 'Revolutionizing IT Infrastructure for a Premier Oil & Gas Enterprise',
    image: ASSETS.caseOil,
    body: 'Infrastructure modernization for secure, resilient operations across demanding environments.',
  },
  {
    path: '/case-study-3/',
    industry: 'Energy Transmission',
    title: 'Strengthening Energy Transmission through a Comprehensive IT Infrastructure',
    image: ASSETS.caseEnergy,
    body: 'A comprehensive IT infrastructure project supporting continuity and secure energy transmission.',
  },
  {
    path: '/case-study-4/',
    industry: 'Agriculture',
    title: 'Transforming Agricultural Research with an Innovative WEB-GIS System',
    image: ASSETS.caseAgriculture,
    body: 'A WEB-GIS system that improves agricultural research, mapping, and digital decision-making.',
  },
  {
    path: '/case-study-5/',
    industry: 'Defense',
    title: 'Fortifying Military Geospatial Data with a State-of-the-Art Information System',
    image: ASSETS.caseDefense,
    body: 'Secure geospatial information systems for sensitive military data and operational readiness.',
  },
  {
    path: '/case-study-6/',
    industry: 'Telecommunications',
    title: 'Boosting Data Protection with Trellix DLP for a Telecom Powerhouse',
    image: ASSETS.caseData,
    body: 'Data-loss-prevention implementation to protect critical telecom information flows.',
  },
]

const IT_SOLUTION_SLIDES = [
  {
    key: 'network',
    to: '/network-security/',
    image: ASSETS.solutionNetwork,
    title: 'Network & Security',
    alTitle: 'Rrjet & Siguri',
    intro:
      'We provide comprehensive network and security solutions to keep your business safe, compliant, and always connected.',
  },
  {
    key: 'storage',
    to: '/servers-storage/',
    image: ASSETS.solutionStorage,
    title: 'Servers & Storage',
    alTitle: 'Servera & Storage',
    intro:
      'Secure, scalable, and high-performance server and storage solutions designed for growing business demands.',
  },
  {
    key: 'infrastructure',
    to: '/infrastructure/',
    image: ASSETS.solutionInfrastructure,
    title: 'Infrastructure',
    alTitle: 'Infrastrukture',
    intro:
      'Reliable IT infrastructure support with seamless network management, proactive maintenance, and cybersecurity.',
  },
  {
    key: 'support',
    to: '/support/',
    image: ASSETS.support,
    title: 'Technical Support',
    alTitle: 'Suport Teknik',
    intro:
      'Responsive technical support, infrastructure monitoring, troubleshooting, and lifecycle assistance from the CCS team.',
  },
]

const SOLUTION_CONTENT = {
  network: {
    title: 'Comprehensive Network Security Solutions',
    subtitle:
      'Advanced protection against modern cyber threats, with cutting-edge technologies like Fortinet and Trellix.',
    cards: [
      {
        title: 'Ransomware Attacks',
        kicker: 'Mitigated by: Trellix Endpoint Security & FortiEDR',
        body: 'Protect your data and systems with real-time ransomware defense mechanisms.',
      },
      {
        title: 'Phishing Attacks',
        kicker: 'Mitigated by: Fortinet FortiMail & Trellix XDR',
        body: 'Prevent phishing attempts with advanced filtering and monitoring solutions.',
      },
      {
        title: 'DDoS Attacks',
        kicker: 'Mitigated by: FortiDDoS Protection',
        body: 'Ensure your network remains online and functional during large-scale DDoS attacks.',
      },
    ],
  },
  storage: {
    title: 'Flexible Servers & Scalable Storage Solutions',
    subtitle: 'Choose the perfect storage model for your business: On-Prem, Cloud, or Hybrid.',
    rows: [
      [
        'On-Premise Storage',
        'Full control over your data and systems. Better security and compliance for sensitive information. Optimized high performance for specific workloads.',
      ],
      [
        'Cloud Storage',
        'Highly scalable to grow with your business. Cost-effective with pay-as-you-go pricing. Access your data anywhere with internet access.',
      ],
      [
        'Hybrid Storage',
        'Combines the benefits of cloud and on-premise storage. Optimized for scalability while maintaining security and flexible data management.',
      ],
    ],
  },
  infrastructure: {
    title: 'Future-Proof Your Business with Modern IT Infrastructure',
    subtitle: 'Empower your organization with scalable, secure, and efficient systems.',
    cards: [
      {
        title: 'Business Continuity & Reliability',
        body: 'Ensure 24/7 uptime with robust backup solutions and disaster recovery planning.',
      },
      {
        title: 'Scalability & Flexibility',
        body: 'Scale your infrastructure effortlessly with cloud-based or hybrid models.',
      },
      {
        title: 'Cybersecurity & Compliance',
        body: 'Implement zero-trust security models and stay compliant with industry standards.',
      },
    ],
  },
  support: {
    title: 'Technical Support',
    subtitle: 'Write an issue to the form down below to contact us about your problem.',
  },
}

const AUTH_PAGES = {
  '/log-in/': ['Log In', 'Access your CCS account area.'],
  '/register/': ['Register', 'Create a CCS account profile.'],
  '/profile/': ['Profile', 'View and manage your customer profile.'],
  '/account/': ['Account', 'Review account details and saved information.'],
  '/password-reset/': ['Password Reset', 'Reset your account password securely.'],
  '/checkout/': ['Checkout', 'Complete your order details.'],
}

const STORE_PRODUCTS_ENDPOINT = 'https://ccs.al/wp-json/wc/store/v1/products'
const STORE_PRODUCTS_PAGE_SIZE = 100
function storeProductsUrl(params = {}) {
  const search = new URLSearchParams({
    per_page: String(STORE_PRODUCTS_PAGE_SIZE),
    ...params,
  })
  return `${STORE_PRODUCTS_ENDPOINT}?${search.toString()}`
}

async function fetchStoreProducts(params = {}) {
  const response = await fetch(storeProductsUrl(params))
  if (!response.ok) throw new Error(`Product API failed: ${response.status}`)
  return response.json()
}

function stripHtml(value = '') {
  const text = value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&#8211;|&ndash;/g, '-')
    .replace(/&#8243;|&Prime;/g, '"')
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/\s+\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .trim()

  if (typeof document === 'undefined') {
    return text
  }

  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

function descriptionLines(html) {
  return stripHtml(html)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function storePriceLabel(prices) {
  if (!prices?.price) return ''
  const amount = Number(prices.price)
  if (!Number.isFinite(amount) || amount <= 0) return ''

  return `${new Intl.NumberFormat('sq-AL', {
    maximumFractionDigits: prices.currency_minor_unit || 0,
  }).format(amount)} ${prices.currency_symbol || prices.currency_code || ''}`.trim()
}

function inferProductKind(categories = []) {
  const links = categories.map((category) => category.link || '').join(' ')
  const slugs = categories.map((category) => category.slug)

  if (links.includes('/software/') || slugs.includes('software')) return 'software'
  if (links.includes('/hardware/') || slugs.includes('hardware')) return 'hardware'
  if (slugs.some((slug) => ['security', 'backup', 'office', 'productivity-business-applications'].includes(slug))) {
    return 'software'
  }
  return 'hardware'
}

function inferProductCategory(categories = [], kind = 'hardware') {
  const slugs = categories.map((category) => category.slug)
  if (kind === 'software') return 'software'
  if (slugs.some((slug) => ['desktop', 'aio'].includes(slug))) return 'desktop'
  if (slugs.includes('laptop')) return 'laptop'
  if (slugs.some((slug) => ['monitor', 'monitors'].includes(slug))) return 'monitor'
  if (slugs.some((slug) => ['printer', 'printers'].includes(slug))) return 'printer'
  if (slugs.some((slug) => ['network', 'adapter', 'charger-adapter'].includes(slug))) return 'network'
  if (slugs.includes('accessories')) return 'accessories'
  return 'hardware'
}

function normalizeStoreProduct(item) {
  const categories = item.categories || []
  const brands = item.brands || []
  const kind = inferProductKind(categories)
  const category = inferProductCategory(categories, kind)
  const description = descriptionLines(item.description || item.short_description || '')
  const priceLabel = kind === 'software' ? '' : storePriceLabel(item.prices)
  const priceValue = kind === 'software' ? null : Number(item.prices?.price || 0)
  const image = item.images?.[0]?.src || ASSETS.favicon
  const tokens = [
    kind,
    category,
    item.slug,
    item.name,
    ...categories.flatMap((cat) => [cat.slug, cat.name]),
    ...brands.flatMap((brand) => [brand.slug, brand.name]),
    ...description,
  ]
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  return {
    id: item.id,
    slug: item.slug,
    name: stripHtml(item.name),
    price: priceValue,
    priceLabel,
    image,
    gallery: item.images?.map((entry) => entry.src).filter(Boolean) || [image],
    tokens,
    category,
    kind,
    brand: brands[0]?.name || 'CCS',
    categories,
    brands,
    description,
    originalUrl: item.permalink,
    onSale: item.on_sale,
    regularPriceLabel:
      kind === 'software' || item.prices?.regular_price === item.prices?.price
        ? ''
        : storePriceLabel({ ...item.prices, price: item.prices?.regular_price }),
  }
}

function useProducts() {
  return { products: CSV_PRODUCTS, loading: false }
}

const AVAILABILITY_FILTER = {
  key: 'availability',
  title: 'Availability',
  options: [['instock', 'In stock'], ['quote', 'Quote / inquiry']],
}

const SHOP_FILTERS = [
  { key: 'brand', title: 'Brand', options: [] },
  AVAILABILITY_FILTER,
]

const HARDWARE_CATEGORY_KEYS = new Set(['desktop', 'laptop', 'monitor', 'printer', 'network', 'accessories'])

const HARDWARE_FACETS_BY_CATEGORY = {
  desktop: [
    { key: 'processor', title: 'Processor' },
    { key: 'ram', title: 'RAM' },
    { key: 'storage', title: 'Storage' },
    { key: 'os', title: 'Operating System' },
  ],
  laptop: [
    { key: 'processor', title: 'Processor' },
    { key: 'ram', title: 'RAM' },
    { key: 'storage', title: 'Storage' },
    { key: 'os', title: 'Operating System' },
  ],
  monitor: [
    { key: 'screen-size', title: 'Screen Size' },
    { key: 'resolution', title: 'Resolution' },
    { key: 'connectivity', title: 'Connectivity' },
  ],
  printer: [
    { key: 'print-technology', title: 'Technology' },
    { key: 'print-color', title: 'Color' },
    { key: 'paper-format', title: 'Format' },
    { key: 'duplex', title: 'Duplex' },
    { key: 'printer-connectivity', title: 'Connectivity' },
  ],
  network: [
    { key: 'network-type', title: 'Device Type' },
    { key: 'network-speed', title: 'Speed' },
    { key: 'network-interface', title: 'Interface' },
  ],
  accessories: [
    { key: 'accessory-type', title: 'Accessory Type' },
    { key: 'accessory-connection', title: 'Connection' },
    { key: 'compatibility', title: 'Compatibility' },
  ],
}

function matchesShopCategory(item, category) {
  if (category === 'all') return true
  if (category === 'hardware' || category === 'software') return item.kind === category
  if (HARDWARE_CATEGORY_KEYS.has(category)) return item.kind === 'hardware' && item.category === category
  return false
}

function normalizeFilterToken(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function productBrandOptions(products, category) {
  const brands = new Map()

  products
    .filter((item) => matchesShopCategory(item, category))
    .forEach((item) => {
      const itemBrands = item.brands?.length
        ? item.brands
        : [{ name: item.brand, slug: normalizeFilterToken(item.brand) }]

      itemBrands.forEach((brand) => {
        const label = String(brand.name || '').trim()
        const token = normalizeFilterToken(brand.slug || label)
        if (token && label) brands.set(token, label)
      })
    })

  return [...brands.entries()]
    .map(([token, label]) => [token, label])
    .sort((a, b) => a[1].localeCompare(b[1], undefined, { sensitivity: 'base' }))
}

function facetToken(key, label) {
  return `${key}:${normalizeFilterToken(label)}`
}

function facetOption(key, label) {
  return [facetToken(key, label), label]
}

function uniqueFacetOptions(options) {
  const seen = new Set()
  return options.filter(([token]) => {
    if (seen.has(token)) return false
    seen.add(token)
    return true
  })
}

function productFacetLines(item) {
  const variantLines = (item.variants || []).flatMap((variant) => [
    variant.name,
    variant.attributeName,
    variant.attributeValue,
  ])

  return [
    item.name,
    item.brand,
    item.attributeName,
    item.attributeValues,
    ...(item.specs || []),
    ...(item.description || []),
    ...variantLines,
  ]
    .filter(Boolean)
    .map(String)
}

function productFacetText(item) {
  return productFacetLines(item).join(' ')
}

function normalizedFacetText(item) {
  return productFacetText(item).toLowerCase().replace(/\s+/g, ' ')
}

function facetLinesMatching(item, pattern) {
  return productFacetLines(item).filter((line) => pattern.test(line))
}

function toFacetOptions(key, labels) {
  return uniqueFacetOptions(labels.filter(Boolean).map((label) => facetOption(key, label)))
}

function extractProcessorOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\bcore\s*ultra\s*5\b|\bultra\s*5\b/.test(text)) labels.push('Core Ultra 5')
  if (/\bcore\s*ultra\s*7\b|\bultra\s*7\b/.test(text)) labels.push('Core Ultra 7')
  if (/\bcore\s*i3\b|\bi3-\d/.test(text)) labels.push('Core i3')
  if (/\bcore\s*i5\b|\bi5-\d/.test(text)) labels.push('Core i5')
  if (/\bcore\s*i7\b|\bi7-\d/.test(text)) labels.push('Core i7')
  if (/\bryzen\s*5\b/.test(text)) labels.push('Ryzen 5')
  if (/\bryzen\s*7\b/.test(text)) labels.push('Ryzen 7')
  if (/\bxeon\b/.test(text)) labels.push('Xeon')

  return toFacetOptions('processor', labels)
}

function extractRamOptions(item) {
  const labels = facetLinesMatching(item, /memoria|memory|ram/i)
    .map((line) => line.match(/\b(4|8|12|16|24|32|64)\s*gb\b/i)?.[1])
    .filter(Boolean)
    .map((size) => `${size}GB RAM`)

  return toFacetOptions('ram', labels)
}

function normalizeStorageSize(size, unit) {
  return `${size.replace(/\.0$/, '')}${unit.toUpperCase()}`
}

function extractStorageOptions(item) {
  const labels = facetLinesMatching(item, /kapaciteti|storage|ssd|hdd|sata|nvme|pcie/i)
    .map((line) => {
      const match = line.match(/\b(\d+(?:\.\d+)?)\s*(tb|gb)\b/i)
      if (!match) return ''

      const lowerLine = line.toLowerCase()
      const size = normalizeStorageSize(match[1], match[2])
      const type = /ssd|nvme|pcie|m\.2/.test(lowerLine)
        ? 'SSD'
        : /hdd|sata|7200\s*rpm/.test(lowerLine)
          ? 'HDD SATA'
          : ''

      return type ? `${size} ${type}` : size
    })
    .filter(Boolean)

  return toFacetOptions('storage', labels)
}

function extractOsOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\b(?:windows|win)\s*10\s*\/\s*11\s*pro\b/.test(text)) labels.push('Windows 10/11 Pro')
  if (/\b(?:windows|win)\s*11\s*pro\b/.test(text)) labels.push('Windows 11 Pro')
  if (/\b(?:windows|win)\s*10\s*pro\b/.test(text)) labels.push('Windows 10 Pro')
  if (/\bfree\s*dos\b|\bfreedos\b/.test(text)) labels.push('FreeDOS')

  return toFacetOptions('os', labels)
}

function extractScreenSizeOptions(item) {
  const text = productFacetText(item)
  const labels = [...text.matchAll(/\b(\d{2}(?:[.,]\d)?)\s*(?:-| )?(?:inch|")/gi)].map((match) => {
    const size = Number(match[1].replace(',', '.'))
    return `${Number.isInteger(size) ? size.toFixed(0) : size}"`
  })

  return toFacetOptions('screen-size', labels)
}

function extractResolutionOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\bqhd\b|2560\s*x\s*1440/.test(text)) labels.push('QHD (2560x1440)')
  if (/\bfhd\b|\bfull\s*hd\b|1920\s*x\s*1080/.test(text)) labels.push('FHD (1920x1080)')

  return toFacetOptions('resolution', labels)
}

function extractMonitorConnectivityOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\bhdmi\b/.test(text)) labels.push('HDMI')
  if (/\bdisplayport\b|\bdport\b|\bdp\b/.test(text)) labels.push('DisplayPort')
  if (/\busb[\s-]*c\b|type-c/.test(text)) labels.push('USB-C')
  if (/\busb\b|usb[\s-]*(?:2|3)|type-a/.test(text)) labels.push('USB')
  if (/\bvga\b/.test(text)) labels.push('VGA')

  return toFacetOptions('connectivity', labels)
}

function extractPrintTechnologyOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\binkjet\b/.test(text)) labels.push('Inkjet')
  if (/\blaser\b/.test(text)) labels.push('Laser')

  return toFacetOptions('print-technology', labels)
}

function extractPrintColorOptions(item) {
  const lines = facetLinesMatching(item, /teknologjia|kategoria|category/i)
  const labels = lines.map((line) => {
    const lowerLine = line.toLowerCase()
    if (/\bb\s*&\s*w\b|\bb&w\b|black\s*and\s*white|monochrome/.test(lowerLine)) return 'B&W'
    if (/\bcolor\b/.test(lowerLine)) return 'Color'
    return ''
  })

  return toFacetOptions('print-color', labels)
}

function extractPaperFormatOptions(item) {
  const labels = facetLinesMatching(item, /kategoria|category|paper/i).map((line) => {
    const lowerLine = line.toLowerCase()
    if (/\ba3\b/.test(lowerLine) && /\ba4\b/.test(lowerLine)) return 'A3 / A4'
    if (/\ba3\b/.test(lowerLine)) return 'A3'
    if (/\ba4\b/.test(lowerLine)) return 'A4'
    return ''
  })

  return toFacetOptions('paper-format', labels)
}

function extractDuplexOptions(item) {
  const labels = facetLinesMatching(item, /printim i dyanshem|duplex/i).map((line) => {
    const lowerLine = line.toLowerCase()
    if (/\bpo\b|\byes\b|automatic/.test(lowerLine)) return 'Duplex: Yes'
    if (/\bjo\b|\bno\b/.test(lowerLine)) return 'Duplex: No'
    return ''
  })

  return toFacetOptions('duplex', labels)
}

function extractPrinterConnectivityOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\busb\b|usb[\s-]*2|usb[\s-]*3/.test(text)) labels.push('USB')
  if (/\bethernet\b|rj-?45/.test(text)) labels.push('Ethernet')
  if (/\bwi[\s-]?fi\b|\bwireless\b|airprint|eprint|mobile print/.test(text)) labels.push('Wireless')

  return toFacetOptions('printer-connectivity', labels)
}

function extractAccessoryTypeOptions(item) {
  const name = String(item.name || '').toLowerCase()
  const labels = []

  if (/webcam|camera/.test(name)) labels.push('Webcam')
  if (/mouse\s+pad/.test(name)) labels.push('Mouse Pad')
  if (/mouse.*keyboard|keyboard.*mouse|combo/.test(name)) labels.push('Keyboard & Mouse')
  if (!labels.includes('Keyboard & Mouse') && /keyboard/.test(name)) labels.push('Keyboard')
  if (!labels.includes('Keyboard & Mouse') && /mouse/.test(name)) labels.push('Mouse')
  if (/backpack|bag/.test(name)) labels.push('Bag')
  if (/dvdrw|optical|drive/.test(name)) labels.push('Optical Drive')
  if (/charger/.test(name)) labels.push('Charger')
  if (/adapter/.test(name)) labels.push('Adapter')
  if (/cable/.test(name)) labels.push('Cable')

  return toFacetOptions('accessory-type', labels)
}

function extractAccessoryConnectionOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\busb[\s-]*c\b|type-c/.test(text)) labels.push('USB-C')
  if (/\busb[\s-]*a\b|type-a|usb\s*3|usb\s*2|\busb\b/.test(text)) labels.push('USB')
  if (/\bbluetooth\b/.test(text)) labels.push('Bluetooth')
  if (/\b2\.4\s*ghz\b|\bwireless\b/.test(text)) labels.push('Wireless')
  if (/\bwired\b/.test(text)) labels.push('Wired')
  if (/\bhdmi\b/.test(text)) labels.push('HDMI')
  if (/\bethernet\b|rj-?45|gigabit/.test(text)) labels.push('Ethernet')

  return toFacetOptions('accessory-connection', labels)
}

function extractCompatibilityOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\bwindows\b|\bwindows\s*10\b|\bwindows\s*11\b/.test(text)) labels.push('Windows')
  if (/\bmacos\b|\bmac\s*os\b/.test(text)) labels.push('macOS')
  if (/\bchrome\s*os\b|\bchromebook\b/.test(text)) labels.push('ChromeOS')

  return toFacetOptions('compatibility', labels)
}

function extractNetworkTypeOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\bswitch\b/.test(text)) labels.push('Switch')
  if (/\brouter\b/.test(text)) labels.push('Router')
  if (/\baccess\s*point\b|\bap\b/.test(text)) labels.push('Access Point')
  if (/\bfirewall\b/.test(text)) labels.push('Firewall')

  return toFacetOptions('network-type', labels)
}

function extractNetworkSpeedOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\b10\s*g(?:b|igabit)\b|10gbe/.test(text)) labels.push('10GbE')
  if (/\b2\.5\s*g(?:b|igabit)\b/.test(text)) labels.push('2.5GbE')
  if (/\bgigabit\b|\b1\s*g(?:b|igabit)\b/.test(text)) labels.push('Gigabit')

  return toFacetOptions('network-speed', labels)
}

function extractNetworkInterfaceOptions(item) {
  const text = normalizedFacetText(item)
  const labels = []

  if (/\brj-?45\b|ethernet/.test(text)) labels.push('RJ45')
  if (/\bsfp\+?\b/.test(text)) labels.push('SFP')
  if (/\bwi[\s-]?fi\b|\bwireless\b/.test(text)) labels.push('Wireless')

  return toFacetOptions('network-interface', labels)
}

function extractFacetOptions(key, item) {
  switch (key) {
    case 'processor':
      return extractProcessorOptions(item)
    case 'ram':
      return extractRamOptions(item)
    case 'storage':
      return extractStorageOptions(item)
    case 'os':
      return extractOsOptions(item)
    case 'screen-size':
      return extractScreenSizeOptions(item)
    case 'resolution':
      return extractResolutionOptions(item)
    case 'connectivity':
      return extractMonitorConnectivityOptions(item)
    case 'print-technology':
      return extractPrintTechnologyOptions(item)
    case 'print-color':
      return extractPrintColorOptions(item)
    case 'paper-format':
      return extractPaperFormatOptions(item)
    case 'duplex':
      return extractDuplexOptions(item)
    case 'printer-connectivity':
      return extractPrinterConnectivityOptions(item)
    case 'accessory-type':
      return extractAccessoryTypeOptions(item)
    case 'accessory-connection':
      return extractAccessoryConnectionOptions(item)
    case 'compatibility':
      return extractCompatibilityOptions(item)
    case 'network-type':
      return extractNetworkTypeOptions(item)
    case 'network-speed':
      return extractNetworkSpeedOptions(item)
    case 'network-interface':
      return extractNetworkInterfaceOptions(item)
    default:
      return []
  }
}

function buildHardwareFacetGroups(products, category) {
  if (!HARDWARE_CATEGORY_KEYS.has(category)) return []

  const relevantProducts = products.filter((item) => item.kind === 'hardware' && item.category === category)
  const definitions = HARDWARE_FACETS_BY_CATEGORY[category] || []

  return definitions
    .map((definition) => {
      const options = uniqueFacetOptions(
        relevantProducts.flatMap((item) => extractFacetOptions(definition.key, item)),
      )

      return options.length > 1
        ? { ...definition, options, dynamic: true }
        : null
    })
    .filter(Boolean)
}

function filterGroupsForCategory(products, category) {
  const brandFilter = {
    key: 'brand',
    title: 'Brand',
    options: productBrandOptions(products, category),
  }

  return [
    brandFilter,
    ...buildHardwareFacetGroups(products, category),
    AVAILABILITY_FILTER,
  ]
}

function productMatchesFilter(item, group, token) {
  if (group.dynamic) {
    return extractFacetOptions(group.key, item).some(([optionToken]) => optionToken === token)
  }

  return item.tokens.includes(token)
}

function normalizePathname(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  const routeIndex = parts.findIndex((part) => KNOWN_ROUTE_SEGMENTS.has(part))

  if (routeIndex === -1) {
    return '/'
  }

  const routeParts = parts.slice(routeIndex)
  return `/${routeParts.join('/')}${pathname.endsWith('/') ? '/' : ''}`
}

function getAppRoot() {
  const parts = window.location.pathname.split('/').filter(Boolean)
  const routeIndex = parts.findIndex((part) => KNOWN_ROUTE_SEGMENTS.has(part))
  const rootParts = routeIndex === -1 ? parts : parts.slice(0, routeIndex)
  return rootParts.length ? `/${rootParts.join('/')}/` : '/'
}

function appUrl(to) {
  if (!to || to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')) {
    return to
  }

  const root = getAppRoot()

  if (to === '/') {
    return root
  }

  if (to.startsWith('#')) {
    return `${root}${to}`
  }

  return `${root}${to.replace(/^\//, '')}`
}

function readRoute() {
  const current = new URL(window.location.href)
  const redirect = current.searchParams.get('redirect')

  if (redirect) {
    const redirected = new URL(redirect, window.location.origin)
    return {
      path: normalizePathname(redirected.pathname),
      hash: redirected.hash,
      redirected: `${redirected.pathname}${redirected.search}${redirected.hash}`,
    }
  }

  return {
    path: normalizePathname(window.location.pathname),
    hash: window.location.hash,
    redirected: null,
  }
}

function useRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    if (route.redirected) {
      window.history.replaceState({}, '', route.redirected)
      setRoute(readRoute())
    }
  }, [route.redirected])

  useEffect(() => {
    const onPopState = () => setRoute(readRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (to, options = {}) => {
    const next = appUrl(to)
    if (!next || next.startsWith('http') || next.startsWith('mailto:') || next.startsWith('tel:')) {
      window.location.href = next
      return
    }

    window.history.pushState({}, '', next)
    setRoute(readRoute())

    const hash = next.includes('#') ? next.slice(next.indexOf('#')) : ''
    window.setTimeout(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (!options.keepScroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 30)
  }

  return [route, navigate]
}

const SPEC_LABELS = {
  intelcorei3: 'Core i3',
  intelcorei5: 'Core i5',
  intelcorei7: 'Core i7',
  intelxeon: 'Xeon',
  '4gbddr4': '4GB RAM',
  '8gbddr4': '8GB RAM',
  '16gbddr4': '16GB RAM',
  '32gbddr4': '32GB RAM',
  ssd: 'SSD',
  hddsata: 'HDD SATA',
  win10pro: 'Win 10 Pro',
  freedos: 'FreeDOS',
  '256gb': '256GB',
  '500gb': '500GB',
  '512gb': '512GB',
  '1tb': '1TB',
  a4bwlaser: 'B&W Laser',
  a4colorlaser: 'Color Laser',
  a4colorinkjet: 'Color Inkjet',
  '1year': '1 year',
  '3years': '3 years',
}

function productSpecs(item) {
  if (Array.isArray(item.specs) && item.specs.length) {
    return item.specs.slice(0, 5)
  }

  if (Array.isArray(item.description) && item.description.length) {
    return item.description
      .map((line) => line.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .slice(0, 5)
  }

  return item.tokens
    .map((token) => SPEC_LABELS[token])
    .filter(Boolean)
    .slice(0, 5)
}

function titleFor(item, lang) {
  return lang === 'al' && item.alTitle ? item.alTitle : item.title
}

function iconForCategory(category) {
  if (category === 'hardware') return Cpu
  if (category === 'software') return ShieldCheck
  if (category === 'laptop') return Laptop
  if (category === 'monitor') return Monitor
  if (category === 'printer') return Printer
  if (category === 'network') return Wifi
  if (category === 'accessories') return Layers3
  return Cpu
}

function seoForRoute(route, lang) {
  const suffix = ' | CCS Albania'
  const baseDescription =
    'CCS provides technology, IT solutions, infrastructure, cybersecurity, GIS, support, and product sales for the Albanian information technology market.'

  if (route.path === '/') {
    return {
      title: lang === 'al' ? 'CCS Albania | Zgjidhje IT dhe infrastrukture' : 'CCS Albania | Enterprise IT Systems Integrator',
      description:
        lang === 'al'
          ? 'CCS ofron IT, siguri, infrastrukture, GIS, suport teknik dhe produkte teknologjie per tregun shqiptar.'
          : baseDescription,
    }
  }

  if (route.path === '/shop/' || route.path === '/products/') {
    return {
      title: `${lang === 'al' ? 'Dyqani CCS' : 'CCS Shop'}${suffix}`,
      description:
        lang === 'al'
          ? 'Shfletoni produkte hardware dhe software te ofruara nga CCS.'
          : 'Browse CCS hardware and software products with product search, filters, and inquiry options.',
    }
  }

  if (route.path === '/cisco/') {
    return {
      title: `Cisco Solutions${suffix}`,
      description: 'Cisco syndicated solution content with CCS implementation and support context.',
    }
  }

  if (route.path === '/fortinet/') {
    return {
      title: `Fortinet Solutions${suffix}`,
      description: 'Fortinet syndicated security content with CCS implementation and support context.',
    }
  }

  if (route.path === '/products-hp/') {
    return {
      title: `HP Business Solutions${suffix}`,
      description: 'HP Brand Showcase content with CCS product selection, setup, and support context.',
    }
  }

  if (route.path === '/hp-poly/') {
    return {
      title: `HP Poly Solutions${suffix}`,
      description: 'HP Poly showcase content with CCS collaboration product support context.',
    }
  }

  if (PAGE_DATA[route.path]) {
    const data = PAGE_DATA[route.path]
    return {
      title: `${titleFor(data, lang)}${suffix}`,
      description: lang === 'al' && data.alIntro ? data.alIntro : data.intro,
    }
  }

  if (route.path === '/case-studies/') {
    return {
      title: `${COPY[lang].nav.caseStudies}${suffix}`,
      description: 'CCS case studies across IT infrastructure, cybersecurity, telecom, energy, defense, agriculture, and GIS work.',
    }
  }

  return {
    title: `CCS Albania`,
    description: baseDescription,
  }
}

function AppLink({ to, navigate, children, className = '', onClick, ...props }) {
  const href = appUrl(to)
  const isExternal = href?.startsWith('http') || href?.startsWith('mailto:') || href?.startsWith('tel:')

  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !isExternal) {
          event.preventDefault()
          navigate(to)
        }
      }}
      {...props}
    >
      {children}
    </a>
  )
}

function App() {
  const [route, navigate] = useRoute()
  const [lang, setLang] = useState(() => localStorage.getItem('ccs-language') || 'en')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') !== 'light')
  const [shopQuery, setShopQuery] = useState('')
  const { products, loading: productsLoading } = useProducts()
  const cart = useCart(products)
  const copy = COPY[lang]

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    document.documentElement.lang = lang === 'al' ? 'sq' : 'en'
    localStorage.setItem('ccs-language', lang)
  }, [lang])

  useEffect(() => {
    const seo = seoForRoute(route, lang)
    document.title = seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description)
  }, [route, lang])

  const commerceMode = isCommerceRoute(route.path)

  return (
    <div className={`site-shell ${commerceMode ? 'commerce-ui' : 'non-shop-ui'}`}>
      <Header
        copy={copy}
        route={route}
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={cart.cartCount}
        showCart={commerceMode}
        products={products}
        navigate={navigate}
        setShopQuery={setShopQuery}
      />
      <main>
        <RouteRenderer
          route={route}
          copy={copy}
          lang={lang}
          navigate={navigate}
          products={products}
          productsLoading={productsLoading}
          shopQuery={shopQuery}
          setShopQuery={setShopQuery}
          addToCart={cart.addToCart}
          cartItems={cart.cartItems}
          cartCount={cart.cartCount}
          increaseCartLine={cart.increaseCartLine}
          decreaseCartLine={cart.decreaseCartLine}
          removeCartLine={cart.removeCartLine}
          clearCart={cart.clearCart}
        />
      </main>
      <Footer copy={copy} lang={lang} navigate={navigate} />
    </div>
  )
}

function Header({
  copy,
  route,
  lang,
  setLang,
  darkMode,
  setDarkMode,
  cartCount,
  showCart,
  products,
  navigate,
  setShopQuery,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [term, setTerm] = useState('')

  useEffect(() => {
    if (!menuOpen) setOpenDropdown(null)
  }, [menuOpen])

  // Close any open mobile navigation when the route changes.
  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
    setSearchOpen(false)
  }, [route.path])

  // A fully open mobile menu should not scroll the page behind it.
  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onEscape)
    }
  }, [menuOpen])

  const isActiveTo = (to) => {
    const [path, hash] = to.split('#')
    const normalizedPath = path || '/'
    return route.path === normalizedPath && (!hash || route.hash === `#${hash}`)
  }

  const isActiveGroup = (group) => {
    if (group.to === '/') return route.path === '/'
    if (group.to) return route.path === group.to
    return group.children?.some((child) => isActiveTo(child.to)) || false
  }

  const submitSearch = (event) => {
    event.preventDefault()
    setShopQuery(term)
    setSearchOpen(false)
    setMenuOpen(false)
    navigate('/shop/')
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <AppLink to="/" navigate={navigate} className="brand" aria-label="CCS home">
          <img src={darkMode ? ASSETS.logoDark : ASSETS.logoLight} alt="C.C.S" />
        </AppLink>



        <nav id="ccs-primary-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {NAV_GROUPS.map((group) => {
            const groupOpen = openDropdown === group.labelKey
            return group.children ? (
              <div
                className={`nav-group ${isActiveGroup(group) ? 'active' : ''} ${groupOpen ? 'menu-open' : ''}`}
                key={group.labelKey}
              >
                <button
                  className="nav-trigger"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={groupOpen}
                  onClick={() =>
                    setOpenDropdown((current) => (current === group.labelKey ? null : group.labelKey))
                  }
                >
                  {copy.nav[group.labelKey]}
                  <ChevronDown size={15} />
                </button>
                <div className="nav-menu">
                  {group.children.map((child) => (
                    <AppLink
                      key={child.labelKey}
                      to={child.to}
                      navigate={navigate}
                      className={isActiveTo(child.to) ? 'active' : ''}
                      onClick={() => {
                        setMenuOpen(false)
                        setOpenDropdown(null)
                      }}
                    >
                      {copy.nav[child.labelKey]}
                    </AppLink>
                  ))}
                </div>
              </div>
            ) : (
              <AppLink
                key={group.labelKey}
                to={group.to}
                navigate={navigate}
                className={`nav-link ${isActiveGroup(group) ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {copy.nav[group.labelKey]}
              </AppLink>
            )
          })}
        </nav>

        <div className="header-actions">
          <AppLink to="/#contact" navigate={navigate} className="ccs-header-cta">
            {lang === 'al' ? 'Flisni me ne' : 'Get in touch'}
            <ArrowRight size={15} />
          </AppLink>
          <button
            className="icon-button ccs-header-tool ccs-search-tool"
            type="button"
            aria-label={copy.common.shopSearch}
            onClick={() => {
              setMenuOpen(false)
              setSearchOpen(true)
            }}
          >
            <Search size={19} strokeWidth={1.9} />
          </button>

          {showCart && (
            <AppLink to="/cart/" navigate={navigate} className="cart-pill" aria-label={copy.common.cart}>
              <ShoppingCart size={18} />
              <span>{copy.common.cart}</span>
              <strong>{cartCount}</strong>
            </AppLink>
          )}

          <button
            className="theme-toggle ccs-header-tool ccs-theme-tool"
            type="button"
            aria-label={darkMode ? copy.common.lightMode : copy.common.darkMode}
            aria-pressed={darkMode}
            title={darkMode ? copy.common.lightMode : copy.common.darkMode}
            onClick={() => setDarkMode((value) => !value)}
          >
            {darkMode ? <Sun size={19} strokeWidth={1.9} /> : <Moon size={19} strokeWidth={1.9} />}
          </button>

          <button
            className="lang-toggle ccs-header-tool ccs-language-tool"
            type="button"
            aria-label={lang === 'en' ? 'Switch to Albanian' : 'Kalo në anglisht'}
            onClick={() => setLang(lang === 'en' ? 'al' : 'en')}
          >
            <Globe2 className="ccs-language-icon" size={16} strokeWidth={1.9} />
            <span className="ccs-language-code">{lang === 'en' ? 'AL' : 'EN'}</span>
          </button>
        </div>
        <button
          className="icon-button mobile-only ccs-mobile-menu-button ccs-header-tool"
          type="button"
          aria-label={menuOpen ? copy.common.closeMenu : copy.common.openMenu}
          aria-controls="ccs-primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => {
            setSearchOpen(false)
            setMenuOpen((value) => !value)
          }}
        >
          {menuOpen ? <X size={21} strokeWidth={2} /> : <Menu size={21} strokeWidth={2} />}
        </button>
      </div>

      {searchOpen && (
        <div className="search-panel" role="dialog" aria-label={copy.common.shopSearch}>
          <button
            className="icon-button search-close"
            type="button"
            aria-label={copy.common.closeMenu}
            onClick={() => setSearchOpen(false)}
          >
            <X size={20} />
          </button>
          <form onSubmit={submitSearch}>
            <Search size={22} />
            <input
              autoFocus
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder={copy.common.searchPlaceholder}
            />
            <button type="submit">{copy.common.shopSearch}</button>
          </form>
          {term.trim() && (
          <div className="quick-results">
            {products
              .filter((item) =>
                item.name.toLowerCase().includes(term.trim().toLowerCase()),
              )
              .slice(0, 5)
              .map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setTerm(item.name)
                    setSearchOpen(false)
                    navigate(`/product/${item.slug}/`)
                  }}
                >
                  <img src={item.image} alt="" />
                  <span>{item.name}</span>
                  <strong>{item.kind === 'software' ? 'Inquiry' : item.priceLabel}</strong>
                </button>
              ))}
          </div>
          )}
        </div>
      )}
    </header>
  )
}

function RouteRenderer({
  route,
  copy,
  lang,
  navigate,
  products,
  productsLoading,
  shopQuery,
  setShopQuery,
  addToCart,
  cartItems,
  cartCount,
  increaseCartLine,
  decreaseCartLine,
  removeCartLine,
  clearCart,
}) {
  if (route.path.startsWith('/product/')) {
    const slug = route.path.replace(/^\/product\//, '').replace(/\/$/, '')
    return (
      <ProductDetailPage
        slug={slug}
        copy={copy}
        lang={lang}
        navigate={navigate}
        products={products}
        productsLoading={productsLoading}
        addToCart={addToCart}
      />
    )
  }

  if (route.path === '/cart/') {
    return (
      <CartPage
        copy={copy}
        lang={lang}
        navigate={navigate}
        appUrl={appUrl}
        cartItems={cartItems}
        cartCount={cartCount}
        increaseCartLine={increaseCartLine}
        decreaseCartLine={decreaseCartLine}
        removeCartLine={removeCartLine}
        clearCart={clearCart}
      />
    )
  }

  if (route.path === '/shop/') {
    return (
      <ShopPage
        copy={copy}
        lang={lang}
        navigate={navigate}
        products={products}
        productsLoading={productsLoading}
        query={shopQuery}
        setQuery={setShopQuery}
        addToCart={addToCart}
      />
    )
  }

  if (route.path.startsWith('/product-category/')) {
    const initialKind = route.path.includes('/software/') ? 'software' : 'hardware'
    return (
      <ShopPage
        copy={copy}
        lang={lang}
        navigate={navigate}
        products={products}
        productsLoading={productsLoading}
        initialKind={initialKind}
        query={shopQuery}
        setQuery={setShopQuery}
        addToCart={addToCart}
      />
    )
  }

  if (route.path === '/products/') {
    return (
      <ShopPage
        copy={copy}
        lang={lang}
        navigate={navigate}
        products={products}
        productsLoading={productsLoading}
        query={shopQuery}
        setQuery={setShopQuery}
        addToCart={addToCart}
      />
    )
  }

  if (route.path === '/products-hp/') {
    return (
      <VendorSolutionLayout
        copy={copy}
        lang={lang}
        data={PAGE_DATA['/products-hp/']}
        logoSrc={ASSETS.hpLogo}
        vendorName="HP"
        shopHref={appUrl('/shop/')}
      >
        <HPSyndication variant="hp" />
      </VendorSolutionLayout>
    )
  }

  if (route.path === '/hp-poly/') {
    return (
      <VendorSolutionLayout
        copy={copy}
        lang={lang}
        data={PAGE_DATA['/hp-poly/']}
        logoSrc={ASSETS.hpPoly}
        vendorName="HP Poly"
        shopHref={appUrl('/shop/')}
      >
        <HPSyndication variant="poly" />
      </VendorSolutionLayout>
    )
  }

  if (route.path === '/fortinet/') {
    return (
      <VendorSolutionLayout
        copy={copy}
        lang={lang}
        data={PAGE_DATA['/fortinet/']}
        logoSrc={ASSETS.fortinet}
        vendorName="Fortinet"
      >
        <FortinetSyndication />
      </VendorSolutionLayout>
    )
  }

  if (route.path === '/cisco/') {
    return (
      <VendorSolutionLayout
        copy={copy}
        lang={lang}
        data={PAGE_DATA['/cisco/']}
        logoSrc={ASSETS.cisco}
        vendorName="Cisco"
      >
        <CiscoSyndication />
      </VendorSolutionLayout>
    )
  }

  if (route.path === '/case-studies/') {
    return <CaseStudiesPage copy={copy} lang={lang} navigate={navigate} />
  }

  const caseStudy = CASE_STUDIES.find((item) => item.path === route.path)
  if (caseStudy) {
    return <CaseStudyDetail item={caseStudy} lang={lang} navigate={navigate} />
  }

  if (PAGE_DATA[route.path]) {
    return <DetailPage data={PAGE_DATA[route.path]} copy={copy} lang={lang} navigate={navigate} />
  }

  if (AUTH_PAGES[route.path]) {
    return <SimpleAccountPage page={AUTH_PAGES[route.path]} copy={copy} navigate={navigate} />
  }

  return <HomePage copy={copy} lang={lang} navigate={navigate} />
}

function LogoCarousel({ items, ariaLabel, paginationLabel, pageLabel }) {
  const [slidesPerPage, setSlidesPerPage] = useState(getLogoCarouselSlidesPerPage)
  const [activePage, setActivePage] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )
  const pointerStartRef = useRef(null)
  const pauseAutoplay = isHovered || isFocused || isDragging || prefersReducedMotion
  const effectiveSlidesPerPage = Math.max(1, Math.min(slidesPerPage, items.length || 1))
  const pageCount = Math.ceil(items.length / effectiveSlidesPerPage)
  const activeDot = pageCount > 0 ? activePage % pageCount : 0
  const pages = useMemo(() => {
    if (items.length === 0) {
      return []
    }

    return Array.from({ length: pageCount }, (_, pageIndex) =>
      Array.from({ length: effectiveSlidesPerPage }, (_, logoIndex) => {
        const itemIndex = (pageIndex * effectiveSlidesPerPage + logoIndex) % items.length
        return items[itemIndex]
      }),
    )
  }, [effectiveSlidesPerPage, items, pageCount])
  const carouselPages = pageCount > 1 ? [...pages, pages[0]] : pages

  useEffect(() => {
    const handleResize = () => setSlidesPerPage(getLogoCarouselSlidesPerPage())

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')

    if (!mediaQuery) {
      return undefined
    }

    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    setTransitionEnabled(false)
    setActivePage(0)

    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setTransitionEnabled(true))
    })

    return () => window.cancelAnimationFrame(firstFrame)
  }, [slidesPerPage])

  useEffect(() => {
    if (pauseAutoplay || pageCount <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setTransitionEnabled(true)
      setActivePage((currentPage) => (currentPage >= pageCount ? 1 : currentPage + 1))
    }, LOGO_CAROUSEL_AUTOPLAY_DELAY)

    return () => window.clearInterval(timer)
  }, [pageCount, pauseAutoplay])

  const goToPage = (pageIndex) => {
    setTransitionEnabled(true)
    setActivePage(pageIndex)
  }

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || activePage < pageCount) {
      return
    }

    setTransitionEnabled(false)
    setActivePage(0)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setTransitionEnabled(true))
    })
  }

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    pointerStartRef.current = event.clientX
    setIsDragging(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerEnd = (event) => {
    const startX = pointerStartRef.current

    if (startX !== null && pageCount > 1) {
      const movement = event.clientX - startX

      if (Math.abs(movement) > LOGO_CAROUSEL_SWIPE_THRESHOLD) {
        setTransitionEnabled(true)
        setActivePage((currentPage) => {
          if (movement < 0) {
            return currentPage >= pageCount ? 1 : currentPage + 1
          }

          if (currentPage <= 0 || currentPage >= pageCount) {
            return pageCount - 1
          }

          return currentPage - 1
        })
      }
    }

    pointerStartRef.current = null
    setIsDragging(false)

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div
      className="logo-carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocused(false)
        }
      }}
    >
      <div
        className="logo-carousel__viewport"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div
          className={`logo-carousel__track${transitionEnabled ? '' : ' is-resetting'}`}
          style={{ transform: `translate3d(-${activePage * 100}%, 0, 0)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {carouselPages.map((page, pageIndex) => (
            <div
              className="logo-carousel__page"
              key={pageIndex === pageCount ? 'page-clone' : `page-${pageIndex}`}
              style={{ '--logo-carousel-slides-per-page': effectiveSlidesPerPage }}
            >
              {page.map(([name, image], logoIndex) => (
                <div className="logo-carousel__slide" key={`${pageIndex}-${name}-${logoIndex}`}>
                  <img src={image} alt={name} loading={pageIndex === 0 ? 'eager' : 'lazy'} draggable="false" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="logo-carousel__pagination" aria-label={paginationLabel}>
          {pages.map((_, pageIndex) => (
            <button
              className={pageIndex === activeDot ? 'is-active' : ''}
              type="button"
              key={`${pageLabel}-${pageIndex}`}
              aria-label={`${pageLabel} ${pageIndex + 1}`}
              aria-current={pageIndex === activeDot ? 'true' : undefined}
              onClick={(event) => {
                goToPage(pageIndex)

                if (event.detail > 0) {
                  event.currentTarget.blur()
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function HomePage({ copy, lang, navigate }) {
  const [activeModal, setActiveModal] = useState(null)
  const isAl = lang === 'al'
  const whyItems = [
    {
      icon: BadgeCheck,
      label: isAl ? 'Themeluar' : 'Established',
      title: '1993',
      body: isAl
        ? 'Teknologji, zgjidhje dhe sherbime IT per tregun shqiptar.'
        : 'Technology, solutions, and IT services for the Albanian information technology market.',
    },
    {
      icon: Route,
      label: isAl ? 'Cikel projekti' : 'Project lifecycle',
      title: isAl ? 'End-to-end' : 'End-to-end',
      body: copy.home.lifecycle,
    },
    {
      icon: Handshake,
      label: isAl ? 'Qasje' : 'Approach',
      title: isAl ? 'Partner i besuar' : 'Trusted partner',
      body: copy.home.aboutBodyTwo,
    },
  ]
  const tickerItems = isAl
    ? ['SIGURI KIBERNETIKE', 'INFRASTRUKTURE RRJETI', 'SERVERA & STORAGE', 'GIS / ARCGIS', 'SUPORT TEKNIK', 'INTEGRIM SISTEMESH']
    : ['CYBERSECURITY', 'NETWORK INFRASTRUCTURE', 'SERVERS & STORAGE', 'GIS / ARCGIS', 'TECHNICAL SUPPORT', 'SYSTEM INTEGRATION']

  return (
    <>
      <section className="ccs-command-hero ccs-command-hero--video ccs-video-only-hero" aria-label={isAl ? 'Video prezantuese CCS' : 'CCS company video'}>
        <video
          className="ccs-hero-video ccs-hero-video--full"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={ASSETS.heroVideo} type="video/mp4" />
        </video>
      </section>

      <div className="ccs-expertise-strip" aria-label={isAl ? 'Fushat e ekspertizës' : 'Areas of expertise'}>
        <div className="ccs-expertise-strip__inner">
          {tickerItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <section className="section solutions-section" id="services">
        <div className="solutions-head">
          <SectionHeading
            eyebrow={isAl ? 'Zgjidhje IT' : 'Core solutions'}
            title={copy.home.servicesTitle}
            text={
              isAl
                ? 'CCS kombinon siguri, rrjet, infrastrukture, servera, storage dhe suport teknik.'
                : 'CCS brings together security, networking, infrastructure, servers, storage, and technical support.'
            }
          />
          <AppLink to="/shop/" navigate={navigate} className="text-link">
            {copy.common.viewShop}
            <ArrowRight size={16} />
          </AppLink>
        </div>

        <div className="service-grid ccs-bento-services">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <AppLink
                to={service.to}
                navigate={navigate}
                className={`service-card ccs-service-tile ccs-service-tile--${index + 1}`}
                key={service.key}
              >
                <div className="ccs-service-tile__media" aria-hidden="true">
                  <img src={service.image} alt="" loading="lazy" />
                </div>
                <div className="ccs-service-tile__content">
                  <div className="ccs-service-tile__top">
                    <span className="ccs-service-tile__number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="service-icon"><Icon size={23} /></span>
                  </div>
                  <div className="ccs-service-tile__copy">
                    <h2>{titleFor(service, lang)}</h2>
                    <p>{lang === 'al' ? service.alShort : service.short}</p>
                    <strong>
                      {copy.common.learnMore}
                      <ArrowRight size={17} />
                    </strong>
                  </div>
                </div>
              </AppLink>
            )
          })}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-media">
          <img src={ASSETS.aboutOne} alt="CCS workspace" />
          <img src={ASSETS.aboutTwo} alt="CCS technical equipment" />
        </div>
        <div className="section-copy">
          <Kicker>{copy.home.aboutTitle}</Kicker>
          <h1>{isAl ? 'Partner teknologjie per infrastrukture dhe siguri.' : 'Technology partner for infrastructure and security.'}</h1>
          <p className="lead-text">{copy.home.aboutLead}</p>
          <p>{copy.home.aboutBody}</p>
          <p>{copy.home.aboutBodyTwo}</p>
        </div>
        <div className="why-grid" aria-label={isAl ? 'Pse CCS' : 'Why CCS'}>
          {whyItems.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.label}>
                <Icon size={20} />
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="dark-feature-section">
        <div className="dark-feature-inner">
          <div>
            <Kicker>{isAl ? 'Siguri dhe infrastrukture' : 'Cybersecurity and infrastructure'}</Kicker>
            <h2>
              {isAl
                ? 'Zgjidhje te integruara per sisteme kritike.'
                : 'Integrated solutions for critical systems.'}
            </h2>
            <p>
              {isAl
                ? 'CCS mbulon rrjetin, sigurine, serverat, storage, vazhdimesine e biznesit dhe suportin operacional.'
                : 'CCS covers network security, servers, storage, business continuity, and operational support.'}
            </p>
            <div className="capability-list">
              {[...PAGE_DATA['/network-security/'].points, ...PAGE_DATA['/infrastructure/'].points.slice(0, 1)].map(
                (point) => (
                  <span key={point}>
                    <Check size={16} />
                    {point}
                  </span>
                ),
              )}
            </div>
            <AppLink to="/network-security/" navigate={navigate} className="secondary-action inverse">
              {copy.nav.networkSecurity}
              <ArrowRight size={17} />
            </AppLink>
          </div>
          <div className="feature-media">
            <img src={ASSETS.solutionSecurity} alt="Cybersecurity capability" />
          </div>
        </div>
      </section>

      <section className="section case-preview-section">
        <div className="case-preview-head">
          <SectionHeading
            eyebrow={copy.nav.caseStudies}
            title={isAl ? 'Implementime ne industri kritike.' : 'Work across critical industries.'}
            text={
              isAl
                ? 'Raste qe tregojne implementime IT dhe GIS ne industri te ndryshme.'
                : 'Selected case studies from IT infrastructure, cybersecurity, telecom, energy, defense, agriculture, and GIS work.'
            }
          />
          <AppLink to="/case-studies/" navigate={navigate} className="text-link">
            {copy.nav.caseStudies}
            <ArrowRight size={16} />
          </AppLink>
        </div>
        <div className="case-grid ccs-case-gallery">
          {CASE_STUDIES.slice(0, 3).map((item, index) => (
            <AppLink
              to={item.path}
              navigate={navigate}
              className={`case-card ccs-case-gallery__item ccs-case-gallery__item--${index + 1}`}
              key={item.path}
            >
              <div className="ccs-case-gallery__art">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <img src={item.image} alt="" loading="lazy" />
              </div>
              <div className="ccs-case-gallery__copy">
                <span className="ccs-case-gallery__industry">{item.industry}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <strong>{isAl ? 'Shiko projektin' : 'Explore case study'} <ArrowRight size={17}/></strong>
              </div>
            </AppLink>
          ))}
        </div>
      </section>

      <section className="section gis-section">
        <div className="gis-visual gis-visual--single">
          <img src={ASSETS.gis} alt="CCS GIS systems" />
        </div>
        <div className="gis-copy">
          <SectionHeading
            eyebrow="GIS / ArcGIS"
            title={copy.home.gisTitle}
            text={
              isAl
                ? 'Planifikim, administrim GIS dhe suport on-call per iniciativa ArcGIS.'
                : 'Planning, GIS system administration, and on-call support for ArcGIS initiatives.'
            }
          />
          <div className="gis-grid">
            {GIS_SERVICES.map((item) => (
              <article className="gis-card" key={item.key}>
                <img src={item.image} alt="" loading="lazy" />
                <h3>{titleFor(item, lang)}</h3>
                <p>{lang === 'al' ? item.alSubtitle : item.subtitle}</p>
                <button type="button" onClick={() => setActiveModal(item)}>
                  {copy.common.readMore}
                  <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section partners-section" id="partners">
        <SectionHeading
          eyebrow={isAl ? 'Partneret' : 'Partner ecosystem'}
          title={copy.home.partnersTitle}
          text={copy.home.partnersIntro}
        />
        <LogoCarousel
          items={PARTNERS}
          ariaLabel="Technology partners carousel"
          paginationLabel="Partner carousel pages"
          pageLabel="Show partner group"
        />
      </section>

      <section className="section recommended-section">
        <SectionHeading
          eyebrow={isAl ? 'Zgjidhje nga furnizuesit' : 'Vendor solutions'}
          title={copy.home.recommendedTitle}
          text={copy.home.recommendedIntro}
        />
        <div className="recommended-grid ccs-vendor-grid">
          {RECOMMENDED.map((item) => (
            <AppLink to={item.to} navigate={navigate} className="recommended-card" key={item.title}>
              <div className="ccs-vendor-grid__mark"><img src={item.image} alt={item.title} loading="lazy" /></div>
              <div className="ccs-vendor-grid__content">
                <h3>{titleFor(item, lang)}</h3>
                <p>{item.body}</p>
                <span>
                  {copy.common.learnMore}
                  <ArrowRight size={16} />
                </span>
              </div>
            </AppLink>
          ))}
        </div>
      </section>

      <section className="section certification-section" id="certification">
        <SectionHeading
          eyebrow={isAl ? 'Standarde' : 'Standards'}
          title={copy.home.certificationsTitle}
        />
        <LogoCarousel
          items={CERTIFICATIONS}
          ariaLabel="Certifications carousel"
          paginationLabel="Certification carousel pages"
          pageLabel="Show certification group"
        />
      </section>

      <section className="home-cta-section">
        <div>
          <Kicker>{isAl ? 'Kontakt' : 'Next step'}</Kicker>
          <h2>{isAl ? 'Planifikoni zgjidhjen tuaj me CCS.' : 'Plan your next technology initiative with CCS.'}</h2>
          <p>
            {isAl
              ? 'Na kontaktoni per konsulence, infrastrukture, siguri, GIS, suport teknik ose perzgjedhje produktesh.'
              : 'Contact CCS for consulting, infrastructure, cybersecurity, GIS, technical support, or product selection.'}
          </p>
        </div>
        <a href="mailto:info@ccs.al" className="primary-action">
          <Mail size={18} />
          {isAl ? 'Flisni me CCS' : 'Talk to CCS'}
        </a>
      </section>

      <ContactSection copy={copy} />

      {activeModal && (
        <Modal item={activeModal} copy={copy} lang={lang} onClose={() => setActiveModal(null)} />
      )}
    </>
  )
}

function Modal({ item, copy, lang, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article className="modal-card" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label={copy.common.closeMenu}>
          <X size={20} />
        </button>
        <img src={item.image} alt="" />
        <h2>{titleFor(item, lang)}</h2>
        <p>{item.body}</p>
        <ul className="timeline">
          {item.steps.map(([title, body], index) => (
            <li key={title}>
              <strong>
                {index + 1}. {title}
              </strong>
              <span>{body}</span>
            </li>
          ))}
        </ul>
        <a href="mailto:info@ccs.al" className="primary-action">
          <Mail size={17} />
          {copy.home.contactTitle}
        </a>
      </article>
    </div>
  )
}

function langForCopy(copy) {
  return copy?.nav?.home === 'Kryefaqja' ? 'al' : 'en'
}

function ShopPage({
  copy,
  navigate,
  products,
  productsLoading,
  query,
  setQuery,
  addToCart,
  initialKind = 'all',
  initialBrand = '',
}) {
  const [category, setCategory] = useState(initialKind)
  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState(() =>
    initialBrand ? { brand: [initialBrand.toLowerCase()] } : {},
  )
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setCategory(initialKind)
  }, [initialKind])

  useEffect(() => {
    setFilters((current) => {
      const next = { ...current }
      if (initialBrand) {
        next.brand = [initialBrand.toLowerCase()]
      } else {
        delete next.brand
      }
      return next
    })
  }, [initialBrand])

  const activeFilterGroups = useMemo(() => filterGroupsForCategory(products, category), [category, products])

  useEffect(() => {
    const validTokensByKey = new Map(
      activeFilterGroups.map((group) => [group.key, new Set(group.options.map(([token]) => token))]),
    )

    setFilters((current) => {
      const next = {}
      let changed = false

      Object.entries(current).forEach(([key, value]) => {
        const validTokens = validTokensByKey.get(key)
        if (!validTokens) {
          changed = true
          return
        }

        const selected = value.filter((token) => validTokens.has(token))
        if (selected.length !== value.length) changed = true
        if (selected.length) next[key] = selected
      })

      return changed ? next : current
    })
  }, [activeFilterGroups])

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase()

    const matches = products.filter((item) => {
      const categoryOk = matchesShopCategory(item, category)
      const queryOk = !term || (item.searchText || item.name).toLowerCase().includes(term)
      const filterOk = activeFilterGroups.every((group) => {
        const selected = filters[group.key] || []
        return selected.length === 0 || selected.some((token) => productMatchesFilter(item, group, token))
      })

      return categoryOk && queryOk && filterOk
    })

    if (sort === 'low') {
      return [...matches].sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER))
    }

    if (sort === 'high') {
      return [...matches].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    }

    return matches
  }, [activeFilterGroups, category, filters, products, query, sort])

  const toggleFilter = (groupKey, token) => {
    setFilters((current) => {
      const selected = new Set(current[groupKey] || [])
      if (selected.has(token)) {
        selected.delete(token)
      } else {
        selected.add(token)
      }
      return { ...current, [groupKey]: [...selected] }
    })
  }

  const clearFilters = () => {
    setFilters({})
    setQuery('')
    setCategory('all')
    setSort('')
  }

  const categories = ['all', 'hardware', 'software', 'desktop', 'laptop', 'monitor', 'printer', 'accessories']

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <img className="shop-hero-image" src={ASSETS.shopHero} alt="Modern technology workspace" />
        <div className="shop-hero-shade" aria-hidden="true" />
        <div className="shop-hero-content">
          <Kicker>{langForCopy(copy) === 'al' ? 'TEKNOLOGJI PROFESIONALE' : 'PROFESSIONAL TECHNOLOGY'}</Kicker>
          <h1>{copy.shop.welcome}</h1>
          <p>{copy.shop.capture}</p>
          <div className="shop-hero-actions">
            <a href="#shop-search" className="shop-primary-cta">
              {langForCopy(copy) === 'al' ? 'Shfleto produktet' : 'Browse products'}
              <ArrowRight size={17} />
            </a>
            <a href="https://wa.me/355684088507?text=Jam+i+interesuar+p%C3%ABr+produktet+tuaja" className="shop-secondary-cta">
              {copy.shop.whatsapp}<ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      <div className="shop-sticky" id="shop-search">
        <div className="category-tabs" aria-label="Product categories">
          {categories.map((item) => {
            const Icon = iconForCategory(item)
            return (
              <button
                type="button"
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
                key={item}
              >
                <Icon size={17} />
                {copy.shop[item]}
              </button>
            )
          })}
        </div>

        <div className="shop-control-row">
          <form className="shop-search" onSubmit={(event) => event.preventDefault()}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.common.searchPlaceholder}
            />
            <button type="submit" aria-label={copy.common.shopSearch}>
              <Search size={18} />
            </button>
          </form>

          <div className="shop-tools">
            <button className="filter-open" type="button" onClick={() => setDrawerOpen(true)}>
              <Filter size={18} />
              {copy.shop.filter}
            </button>
            <label>
              <span>{copy.shop.sort}</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value=""></option>
                <option value="low">{copy.shop.low}</option>
                <option value="high">{copy.shop.high}</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <section className="shop-layout">
        {drawerOpen && (
          <div className="filter-drawer">
            <FilterMenu
              copy={copy}
              filterGroups={activeFilterGroups}
              filters={filters}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        )}

        <div className="product-area">
          <FilterMenu
            copy={copy}
            filterGroups={activeFilterGroups}
            filters={filters}
            toggleFilter={toggleFilter}
            clearFilters={clearFilters}
            className="desktop-filter horizontal-filter"
            defaultOpenBrand={false}
          />

          <div className="product-count">
            <span>
              {productsLoading && !products.length
                ? 'Loading products...'
                : category === 'all' && !query && !Object.values(filters).some((value) => value?.length)
                  ? `${CSV_CATALOG_META.catalogProductCount} products · ${CSV_CATALOG_META.variationCount} configurations`
                  : `${filteredProducts.length} products`}
            </span>
            {(query || Object.values(filters).some((value) => value?.length) || category !== 'all') && (
              <button type="button" onClick={clearFilters}>
                {copy.common.clear}
              </button>
            )}
          </div>
          {filteredProducts.length ? (
            <div className="products-grid">
              {filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  copy={copy}
                  navigate={navigate}
                  addToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <p className="empty-state">{copy.common.noProducts}</p>
          )}
        </div>
      </section>

      <section className="shop-footer-note">
        <p>{copy.shop.footer}</p>
      </section>
    </div>
  )
}

function ProductDetailPage({
  slug,
  copy,
  lang,
  navigate,
  products,
  productsLoading,
  addToCart,
}) {
  const product = products.find((item) => item.slug === slug)
  const [remoteProduct, setRemoteProduct] = useState(null)
  const [remoteLoading, setRemoteLoading] = useState(false)
  const resolvedProduct = product || remoteProduct
  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariantId, setSelectedVariantId] = useState(null)
  const variants = resolvedProduct?.variants || []
  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId) || variants[0] || null
  const gallery = selectedVariant?.gallery?.length
    ? selectedVariant.gallery
    : resolvedProduct?.gallery?.length
      ? resolvedProduct.gallery
      : [resolvedProduct?.image]

  useEffect(() => {
    setActiveImage(0)
    setSelectedVariantId(null)
  }, [slug])

  useEffect(() => {
    if (resolvedProduct?.variants?.length) {
      setSelectedVariantId((current) =>
        resolvedProduct.variants.some((variant) => variant.id === current) ? current : resolvedProduct.variants[0].id,
      )
    }
  }, [resolvedProduct?.id, resolvedProduct?.variants])

  useEffect(() => {
    let active = true

    if (product || productsLoading || !slug) {
      return undefined
    }

    setRemoteLoading(true)
    fetchStoreProducts({ slug })
      .then((items) => {
        if (active && Array.isArray(items) && items.length) {
          setRemoteProduct(normalizeStoreProduct(items[0]))
        }
      })
      .catch(() => {
        if (active) setRemoteProduct(null)
      })
      .finally(() => {
        if (active) setRemoteLoading(false)
      })

    return () => {
      active = false
    }
  }, [product, productsLoading, slug])

  if (!resolvedProduct && (productsLoading || remoteLoading)) {
    return (
      <section className="product-detail-page">
        <p className="empty-state">Loading product...</p>
      </section>
    )
  }

  if (!resolvedProduct) {
    return (
      <section className="product-detail-page">
        <div className="account-panel">
          <h1>Product not found</h1>
          <p>{copy.common.noProducts}</p>
          <AppLink to="/shop/" navigate={navigate} className="primary-action">
            <Search size={17} />
            {copy.common.viewShop}
          </AppLink>
        </div>
      </section>
    )
  }

  const specs = productSpecs(resolvedProduct)
  const description = resolvedProduct.description?.length ? resolvedProduct.description : specs
  const isSoftware = resolvedProduct.kind === 'software'
  const needsQuote = isSoftware || !resolvedProduct.priceLabel
  const displayPriceLabel = selectedVariant?.priceLabel || resolvedProduct.priceLabel
  const displayRegularPriceLabel = selectedVariant?.regularPriceLabel || resolvedProduct.regularPriceLabel
  const related = products
    .filter((item) => item.slug !== resolvedProduct.slug && item.kind === resolvedProduct.kind)
    .slice(0, 4)

  return (
    <section className="product-detail-page">
      <div className="product-breadcrumb">
        <AppLink to="/" navigate={navigate}>
          {copy.nav.home}
        </AppLink>
        <span>/</span>
        <AppLink
          to={isSoftware ? '/product-category/software/' : '/product-category/hardware/'}
          navigate={navigate}
        >
          {isSoftware ? copy.nav.software : copy.nav.hardware}
        </AppLink>
        <span>/</span>
        <strong>{resolvedProduct.name}</strong>
      </div>

      <div className="product-detail-grid">
        <div className="product-gallery">
          <div className="product-gallery-main">
            <img src={gallery[activeImage] || selectedVariant?.image || resolvedProduct.image} alt={resolvedProduct.name} />
          </div>
          {gallery.length > 1 && (
            <div className="product-thumbnails">
              {gallery.map((image, index) => (
                <button
                  type="button"
                  className={index === activeImage ? 'active' : ''}
                  key={image}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <article className="product-summary">
          <Kicker>{isSoftware ? copy.nav.software : copy.nav.hardware}</Kicker>
          <h1>{resolvedProduct.name}</h1>
          <div className="product-summary-tags">
            {resolvedProduct.brands?.slice(0, 2).map((brand) => (
              <span key={brand.slug || brand.name}>{brand.name}</span>
            ))}
            {resolvedProduct.categories?.slice(0, 3).map((category) => (
              <span key={category.slug || category.name}>{stripHtml(category.name)}</span>
            ))}
          </div>

          {variants.length > 0 && (
            <div className="product-variant-selector">
              <span>{resolvedProduct.attributeName || (lang === 'al' ? 'Konfigurimi' : 'Configuration')}</span>
              <div>
                {variants.map((variant) => (
                  <button type="button" className={selectedVariant?.id === variant.id ? 'active' : ''} key={variant.id}
                    onClick={() => { setSelectedVariantId(variant.id); setActiveImage(0) }}>
                    <strong>{variant.attributeValue || variant.name}</strong>
                    <small>{variant.priceLabel}</small>
                  </button>
                ))}
              </div>
            </div>
          )}

          {needsQuote ? (
            <div className="software-price-note">
              {lang === 'al'
                ? 'Cmimi percaktohet sipas licencimit, perdoruesve dhe konfigurimit.'
                : 'Pricing depends on licensing, users, and configuration.'}
            </div>
          ) : (
            <div className="detail-price">
              {displayRegularPriceLabel && <del>{displayRegularPriceLabel}</del>}
              <strong>{displayPriceLabel}</strong>
            </div>
          )}

          <div className="detail-actions">
            {needsQuote ? (
              <a
                href={`mailto:info@ccs.al?subject=Inquiry for ${encodeURIComponent(resolvedProduct.name)}`}
                className="primary-action"
              >
                <Mail size={17} />
                {lang === 'al' ? 'Kerko oferte' : 'Request quote'}
              </a>
            ) : (
              <AddToCartButton
                copy={copy}
                className="primary-action"
                iconSize={17}
                onAdd={() => addToCart(resolvedProduct, selectedVariant)}
              />
            )}
            <a
              href="https://wa.me/355684088507?text=Jam+i+interesuar+p%C3%ABr+produktet+tuaja"
              className="secondary-action"
            >
              <Phone size={17} />
              WhatsApp
            </a>
          </div>

          <p className="product-help">
            {lang === 'al'
              ? 'Per me shume informacion mbi kete produkt, kontaktoni ekipin CCS.'
              : 'For more information about this product, contact the CCS team.'}
          </p>
        </article>
      </div>

      <div className="product-description-panel">
        <div>
          <Kicker>{lang === 'al' ? 'Pershkrimi' : 'Description'}</Kicker>
          <h2>{resolvedProduct.name}</h2>
        </div>
        <div className="product-description-list">
          {description.map((line, index) => (
            <p key={`${index}-${line}`}>{line}</p>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-products">
          <SectionHeading title={lang === 'al' ? 'Produkte te ngjashme' : 'Related products'} />
          <div className="products-grid">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                copy={copy}
                navigate={navigate}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

function FilterMenu({
  copy,
  filterGroups = SHOP_FILTERS,
  filters,
  toggleFilter,
  clearFilters,
  onClose,
  className = '',
  defaultOpenBrand = true,
}) {
  const isHorizontal = className.split(/\s+/).includes('horizontal-filter')
  const panelRef = useRef(null)
  const closeTimerRef = useRef(null)
  const [openFilterKey, setOpenFilterKey] = useState(defaultOpenBrand ? 'brand' : null)

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const scheduleClose = () => {
    if (!isHorizontal) return
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => setOpenFilterKey(null), 150)
  }

  useEffect(() => {
    if (!isHorizontal) return undefined

    const onPointerDown = (event) => {
      if (!panelRef.current?.contains(event.target)) {
        setOpenFilterKey(null)
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenFilterKey(null)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      clearCloseTimer()
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isHorizontal])

  return (
    <aside
      className={`filter-menu-panel ${className}`}
      ref={panelRef}
      onMouseEnter={isHorizontal ? clearCloseTimer : undefined}
      onMouseLeave={isHorizontal ? scheduleClose : undefined}
      onFocus={isHorizontal ? clearCloseTimer : undefined}
      onBlur={
        isHorizontal
          ? (event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose()
            }
          : undefined
      }
    >
      <div className="filter-menu-header">
        <h2>{copy.shop.filter}</h2>
        <div>
          <button type="button" onClick={clearFilters}>
            {copy.common.clear}
          </button>
          {onClose && (
            <button type="button" className="icon-button" onClick={onClose} aria-label={copy.common.closeMenu}>
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {filterGroups.map((group) => {
        const detailsProps = isHorizontal
          ? { open: openFilterKey === group.key }
          : defaultOpenBrand && group.key === 'brand'
            ? { open: true }
            : {}

        return (
          <details key={group.key} {...detailsProps}>
            <summary
              aria-controls={`${isHorizontal ? 'desktop' : 'drawer'}-filter-options-${group.key}`}
              aria-expanded={isHorizontal ? openFilterKey === group.key : undefined}
              onClick={
                isHorizontal
                  ? (event) => {
                      event.preventDefault()
                      clearCloseTimer()
                      setOpenFilterKey((current) => (current === group.key ? null : group.key))
                    }
                  : undefined
              }
            >
              {group.title}
              <ChevronDown size={15} />
            </summary>
            <div className="filter-options" id={`${isHorizontal ? 'desktop' : 'drawer'}-filter-options-${group.key}`}>
              {group.options.map(([token, label]) => {
                const checked = (filters[group.key] || []).includes(token)
                return (
                  <button
                    type="button"
                    className={checked ? 'selected' : ''}
                    key={token}
                    onClick={() => toggleFilter(group.key, token)}
                  >
                    <span>{checked && <Check size={14} />}</span>
                    {label}
                  </button>
                )
              })}
            </div>
          </details>
        )
      })}

      {onClose && (
        <button type="button" className="primary-action full-width" onClick={onClose}>
          {copy.shop.showProducts}
        </button>
      )}
    </aside>
  )
}

function AddToCartButton({ copy, onAdd, className = '', iconSize = 16 }) {
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return undefined
    const timer = window.setTimeout(() => setAdded(false), 1200)
    return () => window.clearTimeout(timer)
  }, [added])

  return (
    <button
      type="button"
      className={`${className} ${added ? 'is-added' : ''}`.trim()}
      onClick={(event) => {
        event.preventDefault()
        onAdd()
        setAdded(true)
      }}
    >
      <ShoppingCart size={iconSize} />
      {added ? copy.common.addedToCart : copy.common.addToCart}
    </button>
  )
}

function ProductCard({ item, copy, navigate, addToCart }) {
  const Icon = iconForCategory(item.category)
  const specs = productSpecs(item)

  return (
    <article className="product-card">
      <AppLink to={`/product/${item.slug}/`} navigate={navigate}>
        <div className="product-image">
          <img src={item.image} alt={item.name} loading="lazy" />
        </div>
        <h3>{item.name}</h3>
      </AppLink>
      <div className="product-specs">
        {specs.map((spec, index) => (
          <span key={`${index}-${spec}`}>{spec}</span>
        ))}
      </div>
      <div className="product-meta">
        <span><Icon size={15} />{item.brand || (item.kind === 'software' ? 'Software' : item.category)}</span>
        <strong>{item.kind === 'software' || !item.priceLabel ? 'Inquiry' : item.priceLabel}</strong>
      </div>
      {!!item.variants?.length && <span className="product-config-count">{item.variants.length} configurations available</span>}
      {item.variants?.length ? (
        <AppLink to={`/product/${item.slug}/`} navigate={navigate} className="product-button">
          <Layers3 size={16} />
          {item.variants.length} configurations
        </AppLink>
      ) : item.kind === 'software' || !item.priceLabel ? (
        <AppLink to={`/product/${item.slug}/`} navigate={navigate} className="product-button">
          <Mail size={16} />
          {copy.common.learnMore}
        </AppLink>
      ) : (
        <AddToCartButton copy={copy} onAdd={() => addToCart(item)} />
      )}
    </article>
  )
}

function DetailPage({ data, copy, lang, navigate }) {
  const Icon = data.icon || BriefcaseBusiness

  if (data.solutionKey) {
    return <ITSolutionPage data={data} copy={copy} lang={lang} navigate={navigate} />
  }

  return (
    <section className="detail-page">
      <div className="detail-hero">
        <div>
          <Kicker>C.C.S</Kicker>
          <h1>{titleFor(data, lang)}</h1>
          <p>{lang === 'al' && data.alIntro ? data.alIntro : data.intro}</p>
          <div className="detail-actions">
            {data.action && (
              <AppLink to={data.action} navigate={navigate} className="primary-action">
                <Search size={17} />
                {copy.common.viewShop}
              </AppLink>
            )}
            <a href="mailto:info@ccs.al" className="secondary-action">
              <Mail size={17} />
              info@ccs.al
            </a>
          </div>
        </div>
        <div className="detail-image">
          <Icon size={36} />
          <img src={data.image} alt="" />
        </div>
      </div>

      <div className="detail-points">
        {data.points.map((point) => (
          <article key={point}>
            <Check size={20} />
            <p>{point}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ITSolutionPage({ data, copy, lang, navigate }) {
  const focus = SOLUTION_CONTENT[data.solutionKey]

  return (
    <section className="solution-page">
      <div className="solution-showcase" aria-label={copy.nav.itSolution}>
        {IT_SOLUTION_SLIDES.map((slide) => (
          <AppLink
            to={slide.to}
            navigate={navigate}
            className={`solution-slide ${slide.key === data.solutionKey ? 'active' : ''}`}
            key={slide.key}
          >
            <img src={slide.image} alt="" />
            <div>
              <span>{lang === 'al' ? 'Zgjidhje' : 'Solution'}</span>
              <h2>{titleFor(slide, lang)}</h2>
              <p>{slide.intro}</p>
            </div>
          </AppLink>
        ))}
      </div>

      <div className="solution-focus">
        <div className="solution-focus-head">
          <Kicker>{copy.nav.itSolution}</Kicker>
          <h1>{titleFor(data, lang)}</h1>
          <p>{lang === 'al' && data.alIntro ? data.alIntro : data.intro}</p>
        </div>
        <div className="solution-focus-media">
          <img src={data.image} alt="" />
        </div>
      </div>

      {data.solutionKey === 'support' ? (
        <SupportIssuePanel lang={lang} />
      ) : (
        <SolutionBlock focus={focus} type={data.solutionKey} />
      )}

      <div className="solution-support-strip">
        {[
          'For Network and Security',
          'For Servers and Storage',
          'For Infrastructure',
        ].map((label) => (
          <article key={label}>
            <h3>{label}</h3>
            <p>Contact us for any problem related to this service area.</p>
            <AppLink to="/support/" navigate={navigate}>
              Support
              <ArrowRight size={15} />
            </AppLink>
          </article>
        ))}
      </div>
    </section>
  )
}

function SolutionBlock({ focus, type }) {
  if (type === 'storage') {
    return (
      <section className="solution-block">
        <SectionHeading title={focus.title} text={focus.subtitle} />
        <div className="storage-compare">
          <div className="storage-row storage-heading">
            <strong>Storage Type</strong>
            <strong>Key Benefits</strong>
          </div>
          {focus.rows.map(([typeName, benefits]) => (
            <div className="storage-row" key={typeName}>
              <strong>{typeName}</strong>
              <p>{benefits}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="solution-block">
      <SectionHeading title={focus.title} text={focus.subtitle} />
      <div className={type === 'network' ? 'threat-grid' : 'infra-grid'}>
        {focus.cards.map((card) => (
          <article key={card.title}>
            <ShieldCheck size={22} />
            <h3>{card.title}</h3>
            {card.kicker && <strong>{card.kicker}</strong>}
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function SupportIssuePanel({ lang }) {
  return (
    <section className="support-issue-panel">
      <div>
        <Kicker>{lang === 'al' ? 'Suport' : 'Support'}</Kicker>
        <h2>{lang === 'al' ? 'Na dergoni problemin tuaj' : 'Write an issue to contact us about your problem'}</h2>
        <p>
          {lang === 'al'
            ? 'Plotesoni formen dhe ekipi CCS do tju kontaktoje per ndihme teknike.'
            : 'Fill in the form and the CCS team will contact you for technical assistance.'}
        </p>
      </div>
      <form className="support-form">
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Details about the issue
          <textarea name="details" rows="5" />
        </label>
        <button type="button">Submit</button>
      </form>
    </section>
  )
}

function CaseStudiesPage({ copy, lang, navigate }) {
  return (
    <section className="case-studies-page">
      <div className="case-hero">
        <div>
          <Kicker>C.C.S</Kicker>
          <h1>{copy.nav.caseStudies}</h1>
          <p>
            {lang === 'al'
              ? 'Keto raste tregojne implementime te suksesshme IT dhe GIS ne industri te ndryshme.'
              : 'These case studies demonstrate the successful implementation of advanced IT and GIS solutions across various industries.'}
          </p>
        </div>
      </div>

      <div className="case-study-grid">
        {CASE_STUDIES.map((item) => (
          <AppLink to={item.path} navigate={navigate} className="case-study-card" key={item.path}>
            <img src={item.image} alt="" />
            <span>{item.industry}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <strong>
              View Case
              <ArrowRight size={16} />
            </strong>
          </AppLink>
        ))}
      </div>
    </section>
  )
}

function CaseStudyDetail({ item, lang, navigate }) {
  return (
    <section className="case-detail-page">
      <AppLink to="/case-studies/" navigate={navigate} className="case-back-link">
        <ArrowRight size={17} />
        Back
      </AppLink>
      <div className="case-detail-hero">
        <img src={item.image} alt="" />
        <div>
          <Kicker>{item.industry}</Kicker>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
        </div>
      </div>

      <div className="case-detail-layout">
        <aside className="case-detail-nav">
          {CASE_STUDIES.map((caseStudy) => (
            <AppLink
              to={caseStudy.path}
              navigate={navigate}
              className={caseStudy.path === item.path ? 'active' : ''}
              key={caseStudy.path}
            >
              {caseStudy.title}
            </AppLink>
          ))}
        </aside>
        <article className="case-story">
          {[
            ['Overview', item.body],
            [
              'Challenge',
              lang === 'al'
                ? 'Organizata kishte nevoje per sisteme me te sigurta, me te shkallezueshme dhe me te lehta per tu menaxhuar.'
                : 'The organization needed more secure, scalable, and manageable systems for critical operations.',
            ],
            [
              'Solution',
              lang === 'al'
                ? 'CCS projektoi, implementoi dhe optimizoi zgjidhjen duke kombinuar infrastrukture, siguri dhe dokumentim teknik.'
                : 'CCS designed, implemented, and optimized the solution by combining infrastructure, security, and technical documentation.',
            ],
            [
              'Impact',
              lang === 'al'
                ? 'Rezultati ishte performance me e mire, mbrojtje me e forte dhe nje baze me e qendrueshme per zhvillim.'
                : 'The result was better performance, stronger protection, and a more stable foundation for growth.',
            ],
          ].map(([heading, body]) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <p>{body}</p>
            </section>
          ))}
        </article>
      </div>
    </section>
  )
}

function SimpleAccountPage({ page, copy, navigate }) {
  return (
    <section className="detail-page narrow">
      <div className="account-panel">
        <img src={ASSETS.favicon} alt="" />
        <h1>{page[0]}</h1>
        <p>{page[1]}</p>
        <AppLink to="/shop/" navigate={navigate} className="primary-action">
          <ShoppingCart size={17} />
          {copy.common.viewShop}
        </AppLink>
      </div>
    </section>
  )
}

function ContactSection({ copy }) {
  return (
    <section className="section contact-section" id="contact">
      <SectionHeading title={copy.home.contactTitle} />
      <div className="contact-grid">
        <article>
          <Mail size={22} />
          <h3>{copy.home.contacts}</h3>
          <a href="mailto:info@ccs.al">info@ccs.al</a>
          <a href="tel:+35542259005">+ 04 225 9005</a>
        </article>
        <article>
          <MapPin size={22} />
          <h3>{copy.home.location}</h3>
          <a href="https://www.google.com/maps/place/CCS/@41.3182558,19.8101846,17z" target="_blank" rel="noreferrer">
            {copy.home.address}
          </a>
        </article>
        <article>
          <Clock size={22} />
          <h3>{copy.home.hours}</h3>
          <p>{copy.home.open}</p>
          <p>{copy.home.closed}</p>
        </article>
      </div>
    </section>
  )
}

function Footer({ copy, lang, navigate }) {
  return (
    <SiteFooter
      copy={copy}
      lang={lang}
      navigate={navigate}
      logoSrc={ASSETS.logoDark}
      services={SERVICES}
      titleFor={titleFor}
      LinkComponent={AppLink}
    />
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      {eyebrow && <Kicker>{eyebrow}</Kicker>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function Kicker({ children }) {
  return <span className="kicker">{children}</span>
}

export default App
