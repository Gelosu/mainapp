const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const connection = require('./db');
const bcryptjs = require('bcryptjs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser('mySecretKey'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// Check if the TUPCID already exists in the database for both students and faculty
const checkTUPCIDExists = (TUPCID, table) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT TUPCID FROM ${table} WHERE TUPCID = ?`;
    connection.query(query, [TUPCID], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length > 0);
      }
    });
  });
};

// FOR STUDENT REGISTRATION
app.post('/studreg', (req, res) => {
  const {
    TUPCID,
    SURNAME,
    FIRSTNAME,
    GSFEACC,
    COURSE,
    YEAR,
    STATUS,
    PASSWORD,
  } = req.body;

  // Check if the TUPCID already exists in the student_accounts table
  checkTUPCIDExists(TUPCID, 'student_accounts')
    .then((exists) => {
      if (exists) {
        res.status(409).send({ message: 'TUPCID already exists. Student registration failed.' });
      } else {
        // TUPCID does not exist, proceed with student registration
        if (STATUS === 'REGULAR' || STATUS === 'IRREGULAR') {
          // Hash the password before storing it in the database
          bcryptjs.hash(PASSWORD, 10, (err, hashedPassword) => {
            if (err) {
              console.error('Error hashing password:', err);
              res.status(500).send({ message: 'Server error' });
            } else {
              const query = `INSERT INTO student_accounts (TUPCID, SURNAME, FIRSTNAME, GSFEACC, COURSE, YEAR, STATUS, PASSWORD) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
              connection.query(
                query,
                [TUPCID, SURNAME, FIRSTNAME, GSFEACC, COURSE, YEAR, STATUS, hashedPassword], // Use hashedPassword here
                (err, result) => {
                  if (err) {
                    console.error('Error executing the INSERT query:', err);
                    res.status(500).send({ message: 'Database error' });
                  } else {
                    res.status(200).send({ message: 'Student registered successfully' });
                  }
                }
              );
            }
          });
        } else {
          res.status(400).send({ message: 'Invalid STATUS value' });
        }
      }
    })
    .catch((err) => {
      console.error('Error checking TUPCID in the database:', err);
      res.status(500).send({ message: 'Database error' });
    });
});

// FOR PROFESSOR REGISTRATION
app.post('/facultyreg', (req, res) => {
  const {
    TUPCID,
    SURNAME,
    FIRSTNAME,
    GSFEACC,
    SUBJECTDEPT,
    PASSWORD,
  } = req.body;

  // Check if the TUPCID already exists in the faculty_accounts table
  checkTUPCIDExists(TUPCID, 'faculty_accounts')
    .then((exists) => {
      if (exists) {
        res.status(409).send({ message: 'TUPCID already exists. Faculty registration failed.' });
      } else {
        // TUPCID does not exist, proceed with faculty registration
        bcryptjs.hash(PASSWORD, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Error hashing password:', err);
            res.status(500).send({ message: 'Server error' });
          } else {
            const query = `INSERT INTO faculty_accounts (TUPCID, SURNAME, FIRSTNAME, GSFEACC, SUBJECTDEPT, PASSWORD) 
                           VALUES (?, ?, ?, ?, ?, ?)`;
            connection.query(
              query,
              [TUPCID, SURNAME, FIRSTNAME, GSFEACC, SUBJECTDEPT, hashedPassword],
              (err, result) => {
                if (err) {
                  console.error('Error executing the INSERT query:', err);
                  res.status(500).send({ message: 'Database error' });
                } else {
                  res.status(200).send({ message: 'Faculty registered successfully' });
                }
              }
            );
          }
        });
      }
    })
    .catch((err) => {
      console.error('Error checking TUPCID in the database:', err);
      res.status(500).send({ message: 'Database error' });
    });
});


// DELETE STUDENT DATA
app.delete('/students/:TUPCID', (req, res) => {
  const { TUPCID } = req.params;
  const query = 'DELETE FROM student_accounts WHERE TUPCID = ?';
  connection.query(query, [TUPCID], (err, result) => {
    if (err) {
      console.error('Error deleting student data:', err);
      res.status(500).send({ message: 'Database error' });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ message: 'Student not found' });
    } else {
      res.status(200).send({ message: 'Student deleted successfully' });
    }
  });
});

// DELETE FACULTY DATA
app.delete('/faculty/:TUPCID', (req, res) => {
  const { TUPCID } = req.params;
  const query = 'DELETE FROM faculty_accounts WHERE TUPCID = ?';
  connection.query(query, [TUPCID], (err, result) => {
    if (err) {
      console.error('Error deleting faculty data:', err);
      res.status(500).send({ message: 'Database error' });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ message: 'Faculty not found' });
    } else {
      res.status(200).send({ message: 'Faculty deleted successfully' });
    }
  });
});

// UPDATE STUDENT DATA
app.put('/students/:TUPCID', (req, res) => {
  const { TUPCID } = req.params;
  const {
    SURNAME,
    FIRSTNAME,
    GSFEACC,
    COURSE,
    YEAR,
    STATUS,
    PASSWORD,
  } = req.body;

  // Check if the TUPCID exists in the student_accounts table
  checkTUPCIDExists(TUPCID, 'student_accounts')
    .then((exists) => {
      if (!exists) {
        res.status(404).send({ message: 'Student not found' });
      } else {
        // Hash the password before updating (if provided)
        if (PASSWORD) {
          const bcryptjs = require('bcryptjs');
          bcryptjs.hash(PASSWORD, 10, (err, hashedPassword) => {
            if (err) {
              console.error('Error hashing password:', err);
              res.status(500).send({ message: 'Server error' });
            } else {
              const query = `UPDATE student_accounts
                             SET SURNAME = ?, FIRSTNAME = ?, GSFEACC = ?, COURSE = ?, YEAR = ?, STATUS = ?, PASSWORD = ?
                             WHERE TUPCID = ?`;

              connection.query(
                query,
                [SURNAME, FIRSTNAME, GSFEACC, COURSE, YEAR, STATUS, hashedPassword, TUPCID], // Use hashedPassword here
                (err, result) => {
                  if (err) {
                    console.error('Error updating student data:', err);
                    res.status(500).send({ message: 'Database error' });
                  } else {
                    res.status(200).send({ message: 'Student updated successfully' });
                  }
                }
              );
            }
          });
        } else {
          // If the PASSWORD field is not being updated, send the data to the server without hashing
          const query = `UPDATE student_accounts
                         SET SURNAME = ?, FIRSTNAME = ?, GSFEACC = ?, COURSE = ?, YEAR = ?, STATUS = ?
                         WHERE TUPCID = ?`;

          connection.query(
            query,
            [SURNAME, FIRSTNAME, GSFEACC, COURSE, YEAR, STATUS, TUPCID],
            (err, result) => {
              if (err) {
                console.error('Error updating student data:', err);
                res.status(500).send({ message: 'Database error' });
              } else {
                res.status(200).send({ message: 'Student updated successfully' });
              }
            }
          );
        }
      }
    })
    .catch((err) => {
      console.error('Error checking TUPCID in the database:', err);
      res.status(500).send({ message: 'Database error' });
    });
});

// UPDATE FACULTY DATA
app.put('/faculty/:TUPCID', (req, res) => {
  const { TUPCID } = req.params;
  const {
    SURNAME,
    FIRSTNAME,
    GSFEACC,
    SUBJECTDEPT,
    PASSWORD,
  } = req.body;

  // Check if the TUPCID exists in the faculty_accounts table
  checkTUPCIDExists(TUPCID, 'faculty_accounts')
    .then((exists) => {
      if (!exists) {
        res.status(404).send({ message: 'Faculty not found' });
      } else {
        // Hash the password before updating (if provided)
        if (PASSWORD) {
          bcryptjs.hash(PASSWORD, 10, (err, hashedPassword) => {
            if (err) {
              console.error('Error hashing password:', err);
              res.status(500).send({ message: 'Server error' });
            } else {
              const query = `UPDATE faculty_accounts
                             SET SURNAME = ?, FIRSTNAME = ?, GSFEACC = ?, SUBJECTDEPT = ?, PASSWORD = ?
                             WHERE TUPCID = ?`;

              connection.query(
                query,
                [SURNAME, FIRSTNAME, GSFEACC, SUBJECTDEPT, hashedPassword, TUPCID], // Use hashedPassword here
                (err, result) => {
                  if (err) {
                    console.error('Error updating faculty data:', err);
                    res.status(500).send({ message: 'Database error' });
                  } else {
                    res.status(200).send({ message: 'Faculty updated successfully' });
                  }
                }
              );
            }
          });
        } else {
          // If the PASSWORD field is not being updated, send the data to the server without hashing
          const query = `UPDATE faculty_accounts
                         SET SURNAME = ?, FIRSTNAME = ?, GSFEACC = ?, SUBJECTDEPT = ?
                         WHERE TUPCID = ?`;

          connection.query(
            query,
            [SURNAME, FIRSTNAME, GSFEACC, SUBJECTDEPT, TUPCID],
            (err, result) => {
              if (err) {
                console.error('Error updating faculty data:', err);
                res.status(500).send({ message: 'Database error' });
              } else {
                res.status(200).send({ message: 'Faculty updated successfully' });
              }
            }
          );
        }
      }
    })
    .catch((err) => {
      console.error('Error checking TUPCID in the database:', err);
      res.status(500).send({ message: 'Database error' });
    });
});


// GET STUDENT DATA
app.get('/students', (req, res) => {
  const query = 'SELECT TUPCID, SURNAME, FIRSTNAME, GSFEACC, COURSE, YEAR, STATUS, PASSWORD FROM student_accounts';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching student data:', err);
      res.status(500).send({ message: 'Database error' });
    } else {
      res.status(200).send(result);
    }
  });
});

// GET FACULTY DATA
app.get('/faculty', (req, res) => {
  const query = 'SELECT TUPCID, SURNAME, FIRSTNAME, GSFEACC, SUBJECTDEPT, PASSWORD FROM faculty_accounts';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching faculty data:', err);
      res.status(500).send({ message: 'Database error' });
    } else {
      res.status(200).send(result);
    }
  });
});


//getdata for students
app.get('/students', (req, res) => {
  const query = 'SELECT TUPCID, SURNAME, FIRSTNAME, GSFEACC, COURSE, YEAR, STATUS, PASSWORD FROM student_accounts';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching student data:', err);
      res.status(500).send({ message: 'Database error' });
    } else {
      res.status(200).send(result);
    }
  });
});

//getdata for faculty
// Fetch all faculty data from the faculty_accounts table
app.get('/faculty', (req, res) => {
  const query = 'SELECT TUPCID, SURNAME, FIRSTNAME, GSFEACC, SUBJECTDEPT, PASSWORD FROM faculty_accounts';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error executing the SELECT query:', err);
      res.status(500).send({ message: 'Database error' });
      return;
    }
    res.status(200).send(result);
  });
});



app.listen(3001, () => {
  console.log('Server started on port 3001');
});
