// Категории
export const categories = [
  { id: 'new', name: 'Новинки' },
  { id: 'burgers', name: 'Бургеры' },
  { id: 'rolls', name: 'Роллы' },
  { id: 'fries', name: 'Картофель и закуски' },
  { id: 'drinks', name: 'Напитки и десерты' },
  { id: 'sauces', name: 'Соусы' },
];

// Подкатегории
export const subCategories = {
  new: [
    { id: 'burgers_rolls', name: 'Бургеры и роллы' },
    { id: 'fries', name: 'Картофель и закуски' },
  ],
  burgers: [
    { id: 'premium', name: 'Премиум' },
    { id: 'beef', name: 'Говядина' },
  ],
  rolls: [
    { id: 'rolls', name: 'Роллы' },
  ],
  fries: [
    { id: 'potatoes', name: 'Картофель' },
    { id: 'snacks', name: 'Закуски' },
  ],
  drinks: [
    { id: 'cold', name: 'Холодные напитки' },
    { id: 'desserts', name: 'Десерты' },
  ],
  sauces: [
    { id: 'sauces', name: 'Соусы' },
  ],
};

// Товары
export const products = [
  { id: 1, name: 'Ангус Чеддер-Бекон', description: 'Говядина Ангус, чеддер, бекон, томаты, лук и соус Чеддер', price: 539.99, category: 'new', subcategory: 'burgers_rolls', image: '/images/angus-cheddar.png', isNew: true, isPopular: true, nutrition: { calories: 890, proteins: 52, fats: 58, carbs: 50 } },

  { id: 2, name: 'Воппер Смоки Чеддер', description: 'Говяжья котлета на гриле, бекон, чеддер и соус Смоки Барбекю', price: 374.99, category: 'new', subcategory: 'burgers_rolls', image: '/images/whopper-smoky.png', isNew: true, isPopular: true, nutrition: { calories: 720, proteins: 34, fats: 46, carbs: 48 } },

  { id: 3, name: 'Ангус Пармеджано', description: 'Говядина Ангус, моцарелла, пармезан, томаты и соус Песто', price: 529.99, category: 'burgers', subcategory: 'premium', image: '/images/angus-parm.png', isNew: false, isPopular: true, nutrition: { calories: 810, proteins: 48, fats: 52, carbs: 45 } },

  { id: 4, name: 'Воппер', description: 'Сочная говяжья котлета на гриле, свежие овощи, фирменный соус', price: 309.99, category: 'burgers', subcategory: 'beef', image: '/images/whopper.png', isNew: false, isPopular: true, nutrition: { calories: 670, proteins: 30, fats: 42, carbs: 50 } },

  { id: 5, name: 'Чизбургер', description: 'Говяжья котлета с сыром, огурцами и кетчупом', price: 109.99, category: 'burgers', subcategory: 'beef', image: '/images/cheeseburger.png', isNew: false, isPopular: true, nutrition: { calories: 320, proteins: 18, fats: 16, carbs: 32 } },

  { id: 6, name: 'Чикен Ролл Смоки Чеддер', description: 'Куриное филе, бекон, чеддер и соус в лепёшке', price: 349.99, category: 'rolls', subcategory: 'rolls', image: '/images/chicken-roll.png', isNew: false, isPopular: true, nutrition: { calories: 520, proteins: 28, fats: 28, carbs: 40 } },

  { id: 7, name: 'Кинг Фри', description: 'Хрустящий картофель фри (средняя порция)', price: 114.99, category: 'fries', subcategory: 'potatoes', image: '/images/king-fries.png', isNew: false, isPopular: true, nutrition: { calories: 360, proteins: 4, fats: 18, carbs: 48 } },

  { id: 8, name: 'Картофель Деревенский', description: 'Картофельные дольки со специями (средняя порция)', price: 134.99, category: 'fries', subcategory: 'potatoes', image: '/images/potatoes.png', isNew: false, isPopular: false, nutrition: { calories: 310, proteins: 4, fats: 16, carbs: 38 } },

  { id: 9, name: 'Наггетсы', description: 'Куриные наггетсы в панировке (9 штук)', price: 159.99, category: 'fries', subcategory: 'snacks', image: '/images/nuggets.png', isNew: false, isPopular: true, nutrition: { calories: 320, proteins: 20, fats: 18, carbs: 20 } },

  { id: 10, name: 'Эвервесс Кола', description: 'Газированный напиток Кола (0.5л)', price: 184.99, category: 'drinks', subcategory: 'cold', image: '/images/evervess-cola.png', isNew: false, isPopular: false, nutrition: { calories: 215, proteins: 0, fats: 0, carbs: 54 } },

  { id: 11, name: 'Пирожок с вишней', description: 'Горячий пирожок с вишнёвой начинкой (1 штука)', price: 164.99, category: 'drinks', subcategory: 'desserts', image: '/images/pie-cherry.png', isNew: false, isPopular: false, nutrition: { calories: 280, proteins: 4, fats: 14, carbs: 36 } },

  { id: 12, name: 'Соус Барбекю', description: 'Классический соус Барбекю (30г)', price: 69.99, category: 'sauces', subcategory: 'sauces', image: '/images/sauce-bbq.png', isNew: false, isPopular: false, nutrition: { calories: 80, proteins: 1, fats: 4, carbs: 10 } },
];

// Промо
export const promotions = [
  { id: 1, title: '9 за 99', subtitle: '9 наггетсов за 99 рублей!', description: 'Только сейчас — 9 куриных наггетсов по специальной цене', image: '/images/promo-9.png', link: '/menu' },
  { id: 2, title: 'Ангус Пита Пармеджано', subtitle: 'Попробуй новинку!', description: 'Пита с говядиной Ангус, моцареллой и соусом песто', image: '/images/promo-angus.png', link: '/menu' },
  { id: 3, title: 'Он вернулся! 👑', subtitle: 'Биг Кинг снова в деле!', description: 'Классический Биг Кинг по старой доброй цене', image: '/images/promo-bigking.png', link: '/menu' },
];