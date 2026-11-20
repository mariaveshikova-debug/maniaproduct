export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  imageAlt: string;
}

export const products: Product[] = [
  {
    id: "vaza-duna",
    title: "Ваза «Дюна»",
    category: "Керамика",
    price: 4890,
    image: "/demo-decor/vaza-duna.svg",
    imageAlt: "Керамическая ваза «Дюна» песочного цвета",
  },
  {
    id: "svetilnik-oreol",
    title: "Светильник «Ореол»",
    category: "Свет",
    price: 12400,
    image: "/demo-decor/svetilnik-oreol.svg",
    imageAlt: "Настольный светильник «Ореол» с янтарным светом",
  },
  {
    id: "panno-lunnyi-svet",
    title: "Панно «Лунный свет»",
    category: "Текстиль",
    price: 7250,
    image: "/demo-decor/panno-lunnyi-svet.svg",
    imageAlt: "Текстильное панно «Лунный свет» с янтарной луной",
  },
  {
    id: "podstavka-ritm",
    title: "Подставка «Ритм»",
    category: "Дерево",
    price: 3600,
    image: "/demo-decor/podstavka-ritm.svg",
    imageAlt: "Деревянная подставка «Ритм» с янтарными кругами",
  },
  {
    id: "zerkalo-arka",
    title: "Зеркало «Арка»",
    category: "Зеркала",
    price: 8900,
    image: "/demo-decor/zerkalo-arka.svg",
    imageAlt: "Арочное зеркало «Арка» в тёмно-зелёной раме",
  },
  {
    id: "podsvechnik-iskra",
    title: "Подсвечник «Искра»",
    category: "Металл",
    price: 2400,
    image: "/demo-decor/podsvechnik-iskra.svg",
    imageAlt: "Янтарный металлический подсвечник «Искра» со свечой",
  },
  {
    id: "chasha-priliv",
    title: "Декоративная чаша «Прилив»",
    category: "Стекло",
    price: 5200,
    image: "/demo-decor/chasha-priliv.svg",
    imageAlt: "Стеклянная чаша «Прилив» с волнистым краем",
  },
  {
    id: "skulptura-balans",
    title: "Скульптура «Баланс»",
    category: "Камень",
    price: 6700,
    image: "/demo-decor/skulptura-balans.svg",
    imageAlt: "Скульптура «Баланс» из трёх округлых камней",
  },
];
