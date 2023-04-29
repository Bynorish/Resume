const mockDatabase = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    set: jest.fn(),
    get: jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({
        firstName: 'John',
        lastName: 'Doe',
        personalInfo: 'I am John Doe',
        contactInfo: 'john.doe@email.com',
        education: 'GVSU',
        experience: 'Lots of Web Development Experience',
        extraInfo: 'I am a hard worker',
      }),
    }),
  };
  
  export default mockDatabase;