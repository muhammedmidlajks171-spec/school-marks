import { useState } from "react";
import "./App.css";

const subjects = [
  "English",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Computer",
];

function getTotal(marks) {
  return Object.values(marks).reduce(
    (total, mark) => total + Number(mark || 0),
    0
  );
}

function getPercentage(marks) {
  return (getTotal(marks) / 500) * 100;
}

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}

function App() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Muhammed",
      roll: "101",
      marks: {
        English: 82,
        Mathematics: 91,
        Physics: 76,
        Chemistry: 88,
        Computer: 95,
      },
    },
  ]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    roll: "",
    English: "",
    Mathematics: "",
    Physics: "",
    Chemistry: "",
    Computer: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function addStudent(event) {
    event.preventDefault();

    if (!form.name || !form.roll) {
      alert("Please enter student name and roll number.");
      return;
    }

    const marks = {};

    subjects.forEach((subject) => {
      marks[subject] = Number(form[subject] || 0);
    });

    const newStudent = {
      id: Date.now(),
      name: form.name,
      roll: form.roll,
      marks,
    };

    setStudents([...students, newStudent]);

    setForm({
      name: "",
      roll: "",
      English: "",
      Mathematics: "",
      Physics: "",
      Chemistry: "",
      Computer: "",
    });
  }

  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.roll.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1>🏫 School Marks Management</h1>
        <p>Student Result Management System</p>
      </header>

      <main className="container">
        <section className="card">
          <h2>➕ Add Student</h2>

          <form onSubmit={addStudent}>
            <div className="form-grid">
              <div>
                <label>Student Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label>Roll Number</label>
                <input
                  name="roll"
                  value={form.roll}
                  onChange={handleChange}
                  placeholder="Enter roll number"
                />
              </div>

              {subjects.map((subject) => (
                <div key={subject}>
                  <label>{subject}</label>
                  <input
                    type="number"
                    name={subject}
                    value={form[subject]}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    placeholder="0 - 100"
                  />
                </div>
              ))}
            </div>

            <button className="add-btn" type="submit">
              Add Student
            </button>
          </form>
        </section>

        <section className="search-box">
          <input
            placeholder="🔍 Search student by name or roll number..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </section>

        <section className="card">
          <div className="result-header">
            <h2>📊 Student Results</h2>
            <span>{filteredStudents.length} Students</span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Roll</th>
                  <th>Name</th>

                  {subjects.map((subject) => (
                    <th key={subject}>{subject}</th>
                  ))}

                  <th>Total</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => {
                  const total = getTotal(student.marks);
                  const percentage = getPercentage(student.marks);
                  const grade = getGrade(percentage);
                  const passed = percentage >= 40;

                  return (
                    <tr key={student.id}>
                      <td>{student.roll}</td>

                      <td className="student-name">
                        {student.name}
                      </td>

                      {subjects.map((subject) => (
                        <td key={subject}>
                          {student.marks[subject]}
                        </td>
                      ))}

                      <td>
                        <strong>{total}/500</strong>
                      </td>

                      <td>{percentage.toFixed(1)}%</td>

                      <td>
                        <span className="grade">{grade}</span>
                      </td>

                      <td>
                        <span
                          className={passed ? "pass" : "fail"}
                        >
                          {passed ? "PASS" : "FAIL"}
                        </span>
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer>
        © 2026 School Marks Management System
      </footer>
    </div>
  );
}

export default App;