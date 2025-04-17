import React, { useState } from 'react';
import { FaStar, FaArrowUp } from 'react-icons/fa';

const riderRides = [
  {
    id: 1,
    from: 'Riyadh',
    to: 'Jeddah',
    date: '2024-06-01',
    time: '08:30 AM',
    vehicle: 'BMW Cabrio',
    image: '/bmw.png',
    driver: 'BADER SULTAN ABDALZIZ',
    status: 'upcoming',
    rating: 0
  },
  {
    id: 2,
    from: 'Dammam',
    to: 'Makkah',
    date: '2024-04-01',
    time: '10:00 AM',
    vehicle: 'Toyota Camry',
    image: '/bmw.png',
    driver: 'OMAR KHALID',
    status: 'completed',
    rating: 5
  }
];

const driverRides = [
  {
    id: 101,
    from: 'Jeddah',
    to: 'Mecca',
    date: '2024-05-01',
    time: '09:00 AM',
    passenger: 'Ahmed Ali',
    vehicle: 'Kia Sportage',
    image: '/bmw.png',
    earning: 85,
    ratingGiven: 4,
    status: 'completed'
  },
  {
    id: 102,
    from: 'Medina',
    to: 'Riyadh',
    date: '2024-04-21',
    time: '03:00 PM',
    passenger: 'Sara Faisal',
    vehicle: 'Hyundai Sonata',
    image: '/bmw.png',
    earning: 135,
    ratingGiven: 5,
    status: 'upcoming'
  }
];

const History = () => {
  const [filter, setFilter] = useState('all');
  const [mode, setMode] = useState('rider');
  const [selectedRide, setSelectedRide] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const rides = mode === 'rider' ? riderRides : driverRides;
  const filteredRides = rides.filter((ride) => (filter === 'all' ? true : ride.status === filter));
  const totalEarnings = driverRides.reduce((sum, r) => sum + r.earning, 0);
  const avgRating = (driverRides.reduce((sum, r) => sum + r.ratingGiven, 0) / driverRides.length).toFixed(1);

  const handleSubmit = () => {
    alert('Feedback submitted!');
    setSelectedRide(null);
    setRating(0);
    setComment('');
  };

  return (
    <div style={{   background: 'linear-gradient(to top, rgb(246, 244, 240) 60%, rgba(247, 241, 211, 0.71) 100%)',
       minHeight: '100vh', padding: '100px 20px', fontFamily: 'Segoe UI' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', color: '#27445D', fontWeight: 'bold', background: 'linear-gradient(to right, #27445D, #6e8b9e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Rides History</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
          <div>
            <button onClick={() => setMode('rider')} style={{ backgroundColor: mode === 'rider' ? '#27445D' : 'white', color: mode === 'rider' ? 'white' : '#27445D', border: '1px solid #27445D', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', transition: '0.3s', cursor: 'pointer' }}>Rider Mode</button>
            <button onClick={() => setMode('driver')} style={{ backgroundColor: mode === 'driver' ? '#27445D' : 'white', color: mode === 'driver' ? 'white' : '#27445D', border: '1px solid #27445D', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', marginLeft: '8px', transition: '0.3s', cursor: 'pointer' }}>Driver Mode</button>
          </div>
          <div>
            {['all', 'upcoming', 'completed'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{ backgroundColor: filter === f ? '#27445D' : 'white', color: filter === f ? 'white' : '#27445D', border: '1px solid #27445D', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', marginRight: '8px', transition: '0.3s', cursor: 'pointer' }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
        </div>

        {mode === 'driver' && (
          <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
            <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '16px', flex: 1, display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
              <FaArrowUp color='green' size={20} /> <strong>Total Earnings:</strong> SAR {totalEarnings}
            </div>
            <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '16px', flex: 1, display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
              <FaArrowUp color='green' size={20} /> <strong>Total Rides:</strong> {driverRides.length}
            </div>
            <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '16px', flex: 1, display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
              <FaStar color='gold' size={20} /> <strong>Avg Rating:</strong> {avgRating}
            </div>
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          {filteredRides.map((ride) => (
            <div
              key={ride.id}
              style={{
                background: 'linear-gradient(to right, #ffff, #ffff)',
                padding: '20px 24px',
                borderRadius: '20px',
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold', color: ride.status === 'upcoming' ? 'orange' : 'green' }}>{ride.status.toUpperCase()}</div>
                {(ride.rating || ride.ratingGiven) && (
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(ride.rating || ride.ratingGiven)].map((_, i) => <FaStar key={i} color='gold' />)}
                  </div>
                )}
              </div>
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{mode === 'driver' ? ride.passenger : ride.vehicle}</p>
              <p><strong>From:</strong> {ride.from} | <strong>To:</strong> {ride.to}</p>
              <p>{ride.date} | {ride.time}</p>
              {ride.earning && mode === 'driver' && <p><strong>Earning:</strong> SAR {ride.earning}</p>}
              {ride.status === 'upcoming' && (
                <div style={{ position: 'absolute', right: '20px', bottom: '20px' }}>
                  <button onClick={() => setSelectedRide(ride)} style={{ backgroundColor: '#27445D', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', transition: '0.3s', cursor: 'pointer' }}>View</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedRide && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '30px', width: '90%', maxWidth: '500px', position: 'relative' }}>
              <button onClick={() => setSelectedRide(null)} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '20px' }}>×</button>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img src={mode === 'rider' ? selectedRide.image : '/Rahal_Logo.png'} alt='car' style={{ width: '100px', marginRight: '15px', borderRadius: '8px' }} />
                <div>
                  <h3>{mode === 'rider' ? selectedRide.vehicle : selectedRide.passenger}</h3>
                  <p style={{ color: 'gray' }}>⭐ 4.9 (531 reviews)</p>
                </div>
              </div>
              <div style={{ backgroundColor: '#F3F3F3', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>{mode === 'rider' ? 'Contact Your Driver' : 'Contact Your Passenger'}</p>
                  <p style={{ margin: 0 }}>{mode === 'rider' ? selectedRide.driver : selectedRide.passenger}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <img src='/social.png' alt='whatsapp' style={{ width: '28px', cursor: 'pointer' }} onClick={() => alert('You will be redirected to WhatsApp')} />
                  <img src='/call.png' alt='call' style={{ width: '28px', cursor: 'pointer' }} onClick={() => alert('You will call this person')} />
                </div>
              </div>
              <p style={{ fontWeight: 'bold' }}>How was your ride?</p>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center',marginBottom: '10px' }}>
                {[...Array(5)].map((_, i) => {
                  const value = i + 1;
                  return (
                    <FaStar
                      key={i}
                      color={value <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                      size={24}
                      onMouseEnter={() => setHover(value)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(value)}
                      style={{ cursor: 'pointer' }}
                    />
                  );
                })}
              </div>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Write your text' style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '16px' }} />
              <button onClick={handleSubmit} style={{ backgroundColor: '#27445D', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px' }}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;





