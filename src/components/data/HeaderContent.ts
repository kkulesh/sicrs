export const HeaderContent: Record<string, {
  background: string;
  bottomText1?: string;
  bottomText2?: string;
  height: string;
}> = {
  home: {
    background: "/images/HeaderBackgrounds/32.png", //"/images/ai_background.jpg"
    bottomText1: "Наукове товариство з досліджень відновлення промисловості та резильєнтності територіальних громад",
    bottomText2: "«Від аналітики до трансформації: рішення для громад, економіки та відновлення України»",
    height: "450px",
  },
  contactForm: {
    background: "/images/HeaderBackgrounds/18.png", //"/images/ai_background.jpg"
    bottomText1: "Форма",
    bottomText2: "«Від аналітики до трансформації: рішення для громад, економіки та відновлення України»",
    height: "450px",
  },
  articleDetail: {
    background: "/images/HeaderBackgrounds/18.png",
    height: "200px",
  },
  fallback: {
    background: "/images/HeaderBackgrounds/background4.jpg",
    height: "200px",
  },
};