import React from 'react'
import ReactDOM from 'react-dom/client'
import CarBenefitCalculator from '../cars_calc.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CarBenefitCalculator />
  </React.StrictMode>,
)
