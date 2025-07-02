import { useState } from 'react';

interface CarOption {
  name: string;
  taxValue: number;
  maintenance: number;
}

const CarBenefitCalculator = () => {
  const [activeSection, setActiveSection] = useState('compare');
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(48);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customCar, setCustomCar] = useState({ name: '', taxValue: 0, maintenance: 0 });

  const carOptions: CarOption[] = [
    { name: "יונדאי אייוניק פרימיום", taxValue: 3977, maintenance: 2177 },
    { name: "טויוטה קורולה היברידית", taxValue: 4200, maintenance: 2300 },
    { name: "הונדה סיוויק", taxValue: 4500, maintenance: 2400 }
  ];

  const calculateImpact = (car: CarOption) => {
    const totalBenefit = car.taxValue + car.maintenance;
    const taxSavings = totalBenefit * (effectiveTaxRate / 100);
    const netImpact = taxSavings - totalBenefit;
    return Math.round(netImpact);
  };

  const addCustomCar = () => {
    if (customCar.name && customCar.taxValue && customCar.maintenance) {
      // Add custom car logic here
      setShowCustomForm(false);
      setCustomCar({ name: '', taxValue: 0, maintenance: 0 });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-bold" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 border-b-4 border-yellow-400">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-black transform -rotate-1">
                🚗 מחשבון הטבות רכב
              </h1>
              <p className="text-xl md:text-2xl mt-2 transform rotate-1">
                Microsoft Israel Development Center
              </p>
            </div>
            <div className="hidden md:block text-6xl animate-bounce">
              💰
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-yellow-400 border-b-4 border-black py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-reverse space-x-8">
            <button
              onClick={() => setActiveSection('compare')}
              className={`px-8 py-3 font-bold text-xl border-4 border-black transform hover:scale-105 transition-all rounded ${
                activeSection === 'compare' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              השוואת רכבים
            </button>
            <button
              onClick={() => setActiveSection('calculate')}
              className={`px-8 py-3 font-bold text-xl border-4 border-black transform hover:scale-105 transition-all rounded ${
                activeSection === 'calculate' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              מחשבון אישי
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {activeSection === 'compare' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 transform -rotate-1">השוואת רכבים</h2>
              <div className="bg-yellow-400 p-6 border-4 border-black shadow-xl transform rotate-1">
                <p className="text-2xl font-bold">
                  בחר רכב וראה כמה כסף תחסוך או תוציא יותר בחודש! 💡
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {carOptions.map((car, index) => {
                const impact = calculateImpact(car);
                const isPositive = impact > 0;
                
                return (
                  <div key={index} className={`border-4 p-8 shadow-xl transform hover:scale-105 transition-all rounded-lg ${
                    isPositive 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                  }`}>
                    <h3 className="text-2xl font-black mb-6">{car.name}</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg">ערך מס רכב:</span>
                        <span className="font-bold text-xl">{car.taxValue.toLocaleString()} ₪</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg">אחזקת רכב:</span>
                        <span className="font-bold text-xl">{car.maintenance.toLocaleString()} ₪</span>
                      </div>
                    </div>

                    <div className={`border-t-4 pt-6 ${
                      isPositive ? 'border-green-500' : 'border-red-500'
                    }`}>
                      <div className="text-center">
                        <p className="text-sm mb-2">השפעה על השכר החודשי:</p>
                        <p className={`text-3xl font-black ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isPositive ? '+' : ''}{impact} ₪
                        </p>
                        <p className="text-sm mt-2">
                          {isPositive 
                            ? '🎉 יותר טוב מאשר ללא רכב!' 
                            : '💸 תוציא יותר מאשר ללא רכב'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Car Form - Simplified */}
            {showCustomForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg border-4 border-black p-8 shadow-xl max-w-md w-full">
                  <h3 className="text-2xl font-black mb-6">הוסף רכב מותאם אישית</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lg font-bold mb-2">שם הרכב:</label>
                      <input
                        type="text"
                        value={customCar.name}
                        onChange={(e) => setCustomCar({...customCar, name: e.target.value})}
                        className="w-full border-2 border-black p-3 font-bold rounded"
                        placeholder="דוגמה: טויוטה פריוס"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-bold mb-2">ערך מס רכב (₪):</label>
                      <input
                        type="number"
                        value={customCar.taxValue || ''}
                        onChange={(e) => setCustomCar({...customCar, taxValue: parseFloat(e.target.value) || 0})}
                        className="w-full border-2 border-black p-3 font-bold rounded"
                        placeholder="5000"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-bold mb-2">אחזקת רכב (₪):</label>
                      <input
                        type="number"
                        value={customCar.maintenance || ''}
                        onChange={(e) => setCustomCar({...customCar, maintenance: parseFloat(e.target.value) || 0})}
                        className="w-full border-2 border-black p-3 font-bold rounded"
                        placeholder="2000"
                      />
                    </div>
                    <div className="flex space-x-reverse space-x-4 pt-4">
                      <button
                        onClick={addCustomCar}
                        className="flex-1 bg-green-500 text-white p-3 border-2 border-black font-bold hover:bg-green-600 rounded"
                      >
                        הוסף רכב
                      </button>
                      <button
                        onClick={() => setShowCustomForm(false)}
                        className="flex-1 bg-gray-500 text-white p-3 border-2 border-black font-bold hover:bg-gray-600 rounded"
                      >
                        בטל
                      </button>
                    </div>
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
                <p className="text-2xl font-bold">
                  הזן את הנתונים שלך לחישוב מדויק! 🎯
                </p>
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
