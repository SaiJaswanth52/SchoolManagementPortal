export const ValidateForm = (formData) => {
  const errors = {};

  // Validate that all fields are filled
  if (!formData.studentid) {
    errors.studentid = "Student ID is required";
  } else if (!/^\d+$/.test(formData.studentid)) {
    // Validate that student ID is an integer
    errors.studentid = "Student ID must be an integer";
  }

  if (!formData.firstname) {
    errors.firstname = "First name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.firstname)) {
    // Validate that first name is a string
    errors.firstname = "First name must be a string";
  }

  if (!formData.lastname) {
    errors.lastname = "Last name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.lastname)) {
    // Validate that last name is a string
    errors.lastname = "Last name must be a string";
  }

  formData.subjectsRegistered.forEach((subject, index) => {
    if (!subject.subjectName) {
      errors[`subjectName_${index}`] = "Subject Name is required";
    }
    if (!subject.teacher) {
      errors[`teacher_${index}`] = "Teacher is required";
    }
  });
  return errors;
};
