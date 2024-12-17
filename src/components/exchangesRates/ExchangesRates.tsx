import { useEffect, useState } from 'react';
import s from './exchangeRates.module.css';
import type { ExchangeRatesData } from './exchangeRates.types';

const url = 'https://www.cbr-xml-daily.ru/daily_json.js'

export const ExchangeRates = () => {
  const [data, setData] = useState<ExchangeRatesData[]>([])
  const [currentDate, setCurrentDate] = useState()
  const [previousDate, setPreviousDate] = useState()

  useEffect(() => {
    fetch(url)
      .then((result) => result.json())
      .then((value) => {
        setData(Object.values(value.Valute))
        setCurrentDate(value.Date)
        setPreviousDate(value.Timestamp)
      })
      .catch((err) => console.log(err))

  }, [])

  return (
    <table>
      <thead className={s.tableHead}>
        <tr>
          <td>Валюта</td>
          <td>{currentDate}</td>
          <td>{previousDate}</td>
        </tr>
      </thead>

      <tbody className={s.tableBody}>
        {data.map((item) => (
          <tr key={item.ID}>
            <td>{item.CharCode} - {item.Name}</td>
            <td>{item.Value}</td>
            <td>{item.Previous}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};