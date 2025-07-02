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
      color: 'bg-green-500'
    },
    'byd-atto3-comfort': {
      name: 'BYD ATTO 3 COMFORT',
      taxValue: 4253,
      greenBenefit: 1350,
      salaryAllowance: 1086,
      color: 'bg-red-500'
    },
    'byd-atto3-design': {
      name: 'BYD ATTO 3 DESIGN',
      taxValue: 4402,
      greenBenefit: 1350,
      salaryAllowance: 838,
      color: 'bg-red-600'
    },
    'byd-seal-design': {
      name: 'BYD SEAL DESIGN',
      taxValue: 5431,
      greenBenefit: 1350,
      salaryAllowance: 1758,
      color: 'bg-blue-500'
    },
    'byd-seal-excellence': {
      name: 'BYD SEAL EXCELLENCE 4X4',
      taxValue: 5853,
      greenBenefit: 1350,
      salaryAllowance: 1397,
      color: 'bg-blue-600'
    },
    'byd-sealion7-boost': {
      name: 'BYD SEAL Sealion 7 Boost',
      taxValue: 5431,
      greenBenefit: 1350,
      salaryAllowance: -550,
      color: 'bg-red-700'
    },
    'byd-sealion7-comfort': {
      name: 'BYD SEAL Sealion 7 Comfort',
      taxValue: 5853,
      greenBenefit: 1350,
      salaryAllowance: 1220,
      color: 'bg-blue-700'
    },
    'geely-ex5-pro': {
      name: 'GEELY EX 5 PRO',
      taxValue: 4015,
      greenBenefit: 1350,
      salaryAllowance: 1393,
      color: 'bg-orange-500'
    },
    'geely-ex5-tech': {
      name: 'GEELY EX 5 TECH',
      taxValue: 4164,
      greenBenefit: 1350,
      salaryAllowance: 1110,
      color: 'bg-orange-600'
    },
    'hyundai-ioniq5-limited': {
      name: 'Hyundai IONIQ 5 LIMITED',
      taxValue: 6303,
      greenBenefit: 1350,
      salaryAllowance: 1084,
      color: 'bg-purple-500'
    },
    'hyundai-ioniq5-premium': {
      name: 'Hyundai IONIQ 5 PREMIUM',
      taxValue: 5327,
      greenBenefit: 1350,
      salaryAllowance: 2177,
      color: 'bg-purple-600'
    },
    'hyundai-ioniq5-ultimate': {
      name: 'Hyundai IONIQ 5 ULTIMATE',
      taxValue: 5828,
      greenBenefit: 1350,
      salaryAllowance: 1745,
      color: 'bg-purple-700'
    },
    'lynkco-02-halo': {
      name: 'LYNK&CO 02 HALO',
      taxValue: 4387,
      greenBenefit: 1350,
      salaryAllowance: 550,
      color: 'bg-gray-500'
    },
    'lynkco-02-pro': {
      name: 'LYNK&CO 02 PRO',
      taxValue: 4216,
      greenBenefit: 1350,
      salaryAllowance: 666,
      color: 'bg-gray-600'
    },
    'tesla-model3-lr': {
      name: 'Tesla MODEL 3 LONG RANGE',
      taxValue: 6050,
      greenBenefit: 1350,
      salaryAllowance: 0,
      color: 'bg-red-500'
    },
    'tesla-modely-lr': {
      name: 'Tesla MODEL Y LONG RANGE',
      taxValue: 7126,
      greenBenefit: 1350,
      salaryAllowance: -1063,
      color: 'bg-red-700'
    },
    'tesla-model3-rwd': {
      name: 'Tesla MODEL 3 RWD',
      taxValue: 5235,
      greenBenefit: 1350,
      salaryAllowance: -999,
      color: 'bg-red-600'
    },
    'tesla-modely-rwd': {
      name: 'Tesla MODEL Y RWD',
      taxValue: 6050,
      greenBenefit: 1350,
      salaryAllowance: 170,
      color: 'bg-red-500'
    },
    'volvo-ex30': {
      name: 'Volvo EX30 SM',
      taxValue: 5702,
      greenBenefit: 1350,
      salaryAllowance: -573,
      color: 'bg-blue-500'
    },
    'xpeng-g9-diamond': {
      name: 'XPENG G9 DIAMOND X',
      taxValue: 8804,
      greenBenefit: 1350,
      salaryAllowance: -2345,
      color: 'bg-red-800'
    },
    'xpeng-g6-lr': {
      name: 'XPENG G6 LONG RANGE',
      taxValue: 5654,
      greenBenefit: 1350,
      salaryAllowance: 1056,
      color: 'bg-indigo-500'
    },
    'xpeng-p7-lr': {
      name: 'XPENG P7 LONG RANGE',
      taxValue: 5332,
      greenBenefit: 1350,
      salaryAllowance: 1285,
      color: 'bg-indigo-600'
    },
    'xpeng-g9-standard': {
      name: 'XPENG G9 STANDARD',
      taxValue: 7068,
      greenBenefit: 1350,
      salaryAllowance: -306,
      color: 'bg-indigo-700'
    },
    'zeekr-x-byond': {
      name: 'ZEEKR X BYOND',
      taxValue: 4637,
      greenBenefit: 1350,
      salaryAllowance: 1071,
      color: 'bg-yellow-600'
    },
    'zeekr-x-lr': {
      name: 'ZEEKR X LONG RANGE',
      taxValue: 7068,
      greenBenefit: 1350,
      salaryAllowance: -1631,
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-black mb-4 transform -rotate-1">השוואת רכבים</h2>
              <p className="text-xl font-medium">בחר רכבים וראה מי הכי משתלם</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Side - Car Selection */}
              <div className="lg:col-span-2">
                <div className="bg-white border-4 border-black p-6 shadow-xl rounded-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black">רכבים זמינים</h3>
                    <div className="bg-blue-500 text-white px-4 py-2 border-2 border-black font-bold rounded">
                      {selectedCars.length} נבחרו
                    </div>
                  </div>

                  {/* Simplified Car Grid */}
                  <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {Object.entries(carOptions).map(([id, car]) => {
                      const impact = calculateImpact(car);
                      const isSelected = selectedCars.includes(id);
                      
                      return (
                        <div
                          key={id}
                          className={`border-3 p-4 rounded-lg cursor-pointer transition-all transform hover:scale-102 ${
                            isSelected 
                              ? 'border-yellow-400 bg-yellow-50 shadow-lg scale-102' 
                              : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
                          }`}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedCars(selectedCars.filter(carId => carId !== id));
                            } else {
                              setSelectedCars([...selectedCars, id]);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-lg leading-tight flex-1">{car.name}</h4>
                            {isSelected ? (
                              <CheckCircle size={24} className="text-yellow-500 flex-shrink-0" />
                            ) : (
                              <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">אחזקה:</span>
                              <span className="font-bold">{car.salaryAllowance.toLocaleString()} ₪</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">השפעה על השכר:</span>
                              <div className={`text-xl font-black ${
                                impact > 50 ? 'text-green-600' : 
                                impact > 0 ? 'text-green-500' :
                                impact > -500 ? 'text-orange-500' : 'text-red-600'
                              }`}>
                                {impact > 0 ? '+' : ''}{Math.round(impact)} ₪
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Side - Simple Results */}
              <div className="lg:col-span-1">
                <div className="bg-white border-4 border-black shadow-xl sticky top-24 rounded-lg">
                  <div className="bg-black text-white p-4 rounded-t-lg">
                    <h3 className="text-xl font-black">תוצאות השוואה</h3>
                  </div>
                  
                  {selectedCars.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Car size={48} className="mx-auto mb-4" />
                      <p className="font-bold">בחר רכבים להשוואה</p>
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
                              className={`p-4 rounded-lg border-2 ${
                                index === 0 ? 'border-green-500 bg-green-50' : 
                                impact < 0 ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-sm leading-tight flex-1">{car.name}</h4>
                                <button
                                  onClick={() => setSelectedCars(selectedCars.filter(carId => carId !== id))}
                                  className="text-gray-400 hover:text-red-500 ml-2"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">אחזקה:</span>
                                  <span className="font-medium">{car.salaryAllowance.toLocaleString()} ₪</span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-600">השפעה:</span>
                                  <div className={`flex items-center font-black text-lg ${
                                    impact > 0 ? 'text-green-600' : impact < 0 ? 'text-red-600' : 'text-gray-600'
                                  }`}>
                                    {impact > 0 ? <TrendingUp size={18} className="ml-1" /> : 
                                     impact < 0 ? <TrendingDown size={18} className="ml-1" /> : null}
                                    {impact > 0 ? '+' : ''}{Math.round(impact)} ₪
                                  </div>
                                </div>
                              </div>
                              
                              {index === 0 && selectedCars.length > 1 && (
                                <div className="mt-2 text-center">
                                  <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-bold">
                                    🏆 הטוב ביותר
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                      
                      {/* Simple Summary */}
                      {selectedCars.length > 1 && (
                        <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-500 rounded-lg">
                          <div className="text-center">
                            <p className="text-sm font-bold text-blue-700 mb-1">הפרש:</p>
                            <p className="text-xl font-black text-blue-800">
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

                {/* Simple Tips */}
                <div className="mt-6 bg-yellow-100 border-4 border-yellow-500 p-4 shadow-xl rounded-lg">
                  <h4 className="font-black text-yellow-700 mb-3">💡 טיפים</h4>
                  <div className="space-y-2 text-sm">
                    <p>🟢 <strong>מספר חיובי:</strong> השכר עולה</p>
                    <p>🔴 <strong>מספר שלילי:</strong> השכר יורד</p>
                    <p>⚖️ <strong>בסיס השוואה:</strong> ללא רכב = 3,500 ₪</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Car Form - Simplified */}
            {showCustomForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg border-4 border-black p-8 shadow-xl max-w-md w-full">
                  <h3 className="text-2xl font-black mb-6">הוסף רכב חדש</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="שם הרכב"
                      value={customCar.name}
                      onChange={(e) => setCustomCar({...customCar, name: e.target.value})}
                      className="w-full border-2 border-gray-300 rounded p-3 font-medium focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="ערך מס (לדוגמה: 5000)"
                      value={customCar.taxValue}
                      onChange={(e) => setCustomCar({...customCar, taxValue: e.target.value})}
                      className="w-full border-2 border-gray-300 rounded p-3 font-medium focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="אחזקת רכב (לדוגמה: 2000)"
                      value={customCar.salaryAllowance}
                      onChange={(e) => setCustomCar({...customCar, salaryAllowance: e.target.value})}
                      className="w-full border-2 border-gray-300 rounded p-3 font-medium focus:border-blue-500"
                    />
                  </div>
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={addCustomCar}
                      className="flex-1 bg-green-500 text-white px-6 py-3 rounded border-2 border-black font-bold hover:bg-green-600 transform hover:scale-105"
                    >
                      הוסף רכב
                    </button>
                    <button
                      onClick={() => setShowCustomForm(false)}
                      className="flex-1 bg-gray-500 text-white px-6 py-3 rounded border-2 border-black font-bold hover:bg-gray-600 transform hover:scale-105"
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
            <div className="bg-white border-4 border-black p-8 shadow-xl mb-8 rounded-lg">
              <h3 className="text-2xl font-black mb-4">שיעור המס האפקטיבי שלך</h3>
              <div className="flex items-center space-x-reverse space-x-4">
                <input
                  type="number"
                  value={effectiveTaxRate}
                  onChange={(e) => setEffectiveTaxRate(parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="0"
                  max="100"
                  className="border-2 border-black p-4 text-2xl font-bold w-32 text-center rounded"
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
              <div className="bg-blue-100 border-4 border-blue-500 p-8 shadow-xl rounded-lg">
                <h3 className="text-2xl font-black mb-4 text-blue-700">חישוב מהיר</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-bold mb-2">ערך מס הרכב:</label>
                    <input type="number" className="w-full border-2 border-blue-500 p-3 font-bold rounded" placeholder="5000" />
                  </div>
                  <div>
                    <label className="block text-lg font-bold mb-2">אחזקת רכב:</label>
                    <input type="number" className="w-full border-2 border-blue-500 p-3 font-bold rounded" placeholder="2000" />
                  </div>
                  <button className="w-full bg-blue-500 text-white p-4 border-2 border-black font-bold text-xl hover:bg-blue-600 transform hover:scale-105 rounded">
                    חשב השפעה
                  </button>
                </div>
              </div>

              <div className="bg-yellow-100 border-4 border-yellow-500 p-8 shadow-xl rounded-lg">
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
