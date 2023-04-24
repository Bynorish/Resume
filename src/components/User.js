import React, { useState } from 'react';
import './User.css';

function User() {
  
  const [selectedItem, setSelectedItem] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [personalInfo, setPersonalInfo] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  const handleDeleteResume = () => {
    console.log("Delete Resume clicked");
    // TODO: Implement logic to delete resume
  }

  const handleCreateNewResume = () => {
    console.log("Create New Resume clicked");
    // TODO: Implement logic to create a new resume
  }

  const handleUpdateCurrentResume = () => {
    console.log("Update Current Resume clicked");
    // TODO: Implement logic to update current resume
  }

  return (
    <div className="user">
      <h1>User Dashboard</h1>
      <label>
        Select an item:
        <select value={selectedItem} onChange={e => setSelectedItem(e.target.value)}>
          <option value="">--Please choose an item--</option>
          <option value="item1">Item 1</option>
          <option value="item2">Item 2</option>
          <option value="item3">Item 3</option>
        </select>
      </label>
      <form>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Personal Info:
          <textarea value={personalInfo} onChange={e => setPersonalInfo(e.target.value)} />
        </label>
        <br />
        <label>
          Contact Info:
          <textarea value={contactInfo} onChange={e => setContactInfo(e.target.value)} />
        </label>
        <br />
        <label>
          Education:
          <textarea value={education} onChange={e => setEducation(e.target.value)} />
        </label>
        <br />
        <label>
          Experience:
          <textarea value={experience} onChange={e => setExperience(e.target.value)} />
        </label>
        <br />
        <label>
          Extra Info:
          <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
        </label>
        <div className="user-buttons">
        <button onClick={handleDeleteResume}>Delete Resume</button>
        <button onClick={handleCreateNewResume}>Create New Resume</button>
        <button onClick={handleUpdateCurrentResume}>Update Current Resume</button>
      </div>
      </form>
    </div>
  );
}

export default User;