import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ClaimList from './ClaimList';

// Mock fetch for claims API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        id: 1,
        number: 'CL-10001',
        incidentDate: '2023-12-01',
        createdAt: '2023-12-02',
        amount: '100.00',
        holder: 'John Doe',
        policyNumber: 'PN-12345',
        insuredItem: 'Car',
        description: 'Accident',
        processingFee: '10.00',
        status: 'Submitted'
      }
    ])
  })
);

describe('ClaimList', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders Claim List and table headers', async () => {
    render(<ClaimList />);
    // Wait for the heading to appear
    expect(await screen.findByRole('heading', { name: /Claim List/i })).toBeInTheDocument();

    expect(await screen.findByText(/Claim ID/i)).toBeInTheDocument();
    expect(await screen.findByText(/Claim Number/i)).toBeInTheDocument();
    expect(await screen.findByText(/Incident Date/i)).toBeInTheDocument();
    expect(await screen.findByText(/Claim Holder/i)).toBeInTheDocument();
  });

  test('renders claim data from API', async () => {
    render(<ClaimList />);
    await waitFor(() => {
      expect(screen.getByText('CL-10001')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Car')).toBeInTheDocument();
      expect(screen.getAllByText('Submitted').length).toBeGreaterThan(0);
    });
  });
});