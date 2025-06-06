import React from 'react';

const Events = () => {
  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const eventStyle = {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '6px',
    boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    color: '#2c3e50',
    marginBottom: '8px'
  };

  const descriptionStyle = {
    color: '#555',
    lineHeight: '1.4'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#34495e' }}>Latest School Events</h2>
      
      <div style={eventStyle}>
        <h3 style={titleStyle}>Annual Sports Day</h3>
        <p style={descriptionStyle}>A day filled with various sports competitions and activities for students of all grades.</p>
      </div>

      <div style={eventStyle}>
        <h3 style={titleStyle}>Science Exhibition</h3>
        <p style={descriptionStyle}>Students showcase their innovative science projects and experiments.</p>
      </div>

      <div style={eventStyle}>
        <h3 style={titleStyle}>Cultural Fest</h3>
        <p style={descriptionStyle}>Celebration of diverse cultures with dance, music, and drama performances by students.</p>
      </div>

      <div style={eventStyle}>
        <h3 style={titleStyle}>Art Competition</h3>
        <p style={descriptionStyle}>Students compete by submitting paintings, sketches, and sculptures.</p>
      </div>

      <div style={eventStyle}>
        <h3 style={titleStyle}>Debate Tournament</h3>
        <p style={descriptionStyle}>Teams from various classes debate on current affairs and social issues.</p>
      </div>

      <div style={eventStyle}>
        <h3 style={titleStyle}>Environmental Awareness Week</h3>
        <p style={descriptionStyle}>Activities and workshops promoting sustainability and green living.</p>
      </div>

      <div style={eventStyle}>
        <h3 style={titleStyle}>Music Concert</h3>
        <p style={descriptionStyle}>An evening of performances by the school choir and bands.</p>
      </div>
    </div>
  );
};

export default Events;
