export const HeaderContent: Record<string, {
  background: string;
  bottomText1?: string;
  bottomText2?: string;
  height: string;
}> = {
  home: {
    background: "/images/HeaderBackgrounds/18.png", //"/images/ai_background.jpg"
    bottomText1: "Наукове товариство з досліджень відновлення промисловості та резильєнтності територіальних громад",
    bottomText2: "Ми працюємо над розвитком штучного інтелекту для науки та суспільства",
    height: "450px",
  },
  contactForm: {
    background: "/images/HeaderBackgrounds/13.jpg", //"/images/ai_background.jpg"
    bottomText1: "Форма",
    bottomText2: "Ми працюємо над розвитком штучного інтелекту для науки та суспільства",
    height: "450px",
  },
  articleDetail: {
    background: "/images/HeaderBackgrounds/13.jpg",
    height: "200px",
  },
  fallback: {
    background: "/images/HeaderBackgrounds/background4.jpg",
    height: "200px",
  },
};