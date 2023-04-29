import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import User from './User';
import '@testing-library/jest-dom';
import mockDatabase from './mocks/firebase';

jest.mock('./mocks/firebase', () => mockDatabase);

  test('Clickable items', async () => {
    let component;
    await act(async () => {
      component = render(<User />);
    });
    expect(component.getByText('Resume List')).toBeTruthy();
    expect(component.getByText('User Dashboard')).toBeTruthy();
    expect(component.getByText('Download')).toBeTruthy();
    expect(component.getByText('Update')).toBeTruthy();
    expect(component.getByText('Logout')).toBeTruthy();
  });
  

  test('Updatable fields', async () => {
    let getByLabelText, getByText;
    await act(async () => {
      ({ getByLabelText, getByText } = render(<User />));
    });
  
    const updateButton = getByText('Update');
    fireEvent.click(updateButton);
  
    const firstNameInput = getByLabelText('First Name:');
    const lastNameInput = getByLabelText('Last Name:');
    const personalInfoInput = getByLabelText('Personal Info:');
    const contactInfoInput = getByLabelText('Contact Info:');
    const educationInput = getByLabelText('Education:');
    const experienceInput = getByLabelText('Experience:');
    const extraInfoInput = getByLabelText('Extra Info:');
  
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(personalInfoInput, { target: { value: 'I am John Doe' } });
    fireEvent.change(contactInfoInput, { target: { value: 'john.doe@email.com' } });
    fireEvent.change(educationInput, { target: { value: 'GVSU' } });
    fireEvent.change(experienceInput, { target: { value: 'Lots of Web Development Experience' } });
    fireEvent.change(extraInfoInput, { target: { value: 'I am a hard worker' } });
  
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(personalInfoInput.value).toBe('I am John Doe');
    expect(contactInfoInput.value).toBe('john.doe@email.com');
    expect(educationInput.value).toBe('GVSU');
    expect(experienceInput.value).toBe('Lots of Web Development Experience');
    expect(extraInfoInput.value).toBe('I am a hard worker');
  });
  
  test('Non editable fields', async () => {
    let getByLabelText;
    await act(async () => {
      ({ getByLabelText } = render(<User />));
    });
  
    const firstNameInput = getByLabelText('First Name:');
    const lastNameInput = getByLabelText('Last Name:');
    const personalInfoInput = getByLabelText('Personal Info:');
    const contactInfoInput = getByLabelText('Contact Info:');
    const educationInput = getByLabelText('Education:');
    const experienceInput = getByLabelText('Experience:');
    const extraInfoInput = getByLabelText('Extra Info:');
  
    expect(firstNameInput).toBeDisabled();
    expect(lastNameInput).toBeDisabled();
    expect(personalInfoInput).toBeDisabled();
    expect(contactInfoInput).toBeDisabled();
    expect(educationInput).toBeDisabled();
    expect(experienceInput).toBeDisabled();
    expect(extraInfoInput).toBeDisabled();
  });