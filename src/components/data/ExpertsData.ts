// Дані про експертів Центру

export const expertsData = (isUk: boolean) => [
  {
    id: "ilyash",
    name: isUk ? "Ольга ІЛЯШ" : "Olga ILYASH",
    position: isUk ? "Доктор економічних наук, професор. Засновниця та керівниця SICRS. Керівниця ГО «Академічний простір». Експертка з питань соціально-економічного розвитку, регіональної промислової політики, відновлення територій та спроможності громад" 
                      :
                     "Doctor of Economic Sciences, Professor. Founder and Head of SICRS. Head of the NGO “Academic Space”. Expert in socio-economic development, regional industrial policy, territorial recovery, and community resilience",
    image: "/images/ExpertPhotos/ilyash.jpg"
  },
  {
    id: "khaustova",
    name: isUk ? "Вікторія ХАУСТОВА" : "Viktoriia KHAUSTOVA",
    position: isUk ? "Доктор економічних наук, професор, директор Науково-дослідного центру індустріальних проблем розвитку НАН України. Співзасновниця SICRS. Експертка з питань промислової політики, інноваційного розвитку та структурної трансформації економіки" 
                      :
                     "Doctor of Economic Sciences, Professor, Director of the Research Centre for Industrial Problems of Development of the National Academy of Sciences of Ukraine. Co-founder of SICRS. Expert in industrial policy, innovation-driven development, and structural transformation of the economy",
    image: "/images/ExpertPhotos/khaustova.jpg"
  },
  {
    id: "kyzym",
    name: isUk ? "Микола КИЗИМ" : "Mykola KYZYM",
    position: isUk ? "Член-кореспондент НАН України, доктор економічних наук, професор, заслужений економіст України. Учасник SICRS. Експерт з питань стратегічного розвитку, формування індустріальних систем та науково-технологічної політики" 
                      :
                     "Corresponding Member of the National Academy of Sciences of Ukraine, Doctor of Economic Sciences, Professor, Honored Economist of Ukraine. Member of SICRS. Expert in strategic development, industrial systems formation, and science and technology policy",
    image: "/images/ExpertPhotos/kyzym.png"
  },
  {
    id: "salashenko",
    name: isUk ? "Тетяна САЛАШЕНКО" : "Tetiana SALASHENKO",
    position: isUk ? "Доктор економічних наук, старший дослідник. Учасниця SICRS. Експертка з питань енергетичної політики, енергетичних ринків, енергетичної безпеки та трансформації критичної інфраструктури громад" 
                      : 
                    "Doctor of Economic Sciences, Senior Researcher. Member of SICRS. Expert in energy policy, energy markets, energy security, and the transformation of critical community infrastructure",
    image: "/images/ExpertPhotos/salashenko.jpg"
  },
  {
    id: "trushkina",
    name: isUk ? "Наталія ТРУШКІНА" : "Nataliia TRUSHKINA",
    position: isUk ? "Кандидат економічних наук, старший дослідник. Учасниця SICRS. Експертка з питань промислової політики, регіонального розвитку, логістики та відновлення економічних систем" 
                      : 
                    "Candidate of Economic Sciences (PhD in Economics), Senior Researcher. Member of SICRS. Expert in industrial policy, regional development, logistics, and the recovery of economic systems",
    image: "/images/ExpertPhotos/trushkina.jpg"
  },
];