import { useEffect, useMemo, useState } from 'react';
import s from './exchangeRates.module.css';
import type { ExchangeRatesData } from './exchangeRates.types';

const url = 'https://www.cbr-xml-daily.ru/daily_json.js'

export const ExchangeRates = () => {
  const [data, setData] = useState<ExchangeRatesData[]>([])
  const [currentDate, setCurrentDate] = useState('')
  const [previousDate, setPreviousDate] = useState('')

  useEffect(() => {
    fetch(url)
      .then((result) => result.json())
      .then((res) => {
        setData(Object.values(res.Valute))
        setCurrentDate(res.Date)
        setPreviousDate(res.Timestamp)
      })
      .catch((err) => console.log(err))

  }, [])

  const getCurrentDate = useMemo(
    () => {
      let curDate;
    if (currentDate) {
      const [year, month, day] = currentDate.split('-')
      curDate = `${day.slice(0, 2)}.${month}.${year}.`
    }
    return curDate;
    }, [currentDate]
  );

  const getPreviousDate = useMemo(
    () => {
      let prevDate;
    if (previousDate) {
      const [year, month, day] = previousDate.split('-')
      prevDate = `${day.slice(0, 2)}.${month}.${year}.`
    }
    return prevDate;
    }, [previousDate]
  );

  return (
    <table>
      <thead className={s.tableHead}>
        <tr>
          <td>Валюта</td>
          <td>{getCurrentDate}</td>
          <td>{getPreviousDate}</td>
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