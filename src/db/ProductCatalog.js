import BagData from './BagData';
import SpringCollection from './SpringCollectionData';

const K = {
  men: 'MEN',
  women: 'WOMEN',
  kids: 'KIDS',
  acc: 'ACC & SHOES',
  outlet: 'OUTLET',
  top: '상의',
  outer: '아우터',
  bottom: '하의',
  bag: '가방',
  hat: '모자',
  goods: '용품',
  shoes: '슈즈',
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
  if (tabTitle.includes('맨투맨')) {
    return { group: K.men, category: K.top };
  }

  if (tabTitle.includes('여성')) {
    return { group: K.women, category: K.outer };
  }

  if (tabTitle.includes('ACC')) {
    return { group: K.acc, category: K.bag };
  }

  return { group: K.men, category: K.outer };
};

const getSpringItemMeta = (item, sectionMeta) => {
  const title = item.title;

  if (title.includes('여성')) {
    if (title.includes('팬츠') || title.includes('스커트')) {
      return { group: K.women, category: K.bottom };
    }

    if (title.includes('맨투맨') || title.includes('티셔츠')) {
      return { group: K.women, category: K.top };
    }

    return { group: K.women, category: K.outer };
  }

  if (sectionMeta.group === K.acc) {
    if (title.includes('에센셜')) {
      return { group: K.acc, category: K.shoes };
    }

    if (title.includes('볼캡') || title.includes('모자')) {
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
    title: '루트 포켓 반팔 폴로 셔츠 Black',
    price: '169,000',
    img: '/img/new_arrivals/new_01.jpg',
    badge: '재입고',
  },
  {
    id: 2,
    group: K.men,
    category: K.bottom,
    title: '루트 버뮤다 팬츠 Rustic Khaki',
    price: '149,000',
    img: '/img/new_arrivals/new_02.jpg',
  },
  {
    id: 3,
    group: K.men,
    category: K.outer,
    title: '피코 초경량 바람막이 Ice Gray',
    price: '149,000',
    img: '/img/new_arrivals/new_03.jpg',
  },
  {
    id: 4,
    group: K.men,
    category: K.top,
    title: '에코 타슬란 볼캡 Smog Khaki',
    price: '49,000',
    img: '/img/new_arrivals/new_04.jpg',
  },
  {
    id: 5,
    group: K.men,
    category: K.outer,
    title: '캠플 유틸리티 바람막이 Rustic Khaki',
    price: '189,000',
    img: '/img/new_arrivals/new_05.jpg',
  },
  {
    id: 6,
    group: K.men,
    category: K.top,
    title: '어들 그래픽 맨투맨 Ice Gray',
    price: '89,000',
    img: '/img/new_arrivals/new_06.jpg',
    badge: 'SOLD OUT',
  },
  {
    id: 7,
    group: K.men,
    category: K.top,
    title: '랜드 후드 티셔츠 Vintage Gray',
    price: '99,000',
    img: '/img/detail/detail01.jpg',
  },
  {
    id: 8,
    group: K.men,
    category: K.bottom,
    title: '루트 카고 팬츠 Wine',
    price: '129,000',
    img: '/img/new_arrivals/new_08.jpg',
  },
  {
    id: 101,
    group: K.women,
    category: K.outer,
    title: '피코 초경량 여성 바람막이 Light Blue',
    price: '149,000',
    img: '/img/springcollection/spring1-04.jpg',
    badge: '재입고',
  },
  {
    id: 102,
    group: K.women,
    category: K.outer,
    title: '피코 초경량 여성 바람막이 Sand Beige',
    price: '149,000',
    img: '/img/springcollection/spring3-01.jpg',
  },
  ...bagCatalog,
  ...springCatalog,
  {
    id: 202,
    group: K.acc,
    category: K.hat,
    title: '에코 타슬란 볼캡 Olive Green',
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
  all: '전체',
  top: K.top,
  outer: K.outer,
  bottom: K.bottom,
  bag: K.bag,
  hat: K.hat,
  goods: K.goods,
  shoes: K.shoes,
};

export default ProductCatalog;
