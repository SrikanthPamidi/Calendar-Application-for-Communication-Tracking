import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CommunicationMethodsManager.css";

const CommunicationMethodsManager = ({ methods, setMethods }) => {
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    sequence: methods.length + 1,
    mandatory: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMethod((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddMethod = (e) => {
    e.preventDefault();
    setMethods((prev) => [...prev, newMethod]);
    setNewMethod({
      name: "",
      description: "",
      sequence: methods.length + 1,
      mandatory: false,
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedMethods = Array.from(methods);
    const [movedItem] = reorderedMethods.splice(result.source.index, 1);
    reorderedMethods.splice(result.destination.index, 0, movedItem);
    setMethods(reorderedMethods);
  };

  return (
    <div className="methods-manager">
      <form onSubmit={handleAddMethod}>
        <h3>Add Communication Method</h3>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={newMethod.name}
          onChange={handleInputChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={newMethod.description}
          onChange={handleInputChange}
        />
        <label>
          <input
            type="checkbox"
            name="mandatory"
            checked={newMethod.mandatory}
            onChange={handleInputChange}
          />
          Mandatory
        </label>
        <button type="submit">Add Method</button>
      </form>

      <h3>Reorder Communication Methods</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="methods">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {methods.map((method, index) => (
                <Draggable
                  key={method.name}
                  draggableId={method.name}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{method.sequence}. </span>
                      {method.name} - {method.description}{" "}
                      {method.mandatory && <strong>(Mandatory)</strong>}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CommunicationMethodsManager;
