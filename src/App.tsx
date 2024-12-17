import s from './App.module.css';
import { ExchangeRates, Header } from './components'

function App() {

  return (
    <div className={s.mainContainer}>
      <Header />
      <ExchangeRates />
    </div>
  )
}

export default App
