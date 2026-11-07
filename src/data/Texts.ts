const TEXT_DICTIONARY = {
  'nav.home': { en: 'Home', tr: 'Ana Sayfa' },
  'nav.projects': { en: 'Projects', tr: 'Projeler' },
  'nav.about': { en: 'About', tr: 'Hakkımda' },
  'nav.contact': { en: 'Contact', tr: 'İletişim' },
  'nav.github': { en: 'GitHub', tr: 'GitHub' },
  'nav.linkedin': { en: 'LinkedIn', tr: 'LinkedIn' },
  'nav.resume': { en: 'Resume', tr: 'Özgeçmiş' },
  'footer.copyright': {
    en: '© {year} Kerem Kırıcı. All rights reserved.',
    tr: '© {year} Kerem Kırıcı. Tüm hakları saklıdır.',
  },
  'footer.email': { en: 'Email', tr: 'Email' },
  'footer.github': { en: 'GitHub', tr: 'GitHub' },
  'footer.linkedin': { en: 'LinkedIn', tr: 'LinkedIn' },
  'hero.title': {
    en: 'Hey there! Welcome to my page.',
    tr: 'Merhaba! Portfolyoma Hoşgeldiniz.',
  },
  'hero.subtitle': {
    en: 'Full-Stack Software Developer — Backend, Data Pipelines & Databases · ITU Engineering Student',
    tr: 'Full-Stack Yazılım Geliştirici — Backend, Veri Hatları ve Veritabanları · İTÜ Mühendislik Öğrencisi',
  },
  'hero.cta': { en: 'Email', tr: 'Email' },
  'hero.linkedin': { en: 'LinkedIn', tr: 'LinkedIn' },
  'hero.github': { en: 'GitHub', tr: 'GitHub' },
  'home.featured': { en: 'Featured projects', tr: 'Öne çıkan projeler' },
  // --- Home Page Meta & Aside ---
  'home.page_title': {
    en: 'Kerem Kırıcı – Full-Stack Software Developer',
    tr: 'Kerem Kırıcı – Full-Stack Yazılım Geliştirici',
  },
  'home.page_description': {
    en: 'Portfolio of Kerem Kırıcı: projects, experience, and contact information.',
    tr: 'Kerem Kırıcı portfolyosu: projeler, deneyim ve iletişim bilgileri.',
  },
  'home.recent_focus_title': { en: 'Recent Focus', tr: 'Çalışma Alanlarım' },
  'home.recent_focus_text': {
    en: 'The backend and the data behind a product: pipelines that ingest, validate and move data, the databases it lands in, the scrapers and streaming feeds that collect it, and the web apps that put it in front of people.',
    tr: 'Bir ürünün backend’i ve arkasındaki veri: veriyi toplayan, doğrulayan ve taşıyan veri hatları, verinin yerleştiği veritabanları, onu toplayan scraper’lar ve canlı veri akışları, ve hepsini insanların önüne koyan web uygulamaları.',
  },
  'home.currently_working_with': {
    en: 'Mostly working with',
    tr: 'Çoğunlukla çalıştığım teknolojiler',
  },
  'home.availability': { en: "What's next", tr: 'Sırada ne var' },
  'home.availability_text': {
    en: 'Growing from intern into a full Forward Deployed Engineer: sitting close to the people who use the product, understanding their data and their problem, and shipping the pipeline, the database and the application that solve it, end to end.',
    tr: 'Stajyerlikten tam bir Forward Deployed Engineer olmaya doğru büyüyorum: ürünü kullanan insanlara yakın durmak, verilerini ve sorunlarını anlamak, ve o sorunu çözen veri hattını, veritabanını ve uygulamayı uçtan uca hayata geçirmek.',
  },
  'home.current_position': { en: 'Where I am now', tr: 'Şu an neredeyim' },
  'home.current_position_text': {
    en: 'Forward Deployed Engineer Intern at a data platform startup, where I contribute to the company’s GitHub projects and its cloud platform and work on data pipelines. Before that: AI & Data Engineering intern at İş Bankası, building validation pipelines for the Test Automation Team, and a year as a Junior Software Developer at Tatilsepeti.',
    tr: 'Bir veri platformu startup’ında Forward Deployed Engineer Intern olarak şirketin GitHub projelerine ve bulut platformuna katkı veriyor, veri hatları üzerinde çalışıyorum. Öncesinde İş Bankası’nda Test Otomasyon Ekibi için doğrulama hatları kuran AI & Data Engineering stajyeriydim; ondan önce de bir yıl Tatilsepeti’nde Junior Software Developer olarak çalıştım.',
  },
  'hero.description': {
    en: "Hi, I'm Kerem! I'm a full-stack software developer and an Electronics and Communication Engineering student at ITU, with 2+ years of professional experience. Most of my work now sits behind the interface: data pipelines, databases, web scraping, and the backends and cloud services that tie them together. I'm currently a Forward Deployed Engineer Intern at a data platform startup, contributing to its GitHub projects and cloud platform and learning Bruin for building data pipelines. Before that, at İş Bankası, I built the data infrastructure for the Test Automation Team: PyMongo flows landing raw SDLC data in MongoDB, automated checks that the processed data reaches SQL intact, email alerts for anything missing, and Jenkins running all of it. At Tatilsepeti I spent a year on a Next.js backoffice for ~300 employees, with dashboards over millions of records and API integrations that replaced manual reporting. On my own time I'm building PulseWindow, a .NET, Redis and PostgreSQL service that streams live market data and finds price gaps that survive real fees. Next, I want to grow into a full Forward Deployed Engineer: close to the customer, owning the whole path from raw data to a working product.",
    tr: "Merhaba, ben Kerem! İTÜ'de Elektronik ve Haberleşme Mühendisliği okuyan, 2+ yıllık profesyonel deneyime sahip bir full-stack yazılım geliştiricisiyim. Bugün işimin büyük kısmı arayüzün arkasında: veri hatları, veritabanları, web scraping ve bunları birbirine bağlayan backend ve bulut servisleri. Şu anda bir veri platformu startup'ında Forward Deployed Engineer Intern olarak şirketin GitHub projelerine ve bulut platformuna katkı veriyor, veri hatları kurmak için Bruin'i öğreniyorum. Öncesinde İş Bankası'nda Test Otomasyon Ekibi için veri altyapısını kurdum: ham SDLC verisini MongoDB'ye taşıyan PyMongo akışları, işlenmiş verinin SQL'e eksiksiz ulaştığını doğrulayan otomatik kontroller, eksik veri için e-posta uyarıları ve bunların tümünü çalıştıran Jenkins. Tatilsepeti'nde bir yıl boyunca ~300 çalışanın kullandığı bir Next.js backoffice üzerinde çalıştım; milyonlarca kayıt üzerinde çalışan panolar ve manuel raporlamanın yerini alan API entegrasyonları geliştirdim. Kendi zamanımda ise PulseWindow'u geliştiriyorum: canlı piyasa verisini akış halinde alan ve gerçek komisyonlardan sonra da kârlı kalan fiyat farklarını bulan bir .NET, Redis ve PostgreSQL servisi. Sırada tam bir Forward Deployed Engineer olarak büyümek istiyorum: müşteriye yakın, ham veriden çalışan bir ürüne kadar tüm yolun sorumluluğunu alarak.",
  },
  'hero.lets_connect': {
    en: "Let's connect!",
    tr: 'Bağlantı Yolla!',
  },
  'about.title': {
    en: 'About',
    tr: 'Hakkımda',
  },
  'about.subtitle': {
    en: 'Full-Stack Software Developer — Backend, Data Pipelines & Databases · ITU Engineering Student',
    tr: 'Full-Stack Yazılım Geliştirici — Backend, Veri Hatları ve Veritabanları · İTÜ Mühendislik Öğrencisi',
  },
  'about.description': {
    en: "Hello, I'm Kerem Kırıcı — thanks for stopping by. I'm a full-stack software developer and an Electronics and Communication Engineering student at Istanbul Technical University, with 2+ years of professional experience across large enterprise teams and small startups. I've built web interfaces and mobile apps, but the work I keep coming back to is underneath them: getting data in, keeping it correct, storing it well, and serving it to the product.\n\nRight now I'm a Forward Deployed Engineer Intern at a data platform startup. I contribute to the company's GitHub projects and its cloud platform, and I'm taking on data pipelines, database management and web scraping work. I'm still early with Bruin, the pipeline tool I use there, and I'm learning it by building with it.\n\nBefore that I was at İş Bankası as an AI & Data Engineering Intern in the Master Class 2026 program, on the backend side of the Test Automation Team. I engineered the data infrastructure with PyMongo, controlling the flows that log raw SDLC data streams from internal bank applications into MongoDB. I built automated validation that checks processed test data reaches SQL tables intact, with a protocol that detects missing data and reports it to the team by email. I added monitoring across multi-step pipelines — tracking the ratio of missing metrics while deriving performance indicators at the team, application and package level — and configured Jenkins to orchestrate the validation jobs, so the pipelines stayed reliable without anyone checking them by hand.\n\nAt Tatilsepeti, one of Turkey's major travel-tech companies, I started as an intern and moved to full-time Junior Software Developer after a single month. In a three-person team I helped modernize a legacy backoffice with Next.js and Material UI for around 300 employees. The part I learned most from was the data: dashboards for the Sales, Marketing and SEO teams over millions of records, and Swagger-driven API integrations that replaced manual reporting with live data.\n\nMy professional start was at VISIGHT Technology, where I led a greenfield React Native app end to end and delivered the MVP in four months, with Firebase handling authentication and real-time data. It taught me what it means to own a product from an empty repository.\n\nOn my own time I build things that pull these threads together. PulseWindow, which I'm building now, streams live order books from several crypto exchanges, computes price gaps after each market's real fees, paper-trades them and shows the results on a Next.js dashboard — a .NET service on Redis and PostgreSQL, run with Docker and watched with Prometheus and Grafana. It is the grown-up version of Arbitrage-Alerts, a Selenium scraper I wrote in 2021 for the same problem.\n\nWhat ties it together is range with rigor: I'm comfortable moving from a database schema to an API to the screen that uses it, and I care that the data underneath is right.",
    tr: "Merhaba, ben Kerem Kırıcı — uğradığınız için teşekkürler! İstanbul Teknik Üniversitesi'nde Elektronik ve Haberleşme Mühendisliği okuyan, hem büyük kurumsal ekiplerde hem de küçük startup'larda edindiğim 2+ yıllık profesyonel deneyime sahip bir full-stack yazılım geliştiricisiyim. Web arayüzleri ve mobil uygulamalar geliştirdim; ama tekrar tekrar döndüğüm iş onların altında: veriyi içeri almak, doğru tutmak, iyi saklamak ve ürüne sunmak.\n\nŞu anda bir veri platformu startup'ında Forward Deployed Engineer Intern olarak çalışıyorum. Şirketin GitHub projelerine ve bulut platformuna katkı veriyor; veri hatları, veritabanı yönetimi ve web scraping işlerini üstleniyorum. Orada kullandığım veri hattı aracı Bruin'de henüz yeniyim ve onu kullanarak geliştirirken öğreniyorum.\n\nÖncesinde İş Bankası'nda, Master Class 2026 programı kapsamında AI & Data Engineering stajyeri olarak Test Otomasyon Ekibinin backend tarafındaydım. Veri altyapısını PyMongo ile kurdum; bankanın iç uygulamalarından gelen ham SDLC veri akışlarını MongoDB'ye kaydeden akışları yönettim. İşlenmiş test verisinin SQL tablolarına eksiksiz ulaştığını kontrol eden otomatik doğrulamalar geliştirdim ve eksik veriyi tespit edip ekibe e-posta ile raporlayan bir protokol kurdum. Çok adımlı hatlar boyunca izleme ekledim — takım, uygulama ve paket seviyesinde performans göstergeleri türetilirken eksik metrik oranını takip ederek — ve doğrulama işlerini Jenkins ile yöneterek hatların kimse elle kontrol etmeden güvenilir kalmasını sağladım.\n\nTürkiye'nin önde gelen seyahat teknolojisi şirketlerinden Tatilsepeti'nde stajyer olarak başladım ve yalnızca bir ay sonra tam zamanlı Junior Software Developer oldum. Üç kişilik bir ekipte, yaklaşık 300 çalışanın kullandığı eski bir backoffice'i Next.js ve Material UI ile modernize ettik. En çok şey öğrendiğim kısım veriydi: Satış, Pazarlama ve SEO ekipleri için milyonlarca kayıt üzerinde çalışan panolar ve manuel raporlamanın yerini canlı veriyle dolduran, Swagger tabanlı API entegrasyonları.\n\nProfesyonel başlangıcım VISIGHT Technology'deydi: Sıfırdan bir React Native uygulamasını uçtan uca yönettim ve kimlik doğrulama ile gerçek zamanlı veri için Firebase kullanarak MVP'yi dört ayda teslim ettim. Bir ürünü boş bir repodan itibaren sahiplenmenin ne demek olduğunu orada öğrendim.\n\nKendi zamanımda bu parçaları bir araya getiren projeler geliştiriyorum. Şu an üzerinde çalıştığım PulseWindow, birkaç kripto borsasından canlı emir defterlerini akış halinde alıyor, her piyasanın gerçek komisyonlarından sonra kalan fiyat farklarını hesaplıyor, bunlarla kâğıt üzerinde işlem yapıyor ve sonuçları bir Next.js panosunda gösteriyor — Redis ve PostgreSQL üzerinde çalışan, Docker ile ayağa kalkan ve Prometheus ile Grafana üzerinden izlenen bir .NET servisi. 2021'de aynı problem için yazdığım Selenium tabanlı scraper Arbitrage-Alerts'in büyümüş hali.\n\nTüm bunları birbirine bağlayan şey, disiplinle birleşen çok yönlülük: Bir veritabanı şemasından API'ye, oradan onu kullanan ekrana rahatça geçebiliyorum ve en alttaki verinin doğru olmasını önemsiyorum.",
  },
  // --- About Page Meta ---
  'about.page_title': { en: 'About – Kerem Kırıcı', tr: 'Hakkımda – Kerem Kırıcı' },
  'about.page_description': {
    en: 'About Kerem Kırıcı, full-stack software developer working on backends, data pipelines and databases.',
    tr: 'Backend, veri hatları ve veritabanları üzerinde çalışan full-stack yazılım geliştirici Kerem Kırıcı hakkında.',
  },

  // --- About Page Sections ---
  'about.experience_title': { en: 'Experience', tr: 'Deneyim' },
  'about.skills_title': { en: 'Skills', tr: 'Yetkinlikler' },
  'about.education_title': { en: 'Education', tr: 'Eğitim' },
  'about.certificates_title': { en: 'Certificates', tr: 'Sertifikalar' },
  'about.leadership_title': { en: 'Leadership & Volunteering', tr: 'Liderlik ve Gönüllülük' },
  'experience.current.company': {
    en: 'Data platform startup',
    tr: 'Veri platformu startup’ı',
  },
  'experience.current.role': {
    en: 'Forward Deployed Engineer Intern',
    tr: 'Forward Deployed Engineer Intern',
  },
  'experience.current.dates': {
    en: '2026 – Present',
    tr: '2026 – Halen',
  },
  'experience.current.summary': {
    en: 'Contributing to the company’s GitHub projects and its cloud platform, and taking on data pipelines, database management and web scraping work while learning Bruin, the team’s data pipeline tool.',
    tr: 'Şirketin GitHub projelerine ve bulut platformuna katkı veriyor; ekibin veri hattı aracı Bruin’i öğrenirken veri hatları, veritabanı yönetimi ve web scraping işlerini üstleniyorum.',
  },
  'experience.current.highlights': {
    en: 'Contributing code to the company’s GitHub projects and to its cloud platform.\nBuilding data pipelines that ingest data from external sources, transform it in SQL and feed reporting dashboards.\nTaking responsibility for database management and web scraping work as it comes up.\nRamping up on Bruin by building real pipelines with it.',
    tr: 'Şirketin GitHub projelerine ve bulut platformuna kod katkısı veriyorum.\nDış kaynaklardan veri alan, SQL ile dönüştüren ve raporlama panolarını besleyen veri hatları kuruyorum.\nOrtaya çıktıkça veritabanı yönetimi ve web scraping işlerinin sorumluluğunu alıyorum.\nBruin’i gerçek veri hatları kurarak öğreniyorum.',
  },

  // --- Experience Entries ---
  'experience.isbankasi.company': { en: 'İş Bankası', tr: 'İş Bankası' },
  'experience.isbankasi.role': {
    en: 'AI & Data Engineering Intern — Master Class 2026',
    tr: 'AI & Data Engineering Stajyeri — Master Class 2026',
  },
  'experience.isbankasi.dates': {
    en: 'June 2026 – August 2026 · Istanbul',
    tr: 'Haziran 2026 – Ağustos 2026 · İstanbul',
  },
  'experience.isbankasi.summary': {
    en: 'Built the backend data infrastructure and automated validation pipelines behind the bank’s Test Automation Team — PyMongo data flows into MongoDB, SQL integrity checks with email alerting, and Jenkins-orchestrated validation jobs.',
    tr: 'Bankanın Test Otomasyon Ekibinin arkasındaki backend veri altyapısını ve otomatik doğrulama hatlarını kurdum — MongoDB’ye akan PyMongo veri hatları, e-posta uyarılı SQL bütünlük kontrolleri ve Jenkins ile yönetilen doğrulama işleri.',
  },
  'experience.isbankasi.highlights': {
    en: 'Engineered the backend data infrastructure for the Test Automation Team, using PyMongo to control the flows that log raw SDLC data streams from internal bank applications into MongoDB.\nDeveloped automated validation systems verifying that processed test data transfers into SQL tables intact, with a protocol that detects missing data and reports it to the team by email.\nBuilt monitoring logic across multi-step processing pipelines to protect data integrity, tracking the ratio of missing metrics while deriving performance indicators at the team, application, and package level.\nConfigured Jenkins to orchestrate the automated validation tasks for internal enterprise products, reducing manual overhead and keeping the data pipelines continuously reliable.',
    tr: 'Test Otomasyon Ekibi için backend veri altyapısını kurdum; bankanın iç uygulamalarından gelen ham SDLC veri akışlarını MongoDB’ye kaydeden hatları PyMongo ile yönettim.\nİşlenmiş test verisinin SQL tablolarına eksiksiz aktarıldığını doğrulayan otomatik sistemler geliştirdim; eksik veriyi tespit edip ekibe e-posta ile raporlayan bir protokol kurdum.\nVeri bütünlüğünü korumak için çok adımlı işleme hatları boyunca izleme mantığı kurdum; takım, uygulama ve paket seviyesinde türetilmiş performans göstergeleri üretilirken eksik metrik oranını takip ettim.\nKurumsal iç ürünler için otomatik doğrulama görevlerini yönetmek üzere Jenkins’i yapılandırdım; manuel yükü azalttım ve veri hatlarının sürekli güvenilir kalmasını sağladım.',
  },
  'experience.tatilsepeti.company': { en: 'Tatilsepeti', tr: 'Tatilsepeti' },
  'experience.tatilsepeti.role': {
    en: 'Jr. Software Developer (promoted from Intern)',
    tr: 'Jr. Software Developer (stajyerlikten terfi)',
  },
  'experience.tatilsepeti.dates': {
    en: 'July 2025 – June 2026 · Istanbul',
    tr: 'Temmuz 2025 – Haziran 2026 · İstanbul',
  },
  'experience.tatilsepeti.summary': {
    en: 'Modernized a legacy backoffice platform end to end with Next.js and Material UI in a three-person frontend team, serving ~300 employees; built dashboards handling millions of records without sacrificing performance and replaced manual reporting with real-time, API-driven data visualization.',
    tr: 'Üç kişilik bir frontend ekibinde, yaklaşık 300 çalışanın kullandığı eski bir backoffice platformunu Next.js ve Material UI ile uçtan uca modernize ettik; milyonlarca kaydı performanstan ödün vermeden işleyen panolar geliştirdim ve manuel raporlamayı gerçek zamanlı, API tabanlı veri görselleştirmeyle değiştirdim.',
  },
  'experience.tatilsepeti.highlights': {
    en: 'Collaborated in a team of three frontend developers to modernize a legacy backoffice across the full SDLC with Next.js and Material UI, improving daily workflow usability for ~300 employees.\nDeveloped dynamic dashboards for the Sales, Marketing, and SEO teams that track operational metrics across millions of records without sacrificing performance.\nExecuted seamless API integrations with Swagger to connect backend services, replacing outdated manual reporting with real-time, automated data visualization.\nMaintained strict Agile practice — sprint planning, daily stand-ups, and GitLab code reviews — for safe, continuous feature integration.\nTransitioned to a full-time Junior Software Developer role after a successful one-month internship, then authored the technical documentation standardizing the new component library.',
    tr: 'Üç kişilik bir frontend ekibinde, eski bir backoffice platformunu Next.js ve Material UI ile tüm SDLC boyunca modernize ettik; ~300 çalışanın günlük iş akışını iyileştirdik.\nSatış, Pazarlama ve SEO ekipleri için milyonlarca kayıt üzerindeki operasyonel metrikleri performanstan ödün vermeden takip eden dinamik panolar geliştirdim.\nBackend servislerini bağlamak için Swagger ile sorunsuz API entegrasyonları gerçekleştirdim; eskimiş manuel raporlamayı gerçek zamanlı, otomatik veri görselleştirmeyle değiştirdim.\nGüvenli ve sürekli özellik entegrasyonu için sprint planlama, günlük stand-up’lar ve GitLab kod incelemelerinden oluşan Agile disiplinini titizlikle sürdürdüm.\nBaşarılı geçen bir aylık stajın ardından tam zamanlı Junior Software Developer pozisyonuna geçtim ve ardından yeni bileşen kütüphanesini standartlaştıran teknik dokümantasyonu yazdım.',
  },
  'experience.visight.company': { en: 'VISIGHT Technology', tr: 'VISIGHT Technology' },
  'experience.visight.role': {
    en: 'Mobile App Development Intern',
    tr: 'Mobil Uygulama Geliştirme Stajyeri',
  },
  'experience.visight.dates': {
    en: 'December 2024 – April 2025 · Istanbul',
    tr: 'Aralık 2024 – Nisan 2025 · İstanbul',
  },
  'experience.visight.summary': {
    en: 'Led end-to-end development of a greenfield React Native app: owned the architecture and delivered the MVP within a strict four-month timeline, using Redux Toolkit for centralized state management and Firebase for authentication and real-time data.',
    tr: "Sıfırdan bir React Native uygulamasının uçtan uca geliştirilmesine liderlik ettim: Mimariyi üstlenip MVP'yi dört aylık sıkı bir takvimde teslim ettim; merkezi state yönetimi için Redux Toolkit, kimlik doğrulama ve gerçek zamanlı veri için Firebase kullandım.",
  },
  'experience.visight.highlights': {
    en: 'Led the end-to-end mobile development of a greenfield React Native app, taking full ownership of the architecture and delivering the MVP within a strict four-month timeline.\nImplemented Object-Oriented Programming principles and centralized state management with Redux Toolkit to build modular, scalable UI components.\nIntegrated asynchronous programming patterns with Firebase for robust authentication and real-time database interactions.',
    tr: 'Sıfırdan bir React Native uygulamasının uçtan uca mobil geliştirmesine liderlik ettim; mimarinin tüm sorumluluğunu üstlenip MVP’yi dört aylık sıkı bir takvimde teslim ettim.\nModüler ve ölçeklenebilir arayüz bileşenleri kurmak için Nesne Yönelimli Programlama prensiplerini ve Redux Toolkit ile merkezi state yönetimini uyguladım.\nGüçlü kimlik doğrulama ve gerçek zamanlı veritabanı etkileşimleri için Firebase’i asenkron programlama kalıplarıyla entegre ettim.',
  },

  // --- Education ---
  'about.education.school': {
    en: 'Istanbul Technical University',
    tr: 'İstanbul Teknik Üniversitesi',
  },
  'about.education.degree': {
    en: 'B.Sc. Electronics and Communication Engineering',
    tr: 'Elektronik ve Haberleşme Mühendisliği (Lisans)',
  },
  'about.education.dates': { en: '2022 – Present · GPA 3.10', tr: '2022 – Halen · GNO 3.10' },
  'about.education.summary': {
    en: 'Relevant coursework: Frontend Development, Backend Development, Data Analysis, Data Structures & Algorithms, Machine Learning, Artificial Neural Networks.',
    tr: 'İlgili dersler: Frontend Geliştirme, Backend Geliştirme, Veri Analizi, Veri Yapıları ve Algoritmalar, Makine Öğrenmesi, Yapay Sinir Ağları.',
  },

  // --- Certificates ---
  'about.cert.meta.title': {
    en: 'Create the User Interface with SwiftUI',
    tr: 'Create the User Interface with SwiftUI',
  },
  'about.cert.meta.issuer': { en: 'META · 2025', tr: 'META · 2025' },
  'about.cert.meta.detail': {
    en: 'Completed META’s course on the SwiftUI essentials, then put it to work building Pokerist.',
    tr: 'META’nın SwiftUI temellerini anlatan kursunu tamamladım ve öğrendiklerimi Pokerist’i geliştirirken uyguladım.',
  },
  'about.cert.csbridge.title': {
    en: 'CS-Bridge: Introduction to Computer Science',
    tr: 'CS-Bridge: Bilgisayar Bilimine Giriş',
  },
  'about.cert.csbridge.issuer': {
    en: 'Stanford University, with Koç University & Czech Technical University · 2020',
    tr: 'Stanford Üniversitesi, Koç Üniversitesi ve Çek Teknik Üniversitesi iş birliğiyle · 2020',
  },
  'about.cert.csbridge.detail': {
    en: 'Summer program modelled on Stanford’s Programming Methodologies course.',
    tr: 'Stanford’un Programlama Metodolojileri dersi örnek alınarak hazırlanan yaz programı.',
  },

  // --- Leadership ---
  'about.leadership.role': {
    en: 'Board Member & Committee Coordinator',
    tr: 'Yönetim Kurulu Üyesi ve Komite Koordinatörü',
  },
  'about.leadership.org': { en: 'ITU Alumni Association Club', tr: 'İTÜ Mezunlar Derneği Kulübü' },
  'about.leadership.dates': {
    en: 'Sep 2024 – Jun 2025 · Istanbul',
    tr: 'Eylül 2024 – Haziran 2025 · İstanbul',
  },
  'about.leadership.text': {
    en: 'Organized 10+ corporate visits per semester to companies like Turkish Technic and İş Bankası, giving 250+ students access to career insights, and built long-term partnerships with company representatives and alumni.',
    tr: "Her dönem Turkish Technic ve İş Bankası gibi şirketlere 10'dan fazla kurumsal ziyaret düzenleyerek 250'den fazla öğrencinin kariyer içgörülerine erişmesini sağladım; şirket temsilcileri ve mezunlarla uzun vadeli iş birlikleri kurdum.",
  },

  // --- Goals / Looking Ahead ---
  'about.goals_title': { en: 'Where I’m Headed', tr: 'Nereye Gidiyorum' },
  'about.goals_lead': {
    en: 'Every role I’ve had taught me something different about how software actually gets built. VISIGHT showed me what owning a product from an empty repository feels like. Tatilsepeti showed me what it takes to keep a product healthy while hundreds of people rely on it every day. İş Bankası showed me what rigor looks like at enterprise scale — pipelines that cannot quietly lose a row. Where I am now puts all of it together: a small team, real responsibility, and data at the center.',
    tr: 'Bugüne kadarki her işim bana yazılımın gerçekte nasıl geliştirildiğine dair farklı bir şey öğretti. VISIGHT bana bir ürünü boş bir repodan itibaren sahiplenmenin nasıl bir his olduğunu gösterdi. Tatilsepeti, yüzlerce insan her gün ona güvenirken bir ürünü sağlıklı tutmanın ne gerektirdiğini gösterdi. İş Bankası ise kurumsal ölçekte disiplinin ne demek olduğunu — sessizce tek bir satırı bile kaybedemeyecek veri hatlarını — gösterdi. Şu an bulunduğum yer hepsini bir araya getiriyor: küçük bir ekip, gerçek sorumluluk ve merkezde veri.',
  },
  'about.goals.startup.title': {
    en: 'Why a small team',
    tr: 'Neden küçük bir ekip',
  },
  'about.goals.startup.text': {
    en: 'Small teams are where I do my best work. I like being close enough to the product to watch a decision land — writing the pipeline in the morning, the query and the API on top of it in the afternoon, and hearing from a real user by the end of the week. Owning a whole slice of the system is simply the normal way to work there.',
    tr: 'En iyi işimi küçük ekiplerde çıkarıyorum. Ürüne, aldığım bir kararın sonucunu görebilecek kadar yakın olmayı seviyorum — sabah veri hattını, öğleden sonra onun üzerindeki sorguyu ve API’yi yazmak, hafta bitmeden de gerçek bir kullanıcıdan geri dönüş almak. Orada sistemin bütün bir parçasını sahiplenmek işin olağan hali.',
  },
  'about.goals.build.title': { en: 'What I want to build', tr: 'Ne inşa etmek istiyorum' },
  'about.goals.build.text': {
    en: 'Systems people can trust. My favourite work so far has been the unglamorous kind that quietly removes friction — validation that catches missing data before anyone has to file a ticket, dashboards that replaced a manual reporting ritual, a pipeline that runs every day without anyone thinking about it. I want to keep building that layer, with the same care in the data underneath as in the interface on top.',
    tr: 'İnsanların güvenebileceği sistemler. Şimdiye kadarki en sevdiğim işler, gösterişsiz biçimde sürtünmeyi ortadan kaldıranlar oldu — kimse talep açmadan eksik veriyi yakalayan doğrulamalar, manuel bir raporlama ritüelinin yerini alan panolar, kimse düşünmeden her gün çalışan bir veri hattı. Bu katmanı inşa etmeye devam etmek istiyorum; alttaki veriye de üstteki arayüze gösterdiğim özenin aynısını göstererek.',
  },
  'about.goals.growth.title': {
    en: 'Where I want to go',
    tr: 'Nereye varmak istiyorum',
  },
  'about.goals.growth.text': {
    en: 'I want to grow from FDE intern into a full Forward Deployed Engineer: someone who works directly with customers, understands their data and the problem behind it, and builds the pipeline, the database and the application that solve it. That means getting sharper at data architecture, cloud infrastructure and system design, and learning to own outcomes rather than tickets. I’ll finish my degree at ITU along the way — I’ve worked through two years of study already and intend to keep both moving.',
    tr: 'FDE stajyerliğinden tam bir Forward Deployed Engineer olmaya doğru büyümek istiyorum: doğrudan müşterilerle çalışan, verilerini ve arkasındaki sorunu anlayan, o sorunu çözen veri hattını, veritabanını ve uygulamayı kuran biri. Bu da veri mimarisi, bulut altyapısı ve sistem tasarımında keskinleşmek, işleri değil sonuçları sahiplenmeyi öğrenmek demek. Bu arada İTÜ’deki eğitimimi de tamamlayacağım — iki yıldır okurken çalışıyorum ve ikisini birlikte yürütmeye devam etmek niyetindeyim.',
  },
  'about.goals.cta': {
    en: 'If you’re working on a data-heavy product and need someone who can move from the pipeline to the screen, I’d genuinely love to hear about it.',
    tr: 'Veri ağırlıklı bir ürün üzerinde çalışıyorsanız ve veri hattından ekrana kadar hareket edebilecek birine ihtiyacınız varsa, duymayı gerçekten çok isterim.',
  },
  'about.goals.get_in_touch': { en: 'Get in touch', tr: 'İletişime geç' },

  // --- Skill Group Labels ---
  'skills.languages': { en: 'Languages', tr: 'Diller' },
  'skills.backend': {
    en: 'Backend',
    tr: 'Backend',
  },
  'skills.data': {
    en: 'Databases',
    tr: 'Veritabanları',
  },
  'skills.pipelines': {
    en: 'Pipelines & Scraping',
    tr: 'Veri Hatları ve Scraping',
  },
  'skills.cloud': {
    en: 'Cloud & DevOps',
    tr: 'Bulut ve DevOps',
  },
  'skills.web': {
    en: 'Web & Mobile',
    tr: 'Web ve Mobil',
  },
  'skills.ai_ml': { en: 'AI / ML', tr: 'Yapay Zeka / ML' },
  'skills.tools': { en: 'Tools & Practices', tr: 'Araçlar ve Pratikler' },

  'aside.more_details': {
    en: 'More details',
    tr: 'Daha fazla detay',
  },

  'aside.less_details': {
    en: 'Less details',
    tr: 'Daha az detay',
  },

  // --- Project: Projects Page ---
  'projects.title': {
    en: 'Projects',
    tr: 'Projeler',
  },
  'projects.description': {
    en: 'Projects I built on my own time, from early algorithm work to systems that stream, store and analyse live data. The newer ones lean toward backends and data: ingestion, validation, databases and the dashboards on top. In each one I try to apply what I’ve learned in professional teams — clear architecture, honest measurements and documentation someone else can follow.',
    tr: 'Kendi zamanımda geliştirdiğim projeler: ilk algoritma çalışmalarımdan canlı veriyi akış halinde alan, saklayan ve analiz eden sistemlere kadar. Yeni olanlar backend ve veriye ağırlık veriyor: veri toplama, doğrulama, veritabanları ve üzerlerindeki panolar. Her birinde profesyonel ekiplerde öğrendiklerimi uygulamaya çalışıyorum — net bir mimari, dürüst ölçümler ve başkasının takip edebileceği dokümantasyon.',
  },
  'projects.details': {
    en: 'Details',
    tr: 'Detaylar',
  },
  // --- Projects Page Meta ---
  'projects.page_title': { en: 'Projects – Kerem Kırıcı', tr: 'Projeler – Kerem Kırıcı' },
  'projects.page_description': {
    en: 'Selected work, case studies, and experiments.',
    tr: 'Seçilmiş çalışmalar, vaka incelemeleri ve deneyler.',
  },
  'projects.explore_more': {
    en: 'Explore more',
    tr: 'Daha fazla keşfet',
  },
  'projects.view_highlighted_case': {
    en: 'View highlighted case',
    tr: 'Öne çıkan örneği görüntüle',
  },
  'projects.github_profile': {
    en: 'GitHub profile',
    tr: 'GitHub profili',
  },
  'projects.what_to_expect': {
    en: 'What to expect',
    tr: 'Neler bulacaksınız',
  },
  'projects.what_to_expect_description': {
    en: 'What each project does, how it is built, the technologies and algorithms behind it, and measured results where there are any, with diagrams and screenshots.',
    tr: 'Her projenin ne yaptığı, nasıl kurulduğu, arkasındaki teknolojiler ve algoritmalar, varsa ölçülmüş sonuçlar; diyagramlar ve ekran görüntüleriyle birlikte.',
  },
  'projects.project_types': {
    en: 'Project types',
    tr: 'Proje türleri',
  },
  'projects.type.backend_data': {
    en: 'Backend & Data',
    tr: 'Backend ve Veri',
  },
  'projects.type.full_stack': {
    en: 'Full-Stack',
    tr: 'Full-Stack',
  },
  'projects.type.web_scraping': {
    en: 'Web Scraping',
    tr: 'Web Scraping',
  },
  'projects.type.ai_algorithms': { en: 'AI & Algorithms', tr: 'Yapay Zeka ve Algoritmalar' },
  'projects.type.mobile': {
    en: 'Mobile',
    tr: 'Mobil',
  },
  'projects.collaboration': {
    en: 'Collaboration',
    tr: 'İşbirliği',
  },
  'projects.collaboration_description': {
    en: 'Available for product collaborations that value thoughtful design, measurable outcomes, and technical rigor.',
    tr: 'Düşünceli tasarım, ölçülebilir sonuçlar ve teknik zorluk değerlendiren ürün işbirliği için mevcut.',
  },
  'projects.back_to_projects': {
    en: 'Back to projects',
    tr: 'Projelere dön',
  },
  'projects.project_snapshot': {
    en: 'Project snapshot',
    tr: 'Proje özeti',
  },
  'projects.tech_stack': {
    en: 'Tech stack',
    tr: 'Teknolojiler',
  },
  'projects.repository': {
    en: 'Repository',
    tr: 'Repository',
  },
  'projects.view_on_github': {
    en: 'View on GitHub',
    tr: "GitHub'da görüntüle",
  },
  'projects.in_progress': {
    en: 'In progress',
    tr: 'Devam ediyor',
  },
  'projects.private_repo': {
    en: 'The repository is private for now. Happy to walk you through the code — just get in touch.',
    tr: 'Repository şimdilik gizli. Kodu birlikte incelemekten memnuniyet duyarım; iletişime geçmeniz yeterli.',
  },
  'projects.share': {
    en: 'Share',
    tr: 'Paylaş',
  },
  'projects.copy_link_to_share_description': {
    en: 'Copy the link below to share this project.',
    tr: 'Bu proje paylaşmak için aşağıdaki bağlantıyı kopyalayın.',
  },
  'projects.gallery': {
    en: 'Gallery',
    tr: 'Galeri',
  },
  'projects.gallery_image_alt': {
    en: '{title} screenshot {index} {orientation}',
    tr: '{title} ekran görüntüsü {index} {orientation}',
  },
  'orientation.portrait': { en: 'portrait', tr: 'dikey' },
  'orientation.landscape': { en: 'landscape', tr: 'yatay' },
  'projects.pulsewindow.title': {
    en: 'PulseWindow',
    tr: 'PulseWindow',
  },
  'projects.pulsewindow.description': {
    en: 'A self-hosted service that streams live order books from crypto exchanges, finds price gaps that are still profitable after real fees, and paper-trades them on a live dashboard.',
    tr: 'Kripto borsalarından canlı emir defterlerini akış halinde alan, gerçek komisyonlardan sonra da kârlı kalan fiyat farklarını bulan ve bunlarla canlı bir panoda kâğıt üzerinde işlem yapan, kendi sunucunuzda çalışan bir servis.',
  },
  'projects.pulsewindow.long_explanation': {
    en: "PulseWindow watches the coins you follow on BtcTurk, Binance and OKX TR, finds price gaps between them that survive each market's real maker/taker fees, and paper-trades them from the holdings and limits you enter. It uses public market data only: no API keys and no real orders. I'm still building it.\n\nOne .NET 10 host runs five background services — Ingestion, Detection, Simulator, Persistence and Api — that never call each other directly. They talk only through Redis pub/sub and shared records, and project references enforce that boundary. Redis holds live state; PostgreSQL holds history, fee schedules and everything the admin panel edits. Ingestion streams best bid/ask and order books over each exchange's WebSocket API, with reconnects, backoff, REST snapshots and an idle watchdog. Markets are data: a JSON spec run by one engine, so a new exchange can be added and tested from the admin panel without a release.\n\nDetection computes the net spread for every ordered pair of markets after fees, sized by walking the order books, and only opens an opportunity when both sides are fresh and the gap holds. The Simulator then fills it after a simulated latency against the books as they are by then, and measures the result against doing nothing. A Next.js dashboard (English and Turkish) shows prices, spreads, opportunities and feed health over Server-Sent Events, and the host exports Prometheus metrics for Grafana. Everything runs with Docker Compose, with CI on GitHub Actions.\n\nThe first measured run was a useful result: over one hour on BTC-USDT and ETH-USDT between BtcTurk and Binance, there were zero opportunities above 3 bps after fees. The median net spread was about −20 bps. Across roughly 650,000 evaluations, 99.97% finished in under 50 ms, with a mean of 1.1 ms. Most gaps that look like opportunities aren't, and the system is built to show that honestly.",
    tr: "PulseWindow, BtcTurk, Binance ve OKX TR'de takip ettiğiniz coinleri izler; aralarındaki fiyat farklarından her piyasanın gerçek maker/taker komisyonlarından sonra da kârlı kalanları bulur ve girdiğiniz bakiye ve limitlerle bunlar üzerinde kâğıt üzerinde işlem yapar. Yalnızca herkese açık piyasa verisini kullanır: API anahtarı yok, gerçek emir yok. Geliştirmeye devam ediyorum.\n\nTek bir .NET 10 host'u beş arka plan servisini çalıştırır — Ingestion, Detection, Simulator, Persistence ve Api — ve bu servisler birbirini doğrudan çağırmaz. Yalnızca Redis pub/sub ve ortak kayıtlar üzerinden konuşurlar; bu sınırı proje referansları zorunlu kılar. Canlı durum Redis'te; geçmiş, komisyon tabloları ve admin panelinden düzenlenen her şey PostgreSQL'de tutulur. Ingestion servisi her borsanın WebSocket API'si üzerinden en iyi alış/satış fiyatlarını ve emir defterlerini akış halinde alır; yeniden bağlanma, backoff, REST anlık görüntüleri ve boşta kalma bekçisiyle. Piyasalar birer veridir: tek bir motorun çalıştırdığı bir JSON tanımı. Böylece yeni bir borsa, yeni bir sürüm çıkarmadan admin panelinden eklenip test edilebilir.\n\nDetection servisi, her piyasa çifti için komisyonlardan sonraki net farkı emir defterlerini dolaşarak hesaplar ve yalnızca iki taraf da güncelken ve fark bir süre korunduğunda bir fırsat açar. Simulator, fırsatı simüle edilmiş bir gecikmeden sonra o anki emir defterlerine karşı doldurur ve sonucu hiçbir şey yapmamakla karşılaştırır. Bir Next.js panosu (Türkçe ve İngilizce) fiyatları, farkları, fırsatları ve veri akışlarının sağlığını Server-Sent Events ile gösterir; host ise Grafana için Prometheus metrikleri sunar. Her şey Docker Compose ile çalışır; CI GitHub Actions üzerindedir.\n\nİlk ölçülmüş çalıştırma faydalı bir sonuç verdi: BtcTurk ile Binance arasında BTC-USDT ve ETH-USDT üzerinde bir saat boyunca, komisyonlardan sonra 3 bps'nin üzerinde hiç fırsat çıkmadı. Medyan net fark yaklaşık −20 bps'ydi. Yaklaşık 650.000 değerlendirmenin %99,97'si 50 ms'nin altında tamamlandı; ortalama 1,1 ms. Fırsat gibi görünen farkların çoğu aslında fırsat değil ve sistem bunu dürüstçe göstermek için tasarlandı.",
  },
  'projects.pulsewindow.tags': {
    en: '.NET, PostgreSQL, Redis, Next.js, Docker, WebSockets, Prometheus',
    tr: '.NET, PostgreSQL, Redis, Next.js, Docker, WebSockets, Prometheus',
  },
  // --- Project: Sudoku React Native ---
  'projects.sudokumobileapp.title': {
    en: 'Sudoku - React Native App',
    tr: 'Sudoku - React Native Uygulaması',
  },
  'projects.sudokumobileapp.description': {
    en: 'A cross-platform Sudoku game built with React Native, featuring multiple difficulties, stats, and a dark theme.',
    tr: 'React Native ile yazılmış, çoklu zorluk, istatistikler ve karanlık tema sunan platformlar arası bir Sudoku oyunu.',
  },
  'projects.sudokumobileapp.long_explanation': {
    en: 'A high-performance, cross-platform Sudoku application built with React Native, TypeScript, and Expo, designed around a modern user experience. It provides a full-featured game with multiple difficulty levels (Easy to Expert), intelligent note-taking, real-time auto-validation, and a complete undo/redo system, wrapped in a dark theme with gradients, Reanimated animations, and haptic feedback. Under the hood it leans on memoization and carefully scoped state management for a smooth, lag-free 60fps UI, an offline-first data layer built on local storage so the app stays fully functional in low-connectivity environments, and a centralized theming system using React Context that makes design and accessibility updates scale. The difficulty algorithm was refined against beta feedback from 20+ users, which directly improved session retention.',
    tr: "React Native, TypeScript ve Expo ile modern bir kullanıcı deneyimi etrafında tasarlanmış, yüksek performanslı, platformlar arası bir Sudoku uygulaması. Çoklu zorluk seviyeleri (Kolay'dan Uzman'a), akıllı not alma, gerçek zamanlı otomatik doğrulama ve tam bir geri alma/yineleme sistemiyle eksiksiz bir oyun sunar; gradyanlı karanlık tema, Reanimated animasyonları ve dokunsal geri bildirimle sarmalanmıştır. Kapağın altında, akıcı ve takılmasız 60fps arayüz için memoization ve özenle sınırlandırılmış state yönetimi; düşük bağlantılı ortamlarda uygulamanın tam işlevsel kalmasını sağlayan, yerel depolama üzerine kurulu çevrimdışı öncelikli bir veri katmanı; ve tasarım ile erişilebilirlik güncellemelerini ölçeklenebilir kılan, React Context tabanlı merkezi bir tema sistemi bulunur. Zorluk algoritması 20'den fazla kullanıcının beta geri bildirimiyle iyileştirildi ve bu doğrudan oturum sürekliliğini artırdı.",
  },
  'projects.sudokumobileapp.tags': {
    en: 'React Native, Expo, TypeScript',
    tr: 'React Native, Expo, TypeScript',
  },

  // --- Project: Pokerist ---
  'projects.pokerist.title': {
    en: 'Pokerist',
    tr: 'Pokerist',
  },
  'projects.pokerist.description': {
    en: "An iOS Texas Hold'em analyzer that calculates win probabilities against 6 opponents using a Monte Carlo simulation.",
    tr: "6 rakibe karşı kazanma olasılıklarını Monte Carlo simülasyonu ile hesaplayan bir iOS Texas Hold'em analiz aracı.",
  },
  'projects.pokerist.long_explanation': {
    en: "A native iOS hand analyzer for Texas Hold'em players, built with SwiftUI and Combine on a clean MVVM architecture and taken from idea to a production-ready app in a three-month timeline. It calculates win probabilities by running an asynchronous Monte Carlo simulation of 10,000 games per hand against up to 6 opponents, so the main UI thread never blocks. Core features include an advanced 'Smart Possible Hands' calculator that details distinct draw scenarios, smart card selection that prevents duplicates, and a Liquid Glass UI with adaptive light and dark modes. The architecture leans on modern SwiftUI patterns — @Observable state management, Task-based concurrency for background calculation, and smart caching — and I authored detailed technical documentation for the simulation algorithms to ease future maintenance and explain the logic to non-technical readers.",
    tr: "Texas Hold'em oyuncuları için SwiftUI ve Combine ile temiz bir MVVM mimarisi üzerine kurulmuş, fikirden yayına hazır bir uygulamaya üç aylık bir takvimde taşıdığım native bir iOS el analiz aracı. 6 rakibe kadar, el başına 10.000 oyunluk asenkron bir Monte Carlo simülasyonu çalıştırarak kazanma olasılıklarını hesaplar; ana arayüz thread'i hiçbir zaman bloklanmaz. Temel özellikleri arasında farklı çekiliş senaryolarını detaylandıran gelişmiş bir 'Akıllı Olası Eller' hesaplayıcısı, kopyaları önleyen akıllı kart seçimi ve açık/koyu moda uyum sağlayan Liquid Glass arayüz bulunur. Mimari modern SwiftUI kalıplarına dayanır — @Observable ile durum yönetimi, arka plan hesaplamaları için Task tabanlı eşzamanlılık ve akıllı önbellekleme. Ayrıca simülasyon algoritmaları için, ileride bakımı kolaylaştıran ve mantığı teknik olmayan okuyuculara da anlatan detaylı teknik dokümantasyon yazdım.",
  },
  'projects.pokerist.tags': {
    en: 'iOS, SwiftUI, Combine, MVVM',
    tr: 'iOS, SwiftUI, Combine, MVVM',
  },

  // --- Project: 2048 Playing Algorithm ---
  'projects.2048-playing-algorithm.title': {
    en: '2048 Playing AI Algorithm',
    tr: '2048 Yapay Zeka Algoritması',
  },
  'projects.2048-playing-algorithm.description': {
    en: 'A C++ console app with a 2048 AI algorithm that achieves a 94% win rate using a tree-search method.',
    tr: 'Ağaç arama metoduyla %94 kazanma oranına ulaşan bir 2048 yapay zeka algoritması içeren C++ konsol uygulaması.',
  },
  'projects.2048-playing-algorithm.long_explanation': {
    en: "A C++ console application that allows a user to either play the game 2048 or deploy an AI to play it for them. The AI is a multi-level tree-search algorithm based on 'Decision Levels' (player moves) and 'Probability Levels' (random tile spawns). It analyzes future states by calculating a 'chance of death' and 'point of gain' for each possible move, effectively choosing the path with the lowest risk and highest reward. Based on simulations (100 games, 3-layer depth), this algorithm achieves the '2048' tile 94% of the time and the '4096' tile 38% of the time.",
    tr: "Kullanıcının 2048 oynamasına veya oyunu oynaması için bir yapay zeka algoritmasını çalıştırmasına izin veren bir C++ konsol uygulaması. Yapay zeka, 'Karar Seviyeleri' (oyuncu hamleleri) ve 'Olasılık Seviyeleri' (rastgele taş çıkması) üzerine kurulu çok seviyeli bir ağaç arama algoritmasıdır. Her olası hamle için bir 'ölüm şansı' ve 'kazanç puanı' hesaplayarak gelekteki durumları analiz eder, etkili bir şekilde en düşük riskli ve en yüksek ödüllü yolu seçer. Simülasyonlara (100 oyun, 3 katman derinlik) dayanarak, bu algoritma %94 oranında '2048' taşına ve %38 oranında '4096' taşına ulaşmaktadır.",
  },
  'projects.2048-playing-algorithm.tags': {
    en: 'C++, AI, Minimax Algorithm',
    tr: 'C++, AI, Minimax Algoritması',
  },
  'projects.arbitrage-alerts.title': {
    en: 'Arbitrage Alerts',
    tr: 'Arbitraj Uyarıları',
  },
  'projects.arbitrage-alerts.description': {
    en: 'A Python desktop app that scrapes USDT/TRY prices from two crypto exchanges with Selenium and gives a spoken alert when the gap crosses limits you set.',
    tr: 'İki kripto borsasından Selenium ile USDT/TRY fiyatlarını toplayan ve fark belirlediğiniz sınırları aştığında sesli uyarı veren bir Python masaüstü uygulaması.',
  },
  'projects.arbitrage-alerts.long_explanation': {
    en: 'My first data-collection project, and the idea PulseWindow later grew out of. Arbitrage Alerts compares USDT/TRY prices between the markets you choose (TR Binance and BtcTurk, plus the USD/TRY rate from TradingView) and plays a spoken alert when the difference crosses one of the limits you set.\n\nThe exchanges offered no simple feed for what I needed, so the app scrapes their trading pages. A single headless Chrome driven by Selenium keeps one window per market and switches between them, and BeautifulSoup parses each page for the bid, ask and last price. Each market is a small subclass that only defines how to find its prices, so adding one means writing three selectors. If any one price fails to refresh, none of them update, so you never compare prices taken at different moments.\n\nA Tkinter interface shows the live prices and the settings (markets, alert limits, alert interval), which are saved to a JSON file, and gTTS turns the alert into speech. I published it unfinished in 2021: scraping and the UI share one thread, so the window can freeze while the driver loads. That is exactly the problem PulseWindow solves with streaming APIs and separate services.',
    tr: "İlk veri toplama projem ve PulseWindow'un daha sonra içinden çıktığı fikir. Arbitraj Uyarıları, seçtiğiniz piyasalar (TR Binance ve BtcTurk, ayrıca TradingView'dan USD/TRY kuru) arasındaki USDT/TRY fiyatlarını karşılaştırır ve fark belirlediğiniz sınırlardan birini aştığında sesli bir uyarı çalar.\n\nBorsalar ihtiyacım olan veri için basit bir akış sunmuyordu; bu yüzden uygulama işlem sayfalarını scrape eder. Selenium ile yönetilen tek bir headless Chrome, her piyasa için bir pencere açık tutar ve bunlar arasında geçiş yapar; BeautifulSoup da her sayfadan alış, satış ve son fiyatı ayrıştırır. Her piyasa, yalnızca fiyatlarını nasıl bulacağını tanımlayan küçük bir alt sınıftır; yeni bir piyasa eklemek üç seçici yazmak demektir. Fiyatlardan biri bile yenilenemezse hiçbiri güncellenmez; böylece farklı anlarda alınmış fiyatları asla karşılaştırmazsınız.\n\nTkinter arayüzü canlı fiyatları ve bir JSON dosyasına kaydedilen ayarları (piyasalar, uyarı sınırları, uyarı aralığı) gösterir; gTTS de uyarıyı sese çevirir. 2021'de bitmemiş haliyle yayınladım: scraping ve arayüz aynı thread'i paylaştığı için sürücü yüklenirken pencere donabiliyor. PulseWindow'un akış API'leri ve ayrı servislerle çözdüğü sorun tam olarak bu.",
  },
  'projects.arbitrage-alerts.tags': {
    en: 'Python, Selenium, BeautifulSoup, Web Scraping, Tkinter',
    tr: 'Python, Selenium, BeautifulSoup, Web Scraping, Tkinter',
  },

  // --- Project: SudokuGenerator ---
  'projects.sudokugenerator.title': {
    en: 'Sudoku Generator',
    tr: 'Sudoku Üretici',
  },
  'projects.sudokugenerator.description': {
    en: 'A C++ and Python project that generates, solves, and visualizes Sudoku puzzles using backtracking algorithms.',
    tr: 'Backtracking algoritmalarını kullanan, C++ ve Python ile yazılmış bir Sudoku üretme, çözme ve görselleştirme projesi.',
  },
  'projects.sudokugenerator.long_explanation': {
    en: 'A project containing a complete suite of Sudoku tools, implemented in both C++ and Python (3.7). The core logic for all features relies on efficient backtracking and recursive algorithms. It can generate new, unique Sudoku puzzles, solve any given puzzle, and check if a puzzle has a single unique solution. The C++ version is optimized for speed, generating puzzles in seconds, while the Python version provides a simple command-line UI for interaction and can visualize the puzzle-solving process as a .jpg image.',
    tr: 'Hem C++ hem de Python (3.7) ile uygulanmış eksiksiz bir Sudoku araçları paketi içeren bir proje. Tüm özelliklerin temel mantığı, verimli backtracking (geri izleme) ve özyinelemeli algoritmalara dayanır. Yeni, benzersiz Sudoku bulmacaları üretebilir, verilen herhangi bir bulmacayı çözebilir ve bir bulmacanın tek bir benzersiz çözümü olup olmadığını kontrol edebilir. C++ sürümü hız için optimize edilmiştir ve saniyeler içinde bulmacalar üretir; Python sürümü ise etkileşim için basit bir komut satırı arayüzü sunar ve bulmaca çözme sürecini bir .jpg dosyası olarak görselleştirebilir.',
  },
  'projects.sudokugenerator.tags': {
    en: 'C++, Python, Backtracking',
    tr: 'C++, Python, Backtracking',
  },
};

export type TextKey = keyof typeof TEXT_DICTIONARY;
export type TextParams = Record<string, string>;

export default TEXT_DICTIONARY;
