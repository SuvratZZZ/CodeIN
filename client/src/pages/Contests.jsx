import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('/api/contests');
        setContests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contests:', error);
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const getContestStatus = (contest) => {
    const now = new Date();
    const startTime = new Date(contest.startTime);
    const endTime = new Date(startTime.getTime() + contest.duration * 60000);

    if (now < startTime) {
      return {
        status: 'upcoming',
        text: 'Upcoming',
        color: 'bg-blue-100 text-blue-800'
      };
    } else if (now >= startTime && now <= endTime) {
      return {
        status: 'ongoing',
        text: 'Ongoing',
        color: 'bg-green-100 text-green-800'
      };
    } else {
      return {
        status: 'ended',
        text: 'Ended',
        color: 'bg-gray-100 text-gray-800'
      };
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading contests...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contests</h1>
        <Link
          to="/contests/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Contest
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contests.map((contest) => {
          const status = getContestStatus(contest);
          return (
            <div key={contest._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold mb-2">{contest.title}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    {status.text}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{contest.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Start: {new Date(contest.startTime).toLocaleString()}</p>
                  <p>Duration: {contest.duration} minutes</p>
                  <p>Total Points: {contest.totalPoints}</p>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/contests/${contest._id}`}
                    className="block text-center bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contests; 