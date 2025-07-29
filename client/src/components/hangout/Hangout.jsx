import React from 'react'
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Calendar, Brain, Zap, Trophy, Clock, DollarSign, Activity, BarChart3 } from 'lucide-react';

const Hangout = () => {
  const [activeTab, setActiveTab] = useState('predictions');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentInsight, setCurrentInsight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/habit", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch custom quests");
        }

        const data = await res.json();
        setData(data);
        setLoading(false);

      } catch (err) {
          console.error('Error fetching habit radar data:', err);
          setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
      
    </div>
  )
};

export default Hangout
