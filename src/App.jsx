import { SafeIcon } from './components/SafeIcon';
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Available icons: menu, x, chevron-down, chevron-left, chevron-right, shopping-bag, user, globe, facebook, instagram, twitter, youtube, search, arrow-right, arrow-left, plus, minus

// Utility for class merging
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Menu Data
const MEN_MENU = {
  highlights: [
    { name: 'NEW ARRIVALS', count: 72 },
    { name: 'BESTSELLERS', count: 27 },
    { name: "SS26 PRE 'EQUINE'", count: 38 },
    { name: 'HIKING BOOTS', count: 3 },
    { name: 'HIKING BOOTS ++PRE ORDER', count: 8 },
  ],
  readyToWear: [
    { name: 'View All', count: 279 },
    { name: 'New Arrivals', count: 72 },
    { name: 'Outerwear', count: 40 },
    { name: 'Tailoring', count: 16 },
    { name: 'Hoodies & Sweatshirts', count: 40 },
    { name: 'Tops & T-Shirts', count: 51 },
    { name: 'Shirts', count: 22 },
    { name: 'Knitwear', count: 30 },
    { name: 'Bottoms', count: 57 },
  ],
  accessories: [
    { name: 'View All', count: 82 },
    { name: 'Eyewear', count: 7 },
    { name: 'Bags', count: 31 },
    { name: 'Headwear', count: 15 },
    { name: 'Small Accessories', count: 17 },
  ],
  footwear: [
    { name: 'View All', count: 12 },
  ],
  sale: [
    { name: 'View All', count: 195 },
    { name: 'Outerwear', count: 43 },
    { name: 'Tailoring', count: 12 },
    { name: 'Hoodies & Sweatshirts', count: 22 },
    { name: 'Tops & T-shirts', count: 39 },
    { name: 'Shirts', count: 12 },
    { name: 'Knitwear', count: 24 },
    { name: 'Bottoms', count: 33 },
    { name: 'Accessories', count: 32 },
    { name: 'Bags', count: 14 },
    { name: 'Headwear', count: 9 },
    { name: 'Footwear', count: 3 },
  ],
}

const WOMEN_MENU = {
  highlights: [
    { name: 'NEW ARRIVALS', count: 90 },
    { name: 'BESTSELLERS', count: 27 },
    { name: "SS26 PRE 'EQUINE'", count: 38 },
    { name: 'HIKING BOOTS', count: 3 },
    { name: 'HIKING BOOTS ++PRE-ORDER', count: 8 },
  ],
  readyToWear: [
    { name: 'View All', count: 302 },
    { name: 'New Arrivals', count: 90 },
    { name: 'Outerwear', count: 48 },
    { name: 'Tailoring', count: 19 },
    { name: 'Dresses', count: 17 },
    { name: 'Hoodies & Sweatshirts', count: 44 },
    { name: 'Tops & Shirts', count: 45 },
    { name: 'Knitwear', count: 32 },
    { name: 'Skirts & Bottoms', count: 53 },
  ],
  accessories: [
    { name: 'View All', count: 82 },
    { name: 'Eyewear', count: 7 },
    { name: 'Bags', count: 31 },
    { name: 'Headwear', count: 15 },
    { name: 'Small Accessories', count: 17 },
  ],
  footwear: [
    { name: 'View All', count: 12 },
  ],
  sale: [
    { name: 'View All', count: 143 },
    { name: 'Outerwear', count: 43 },
    { name: 'Tailoring', count: 15 },
    { name: 'Dresses', count: 17 },
    { name: 'Hoodies & Sweatshirts', count: 25 },
    { name: 'Tops & Shirts', count: 40 },
    { name: 'Knitwear', count: 24 },
    { name: 'Skirts & Bottoms', count: 36 },
    { name: 'Accessories', count: 33 },
    { name: 'Bags', count: 14 },
    { name: 'Headwear', count: 9 },
    { name: 'Footwear', count: 4 },
  ],
}

const FOOTWEAR_MENU = {
  accessories: [
    { name: 'View All', count: 79 },
    { name: 'Eyewear', count: 7 },
    { name: 'Bags', count: 31 },
    { name: 'Headwear', count: 15 },
    { name: 'Small Accessories', count: 17 },
    { name: 'Objects & Tablewear', count: 3 },
  ],
  footwear: [
    { name: 'View All', count: 18 },
    { name: 'HIKING BOOTS', count: 3 },
    { name: 'HIKING BOOTS ++PRE-ORDER', count: 8 },
  ],
  sale: [
    { name: 'Accessories', count: 32 },
    { name: 'Bags', count: 14 },
    { name: 'Headwear', count: 9 },
    { name: 'Footwear', count: 4 },
    { name: 'Objects & tableware', count: 2 },
  ],
}

const CURRENCIES = [
  'AUD $', 'CAD $', 'CHF ₣', 'CNY ¥', 'CZK Kč', 'DKK kr.', 'EUR €', 'GBP £',
  'HKD $', 'JPY ¥', 'KRW ₩', 'NOK kr.', 'NZD $', 'SEK kr.', 'SGD $', 'USD $'
]

const COUNTRIES = [
  'AFGHANISTAN', 'ALBANIA', 'ALGERIA', 'ANDORRA', 'ANGOLA', 'ARGENTINA', 'ARMENIA',
  'AUSTRALIA', 'AUSTRIA', 'AZERBAIJAN', 'BAHAMAS', 'BAHRAIN', 'BANGLADESH', 'BELARUS',
  'BELGIUM', 'BELIZE', 'BENIN', 'BHUTAN', 'BOLIVIA', 'BOSNIA AND HERZEGOVINA',
  'BOTSWANA', 'BRAZIL', 'BRUNEI', 'BULGARIA', 'BURKINA FASO', 'BURUNDI', 'CABO VERDE',
  'CAMBODIA', 'CAMEROON', 'CANADA', 'CHAD', 'CHILE', 'CHINA', 'COLOMBIA', 'COMOROS',
  'CONGO', 'COSTA RICA', 'CROATIA', 'CUBA', 'CYPRUS', 'CZECH REPUBLIC', 'DENMARK',
  'DJIBOUTI', 'DOMINICA', 'DOMINICAN REPUBLIC', 'ECUADOR', 'EGYPT', 'EL SALVADOR',
  'ESTONIA', 'ESWATINI', 'ETHIOPIA', 'FIJI', 'FINLAND', 'FRANCE', 'GABON', 'GAMBIA',
  'GEORGIA', 'GERMANY', 'GHANA', 'GREECE', 'GUATEMALA', 'GUINEA', 'GUYANA', 'HAITI',
  'HONDURAS', 'HUNGARY', 'ICELAND', 'INDIA', 'INDONESIA', 'IRAN', 'IRAQ', 'IRELAND',
  'ISRAEL', 'ITALY', 'JAMAICA', 'JAPAN', 'JORDAN', 'KAZAKHSTAN', 'KENYA', 'KIRIBATI',
  'KUWAIT', 'KYRGYZSTAN', 'LAOS', 'LATVIA', 'LEBANON', 'LESOTHO', 'LIBERIA', 'LIBYA',
  'LIECHTENSTEIN', 'LITHUANIA', 'LUXEMBOURG', 'MADAGASCAR', 'MALAWI', 'MALAYSIA',
  'MALDIVES', 'MALI', 'MALTA', 'MAURITANIA', 'MAURITIUS', 'MEXICO', 'MONACO', 'MONGOLIA',
  'MONTENEGRO', 'MOROCCO', 'MOZAMBIQUE', 'MYANMAR', 'NAMIBIA', 'NAURU', 'NEPAL',
  'NETHERLANDS', 'NEW ZEALAND', 'NICARAGUA', 'NIGER', 'NIGERIA', 'NORTH KOREA',
  'NORTH MACEDONIA', 'NORWAY', 'OMAN', 'PAKISTAN', 'PALAU', 'PALESTINE', 'PANAMA',
  'PARAGUAY', 'PERU', 'PHILIPPINES', 'POLAND', 'PORTUGAL', 'QATAR', 'ROMANIA', 'RUSSIA',
  'RWANDA', 'SAUDI ARABIA', 'SENEGAL', 'SERBIA', 'SEYCHELLES', 'SINGAPORE', 'SLOVAKIA',
  'SLOVENIA', 'SOMALIA', 'SOUTH AFRICA', 'SOUTH KOREA', 'SOUTH SUDAN', 'SPAIN',
  'SRI LANKA', 'SUDAN', 'SURINAME', 'SWEDEN', 'SWITZERLAND', 'SYRIA', 'TAIWAN',
  'TAJIKISTAN', 'TANZANIA', 'THAILAND', 'TOGO', 'TONGA', 'TRINIDAD AND TOBAGO',
  'TUNISIA', 'TURKEY', 'TURKMENISTAN', 'TUVALU', 'UGANDA', 'UKRAINE', 'UNITED ARAB EMIRATES',
  'UNITED KINGDOM', 'UNITED STATES', 'URUGUAY', 'UZBEKISTAN', 'VANUATU', 'VENEZUELA',
  'VIETNAM', 'YEMEN', 'ZAMBIA', 'ZIMBABWE'
]

// Product Data
const PRODUCTS_BLOCK_1 = [
  { id: 1, name: 'VERTEBRAE JACKET', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?' },
  { id: 2, name: 'Fluxus Crewneck', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?' },
  { id: 3, name: 'VESPERA BAG', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?' },
  { id: 4, name: 'GAIT DENIM TROUSERS', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-5.jpg?' },
]

const PRODUCTS_BLOCK_2 = [
  { id: 5, name: 'HIKING BOOTS', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-5.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?' },
  { id: 6, name: 'LOW HIKING BOOTS', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?' },
  { id: 7, name: 'XYLEM T-SHIRT', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?' },
  { id: 8, name: 'LIQUID METAL TROUSERS', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?' },
]

const FEATURED_BAGS = [
  { id: 'b1', name: 'SHAGYA BAG', price: 420, size: 'os', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?' },
  { id: 'b2', name: 'SHIRE TOTE', price: 320, size: 'os', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?' },
  { id: 'b3', name: 'SOLELY BOX BAG', price: 450, size: 'os', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?' },
  { id: 'b4', name: 'VESPERA BAG', price: 1250, size: 'os', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-5.jpg?' },
]

const HIKING_BOOTS = [
  { id: 'h1', name: 'HIKING BOOTS', price: 720, sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46], image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?' },
  { id: 'h2', name: 'HIKING BOOTS', price: 720, sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46], image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?' },
  { id: 'h3', name: 'LOW HIKING BOOTS', price: 670, sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?' },
  { id: 'h4', name: 'LOW HIKING BOOTS', price: 670, sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-5.jpg?' },
]

const OUTERWEAR_PRODUCTS = [
  { id: 'o1', name: 'GIRTH VEST', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?' },
  { id: 'o2', name: 'VERTEBRAE JACKET', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?' },
  { id: 'o3', name: 'KLADRUBER JACKET', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?' },
  { id: 'o4', name: 'LASING WOOL JACKET', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-5.jpg?' },
]

const ACCESSORIES_PRODUCTS = [
  { id: 'a1', name: 'PLUS CAP', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-5.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?' },
  { id: 'a2', name: 'STEMMA CAP', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?' },
  { id: 'a3', name: 'RELIEF KNIT BEANIE', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?' },
  { id: 'a4', name: 'DEVORE BEANIE', image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?', hoverImage: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?' },
]

// Components
function AnnouncementBar({ onClose }) {
  return (
    <motion.div
      initial={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-black text-white text-center py-3 px-4 text-xs md:text-sm font-medium relative z-50"
    >
      <div className="container mx-auto flex items-center justify-center">
        <span className="flex-1 text-center">End of Season Sale: Further Markdowns. Up to 50% Off</span>
        <button
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider hover:opacity-70 transition-opacity"
        >
          Close
        </button>
      </div>
    </motion.div>
  )
}

function MegaMenu({ isOpen, onClose, category }) {
  if (!isOpen) return null

  const menuData = category === 'men' ? MEN_MENU : category === 'women' ? WOMEN_MENU : FOOTWEAR_MENU

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 top-[110px] md:top-[120px] bg-white shadow-lg z-40 border-b border-gray-200"
      onMouseLeave={onClose}
    >
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Highlights */}
          <div>
            <h3 className="font-bold text-xs uppercase mb-4 text-black">Highlights</h3>
            <ul className="space-y-2">
              {menuData.highlights.map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-xs text-black hover:underline flex justify-between group">
                    <span>{item.name}</span>
                    <span className="text-gray-400">({item.count})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ready To Wear */}
          <div>
            <h3 className="font-bold text-xs uppercase mb-4 text-black">Ready–To–Wear</h3>
            <ul className="space-y-2">
              {menuData.readyToWear.map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-xs text-black hover:underline flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-gray-400">({item.count})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Accessories */}
          <div>
            <h3 className="font-bold text-xs uppercase mb-4 text-black">Accessories and Bags</h3>
            <ul className="space-y-2">
              {menuData.accessories.map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-xs text-black hover:underline flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-gray-400">({item.count})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Footwear */}
          <div>
            <h3 className="font-bold text-xs uppercase mb-4 text-black">Footwear</h3>
            <ul className="space-y-2">
              {menuData.footwear.map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-xs text-black hover:underline flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-gray-400">({item.count})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sale */}
          <div>
            <h3 className="font-bold text-xs uppercase mb-4 text-black">End of Season Sale</h3>
            <ul className="space-y-2">
              {menuData.sale.map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-xs text-black hover:underline flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-gray-400">({item.count})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MobileMenu({ isOpen, onClose }) {
  const [expandedSection, setExpandedSection] = useState(null)

  if (!isOpen) return null

  const sections = [
    { title: 'Men', data: MEN_MENU },
    { title: 'Women', data: WOMEN_MENU },
    { title: 'Footwear & Accessories', data: FOOTWEAR_MENU },
  ]

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <span className="text-sm font-medium uppercase">Menu</span>
          <button onClick={onClose} className="text-sm font-medium uppercase">Close</button>
        </div>

        <div className="flex gap-6 mb-8 text-sm">
          <span className="font-medium border-b-2 border-black pb-1">Men</span>
          <span className="text-gray-500">Women</span>
          <span className="text-gray-500">Footwear & Accessories</span>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-gray-100 pb-4">
              <button
                onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                className="w-full flex items-center justify-between py-2 text-sm font-medium uppercase"
              >
                {section.title}
                <SafeIcon name={expandedSection === section.title ? 'minus' : 'plus'} size={16} />
              </button>

              <AnimatePresence>
                {expandedSection === section.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase mb-2">Highlights</h4>
                        <ul className="space-y-1">
                          {section.data.highlights.map((item, idx) => (
                            <li key={idx} className="text-xs text-gray-600 py-1">{item.name} ({item.count})</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 text-sm">
          <a href="#" className="block uppercase">Universe</a>
          <a href="#" className="block uppercase">Account</a>
          <a href="#" className="block uppercase">Cart (0)</a>
        </div>
      </div>
    </motion.div>
  )
}

function Header({ cartCount = 0 }) {
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-[60px] md:h-[70px]">
            {/* Left Zone */}
            <div className="flex items-center gap-4 md:gap-8 flex-1">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-xs uppercase font-medium"
              >
                <SafeIcon name="menu" size={20} />
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="hidden md:block text-xs uppercase font-medium hover-underline"
              >
                Menu
              </button>

              <nav className="hidden md:flex items-center gap-6">
                {['Men', 'Women', 'Footwear & Accessories'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    onMouseEnter={() => setActiveMenu(item.toLowerCase().split(' ')[0])}
                    className="text-xs uppercase font-medium hover-underline text-black"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Center Zone - Logo */}
            <div className="flex-1 text-center">
              <a href="#" className="inline-block">
                <h1 className="text-lg md:text-xl font-bold tracking-tight uppercase leading-tight">
                  HELIOT EMIL
                </h1>
              </a>
            </div>

            {/* Right Zone */}
            <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
              <a href="#" className="hidden md:block text-xs uppercase font-medium hover-underline">Universe</a>
              <a href="#" className="hidden md:block text-xs uppercase font-medium hover-underline">Account</a>
              <a href="#" className="text-xs uppercase font-medium hover-underline">Cart ({cartCount})</a>
            </div>
          </div>
        </div>
      </header>

      {/* Mega Menus */}
      <AnimatePresence>
        {activeMenu && (
          <MegaMenu
            isOpen={!!activeMenu}
            onClose={() => setActiveMenu(null)}
            category={activeMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

function HeroSection() {
  const [isVisible, setIsVisible] = useState(true)

  const textItems = [
    { text: '07', delay: 0 },
    { text: 'HELIOT', delay: 0.1 },
    { text: '25', delay: 0.2 },
    { text: '13', delay: 0.3 },
    { text: 'EMIL', delay: 0.4 },
    { text: '34', delay: 0.5 },
  ]

  if (!isVisible) return null

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-screen bg-zinc-800 overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?"
          alt="Hero"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 md:top-8 md:right-8 text-white text-xs uppercase tracking-wider z-20 hover:opacity-70 transition-opacity"
      >
        Close
      </button>

      {/* Animated Text */}
      <div className="relative z-10 text-center px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-16 gap-y-2 max-w-4xl mx-auto">
          {textItems.map((item, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 0.6 }}
              className={cn(
                "text-white font-bold uppercase tracking-tighter",
                idx % 2 === 0 ? "text-6xl md:text-8xl lg:text-[150px]" : "text-3xl md:text-5xl lg:text-7xl"
              )}
            >
              {item.text}
            </motion.span>
          ))}
        </div>

        {/* See More Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 md:mt-16 px-8 py-3 border border-white text-white text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
        >
          See More
        </motion.button>
      </div>
    </motion.section>
  )
}

function ProductCard({ product, showPrice = false, showSizes = false, sizes = [], badge = null }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="product-card flex-shrink-0 w-[calc(50%-8px)] md:w-[calc(25%-12px)] snap-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden mb-3">
        {badge && (
          <div className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase px-2 py-1 z-10">
            {badge}
          </div>
        )}

        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Hover Image */}
        <img
          src={product.hoverImage || product.image}
          alt={product.name}
          className={cn(
            "absolute inset-0 w-full h-full object-cover product-image-hover",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      <div className="text-center">
        <h3 className="text-[11px] md:text-xs uppercase font-medium text-black tracking-wide mb-1">
          {product.name}
        </h3>

        {showPrice && (
          <div className="text-sm md:text-base font-medium text-black mb-1">
            {product.price} €
          </div>
        )}

        {showPrice && product.size && (
          <div className="text-[10px] text-gray-500 uppercase">
            {product.size}
          </div>
        )}

        {showSizes && sizes.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {sizes.map((size) => (
              <button
                key={size}
                className="w-6 h-6 text-[10px] border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-colors flex items-center justify-center"
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProductSlider({ products, title = null }) {
  const sliderRef = useRef(null)

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-8 md:py-12 px-4 md:px-6">
      {title && (
        <div className="container mx-auto mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider">{title}</h2>
        </div>
      )}

      <div className="container mx-auto relative">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 shadow-md hidden md:block hover:bg-white transition-colors"
        >
          <SafeIcon name="chevron-left" size={20} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 shadow-md hidden md:block hover:bg-white transition-colors"
        >
          <SafeIcon name="chevron-right" size={20} />
        </button>

        {/* Products */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory md:mx-8"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PromoBanner({ image, mobileImage, href = '#' }) {
  return (
    <section className="w-full">
      <a href={href} className="block">
        <div className="relative aspect-[3/4] md:aspect-[21/9] overflow-hidden">
          <img
            src={image}
            alt="Promo"
            className="hidden md:block w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
          <img
            src={mobileImage || image}
            alt="Promo"
            className="md:hidden w-full h-full object-cover"
          />
        </div>
      </a>
    </section>
  )
}

function FeaturedBagsSlider() {
  const sliderRef = useRef(null)

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-8 md:py-12 px-4 md:px-6 bg-white">
      <div className="container mx-auto relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 shadow-md hidden md:block hover:bg-white transition-colors"
        >
          <SafeIcon name="chevron-left" size={20} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 shadow-md hidden md:block hover:bg-white transition-colors"
        >
          <SafeIcon name="chevron-right" size={20} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory md:mx-8"
        >
          {FEATURED_BAGS.map((product) => (
            <ProductCard key={product.id} product={product} showPrice={true} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HikingBootsSection() {
  const sliderRef = useRef(null)

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-8 md:py-12">
      {/* Banner */}
      <a href="#" className="block mb-8">
        <div className="relative aspect-[3/4] md:aspect-[21/9] overflow-hidden">
          <img
            src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?"
            alt="Hiking Boots"
            className="w-full h-full object-cover"
          />
        </div>
      </a>

      {/* Products */}
      <div className="container mx-auto px-4 md:px-6 relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 shadow-md hidden md:block hover:bg-white transition-colors"
        >
          <SafeIcon name="chevron-left" size={20} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 shadow-md hidden md:block hover:bg-white transition-colors"
        >
          <SafeIcon name="chevron-right" size={20} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory md:mx-8"
        >
          {HIKING_BOOTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showPrice={true}
              showSizes={true}
              sizes={product.sizes}
              badge="++PRE-ORDER"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('EUR €')
  const [selectedCountry, setSelectedCountry] = useState('GERMANY')

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-black text-white py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-sm md:text-base uppercase tracking-wider mb-4">Newsletter</h2>
          <p className="text-xs md:text-sm text-gray-300 mb-8">
            Sign up to stay updated on new collections the latest news on HELIOT EMIL.
          </p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="EMAIL"
              className="w-full bg-transparent border border-white text-white px-4 py-3 text-xs uppercase placeholder-gray-500 focus:outline-none focus:border-gray-300"
            />
            <input
              type="tel"
              placeholder="PHONE"
              className="w-full bg-transparent border border-white text-white px-4 py-3 text-xs uppercase placeholder-gray-500 focus:outline-none focus:border-gray-300"
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-3 text-xs uppercase font-medium hover:bg-gray-200 transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company */}
          <div>
            <h3 className="text-xs uppercase font-bold mb-4 flex items-center justify-between md:block">
              Company
              <span className="md:hidden text-[10px] font-normal">CLOSE</span>
            </h3>
            <ul className="space-y-2">
              {['About', 'Contact us', 'Stockist', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-black hover:underline block py-1">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="text-xs uppercase font-bold mb-4">Customer Services</h3>
            <ul className="space-y-2">
              {['FAQs', 'Shipping', 'Returns', 'Terms and Conditions', 'Privacy Policy', 'Account'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-black hover:underline block py-1">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-xs uppercase font-bold mb-4">Socials</h3>
            <ul className="space-y-2">
              {['Facebook', 'Instagram', 'TikTok'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-black hover:underline block py-1">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Currency & Country Selectors */}
        <div className="flex flex-col md:flex-row gap-4 mt-12 pt-8 border-t border-gray-200">
          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="w-full md:w-[200px] flex items-center justify-between border border-gray-300 px-3 py-2 text-xs uppercase"
            >
              {selectedCurrency}
              <SafeIcon name="chevron-down" size={14} />
            </button>

            {currencyOpen && (
              <div className="absolute bottom-full mb-1 left-0 w-full md:w-[200px] bg-white border border-gray-300 max-h-48 overflow-y-auto z-20">
                {CURRENCIES.map((currency) => (
                  <button
                    key={currency}
                    onClick={() => {
                      setSelectedCurrency(currency)
                      setCurrencyOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 text-xs uppercase hover:bg-gray-100"
                  >
                    {currency}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Country Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCountryOpen(!countryOpen)}
              className="w-full md:w-[250px] flex items-center justify-between border border-gray-300 px-3 py-2 text-xs uppercase"
            >
              {selectedCountry}
              <SafeIcon name="chevron-down" size={14} />
            </button>

            {countryOpen && (
              <div className="absolute bottom-full mb-1 left-0 w-full md:w-[250px] bg-white border border-gray-300 max-h-48 overflow-y-auto z-20">
                {COUNTRIES.map((country) => (
                  <button
                    key={country}
                    onClick={() => {
                      setSelectedCountry(country)
                      setCountryOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 text-xs uppercase hover:bg-gray-100"
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-wider">
            <a href="#" className="hover:underline">Newsletter</a>
            <span>© 2026 HELIOT EMIL</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  )
}


function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>
        {showAnnouncement && (
          <AnnouncementBar onClose={() => setShowAnnouncement(false)} />
        )}
      </AnimatePresence>

      <Header cartCount={cartCount} />

      <main>
        <HeroSection />

        {/* Block 1: 4 Products */}
        <ProductSlider products={PRODUCTS_BLOCK_1} />

        {/* Block 2: 4 Products */}
        <ProductSlider products={PRODUCTS_BLOCK_2} />

        {/* SS26 PRE Campaign Banner */}
        <PromoBanner
          image="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?"
          mobileImage="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?"
        />

        {/* Featured Bags with Prices */}
        <FeaturedBagsSlider />

        {/* Bags Collection Banner */}
        <PromoBanner
          image="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-5.jpg?"
          mobileImage="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?"
        />

        {/* Hiking Boots Section */}
        <HikingBootsSection />

        {/* Outerwear Section */}
        <ProductSlider products={OUTERWEAR_PRODUCTS} title="Outerwear" />

        {/* Accessories Section */}
        <ProductSlider products={ACCESSORIES_PRODUCTS} title="Accessories" />

        {/* Women's Section Banner */}
        <PromoBanner
          image="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?"
          mobileImage="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?"
        />

        {/* More Products */}
        <ProductSlider products={PRODUCTS_BLOCK_1} />
        <ProductSlider products={PRODUCTS_BLOCK_2} />
      </main>

      <Footer />
    </div>
  )
}

export default App
