import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowSuccess(true);
  };

  return (
    <div style={{ backgroundColor: '#F4EDCD', minHeight: '100vh', paddingTop: '80px', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      {!showSuccess ? (
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #27445D',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '1100px',
          margin: '0 auto',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
        }}>

          {/* Back Button + Title */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <button onClick={() => navigate('/book-ride')} style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginRight: '10px',
              padding: 0
            }}>
              <img src="/back-arrow.png" alt="Back" style={{ width: '28px', height: '28px' }} />
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#27445D', margin: 0 }}>Checkout</h2>
          </div>

          {/* Ride Details */}
          <div style={{ marginBottom: '20px' }}>
            <p><strong>From:</strong> Riyadh</p>
            <p><strong>To:</strong> Jeddah</p>
            <p style={{ color: '#333' }}>
              Date: 2024-06-01 | Time: 08:30 AM | Vehicle: BMW Cabrio | Seats: 3
            </p>
          </div>

          {/* Payment Method */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#27445D' }}>Payment Method</h4>
            <div style={{
              backgroundColor: '#f7f7f7',
              padding: '15px 20px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/applepay.png" alt="Apple Pay" style={{ height: '38px', marginRight: '12px' }} />
                <span>Apple Pay</span>
              </div>
              <button onClick={() => alert("Sorry, no other payment methods available right now.")}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#27445D',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>
                Change
              </button>
            </div>
          </div>

          {/* Coupon */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#27445D' }}>Coupon Code</h4>
            <div style={{
              backgroundColor: '#f7f7f7',
              padding: '15px 20px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <input
                type="text"
                placeholder="Discount code"
                style={{
                  border: 'none',
                  fontSize: '16px',
                  backgroundColor: 'transparent',
                  flex: 1,
                  outline: 'none'
                }}
              />
              <button
                onClick={() => alert("Coupon applied (functionality not implemented).")}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#27445D',
                  fontWeight: '500',
                  marginLeft: '15px',
                  cursor: 'pointer'
                }}>
                Apply
              </button>
            </div>
          </div>

          {/* Total Amount Section */}
          <div style={{ marginTop: '40px' }}>
            <h4 style={{ color: '#27445D' }}>Total Amount</h4>
            <p><strong>Sub-total:</strong> SAR 34.00</p>
            <p><strong>Delivery fees:</strong> <span style={{ textDecoration: 'line-through', color: '#888' }}>SAR 22.00</span> SAR 5.00</p>
            <p><strong>VAT (15.0%):</strong> SAR 5.09</p>
            <hr style={{ margin: '20px 0' }} />
            <p><strong>Total Amount:</strong> <span style={{ textDecoration: 'line-through', color: '#888' }}>SAR 56.00</span> SAR 39.00</p>
          </div>

          {/* Confirm Button */}
          <div style={{ textAlign: 'right', marginTop: '30px' }}>
            <button
              onClick={handleConfirm}
              style={{
                backgroundColor: '#27445D',
                color: '#fff',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={e => e.target.style.opacity = '0.9'}
              onMouseOut={e => e.target.style.opacity = '1'}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '40px',
            width: '400px',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ fontSize: '40px', color: 'green' }}>✔</div>
            <h2 style={{ margin: '20px 0 10px' }}>Payment Success</h2>
            <p>Your ride has been successfully booked</p>
            <h4>Amount</h4>
            <p style={{ fontSize: '22px', fontWeight: 'bold' }}>SAR 39.00</p>
            <button
              onClick={() => navigate('/history')}
              style={{
                marginTop: '15px',
                padding: '10px 20px',
                backgroundColor: '#27445D',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={e => e.target.style.opacity = '0.9'}
              onMouseOut={e => e.target.style.opacity = '1'}
            >
              Track Ride
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;