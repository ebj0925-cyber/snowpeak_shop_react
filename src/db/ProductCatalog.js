import BagData from './BagData';
import SpringCollection from './SpringCollectionData';

const K = {
  men: 'MEN',
  women: 'WOMEN',
  kids: 'KIDS',
  acc: 'ACC & SHOES',
  outlet: 'OUTLET',
  top: '\uC0C1\uC758',
  outer: '\uC544\uC6B0\uD130',
  bottom: '\uD558\uC758',
  bag: '\uAC00\uBC29',
  hat: '\uBAA8\uC790',
  goods: '\uC6A9\uD488',
  shoes: '\uC288\uC988',
};

const bagCatalog = BagData.map((item) => ({
  id: `bag-${item.id}`,
  group: K.acc,
  category: K.bag,
  title: item.title,
  price: item.price,
  img: item.img,
  badge: item.isNew ? 'NEW' : '',
}));

const getSpringMeta = (tabTitle) => {
  if (tabTitle.includes('\uB9E8\uD22C\uB9E8')) {
    return { group: K.men, category: K.top };
  }

  if (tabTitle.includes('\uC5EC\uC131')) {
    return { group: K.women, category: K.outer };
  }

  if (tabTitle.includes('ACC')) {
    return { group: K.acc, category: K.bag };
  }

  return { group: K.men, category: K.outer };
};

const getSpringItemMeta = (item, sectionMeta) => {
  const title = item.title;

  if (title.includes('\uC5EC\uC131')) {
    if (title.includes('\uD32C\uCE20') || title.includes('\uC2A4\uCEE4\uD2B8')) {
      return { group: K.women, category: K.bottom };
    }

    if (title.includes('\uB9E8\uD22C\uB9E8') || title.includes('\uD2F0\uC154\uCE20')) {
      return { group: K.women, category: K.top };
    }

    return { group: K.women, category: K.outer };
  }

  if (sectionMeta.group === K.acc) {
    if (title.includes('\uC5D0\uC13C\uC15C')) {
      return { group: K.acc, category: K.shoes };
    }

    if (title.includes('\uBCFC\uCEA1') || title.includes('\uBAA8\uC790')) {
      return { group: K.acc, category: K.hat };
    }

    return { group: K.acc, category: K.bag };
  }

  return sectionMeta;
};

const springCatalog = SpringCollection.flatMap((section) => {
  const sectionMeta = getSpringMeta(section.tabTitle);

  return section.items.map((item) => {
    const meta = getSpringItemMeta(item, sectionMeta);

    return {
      id: `spring-${item.id}`,
      group: meta.group,
      category: meta.category,
      title: item.title,
      price: item.price,
      img: item.img,
      isSoldOut: item.isSoldOut || false,
      badge: item.isSoldOut ? 'SOLD OUT' : item.isNew ? 'NEW' : '',
    };
  });
});

const ProductCatalog = [
  {
    id: 1,
    group: K.men,
    category: K.outer,
    title: '\uB8E8\uD2B8 \uD3EC\uCF13 \uBC18\uD314 \uD3F4\uB85C \uC154\uCE20 Black',
    price: '169,000',
    img: '/img/new_arrivals/new_01.jpg',
    badge: '\uC7AC\uC785\uACE0',
  },
  {
    id: 2,
    group: K.men,
    category: K.bottom,
    title: '\uB8E8\uD2B8 \uBC84\uBBA4\uB2E4 \uD32C\uCE20 Rustic Khaki',
    price: '149,000',
    img: '/img/new_arrivals/new_02.jpg',
  },
  {
    id: 3,
    group: K.men,
    category: K.outer,
    title: '\uD53C\uCF54 \uCD08\uACBD\uB7C9 \uBC14\uB78C\uB9C9\uC774 Ice Gray',
    price: '149,000',
    img: '/img/new_arrivals/new_03.jpg',
  },
  {
    id: 4,
    group: K.men,
    category: K.top,
    title: '\uC5D0\uCF54 \uD0C0\uC2AC\uB780 \uBCFC\uCEA1 Smog Khaki',
    price: '49,000',
    img: '/img/new_arrivals/new_04.jpg',
  },
  {
    id: 5,
    group: K.men,
    category: K.outer,
    title: '\uCEA0\uD50C \uC720\uD2F8\uB9AC\uD2F0 \uBC14\uB78C\uB9C9\uC774 Rustic Khaki',
    price: '189,000',
    img: '/img/new_arrivals/new_05.jpg',
  },
  {
    id: 6,
    group: K.men,
    category: K.top,
    title: '\uC5B4\uB4E4 \uADF8\uB798\uD53D \uB9E8\uD22C\uB9E8 Ice Gray',
    price: '89,000',
    img: '/img/new_arrivals/new_06.jpg',
    badge: 'SOLD OUT',
  },
  {
    id: 7,
    group: K.men,
    category: K.top,
    title: '\uB79C\uB4DC \uD6C4\uB4DC \uD2F0\uC154\uCE20 Vintage Gray',
    price: '99,000',
    img: '/img/detail/detail01.jpg',
  },
  {
    id: 8,
    group: K.men,
    category: K.bottom,
    title: '\uB8E8\uD2B8 \uCE74\uACE0 \uD32C\uCE20 Wine',
    price: '129,000',
    img: '/img/new_arrivals/new_08.jpg',
  },
  {
    id: 101,
    group: K.women,
    category: K.outer,
    title: '\uD53C\uCF54 \uCD08\uACBD\uB7C9 \uC5EC\uC131 \uBC14\uB78C\uB9C9\uC774 Light Blue',
    price: '149,000',
    img: '/img/springcollection/spring1-04.jpg',
    badge: '\uC7AC\uC785\uACE0',
  },
  {
    id: 102,
    group: K.women,
    category: K.outer,
    title: '\uD53C\uCF54 \uCD08\uACBD\uB7C9 \uC5EC\uC131 \uBC14\uB78C\uB9C9\uC774 Sand Beige',
    price: '149,000',
    img: '/img/springcollection/spring3-01.jpg',
  },
  ...bagCatalog,
  ...springCatalog,
  {
    id: 202,
    group: K.acc,
    category: K.hat,
    title: '\uC5D0\uCF54 \uD0C0\uC2AC\uB780 \uBCFC\uCEA1 Olive Green',
    price: '49,000',
    img: '/img/springcollection/spring4-03.jpg',
  },
];

export const GROUP_LABELS = {
  men: K.men,
  women: K.women,
  kids: K.kids,
  acc: K.acc,
  outlet: K.outlet,
};

export const CATEGORY_LABELS = {
  all: '\uC804\uCCB4',
  top: K.top,
  outer: K.outer,
  bottom: K.bottom,
  bag: K.bag,
  hat: K.hat,
  goods: K.goods,
  shoes: K.shoes,
};

export default ProductCatalog;
