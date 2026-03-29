// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import cl from './App.module.css'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import MainPage from './components/MainPage.tsx'
import { useState } from 'react'
function App() {
  const [flag, setFlag] = useState<string>("shop")
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Если загрузка, показываем спиннер ПОВЕРХ всего */}
      {isLoading && (
        <div className={cl.Loader}>
          <div className={cl.Spinner} />
        </div>
      )}

      {/* А само приложение рендерится всегда (чтобы работал fetchShops в MainPage) */}
      <Header setFlag={setFlag} flag={flag} />
      <MainPage flag={flag} setIsLoading={setIsLoading} />
      <Footer />
    </>
  )
}

export default App
