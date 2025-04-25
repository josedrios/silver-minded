import { useState, useEffect, useRef, useContext } from "react";
import Overlay from "../layout/Overlay";
import { createEvent, deleteEvent, editEvent } from "./util/eventUtil";
import { IoIosClose } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { AppContext } from "./util/AppContext";
import { TaskRow } from "./TaskList";
import { fetchTasks } from "./util/taskUtil";

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
  selectedDay,
  setSelectedDay,
}) {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const { tasks, setTasks } = useContext(AppContext);

  const formattedNow = `${timeFrame.year}-${pad(timeFrame.month + 1)}-${pad(
    selectedDay ? selectedDay : now.getDate()
  )}T00:00`;

  const [eventForm, setEventForm] = useState({
    info: "",
    reoccurring: "never",
    dueAt: formattedNow,
    task: null,
  });

  useEffect(() => {
    const updatedDate = `${timeFrame.year}-${pad(timeFrame.month + 1)}-${pad(
      selectedDay ? selectedDay : now.getDate()
    )}T00:00`;

    setEventForm((prev) => ({
      ...prev,
      dueAt: updatedDate,
    }));
  }, [timeFrame, selectedDay]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEvent = async (mode = "create") => {
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
      task: null,
    });
    setCalendarOverlay(false);
    loadTasks();
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
        task: selectedEvent.task,
      });
      if (selectedEvent.task) {
        const matchedEvent = tasks.find(event => event._id === selectedEvent.task);
        setOpenTask(true);
        setTaskLink(matchedEvent);
      }
    } else {
      setEventForm({
        info: "",
        reoccurring: "never",
        dueAt: formattedNow,
        task: null,
      });
      setOpenTask(false);
      setTaskLink(null);
    }
  }, [selectedEvent]);

  const eventRef = useRef();

  useEffect(() => {
    if (calendarOverlay) {
      eventRef.current?.focus();
    }
  }, [calendarOverlay]);

  const options = ["never", "monthly", "yearly"];

  const [openTask, setOpenTask] = useState(false);

  const toggle = () => setOpenTask((prev) => !prev);

  const [taskLink, setTaskLink] = useState(null);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  },[])

  useEffect(() => {
    if (taskLink) {
      setEventForm((prev) => ({
        ...prev,
        task: taskLink._id,
      }));
    } else {
      setEventForm((prev) => ({
        ...prev,
        task: null,
      }));
    }
  }, [taskLink]);

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
          <div id="task-link-label">
            <p>Link Task</p>
            <div
              id="task-link-toggle-container"
              onClick={() => toggle()}
              className={openTask ? "color-toggle" : ""}
            >
              <div
                id="task-link-toggler"
                className={openTask ? "right-toggle" : "left-toggle"}
              />
            </div>
          </div>
          <div
            id="task-link-options"
            style={{ display: openTask ? "" : "none" }}
          >
            {!Array.isArray(tasks) || tasks.length === 0 ? (
              <div id="no-tasks-list">...</div>
            ) : (
              tasks.map((task, i) => (
                <TaskRow
                  key={task._id}
                  task={task}
                  setTasks={setTasks}
                  count={i + 1}
                  taskLink={true}
                  setSelectedTask={setTaskLink}
                  selectedTask={taskLink}
                />
              ))
            )}
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
