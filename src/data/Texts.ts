const TEXT_DICTIONARY = {
  'nav.home': { en: 'Home', tr: 'Ana Sayfa' },
  'nav.projects': { en: 'Projects', tr: 'Projeler' },
  'nav.about': { en: 'About', tr: 'Hakkımda' },
  'nav.contact': { en: 'Contact', tr: 'İletişim' },
  'nav.github': { en: 'GitHub', tr: 'GitHub' },
  'hero.title': {
    en: 'Hey there! Welcome to my page.',
    tr: 'Merhaba! Portfolyoma Hoşgeldiniz.',
  },
  'hero.subtitle': {
    en: 'A Developer, Student, and Future iOS Pro',
    tr: 'Yazılım Tutkunu, Öğrenci, ve Bir Gelecek iOS Geliştirici',
  },
  'hero.cta': { en: 'Get in touch', tr: 'İletişime geç' },
  'hero.github': { en: 'GitHub', tr: 'GitHub' },
  'home.featured': { en: 'Featured projects', tr: 'Öne çıkan projeler' },
  'footer.copyright': {
    en: '© {year} Kerem Kırıcı. All rights reserved.',
    tr: '© {year} Kerem Kırıcı. Tüm hakları saklıdır.',
  },
  'hero.description': {
    en: "Hey, I\'m Kerem! I\'m a 3rd-year engineering student at ITU who also works as a Junior Software Developer at Tatilsepeti. It\'s a unique position where I get to build real-world features for large-scale React apps. I love building things that people find genuinely useful - a perspective that was really shaped by my long-term work experience in the U.S. While I enjoy my work in React, my true passion is mastering native iOS development with Swift and SwiftUI.",
    tr: "Hey, ben Kerem! ITU\'da 3. sınıf bir mühendisim ve Tatilsepeti\'de bir Junior Software Developer\'ım. Bu benim için benzersiz bir pozisyondur. Büyük ölçekli React uygulamaları için gerçek dünya özellikleri inşa ediyorum. Gerçekten yararlı bulunan şeyler inşa etmeyi seviyorum - bu deneyim beni ABD\'de uzun vadede çalışmam şeklinde şekillendirdi. React\'te çalışmak beni seviyorum, ancak gerçek ilgim iOS geliştirmeye Swift ve SwiftUI ile uzmanlaşmaktır.",
  },
};

export type TextKey = keyof typeof TEXT_DICTIONARY;
export type TextParams = Record<string, string>;

export default TEXT_DICTIONARY;
