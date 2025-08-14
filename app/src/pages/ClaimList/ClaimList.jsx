import React, { useEffect, useState } from 'react';
import ActionBar from '../../components/ActionBar';
import AddClaimModal from '../../components/AddClaimModal';

const initialForm = {
  number: '',
  incidentDate: '',
  createdAt: '',
  amount: '',
  holder: '',
  policyNumber: '',
  insuredItem: '',
  description: '',
  processingFee: '',
  status: '',
};

const ClaimList = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);

  // Fetch claims from API
  const fetchClaims = () => {
    setLoading(true);
    fetch('http://localhost:8001/api/v1/claims')
      .then(res => res.json())
      .then(data => {
        setClaims(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  // Filter claims by claim id, number, holder, policy number, and status
  const filteredClaims = claims.filter(claim =>
    (
      claim.id?.toString().includes(searchTerm.trim()) ||
      claim.number?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      claim.holder?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      claim.policyNumber?.toLowerCase().includes(searchTerm.trim().toLowerCase())
    ) &&
    (statusFilter === '' || claim.status === statusFilter)
  );

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setForm(initialForm);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidAmount = value =>
    /^\d+(\.\d{2})$/.test(value);

  // Pass fetchClaims to modal so it can refresh after adding
  const handleSubmit = e => {
    e.preventDefault();
    if (!isValidAmount(form.amount)) {
      alert('Claim amount must be a string with 2 decimal points, e.g., "15.50"');
      return;
    }
    if (!isValidAmount(form.processingFee)) {
      alert('Processing fee must be a string with 2 decimal points, e.g., "15.50"');
      return;
    }
    // The POST logic is handled in AddClaimModal via API
    // This function is only needed if you want to handle local state
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Claim List</h1>
      <ActionBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onAddClaim={handleShowModal}
      />

      <table border="1" cellPadding="8" cellSpacing="0" className="table">
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Claim Number</th>
            <th>Incident Date</th>
            <th>Created At</th>
            <th>Amount</th>
            <th>Claim Holder</th>
            <th>Policy Number</th>
            <th>Insured Item</th>
            <th>Description</th>
            <th>Processing Fee</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.map((claim, idx) => (
            <tr key={claim.id || idx}>
              <td>{claim.id}</td>
              <td>{claim.number}</td>
              <td>{claim.incidentDate}</td>
              <td>{claim.createdAt}</td>
              <td>{claim.amount}</td>
              <td>{claim.holder}</td>
              <td>{claim.policyNumber}</td>
              <td>{claim.insuredItem}</td>
              <td>{claim.description}</td>
              <td>{claim.processingFee}</td>
              <td>{claim.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddClaimModal
        show={showModal}
        handleClose={handleCloseModal}
        form={form}
        handleChange={handleChange}
        setForm={setForm}
        refreshClaims={fetchClaims}
      />
    </div>
  );
};

export default ClaimList;