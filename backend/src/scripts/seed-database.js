import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDatabase from '../config/database.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Interaction from '../models/Interaction.js';
import Order from '../models/Order.js';

dotenv.config();

// Mock data generators
const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa', 'James', 'Maria', 'William', 'Jennifer', 'Richard', 'Patricia', 'Thomas', 'Linda', 'Charles', 'Barbara', 'Daniel', 'Elizabeth', 'Matthew', 'Susan', 'Anthony', 'Jessica', 'Mark', 'Karen', 'Donald', 'Nancy', 'Steven', 'Betty', 'Paul', 'Margaret', 'Andrew', 'Sandra', 'Joshua', 'Ashley', 'Kenneth', 'Kimberly', 'Kevin', 'Emily', 'Brian', 'Donna', 'George', 'Michelle', 'Timothy', 'Carol', 'Ronald', 'Amanda', 'Edward', 'Melissa'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen'];

const brands = {
  laptops: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI'],
  smartphones: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Oppo'],
  headphones: ['Sony', 'Bose', 'Sennheiser', 'Audio-Technica', 'JBL', 'Beats'],
  smartwatches: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Amazfit'],
  tablets: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Amazon'],
  accessories: ['Anker', 'Logitech', 'Belkin', 'Apple', 'Samsung']
};

const productTemplates = {
  laptops: [
    { base: 'MacBook Pro', specs: { processor: 'M3 Pro', ram: '16GB', storage: '512GB SSD' }, priceRange: [1999, 2499] },
    { base: 'MacBook Air', specs: { processor: 'M3', ram: '8GB', storage: '256GB SSD' }, priceRange: [1099, 1299] },
    { base: 'Dell XPS', specs: { processor: 'Intel i7', ram: '16GB', storage: '512GB SSD' }, priceRange: [1299, 1799] },
    { base: 'HP Spectre', specs: { processor: 'Intel i7', ram: '16GB', storage: '1TB SSD' }, priceRange: [1399, 1699] },
    { base: 'Lenovo ThinkPad', specs: { processor: 'Intel i5', ram: '16GB', storage: '512GB SSD' }, priceRange: [999, 1399] },
    { base: 'Asus ROG', specs: { processor: 'AMD Ryzen 9', ram: '32GB', storage: '1TB SSD' }, priceRange: [1899, 2399] },
    { base: 'Acer Swift', specs: { processor: 'Intel i5', ram: '8GB', storage: '256GB SSD' }, priceRange: [699, 899] },
    { base: 'MSI Gaming', specs: { processor: 'Intel i7', ram: '16GB', storage: '1TB SSD' }, priceRange: [1499, 1999] }
  ],
  smartphones: [
    { base: 'iPhone 15 Pro', specs: { display: '6.1"', storage: '256GB', camera: '48MP' }, priceRange: [999, 1199] },
    { base: 'iPhone 15', specs: { display: '6.1"', storage: '128GB', camera: '48MP' }, priceRange: [799, 899] },
    { base: 'Samsung Galaxy S24', specs: { display: '6.2"', storage: '256GB', camera: '50MP' }, priceRange: [899, 1099] },
    { base: 'Google Pixel 8 Pro', specs: { display: '6.7"', storage: '256GB', camera: '50MP' }, priceRange: [899, 999] },
    { base: 'OnePlus 12', specs: { display: '6.7"', storage: '256GB', camera: '50MP' }, priceRange: [799, 899] },
    { base: 'Xiaomi 14', specs: { display: '6.36"', storage: '256GB', camera: '50MP' }, priceRange: [699, 799] }
  ],
  headphones: [
    { base: 'AirPods Pro', specs: { type: 'In-Ear', feature: 'ANC', battery: '30h' }, priceRange: [249, 279] },
    { base: 'Sony WH-1000XM5', specs: { type: 'Over-Ear', feature: 'ANC', battery: '40h' }, priceRange: [349, 399] },
    { base: 'Bose QuietComfort', specs: { type: 'Over-Ear', feature: 'ANC', battery: '35h' }, priceRange: [299, 349] },
    { base: 'Sennheiser Momentum', specs: { type: 'Over-Ear', feature: 'ANC', battery: '28h' }, priceRange: [329, 379] },
    { base: 'JBL Tune', specs: { type: 'On-Ear', feature: 'Wireless', battery: '50h' }, priceRange: [99, 149] }
  ],
  smartwatches: [
    { base: 'Apple Watch Series 9', specs: { display: '45mm', feature: 'GPS+Cellular', battery: '18h' }, priceRange: [429, 499] },
    { base: 'Samsung Galaxy Watch 6', specs: { display: '44mm', feature: 'GPS+LTE', battery: '40h' }, priceRange: [349, 399] },
    { base: 'Garmin Forerunner', specs: { display: '42mm', feature: 'GPS', battery: '14 days' }, priceRange: [299, 349] },
    { base: 'Fitbit Sense', specs: { display: '40mm', feature: 'Health Tracking', battery: '6 days' }, priceRange: [249, 299] }
  ],
  tablets: [
    { base: 'iPad Pro', specs: { display: '12.9"', storage: '256GB', chip: 'M2' }, priceRange: [1099, 1299] },
    { base: 'iPad Air', specs: { display: '10.9"', storage: '128GB', chip: 'M1' }, priceRange: [599, 749] },
    { base: 'Samsung Galaxy Tab S9', specs: { display: '11"', storage: '256GB', chip: 'Snapdragon 8' }, priceRange: [749, 899] },
    { base: 'Microsoft Surface Pro', specs: { display: '13"', storage: '256GB', chip: 'Intel i5' }, priceRange: [999, 1199] }
  ],
  accessories: [
    { base: 'USB-C Hub', specs: { ports: '7-in-1', feature: '4K HDMI', power: '100W PD' }, priceRange: [39, 69] },
    { base: 'Wireless Charger', specs: { power: '15W', feature: 'Qi Compatible', design: 'Magnetic' }, priceRange: [29, 49] },
    { base: 'Laptop Stand', specs: { material: 'Aluminum', feature: 'Adjustable', compatibility: 'Universal' }, priceRange: [39, 59] },
    { base: 'Phone Case', specs: { material: 'Silicone', feature: 'MagSafe', protection: 'Drop Tested' }, priceRange: [19, 39] },
    { base: 'Screen Protector', specs: { material: 'Tempered Glass', feature: 'Anti-Glare', hardness: '9H' }, priceRange: [9, 19] },
    { base: 'Power Bank', specs: { capacity: '20000mAh', feature: 'Fast Charge', ports: 'USB-C + USB-A' }, priceRange: [39, 69] }
  ]
};

/**
 * Generate realistic product data
 */
const generateProducts = () => {
  const products = [];
  let productId = 1;

  for (const [category, templates] of Object.entries(productTemplates)) {
    const categoryBrands = brands[category];

    templates.forEach(template => {
      // Create 2-3 variants per template
      const variants = Math.floor(Math.random() * 2) + 2;

      for (let v = 0; v < variants; v++) {
        const brand = categoryBrands[Math.floor(Math.random() * categoryBrands.length)];
        const price = template.priceRange[0] + Math.random() * (template.priceRange[1] - template.priceRange[0]);
        const rating = 3.5 + Math.random() * 1.5;

        const product = {
          name: `${brand} ${template.base}${variants > 1 ? ` ${v + 1}` : ''}`,
          description: `Premium ${category.slice(0, -1)} with ${Object.values(template.specs).join(', ')}. Perfect for professionals and enthusiasts.`,
          price: Math.round(price),
          category,
          brand,
          specifications: new Map(Object.entries(template.specs)),
          image: `https://via.placeholder.com/400x400?text=${encodeURIComponent(brand + ' ' + template.base)}`,
          stock: Math.floor(Math.random() * 100) + 10,
          rating: {
            average: parseFloat(rating.toFixed(1)),
            count: Math.floor(Math.random() * 500) + 50
          },
          tags: [category, brand.toLowerCase(), ...Object.keys(template.specs)]
        };

        products.push(product);
        productId++;
      }
    });
  }

  return products.slice(0, 120); // Ensure we have 100+ products
};

/**
 * Generate realistic user data
 */
const generateUsers = (count = 60) => {
  const users = [];
  const categories = Object.keys(productTemplates);

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    // User preferences (some users prefer certain categories)
    const preferredCategories = [];
    const numPreferences = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numPreferences; j++) {
      const cat = categories[Math.floor(Math.random() * categories.length)];
      if (!preferredCategories.includes(cat)) {
        preferredCategories.push(cat);
      }
    }

    users.push({
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      password: 'password123', // Will be hashed by the model
      preferences: {
        categories: preferredCategories,
        priceRange: {
          min: 0,
          max: Math.random() > 0.5 ? 1000 : 2000
        }
      },
      consentToTracking: Math.random() > 0.2 // 80% consent to tracking
    });
  }

  return users;
};

/**
 * Generate realistic interactions
 */
const generateInteractions = (users, products, count = 600) => {
  const interactions = [];
  const interactionTypes = ['view', 'click', 'add_to_cart', 'purchase'];
  const typeWeights = [0.5, 0.3, 0.15, 0.05]; // Distribution of interaction types

  for (let i = 0; i < count; i++) {
    const user = users[Math.floor(Math.random() * users.length)];

    // Users with consent to tracking have more interactions
    if (!user.consentToTracking && Math.random() > 0.3) continue;

    // Users tend to interact with products in their preferred categories
    let product;
    if (user.preferences.categories.length > 0 && Math.random() > 0.3) {
      const prefCategory = user.preferences.categories[Math.floor(Math.random() * user.preferences.categories.length)];
      const categoryProducts = products.filter(p => p.category === prefCategory);
      product = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
    } else {
      product = products[Math.floor(Math.random() * products.length)];
    }

    // Select interaction type based on weights
    let type;
    const rand = Math.random();
    let cumWeight = 0;
    for (let j = 0; j < interactionTypes.length; j++) {
      cumWeight += typeWeights[j];
      if (rand <= cumWeight) {
        type = interactionTypes[j];
        break;
      }
    }

    interactions.push({
      user: user._id,
      product: product._id,
      type,
      metadata: {
        sessionId: `session_${Math.random().toString(36).substr(2, 9)}`,
        source: ['search', 'recommendation', 'category', 'featured'][Math.floor(Math.random() * 4)],
        duration: type === 'view' ? Math.floor(Math.random() * 300) + 10 : null
      }
    });
  }

  return interactions;
};

/**
 * Seed the database
 */
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to database
    await connectDatabase();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Interaction.deleteMany({});
    await Order.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Generate and insert products
    console.log('📦 Generating products...');
    const productData = generateProducts();
    const products = await Product.insertMany(productData);
    console.log(`✅ Created ${products.length} products\n`);

    // Generate and insert users
    console.log('👥 Generating users...');
    const userData = generateUsers(60);
    const users = await User.insertMany(userData);
    console.log(`✅ Created ${users.length} users\n`);

    // Generate and insert interactions
    console.log('🔄 Generating interactions...');
    const interactionData = generateInteractions(users, products, 600);
    const interactions = await Interaction.insertMany(interactionData);
    console.log(`✅ Created ${interactions.length} interactions\n`);

    // Display summary
    console.log('📊 Database Seeding Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Products:     ${products.length}`);
    console.log(`Users:        ${users.length}`);
    console.log(`Interactions: ${interactions.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('Category Distribution:');
    const categoryCounts = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    categoryCounts.forEach(cat => {
      console.log(`  ${cat._id.padEnd(15)} ${cat.count}`);
    });

    console.log('\n✨ Database seeding completed successfully!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
