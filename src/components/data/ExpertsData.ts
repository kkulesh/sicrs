// Дані про експертів Центру

export const expertsData = (isUk: boolean) => [
  {
    id: "ilyash",
    name: isUk ? "ІЛЯШ Ольга" : "ILYASH Olga",
    position: isUk ? "Доктор економічних наук, професор, керівник напряму стратегічного моніторингу соціально-економічного розвитку регіонів" 
                      :
                     "Doctor of Economics, Professor, Head of the Strategic Monitoring of Socio-Economic Development of Regions",
    image: "/images/ExpertPhotos/ilyash.jpg"
  },
  {
    id: "kyzym",
    name: isUk ? "КИЗИМ Микола" : "KYZYM Mykola",
    position: isUk ? "Член-кореспондент Національної академії наук України, доктор економічних наук, професор, заслужений економіст України. Керівник напряму науково-технічної діяльності" 
                      :
                     "Corresponding Member of the National Academy of Sciences of Ukraine, Doctor of Economic Sciences, Professor, Honored Economist of Ukraine. Head of the Scientific and Technical Activity Direction",
    image: "/images/ExpertPhotos/kyzym.png"
  },
  {
    id: "khaustova",
    name: isUk ? "ХАУСТОВА Вікторія" : "KHAUSTOVA Viktoriia",
    position: isUk ? "Доктор економічних наук, професор. Керівник напряму промислової політики та інноваційного розвитку" 
                      :
                     "Doctor of Economic Sciences, Professor. Head of the Industrial Policy and Innovation Development Department",
    image: "/images/ExpertPhotos/khaustova.jpg"
  },
  {
    id: "trushkina",
    name: isUk ? "ТРУШКІНА Наталія" : "Trushkina Nataliia",
    position: isUk ? "Кандидат економічних наук, старший дослідник. Старший науковий співробітник сектора промислової політики та інноваційного розвитку відділу промислової політики та енергетичної безпеки." 
                      : 
                    "Candidate of Economic Sciences, Senior Researcher. Senior Researcher in the Industrial Policy and Innovation Development Sector of the Industrial Policy and Energy Security Department.",
    image: "/images/ExpertPhotos/trushkina.jpg"
  },
  {
    id: "salashenko",
    name: isUk ? "САЛАШЕНКО Тетяна" : "SALASHENKO Tetiana",
    position: isUk ? "Кандидат економічних наук. Керівник напряму з питань енергетики. Експерт з енергетичної політики та енергетичних ринків, енергетичної безпеки та енергозбереження." 
                      : 
                    "Candidate of Economic Sciences. Head of the Energy Department. Expert in energy policy and energy markets, energy security and energy conservation.",
    image: "/images/ExpertPhotos/salashenko.jpg"
  }
];