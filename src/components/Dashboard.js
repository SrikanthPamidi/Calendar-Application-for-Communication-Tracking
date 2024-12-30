import React, { useState } from "react";
import CalendarView from "./CalendarView"; // Import CalendarView
import "./Dashboard.css"; // Import the CSS for styling

const Dashboard = () => {
  const [companies, setCompanies] = useState([
    {
      name: "Company A",
      location: "Location A",
      communications: [
        {
          method: "LinkedIn Post",
          date: "2024-12-20",
          comment: "Posted company update.",
        },
        {
          method: "Email",
          date: "2024-12-15",
          comment: "Sent project update.",
        },
        {
          method: "Phone Call",
          date: "2024-12-30",
          comment: "Scheduled follow-up.",
        },
      ],
    },
    {
      name: "Company B",
      location: "Location B",
      communications: [
        {
          method: "LinkedIn Post",
          date: "2024-12-18",
          comment: "Updated company profile.",
        },
        {
          method: "Email",
          date: "2024-12-10",
          comment: "Follow-up on meeting.",
        },
        { method: "Zoom Call", date: "2024-12-28", comment: "Scheduled demo." },
      ],
    },
    {
      name: "Company C",
      location: "Location C",
      communications: [
        {
          method: "Phone Call",
          date: "2024-12-12",
          comment: "Discussed new product.",
        },
        { method: "Email", date: "2024-12-05", comment: "Sent invitation." },
        { method: "Email", date: "2024-12-25", comment: "Reminder email." },
      ],
    },
  ]);

  const [communicationMethods, setCommunicationMethods] = useState([
    {
      name: "LinkedIn Post",
      description: "Post on LinkedIn",
      mandatory: true,
      sequence: 1,
    },
    {
      name: "Email",
      description: "Send an Email",
      mandatory: true,
      sequence: 2,
    },
    {
      name: "Phone Call",
      description: "Call the company",
      mandatory: false,
      sequence: 3,
    },
  ]);

  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    mandatory: false,
    sequence: 0,
  });

  const [newCompany, setNewCompany] = useState({
    name: "",
    location: "",
    linkedinProfile: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "",
  });

  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);

  // Notification counts
  const getNotificationCounts = () => {
    let overdueCount = 0;
    let todaysCount = 0;

    companies.forEach((company) => {
      company.communications.forEach((communication) => {
        const today = new Date();
        const communicationDate = new Date(communication.date);

        if (communicationDate < today) overdueCount++; // Overdue
        if (communicationDate.toDateString() === today.toDateString())
          todaysCount++; // Due today
      });
    });

    return { overdueCount, todaysCount };
  };

  const { overdueCount, todaysCount } = getNotificationCounts();

  // Add new company
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    setCompanies((prevCompanies) => [
      ...prevCompanies,
      { ...newCompany, communications: [] },
    ]);
    setNewCompany({
      name: "",
      location: "",
      linkedinProfile: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: "",
    });
  };

  // Add/Edit Communication Method
  const handleMethodChange = (e) => {
    const { name, value } = e.target;
    setNewMethod((prevMethod) => ({
      ...prevMethod,
      [name]: value,
    }));
  };

  const handleAddMethod = (e) => {
    e.preventDefault();
    if (newMethod.name) {
      setCommunicationMethods((prevMethods) => [
        ...prevMethods,
        {
          ...newMethod,
          sequence: prevMethods.length + 1,
        },
      ]);
      setNewMethod({
        name: "",
        description: "",
        mandatory: false,
        sequence: 0,
      });
    }
  };

  const handleEditMethod = (index) => {
    const methodToEdit = communicationMethods[index];
    setNewMethod(methodToEdit);
  };

  const handleDeleteMethod = (index) => {
    setCommunicationMethods((prevMethods) =>
      prevMethods.filter((_, i) => i !== index)
    );
  };

  const toggleMandatoryFlag = (index) => {
    setCommunicationMethods((prevMethods) =>
      prevMethods.map((method, i) =>
        i === index ? { ...method, mandatory: !method.mandatory } : method
      )
    );
  };

  // Check Communication Status
  const checkCommunicationStatus = (date) => {
    const today = new Date();
    const communicationDate = new Date(date);

    if (communicationDate < today) return "red"; // Overdue
    if (communicationDate.toDateString() === today.toDateString())
      return "yellow"; // Due today
    return "green"; // Future communication
  };

  // Toggle Notification visibility
  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };

  const handleCompanySelection = (companyName) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(companyName)
        ? prevSelected.filter((name) => name !== companyName)
        : [...prevSelected, companyName]
    );
  };

  const handleLogCommunication = (method, date, comment) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        selectedCompanies.includes(company.name)
          ? {
              ...company,
              communications: [
                ...company.communications,
                { method, date, comment },
              ],
            }
          : company
      )
    );
  };

  return (
    <div className="dashboard">
      <h2>Company Communications</h2>

      {/* Notification Icon with Badge */}
      <div
        className="notification-icon"
        onClick={toggleNotifications}
        style={{ cursor: "pointer" }} // Add pointer cursor for clickability
      >
        <span className="icon">🔔</span>
        <span className="badge">{overdueCount + todaysCount}</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Company Name</th>
            <th>Last Five Communications</th>
            <th>Next Scheduled Communication</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCompanySelection(company.name)}
                  checked={selectedCompanies.includes(company.name)}
                />
              </td>
              <td>{company.name}</td>
              <td>
                <ul>
                  {company.communications.map((comm, commIndex) => (
                    <li key={commIndex} title={comm.comment || "No comments"}>
                      {comm.method} on {comm.date}
                    </li>
                  ))}
                </ul>
              </td>
              <td
                className={`status ${checkCommunicationStatus(
                  company.communications[2]?.date || ""
                )}`}
              >
                {company.communications[2]?.method} on{" "}
                {company.communications[2]?.date || "N/A"}
              </td>
              <td>
                <button>Edit</button>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Log Communication across Selected Companies */}
      <div className="log-communication">
        <h2>Log Communication for Selected Companies</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const method = e.target.method.value;
            const date = e.target.date.value;
            const comment = e.target.comment.value;
            handleLogCommunication(method, date, comment);
          }}
        >
          <label>Method</label>
          <input
            type="text"
            name="method"
            placeholder="Enter Communication Method"
          />
          <label>Date</label>
          <input type="date" name="date" />
          <label>Comment</label>
          <input type="text" name="comment" />
          <button type="submit">Log Communication</button>
        </form>
      </div>

      {/* Add New Company Form */}
      <div className="add-company-form">
        <h2>Add New Company</h2>
        <form onSubmit={handleAddCompany}>
          <label>Company Name</label>
          <input
            type="text"
            name="name"
            value={newCompany.name}
            onChange={handleInputChange}
            placeholder="Enter Company Name"
          />
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={newCompany.location}
            onChange={handleInputChange}
            placeholder="Enter Company Location"
          />
          <label>LinkedIn Profile</label>
          <input
            type="text"
            name="linkedinProfile"
            value={newCompany.linkedinProfile}
            onChange={handleInputChange}
            placeholder="Enter LinkedIn Profile"
          />
          <label>Emails</label>
          <input
            type="text"
            name="emails"
            value={newCompany.emails}
            onChange={handleInputChange}
            placeholder="Enter Company Emails"
          />
          <label>Phone Numbers</label>
          <input
            type="text"
            name="phoneNumbers"
            value={newCompany.phoneNumbers}
            onChange={handleInputChange}
            placeholder="Enter Company Phone Numbers"
          />
          <label>Comments</label>
          <input
            type="text"
            name="comments"
            value={newCompany.comments}
            onChange={handleInputChange}
            placeholder="Enter Company Comments"
          />
          <label>Periodicity</label>
          <input
            type="text"
            name="periodicity"
            value={newCompany.periodicity}
            onChange={handleInputChange}
            placeholder="Enter Communication Periodicity"
          />
          <button type="submit">Add Company</button>
        </form>
      </div>

      {/* Communication Method Management Form */}
      <div className="communication-method-management">
        <h2>Manage Communication Methods</h2>
        <form onSubmit={handleAddMethod}>
          <label>Communication Method Name</label>
          <input
            type="text"
            name="name"
            value={newMethod.name}
            onChange={handleMethodChange}
            placeholder="Enter Communication Method Name"
          />
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={newMethod.description}
            onChange={handleMethodChange}
            placeholder="Enter Description"
          />
          <label>Sequence</label>
          <input
            type="number"
            name="sequence"
            value={newMethod.sequence}
            onChange={handleMethodChange}
            placeholder="Enter Sequence"
          />
          <label>Mandatory</label>
          <input
            type="checkbox"
            name="mandatory"
            checked={newMethod.mandatory}
            onChange={() =>
              setNewMethod((prevState) => ({
                ...prevState,
                mandatory: !prevState.mandatory,
              }))
            }
          />
          <button type="submit">Add/Update Communication Method</button>
        </form>

        {/* Attractive Table for Existing Communication Methods */}
        <h3>Existing Communication Methods</h3>
        <table className="method-table">
          <thead>
            <tr>
              <th>Method Name</th>
              <th>Description</th>
              <th>Sequence</th>
              <th>Mandatory</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {communicationMethods.map((method, index) => (
              <tr key={index}>
                <td>{method.name}</td>
                <td>{method.description}</td>
                <td>{method.sequence}</td>
                <td>{method.mandatory ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => handleEditMethod(index)}>Edit</button>
                  <button onClick={() => handleDeleteMethod(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Calendar View */}
      <h2>Calendar View</h2>
      <CalendarView communications={companies} />

      {/* Notifications Section (only visible when showNotifications is true) */}
      {showNotifications && (
        <div className="notifications">
          <h2>Notifications</h2>
          <div className="overdue-grid">
            <h3>Overdue Communications</h3>
            <ul>
              {companies.flatMap((company) =>
                company.communications
                  .filter(
                    (comm) =>
                      new Date(comm.date) < new Date() &&
                      new Date(comm.date) !== "Invalid Date"
                  )
                  .map((comm, index) => (
                    <li key={index}>
                      {comm.method} scheduled on {comm.date}
                    </li>
                  ))
              )}
            </ul>
          </div>

          <div className="todays-grid">
            <h3>Today's Communications</h3>
            <ul>
              {companies.flatMap((company) =>
                company.communications
                  .filter(
                    (comm) =>
                      new Date(comm.date).toDateString() ===
                      new Date().toDateString()
                  )
                  .map((comm, index) => (
                    <li key={index}>
                      {comm.method} scheduled for today ({comm.date})
                    </li>
                  ))
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
