// Головний та інші анонси

export const Articles = (isUk: boolean) => [
    {
      id: "featured",
      title: isUk
        ? "Трансформація європейської політики ШІ: нова рамка для інновацій та етики"
        : "Transforming European AI Policy: A New Framework for Innovation and Ethics",
      category: isUk 
        ? "Новина" 
        : "News",
      authors: isUk
        ? "Ольга Іляш, Вікторія Хаустова та "
        : "Dmytro Kolesnikov, Anna Petryk, Sergiy Fedorov and Maria Tkachenko",
      dateFull: isUk
        ? "6 червня 2026"
        : "6 червня 2026",
      dateTime: "06.06.2026",
      readTime: "8",
      tags: isUk 
        ? ["бюджет єс", "політика ші", "інновації"]
        : ["eu budget", "ai policy", "innovation"],
      image: "/public/images/Articles/imt_lucca_prof.jpg",
      size: "large",
      description: isUk
        ? "Цьогорічна щорічна конференція зосереджена на 25-річчі досліджень штучного інтелекту та його впливі на українську економіку"
        : "This year's annual conference focuses on 25 years of artificial intelligence research and its impact on Ukrainian economy",
      content: isUk ? [
          "Центр стратегічного використання штучного інтелекту з гордістю оголошує про проведення своєї щорічної конференції, присвяченої 25-річчю досліджень в галузі ШІ в Україні. Ця знакова подія відбудеться 15-16 листопада 2024 року і зберіт провідних експертів, дослідників та інноваторів з усього світу.",
          "Протягом двох днів учасники матимуть можливість познайомитися з найновішими досягненнями в сфері штучного інтелекту, обговорити виклики та перспективи розвитку технологій ШІ в контексті української економіки та суспільства.",
          "Програма конференції включатиме:",
          "• Основні доповіді від провідних світових експертів з ШІ",
          "• Панельні дискусії про етичні аспекти використання ШІ",
          "• Презентації останніх досліджень українських наукових інституцій",
          "• Воркшопи з практичного застосування ШІ в різних секторах економіки",
          "• Нетворкінг сесії для професійного спілкування",
          "Особлива увага буде приділена впливу штучного інтелекту на трансформацію української економіки, зокрема в контексті відновлення після війни та інтеграції з європейськими стандартами.",
          "Конференція також стане платформою для презентації нових ініціатив Центру, включаючи програми міжнародного співробітництва та освітні проєкти, спрямовані на розвиток талантів у сфері ШІ.",
          "Реєстрація на подію вже відкрита на офіційному веб-сайті Центру. Кількість місць обмежена, тому рекомендуємо реєструватися якомога швидше."
        ] : [
          "The Center for Strategic Use of Artificial Intelligence proudly announces its annual conference dedicated to 25 years of AI research in Ukraine. This landmark event will take place on November 15-16, 2024, bringing together leading experts, researchers, and innovators from around the world.",
          "Over two days, participants will have the opportunity to explore the latest advances in artificial intelligence, discuss challenges and prospects for AI technology development in the context of the Ukrainian economy and society.",
          "The conference program will include:",
          "• Keynote speeches from leading global AI experts",
          "• Panel discussions on ethical aspects of AI use",
          "• Presentations of latest research from Ukrainian scientific institutions", 
          "• Workshops on practical AI applications across various economic sectors",
          "• Networking sessions for professional communication",
          "Special attention will be paid to the impact of artificial intelligence on the transformation of the Ukrainian economy, particularly in the context of post-war reconstruction and integration with European standards.",
          "The conference will also serve as a platform for presenting new Center initiatives, including international cooperation programs and educational projects aimed at developing AI talent.",
          "Registration for the event is now open on the Center's official website. Space is limited, so we recommend registering as soon as possible."
        ]
    },
    {
      id: "article-1",
      title: isUk
        ? "Моделі управління ШІ на ринках, що розвиваються"
        : "AI governance models across emerging markets",
      category: isUk 
        ? "Політична записка" 
        : "Policy Brief",
      authors: isUk
        ? "Олександр Савченко"
        : "Oleksandr Savchenko",
      date: isUk
        ? "07 серпня 2025"
        : "07 August 2025",
      tags: isUk 
        ? ["врядування", "нові ринки", "регулювання ші"]
        : ["governance", "emerging markets", "ai regulation"],
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop",
      size: "small"
    },
    {
      id: "article-2",
      title: isUk
        ? "Українська екосистема ШІ: побудова сталих інноваційних мереж"
        : "The Ukrainian AI ecosystem: building sustainable innovation networks",
      category: isUk 
        ? "Робоча стаття" 
        : "Working paper",
      authors: isUk
        ? "Вікторія Левченко та Тарас Коваленко"
        : "Viktoriia Levchenko and Taras Kovalenko",
      date: isUk
        ? "18 липня 2025"
        : "18 July 2025",
      tags: isUk 
        ? ["україна", "інновації", "екосистема"]
        : ["ukraine", "innovation", "ecosystem"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      size: "small"
    },
    {
      id: "article-3",
      title: isUk
        ? "Застосування машинного навчання у сталому розвитку: прогрес та виклики"
        : "Machine learning applications in sustainable development: progress and challenges",
      category: isUk 
        ? "Аналіз" 
        : "Analysis",
      authors: isUk
        ? "Іван Петренко"
        : "Ivan Petrenko",
      date: isUk
        ? "25 липня 2025"
        : "25 July 2025",
      tags: isUk
        ? ["машинне навчання", "сталий розвиток"]
        : ["machine learning", "sustainability"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      size: "small"
    },
    {
      id: "article-4",
      title: isUk
        ? "Стратегії цифрової трансформації для впровадження ШІ в державному секторі"
        : "Digital transformation strategies for public sector AI implementation",
      category: isUk 
        ? "Звіт" 
        : "Report",
      authors: isUk 
        ? "Оксана Марченко та Андрій Шевченко"
        : "Oksana Marchenko and Andriy Shevchenko",
      date: isUk
        ? "02 серпня 2025"
        : "02 August 2025",
      tags: isUk
        ? ["цифрова трансформація", "державний сектор", "впровадження"]
        : ["digital transformation", "public sector", "implementation"],
      image: "https://images.unsplash.com/photo-1726064855881-3bbb7000b29f?w=1080",
      size: "small"
    }
  ];


