import { useState, useEffect, useRef } from "react";
import Overlay from "../layout/Overlay";
import { createEvent, deleteEvent, editEvent } from "../../util/eventUtil";
import { IoIosClose } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

export function CalendarOverlay({
  calendarOverlay,
  setCalendarOverlay,
  events,
  setEvents,
  selectedEvent,
  setSelectedEvent,
  loadEvents,
  timeFrame,
  setTimeFrame,
}) {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const formattedNow = `${timeFrame.year}-${pad(timeFrame.month + 1)}-${pad(
    now.getDate()
  )}T00:00`;

  const [eventForm, setEventForm] = useState({
    info: "",
    reoccurring: "never",
    dueAt: formattedNow,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEvent = async (mode = "create") => {
    console.log(mode);
    if (mode === "create") {
      await createEvent(eventForm);
    } else if (mode === "edit") {
      await editEvent(eventForm, selectedEvent._id);
    } else if (mode === "delete") {
      await deleteEvent(selectedEvent._id);
    }
    loadEvents(timeFrame.month, timeFrame.year);
    setEventForm({
      info: "",
      reoccurring: "never",
      dueAt: formattedNow,
    });
    setCalendarOverlay(false);
  };

  useEffect(() => {
    if (selectedEvent) {
      const dueDate = new Date(selectedEvent.dueAt);
      const pad = (n) => n.toString().padStart(2, "0");
      const formattedDueAt = `${dueDate.getFullYear()}-${pad(
        dueDate.getMonth() + 1
      )}-${pad(dueDate.getDate())}T${pad(dueDate.getHours())}:${pad(
        dueDate.getMinutes()
      )}`;
      setEventForm({
        info: selectedEvent.info,
        reoccurring: selectedEvent.reoccurring,
        dueAt: formattedDueAt,
      });
    } else {
      setEventForm({
        info: "",
        reoccurring: "never",
        dueAt: formattedNow,
      });
    }
  }, [selectedEvent]);

  const eventRef = useRef();

  useEffect(() => {
    if (calendarOverlay) {
      eventRef.current?.focus();
    }
  }, [calendarOverlay]);

  const options = ["never", "daily", "weekly", "monthly", "yearly"];

  return (
    <Overlay
      overlayToggle={calendarOverlay}
      setOverlayToggle={setCalendarOverlay}
    >
      <div id="calendar-overlay" onClick={(e) => e.stopPropagation()}>
        <form
          id="calendar-overlay-form"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            submitEvent(selectedEvent ? "edit" : "create");
          }}
        >
          <div id="calendar-overlay-header">
            <h5>{selectedEvent ? "Edit" : "Create"} Event</h5>
            <button
              className="calendar-overlay-close-button"
              onClick={(e) => {
                e.preventDefault();
                setCalendarOverlay(false);
              }}
            >
              <IoIosClose />
            </button>
          </div>
          <p>Event Name</p>
          <input
            name="info"
            className="standard-input"
            type="text"
            value={eventForm.info}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter event..."
            ref={eventRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitEvent(selectedEvent ? "edit" : "create");
              }
            }}
          />
          <p>Date</p>
          <input
            name="dueAt"
            className="standard-input"
            type="datetime-local"
            value={eventForm.dueAt}
            onChange={handleChange}
          />
          <p>Reoccurring</p>
          <div id="reoccurring-options-container">
            {options.map((opt) => (
              <button
                key={opt}
                className={`reoccurring-option-button ${
                  eventForm.reoccurring === opt
                    ? "reoccurring-chosen-option"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setEventForm((prev) => ({ ...prev, reoccurring: opt }));
                }}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
          <div id="calendar-form-button-section">
            <button
              className="standard-btn"
              id="calendar-submit-button"
              type="submit"
            >
              {selectedEvent ? "Edit" : "Create"}
            </button>
            {selectedEvent ? (
              <button
                id="calendar-delete-button"
                onClick={(e) => {
                  e.preventDefault();
                  submitEvent("delete");
                  setCalendarOverlay(false);
                }}
              >
                <FaRegTrashAlt />
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </Overlay>
  );
}
