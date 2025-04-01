import React, { useState } from "react";
import "../index.css";
import renderverseLogo from "../images/logo2.png";

const TimeSelection = ({ onNext }) => {
  const [selectedTime, setSelectedTime] = useState("5 mins");
  const [reminderTime, setReminderTime] = useState("");
  const [isReminderSet, setIsReminderSet] = useState(false);

  return (
    <div className="time-container">
    <div className="sign-in-container">
      <img className="renderverse-logo" src={renderverseLogo} alt="Renderverse Logo" />
      <h2 className="title">How much time are you willing to spend daily?</h2>

      <p className="description">Choose your study duration. You can change it later in settings.</p>

      <select
        className="time-dropdown"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        <option value="5 mins">5 mins</option>
        <option value="10 mins">10 mins</option>
        <option value="20 mins">20 mins</option>
      </select>

      <h3 className="reminder-title">Do you want to set a daily reminder?</h3>

      <input
        type="time"
        className="reminder-input"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
      />

      <label className="reminder-checkbox">
        <input
          type="checkbox"
          checked={isReminderSet}
          onChange={() => setIsReminderSet(!isReminderSet)}
        />
        Set Reminder
      </label>

      <button className="done-button" onClick={() => onNext(selectedTime, reminderTime, isReminderSet)}>
        Done
      </button>
    </div>
    </div>
  );
};

export default TimeSelection;
