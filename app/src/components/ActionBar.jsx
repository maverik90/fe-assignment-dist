import React from 'react';
import '../assets/styles/ActionBar.css';
import Button from 'react-bootstrap/Button';

const statuses = [
  '',
  'Submitted',
  'Approved',
  'Processed',
  'Completed',
  'Rejected'
];

const ActionBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onAddClaim }) => (
  <div>
    <ul className="actionbar">
      <li>
        <Button variant="primary" onClick={onAddClaim}>Add Claim</Button>
      </li>
      <li>
        <input
          type="text"
          id="claimSearchInput"
          placeholder="Search by ID, Holder or Policy..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </li>
      <li>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="form-select"
        >
          <option value="">All Statuses</option>
          {statuses.slice(1).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </li>
    </ul>
  </div>
);

export default ActionBar;