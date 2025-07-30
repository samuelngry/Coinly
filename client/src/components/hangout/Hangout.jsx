import React, { useState, useEffect } from 'react';
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
          throw new Error("Failed to fetch habit radar data");
        }

        const result = await res.json();
        setData(result);
        setLoading(false);

      } catch (err) {
        console.error('Error fetching habit radar data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data?.petInsights) {
      const interval = setInterval(() => {
        setCurrentInsight(prev => (prev + 1) % data.petInsights.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Analysing your habits...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <p className="text-gray-600">Failed to load habit data. Please try again.</p>
      </div>
    );
  }

  const getSuccessColor = (rate) => {
    if (rate >= 80) return "text-green-600 bg-green-100";
    if (rate >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

export default Hangout;