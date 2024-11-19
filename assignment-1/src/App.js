import './App.css';
import './Style.css';
import React, { useState } from 'react';
import InputComponent from "./components/InputComponent";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "",
    subjects: [],
    url: "",
    choice: "",
    about: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("name",name);
    // console.log("value",value);
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    console.log("checked",checked);
    console.log("value",value);
    setFormData((prev) => ({
      ...prev,
      subjects: checked
        ? [...prev.subjects, value]
        : prev.subjects.filter((subject) => subject !== value),
    }));
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      gender: "",
      subjects: [],
      url: "",
      choice: "",
      about: "",
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.contact || !/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Valid 10-digit contact is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.url || !/^https?:\/\//.test(formData.url))
      newErrors.url = "Valid URL is required";
    if (!formData.choice) newErrors.choice = "Please select an option";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      console.log(formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        gender: "",
        subjects: [],
        url: "",
        choice: "",
        about: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form-container">
      <h1 className="form-header">Form in React</h1>
        <InputComponent
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter First Name"
          validationMessage={errors.firstName}
          required
        />
        <InputComponent
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter Last Name"
          validationMessage={errors.lastName}
          required
        />
        <InputComponent
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          validationMessage={errors.email}
          required
        />
        <InputComponent
          label="Contact"
          name="contact"
          type="tel"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Enter Contact"
          validationMessage={errors.contact}
          required
        />

        <div>
          <label>Gender <span>*</span></label>
          <div className="radio-option">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
          {errors.gender && <small>{errors.gender}</small>}
        </div>

        <div>
          <label>Your Best Subject</label>
          <div className='subject-option'>
            <label>
              <input
                type="checkbox"
                name="subjects"
                value="English"
                checked={formData.subjects.includes("English")}
                onChange={handleCheckboxChange}
              />
              English
            </label>
            <label>
              <input
                type="checkbox"
                name="subjects"
                value="Maths"
                checked={formData.subjects.includes("Maths")}
                onChange={handleCheckboxChange}
              />
              Maths
            </label>
            <label>
              <input
                type="checkbox"
                name="subjects"
                value="Physics"
                checked={formData.subjects.includes("Physics")}
                onChange={handleCheckboxChange}
              />
              Physics
            </label>
          </div>
          {errors.subjects && <small>{errors.subjects}</small>}
        </div>

        <InputComponent
          label="Enter URL"
          name="url"
          type="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="Enter URL"
          validationMessage={errors.url}
          required
        />

        <div className="dropdown">
          <label>Select your choice</label>
          <select
            name="choice"
            value={formData.choice}
            onChange={handleChange}
          >
            <option value="">Select your answer</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
          {errors.choice && <small>{errors.choice}</small>}
        </div>

        <div>
          <label>About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="About yourself"
          />
        </div>

        <div className="button-container">
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
