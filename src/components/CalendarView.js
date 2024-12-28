import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CalendarView.css";

const CalendarView = ({ communications }) => {
  const [markedDates, setMarkedDates] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null); // For editing event
  const [isEditing, setIsEditing] = useState(false); // To toggle editing mode

  useEffect(() => {
    const getMarkedDates = () => {
      const dates = [];
      communications.forEach((company) => {
        company.communications.forEach((comm) => {
          const commDate = new Date(comm.date);
          const dateString = commDate.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
          dates.push({
            id: `${company.name}-${comm.method}-${comm.date}`, // Unique ID for drag-and-drop
            date: dateString,
            company: company.name,
            method: comm.method,
            isPast: commDate < new Date(), // Check if the communication is in the past
          });
        });
      });
      return dates;
    };

    setMarkedDates(getMarkedDates());
  }, [communications]);

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsEditing(true); // Activate editing mode
  };

  const handleSaveEdit = (updatedEvent) => {
    setMarkedDates((prevDates) =>
      prevDates.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setIsEditing(false); // Exit editing mode
    setEditingEvent(null);
  };

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay(); // Sunday = 0, Monday = 1, etc.
    const totalDays = Array.from(
      { length: daysInMonth + firstDayOfWeek },
      (_, i) => i + 1 - firstDayOfWeek
    );

    return (
      <div className="calendar-grid">
        {totalDays.map((day, index) => {
          if (day <= 0 || day > daysInMonth)
            return <div key={index} className="calendar-day empty"></div>;

          const dateString = `${currentYear}-${String(
            currentMonth + 1
          ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const eventsForTheDay = markedDates.filter(
            (event) => event.date === dateString
          );

          return (
            <Droppable droppableId={dateString} key={dateString}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="calendar-day"
                >
                  <div className="day-number">{day}</div>
                  {eventsForTheDay.map((event, idx) => (
                    <Draggable
                      key={event.id}
                      draggableId={event.id}
                      index={idx}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`event ${event.isPast ? "past" : ""}`}
                          onClick={() => handleEditEvent(event)} // Click event to edit
                        >
                          <span className="event-method">{event.method}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside any droppable area

    const { draggableId, destination } = result;
    const updatedMarkedDates = markedDates.map((event) => {
      if (event.id === draggableId) {
        return { ...event, date: destination.droppableId };
      }
      return event;
    });

    setMarkedDates(updatedMarkedDates);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="calendar-view">
        <div className="calendar-header">
          <span>
            {new Date().toLocaleString("default", { month: "long" })}{" "}
            {new Date().getFullYear()}
          </span>
        </div>
        {renderCalendar()}

        {/* Editing Modal */}
        {isEditing && editingEvent && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edit Communication</h3>
              <label>
                Company:
                <input type="text" value={editingEvent.company} disabled />
              </label>
              <label>
                Method:
                <input type="text" value={editingEvent.method} disabled />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      date: e.target.value,
                    })
                  }
                />
              </label>
              <button onClick={() => handleSaveEdit(editingEvent)}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default CalendarView;
