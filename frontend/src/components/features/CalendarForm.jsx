import Overlay from '../layout/Overlay';

export function CalendarOverlay({ calendarOverlay, setCalendarOverlay }) {
    return (
      <Overlay
        overlayToggle={calendarOverlay}
        setOverlayToggle={setCalendarOverlay}
      >
        <div id="calendar-overlay">
          <form id="calendar-overlay-form" action="">
            <div id="calendar-overlay-header">
              <h5>Create/Edit Event</h5>
              <button onClick={() => setCalendarOverlay(false)}>Close</button>
            </div>
            <p>Date</p>
            <div></div>
            <p>Event Name</p>
            <input type="text" />
            <p>Reoccurring</p>
            <div></div>
            <p>Time</p>
  
            <p>Connect Tasks</p>
          </form>
        </div>
      </Overlay>
    );
  }