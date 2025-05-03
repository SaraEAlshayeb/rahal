// History.js
import React, { useState, useEffect } from 'react';
import { FaStar, FaArrowUp, FaFilter } from 'react-icons/fa';

const History = () => {
  const [rides, setRides] = useState([]);
  const [filter, setFilter] = useState('all');
  const [mode, setMode] = useState('driver');
  const [selectedRide, setSelectedRide] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverCard, setHoverCard] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [rideCompleted, setRideCompleted] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ community: '', from: '', to: '' });

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const res = await fetch(`http://localhost:5000/api/history/${userId}`);
        const data = await res.json();
        setRides(data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };
    fetchHistory();
  }, []);

  const filteredRides = rides
    .filter(ride => ride.role === mode)
    .filter(ride =>
      (filter === 'all' || ride.status === filter) &&
      (!activeFilters.community || ride.community === activeFilters.community) &&
      (!activeFilters.from || ride.from === activeFilters.from) &&
      (!activeFilters.to || ride.to === activeFilters.to)
    );

  const toggleFilter = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value
    }));
  };

  const totalEarnings = rides
    .filter(ride => ride.role === 'driver')
    .reduce((sum, r) => sum + (r.earning || 0), 0);

  const avgRating = (() => {
    const driverRides = rides.filter(ride => ride.role === 'driver');
    if (driverRides.length === 0) return 0;
    const total = driverRides.reduce((sum, r) => sum + (r.ratingGiven || 0), 0);
    return (total / driverRides.length).toFixed(1);
  })();

  const isMobile = window.innerWidth <= 768;

  const handleSubmit = () => {
    alert('Feedback submitted!');
    const index = rides.findIndex(r => r.id === selectedRide.id);
    if (index !== -1) {
      const updated = [...rides];
      updated[index].status = 'completed';
      if (mode === 'rider') updated[index].rating = rating;
      else updated[index].ratingGiven = rating;
      setRides(updated);
    }
    setSelectedRide(null);
    setRating(0);
    setComment('');
    setRideCompleted(false);
  };

  return (
    <div>
      {/* You can paste your full styled UI here as it was before, using filteredRides and other updated logic */}
      <h1>Ride History</h1>
      {filteredRides.map(ride => (
        <div key={ride.id}>
          <p>{ride.from} → {ride.to}</p>
          <p>{ride.date} - {ride.time}</p>
          <p>{mode === 'rider' ? `Driver: ${ride.driver}` : `Passenger: ${ride.passenger}`}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
