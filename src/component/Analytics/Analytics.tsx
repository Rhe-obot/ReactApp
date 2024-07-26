import React, { useContext } from 'react';
import { ClickContext } from '../Click/ClckContext';
import './Analytics.css';
import Navbar from '../Navbar/Navbar';


const Analytics: React.FC = () => {
  const context = useContext(ClickContext);

  if (!context) {
    throw new Error('ClickContext must be used within a ClickProvider');
  }

  const { state } = context;

  return (
    <div className="analytics-container">
      <Navbar />
      <h2>Analytics</h2>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Card ID</th>
            <th>Card Title</th>
            <th>Number of Clicks</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(state.clicks).map(([id, clicks], index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{id}</td>
              <td>{state.titles[Number(id)]}</td>
              <td>{clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;