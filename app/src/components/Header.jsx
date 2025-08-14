import React from 'react';
import '../assets/styles/Header.css';

const Header = () => (
  <div>
    <h1>Tigerlab FE Assignment</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/claimlist">Claim List</a></li>
      </ul>
    </nav>
  </div>
); 

export default Header;