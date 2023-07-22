"use client"

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import bcryptjs from 'bcryptjs'; // Import bcrypt module

export default function AdminPage() {
  const newPasswordRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('student');
  const [studentData, setStudentData] = useState([]);
  const [facultyData, setFacultyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalStudentData, setOriginalStudentData] = useState([]);
  const [originalFacultyData, setOriginalFacultyData] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCancelClick = () => {
    // Reset studentData back to its original state to cancel editing
    setIsEditing(false);
    setStudentData(originalStudentData);
    setFacultyData(originalFacultyData);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    // Make a copy of studentData to be used for canceling edits
    setOriginalStudentData([...studentData]);
    setOriginalFacultyData([...facultyData]);
  };

  const handleUpdateSubmit = (TUPCID, dataType) => {
    // Find the data to update based on TUPCID and dataType
    const dataToUpdate =
      dataType === 'student'
        ? studentData.find((student) => student.TUPCID === TUPCID)
        : facultyData.find((faculty) => faculty.TUPCID === TUPCID);

    // Access the new password entered by the user using newPasswordRef.current.value
    const newPassword = newPasswordRef.current?.value;

    if (newPassword) {
      // Hash the new password using bcrypt
      bcryptjs.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          // Handle the error (display an error message, etc.)
        } else {
          // Update the dataToUpdate with the new hashed password
          dataToUpdate.PASSWORD = hashedPassword;

          // Send the updated data to the server
          axios
            .put(`http://localhost:3001/${dataType === 'student' ? 'students' : 'faculty'}/${TUPCID}`, dataToUpdate)
            .then((response) => {
              console.log(response.data);
              // Refresh the data after successful update
              fetchStudentOrFacultyData();
            })
            .catch((error) => {
              console.error('Error updating data:', error);
            });
        }
      });
    } else {
      // If the PASSWORD field is not being updated, send the data to the server without hashing
      axios
        .put(`http://localhost:3001/${dataType === 'student' ? 'students' : 'faculty'}/${TUPCID}`, dataToUpdate)
        .then((response) => {
          console.log(response.data);
          // Refresh the data after successful update
          fetchStudentOrFacultyData();
        })
        .catch((error) => {
          console.error('Error updating data:', error);
        });
    }
  };


  const handleDelete = (TUPCID) => {
    // Handle the delete logic here
    axios
      .delete(`http://localhost:3001/${selectedOption === 'student' ? 'students' : 'faculty'}/${TUPCID}`)
      .then((response) => {
        console.log(response.data);
        // Refresh the data after successful delete
        fetchStudentOrFacultyData();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const fetchStudentOrFacultyData = () => {
    if (selectedOption === 'student') {
      axios
        .get('http://localhost:3001/students')
        .then((response) => {
          setStudentData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching student data:', error);
        });
    } else if (selectedOption === 'faculty') {
      axios
        .get('http://localhost:3001/faculty')
        .then((response) => {
          setFacultyData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching faculty data:', error);
        });
    }
  };

  useEffect(() => {
    fetchStudentOrFacultyData();
  }, [selectedOption]);

  const filterStudentData = (data, query) => {
    return data.filter((student) => {
      const fullName = `${student.SURNAME} ${student.FIRSTNAME}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
  };

  const filterFacultyData = (data, query) => {
    return data.filter((faculty) => {
      const fullName = `${faculty.SURNAME} ${faculty.FIRSTNAME}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
  };

  const handleSearch = () => {
    if (selectedOption === 'student') {
      const filteredStudents = filterStudentData(studentData, searchQuery);
      setStudentData(filteredStudents);
    } else if (selectedOption === 'faculty') {
      const filteredFaculty = filterFacultyData(facultyData, searchQuery);
      setFacultyData(filteredFaculty);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchStudentOrFacultyData();
  };

  const filteredStudentData = studentData.filter((student) => {
    const fullName = `${student.SURNAME} ${student.FIRSTNAME}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const filteredFacultyData = facultyData.filter((faculty) => {
    const fullName = `${faculty.SURNAME} ${faculty.FIRSTNAME}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h1>ADMIN PAGE</h1>
      <a href='/login'>LOGOUT</a>
      <div>
        <label htmlFor="databaseOption">Select Database:</label>
        <select
          id="databaseOption"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="student">STUDENT DATABASE</option>
          <option value="faculty">FACULTY DATABASE</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClearSearch}>Clear Search</button>
      </div>

      {selectedOption === 'student' && (
        <div>
          <table>
            {/* Table Header */}
            <thead>
              <tr>
                <th>TUPCID</th>
                <th>SURNAME</th>
                <th>FIRSTNAME</th>
                <th>GSFEACC</th>
                <th>COURSE</th>
                <th>YEAR</th>
                <th>STATUS</th>
                <th>PASSWORD</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {filteredStudentData.map((student) => (
                <tr key={student.TUPCID}>
                  <td>{student.TUPCID}</td>
                  <td>{student.SURNAME}</td>
                  <td>{student.FIRSTNAME}</td>
                  <td>{student.GSFEACC}</td>
                  <td>{student.COURSE}</td>
                  <td>{student.YEAR}</td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={student.YEAR}
                        onChange={(e) =>
                          setStudentData((prevData) =>
                            prevData.map((prevStudent) =>
                              prevStudent.TUPCID === student.TUPCID
                                ? { ...prevStudent, STATUS: e.target.value }
                                : prevStudent
                            )
                          )
                        }
                      />
                    ) : (
                      student.YEAR
                    )}
                  </td>
                  <td></td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={student.STATUS}
                        onChange={(e) =>
                          setStudentData((prevData) =>
                            prevData.map((prevStudent) =>
                              prevStudent.TUPCID === student.TUPCID
                                ? { ...prevStudent, STATUS: e.target.value }
                                : prevStudent
                            )
                          )
                        }
                      />
                    ) : (
                      student.STATUS
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="password"
                        value={student.PASSWORD}
                        onChange={(e) =>
                          setStudentData((prevData) =>
                            prevData.map((prevStudent) =>
                              prevStudent.TUPCID === student.TUPCID
                                ? { ...prevStudent, PASSWORD: e.target.value }
                                : prevStudent
                            )
                          )
                        }
                      />
                    ) : (
                      student.PASSWORD
                    )}
                  </td>
                  
                  <td>
                  {isEditing ? (
                      <div>
                        <button onClick={() => handleUpdateSubmit(student.TUPCID, 'student')}>Update</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                      </div>
                    ) : (
                      <button onClick={handleEditClick}>Edit</button>
                    )}
                    <button onClick={() => handleDelete(student.TUPCID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     {selectedOption === 'faculty' && (
        <div>
          <table>
            {/* Table Header */}
            <thead>
              <tr>
                <th>TUPCID</th>
                <th>SURNAME</th>
                <th>FIRSTNAME</th>
                <th>GSFEACC</th>
                <th>SUBJECT DEPARTMENT</th>
                <th>PASSWORD</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {filteredFacultyData.map((faculty) => (
                <tr key={faculty.TUPCID}>
                  <td>{faculty.TUPCID}</td>
                  <td>{faculty.SURNAME}</td>
                  <td>{faculty.FIRSTNAME}</td>
                  <td>{faculty.GSFEACC}</td>
                  <td>{faculty.SUBJECTDEPT}</td>

                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={faculty.SUBJECTDEPT}
                        onChange={(e) =>
                          setStudentData((prevData) =>
                            prevData.map((prevStudent) =>
                              prevStudent.TUPCID === student.TUPCID
                                ? { ...prevStudent, STATUS: e.target.value }
                                : prevStudent
                            )
                          )
                        }
                      />
                    ) : (
                      faculty.SUBJECTDEPT
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="password"
                        ref={newPasswordRef} // Reference to the new password input
                        defaultValue={faculty.PASSWORD}
                      />
                    ) : (
                      faculty.PASSWORD
                    )}
                  </td>
                  
                  <td>
                  {isEditing ? (
                      <div>
                        <button onClick={() => handleUpdateSubmit(faculty.TUPCID, 'faculty')}>Update</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                      </div>
                    ) : (
                      <button onClick={handleEditClick}>Edit</button>
                    )}
                    <button onClick={() => handleDelete(faculty.TUPCID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}