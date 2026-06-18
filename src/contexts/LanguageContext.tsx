import { StickyHeader } from '@/components/StickyHeader.js';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'uk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'uk';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const translations = language === 'uk' ? ukrainianTranslations : englishTranslations;
    return getNestedTranslation(translations, key) || key;
  };

  const getNestedTranslation = (obj: any, key: string): string => {
    const keys = key.split('.');
    let result = obj;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Return the original key if path doesn't exist
      }
    }
    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const ukrainianTranslations = {
  header: {
    title: "SICRS",
    subtitle: "Society for industrial recovery\n& community resilience studies",
    topNav: {
      news: "Новини",
      partnership: "Партнери",
      contacts: "Контакти",
      experts: "Експерти",
      about: "Про нас"
    },
    bottomNav: {
      researchTopics: "Теми",
      publications: "Публікації",
      datasets: "Датасети",
      podcasts: "Подкасти",
      events: "Події",
      experts: "Експерти"
    },
    nav: {
      menu: "Меню",
      home: "Головна",
      experts: "Експерти",
      publications: "Публікації",
      datasets: "Набори даних",
      events: "Події",
      contacts: "Контакти"
    },
    bottomText1: {
      home: "Наукове товариство з досліджень відновлення\nпромисловості та резильєнтності територіальних громад",
      partnership: "Партнерство",
      contacts: "Наші контакти",
      about: "Про наш центр",
      researchTopics: "Теми досліджень",
      publications: "Публікації",
      podcasts: "Подкасти",
      datasets: "Набори даних",
      events: "Події та конференції",
      experts: "Наші експерти",
      expertDetail: "",
    },
    bottomText2: {

      home: "«Від даних і аналітики - до практичних рішень для громад, економіки та майбутнього»",
      partnership: "Разом ми будуємо майбутнє технологій",
      contacts: "Зв'яжіться з нами для співпраці, консультацій\n та партнерських ініціатив",
      researchTopics: "Знаходьте наші дописи за темами",
      publications: "Знайомтеся із результатами нашої роботи",
      datasets: "Користуйтеся нашими відкритими даними",
      podcasts: "Слухайте наші подкасти з запрошеними гостями",
      events: "Долучайтеся до наших заходів",
      experts: "Провідні вчені та дослідники, які формують\n майбутнє штучного інтелекту в Україні"
    }
  },
  stickyHeader: {
    title: "SICRS",
  },
  search: {
    placeholder: "Шукаю...",
    close: "Закрити",
    results: "Результати пошуку",
    noResults: "Нема результатів"
  },
  cookieBanner: {
    title: "Використання файлів cookie",
    description: "Ми використовуємо файли cookie для покращення вашого досвіду на нашому сайті, аналізу трафіку та персоналізації контенту. Ваша конфіденційність важлива для нас.",
    acceptAll: "Прийняти всі",
    customize: "Налаштувати",
    necessaryOnly: "Тільки необхідні",
    settingsTitle: "Налаштування файлів cookie",
    settingsDescription: "Оберіть, які типи файлів cookie ви хочете дозволити. Це допоможе нам покращити ваш досвід використання сайту.",
    necessary: {
      title: "Необхідні файли cookie",
      description: "Ці файли cookie необхідні для базового функціонування сайту і не можуть бути вимкнені.",
    },
    analytics: {
      title: "Аналітичні файли cookie",
      description: "Допомагають нам зрозуміти, як відвідувачі взаємодіють з сайтом, збираючи анонімну інформацію.",
    },
    marketing: {
      title: "Маркетингові файли cookie",
      description: "Використовуються для відстеження відвідувачів на веб-сайтах для показу релевантної реклами.",
    },
    preferences: {
      title: "Файли cookie для персоналізації",
      description: "Зберігають ваші уподобання та налаштування для покращення вашого досвіду.",
    },
    saveSettings: "Зберегти налаштування",
    cancel: "Скасувати",
  },
  footer: {
    title: "SICRS",
    subtitle: "Society for industrial recovery\n& community resilience studies",
    quickLinks: "Швидкі посилання",
    contact: "Контакти",
    followUs: "Слідкуйте за нами",
    caption: "© 2026 SICRS. Всі права захищені.",
    address: "пр. Берестейський, 37, Київ, 03056, Україна",
    phone: "+380 44 204 8000",
    email: "hellosicrs@gmail.com",
    contactFormLink: "Форма зворотного зв'язку"
  },
  formHero: {
    title: "Industrial Recovery & Community Capacity Network (IRCCN)",
    subtitle: "Industrial Recovery & Community Capacity Network (IRCCN) - це міжнародна мережа науковців, експертів, громад та партнерських організацій, які об'єднують знання, досвід і практику для відновлення економіки, розвитку територій та посилення спроможності громад.\n\nМережа створена для обміну знаннями, розвитку партнерств, реалізації спільних проєктів, підготовки Policy Briefs та поширення кращих міжнародних практик.\n\nПриєднуйтеся до IRCCN та станьте частиною міжнародної спільноти, яка працює над формуванням майбутнього громад і територій на основі даних, досліджень та практичних рішень",
    form:"Приєднатися до мережі",
    learnMore: "Дізнатися більше",
    ourEvents: "Наші події",
    description: {
      line1: "• Експертне середовище",
      line2: "• Інноваційні рішення",
      line3: "• Стратегічні сектори",
    },
    university: "КПІ ім. Ігоря Сікорського"
  },
  tasks: {
    title: "Про нас",
    subtitle: "Ми формуємо міжнародну науково-аналітичну екосистему для підтримки відновлення промисловості, розвитку та посилення резильєнтності територіальних громад на основі даних, доказової аналітики та міжнародного партнерства",
    analyticalResearch: {
      title: "Дослідження відновлення промисловості та розвитку громад",
      description: "Проведення міждисциплінарних досліджень у сферах промислового відновлення, економічної трансформації, регіонального розвитку та підвищення спроможності територіальних громад на основі сучасних аналітичних підходів і міжнародного досвіду."
    },
    consulting: {
      title: "Доказова аналітика та Policy Briefs",
      description: "Підготовка аналітичних звітів, Policy Briefs, рекомендацій та практичних рішень для органів державної влади, місцевого самоврядування, міжнародних організацій і партнерів з метою підтримки прийняття рішень на основі даних і доказів."
    },
    education: {
      title: "Міжнародна співпраця та експертні мережі",
      description: "Розвиток міжнародного наукового співробітництва, об'єднання експертів, дослідників, громад та інституцій у межах мережі Industrial Recovery & Community Capacity Network (IRCCN) для обміну знаннями, досвідом та кращими практиками."
    },
    strategy: {
      title: "Інновації для стійкого розвитку та резильєнтності",
      description: "Розроблення та впровадження інноваційних підходів до відновлення територій, розвитку людського капіталу, посилення економічної стійкості та формування резильєнтних громад в умовах сучасних викликів."
    }
  },
  initiatives: {
    title: "Наші заходи",
    subtitle: "Комплексний підхід до розвитку штучного інтелекту через різноманітні форми діяльності",
    thinkTanks: {
      title: "Think Tanks, Брифінги, Дебати",
      description: "Організація експертних дискусій та аналітичних сесій з ключових питань розвитку ШІ",
      tags: ["Експертиза", "Дискусії", "Аналітика"]
    },
    expertise: {
      title: "Наукова експертиза",
      description: "Проведення незалежної наукової експертизи проєктів та ініціатив у сфері штучного інтелекту",
      tags: ["Дослідження", "Експертиза", "Наука"]
    },
    publications: {
      title: "Публікації та аналітика",
      description: "Підготовка та публікація аналітичних матеріалів, звітів та рекомендацій",
      tags: ["Публікації", "Звіти", "Рекомендації"]
    },
    partnership: {
      title: "Партнерство та співпраця",
      description: "Розвиток партнерських відносин з міжнародними організаціями та дослідницькими центрами",
      tags: ["Партнерство", "Співпраця", "Міжнародні зв'язки"]
    }
  },
  homeAbout: {
    title: "",
    text: "SICRS - міжнародне наукове товариство, засноване ГО «Академічний простір» та Науково-дослідним центром індустріальних проблем розвитку НАН України для об'єднання дослідників, експертів, представників органів влади, територіальних громад, бізнесу та міжнародних партнерів навколо спільної мети - формування доказових рішень для відновлення промисловості, розвитку територій та зміцнення спроможності громад.\n\nМи працюємо на перетині науки, аналітики та практики, перетворюючи дослідження, дані та міжнародний досвід на інструменти підтримки прийняття рішень для післявоєнного відновлення та сталого розвитку.\n\nЧерез дослідницьку діяльність, міжнародне співробітництво, аналітичні продукти, Policy Briefs та мережу Industrial Recovery & Community Capacity Network (IRCCN) ми створюємо платформу, де знання стають основою реальних змін.",
    quote: "\"Від даних і аналітики - до практичних рішень для громад, економіки та майбутнього\"",
    author: "— Команда SICRS"
  },
  homePartnerships: {
    title: "Партнери",
    subtitle: "Ми працюємо над створенням комплексної екосистеми для розвитку штучного інтелекту в Україні",
    analyticalResearch: {
      title: "Аналітичні дослідження",
      description: "Проведення глибинних досліджень у сфері штучного інтелекту та його застосування в різних галузях економіки."
    },
    consulting: {
      title: "Консультування стейкхолдерів",
      description: "Надання експертних консультацій для бізнесу, державного сектору та наукових установ."
    },
    education: {
      title: "Навчання та поширення досвіду",
      description: "Організація освітніх програм, семінарів та воркшопів для підвищення кваліфікації фахівців."
    },
    strategy: {
      title: "Обговорення стратегій та інновацій",
      description: "Розробка та впровадження інноваційних стратегій використання ШІ в ключових секторах економіки."
    }
  },
  homeExperts: {
    title: "Експерти",
  },
  stats: {
    title: "Результати нашої роботи",
    subtitle: "Цифри, що демонструють наш внесок у розвиток штучного інтелекту в Україні",
    research: {
      number: "5+",
      label: "Експертних досліджень",
      description: "Проведено аналітичних досліджень у сфері ШІ"
    },
    partners: {
      number: "6+",
      label: "Партнерських організацій",
      description: "Активна співпраця з провідними установами"
    },
    publications: {
      number: "100+",
      label: "Наукових публікацій",
      description: "Опубліковано статей та аналітичних матеріалів"
    },
    programs: {
      number: "15+",
      label: "Освітніх програм",
      description: "Реалізовано програм підвищення кваліфікації"
    }
  },
  news: {
    title: "Новини",
    subtitle: "Наші заходи, воркшопи та можливості для професійного розвитку у сфері штучного інтелекту",
    learnMore: "Дізнатися більше",
    registerNow: "Зареєструватись зараз"
  },
  partnerships: {
    section: {
      title: "Наші стратегічні партнери",
      subtitle: "Ми співпрацюємо з провідними організаціями України та світу для створення інноваційних рішень у сфері штучного інтелекту та цифрової трансформації."
    },
    card: {
      visitWebsite: "Відвідати сайт →",
    },
    cta: {
      title: "Станьте нашим партнером",
      subtitle: "Ми завжди відкриті до нових стратегічних партнерств з організаціями, які поділяють наше бачення розвитку штучного інтелекту в Україні та світі."
    }
  },
  contacts: {
    title: "Контакти",
    subtitle: "Зв'яжіться з нами для співпраці, консультацій та партнерських ініціатив",
    centerName: "Центр стратегій застосування штучного інтелекту",
    university: "КПІ ім. Ігоря Сікорського",
    addressLabel: "Адреса:",
    address: "Берестейський проспект, 37,\nКиїв, Україна, 03056",
    phoneLabel: "Телефон:",
    phone: "+380 44 204 8000",
    emailLabel: "Email:",
    email: "hellosicrs@gmail.com",
    workingHours: "Години роботи:",
    workingDays: "Понеділок - П'ятниця",
    workingTime: "9:00 - 18:00",
    getInTouch: "Як з нами зв'язатися",
    findUs: "Як нас знайти",
    findUsDetails: "Ми розташовані в головному корпусі КПІ ім. Ігоря Сікорського",
    contactForm: "Форма зворотного зв'язку",
    sending: "Відправка...",
    formSuccess: "Повідомлення успішно відправлено!",
    formError: "Сталася помилка. Будь ласка, спробуйте пізніше.",
    formName: "Ім'я",
    formEmail: "Імейл",
    formPhone: "Контактний телефон",
    formPhoneFormatHint: "Введіть номер у міжнародному форматі (наприклад, +380XXXXXXXXX)",
    formPhoneHint: "Формат: +380XXXXXXXXX",
    formMessage: "Звернення",
    formSubmit: "Відправити"
  },
  aboutUs: {
    aboutContent: {
      aboutCenter: {
        title: "Про центр",
        paragraph1: [ "Центр стратегій застосування штучного інтелекту КПІ ім. Ігоря Сікорського заснований у 2025 році", 
                        "як незалежна аналітична платформа нового покоління (Think Tank), що об'єднує молодих експертів,",
                        "провідних менторів, представників держави, бізнесу, міжнародної спільноти та молодих талантів,",
                        "які прагнуть визначати стратегії цифрового розвитку України."
                      ].join(' '),
        paragraph2: [ "Центр функціонує як інтелектуальний хаб, де молоді таланти отримують можливість творити аналітику",
                        "стратегічного рівня, а їхні ідеї, у партнерстві з досвідом менторів-експертів, перетворюються",
                        "на рішення, здатні трансформувати державну політику, економіку та систему врядування.",
                        "Ми дотримуємось принципів незалежності, відкритості та наукової обґрунтованості."
                      ].join(' '),
        paragraph3: [ "Діяльність Центру інтегрована у реалізацію Стратегії розвитку ШІ КПІ ім. Ігоря Сікорського,",
                        "яка спрямована на посилення експертного впливу університету у сфері цифрової трансформації,",
                        "та відповідає завданням Стратегії ШІ України 2030, яка визначає штучний інтелект як критичний",
                        "ресурс відновлення, безпеки та економічного зростання держави."
                      ].join(' '),
        paragraph4: [ "Через публікації, стратегічні дослідження, публічні дискусії та активну участь у міжнародних",
                        "ініціативах Центр формує відкритий простір для обговорення ключових викликів і рішень у сфері",
                        "штучного інтелекту."
                      ].join(' '),
      },
      aboutResearch: {
        title: "Дослідницька програма",
        paragraph1: [ "Річна дослідницька програма Центру формується на основі відкритого діалогу з дослідниками,",
                        "представниками урядових структур, бізнесу та міжнародних організацій. Програма відображає ",
                        "актуальні пріоритети національного розвитку у контексті глобальних трендів у сфері ШІ ",
                        "та затверджується у вересні кожного року."
                      ].join(' '),
        paragraph2: [ "Центр стратегій застосування ШІ - це місце, де молоді таланти стають авторами нової хвилі",
                        "аналітичного лідерства України, активно взаємодіючи з провідними світовими Think Tanks ",
                        "та формуючи місце України у глобальному технологічному ландшафті."
                      ].join(' '),
      },
      keyFacts: {
        title: "Ключові факти",
        founded: "Заснований",
        foundedYear: "2025",
        organizationType: "Тип організації",
        organizationTypeValue: "Think Tank",
        focus: "Фокус",
        focusValue: "ШІ та цифрова трансформація",
        status: "Статус",
        statusValue: "Аналітичний центр КПІ ім. Ігоря Сікорського"
      },
      principles: {
        title: "Принципи роботи",
        independence: "Незалежність досліджень",
        transparency: "Відкритість та прозорість",
        scientific: "Наукова обґрунтованість",
        youngTalents: "Фокус на молодих талантах",
        international: "Міжнародна співпраця"
      }
    },
    aboutHero: {
      intro: "Аналітичний центр нового покоління, що розробляє стратегії ШІ та цифрової трансформації для відбудови та розвитку України.",
      mission: {
        title: "Наша місія",
        text: "Підвищення якості політик і стратегій у сфері ШІ та забезпечення глобального лідерства молодих талантів через відкриті й засновані на фактах дослідження, аналіз і дискусії."
      },
      vision: {
        title: "Наше бачення",
        text: "Стати провідною платформою для формування стратегій штучного інтелекту в Україні та інтеграції України у глобальний технологічний ландшафт."
      }
    },
    teamSection: {
      title: "Наша команда",
      subtitle: "Команда Центру забезпечує аналітичну підтримку стратегічних проєктів, розвиток партнерств і щоденну роботу Центру, об’єднуючи молодих дослідників і експертів для створення рішень у сфері ШІ.",
    }
  },
  researchTopics: {
    title: "Скоро буде..."
  },
  publications: {
    morePublications: "Більше публікацій",
    featuredPublications: "Головні публікації",
    latestPublications: "Останні публікації",
    researchUpdates: "Оновлення досліджень",
    readMore: "Читати далі",
    publishedOn: "Опубліковано",
    category: "Категорія",
    tags: "Теги"
  },
  datasets: {
    moreDatasets: "Більше наборів даних",
    featuredDatasets: "Головні набори даних",
    latestDatasets: "Останні набори даних",
    researchUpdates: "Оновлення досліджень",
    readMore: "Читати далі",
    publishedOn: "Опубліковано",
    category: "Категорія",
    tags: "Теги"
  },
  podcasts: {
    title: "Скоро буде..."
  },
  events: {
    title: "Події",
    subtitle: "Форуми та конкурси у сфері штучного інтелекту від нашого центру",
    moreEvents: "Більше подій",
    featuredEvents: "Головні події",
    latestEvents: "Останні події",
    researchUpdates: "Оновлення досліджень",
    readMore: "Читати далі",
    publishedOn: "Опубліковано",
    category: "Категорія",
    tags: "Теги"
  },
  experts: {
    backToList: "До списку експертів",
    expertNotFound: "Експерта не знайдено",
    backButton: "Повернутися до списку",
    experience: "Досвід роботи",
    publicationsCount: "Наукових публікацій",
    citations: "Цитувань",
    education: "Освіта",
    keySkills: "Ключові навички",
    achievements: "Досягнення",
    recentPublications: "Останні наукові публікації",
    contact: "Контакт",
    view: "Переглянути",
    citationsText: "цитувань"
  },
  expertsData: {
    petrenko: {
      name: "Проф. Олександр Петренко",
      position: "Керівник центру",
      specialization: "Машинне навчання, Deep Learning",
      education: "Доктор технічних наук, КПІ ім. Ігоря Сікорського",
      experience: "15+ років у сфері ШІ",
      achievements: "30+ наукових публікацій у провідних міжнародних журналах,Керівник 5 міжнародних проєктів з розвитку ШІ,Експерт IEEE та член редколегії 3 журналів,Лауреат премії НАН України за видатні досягнення,Організатор 8 міжнародних конференцій",
      skills: "Python,TensorFlow,PyTorch,Computer Vision,NLP,Deep Learning,Neural Networks,Data Science",
      email: "o.petrenko@ai-center.kpi.ua"
    },
    kovalenko: {
      name: "Д-р Марина Коваленко",
      position: "Провідний науковий співробітник",
      specialization: "Обробка природної мови, Когнітивні обчислення",
      education: "Кандидат технічних наук, Національний університет \"Львівська політехніка\"",
      experience: "12+ років у сфері NLP",
      achievements: "25+ наукових статей з обробки природної мови,Розробник 3 патентів в галузі NLP,Лауреат премії НАН України за молоді вчені,Член наукової ради Європейської асоціації NLP,Ментор 15+ аспірантів та магістрантів",
      skills: "BERT,GPT,Transformers,Sentiment Analysis,Text Mining,Python,R,Natural Language Processing",
      email: "m.kovalenko@ai-center.kpi.ua"
    },
    melnyk: {
      name: "Д-р Андрій Мельник",
      position: "Старший науковий співробітник",
      specialization: "Комп'ютерний зір, Робототехніка",
      education: "Кандидат фізико-математичних наук, Харківський національний університет",
      experience: "10+ років у Computer Vision",
      achievements: "20+ публікацій з комп'ютерного зору,Учасник 8 міжнародних конференцій,Ментор технологічних стартапів,Розробник системи автономного водіння,Експерт з робототехніки в НАТО",
      skills: "OpenCV,YOLO,CNNs,Object Detection,Autonomous Systems,ROS,Python,C++",
      email: "a.melnyk@ai-center.kpi.ua"
    },
    shevchenko: {
      name: "Катерина Шевченко",
      position: "Молодший науковий співробітник",
      specialization: "Етика ШІ, Аналіз даних",
      education: "Магістр комп'ютерних наук, КПІ ім. Ігоря Сікорського",
      experience: "5+ років у Data Science",
      achievements: "15+ досліджень з етики штучного інтелекту,Організатор AI Ethics Workshop в Україні,Стипендіат Google AI for Social Good,Співавтор посібника з етичного ШІ,Експерт з питань регулювання ШІ",
      skills: "R,Python,Ethics Framework,Data Visualization,Statistical Analysis,GDPR Compliance,Tableau",
      email: "k.shevchenko@ai-center.kpi.ua"
    },
    ivanenko: {
      name: "Д-р Віктор Іваненко",
      position: "Науковий співробітник",
      specialization: "Квантові обчислення, Криптографія",
      education: "Кандидат фізико-математичних наук, Київський університет",
      experience: "8+ років у квантових технологіях",
      achievements: "18+ наукових праць з квантових обчислень,Експерт IBM Quantum Network,Розробник квантових алгоритмів,Консультант з квантової криптографії,Лектор міжнародних курсів з квантових технологій",
      skills: "Qiskit,Quantum Algorithms,Cryptography,Mathematical Modeling,Python,MATLAB,Quantum Computing",
      email: "v.ivanenko@ai-center.kpi.ua"
    },
    bondarenko: {
      name: "Юлія Бондаренко",
      position: "Аналітик даних",
      specialization: "Big Data, Бізнес-аналітика",
      education: "Магістр економічної кібернетики, Київський економічний університет",
      experience: "6+ років у аналітиці",
      achievements: "10+ успішних проєктів з аналізу великих даних,Сертифікована фахівчиня AWS та Azure,Спікер на 5 міжнародних конференціях,Розробниця BI-рішень для державного сектору,Експертка з візуалізації даних",
      skills: "Hadoop,Spark,SQL,Tableau,Business Intelligence,Power BI,Python,Apache Kafka",
      email: "y.bondarenko@ai-center.kpi.ua"
    }
  },
  teamMembers: {
    backToList: "До списку команди",
    teamMemberNotFound: "Члена команди не знайдено",
    backButton: "Повернутися до списку",
    experience: "Досвід роботи",
    publicationsCount: "Наукових публікацій",
    citations: "Цитувань",
    education: "Освіта",
    keySkills: "Ключові навички",
    achievements: "Досягнення",
    recentPublications: "Останні наукові публікації",
    contact: "Контакт",
    view: "Переглянути",
    citationsText: "цитувань"
  },
  teamMembersData: {
    olga_ilyash: {
      name: "Проф. Ольга Іляш",
      position: "Директорка центру",
      specialization: "Економіка",
      education: "Доктор технічних наук, КПІ ім. Ігоря Сікорського",
      experience: "5+ років у сфері ШІ",
      achievements: "",
      skills: "Economics,Neural Networks",
      email: "o.petrenko@ai-center.kpi.ua"
    },
    davyd_okaianchenko: {
      name: "Давид Окаянченко",
      position: "Розробник",
      specialization: "Економіка",
      education: "Бакалавр інформаційних систем та технологій КПІ ім. Ігоря Сікорського",
      experience: "5+ років у сфері ШІ",
      achievements: "",
      skills: "Python,TensorFlow,PyTorch,Computer Vision,NLP,Deep Learning,Neural Networks,Data Science",
      email: "o.petrenko@ai-center.kpi.ua"
    },
    kateryna_kulesh: {
      name: "Катерина Кулеш",
      position: "Розробниця",
      specialization: "Обробка природної мови",
      education: "Бакалавр комп'ютерної інженерії КПІ ім. Ігоря Сікорського",
      experience: "5+ років у сфері ШІ",
      achievements: "",
      skills: "Python,Computer vision,Data analysis,Data Science,Neural Networks,Web-development,GPT",
      email: "m.kovalenko@ai-center.kpi.ua"
    },
    artem_parkhomenko: {
      name: "Артем Пархоменко",
      position: "Розробник",
      specialization: "Економіка",
      education: "Доктор технічних наук, КПІ ім. Ігоря Сікорського",
      experience: "5+ років у сфері ШІ",
      achievements: "",
      skills: "Python,TensorFlow,PyTorch,Computer Vision,NLP,Deep Learning,Neural Networks,Data Science",
      email: "o.petrenko@ai-center.kpi.ua"
    },
  }
};

const englishTranslations = {
  header: {
    title: "SICRS",
    subtitle: "Society for industrial recovery\n& community resilience studies",
    topNav: {
      news: "News",
      partnership: "Partners",
      contacts: "Contacts",
      experts: "Experts",
      about: "About us"
    },
    bottomNav: {
      researchTopics: "Topics",
      publications: "Publications",
      datasets: "Datasets",
      podcasts: "Podcasts",
      events: "Events",
      experts: "Experts"
    },
    nav: {
      menu: "Menu",
      home: "Home",
      experts: "Experts",
      publications: "Publications",
      datasets: "Datasets",
      events: "Events",
      contacts: "Contacts"
    },
    bottomText1: {
      home: "Society for Industrial Recovery\n& Community Resilience Studies ",
      partnership: "Partnership",
      contacts: "Our Contacts",
      about: "About Our Center",
      researchTopics: "Research Topics",
      publications: "Publications",
      datasets: "Datasets",
      podcasts: "Podcasts",
      events: "Events and Conferences",
      experts: "Our Experts"
    },
    bottomText2: {
      home: "\"From data and analytics - to practical solutions for communities, economy, and the future\"",
      partnership: "Together, we are building the future of technology",
      contacts: "Contact us for collaboration, consultations\n and partnership initiatives",
      researchTopics: "Explore our posts by topics",
      publications: "Get acquainted with the results of our work",
      datasets: "Access our open data",
      podcasts: "Listen to our podcasts with invited guests",
      events: "Participate in our events",
      experts: "Leading scientists and researchers shaping\n the future of artificial intelligence in Ukraine"
    }
  },
  stickyHeader: {
    title: "SICRS",
  },
  search: {
    placeholder: "Looking for...",
    close: "Close",
    results: "Search results",
    noResults: "No results"
  },
  cookieBanner: {
    title: "Cookie Usage",
    description: "We use cookies to improve your experience on our website, analyze traffic, and personalize content. Your privacy is important to us.",
    acceptAll: "Accept All",
    customize: "Customize",
    necessaryOnly: "Necessary Only",
    settingsTitle: "Cookie Settings",
    settingsDescription: "Choose which types of cookies you want to allow. This will help us improve your experience on the site.",
    necessary: {
      title: "Necessary Cookies",
      description: "These cookies are essential for the basic functioning of the site and cannot be disabled.",
    },
    analytics: {
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with the site by collecting anonymous information.",
    },
    marketing: {
      title: "Marketing Cookies",
      description: "Used for tracking visitors across websites to show relevant advertising.",
    },
    preferences: {
      title: "Preferences Cookies",
      description: "Store your preferences and settings to improve your experience.",
    },
    saveSettings: "Save Settings",
    cancel: "Cancel",
  },
  footer: {
    title: "SICRS",
    subtitle: "Society for industrial recovery\n& community resilience studies",
    quickLinks: "Quick Links",
    contact: "Contact",
    followUs: "Follow Us",
    caption: "© 2026 SICRS. All Rights Reserved.",
    address: "37 Beresteiskyi Ave, Kyiv, 03056, Ukraine",
    phone: "+380 44 204 8000",
    email: "hellosicrs@gmail.com",
    contactFormLink: "Contact Form"
  },
  formHero: {
    title: "Industrial Recovery & Community Capacity Network (IRCCN)",
    subtitle: "Industrial Recovery & Community Capacity Network (IRCCN) is an international network of researchers, experts, communities, and partner organizations that bring together knowledge, experience, and practice for economic recovery, territorial development, and community capacity building.\n\nThe network is created to share knowledge, develop partnerships, implement joint projects, prepare Policy Briefs, and disseminate best international practices.\n\nJoin IRCCN and become part of an international community working to shape the future of communities and territories based on data, research, and practical solutions.",
    form:"Join the network",
    learnMore: "Learn More",
    ourEvents: "Our Events",
    description: {
      line1: "• Expert Environment",
      line2: "• Innovative Solutions",
      line3: "• Strategic Sectors",
    },
    university: "Igor Sikorsky Kyiv Polytechnic Institute"
  },
  tasks: {
    title: "Key areas of SICRS activity",
    subtitle: "We are building an international scientific and analytical ecosystem to support industrial recovery, development, and resilience of territorial communities based on data, evidence-based analytics, and international partnerships",
    analyticalResearch: {
      title: "Research on industrial recovery and community development",
      description: "Conducting interdisciplinary research in the areas of industrial recovery, economic transformation, regional development, and enhancing the capacity of territorial communities based on modern analytical approaches and international experience"
    },
    consulting: {
      title: "Evidence-based analytics and Policy Briefs",
      description: "Preparation of analytical reports, Policy Briefs, recommendations, and practical solutions for public authorities, local governments, international organizations, and partners to support data- and evidence-based decision-making"
    },
    education: {
      title: "International cooperation and expert networks",
      description: "Development of international scientific cooperation, bringing together experts, researchers, communities, and institutions within the Industrial Recovery & Community Capacity Network (IRCCN) to exchange knowledge, experience, and best practices"
    },
    strategy: {
      title: "Innovations for sustainable development and resilience",
      description: "Developing and implementing innovative approaches to territory recovery, human capital development, strengthening economic stability, and forming resilient communities in the face of modern challenges"
    }
  },
  initiatives: {
    title: "Our Activities",
    subtitle: "A comprehensive approach to artificial intelligence development through various forms of activity",
    thinkTanks: {
      title: "Think Tanks, Briefings, Debates",
      description: "Organizing expert discussions and analytical sessions on key AI development issues",
      tags: ["Expertise", "Discussions", "Analytics"]
    },
    expertise: {
      title: "Scientific Expertise",
      description: "Conducting independent scientific expertise of projects and initiatives in artificial intelligence",
      tags: ["Research", "Expertise", "Science"]
    },
    publications: {
      title: "Publications and Analytics",
      description: "Preparation and publication of analytical materials, reports, and recommendations",
      tags: ["Publications", "Reports", "Recommendations"]
    },
    partnership: {
      title: "Partnership and Collaboration",
      description: "Developing partnerships with international organizations and research centers",
      tags: ["Partnership", "Collaboration", "International Relations"]
    }
  },
  homeAbout: {
    title: "",
    text: "SICRS is an international scientific society founded by the NGO 'Academic Space' and the Research Center for Industrial Problems of Development of the NAS of Ukraine to bring together researchers, experts, government representatives, territorial communities, business, and international partners around a common goal - generating evidence-based solutions for industrial recovery, territory development, and community capacity strengthening.\n\nWe work at the intersection of science, analytics, and practice, turning research, data, and international experience into decision-support tools for post-war recovery and sustainable development.\n\nThrough research activities, international cooperation, analytical products, Policy Briefs, and the Industrial Recovery & Community Capacity Network (IRCCN), we create a platform where knowledge becomes the basis for real changes.",
    quote: "\"From data and analytics - to practical solutions for communities, economy, and the future\"",
    author: "— SICRS Team"
  },
  homePartnerships: {
    title: "Partners",
    subtitle: "We are working on creating a comprehensive ecosystem for the development of artificial intelligence in Ukraine.",
    analyticalResearch: {
      title: "Аналітичні дослідження",
      description: "Проведення глибинних досліджень у сфері штучного інтелекту та його застосування в різних галузях економіки."
    },
    consulting: {
      title: "Консультування стейкхолдерів",
      description: "Надання експертних консультацій для бізнесу, державного сектору та наукових установ."
    },
    education: {
      title: "Навчання та поширення досвіду",
      description: "Організація освітніх програм, семінарів та воркшопів для підвищення кваліфікації фахівців."
    },
    strategy: {
      title: "Обговорення стратегій та інновацій",
      description: "Розробка та впровадження інноваційних стратегій використання ШІ в ключових секторах економіки."
    }
  },
  homeExperts: {
    title: "Experts",
  },
  stats: {
    title: "Results of Our Work",
    subtitle: "Numbers that demonstrate our contribution to artificial intelligence development in Ukraine",
    research: {
      number: "5+",
      label: "Expert Research Studies",
      description: "Analytical research conducted in AI field"
    },
    partners: {
      number: "6+",
      label: "Partner Organizations",
      description: "Active collaboration with leading institutions"
    },
    publications: {
      number: "100+",
      label: "Scientific Publications",
      description: "Published articles and analytical materials"
    },
    programs: {
      number: "15+",
      label: "Educational Programs",
      description: "Professional development programs implemented"
    }
  },
  news: {
    title: "News",
    subtitle: "Our upcoming events, workshops, and professional development opportunities in artificial intelligence",
    learnMore: "Learn More",
    registerNow: "Register Now"
  },
  partnerships: {
    section: {
      title: "Our Strategic Partners",
      subtitle: "We collaborate with leading organizations in Ukraine and around the world to create innovative solutions in the field of artificial intelligence and digital transformation."
    },
    card: {
      visitWebsite: "Visit website →",
    },
    cta: {
      title: "Become Our Partner",
      subtitle: "We are always open to new strategic partnerships with organizations that share our vision for the development of artificial intelligence in Ukraine and worldwide."
    }
  },
  contacts: {
    title: "Contacts",
    subtitle: "Contact us for collaboration, consultations, and partnership initiatives",
    centerName: "Center for Strategic Applications of Artificial Intelligence",
    university: "Igor Sikorsky Kyiv Polytechnic Institute",
    addressLabel: "Address:",
    address: "37, Prospect Beresteiskyi (former Peremohy),\nKyiv, Ukraine, 03056",
    phoneLabel: "Phone:",
    phone: "+380 44 204 8000",
    emailLabel: "Email:",
    email: "hellosicrs@gmail.com",
    workingHours: "Working Hours:",
    workingDays: "Monday - Friday",
    workingTime: "9:00 AM - 6:00 PM",
    getInTouch: "Get In touch",
    findUs: "How to find us",
    findUsDetails: "We are located in the main building of Igor Sikorsky Kyiv Polytechnic Institute",
    contactForm: "Contact Form",
    sending: "Sending...",
    formSuccess: "Message sent successfully!",
    formError: "An error occurred. Please try again later.",
    formName: "Name",
    formEmail: "Email",
    formPhone: "Phone",
    formPhoneFormatHint: "Enter phone in international format (e.g., +380XXXXXXXXX)",
    formPhoneHint: "Format: +380XXXXXXXXX",
    formMessage: "Message",
    formSubmit: "Send"
  },
  aboutUs: {
    aboutContent: {
      aboutCenter: {
        title: "About Center",
          paragraph1: [ "Center for Artificial Intelligence Application Strategies of Igor Sikorsky Kyiv Polytechnic Institute",
                        "was founded in 2025 as an independent next-generation analytical platform (Think Tank) that brings together",
                        "young experts, leading mentors, government representatives, business leaders, the international community,",
                        "and promising young talents who aim to define Ukraine’s digital development strategies."
                      ].join(' '),
          paragraph2: [ "The Center functions as an intellectual hub where young talents are empowered to create strategic-level",
                        "analytics, and their ideas - combined with the experience of mentoring experts - are transformed into",
                        "solutions capable of reshaping public policy, the economy, and governance systems. We adhere to the",
                        "principles of independence, openness, and scientific rigor."
                      ].join(' '),
          paragraph3: [ "The Center’s activities are integrated with the AI Development Strategy of Igor Sikorsky Kyiv Polytechnic Institute,",
                        "Institute, which seeks to strengthen the university’s expert influence in digital transformation, and align",
                        "with the AI Strategy of Ukraine 2030, which positions artificial intelligence as a critical resource for",
                        "reconstruction, security, and economic growth."
                      ].join(' '),
          paragraph4: [ "Through publications, strategic research, public discussions, and active participation in international",
                        "initiatives, the Center creates an open forum for discussing key challenges and solutions in the field of artificial intelligence.",
                      ].join(' '),
        },
      aboutResearch: {
        title: "Research Program",
          paragraph1: [ "Our annual research program is shaped through open dialogue with researchers, government representatives,",
                        "businesses, and international organizations. It reflects current national development priorities in the",
                        "context of global AI trends and is approved each September."
                      ].join(' '),
          paragraph2: [ "The Center for Artificial Intelligence Application",
                        "Strategies is a space where young talents become authors of a new wave of analytical leadership in Ukraine,",
                        "engaging actively with leading global Think Tanks and shaping Ukraine’s role in the global technological landscape."
                      ].join(' '),

      },
      keyFacts: {
        title: "Key Facts",
        founded: "Founded",
        foundedYear: "2025",
        organizationType: "Organization Type",
        organizationTypeValue: "Think Tank",
        focus: "Focus",
        focusValue: "AI and Digital Transformation",
        status: "Status",
        statusValue: "Analytical Center of Igor Sikorsky Kyiv Polytechnic Institute"
      },
      principles: {
        title: "Principles of Work",
        independence: "Independence of research",
        transparency: "Openness and transparency",
        scientific: "Scientific rigor",
        youngTalents: "Focus on young talents",
        international: "International collaboration"
      }
    },
    aboutHero: {
      intro: "A next-generation Ukrainian think tank specializing in developing strategies for AI and digital transformation to support Ukraine's reconstruction and development.",
      mission: {
        title: "Our Mission",
        text: "Enhancing the quality of AI policies and strategies and ensuring global leadership of young talents through open and evidence-based research, analysis, and discussion."
      },
      vision: {
        title: "Our Vision",
        text: "To become a leading platform for shaping artificial intelligence strategies in Ukraine and integrating Ukraine into the global technological landscape."
      }
    },
    teamSection: {
      title: "Our Team",
      subtitle: "The Center's team provides analytical support for strategic projects, develops partnerships, and manages the Center's daily operations, bringing together young researchers and experts to create solutions in the field of AI.",
    }
  },
  researchTopics: {
    title: " Coming soon..."
  },
  publications: {
    morePublications: "More Publications",
    featuredPublications: "Featured Publications",
    latestPublications: "Latest Publications",
    researchUpdates: "Research Updates",
    readMore: "Read More",
    publishedOn: "Published on",
    category: "Category",
    tags: "Tags"
  },
  datasets: {
    moreDatasets: "More Datasets",
    featuredDatasets: "Featured Datasets",
    latestDatasets: "Latest Datasets",
    researchUpdates: "Research Updates",
    readMore: "Read More",
    publishedOn: "Published on",
    category: "Category",
    tags: "Tags"
  },
  podcasts: {
    title: "Coming soon..."
  },
  events: {
    moreEvents: "More Events",
    featuredEvents: "Featured Events",
    latestEvents: "Latest Events",
    researchUpdates: "Research Updates",
    readMore: "Read More",
    publishedOn: "Published on",
    category: "Category",
    tags: "Tags"
  },
  experts: {
    backToList: "Back to Experts List",
    expertNotFound: "Expert Not Found",
    backButton: "Return to List",
    experience: "Work Experience",
    publicationsCount: "Scientific Publications",
    citations: "Citations",
    education: "Education",
    keySkills: "Key Skills",
    achievements: "Achievements",
    recentPublications: "Recent Scientific Publications",
    contact: "Contact",
    view: "View",
    citationsText: "citations"
  },
  expertsData: {
    petrenko: {
      name: "Prof. Oleksandr Petrenko",
      position: "Center Director",
      specialization: "Machine Learning, Deep Learning",
      education: "Doctor of Technical Sciences, Igor Sikorsky Kyiv Polytechnic Institute",
      experience: "15+ years in AI field",
      achievements: "30+ scientific publications in leading international journals,Leader of 5 international AI development projects,IEEE expert and editorial board member of 3 journals,Winner of the National Academy of Sciences of Ukraine award for outstanding achievements,Organizer of 8 international conferences",
      skills: "Python,TensorFlow,PyTorch,Computer Vision,NLP,Deep Learning,Neural Networks,Data Science",
      email: "o.petrenko@ai-center.kpi.ua"
    },
    kovalenko: {
      name: "Dr. Marina Kovalenko",
      position: "Lead Research Associate",
      specialization: "Natural Language Processing, Cognitive Computing",
      education: "Candidate of Technical Sciences, Lviv Polytechnic National University",
      experience: "12+ years in NLP field",
      achievements: "25+ scientific articles on natural language processing,Developer of 3 patents in NLP field,Winner of the National Academy of Sciences of Ukraine award for young scientists,Member of the scientific council of the European NLP Association,Mentor of 15+ PhD and master's students",
      skills: "BERT,GPT,Transformers,Sentiment Analysis,Text Mining,Python,R,Natural Language Processing",
      email: "m.kovalenko@ai-center.kpi.ua"
    },
    melnyk: {
      name: "Dr. Andriy Melnyk",
      position: "Senior Research Associate",
      specialization: "Computer Vision, Robotics",
      education: "Candidate of Physical and Mathematical Sciences, Kharkiv National University",
      experience: "10+ years in Computer Vision",
      achievements: "20+ publications on computer vision,Participant in 8 international conferences,Mentor of technology startups,Developer of autonomous driving system,NATO robotics expert",
      skills: "OpenCV,YOLO,CNNs,Object Detection,Autonomous Systems,ROS,Python,C++",
      email: "a.melnyk@ai-center.kpi.ua"
    },
    shevchenko: {
      name: "Kateryna Shevchenko",
      position: "Junior Research Associate",
      specialization: "AI Ethics, Data Analysis",
      education: "Master of Computer Science, Igor Sikorsky Kyiv Polytechnic Institute",
      experience: "5+ years in Data Science",
      achievements: "15+ research studies on artificial intelligence ethics,Organizer of AI Ethics Workshop in Ukraine,Google AI for Social Good scholarship recipient,Co-author of ethical AI handbook,Expert on AI regulation issues",
      skills: "R,Python,Ethics Framework,Data Visualization,Statistical Analysis,GDPR Compliance,Tableau",
      email: "k.shevchenko@ai-center.kpi.ua"
    },
    ivanenko: {
      name: "Dr. Viktor Ivanenko",
      position: "Research Associate",
      specialization: "Quantum Computing, Cryptography",
      education: "Candidate of Physical and Mathematical Sciences, Kyiv University",
      experience: "8+ years in quantum technologies",
      achievements: "18+ scientific papers on quantum computing,IBM Quantum Network expert,Developer of quantum algorithms,Quantum cryptography consultant,Lecturer of international quantum technology courses",
      skills: "Qiskit,Quantum Algorithms,Cryptography,Mathematical Modeling,Python,MATLAB,Quantum Computing",
      email: "v.ivanenko@ai-center.kpi.ua"
    },
    bondarenko: {
      name: "Yulia Bondarenko",
      position: "Data Analyst",
      specialization: "Big Data, Business Analytics",
      education: "Master of Economic Cybernetics, Kyiv Economic University",
      experience: "6+ years in analytics",
      achievements: "10+ successful big data analysis projects,Certified AWS and Azure specialist,Speaker at 5 international conferences,Developer of BI solutions for the public sector,Data visualization expert",
      skills: "Hadoop,Spark,SQL,Tableau,Business Intelligence,Power BI,Python,Apache Kafka",
      email: "y.bondarenko@ai-center.kpi.ua"
    }
  },
  teamMembers: {
    backToList: "Back to Team Members List",
    teamMemberNotFound: "Team Member Not Found",
    backButton: "Return to List",
    experience: "Work Experience",
    publicationsCount: "Scientific Publications",
    citations: "Citations",
    education: "Education",
    keySkills: "Key Skills",
    achievements: "Achievements",
    recentPublications: "Recent Scientific Publications",
    contact: "Contact",
    view: "View",
    citationsText: "citations"
  },
  teamMembersData: {
    olga_ilyash: {
      name: "Prof. Olga Ilyash",
      position: "Center Director",
      specialization: "Machine Learning, Deep Learning",
      education: "Doctor of Technical Sciences, Igor Sikorsky Kyiv Polytechnic Institute",
      experience: "5+ years in AI field",
      achievements: "",
      skills: "Economics,Neural Networks",
      email: "o.petrenko@ai-center.kpi.ua"
    },
    davyd_okaianchenko: {
      name: "Davyd Okaianchenko",
      position: "Developer",
      specialization: "Machine Learning, Deep Learning",
      education: "Doctor of Technical Sciences, Igor Sikorsky Kyiv Polytechnic Institute",
      experience: "5+ years in AI field",
      achievements: "",
      skills: "Python,TensorFlow,PyTorch,Computer Vision,NLP,Deep Learning,Neural Networks,Data Science",
      email: "o.petrenko@ai-center.kpi.ua"
    },
    kateryna_kulesh: {
      name: "Kateryna Kulesh",
      position: "Developer",
      specialization: "Natural Language Processing, Cognitive Computing",
      education: "Candidate of Technical Sciences, Lviv Polytechnic National University",
      experience: "5+ years in AI field",
      achievements: "",
      skills: "Python,Computer vision,Data analysis,Data Science,Neural Networks,Web-development,GPT",
      email: "m.kovalenko@ai-center.kpi.ua"
    },
    artem_parkhomenko: {
      name: "Artem Parkhomenko",
      position: "Developer",
      specialization: "Machine Learning, Deep Learning",
      education: "Doctor of Technical Sciences, Igor Sikorsky Kyiv Polytechnic Institute",
      experience: "5+ years in AI field",
      achievements: "",
      skills: "Python,TensorFlow,PyTorch,Computer Vision,NLP,Deep Learning,Neural Networks,Data Science",
      email: "o.petrenko@ai-center.kpi.ua"
    },
  }
};