import React, { useState, useEffect } from 'react';
import { Calculator, Car, TrendingDown, TrendingUp, Info, Plus, X, CheckCircle } from 'lucide-react';

const CarBenefitCalculator = () => {
  const [selectedCars, setSelectedCars] = useState(['no-car']);
  const [customCar, setCustomCar] = useState({ name: '', taxValue: '', salaryAllowance: '' });
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(48.14);
  const [activeSection, setActiveSection] = useState('learn');

  // Predefined car options
  const carOptions = {
    'no-car': {
      name: 'ללא רכב צמוד',
      taxValue: 0,
      greenBenefit: 0,
      salaryAllowance: 3500,
      description: 'מקבלים את מלוא סכום הטבת הרכב',
      color: 'bg-green-500'
    },
    'byd-atto3-comfort': {
      name: 'BYD ATTO 3 COMFORT',
      taxValue: 4253,
      greenBenefit: 1350,
      salaryAllowance: 1086,
      description: 'רכב חשמלי סיני חסכוני',
      color: 'bg-red-500'
    },
    'byd-atto3-design': {
      name: 'BYD ATTO 3 DESIGN',
      taxValue: 4402,
      greenBenefit: 1350,
      salaryAllowance: 838,
      description: 'גרסה מעוצבת של ATTO 3',
      color: 'bg-red-600'
    },
    'byd-seal-design': {
      name: 'BYD SEAL DESIGN',
      taxValue: 5431,
      greenBenefit: 1350,
      salaryAllowance: 1758,
      description: 'סדאן חשמלי אלגנטי',
      color: 'bg-blue-500'
    },
    'byd-seal-excellence': {
      name: 'BYD SEAL EXCELLENCE 4X4',
      taxValue: 5853,
      greenBenefit: 1350,
      salaryAllowance: 1397,
      description: 'גרסה מתקדמת עם הנעה כפולה',
      color: 'bg-blue-600'
    },
    'byd-sealion7-boost': {
      name: 'BYD SEAL Sealion 7 Boost',
      taxValue: 5431,
      greenBenefit: 1350,
      salaryAllowance: -550,
      description: 'דורש תשלום נוסף!',
      color: 'bg-red-700'
    },
    'byd-sealion7-comfort': {
      name: 'BYD SEAL Sealion 7 Comfort',
      taxValue: 5853,
      greenBenefit: 1350,
      salaryAllowance: 1220,
      description: 'SUV משפחתי נוח',
      color: 'bg-blue-700'
    },
    'geely-ex5-pro': {
      name: 'GEELY EX 5 PRO',
      taxValue: 4015,
      greenBenefit: 1350,
      salaryAllowance: 1393,
      description: 'רכב חסכוני ואמין',
      color: 'bg-orange-500'
    },
    'geely-ex5-tech': {
      name: 'GEELY EX 5 TECH',
      taxValue: 4164,
      greenBenefit: 1350,
      salaryAllowance: 1110,
      description: 'גרסה טכנולוגית מתקדמת',
      color: 'bg-orange-600'
    },
    'hyundai-ioniq5-limited': {
      name: 'Hyundai IONIQ 5 LIMITED',
      taxValue: 6303,
      greenBenefit: 1350,
      salaryAllowance: 1084,
      description: 'גרסת הדגל של יונדאי',
      color: 'bg-purple-500'
    },
    'hyundai-ioniq5-premium': {
      name: 'Hyundai IONIQ 5 PREMIUM',
      taxValue: 5327,
      greenBenefit: 1350,
      salaryAllowance: 2177,
      description: 'בחירה פופולרית ויעילה',
      color: 'bg-purple-600'
    },
    'hyundai-ioniq5-ultimate': {
      name: 'Hyundai IONIQ 5 ULTIMATE',
      taxValue: 5828,
      greenBenefit: 1350,
      salaryAllowance: 1745,
      description: 'גרסה מתקדמת יותר',
      color: 'bg-purple-700'
    },
    'lynkco-02-halo': {
      name: 'LYNK&CO 02 HALO',
      taxValue: 4387,
      greenBenefit: 1350,
      salaryAllowance: 550,
      description: 'עיצוב סקנדינבי ייחודי',
      color: 'bg-gray-500'
    },
    'lynkco-02-pro': {
      name: 'LYNK&CO 02 PRO',
      taxValue: 4216,
      greenBenefit: 1350,
      salaryAllowance: 666,
      description: 'רכב מעוצב ומתקדם',
      color: 'bg-gray-600'
    },
    'tesla-model3-lr': {
      name: 'Tesla MODEL 3 LONG RANGE',
      taxValue: 6050,
      greenBenefit: 1350,
      salaryAllowance: 0,
      description: 'טסלה קלאסית, צבע לבן',
      color: 'bg-red-500'
    },
    'tesla-modely-lr': {
      name: 'Tesla MODEL Y LONG RANGE',
      taxValue: 7126,
      greenBenefit: 1350,
      salaryAllowance: -1063,
      description: 'SUV טסלה, דורש תשלום!',
      color: 'bg-red-700'
    },
    'tesla-model3-rwd': {
      name: 'Tesla MODEL 3 RWD',
      taxValue: 5235,
      greenBenefit: 1350,
      salaryAllowance: -999,
      description: 'טסלה בסיסית, דורש תשלום!',
      color: 'bg-red-600'
    },
    'tesla-modely-rwd': {
      name: 'Tesla MODEL Y RWD',
      taxValue: 6050,
      greenBenefit: 1350,
      salaryAllowance: 170,
      description: 'טסלה SUV, צבע לבן',
      color: 'bg-red-500'
    },
    'volvo-ex30': {
      name: 'Volvo EX30 SM',
      taxValue: 5702,
      greenBenefit: 1350,
      salaryAllowance: -573,
      description: 'וולוו קומפקטי, דורש תשלום',
      color: 'bg-blue-500'
    },
    'xpeng-g9-diamond': {
      name: 'XPENG G9 DIAMOND X',
      taxValue: 8804,
      greenBenefit: 1350,
      salaryAllowance: -2345,
      description: 'גרסת יוקרה, עלות גבוהה מאוד!',
      color: 'bg-red-800'
    },
    'xpeng-g6-lr': {
      name: 'XPENG G6 LONG RANGE',
      taxValue: 5654,
      greenBenefit: 1350,
      salaryAllowance: 1056,
      description: 'רכב חשמלי סיני מתקדם',
      color: 'bg-indigo-500'
    },
    'xpeng-p7-lr': {
      name: 'XPENG P7 LONG RANGE',
      taxValue: 5332,
      greenBenefit: 1350,
      salaryAllowance: 1285,
      description: 'סדאן חשמלי מעוצב',
      color: 'bg-indigo-600'
    },
    'xpeng-g9-standard': {
      name: 'XPENG G9 STANDARD',
      taxValue: 7068,
      greenBenefit: 1350,
      salaryAllowance: -306,
      description: 'גרסה בסיסית של G9',
      color: 'bg-indigo-700'
    },
    'zeekr-x-byond': {
      name: 'ZEEKR X BYOND',
      taxValue: 4637,
      greenBenefit: 1350,
      salaryAllowance: 1071,
      description: 'מותג פרימיום של גילי',
      color: 'bg-yellow-600'
    },
    'zeekr-x-lr': {
      name: 'ZEEKR X LONG RANGE',
      taxValue: 7068,
      greenBenefit: 1350,
      salaryAllowance: -1631,
      description: 'גרסה מתקדמת, עלות גבוהה!',
      color: 'bg-yellow-700'
    }
  };

  const calculateImpact = (car) => {
    const carBenefit = car.taxValue - car.greenBenefit;
    const baseCarBenefit = 0; // No car baseline
    const baseAllowance = 3500; // No car allowance
    
    const allowanceDiff = car.salaryAllowance - baseAllowance;
    const benefitDiff = carBenefit - baseCarBenefit;
    
    const allowanceEffect = allowanceDiff * (1 - effectiveTaxRate / 100);
    const benefitEffect = -benefitDiff * (effectiveTaxRate / 100);
    
    return allowanceEffect + benefitEffect;
  };

  const addCustomCar = () => {
    if (customCar.name && customCar.taxValue && customCar.salaryAllowance) {
      const carId = `custom-${Date.now()}`;
      carOptions[carId] = {
        name: customCar.name,
        taxValue: parseInt(customCar.taxValue),
        greenBenefit: 1350, // Assuming green benefit
        salaryAllowance: parseInt(customCar.salaryAllowance),
        description: 'רכב מותאם אישית',
        color: 'bg-gray-600',
        isCustom: true
      };
      setSelectedCars([...selectedCars, carId]);
      setCustomCar({ name: '', taxValue: '', salaryAllowance: '' });
      setShowCustomForm(false);
    }
  };

  const removeCustomCar = (carId) => {
    if (carOptions[carId]?.isCustom) {
      delete carOptions[carId];
      setSelectedCars(selectedCars.filter(id => id !== carId));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-bold" dir="rtl">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-black mb-6 text-white drop-shadow-lg transform -rotate-1">
              מחשבון<br />הטבות רכב
            </h1>
            <div className="bg-black text-white p-6 transform rotate-1 border-4 border-white shadow-2xl">
              <p className="text-xl md:text-2xl">
                כל הרכבים במיקרוסופט ישראל הם חשמליים ונהנים מהטבה ירוקה של 1,350 ₪
              </p>
            </div>
            <div className="mt-8 text-white text-lg">
              <p>מדריך פשוט להבנת הטבות הרכב במיקרוסופט ישראל</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black text-white sticky top-0 z-50 border-b-4 border-yellow-400">
        <div className="container mx-auto px-6">
          <nav className="flex justify-center space-x-reverse space-x-8 py-4">
            {[
              { id: 'learn', label: 'איך זה עובד?', icon: Info },
              { id: 'compare', label: 'השוואת רכבים', icon: Car },
              { id: 'calculate', label: 'מחשבון', icon: Calculator }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center space-x-reverse space-x-2 px-6 py-3 font-bold text-lg border-2 transition-all transform hover:scale-105 ${
                  activeSection === id
                    ? 'bg-yellow-400 text-black border-yellow-400'
                    : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
                }`}
              >
                <Icon size={24} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Learn Section */}
        {activeSection === 'learn' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 transform -rotate-1">איך זה עובד?</h2>
              <div className="bg-yellow-400 p-6 border-4 border-black shadow-xl transform rotate-1">
                <p className="text-2xl">הכל מתחיל מ-3,500 ₪ בחודש</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* שווי מס Explanation */}
              <div className="bg-red-100 border-4 border-red-500 p-8 shadow-xl">
                <h3 className="text-3xl font-black mb-4 text-red-700">שווי מס</h3>
                <div className="space-y-4">
                  <p className="text-lg">זה הערך שמתווסף לשכר שלך למטרות חישוב מס</p>
                  <div className="bg-white p-4 border-2 border-red-500">
                    <p className="font-bold">חישוב: ערך מס הרכב - הטבה ירוקה (1,350 ₪)</p>
                  </div>
                  <p className="text-red-700">ככל שהערך גבוה יותר, אתה משלם יותר מס!</p>
                </div>
              </div>

              {/* אחזקת רכב Explanation */}
              <div className="bg-green-100 border-4 border-green-500 p-8 shadow-xl">
                <h3 className="text-3xl font-black mb-4 text-green-700">אחזקת רכב</h3>
                <div className="space-y-4">
                  <p className="text-lg">זה מה שנשאר לך מ-3,500 ₪ אחרי שהחברה ניכתה עלויות</p>
                  <div className="bg-white p-4 border-2 border-green-500">
                    <p className="font-bold">3,500 ₪ - עלויות רכב = אחזקת רכב</p>
                  </div>
                  <p className="text-green-700">זה הכסף שאתה באמת מקבל בשכר!</p>
                </div>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="bg-black text-white p-8 border-4 border-yellow-400 shadow-xl">
              <h3 className="text-3xl font-black mb-6 text-yellow-400">הנוסחה</h3>
              <div className="bg-white text-black p-6 font-mono text-lg border-2 border-yellow-400">
                <p>השפעה על השכר = (אחזקת רכב - 3,500) × (1 - שיעור מס) - שווי מס × שיעור מס</p>
              </div>
              <div className="mt-4 text-yellow-200">
                <p>• אם התוצאה חיובית - השכר עולה</p>
                <p>• אם התוצאה שלילית - השכר יורד</p>
              </div>
            </div>
          </div>
        )}

        {/* Compare Section */}
        {activeSection === 'compare' && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-black mb-4 transform -rotate-1">השוואת רכבים</h2>
              <p className="text-xl">בחר רכבים להשוואה וראה מיד את ההשפעה על השכר</p>
            </div>

            {/* Explanation Banner */}
            <div className="bg-blue-100 border-4 border-blue-500 p-6 shadow-xl mb-8">
              <h3 className="text-2xl font-black text-blue-700 mb-4">איך לקרוא את המספרים?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-blue-800 mb-2">🟢 מספר חיובי (+150 ₪)</h4>
                  <p className="text-sm">השכר שלך עולה ב-150 ₪ לחודש בהשוואה לאי-קבלת רכב</p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 mb-2">🔴 מספר שלילי (-300 ₪)</h4>
                  <p className="text-sm">השכר שלך יורד ב-300 ₪ לחודש בהשוואה לאי-קבלת רכב</p>
                </div>
              </div>
              <div className="mt-4 bg-white p-4 border-2 border-blue-500">
                <p className="font-bold text-center">בסיס ההשוואה: ללא רכב צמוד = 3,500 ₪ מלא לכל חודש</p>
              </div>
            </div>

            {/* Top Insights Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-100 border-4 border-green-500 p-6 shadow-xl">
                <h3 className="text-xl font-black text-green-700 mb-3">💰 הפסד הקטן ביותר</h3>
                <div className="space-y-2">
                  <p className="font-bold">Hyundai IONIQ 5 PREMIUM</p>
                  <p className="text-sm">מקבל: 2,177 ₪ במקום 3,500 ₪</p>
                  <p className="text-green-600 font-bold text-lg">הפסד: -2,600 ₪ לחודש</p>
                  <p className="text-xs text-gray-600">הכי קרוב לאפס - הבחירה הטובה ביותר</p>
                </div>
              </div>
              
              <div className="bg-orange-100 border-4 border-orange-500 p-6 shadow-xl">
                <h3 className="text-xl font-black text-orange-700 mb-3">⚖️ בחירה פופולרית</h3>
                <div className="space-y-2">
                  <p className="font-bold">XPENG P7 LONG RANGE</p>
                  <p className="text-sm">מקבל: 1,285 ₪ במקום 3,500 ₪</p>
                  <p className="text-orange-600 font-bold text-lg">הפסד: -3,066 ₪ לחודש</p>
                  <p className="text-xs text-gray-600">רכב איכותי אבל עולה יקר</p>
                </div>
              </div>

              <div className="bg-red-100 border-4 border-red-500 p-6 shadow-xl">
                <h3 className="text-xl font-black text-red-700 mb-3">⚠️ רכבים יקרים</h3>
                <div className="space-y-2">
                  <p className="font-bold">Tesla Model Y LR</p>
                  <p className="text-sm">משלם מהכיס: -1,063 ₪</p>
                  <p className="text-red-600 font-bold text-lg">הפסד: -5,146 ₪ לחודש</p>
                  <p className="text-xs text-gray-600">דורש תשלום נוסף + מס גבוה</p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Side - Car Selection */}
              <div className="lg:col-span-2">
                <div className="bg-white border-4 border-black p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black">בחר רכבים להשוואה</h3>
                    <div className="bg-blue-500 text-white px-4 py-2 border-2 border-black font-bold">
                      {selectedCars.length} נבחרו
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      { id: 'all', label: 'הכל', color: 'bg-gray-500' },
                      { id: 'profitable', label: 'משתלם', color: 'bg-green-500' },
                      { id: 'balanced', label: 'מאוזן', color: 'bg-yellow-500' },
                      { id: 'expensive', label: 'יקר', color: 'bg-red-500' }
                    ].map(filter => (
                      <button
                        key={filter.id}
                        className={`px-4 py-2 border-2 border-black font-bold text-sm ${filter.color} text-white hover:scale-105 transform transition-all`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Car Grid */}
                  <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {Object.entries(carOptions).map(([id, car]) => {
                      const impact = calculateImpact(car);
                      const isSelected = selectedCars.includes(id);
                      
                      return (
                        <div
                          key={id}
                          className={`border-2 p-4 cursor-pointer transition-all transform hover:scale-102 ${
                            isSelected 
                              ? 'border-yellow-400 bg-yellow-50 shadow-lg' 
                              : 'border-gray-300 bg-white hover:border-black hover:shadow-md'
                          }`}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedCars(selectedCars.filter(carId => carId !== id));
                            } else {
                              setSelectedCars([...selectedCars, id]);
                            }
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-black text-sm mb-1">{car.name}</h4>
                              <p className="text-xs text-gray-600 mb-3">{car.description}</p>
                              
                              {/* Clear Impact Display */}
                              <div className="bg-gray-50 p-3 border border-gray-200 mb-3">
                                {id === 'no-car' ? (
                                  <div className="text-center">
                                    <p className="font-bold text-green-700">🎯 בסיס ההשוואה</p>
                                    <p className="text-lg font-black">3,500 ₪ מלא</p>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="text-xs">אתה מקבל:</span>
                                      <span className="font-bold">{car.salaryAllowance.toLocaleString()} ₪</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="text-xs">במקום:</span>
                                      <span className="text-gray-500">3,500 ₪</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between items-center">
                                      <span className="text-xs font-bold">השפעה נטו:</span>
                                      <span className={`font-black text-lg ${
                                        impact > 0 ? 'text-green-600' : impact < 0 ? 'text-red-600' : 'text-gray-600'
                                      }`}>
                                        {impact > 0 ? '+' : ''}{Math.round(impact)} ₪
                                      </span>
                                    </div>
                                    {impact < 0 && (
                                      <p className="text-xs text-red-600 mt-1">
                                        {Math.abs(impact) > 1000 ? 'הפסד גדול!' : 'הפסד קטן'}
                                      </p>
                                    )}
                                    {impact > 0 && (
                                      <p className="text-xs text-green-600 mt-1">רווח!</p>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <div className="mr-3">
                              {isSelected ? (
                                <CheckCircle size={20} className="text-yellow-500" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Custom Car Button */}
                  <button 
                    className="w-full mt-4 border-2 border-dashed border-gray-400 p-4 hover:border-black transition-all transform hover:scale-102"
                    onClick={() => setShowCustomForm(true)}
                  >
                    <Plus size={24} className="mx-auto mb-2 text-gray-400" />
                    <span className="font-bold">הוסף רכב מותאם</span>
                  </button>
                </div>
              </div>

              {/* Right Side - Live Results */}
              <div className="lg:col-span-1">
                <div className="bg-white border-4 border-black shadow-xl sticky top-24">
                  <div className="bg-black text-white p-4">
                    <h3 className="text-xl font-black">תוצאות השוואה</h3>
                  </div>
                  
                  {selectedCars.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Car size={48} className="mx-auto mb-4" />
                      <p className="font-bold">בחר רכבים כדי לראות השוואה</p>
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {selectedCars
                          .map(carId => ({
                            id: carId,
                            car: carOptions[carId],
                            impact: calculateImpact(carOptions[carId])
                          }))
                          .sort((a, b) => b.impact - a.impact)
                          .map(({ id, car, impact }, index) => (
                            <div 
                              key={id}
                              className={`p-4 border-2 ${
                                index === 0 && id !== 'no-car' ? 'border-green-500 bg-green-50' : 
                                impact < 0 ? 'border-red-300 bg-red-50' : 
                                impact > 0 ? 'border-green-300 bg-green-50' :
                                'border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-sm">{car.name}</h4>
                                <button
                                  onClick={() => setSelectedCars(selectedCars.filter(carId => carId !== id))}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                              
                              {id === 'no-car' ? (
                                <div className="text-center">
                                  <p className="text-lg font-black text-green-700">🎯 בסיס</p>
                                  <p className="text-sm">3,500 ₪ מלא לחודש</p>
                                </div>
                              ) : (
                                <>
                                  <div className="bg-white p-3 border border-gray-200 mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>אתה מקבל:</span>
                                      <span className="font-bold">{car.salaryAllowance.toLocaleString()} ₪</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>ללא רכב:</span>
                                      <span className="text-gray-500">3,500 ₪</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between items-center">
                                      <span className="font-bold">השפעה נטו:</span>
                                      <div className={`flex items-center ${
                                        impact > 0 ? 'text-green-600' : impact < 0 ? 'text-red-600' : 'text-gray-600'
                                      }`}>
                                        {impact > 0 ? <TrendingUp size={16} className="ml-1" /> : 
                                         impact < 0 ? <TrendingDown size={16} className="ml-1" /> : null}
                                        <span className="font-black text-lg">
                                          {impact > 0 ? '+' : ''}{Math.round(impact)} ₪
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Annual Impact */}
                                  <div className="text-center">
                                    <p className="text-xs text-gray-600">השפעה שנתית:</p>
                                    <p className={`font-bold ${impact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                      {impact > 0 ? '+' : ''}{Math.round(impact * 12).toLocaleString()} ₪
                                    </p>
                                  </div>

                                  {/* Status Badge */}
                                  <div className="mt-3 text-center">
                                    {index === 0 && selectedCars.length > 1 && (
                                      <span className="text-xs bg-green-500 text-white px-3 py-1 font-bold border border-black">
                                        🏆 הטוב ביותר
                                      </span>
                                    )}
                                    {impact > 500 && (
                                      <span className="text-xs bg-green-600 text-white px-2 py-1 font-bold">
                                        רווח גדול!
                                      </span>
                                    )}
                                    {impact < -1000 && (
                                      <span className="text-xs bg-red-600 text-white px-2 py-1 font-bold">
                                        יקר מאוד!
                                      </span>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                      </div>
                      
                      {selectedCars.length > 1 && (
                        <div className="mt-4 p-3 bg-blue-100 border-2 border-blue-500">
                          <div className="text-center">
                            <p className="text-sm font-bold text-blue-700">
                              הפרש בין הטוב לגרוע ביותר:
                            </p>
                            <p className="text-lg font-black text-blue-800">
                              {Math.round(
                                Math.max(...selectedCars.map(id => calculateImpact(carOptions[id]))) -
                                Math.min(...selectedCars.map(id => calculateImpact(carOptions[id])))
                              ).toLocaleString()} ₪ לחודש
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Quick Insights */}
                {selectedCars.length > 0 && (
                  <div className="mt-6 bg-yellow-100 border-4 border-yellow-500 p-4 shadow-xl">
                    <h4 className="font-black text-yellow-700 mb-3">📊 סיכום השוואה</h4>
                    <div className="space-y-2 text-sm">
                      {(() => {
                        const impacts = selectedCars.map(id => calculateImpact(carOptions[id]));
                        const bestImpact = Math.max(...impacts);
                        const worstImpact = Math.min(...impacts);
                        const avgImpact = impacts.reduce((a, b) => a + b, 0) / impacts.length;
                        const profitableCars = impacts.filter(impact => impact > 0).length;
                        const expensiveCars = impacts.filter(impact => impact < -1000).length;
                        
                        return (
                          <>
                            <p>• <strong>ממוצע השפעה:</strong> {Math.round(avgImpact)} ₪ לחודש מול ללא רכב</p>
                            <p>• <strong>טווח:</strong> {Math.round(worstImpact)} ₪ עד {Math.round(bestImpact)} ₪</p>
                            {profitableCars > 0 && (
                              <p className="text-green-700">• <strong>🎉 יש {profitableCars} רכבים שמניבים רווח!</strong></p>
                            )}
                            {expensiveCars > 0 && (
                              <p className="text-red-700">• <strong>⚠️ יש {expensiveCars} רכבים יקרים מאוד ברשימה</strong></p>
                            )}
                            {selectedCars.includes('no-car') && (
                              <p className="text-blue-700">• <strong>📌 זכור:</strong> ללא רכב = 3,500 ₪ מלא בכיס</p>
                            )}
                            {bestImpact > 0 && (
                              <p className="text-green-700">• <strong>💡 טיפ:</strong> יש רכבים שחוסכים לך כסף!</p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Car Form */}
            {showCustomForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white border-4 border-black p-8 shadow-xl max-w-md w-full">
                  <h3 className="text-2xl font-black mb-6">הוסף רכב חדש</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="שם הרכב"
                      value={customCar.name}
                      onChange={(e) => setCustomCar({...customCar, name: e.target.value})}
                      className="w-full border-2 border-black p-3 font-bold"
                    />
                    <input
                      type="number"
                      placeholder="ערך מס"
                      value={customCar.taxValue}
                      onChange={(e) => setCustomCar({...customCar, taxValue: e.target.value})}
                      className="w-full border-2 border-black p-3 font-bold"
                    />
                    <input
                      type="number"
                      placeholder="אחזקת רכב"
                      value={customCar.salaryAllowance}
                      onChange={(e) => setCustomCar({...customCar, salaryAllowance: e.target.value})}
                      className="w-full border-2 border-black p-3 font-bold"
                    />
                  </div>
                  <div className="mt-6 flex space-x-reverse space-x-4">
                    <button
                      onClick={addCustomCar}
                      className="flex-1 bg-green-500 text-white px-6 py-3 border-2 border-black font-bold hover:bg-green-600 transform hover:scale-105"
                    >
                      הוסף רכב
                    </button>
                    <button
                      onClick={() => setShowCustomForm(false)}
                      className="flex-1 bg-gray-500 text-white px-6 py-3 border-2 border-black font-bold hover:bg-gray-600 transform hover:scale-105"
                    >
                      ביטול
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Calculate Section */}
        {activeSection === 'calculate' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 transform -rotate-1">מחשבון אישי</h2>
              <div className="bg-yellow-400 p-6 border-4 border-black shadow-xl transform rotate-1">
                <p className="text-xl">חשב בדיוק כמה כל רכב ישפיע על השכר שלך</p>
              </div>
            </div>

            {/* Tax Rate Input */}
            <div className="bg-white border-4 border-black p-8 shadow-xl mb-8">
              <h3 className="text-2xl font-black mb-4">שיעור המס האפקטיבי שלך</h3>
              <div className="flex items-center space-x-reverse space-x-4">
                <input
                  type="number"
                  value={effectiveTaxRate}
                  onChange={(e) => setEffectiveTaxRate(parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="0"
                  max="100"
                  className="border-2 border-black p-4 text-2xl font-bold w-32 text-center"
                />
                <span className="text-2xl font-black">%</span>
                <div className="flex-1">
                  <p className="text-lg">שיעור המס הממוצע במיקרוסופט ישראל הוא כ-48%</p>
                  <p className="text-sm text-gray-600">ניתן לחשב את השיעור האישי: (שכר ברוטו - שכר נטו) ÷ שכר ברוטו × 100</p>
                </div>
              </div>
            </div>

            {/* Quick Calculator */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-100 border-4 border-blue-500 p-8 shadow-xl">
                <h3 className="text-2xl font-black mb-4 text-blue-700">חישוב מהיר</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-bold mb-2">ערך מס הרכב:</label>
                    <input type="number" className="w-full border-2 border-blue-500 p-3 font-bold" placeholder="5000" />
                  </div>
                  <div>
                    <label className="block text-lg font-bold mb-2">אחזקת רכב:</label>
                    <input type="number" className="w-full border-2 border-blue-500 p-3 font-bold" placeholder="2000" />
                  </div>
                  <button className="w-full bg-blue-500 text-white p-4 border-2 border-black font-bold text-xl hover:bg-blue-600 transform hover:scale-105">
                    חשב השפעה
                  </button>
                </div>
              </div>

              <div className="bg-yellow-100 border-4 border-yellow-500 p-8 shadow-xl">
                <h3 className="text-2xl font-black mb-4 text-yellow-700">דוגמה</h3>
                <div className="space-y-3">
                  <p><strong>רכב:</strong> יונדאי אייוניק פרימיום</p>
                  <p><strong>ערך מס:</strong> 3,977 ₪</p>
                  <p><strong>אחזקת רכב:</strong> 2,177 ₪</p>
                  <div className="border-t-2 border-yellow-500 pt-3 mt-3">
                    <p className="text-green-600 font-bold text-xl">תוצאה: +176 ₪ בחודש</p>
                    <p className="text-sm">יותר טוב מאשר ללא רכב!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 border-t-4 border-yellow-400">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg">🚗 מחשבון הטבות רכב - Microsoft ILDC</p>
          <p className="text-sm text-gray-400 mt-2">
            המידע מוצג לצורכי הדרכה בלבד. לקבלת מידע מדויק יש לפנות למחלקת רכב
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CarBenefitCalculator;