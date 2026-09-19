import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { products } from '../app/products.ts';

const labelContent = {
  schweiz: {
    description: 'Die pure Natur der Schweizer Alpen. Diese harmonische Kräutermischung bringt den unverfälschten Geschmack der Berge in deine Küche.',
    ingredients: [['Salz', '60%'], ['Knoblauch', '10%'], ['Basilikum', '10%'], ['Oregano', '10%'], ['Thymian', '5%'], ['Majoran', '5%']],
  },
  italien: {
    description: 'Sonnige Kräuter aus dem Mittelmeerraum. Diese feine Mischung verleiht deinen Gerichten den authentischen Geschmack Italiens – einfach, natürlich, köstlich.',
    ingredients: [['Basilikum', '30%'], ['Oregano', '30%'], ['Thymian', '15%'], ['Rosmarin', '15%'], ['Majoran', '10%']],
  },
  tuerkei: {
    description: 'Ein Hauch Orient in deiner Küche. Unsere Baharat-Mischung bringt die vielfältigen Aromen der Türkei in traditionelle und moderne Gerichte.',
    ingredients: [['Schwarzer Pfeffer', '15%'], ['Paprika', '15%'], ['Kümmel', '15%'], ['Ingwer', '10%'], ['Muskatnuss', '10%'], ['Koriander', '10%'], ['Zimt', '5%'], ['Nelken', '5%'], ['Kardamom', '5%']],
  },
  indien: {
    description: 'Aromatisch, warm und voller Tradition. Unsere Garam-Masala-Mischung vereint die reichen Gewürze Indiens zu einem einzigartigen Geschmackserlebnis.',
    ingredients: [['Koriandersamen', '30%'], ['Schwarzer Pfeffer', '20%'], ['Kreuzkümmel', '16%'], ['Zimt', '14%'], ['Fenchelsamen', '10%'], ['Nelken', '5%'], ['Sternanis', '3%'], ['Schwarzer Kardamom', '2%']],
  },
};

void test('product detail content matches the printed labels', () => {
  for (const product of products) {
    assert.deepEqual(
      { description: product.description, ingredients: product.ingredients },
      labelContent[product.id],
      product.country,
    );
    assert.equal(product.allergens, 'Kann Spuren von Senf, Sellerie, Sesam und Gluten enthalten.', product.country);
  }
});

void test('each country detail page uses its matching ingredient image', async () => {
  const expectedImages = {
    schweiz: '/images/details/schweiz.webp',
    italien: '/images/details/italien.webp',
    tuerkei: '/images/details/tuerkei.webp',
    indien: '/images/details/indien.webp',
  };

  for (const product of products) {
    assert.equal(product.detailImage, expectedImages[product.id], product.country);
    await access(new URL(`../public${product.detailImage}`, import.meta.url));
  }
});
