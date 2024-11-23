import React, { useState } from 'react';
import '../styles/Calendar.css';

export default function Calendar() {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const generateCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(month, year);
        const emptyDays = firstDayOfMonth;

        // Adicionar dias vazios antes do primeiro dia do mês
        for (let i = 0; i < emptyDays; i++) {
            days.push(<div className="day empty" key={`empty-${i}`}></div>);
        }

        // Adicionar os dias do mês
        for (let i = 1; i <= totalDays; i++) {
            days.push(
                <div className="day" key={`day-${i}`}>
                    {i}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h2>
                    {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
                </h2>
            </div>
            <div className="calendar-grid">
                <div className="day-name">Dom</div>
                <div className="day-name">Seg</div>
                <div className="day-name">Ter</div>
                <div className="day-name">Qua</div>
                <div className="day-name">Qui</div>
                <div className="day-name">Sex</div>
                <div className="day-name">Sáb</div>
                {generateCalendar()}
            </div>
        </div>
    );
}
