import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../assets/styles/AddClaimModal.css';

const statuses = [
  '',
  'Submitted',
  'Approved',
  'Processed',
  'Completed',
  'Rejected'
];

const AddClaimModal = ({ show, handleClose, form, handleChange, setForm, refreshClaims }) => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/api/v1/policies', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => setPolicies(data))
      .catch(() => setPolicies([]));
  }, []);

  const isValidAmount = value => /^\d+(\.\d{2})$/.test(value);

  // Prefill holder name when policy number changes
  const handlePolicyChange = (e) => {
    const value = e.target.value;
    handleChange(e); // update policyNumber in form

    // Find the selected policy and set holder name
    const selectedPolicy = policies.find(policy => policy.number === value);
    if (selectedPolicy && selectedPolicy.holder) {
      setForm(prev => ({ ...prev, holder: selectedPolicy.holder }));
    }
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidAmount(form.amount)) {
        alert('Claim amount must be a string with 2 decimal points, e.g., "15.50"');
        return;
    }
    if (!isValidAmount(form.processingFee)) {
        alert('Processing fee must be a string with 2 decimal points, e.g., "15.50"');
        return;
    }

    // Incident date validation: more than 6 months ago and less than tomorrow
    const incidentDate = new Date(form.incidentDate);
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    if (incidentDate > today) {
        alert('Incident date must be less than tomorrow.');
        return;
    }
    if (incidentDate < sixMonthsAgo) {
        alert('Incident date must be within the last 6 months.');
        return;
    }

    const claimData = {
        amount: form.amount,
        holder: form.holder,
        policyNumber: form.policyNumber,
        insuredName: form.insuredName,
        description: form.description,
        processingFee: form.processingFee,
        incidentDate: form.incidentDate
        // Do NOT send number, createdAt, or status; middleware will generate these
    };

    try {
        const res = await fetch('http://localhost:8001/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claimData)
        });
        if (res.ok) {
        alert('Claim created successfully!');
        handleClose();
        setForm({
            number: '',
            incidentDate: '',
            createdAt: '',
            amount: '',
            holder: '',
            policyNumber: '',
            insuredName: '',
            description: '',
            processingFee: '',
            status: '',
        });
        if (typeof refreshClaims === 'function') {
            refreshClaims();
        }
        } else {
        const error = await res.json();
        alert(error.error || 'Failed to create claim.');
        }
    } catch (err) {
        alert('Error creating claim.');
    }
    };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Claim</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="primary-form claimForm">
          <div className="mb-2">
            <label htmlFor="number">Claim Number</label>
            <input id="number" name="number" value={form.number} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-2">
            <label htmlFor="incidentDate">Incident Date</label>
            <input id="incidentDate" name="incidentDate" type="date" value={form.incidentDate} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-2">
            <label htmlFor="createdAt">Created At</label>
            <input id="createdAt" name="createdAt" type="date" value={form.createdAt} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-2">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="form-control"
              pattern="\d+(\.\d{2})"
              title="Please enter a number with 2 decimal places (e.g. 15.50)"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="holder">Holder Name</label>
            <input id="holder" name="holder" value={form.holder} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-2">
            <label htmlFor="policyNumber">Policy Number</label>
            <select
              id="policyNumber"
              name="policyNumber"
              value={form.policyNumber}
              onChange={handlePolicyChange}
              required
              className="form-control form-select"
            >
              <option value="">Select Policy Number</option>
              {policies.map(policy => (
                <option key={policy.number} value={policy.number}>
                  {policy.number}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="insuredName">Insured Item</label>
            <input id="insuredName" name="insuredName" value={form.insuredName} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-2">
            <label htmlFor="description">Description</label>
            <input id="description" name="description" value={form.description} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-2">
            <label htmlFor="processingFee">Processing Fee</label>
            <input
              id="processingFee"
              name="processingFee"
              value={form.processingFee}
              onChange={handleChange}
              required
              className="form-control"
              pattern="\d+(\.\d{2})"
              title="Please enter a number with 2 decimal places (e.g. 15.50)"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="form-control form-select"
            >
              <option value="">Select Status</option>
              {statuses.slice(1).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <Button variant="primary" type="submit">Add</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddClaimModal;