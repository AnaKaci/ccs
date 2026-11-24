import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AppWindow,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Award,
  CalendarCheck,
  Clock,
  Cloud,
  Cpu,
  Database,
  Factory,
  Filter,
  Handshake,
  Headphones,
  Keyboard,
  Laptop,
  Layers3,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  Network,
  PcCase,
  Phone,
  Printer,
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
import { useSiteMotion } from './motion'
import { CSV_PRODUCTS } from './data/catalog'
import './App.css'
import './design-consistency.css'
import './theme-fixes.css'
import './professional-redesign.css'
import './layout-refinement.css'
import './header-polish.css'
import './partner-cards.css'
import './home.css'

// The folder the site is served from ("/" locally, e.g. "/ccs/" on a subfolder host),
// derived from this module's own URL so unknown paths are never mistaken for the base.
const APP_BASE = (() => {
  try {
    const modulePath = new URL(import.meta.url).pathname
    const index = modulePath.search(/\/(assets|src)\//)
    return index >= 0 ? modulePath.slice(0, index + 1) : '/'
  } catch {
    return '/'
  }
})()

function publicAsset(name) {
  return `${APP_BASE}${name}`
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

const COMMERCE_ROUTE_PREFIXES = ['/shop/', '/products/', '/products-hp/', '/hp-poly/', '/product/', '/product-category/', '/cart/', '/checkout/']

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
      { labelKey: 'hardware', to: '/product-category/hardware/' },
      { labelKey: 'software', to: '/product-category/software/' },
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
    backdrop: ASSETS.solutionStorage,
    to: '/products-hp/',
    body: 'Reliable HP workstations, laptops, printers, displays, and business hardware.',
    alBody: 'Pajisje HP për biznesin: workstation, laptopë, printerë dhe ekrane.',
  },
  {
    title: 'HP Poly',
    alTitle: 'HP Poly',
    image: ASSETS.hpPoly,
    backdrop: ASSETS.support,
    to: '/hp-poly/',
    body: 'Modern collaboration, conferencing, headsets, and meeting-room devices.',
    alBody: 'Zgjidhje moderne për bashkëpunim, video-konferenca dhe pajisje për salla takimesh.',
  },
  {
    title: 'Fortinet',
    alTitle: 'Fortinet',
    image: ASSETS.fortinet,
    backdrop: ASSETS.solutionSecurity,
    to: '/fortinet/',
    body: 'Network protection, firewalls, secure access, and threat intelligence.',
    alBody: 'Mbrojtje rrjeti, firewall, akses i sigurt dhe inteligjencë ndaj kërcënimeve.',
  },
  {
    title: 'Cisco',
    alTitle: 'Cisco',
    image: ASSETS.cisco,
    backdrop: ASSETS.solutionNetwork,
    to: '/cisco/',
    body: 'Enterprise networking, switching, wireless, and collaboration systems.',
    alBody: 'Rrjete për biznesin, switching, wireless dhe sisteme bashkëpunimi.',
  },
]

const VENDOR_LOGOS = {
  HP: PARTNER_LOGOS.hp,
  Fortinet: PARTNER_LOGOS.fortinet,
  Cisco: PARTNER_LOGOS.cisco,
}

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

function inferProductKind(categories = []) {
  const links = categories.map((category) => category.link || '').join(' ')
  const slugs = categories.map((category) => category.slug)

  if (links.includes('/software/') || slugs.includes('software')) return 'software'
  if (links.includes('/hardware/') || slugs.includes('hardware')) return 'hardware'
  if (
    slugs.some((slug) =>
      ['security', 'backup', 'office', 'email', 'gis', 'productivity-business-applications', 'data-analysis-siem-solutions'].includes(slug),
    )
  ) {
    return 'software'
  }
  return 'hardware'
}

function inferProductCategory(categories = [], kind = 'hardware') {
  if (kind === 'software') return 'software'
  const slugs = categories.map((category) => category.slug)
  const links = categories.map((category) => category.link || '').join(' ')
  const has = (...keys) => keys.some((key) => slugs.includes(key) || links.includes(`/${key}/`))

  if (has('desktop', 'desktops', 'aio')) return 'desktop'
  if (has('laptop', 'laptops', 'notebook')) return 'laptop'
  if (has('monitor', 'monitors')) return 'monitor'
  if (has('printer', 'printers', 'printer-mfp')) return 'printer'
  return 'accessories'
}

function formatLekLabel(amount) {
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount)} LEK`
}

function storeAmount(prices, value) {
  const amount = Number(value)
  if (!Number.isFinite(amount) || amount <= 0) return null
  return amount / 10 ** (prices?.currency_minor_unit || 0)
}

function cleanAttributeValue(value = '') {
  return stripHtml(String(value)).replace(/^["'\s]+|["'\s]+$/g, '')
}

function normalizeStoreVariation(variation, parent, entry, attributeName) {
  const prices = variation.prices || {}
  const price = storeAmount(prices, prices.price)
  const regularPrice = storeAmount(prices, prices.regular_price)
  const attributeValue = cleanAttributeValue(entry?.attributes?.[0]?.value || variation.variation || '')
  const images = (variation.images || []).map((image) => image.src).filter(Boolean)
  const ownImages = images.length && images[0] !== parent.image ? images : []

  return {
    id: variation.id,
    name: attributeValue ? `${parent.name} - ${attributeValue}` : parent.name,
    price,
    priceLabel: price ? formatLekLabel(price) : '',
    regularPrice,
    regularPriceLabel: regularPrice && price && regularPrice > price ? formatLekLabel(regularPrice) : '',
    attributeName: entry?.attributes?.[0]?.name || attributeName || '',
    attributeValue,
    image: ownImages[0] || '',
    gallery: ownImages,
    inStock: variation.is_in_stock !== false,
  }
}

function normalizeStoreProduct(item, variations = []) {
  const categories = (item.categories || []).map((category) => ({
    name: stripHtml(category.name),
    slug: category.slug,
    link: category.link,
  }))
  const brands = (item.brands || []).map((brand) => ({ name: stripHtml(brand.name), slug: brand.slug }))
  const kind = inferProductKind(categories)
  const category = inferProductCategory(categories, kind)
  const name = stripHtml(item.name)
  const description = descriptionLines(item.description || item.short_description || '')
  const prices = item.prices || {}
  const isVariable = item.type === 'variable'
  const price =
    kind === 'software'
      ? null
      : storeAmount(prices, isVariable ? prices.price_range?.min_amount ?? prices.price : prices.price)
  const regularPrice = kind === 'software' ? null : storeAmount(prices, prices.regular_price)
  const images = (item.images || []).map((image) => image.src).filter(Boolean)
  const image = images[0] || ASSETS.favicon
  const inStock = item.is_in_stock !== false
  const variationAttribute = (item.attributes || []).find((attribute) => attribute.has_variations)
  const attributeName = variationAttribute?.name || ''
  const parentShape = { name, image }
  const variationById = new Map(variations.map((variation) => [variation.id, variation]))
  const variants = isVariable
    ? (item.variations || [])
        .map((entry) => {
          const variation = variationById.get(entry.id)
          return variation ? normalizeStoreVariation(variation, parentShape, entry, attributeName) : null
        })
        .filter(Boolean)
    : []
  const brandTokens = brands.map((brand) => normalizeFilterToken(brand.slug || brand.name)).filter(Boolean)
  const tokens = [
    ...new Set(
      [
        kind,
        category,
        item.slug,
        name,
        ...categories.flatMap((entry) => [entry.slug, entry.name]),
        ...brands.flatMap((brand) => [brand.slug, brand.name]),
        ...description,
      ]
        .join(' ')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .split(/\s+/)
        .filter(Boolean)
        .concat(brandTokens, inStock ? ['instock'] : [], price ? [] : ['quote']),
    ),
  ]

  return {
    id: item.id,
    sourceType: 'live',
    slug: item.slug,
    sku: item.sku || '',
    name,
    kind,
    category,
    brand: brands[0]?.name || (kind === 'software' ? 'Software' : 'CCS'),
    brands,
    categories,
    price,
    priceLabel: price ? (isVariable && variants.length > 1 ? `From ${formatLekLabel(price)}` : formatLekLabel(price)) : '',
    regularPriceLabel:
      !isVariable && regularPrice && price && regularPrice > price ? formatLekLabel(regularPrice) : '',
    image,
    gallery: images.length ? images : [image],
    description,
    specs: [],
    searchText: [name, ...brands.map((brand) => brand.name), ...categories.map((entry) => entry.name), item.sku, ...description]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
    tokens,
    inStock,
    onSale: Boolean(item.on_sale),
    variants,
    attributeName,
    attributeValues: variationAttribute?.terms?.map((term) => term.name).join(', ') || '',
    originalUrl: item.permalink,
  }
}

async function fetchAllStorePages(params) {
  const first = await fetch(storeProductsUrl({ ...params, page: '1' }))
  if (!first.ok) throw new Error(`Product API failed: ${first.status}`)
  const totalPages = Math.min(Number(first.headers.get('X-WP-TotalPages')) || 1, 20)
  const rest = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      fetch(storeProductsUrl({ ...params, page: String(index + 2) })).then((response) => {
        if (!response.ok) throw new Error(`Product API failed: ${response.status}`)
        return response.json()
      }),
    ),
  )
  return [await first.json(), ...rest].flat()
}

async function fetchLiveCatalog() {
  const [items, variations] = await Promise.all([
    fetchAllStorePages({ orderby: 'menu_order', order: 'asc' }),
    fetchAllStorePages({ type: 'variation' }).catch(() => []),
  ])
  const variationsByParent = new Map()
  variations.forEach((variation) => {
    const list = variationsByParent.get(variation.parent) || []
    list.push(variation)
    variationsByParent.set(variation.parent, list)
  })
  return items
    .filter((item) => item.type !== 'variation')
    .map((item) => normalizeStoreProduct(item, variationsByParent.get(item.id) || []))
}

const LIVE_CATALOG_CACHE_KEY = 'ccs-live-catalog-v1'

function readCachedCatalog() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(LIVE_CATALOG_CACHE_KEY) || 'null')
    return Array.isArray(cached?.products) && cached.products.length ? cached.products : null
  } catch {
    return null
  }
}

// Products come live from WooCommerce (ccs.al). The last live list is cached so the
// shop renders instantly; the bundled CSV export is only a fallback if WordPress is unreachable.
function useProducts() {
  const [state, setState] = useState(() => {
    const cached = typeof window === 'undefined' ? null : readCachedCatalog()
    return { products: cached || CSV_PRODUCTS, source: cached ? 'cache' : 'bundled', loading: true }
  })

  useEffect(() => {
    let active = true
    fetchLiveCatalog()
      .then((products) => {
        if (!active || !products.length) return
        setState({ products, source: 'live', loading: false })
        try {
          window.localStorage.setItem(LIVE_CATALOG_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), products }))
        } catch {
          // Storage full or blocked: the live list still renders for this visit.
        }
      })
      .catch((error) => {
        console.warn('[CCS] Live WooCommerce products unavailable, using saved catalogue.', error)
        if (active) setState((current) => ({ ...current, loading: false }))
      })
    return () => {
      active = false
    }
  }, [])

  return state
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
  const relative = pathname.startsWith(APP_BASE) ? pathname.slice(APP_BASE.length) : pathname
  const parts = relative.split('/').filter(Boolean)

  if (!parts.length || (parts.length === 1 && parts[0] === 'index.html')) {
    return '/'
  }

  // Always compare routes with a trailing slash so "/shop" and "/shop/" match.
  return `/${parts.join('/')}/`
}

function getAppRoot() {
  return APP_BASE
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

function cleanTextLines(lines = []) {
  return lines
    .flatMap((line) => String(line ?? '').split(/\\n|\n/))
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

function splitSpecLines(lines = []) {
  const rows = []
  const paragraphs = []
  cleanTextLines(lines).forEach((line) => {
    const match = line.match(/^([^:]{2,40}):\s*(.+)$/)
    if (match && line.length <= 160) {
      rows.push([match[1].trim(), match[2].replace(/^`/, '').trim()])
    } else {
      paragraphs.push(line)
    }
  })
  return { rows, paragraphs }
}

function titleFor(item, lang) {
  return lang === 'al' && item.alTitle ? item.alTitle : item.title
}

function iconForCategory(category) {
  if (category === 'all') return LayoutGrid
  if (category === 'hardware') return Cpu
  if (category === 'software') return AppWindow
  if (category === 'desktop') return PcCase
  if (category === 'laptop') return Laptop
  if (category === 'monitor') return Monitor
  if (category === 'printer') return Printer
  if (category === 'network') return Wifi
  if (category === 'accessories') return Keyboard
  return Cpu
}

const LANGUAGE_FLAGS = {
  en: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
  al: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg',
}

const SHOP_CATEGORIES = ['all', 'hardware', 'software', 'desktop', 'laptop', 'monitor', 'printer', 'accessories']

function shopCategoryPath(category) {
  return category === 'all' ? '/shop/' : `/product-category/${category}/`
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
  useSiteMotion(`${route.path}|${lang}`)

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
    <div className={`site-shell page-wide ${commerceMode ? 'commerce-ui' : 'non-shop-ui'}`}>
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

  const searchTerm = term.trim().toLowerCase()
  const searchResults = searchTerm
    ? products.filter((item) => item.name.toLowerCase().includes(searchTerm)).slice(0, 6)
    : []

  useEffect(() => {
    if (!searchOpen) return undefined
    const onEscape = (event) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [searchOpen])

  const submitSearch = (event) => {
    event?.preventDefault()
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
            title={lang === 'en' ? 'Shqip' : 'English'}
            onClick={() => setLang(lang === 'en' ? 'al' : 'en')}
          >
            <img
              className="ccs-language-flag"
              src={lang === 'en' ? LANGUAGE_FLAGS.al : LANGUAGE_FLAGS.en}
              alt=""
              width="22"
              height="15"
            />
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
        <>
          <button
            type="button"
            className="hs-backdrop"
            aria-label={copy.common.closeMenu}
            tabIndex={-1}
            onClick={() => setSearchOpen(false)}
          />
          <div className="hs-panel" role="dialog" aria-modal="true" aria-label={copy.common.shopSearch}>
            <div className="hs-inner">
              <form className="hs-form" onSubmit={submitSearch} role="search">
                <Search size={18} aria-hidden="true" />
                <input
                  autoFocus
                  type="search"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder={copy.common.searchPlaceholder}
                  aria-label={copy.common.searchPlaceholder}
                />
                {term && (
                  <button type="button" className="hs-clear" onClick={() => setTerm('')}>
                    {lang === 'al' ? 'Pastro' : 'Clear'}
                  </button>
                )}
                <button
                  type="button"
                  className="hs-close"
                  aria-label={copy.common.closeMenu}
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={18} />
                </button>
              </form>

              {searchResults.length > 0 ? (
                <div className="hs-results">
                  <p className="hs-label">{lang === 'al' ? 'Produkte' : 'Products'}</p>
                  <ul>
                    {searchResults.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setTerm('')
                            setSearchOpen(false)
                            navigate(`/product/${item.slug}/`)
                          }}
                        >
                          <span className="hs-thumb">
                            <img src={item.image} alt="" />
                          </span>
                          <span className="hs-name">{item.name}</span>
                          <span className="hs-price">{item.kind === 'software' ? 'Inquiry' : item.priceLabel}</span>
                          <ArrowRight size={16} aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="hs-all" onClick={submitSearch}>
                    {lang === 'al' ? `Shiko te gjitha rezultatet per "${term.trim()}"` : `See all results for "${term.trim()}"`}
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              ) : term.trim() ? (
                <p className="hs-empty">
                  {lang === 'al'
                    ? 'Asnje produkt nuk perputhet. Shtypni Enter per te kerkuar ne dyqan.'
                    : 'No matching products. Press Enter to search the full shop.'}
                </p>
              ) : (
                <div className="hs-suggest">
                  <p className="hs-label">{lang === 'al' ? 'Shfletoni' : 'Browse'}</p>
                  <div className="hs-chips">
                    {[
                      [copy.nav.hardware, '/product-category/hardware/'],
                      [copy.nav.software, '/product-category/software/'],
                      [copy.nav.hpProducts, '/products-hp/'],
                      ['HP Poly', '/hp-poly/'],
                      ['Fortinet', '/fortinet/'],
                      ['Cisco', '/cisco/'],
                      [copy.common.viewShop, '/shop/'],
                    ].map(([label, to]) => (
                      <AppLink
                        key={to}
                        to={to}
                        navigate={navigate}
                        className="hs-chip"
                        onClick={() => setSearchOpen(false)}
                      >
                        {label}
                      </AppLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
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
    const slug = route.path.split('/').filter(Boolean)[1]
    if (!SHOP_CATEGORIES.includes(slug) || slug === 'all') {
      return <NotFoundPage copy={copy} lang={lang} navigate={navigate} />
    }
    const initialKind = slug
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

  if (route.path === '/') {
    return <HomePage copy={copy} lang={lang} navigate={navigate} />
  }

  return <NotFoundPage copy={copy} lang={lang} navigate={navigate} />
}

function NotFoundPage({ copy, lang, navigate }) {
  const isAl = lang === 'al'

  // Runs after every render so it always wins over the app-level title update.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.title = isAl ? 'Faqja nuk u gjet | CCS Albania' : 'Page not found | CCS Albania'
    }, 0)
    return () => window.clearTimeout(timer)
  })

  const shortcuts = [
    [copy.nav.itSolution, '/network-security/'],
    [isAl ? 'Dyqani' : 'Shop', '/shop/'],
    [copy.nav.caseStudies, '/case-studies/'],
    [copy.nav.contactUs, '/#contact'],
  ]

  return (
    <section className="nf" aria-labelledby="nf-title">
      <div className="nf__code" aria-hidden="true">
        404
      </div>
      <div className="nf__inner">
        <span className="nf__eyebrow">{isAl ? 'Gabim 404' : 'Error 404'}</span>
        <h1 id="nf-title">{isAl ? 'Kjo faqe nuk ekziston.' : 'This page doesn’t exist.'}</h1>
        <p>
          {isAl
            ? 'Lidhja mund te jete e vjeter ose e shkruar gabim. Kthehuni ne faqen kryesore ose zgjidhni nje nga seksionet me poshte.'
            : 'The link may be outdated or mistyped. Head back to the home page or pick one of the sections below.'}
        </p>
        <div className="nf__actions">
          <AppLink to="/" navigate={navigate} className="nf__btn">
            <ArrowRight size={18} aria-hidden="true" />
            {isAl ? 'Kthehu ne kryefaqe' : 'Back to home'}
          </AppLink>
        </div>
        <nav className="nf__links" aria-label={isAl ? 'Seksione te dobishme' : 'Helpful sections'}>
          {shortcuts.map(([label, to]) => (
            <AppLink to={to} navigate={navigate} key={to}>
              {label}
              <ArrowRight size={15} aria-hidden="true" />
            </AppLink>
          ))}
        </nav>
      </div>
    </section>
  )
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

function SectionBar({ label }) {
  return (
    <div className="hp-bar" aria-hidden="true">
      <span className="hp-bar__mark" />
      <span className="hp-bar__label">{label}</span>
    </div>
  )
}

function LogoMarquee({ items, label, variant = 'partners', speed = 40 }) {
  const minItems = 14
  const repeat = Math.max(1, Math.ceil(minItems / items.length))
  const sequence = Array.from({ length: repeat }, () => items).flat()
  const renderSet = (hidden) => (
    <ul className="hp-marquee__set" aria-hidden={hidden || undefined}>
      {sequence.map(([name, src], index) => (
        <li key={`${name}-${index}`}>
          <img src={src} alt={hidden ? '' : name} loading="lazy" />
          {variant === 'certs' && <span>{name}</span>}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`hp-marquee hp-marquee--${variant}`} aria-label={label} role="region">
      <div className="hp-marquee__track" style={{ '--hp-marquee-duration': `${speed}s` }}>
        {renderSet(false)}
        {renderSet(true)}
      </div>
    </div>
  )
}

function HomePage({ copy, lang, navigate }) {
  const [activeModal, setActiveModal] = useState(null)
  const [activeService, setActiveService] = useState(0)
  const isAl = lang === 'al'
  const yearsActive = new Date().getFullYear() - 1993
  const facts = [
    { icon: CalendarCheck, value: '1993', label: isAl ? 'Viti i themelimit ne Tirane' : 'Founded in Tirana' },
    { icon: Award, value: String(CERTIFICATIONS.length), label: isAl ? 'Certifikime ISO' : 'ISO-certified management systems' },
    { icon: Handshake, value: String(PARTNERS.length), label: isAl ? 'Partnere teknologjie' : 'Global technology partners' },
    { icon: Factory, value: String(new Set(CASE_STUDIES.map((item) => item.industry)).size), label: isAl ? 'Industri kritike' : 'Critical industries served' },
  ]
  const principles = [
    { title: isAl ? 'Cikel i plote projekti' : 'Full project lifecycle', body: copy.home.lifecycle },
    { title: isAl ? 'Konsulence dhe trajnim' : 'Consulting and training', body: copy.home.aboutBody },
    { title: isAl ? 'Partner afatgjate' : 'Long-term partnership', body: copy.home.aboutBodyTwo },
  ]
  const capabilities = [...PAGE_DATA['/network-security/'].points, ...PAGE_DATA['/infrastructure/'].points.slice(0, 1)]

  return (
    <div className="hp">
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

      <section className="hp-intro" aria-label={isAl ? 'Rreth CCS' : 'About CCS'}>
        <div className="hp-wrap hp-intro__grid">
          <div className="hp-intro__copy">
            <h1 className="hp-display">
              {isAl ? (
                <>Infrastrukture, siguri dhe sisteme <em>qe punojne</em> per organizatat shqiptare.</>
              ) : (
                <>Infrastructure, security and systems <em>that hold up</em> for Albania&rsquo;s critical organisations.</>
              )}
            </h1>
            <p className="hp-intro__lead">{copy.home.aboutLead}</p>
            <div className="hp-intro__actions">
              <a href="#contact" className="hp-btn hp-btn--primary">
                {isAl ? 'Kontaktoni ekipin' : 'Talk to our engineers'}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <AppLink to="/case-studies/" navigate={navigate} className="hp-btn hp-btn--ghost">
                {copy.nav.caseStudies}
              </AppLink>
            </div>
          </div>

          <div className="hp-intro__visual">
            <img src={ASSETS.aboutTwo} alt={isAl ? 'Ambienti i punes ne zyrat e CCS ne Tirane' : 'The CCS office in Tirana'} />
            <div className="hp-intro__badge">
              <strong>{yearsActive}</strong>
              <span>{isAl ? 'vite ne IT ne Shqiperi' : 'years delivering IT in Albania'}</span>
            </div>
            <nav className="hp-intro__card" aria-label={isAl ? 'Sherbimet' : 'Services'}>
              <span className="hp-intro__card-title">{isAl ? 'Sherbimet tona' : 'What we do'}</span>
              {SERVICES.map((service) => {
                const Icon = service.icon
                return (
                  <AppLink to={service.to} navigate={navigate} key={service.key}>
                    <span className="hp-intro__card-icon">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    {titleFor(service, lang)}
                    <ArrowRight size={15} aria-hidden="true" />
                  </AppLink>
                )
              })}
            </nav>
          </div>
        </div>

        <div className="hp-wrap">
          <dl className="hp-facts">
            {facts.map((fact) => {
              const Icon = fact.icon
              return (
                <div key={fact.label}>
                  <Icon size={22} aria-hidden="true" />
                  <dd>{fact.value}</dd>
                  <dt>{fact.label}</dt>
                </div>
              )
            })}
          </dl>
        </div>
      </section>

      <section className="hp-section hp-section--services" id="services">
        <div className="hp-wrap">
          <SectionBar label={isAl ? 'Sherbimet' : 'Services'} />
          <header className="hp-head">
            <h2>{isAl ? 'Cfare bejme' : 'What we do'}</h2>
            <p>
              {isAl
                ? 'CCS kombinon siguri, rrjet, infrastrukture, servera, storage dhe suport teknik.'
                : 'Four practices, one accountable team. We design, deliver and operate the systems your organisation depends on.'}
            </p>
            <AppLink to="/shop/" navigate={navigate} className="hp-link">
              {copy.common.viewShop}
              <ArrowRight size={15} aria-hidden="true" />
            </AppLink>
          </header>
        </div>
        <div className="hp-panels">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <AppLink
                to={service.to}
                navigate={navigate}
                className={`hp-panel${activeService === index ? ' is-active' : ''}`}
                key={service.key}
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
              >
                <img src={service.image} alt="" loading="lazy" />
                <span className="hp-panel__shade" aria-hidden="true" />
                <span className="hp-panel__body">
                  <Icon size={22} aria-hidden="true" />
                  <strong>{titleFor(service, lang)}</strong>
                  <span className="hp-panel__more">
                    <span>{lang === 'al' ? service.alShort : service.short}</span>
                    <span className="hp-panel__cta">
                      {copy.common.learnMore}
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </span>
                </span>
              </AppLink>
            )
          })}
        </div>
      </section>

      <section className="hp-bleed" id="about">
        <div className="hp-bleed__media">
          <img src={ASSETS.aboutOne} alt={isAl ? 'Zyrat e CCS ne Tirane' : 'CCS office reception in Tirana'} />
        </div>
        <div className="hp-bleed__copy">
          <SectionBar label={copy.home.aboutTitle} />
          <h2>{isAl ? 'Partner teknologjie per infrastrukture dhe siguri.' : 'Three decades building the systems Albania runs on.'}</h2>
          <ul className="hp-principles">
            {principles.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hp-band" style={{ '--hp-band-image': `url(${ASSETS.solutionSecurity})` }}>
        <div className="hp-wrap">
          <SectionBar label={isAl ? 'Siguria' : 'Security'} />
        </div>
        <div className="hp-wrap hp-band__inner">
          <div className="hp-band__copy">
            <h2>{isAl ? 'Zgjidhje te integruara per sisteme kritike.' : 'Integrated protection for critical systems.'}</h2>
            <p>
              {isAl
                ? 'CCS mbulon rrjetin, sigurine, serverat, storage, vazhdimesine e biznesit dhe suportin operacional.'
                : 'CCS covers network security, servers, storage, business continuity, and operational support.'}
            </p>
            <AppLink to="/network-security/" navigate={navigate} className="hp-btn hp-btn--light">
              {copy.nav.networkSecurity}
              <ArrowRight size={17} aria-hidden="true" />
            </AppLink>
          </div>
          <ul className="hp-band__list">
            {capabilities.map((point) => (
              <li key={point}>
                <Check size={18} aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hp-section hp-section--gis">
        <div className="hp-wrap">
          <SectionBar label="GIS / ArcGIS" />
        </div>
        <div className="hp-wrap hp-gis-split">
          <div className="hp-gis-split__copy">
            <h2>{copy.home.gisTitle}</h2>
            <p>
              {isAl
                ? 'Planifikim, administrim GIS dhe suport on-call per iniciativa ArcGIS.'
                : 'Planning, GIS system administration, and on-call support for ArcGIS initiatives.'}
            </p>
            <ul className="hp-gis">
              {GIS_SERVICES.map((item) => (
                <li key={item.key}>
                  <button type="button" onClick={() => setActiveModal(item)}>
                    <span>
                      <strong>{titleFor(item, lang)}</strong>
                      <small>{lang === 'al' ? item.alSubtitle : item.subtitle}</small>
                    </span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <figure className="hp-gis-split__media">
            <img src={ASSETS.gis} alt={isAl ? 'Sistemet GIS te CCS' : 'CCS GIS systems'} loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="hp-section hp-section--alt" id="partners">
        <div className="hp-wrap">
          <SectionBar label={isAl ? 'Partneret' : 'Partners'} />
          <header className="hp-head">
            <h2>{isAl ? 'Partneret teknologjike' : 'Technology partners'}</h2>
            <p>
              {isAl
                ? 'Eksploroni zgjidhjet profesionale te HP, HP Poly, Fortinet dhe Cisco.'
                : 'We work directly with the vendors behind enterprise IT. Explore solutions from HP, HP Poly, Fortinet and Cisco.'}
            </p>
          </header>
          <div className="hp-vendors">
            {RECOMMENDED.map((item) => (
              <AppLink to={item.to} navigate={navigate} className="hp-vendor hp-vendor--logo" key={item.title}>
                <span className="hp-vendor__stage">
                  <img src={VENDOR_LOGOS[item.title] || item.image} alt={`${item.title} logo`} loading="lazy" />
                </span>
                <span className="hp-vendor__body">
                  <strong>{titleFor(item, lang)}</strong>
                  <span>{lang === 'al' ? item.alBody : item.body}</span>
                  <span className="hp-vendor__cta">
                    {copy.common.learnMore}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </AppLink>
            ))}
          </div>
        </div>
        <LogoMarquee items={PARTNERS} label={copy.home.partnersTitle} variant="partners" speed={45} />
      </section>

      <section className="hp-section hp-section--certs" id="certification">
        <div className="hp-wrap">
          <SectionBar label={isAl ? 'Standardet' : 'Standards'} />
        </div>
        <div className="hp-wrap hp-certs-head">
          <h2>{copy.home.certificationsTitle}</h2>
          <p>{isAl ? 'Sisteme menaxhimi te certifikuara sipas standardeve nderkombetare.' : 'Quality, security, service and continuity management certified to international standards.'}</p>
        </div>
        <LogoMarquee items={CERTIFICATIONS} label={copy.home.certificationsTitle} variant="certs" speed={35} />
      </section>

      <section className="hp-contact" id="contact">
        <div className="hp-wrap hp-contact__grid">
          <div className="hp-contact__lead">
            <span className="hp-contact__eyebrow">{isAl ? 'Kontakt' : 'Start a conversation'}</span>
            <h2 className="hp-contact__title">
              {isAl ? 'Planifikoni zgjidhjen tuaj me CCS.' : 'Plan your next technology initiative with CCS.'}
            </h2>
            <p>
              {isAl
                ? 'Na kontaktoni per konsulence, infrastrukture, siguri, GIS, suport teknik ose perzgjedhje produktesh.'
                : 'Tell us what you are planning: consulting, infrastructure, cybersecurity, GIS, support or product selection. Our engineers will come back to you with a clear next step.'}
            </p>
            <div className="hp-contact__actions">
              <a href="mailto:info@ccs.al" className="hp-btn hp-btn--dark">
                <Mail size={18} aria-hidden="true" />
                {isAl ? 'Na shkruani' : 'Email our team'}
              </a>
              <a href="tel:+35542259005" className="hp-btn hp-btn--outline-light">
                <Phone size={18} aria-hidden="true" />
                {isAl ? 'Na telefononi' : 'Call us'}
              </a>
            </div>
          </div>
          <ul className="hp-contact__cards">
            <li>
              <a href="mailto:info@ccs.al">
                <Mail size={22} aria-hidden="true" />
                <span className="hp-contact__k">Email</span>
                <strong>info@ccs.al</strong>
              </a>
            </li>
            <li>
              <a href="tel:+35542259005">
                <Phone size={22} aria-hidden="true" />
                <span className="hp-contact__k">{isAl ? 'Telefon' : 'Phone'}</span>
                <strong>+ 04 225 9005</strong>
              </a>
            </li>
            <li>
              <a href="https://www.google.com/maps/place/CCS/@41.3182558,19.8101846,17z" target="_blank" rel="noreferrer">
                <MapPin size={22} aria-hidden="true" />
                <span className="hp-contact__k">{copy.home.location}</span>
                <strong>{copy.home.address}</strong>
              </a>
            </li>
            <li>
              <div>
                <Clock size={22} aria-hidden="true" />
                <span className="hp-contact__k">{copy.home.hours}</span>
                <strong>
                  {copy.home.open}
                  <br />
                  {copy.home.closed}
                </strong>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {activeModal && (
        <Modal item={activeModal} copy={copy} lang={lang} onClose={() => setActiveModal(null)} />
      )}
    </div>
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

const SHOP_PAGE_SIZE = 20
const SHOP_HERO_INTERVAL = 6500

function ShopHeroCarousel({ slides, label }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const go = (next) => setIndex((next + count) % count)

  useEffect(() => {
    if (paused || count < 2) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), SHOP_HERO_INTERVAL)
    return () => window.clearTimeout(timer)
  }, [index, paused, count])

  return (
    <section
      className={`shc${paused ? ' is-paused' : ''}`}
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') go(index - 1)
        if (event.key === 'ArrowRight') go(index + 1)
      }}
    >
      {slides.map((slide, slideIndex) => {
        const active = slideIndex === index
        return (
          <div
            className={`shc-slide${active ? ' is-active' : ''}`}
            key={slide.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} / ${count}`}
            aria-hidden={!active}
          >
            <img className="shc-slide__img" src={slide.image} alt="" loading={slideIndex === 0 ? 'eager' : 'lazy'} />
            <span className="shc-slide__shade" aria-hidden="true" />
            <div className="shc-slide__content">
              <span className="shc-slide__eyebrow">{slide.eyebrow}</span>
              {slideIndex === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
              <p>{slide.text}</p>
              <div className="shc-slide__actions">
                {slide.actions.map((action) =>
                  action.href ? (
                    <a
                      key={action.label}
                      href={action.href}
                      className={`hp-btn ${action.primary ? 'hp-btn--primary' : 'shc-btn--ghost'}`}
                      tabIndex={active ? undefined : -1}
                      target={action.external ? '_blank' : undefined}
                      rel={action.external ? 'noreferrer' : undefined}
                    >
                      {action.label}
                      {action.primary && <ArrowRight size={17} aria-hidden="true" />}
                    </a>
                  ) : (
                    <button
                      type="button"
                      key={action.label}
                      className={`hp-btn ${action.primary ? 'hp-btn--primary' : 'shc-btn--ghost'}`}
                      tabIndex={active ? undefined : -1}
                      onClick={action.onClick}
                    >
                      {action.label}
                      {action.primary && <ArrowRight size={17} aria-hidden="true" />}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        )
      })}

      {count > 1 && (
        <div className="shc-controls">
          <div className="shc-dots">
            {slides.map((slide, slideIndex) => (
              <button
                type="button"
                key={slide.key}
                className={slideIndex === index ? 'is-active' : ''}
                aria-label={`${slideIndex + 1} / ${count}`}
                aria-current={slideIndex === index ? 'true' : undefined}
                onClick={() => go(slideIndex)}
              >
                <span style={{ animationDuration: `${SHOP_HERO_INTERVAL}ms` }} />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
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
  const [visibleCount, setVisibleCount] = useState(SHOP_PAGE_SIZE)
  const isAl = langForCopy(copy) === 'al'
  const scrollToProducts = () => {
    document.getElementById('shop-search')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    setCategory(initialKind)
  }, [initialKind])

  useEffect(() => {
    setVisibleCount(SHOP_PAGE_SIZE)
  }, [category, filters, query, sort])

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
  const activeChips = activeFilterGroups.flatMap((group) =>
    (filters[group.key] || []).map((token) => ({
      groupKey: group.key,
      groupTitle: group.title,
      token,
      label: group.options.find(([optionToken]) => optionToken === token)?.[1] || token,
    })),
  )

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
    setSort('')
    if (category !== 'all') goCategory('all')
  }

  const categories = SHOP_CATEGORIES
  const goCategory = (item) => {
    setCategory(item)
    navigate(shopCategoryPath(item), { keepScroll: true })
  }

  return (
    <div className="shop-page">
      <ShopHeroCarousel
        label={isAl ? 'Dyqani CCS' : 'CCS Shop'}
        slides={[
          {
            key: 'welcome',
            image: ASSETS.shopHero,
            eyebrow: isAl ? 'Dyqani CCS' : 'CCS Shop',
            title: copy.shop.welcome,
            text: copy.shop.capture,
            actions: [
              { label: isAl ? 'Shfleto produktet' : 'Browse products', primary: true, onClick: scrollToProducts },
              {
                label: isAl ? 'Bisedoni ne WhatsApp' : 'Chat on WhatsApp',
                href: 'https://wa.me/355684088507?text=Jam+i+interesuar+p%C3%ABr+produktet+tuaja',
                external: true,
              },
            ],
          },
          {
            key: 'hardware',
            image: ASSETS.solutionStorage,
            eyebrow: copy.shop.hardware,
            title: isAl ? 'Pajisje per biznesin' : 'Hardware built for business',
            text: isAl
              ? 'Laptope, desktop, monitore, printere dhe aksesore nga HP, Xerox dhe te tjere.'
              : 'Laptops, desktops, monitors, printers and accessories from HP, Xerox and more.',
            actions: [
              {
                label: isAl ? 'Shiko hardware' : 'Shop hardware',
                primary: true,
                onClick: () => {
                  goCategory('hardware')
                  scrollToProducts()
                },
              },
              {
                label: isAl ? 'Laptope' : 'Laptops',
                onClick: () => {
                  goCategory('laptop')
                  scrollToProducts()
                },
              },
            ],
          },
          {
            key: 'software',
            image: ASSETS.solutionSecurity,
            eyebrow: copy.shop.software,
            title: isAl ? 'Siguri dhe software per ndermarrje' : 'Security and enterprise software',
            text: isAl
              ? 'Zgjidhje nga Fortinet, Cisco, Microsoft, ArcGIS dhe te tjere, me cmim sipas licencimit.'
              : 'Solutions from Fortinet, Cisco, Microsoft, ArcGIS and more, priced to your licensing needs.',
            actions: [
              {
                label: isAl ? 'Shiko software' : 'Explore software',
                primary: true,
                onClick: () => {
                  goCategory('software')
                  scrollToProducts()
                },
              },
              { label: isAl ? 'Kerko oferte' : 'Request a quote', href: 'mailto:info@ccs.al?subject=Software%20quote' },
            ],
          },
        ]}
      />

      <div className="shop-sticky" id="shop-search">
        <div className="category-tabs" aria-label="Product categories">
          {categories.map((item) => {
            const Icon = iconForCategory(item)
            const active = category === item
            return (
              <AppLink
                to={shopCategoryPath(item)}
                navigate={navigate}
                className={active ? 'active' : ''}
                aria-current={active ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  goCategory(item)
                }}
                key={item}
              >
                <Icon size={17} aria-hidden="true" />
                {copy.shop[item]}
              </AppLink>
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
                <option value="">{langForCopy(copy) === 'al' ? 'Te rekomanduara' : 'Recommended'}</option>
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

          {activeChips.length > 0 && (
            <div className="sp-active" aria-label={isAl ? 'Filtrat aktive' : 'Active filters'}>
              {activeChips.map((chip) => (
                <button
                  type="button"
                  key={`${chip.groupKey}-${chip.token}`}
                  onClick={() => toggleFilter(chip.groupKey, chip.token)}
                  aria-label={`${isAl ? 'Hiq' : 'Remove'} ${chip.label}`}
                >
                  <small>{chip.groupTitle}:</small>
                  {chip.label}
                  <X size={14} aria-hidden="true" />
                </button>
              ))}
              <button type="button" className="sp-active__clear" onClick={() => setFilters({})}>
                {isAl ? 'Pastro filtrat' : 'Clear filters'}
              </button>
            </div>
          )}

          <div className="product-count">
            <span>
              {productsLoading && !products.length
                ? 'Loading products...'
                : category === 'all' && !query && !Object.values(filters).some((value) => value?.length)
                  ? `${products.length} products · ${products.reduce((sum, item) => sum + (item.variants?.length || 0), 0)} configurations`
                  : `${filteredProducts.length} products`}
            </span>
            {(query || Object.values(filters).some((value) => value?.length) || category !== 'all') && (
              <button type="button" onClick={clearFilters}>
                {copy.common.clear}
              </button>
            )}
          </div>
          {filteredProducts.length ? (
            <>
              <div className="products-grid">
                {filteredProducts.slice(0, visibleCount).map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    copy={copy}
                    navigate={navigate}
                    addToCart={addToCart}
                  />
                ))}
              </div>
              <div className="sp-more">
                <p>
                  {langForCopy(copy) === 'al'
                    ? `Po shfaqen ${Math.min(visibleCount, filteredProducts.length)} nga ${filteredProducts.length} produkte`
                    : `Showing ${Math.min(visibleCount, filteredProducts.length)} of ${filteredProducts.length} products`}
                </p>
                <span className="sp-more__bar" aria-hidden="true">
                  <span style={{ width: `${(Math.min(visibleCount, filteredProducts.length) / filteredProducts.length) * 100}%` }} />
                </span>
                {visibleCount < filteredProducts.length && (
                  <button type="button" onClick={() => setVisibleCount((count) => count + SHOP_PAGE_SIZE)}>
                    {langForCopy(copy) === 'al' ? 'Shfaq me shume' : 'Show more products'}
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="empty-state">{copy.common.noProducts}</p>
          )}
        </div>
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

  const isAl = lang === 'al'
  const isSoftware = resolvedProduct.kind === 'software'
  const needsQuote = isSoftware || !resolvedProduct.priceLabel
  const displayPriceLabel = selectedVariant?.priceLabel || resolvedProduct.priceLabel
  const displayRegularPriceLabel = selectedVariant?.regularPriceLabel || resolvedProduct.regularPriceLabel
  const { rows: specRows, paragraphs } = splitSpecLines(
    resolvedProduct.description?.length ? resolvedProduct.description : resolvedProduct.specs,
  )
  const brandName = resolvedProduct.brands?.[0]?.name || resolvedProduct.brand
  const categoryName = resolvedProduct.categories?.[0]?.name
    ? stripHtml(resolvedProduct.categories[0].name).split('>').pop().trim()
    : isSoftware
      ? copy.nav.software
      : copy.nav.hardware
  const highlights = specRows.slice(0, 4)
  const whatsappText = encodeURIComponent(
    `${isAl ? 'Jam i interesuar per' : 'I am interested in'}: ${resolvedProduct.name}${selectedVariant?.attributeValue ? ` (${selectedVariant.attributeValue})` : ''}`,
  )
  const related = products
    .filter((item) => item.slug !== resolvedProduct.slug && item.kind === resolvedProduct.kind)
    .sort((x, y) => Number(y.category === resolvedProduct.category) - Number(x.category === resolvedProduct.category))
    .slice(0, 5)
  const mainImage = gallery[activeImage] || selectedVariant?.image || resolvedProduct.image

  return (
    <div className="hp pd">
      <div className="sol-wrap">
        <nav className="pd-crumbs" aria-label={isAl ? 'Gjurma' : 'Breadcrumb'}>
          <AppLink to="/" navigate={navigate}>{copy.nav.home}</AppLink>
          <span aria-hidden="true">/</span>
          <AppLink to="/shop/" navigate={navigate}>{isAl ? 'Dyqani' : 'Shop'}</AppLink>
          <span aria-hidden="true">/</span>
          <AppLink
            to={isSoftware ? '/product-category/software/' : '/product-category/hardware/'}
            navigate={navigate}
          >
            {isSoftware ? copy.nav.software : copy.nav.hardware}
          </AppLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{resolvedProduct.name}</span>
        </nav>

        <div className="pd-top">
          <div className="pd-gallery">
            <div className="pd-gallery__main">
              <img src={mainImage} alt={resolvedProduct.name} />
            </div>
            {gallery.length > 1 && (
              <div className="pd-gallery__thumbs" role="list">
                {gallery.map((image, index) => (
                  <button
                    type="button"
                    role="listitem"
                    className={index === activeImage ? 'is-active' : ''}
                    key={image}
                    onClick={() => setActiveImage(index)}
                    aria-label={`${isAl ? 'Imazhi' : 'Image'} ${index + 1}`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <article className="pd-summary">
            <div className="pd-summary__meta">
              {brandName && <span className="pd-brand">{brandName}</span>}
              <span>{categoryName}</span>
            </div>
            <h1>{resolvedProduct.name}</h1>
            {resolvedProduct.sku && (
              <p className="pd-sku">
                {isAl ? 'Kodi' : 'SKU'}: {resolvedProduct.sku}
              </p>
            )}

            <div className="pd-price">
              {needsQuote ? (
                <>
                  <strong className="pd-price__quote">{isAl ? 'Cmim sipas kerkeses' : 'Price on request'}</strong>
                  <span>
                    {isAl
                      ? 'Cmimi percaktohet sipas licencimit, perdoruesve dhe konfigurimit.'
                      : 'Pricing depends on licensing, users, and configuration.'}
                  </span>
                </>
              ) : (
                <>
                  <strong>{displayPriceLabel}</strong>
                  {displayRegularPriceLabel && <del>{displayRegularPriceLabel}</del>}
                </>
              )}
              {resolvedProduct.inStock === true && (
                <span className="pd-stock">{isAl ? 'Ne stok' : 'In stock'}</span>
              )}
            </div>

            {variants.length > 0 && (
              <div className="pd-variants">
                <span className="pd-label">
                  {resolvedProduct.attributeName || (isAl ? 'Konfigurimi' : 'Configuration')}
                </span>
                <div>
                  {variants.map((variant) => (
                    <button
                      type="button"
                      className={selectedVariant?.id === variant.id ? 'is-active' : ''}
                      aria-pressed={selectedVariant?.id === variant.id}
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariantId(variant.id)
                        setActiveImage(0)
                      }}
                    >
                      <strong>{String(variant.attributeValue || variant.name).replace(/^["'\s]+|["'\s]+$/g, '')}</strong>
                      <small>{variant.priceLabel}</small>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pd-actions">
              {needsQuote ? (
                <a
                  href={`mailto:info@ccs.al?subject=${encodeURIComponent(`Inquiry for ${resolvedProduct.name}`)}`}
                  className="hp-btn hp-btn--primary"
                >
                  <Mail size={18} aria-hidden="true" />
                  {isAl ? 'Kerko oferte' : 'Request a quote'}
                </a>
              ) : (
                <AddToCartButton
                  copy={copy}
                  className="hp-btn hp-btn--primary pd-cart"
                  iconSize={18}
                  onAdd={() => addToCart(resolvedProduct, selectedVariant)}
                />
              )}
              <a
                href={`https://wa.me/355684088507?text=${whatsappText}`}
                className="hp-btn pd-btn--outline"
                target="_blank"
                rel="noreferrer"
              >
                <Phone size={18} aria-hidden="true" />
                WhatsApp
              </a>
            </div>

            {highlights.length > 0 && (
              <dl className="pd-highlights">
                {highlights.map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <ul className="pd-help">
              <li>
                <Mail size={16} aria-hidden="true" />
                <span>
                  {isAl ? 'Pyetje? ' : 'Questions? '}
                  <a href="mailto:info@ccs.al">info@ccs.al</a>
                </span>
              </li>
              <li>
                <Phone size={16} aria-hidden="true" />
                <a href="tel:+35542259005">+ 04 225 9005</a>
              </li>
            </ul>
          </article>
        </div>
      </div>

      {(specRows.length > 0 || paragraphs.length > 0) && (
        <section className="pd-details">
          <div className="sol-wrap pd-details__inner">
            {paragraphs.length > 0 && (
              <div className="pd-overview">
                <h2>{isAl ? 'Pershkrimi' : 'Overview'}</h2>
                {paragraphs.map((line, index) => (
                  <p key={`${index}-${line.slice(0, 20)}`}>{line}</p>
                ))}
              </div>
            )}
            {specRows.length > 0 && (
              <div className="pd-specs">
                <h2>{isAl ? 'Specifikimet' : 'Specifications'}</h2>
                <dl>
                  {specRows.map(([key, value], index) => (
                    <div key={`${index}-${key}`}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="pd-related">
          <div className="sol-wrap">
            <header className="hp-head">
              <h2>{isAl ? 'Produkte te ngjashme' : 'You may also like'}</h2>
              <p />
              <AppLink to="/shop/" navigate={navigate} className="hp-link">
                {copy.common.viewShop}
                <ArrowRight size={15} aria-hidden="true" />
              </AppLink>
            </header>
            <div className="pd-related__grid">
              {related.map((item) => (
                <ProductCard key={item.id} item={item} copy={copy} navigate={navigate} addToCart={addToCart} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
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
              {(filters[group.key] || []).length > 0 && (
                <span className="fm-count">{(filters[group.key] || []).length}</span>
              )}
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

function AddToCartButton({ copy, onAdd, className = '', iconSize = 16, compact = false }) {
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
      {added && compact ? <Check size={iconSize} aria-hidden="true" /> : <ShoppingCart size={iconSize} aria-hidden="true" />}
      {compact ? (
        <span className="sp-sr">{added ? copy.common.addedToCart : copy.common.addToCart}</span>
      ) : added ? (
        copy.common.addedToCart
      ) : (
        copy.common.addToCart
      )}
    </button>
  )
}

function ProductCard({ item, copy, navigate, addToCart }) {
  const isAl = langForCopy(copy) === 'al'
  const isInquiry = item.kind === 'software' || !item.priceLabel
  const variantCount = item.variants?.length || 0
  const brand = item.brand || (item.kind === 'software' ? 'Software' : item.category)
  const categoryLabel = item.categories?.[0]?.name
    ? stripHtml(item.categories[0].name).split('>').pop().trim()
    : copy.shop?.[item.category] || item.category
  const href = `/product/${item.slug}/`

  return (
    <article className="sp-card">
      <AppLink to={href} navigate={navigate} className="sp-card__link">
        <span className="sp-card__media">
          <img src={item.image} alt="" loading="lazy" />
          {categoryLabel && <span className="sp-card__badge">{categoryLabel}</span>}
        </span>
        <span className="sp-card__info">
          <span className="sp-card__brand">{brand}</span>
          <h3 className="sp-card__name">{item.name}</h3>
          {variantCount > 0 && (
            <span className="sp-card__variants">
              <Layers3 size={13} aria-hidden="true" />
              {variantCount} {isAl ? 'konfigurime' : 'configurations'}
            </span>
          )}
        </span>
      </AppLink>
      <div className="sp-card__foot">
        <div className="sp-card__price">
          {isInquiry ? (
            <>
              <small>{isAl ? 'Cmimi' : 'Price'}</small>
              <span className="sp-card__inquiry">{isAl ? 'Sipas kerkeses' : 'On request'}</span>
            </>
          ) : (
            <>
              <small>{variantCount > 0 ? (isAl ? 'Nga' : 'From') : isAl ? 'Cmimi' : 'Price'}</small>
              <strong>{String(item.priceLabel).replace(/^(from|nga)\s+/i, '')}</strong>
            </>
          )}
        </div>
        {isInquiry || variantCount > 0 ? (
          <AppLink
            to={href}
            navigate={navigate}
            className="sp-card__icon-btn sp-card__icon-btn--ghost"
            aria-label={`${isAl ? 'Shiko' : 'View'} ${item.name}`}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </AppLink>
        ) : (
          <AddToCartButton
            copy={copy}
            onAdd={() => addToCart(item)}
            className="sp-card__icon-btn"
            iconSize={18}
            compact
          />
        )}
      </div>
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

const SOLUTION_ICONS = {
  'Ransomware Attacks': Shield,
  'Phishing Attacks': Mail,
  'DDoS Attacks': Network,
  'Business Continuity & Reliability': Database,
  'Scalability & Flexibility': Layers3,
  'Cybersecurity & Compliance': ShieldCheck,
  'On-Premise Storage': Server,
  'Cloud Storage': Cloud,
  'Hybrid Storage': Layers3,
}

function ITSolutionPage({ data, copy, lang, navigate }) {
  const isAl = lang === 'al'
  const focus = SOLUTION_CONTENT[data.solutionKey]
  const others = IT_SOLUTION_SLIDES.filter((slide) => slide.key !== data.solutionKey)
  const title = titleFor(data, lang)

  return (
    <div className="hp sol">
      <section className="sol-hero" style={{ '--sol-image': `url(${data.image})` }}>
        <div className="sol-wrap sol-hero__inner">
          <nav className="sol-crumbs" aria-label={isAl ? 'Gjurma' : 'Breadcrumb'}>
            <AppLink to="/" navigate={navigate}>{copy.nav.home}</AppLink>
            <span aria-hidden="true">/</span>
            <span>{copy.nav.itSolution}</span>
          </nav>
          <h1>{title}</h1>
          <p>{isAl && data.alIntro ? data.alIntro : data.intro}</p>
          <div className="sol-hero__actions">
            <a href="#sol-contact" className="hp-btn hp-btn--primary">
              {data.solutionKey === 'support'
                ? isAl ? 'Raportoni nje problem' : 'Report an issue'
                : isAl ? 'Flisni me nje inxhinier' : 'Talk to an engineer'}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="sol-tabs">
          <div className="sol-wrap sol-tabs__inner" role="list">
            {IT_SOLUTION_SLIDES.map((slide) => {
              const Icon = PAGE_DATA[slide.to]?.icon || ShieldCheck
              const active = slide.key === data.solutionKey
              return (
                <AppLink
                  to={slide.to}
                  navigate={navigate}
                  key={slide.key}
                  role="listitem"
                  className={`sol-tab${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  {titleFor(slide, lang)}
                </AppLink>
              )
            })}
          </div>
        </div>
      </section>

      <section className="sol-section">
        <div className="sol-wrap sol-deliver">
          <div className="sol-deliver__head">
            <span className="hp-label">{isAl ? 'Cfare ofrojme' : 'What we deliver'}</span>
            <h2>{focus.title}</h2>
            <p>{focus.subtitle}</p>
          </div>
          <ul className="sol-points">
            {(data.points || []).map((point) => (
              <li key={point}>
                <Check size={18} aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {data.solutionKey !== 'support' && (
        <section className="sol-section sol-section--alt">
          <div className="sol-wrap">
            <SolutionBlock focus={focus} type={data.solutionKey} lang={lang} />
          </div>
        </section>
      )}

      {data.solutionKey === 'support' ? (
        <SupportIssuePanel lang={lang} />
      ) : (
        <section className="sol-cta" id="sol-contact">
          <div className="sol-wrap sol-cta__inner">
            <div>
              <h2>{isAl ? `Keni nevoje per ${title}?` : `Planning a ${title.toLowerCase()} project?`}</h2>
              <p>
                {isAl
                  ? 'Ekipi i CCS ju ndihmon nga vleresimi deri te implementimi dhe suporti.'
                  : 'Our engineers can help from assessment and design through to implementation and ongoing support.'}
              </p>
            </div>
            <div className="sol-cta__actions">
              <a
                href={`mailto:info@ccs.al?subject=${encodeURIComponent(`${title} enquiry`)}`}
                className="hp-btn hp-btn--dark"
              >
                <Mail size={18} aria-hidden="true" />
                info@ccs.al
              </a>
              <a href="tel:+35542259005" className="hp-btn hp-btn--outline-light">
                <Phone size={18} aria-hidden="true" />
                + 04 225 9005
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="sol-section">
        <div className="sol-wrap">
          <header className="hp-head">
            <h2>{isAl ? 'Zgjidhje te tjera' : 'Explore other solutions'}</h2>
            <p>
              {isAl
                ? 'CCS mbulon te gjithe ciklin e IT: rrjet, siguri, servera, infrastrukture dhe suport.'
                : 'CCS covers the full IT lifecycle, from networks and security to servers, infrastructure and support.'}
            </p>
          </header>
          <div className="sol-others">
            {others.map((slide) => (
              <AppLink to={slide.to} navigate={navigate} className="sol-other" key={slide.key}>
                <img src={slide.image} alt="" loading="lazy" />
                <span className="sol-other__shade" aria-hidden="true" />
                <span className="sol-other__body">
                  <strong>{titleFor(slide, lang)}</strong>
                  <span>{slide.intro}</span>
                  <span className="sol-other__cta">
                    {copy.common.learnMore}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </AppLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function SolutionBlock({ focus, type, lang }) {
  const isAl = lang === 'al'

  if (type === 'storage') {
    return (
      <>
        <header className="hp-head">
          <h2>{isAl ? 'Zgjidhni modelin e duhur' : 'Choose the right storage model'}</h2>
          <p>{focus.subtitle}</p>
        </header>
        <div className="sol-compare">
          {focus.rows.map(([typeName, benefits]) => {
            const Icon = SOLUTION_ICONS[typeName] || Server
            return (
              <article key={typeName}>
                <span className="sol-icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3>{typeName}</h3>
                <ul>
                  {benefits
                    .split('. ')
                    .map((line) => line.replace(/\.$/, '').trim())
                    .filter(Boolean)
                    .map((line) => (
                      <li key={line}>
                        <Check size={16} aria-hidden="true" />
                        {line}
                      </li>
                    ))}
                </ul>
              </article>
            )
          })}
        </div>
      </>
    )
  }

  const isNetwork = type === 'network'

  return (
    <>
      <header className="hp-head">
        <h2>
          {isNetwork
            ? isAl ? 'Kercenimet qe ndalojme' : 'Threats we stop'
            : isAl ? 'Cfare fitoni' : 'What you gain'}
        </h2>
        <p>{focus.subtitle}</p>
      </header>
      <div className="sol-cards">
        {focus.cards.map((card) => {
          const Icon = SOLUTION_ICONS[card.title] || ShieldCheck
          const tech = card.kicker
            ? card.kicker.replace(/^Mitigated by:\s*/i, '').split(/\s*&\s*/)
            : []
          return (
            <article key={card.title}>
              <span className="sol-icon">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              {tech.length > 0 && (
                <div className="sol-tech">
                  <small>{isAl ? 'Teknologjite' : 'Mitigated by'}</small>
                  <ul>
                    {tech.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </>
  )
}

function SupportIssuePanel({ lang }) {
  const isAl = lang === 'al'
  const [form, setForm] = useState({ name: '', email: '', area: '', details: '' })
  const [sent, setSent] = useState(false)
  const areas = isAl
    ? ['Rrjet & Siguri', 'Servera & Storage', 'Infrastrukture', 'GIS', 'Tjeter']
    : ['Network & Security', 'Servers & Storage', 'Infrastructure', 'GIS', 'Other']
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    const subject = `Support request${form.area ? ` - ${form.area}` : ''}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.area ? `Area: ${form.area}` : '',
      '',
      form.details,
    ]
      .filter((line, index) => line || index === 3)
      .join('\n')
    window.location.href = `mailto:info@ccs.al?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="sol-section sol-section--alt" id="sol-contact">
      <div className="sol-wrap sol-support">
        <div className="sol-support__info">
          <span className="hp-label">{isAl ? 'Suport' : 'Support'}</span>
          <h2>{isAl ? 'Na tregoni per problemin' : 'Tell us about the issue'}</h2>
          <p>
            {isAl
              ? 'Plotesoni formen dhe ekipi CCS do t’ju kontaktoje per ndihme teknike.'
              : 'Fill in the form and the CCS team will get back to you with technical assistance.'}
          </p>
          <ul className="sol-support__contacts">
            <li>
              <Mail size={18} aria-hidden="true" />
              <a href="mailto:info@ccs.al">info@ccs.al</a>
            </li>
            <li>
              <Phone size={18} aria-hidden="true" />
              <a href="tel:+35542259005">+ 04 225 9005</a>
            </li>
            <li>
              <Clock size={18} aria-hidden="true" />
              <span>{isAl ? 'E hene - E premte, 08:30 - 17:00' : 'Monday - Friday, 08:30 - 17:00'}</span>
            </li>
          </ul>
        </div>

        <form className="sol-form" onSubmit={submit}>
          <div className="sol-form__row">
            <label>
              <span>{isAl ? 'Emri' : 'Name'}</span>
              <input type="text" name="name" required autoComplete="name" value={form.name} onChange={update('name')} />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" required autoComplete="email" value={form.email} onChange={update('email')} />
            </label>
          </div>
          <fieldset className="sol-form__areas">
            <legend>{isAl ? 'Fusha' : 'Area'}</legend>
            {areas.map((area) => (
              <label key={area} className={form.area === area ? 'is-active' : ''}>
                <input
                  type="radio"
                  name="area"
                  value={area}
                  checked={form.area === area}
                  onChange={update('area')}
                />
                {area}
              </label>
            ))}
          </fieldset>
          <label>
            <span>{isAl ? 'Detaje rreth problemit' : 'Details about the issue'}</span>
            <textarea name="details" rows="6" required value={form.details} onChange={update('details')} />
          </label>
          <div className="sol-form__foot">
            <button type="submit" className="hp-btn hp-btn--primary">
              {isAl ? 'Dergo kerkesen' : 'Send request'}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            <p>
              {sent
                ? isAl
                  ? 'Programi juaj i emailit u hap me kerkesen gati per dergim.'
                  : 'Your email app has opened with the request ready to send.'
                : isAl
                  ? 'Kjo hap programin tuaj te emailit me kerkesen te plotesuar.'
                  : 'This opens your email app with the request filled in.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

function CaseContactBand({ lang }) {
  const isAl = lang === 'al'
  return (
    <section className="sol-cta">
      <div className="sol-wrap sol-cta__inner">
        <div>
          <h2>{isAl ? 'Keni nje sfide te ngjashme?' : 'Facing a similar challenge?'}</h2>
          <p>
            {isAl
              ? 'Tregojini ekipit te CCS per projektin tuaj dhe do t’ju ndihmojme te gjeni zgjidhjen e duhur.'
              : 'Tell the CCS team about your project and we will help you find the right approach.'}
          </p>
        </div>
        <div className="sol-cta__actions">
          <a href="mailto:info@ccs.al?subject=Project%20enquiry" className="hp-btn hp-btn--dark">
            <Mail size={18} aria-hidden="true" />
            info@ccs.al
          </a>
          <a href="tel:+35542259005" className="hp-btn hp-btn--outline-light">
            <Phone size={18} aria-hidden="true" />
            + 04 225 9005
          </a>
        </div>
      </div>
    </section>
  )
}

function CaseStudiesPage({ copy, lang, navigate }) {
  const isAl = lang === 'al'
  const [industry, setIndustry] = useState('all')
  const industries = [...new Set(CASE_STUDIES.map((item) => item.industry))]
  const visible = industry === 'all' ? CASE_STUDIES : CASE_STUDIES.filter((item) => item.industry === industry)
  const [featured, ...rest] = visible

  return (
    <div className="hp sol cs">
      <section className="cs-hero">
        <div className="sol-wrap cs-hero__inner">
          <div>
            <span className="cs-hero__eyebrow">{isAl ? 'Puna jone' : 'Our work'}</span>
            <h1>{copy.nav.caseStudies}</h1>
            <p>
              {isAl
                ? 'Keto raste tregojne implementime te suksesshme IT dhe GIS ne industri te ndryshme.'
                : 'Real IT, cybersecurity and GIS projects delivered by CCS for organisations in critical industries.'}
            </p>
          </div>
          <dl className="cs-hero__stats">
            <div>
              <dt>{isAl ? 'Raste studimi' : 'Case studies'}</dt>
              <dd>{CASE_STUDIES.length}</dd>
            </div>
            <div>
              <dt>{isAl ? 'Industri' : 'Industries'}</dt>
              <dd>{industries.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="sol-section cs-list">
        <div className="sol-wrap">
          <div className="cs-filter" role="group" aria-label={isAl ? 'Filtro sipas industrise' : 'Filter by industry'}>
            {['all', ...industries].map((name) => (
              <button
                type="button"
                key={name}
                className={industry === name ? 'is-active' : ''}
                aria-pressed={industry === name}
                onClick={() => setIndustry(name)}
              >
                {name === 'all' ? (isAl ? 'Te gjitha' : 'All industries') : name}
                <span>
                  {name === 'all' ? CASE_STUDIES.length : CASE_STUDIES.filter((item) => item.industry === name).length}
                </span>
              </button>
            ))}
          </div>

          {featured && (
            <AppLink to={featured.path} navigate={navigate} className="cs-feature">
              <span className="cs-art cs-art--large" aria-hidden="true">
                <img src={featured.image} alt="" />
              </span>
              <span className="cs-feature__body">
                <span className="cs-tag">{featured.industry}</span>
                <strong>{featured.title}</strong>
                <span className="cs-feature__text">{featured.body}</span>
                <span className="cs-more">
                  {isAl ? 'Lexo rastin' : 'Read case study'}
                  <ArrowRight size={17} aria-hidden="true" />
                </span>
              </span>
            </AppLink>
          )}

          {rest.length > 0 && (
            <div className="cs-grid">
              {rest.map((item) => (
                <AppLink to={item.path} navigate={navigate} className="cs-card" key={item.path}>
                  <span className="cs-art" aria-hidden="true">
                    <img src={item.image} alt="" loading="lazy" />
                  </span>
                  <span className="cs-card__body">
                    <span className="cs-tag">{item.industry}</span>
                    <strong>{item.title}</strong>
                    <span className="cs-card__text">{item.body}</span>
                    <span className="cs-more">
                      {isAl ? 'Lexo rastin' : 'Read case study'}
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </span>
                </AppLink>
              ))}
            </div>
          )}
        </div>
      </section>

      <CaseContactBand lang={lang} />
    </div>
  )
}

function CaseStudyDetail({ item, lang, navigate }) {
  const isAl = lang === 'al'
  const index = CASE_STUDIES.findIndex((caseStudy) => caseStudy.path === item.path)
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length]
  const others = CASE_STUDIES.filter((caseStudy) => caseStudy.path !== item.path)
  const steps = [
    [isAl ? 'Permbledhje' : 'Overview', item.body],
    [
      isAl ? 'Sfida' : 'Challenge',
      isAl
        ? 'Organizata kishte nevoje per sisteme me te sigurta, me te shkallezueshme dhe me te lehta per tu menaxhuar.'
        : 'The organization needed more secure, scalable, and manageable systems for critical operations.',
    ],
    [
      isAl ? 'Zgjidhja' : 'Solution',
      isAl
        ? 'CCS projektoi, implementoi dhe optimizoi zgjidhjen duke kombinuar infrastrukture, siguri dhe dokumentim teknik.'
        : 'CCS designed, implemented, and optimized the solution by combining infrastructure, security, and technical documentation.',
    ],
    [
      isAl ? 'Ndikimi' : 'Impact',
      isAl
        ? 'Rezultati ishte performance me e mire, mbrojtje me e forte dhe nje baze me e qendrueshme per zhvillim.'
        : 'The result was better performance, stronger protection, and a more stable foundation for growth.',
    ],
  ]

  return (
    <div className="hp sol cs">
      <section className="cs-hero cs-hero--detail">
        <div className="sol-wrap cs-detail-hero">
          <div>
            <AppLink to="/case-studies/" navigate={navigate} className="cs-back">
              <ArrowRight size={16} aria-hidden="true" />
              {isAl ? 'Te gjitha rastet' : 'All case studies'}
            </AppLink>
            <span className="cs-tag cs-tag--light">{item.industry}</span>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
          </div>
          <span className="cs-art cs-art--hero" aria-hidden="true">
            <img src={item.image} alt="" />
          </span>
        </div>
      </section>

      <section className="sol-section">
        <div className="sol-wrap cs-detail">
          <ol className="cs-steps">
            {steps.map(([heading, body]) => (
              <li key={heading}>
                <h2>{heading}</h2>
                <p>{body}</p>
              </li>
            ))}
          </ol>

          <aside className="cs-aside">
            <div className="cs-facts">
              <h2>{isAl ? 'Detajet e projektit' : 'Project details'}</h2>
              <dl>
                <div>
                  <dt>{isAl ? 'Industria' : 'Industry'}</dt>
                  <dd>{item.industry}</dd>
                </div>
                <div>
                  <dt>{isAl ? 'Partneri' : 'Delivered by'}</dt>
                  <dd>CCS Albania</dd>
                </div>
              </dl>
              <a href="mailto:info@ccs.al?subject=Project%20enquiry" className="hp-btn hp-btn--primary">
                {isAl ? 'Diskutoni projektin tuaj' : 'Discuss your project'}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>

            <nav className="cs-related" aria-label={isAl ? 'Raste te tjera' : 'More case studies'}>
              <h2>{isAl ? 'Raste te tjera' : 'More case studies'}</h2>
              {others.map((caseStudy) => (
                <AppLink to={caseStudy.path} navigate={navigate} key={caseStudy.path}>
                  <span className="cs-art cs-art--tiny" aria-hidden="true">
                    <img src={caseStudy.image} alt="" loading="lazy" />
                  </span>
                  <span>
                    <small>{caseStudy.industry}</small>
                    {caseStudy.title}
                  </span>
                </AppLink>
              ))}
            </nav>
          </aside>
        </div>
      </section>

      <section className="cs-next">
        <AppLink to={next.path} navigate={navigate} className="sol-wrap cs-next__link">
          <span>
            <small>{isAl ? 'Rasti tjeter' : 'Next case study'}</small>
            <strong>{next.title}</strong>
          </span>
          <span className="cs-next__arrow" aria-hidden="true">
            <ArrowRight size={26} />
          </span>
        </AppLink>
      </section>

      <CaseContactBand lang={lang} />
    </div>
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
