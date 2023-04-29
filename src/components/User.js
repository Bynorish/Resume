import React, { useState, useEffect } from 'react';
import './User.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { signOut } from '@firebase/auth';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Button from 'react-bootstrap/Button';


function User() {
  const [isEditable, setIsEditable] = useState(false);

  const [selectedItem, setSelectedItem] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [personalInfo, setPersonalInfo] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setSelectedItem(userData.selectedItem);
        setItems(userData.resumeItems);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchResumeData = async () => {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const resumeItem = userData.resumeItems.find((item) => item.id === selectedItem);
        if (resumeItem) {
          setFirstName(resumeItem.firstName);
          setLastName(resumeItem.lastName);
          setPersonalInfo(resumeItem.personalInfo);
          setContactInfo(resumeItem.contactInfo);
          setEducation(resumeItem.education);
          setExperience(resumeItem.experience);
          setExtraInfo(resumeItem.extraInfo);
        }
      }
    };
    fetchResumeData();
  }, [selectedItem]);

  //Donwload PDF button
  const handleDownload = async (event) => {
    event.preventDefault();
    console.log('handleDownload executed');
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const fontColor = rgb(0, 0, 0);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const content = [
      { text: `First Name: ${firstName}`, y: 750 },
      { text: `Last Name: ${lastName}`, y: 725 },
      { text: 'Personal Info:', y: 700 },
      { text: personalInfo, y: 675 },
      { text: 'Contact Info:', y: 650 },
      { text: contactInfo, y: 625 },
      { text: 'Education:', y: 600 },
      { text: education, y: 575 },
      { text: 'Experience:', y: 550 },
      { text: experience, y: 525 },
      { text: 'Extra Info:', y: 500 },
      { text: extraInfo, y: 475 },
    ];
  
    content.forEach((item) => {
      page.drawText(item.text, {
        x: 50,
        y: item.y,
        size: 14,
        font: font,
        color: fontColor,
      });
    });
  
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${firstName}_${lastName}_Resume.pdf`;
    link.click();
  
    setTimeout(() => {
      URL.revokeObjectURL(link.href);
      link.remove();
    }, 0);
  };

  
  const handleUpdateCurrentResume = async (event) => {
    event.preventDefault();
    if (!isEditable) {
      setIsEditable(true);
    } else {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(docRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const updatedResumeItems = userData.resumeItems.map((item) => {
              if (item.id === selectedItem) {
                return {
                  ...item,
                  firstName,
                  lastName,
                  personalInfo,
                  contactInfo,
                  education,
                  experience,
                  extraInfo,
                };
              } else {
                return item;
              }
            });
  
            await updateDoc(docRef, {
              selectedItem: selectedItem,
              resumeItems: updatedResumeItems,
            });
            setItems(updatedResumeItems);
          }
        } catch (error) {
          alert('Error updating user: ' + error.message);
        }
      } else {
        alert('No user currently logged in');
      }
      setIsEditable(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const [items, setItems] = useState([
    { id: 'item1', name: 'Resume 1' },
    { id: 'item2', name: 'Resume 2' },
    { id: 'item3', name: 'Resume 3' },
  ]);

  return (
    <div className="user">
      <form>

        <div className="resume-list">
          <h2>Resume List</h2>
          <ul>
            {items.map((item) => (
               <li
               key={item.id}
               className={
                 selectedItem === item.id ? 'resume-list-item selected' : 'resume-list-item'
               }
               onClick={() => setSelectedItem(item.id)}>
               {item.name}
             </li>
            ))}
          </ul>
        </div>

        <div className="main-panel">
          <h1>User Dashboard</h1>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              readOnly={!isEditable}
              className={!isEditable ? 'no-border' : ''}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              readOnly={!isEditable}
              className={!isEditable ? 'no-border' : ''}
            />
          </label>
          <br />
          <label>
            Personal Info:
            <textarea
              value={personalInfo}
              onChange={(e) => setPersonalInfo(e.target.value)}
              readOnly={!isEditable}
              className={!isEditable ? 'no-border' : ''}
            />
          </label>
          <br />
          <label>
            Contact Info:
            <textarea
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              readOnly={!isEditable}
              className={!isEditable ? 'no-border' : ''}
            />
          </label>
          <br />
          <label>
            Education:
            <textarea
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              readOnly={!isEditable}
              className={!isEditable ? 'no-border' : ''}
            />
          </label>
          <br />
          <label>
            Experience:
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              readOnly={!isEditable}
              className={!isEditable ? 'no-border' : ''}
            />
          </label>
          <br />
          <label>
            Extra Info:
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              readOnly={!isEditable}
              className={!isEditable ? 'no-border' : ''}
            />
          </label>
          <div className="user-buttons">
            <Button variant="primary" onClick={handleDownload}>Download</Button>
            <Button onClick={handleUpdateCurrentResume} variant={isEditable ? 'success' : 'primary'}>
              {isEditable ? 'Save' : 'Update'}
            </Button>
            <Button className="logout-button" onClick={handleLogout} variant="danger">
              Logout
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}

export default User;