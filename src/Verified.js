import React from 'react';

const Verified = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    backgroundColor: '#EFE9D5',
      flexDirection: 'column'
    }}>
      {/* <img
        src="icons8-check.gif" 
        alt="Success"
        style={{ width: '120px', height: '120px', marginBottom: '20px' }}
      /> */}
      <h1 style={{ color: '#497D74', fontSize: '2rem', marginBottom: '10px' }}> Ride Posted Successfully</h1>
      <p>Your ride has been verified and posted. You can now wait for passengers to join!</p>
    </div>
  );
};

export default Verified;
