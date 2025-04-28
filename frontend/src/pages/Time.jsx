import { useState } from "react"
import { CalendarView, CalendarList } from "../features/events"

export default function Time() {
    const [calendarRange, setCalendarRange] = useState(
        {
            increment: 'week',
            year: '',
            month: '',
            week: '',
            day: ''
        }
    )

    return (
        <div id='time-container'>
            <CalendarView />
            <CalendarList />
        </div>
    )
}