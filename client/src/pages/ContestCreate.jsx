import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContestCreate = () => {
  const navigate = useNavigate();
  const [contestData, setContestData] = useState({
    title: '',
    description: '',
    startTime: '',
    duration: 60, // duration in minutes
    questions: [],
    totalPoints: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/contests', contestData);
      navigate('/contests');
    } catch (error) {
      console.error('Error creating contest:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Contest</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Contest Title</label>
          <input
            type="text"
            value={contestData.title}
            onChange={(e) => setContestData({ ...contestData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={contestData.description}
            onChange={(e) => setContestData({ ...contestData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <input
              type="datetime-local"
              value={contestData.startTime}
              onChange={(e) => setContestData({ ...contestData, startTime: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={contestData.duration}
              onChange={(e) => setContestData({ ...contestData, duration: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Total Points</label>
          <input
            type="number"
            value={contestData.totalPoints}
            onChange={(e) => setContestData({ ...contestData, totalPoints: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Contest
        </button>
      </form>
    </div>
  );
};

export default ContestCreate; 