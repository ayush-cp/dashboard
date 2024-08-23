import React, { useState } from 'react';

export default function AddWidget({ graphs, onClose, onWidgetsAdd }) {
  const [widgetData, setWidgetData] = useState({
    widgetName: '',
    fields: [{ field: '', value: '', color: '#000000' }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setWidgetData((prevData) => {
      const newFields = prevData.fields.map((field, i) =>
        i === index ? { ...field, [name]: value } : field
      );
      return { ...prevData, fields: newFields };
    });
  };

  const increaseFields = (e) => {
    e.preventDefault();
    setWidgetData((prevData) => ({
      ...prevData,
      fields: [...prevData.fields, { field: '', value: '', color: '#000000' }],
    }));
  };

  const handleRemoveElement = (e) => {
    e.preventDefault();
    const index = parseInt(e.target.dataset.index, 10);
    setWidgetData((prevData) => ({
      ...prevData,
      fields: prevData.fields.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWidgetData = {
      ...widgetData,
      type: graphs, 
    };

    const existingWidgets = JSON.parse(localStorage.getItem(graphs)) || [];
    existingWidgets.push(newWidgetData);
    localStorage.setItem(graphs, JSON.stringify(existingWidgets));

    
    if (onWidgetsAdd) {
      onWidgetsAdd();
    }

    setWidgetData({
      widgetName: '',
      fields: [{ field: '', value: '', color: '#000000' }],
    });
  };

  const handleWidgetNameChange = (e) => {
    const { value } = e.target;
    setWidgetData((prevData) => ({ ...prevData, widgetName: value }));
  };
  const handleCross = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="addWidgets">
      <div className="cross" onClick={handleCross}>X</div>
      <form onSubmit={handleSubmit}>
        <h1>Add Widget</h1>
        <div className="formSection">
          <label htmlFor="name">Widget Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Widget Name"
            value={widgetData.widgetName}
            onChange={handleWidgetNameChange}
            required
          />
        </div>

        {widgetData.fields.map((field, index) => (
          <div className="formSection" key={index}>
            <label htmlFor={`field-${index}`}>Widget Field {index + 1}</label>
            <div className="widgetElements">
              <input
                type="text"
                name="field"
                placeholder="Field"
                className="nameEnter"
                value={field.field}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <input
                type="number"
                name="value"
                placeholder="Value"
                className="valueEnter"
                value={field.value}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <label htmlFor={`color-${index}`}>Colour:</label>
              <input
                type="color"
                name="color"
                className="colorSelect"
                value={field.color}
                onChange={(e) => handleChange(e, index)}
              />
              <button data-index={index} onClick={handleRemoveElement}>
                X
              </button>
            </div>
          </div>
        ))}

        <button className="createElements" onClick={increaseFields}>
          Add Element +
        </button>
        <button type="submit" className="submitButton">
          Create
        </button>
      </form>
    </div>
  );
}
