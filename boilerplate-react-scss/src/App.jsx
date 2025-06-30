import React, { useState } from "react";
import "./scss/style.scss";
import logoBitA from "./img/logo-bitA.png";

function App() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [newItemText, setNewItemText] = useState("");
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Ticket 1",
      items: [
        { id: 1, text: "Item 1", completed: false },
        { id: 2, text: "Item 2", completed: true },
      ]
    },
    {
      id: 2,
      title: "Ticket 2",
      items: [
        { id: 3, text: "Item 3", completed: false },
      ]
    }
  ]);

  const accordionData = [
    {
      id: 1,
      title: "Item Parent 1",
      children: [
        { id: 1, title: "Item Child 1.1" },
        { id: 2, title: "Item Child 1.2" },
        { id: 3, title: "Item Child 1.3" }
      ]
    },
    {
      id: 2,
      title: "Item Parent 2",
      children: [
        { id: 4, title: "Item Child 2.1" },
        { id: 5, title: "Item Child 2.2" }
      ]
    },
    {
      id: 3,
      title: "Item Parent 3",
      children: [
        { id: 6, title: "Item Child 3.1" },
        { id: 7, title: "Item Child 3.2" },
        { id: 8, title: "Item Child 3.3" },
        { id: 9, title: "Item Child 3.4" }
      ]
    }
  ];

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const addItemToTicket = (ticketId) => {
    if (!newItemText.trim()) return;

    const newItem = {
      id: Date.now(),
      text: newItemText.trim(),
      completed: false
    };

    setTickets(tickets.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, items: [...ticket.items, newItem] }
        : ticket
    ));

    setNewItemText("");
    setEditingTicketId(null);
  };

  const startAddingItem = (ticketId) => {
    setEditingTicketId(ticketId);
    setNewItemText("");
  };

  const cancelAddingItem = () => {
    setEditingTicketId(null);
    setNewItemText("");
  };

  const toggleItem = (ticketId, itemId) => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId
        ? {
            ...ticket,
            items: ticket.items.map(item =>
              item.id === itemId
                ? { ...item, completed: !item.completed }
                : item
            )
          }
        : ticket
    ));
  };

  const deleteItem = (ticketId, itemId) => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId
        ? {
            ...ticket,
            items: ticket.items.filter(item => item.id !== itemId)
          }
        : ticket
    ));
  };

  const addNewTicket = () => {
    if (!newTicketTitle.trim()) return;

    const newTicket = {
      id: Date.now(),
      title: newTicketTitle.trim(),
      items: []
    };

    setTickets([...tickets, newTicket]);
    setNewTicketTitle("");
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src={logoBitA} alt="bitA Logo" className="logo-image" />
          </div>
          <button className="burger-menu" type="button" aria-label="Menu">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>
      </header>

      <div className="container">
        {/* Left Side - Accordion */}
        <div className="left-side">
          <div className="accordion">
            {accordionData.map((parent) => (
              <div key={parent.id} className="accordion-item">
                <div
                  className={`accordion-header ${
                    activeAccordion === parent.id ? "active" : ""
                  }`}
                  onClick={() => toggleAccordion(parent.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleAccordion(parent.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <span>{parent.title}</span>
                  <span className="accordion-icon">
                    {activeAccordion === parent.id ? "−" : "+"}
                  </span>
                </div>
                {activeAccordion === parent.id && (
                  <div className="accordion-content">
                    {parent.children.map((child) => (
                      <div key={child.id} className="accordion-child">
                        {child.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Tickets */}
        <div className="right-side">
          <div className="dashboard-title-container">
            <h2 className="dashboard-title">DASHBOARD</h2>
            {/* Add New Ticket Section */}
            <div className="add-ticket-section">
              <input
                type="text"
                value={newTicketTitle}
                onChange={(e) => setNewTicketTitle(e.target.value)}
                placeholder="Enter ticket title"
                className="ticket-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addNewTicket();
                  }
                }}
              />
              <button
                className="create-ticket-btn"
                onClick={addNewTicket}
                type="button"
              >
                Create
              </button>
            </div>
          </div>

          <div className="tickets">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="ticket">
                <div className="ticket-header">
                  <h3>{ticket.title}</h3>
                  <div className="ticket-actions">
                    {editingTicketId === ticket.id ? (
                      <div className="add-item-form">
                        <input
                          type="text"
                          value={newItemText}
                          onChange={(e) => setNewItemText(e.target.value)}
                          placeholder="Enter item name"
                          className="item-input"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addItemToTicket(ticket.id);
                            } else if (e.key === "Escape") {
                              cancelAddingItem();
                            }
                          }}
                        />
                        <button
                          className="save-item-btn"
                          onClick={() => addItemToTicket(ticket.id)}
                          type="button"
                        >
                          Save
                        </button>
                        <button
                          className="cancel-item-btn"
                          onClick={cancelAddingItem}
                          type="button"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-item-btn red-bg"
                        onClick={() => startAddingItem(ticket.id)}
                        type="button"
                        title="Add Item"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="white"
                        >
                          <rect x="9" y="4" width="2" height="12" rx="1" />
                          <rect x="4" y="9" width="12" height="2" rx="1" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                <div className="ticket-items">
                  {ticket.items.map((item) => (
                    <div key={item.id} className="ticket-item">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleItem(ticket.id, item.id)}
                        className="item-checkbox"
                      />
                      <span
                        className={`item-text ${
                          item.completed ? "completed" : ""
                        }`}
                      >
                        {item.text}
                      </span>
                      <button
                        className="delete-item-btn"
                        onClick={() => deleteItem(ticket.id, item.id)}
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
