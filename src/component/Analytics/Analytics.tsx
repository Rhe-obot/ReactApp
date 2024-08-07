import React, { useContext, useEffect } from "react";
import { ClickContext } from "../Click/ClickContext";
import "./Analytics.css";
import Navbar from "../Navbar/Navbar";

const Analytics: React.FC = () => {
  const context = useContext(ClickContext);

  if (!context) {
    throw new Error("ClickContext must be used within a ClickProvider");
  }

  const { state } = context;

  useEffect(() => {
    console.log("Current state in Analytics:", state);
  }, [state]);

  return (
    <div className="analytics-container">
      <Navbar />
      <h2>Analytics</h2>
      {state.articles.length === 0 ? (
        <p>No articles available.</p>
      ) : (
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
            {state.articles.map((article, index) => (
              <tr key={article.id}>
                <td>{index + 1}</td>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{state.clicks[article.id] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Analytics;
