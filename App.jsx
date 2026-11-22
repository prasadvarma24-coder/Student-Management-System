
import React, { useState } from "react";
import "./App.css";

const initialStudents = [
  { id: 1, name: "Prasad Varma", email: "prasad@gmail.com", course: "React.js", status: "Active", marks: 95 },
  { id: 2, name: "Arjun Kumar", email: "arjun@gmail.com", course: "React.js", status: "Active", marks: 92 },
  { id: 3, name: "Priya Sharma", email: "priya@gmail.com", course: "JavaScript", status: "Active", marks: 85 },
  { id: 4, name: "Rahul Verma", email: "rahul@gmail.com", course: "Python", status: "Pending", marks: 68 },
  { id: 5, name: "Sneha Reddy", email: "sneha@gmail.com", course: "CSS3", status: "Active", marks: 92 },
  { id: 6, name: "Vikram Rao", email: "vikram@gmail.com", course: "HTML5", status: "Inactive", marks: 72 }
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("React.js");

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.course}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const addStudent = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) return;

    const newStudent = {
      id: Date.now(),
      name,
      email,
      course,
      status: "Active",
      marks: 0
    };

    setStudents([...students, newStudent]);
    setName("");
    setEmail("");
    setCourse("React.js");
    setShowForm(false);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Delete this student?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const activeCount = students.filter(
    (s) => s.status === "Active"
  ).length;

  const averageMarks = students.length
    ? Math.round(
        students.reduce((sum, s) => sum + s.marks, 0) / students.length
      )
    : 0;

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">✦ Edu<span>Track</span></h2>

        <p className="menu-label">MENU</p>

        <nav>
          <a className="active" href="#dashboard">▦ Dashboard</a>
          <a href="#students">♙ Students</a>
          <a href="#analytics">▥ Analytics</a>
          <a href="#courses">▤ Courses</a>
          <a href="#settings">⚙ Settings</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">KP</div>
          <div>
            <strong>Prasad Varma</strong>
            <small>Administrator</small>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">

        <header className="topbar">
          <div>
            <p className="breadcrumb">Pages / Dashboard</p>
            <h1>Dashboard Overview</h1>
          </div>

          <div className="top-actions">
            <span className="notification">♧</span>
            <span className="date-label">November 2026</span>
          </div>
        </header>

        {/* Welcome */}
        <section className="welcome">
          <div>
            <span className="welcome-tag">✦ YOUR LEARNING HUB</span>
            <h2>Welcome back, Prasad! 👋</h2>
            <p>Here's what's happening with your students today.</p>
          </div>
          <div className="welcome-icon">🎓</div>
        </section>

        {/* Statistics */}
        <section className="stats-grid">
          <div className="stat-card purple">
            <span>Total Students</span>
            <h2>{students.length}</h2>
            <p>↗ Student records</p>
            <div className="stat-icon">♙</div>
          </div>

          <div className="stat-card blue">
            <span>Active Students</span>
            <h2>{activeCount}</h2>
            <p>Currently enrolled</p>
            <div className="stat-icon">✓</div>
          </div>

          <div className="stat-card orange">
            <span>Courses</span>
            <h2>{new Set(students.map(s => s.course)).size}</h2>
            <p>Available courses</p>
            <div className="stat-icon">▤</div>
          </div>

          <div className="stat-card green">
            <span>Average Score</span>
            <h2>{averageMarks}%</h2>
            <p>Overall performance</p>
            <div className="stat-icon">↗</div>
          </div>
        </section>

        {/* Analytics */}
        <section className="analytics-grid" id="analytics">
          <div className="panel performance">
            <div className="panel-heading">
              <div>
                <h3>Student Performance</h3>
                <p>Individual student marks overview</p>
              </div>
              <span className="chart-label">OUT OF 100</span>
            </div>

            {students.slice(0, 6).map((student) => (
              <div className="bar-row" key={student.id}>
                <span>{student.name.split(" ")[0]}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${student.marks}%` }}
                  />
                </div>
                <strong>{student.marks}%</strong>
              </div>
            ))}
          </div>

          <div className="panel summary">
            <h3>Performance Summary</h3>
            <p>Overall student progress</p>
            <div className="progress-circle">
              <div>
                <strong>{averageMarks}%</strong>
                <small>Average score</small>
              </div>
            </div>
            <p className="summary-note">
              Keep tracking student progress and performance.
            </p>
          </div>
        </section>

        {/* Student table */}
        <section className="panel students-panel" id="students">
          <div className="students-heading">
            <div>
              <h3>Student Management</h3>
              <p>Manage and monitor student records</p>
            </div>

            <button className="add-btn" onClick={() => setShowForm(!showForm)}>
              + Add Student
            </button>
          </div>

          {showForm && (
            <form className="student-form" onSubmit={addStudent}>
              <input
                placeholder="Student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option>React.js</option>
                <option>JavaScript</option>
                <option>Python</option>
                <option>CSS3</option>
                <option>HTML5</option>
              </select>

              <button type="submit" className="add-btn">Save Student</button>
            </form>
          )}

          <input
            className="search-box"
            placeholder="⌕  Search students by name, email or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>COURSE</th>
                  <th>STATUS</th>
                  <th>MARKS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-info">
                        <div className="student-avatar">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <strong>{student.name}</strong>
                          <small>{student.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>{student.course}</td>
                    <td>
                      <span className={`status ${student.status.toLowerCase()}`}>
                        {student.status}
                      </span>
                    </td>
                    <td>{student.marks}%</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="table-footer">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </section>

        <footer>
          © 2026 EduTrack Dashboard. Built with React.js & CSS3.
        </footer>
      </main>
    </div>
  );
}

export default App;
