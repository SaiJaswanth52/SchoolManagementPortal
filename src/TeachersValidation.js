export const validateTeacherForm = (formData) => {
  const errors = {};

  // Validate that all fields are filled
  if (!formData.teacherId) {
    errors.teacherId = "Teacher ID is required";
  } else if (!/^\d+$/.test(formData.teacherId)) {
    // Validate that teacher ID is an integer
    errors.teacherId = "Teacher ID must be an integer";
  }

  if (!formData.firstName) {
    errors.firstName = "First name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
    // Validate that first name is a string
    errors.firstName = "First name must be a string";
  }

  if (!formData.lastName) {
    errors.lastName = "Last name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
    // Validate that last name is a string
    errors.lastName = "Last name must be a string";
  }

  if (!formData.teaches) {
    errors.teaches = "Teaches field is required";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.teaches)) {
    // Validate that teaches is a string
    errors.teaches = "Teaches field must be a string";
  }

  return errors;
};
