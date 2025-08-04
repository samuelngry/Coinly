import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Calendar, Brain, Flame, Trophy, Clock, DollarSign, Activity, BarChart3 } from 'lucide-react';
import analysisImage from '../../assets/analysis.png';

const Insights = () => {
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
      <div className="min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow flex items-center justify-center">
        <p className="text-gray-600">Failed to load habit data. Please try again.</p>
      </div>
    );
  }

  const getSuccessColor = (rate) => {
    if (rate >= 80) return "text-green-600 bg-green-100";
    if (rate >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const PredictionCard = ({ prediction }) => {
    const iconMap = {
      AlertTriangle: AlertTriangle,
      TrendingUp: TrendingUp,
      TrendingDown: TrendingDown,
      Brain: Brain
    };
    const Icon = iconMap[prediction.icon] || Brain;
    
    const colorMap = {
      warning: "border-red-200 bg-red-50",
      opportunity: "border-green-200 bg-green-50", 
      pattern: "border-blue-200 bg-blue-50"
    };

    return (
      <div className={`p-3 rounded-lg border-2 ${colorMap[prediction.type]} mb-3`}>
        <div className="flex items-start gap-3">
          <Icon className="w-4 h-4 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm">{prediction.prediction}</h3>
              <span className="text-xs font-medium bg-white px-2 py-1 rounded">
                {prediction.probability}% likely
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2">{prediction.reason}</p>
            <div className="bg-white p-2 rounded border-l-4 border-blue-400">
              <p className="text-xs font-medium text-blue-800">💡 {prediction.suggestion}</p>
              <p className="text-xs text-blue-600 mt-1">Impact: {prediction.impact}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow overflow-auto">

      {/* Pet Companion Section */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg border-2 border-orange-200">
        <div className="flex items-center gap-3">
          <img src={analysisImage} className="h-30 w-30" />
          <div className="flex-1">
            <h3 className="font-semibold text-orange-500 mb-1 text-sm">{data.name}'s Insights</h3>
            <div className="bg-orange-100 p-2 rounded-lg relative min-h-[50px] flex items-center">
              <p className="text-orange-500 transition-opacity duration-500 text-sm">
                {data.petInsights[currentInsight]}
              </p>
              <div className="absolute -left-2 top-4 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-purple-100"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[
          { 
            label: 'Success Rate', 
            value: `${data.patterns.overallSuccessRate}%`, 
            icon: Target, 
            color: data.patterns.overallSuccessRate >= 70 ? 'text-green-500' : 'text-yellow-500',
            trend: data.patterns.trend 
          },
          { label: 'Current Streak', value: `${data.user.currentStreak} days`, icon: Flame, color: 'text-red-500' },
          { label: 'Best Day', value: data.patterns.bestDay.name, icon: Trophy, color: 'text-blue-500' },
          { label: 'Peak Time', value: data.patterns.peakTime, icon: Clock, color: 'text-purple-500' }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-neutral-300 p-3 shadow-lg text-center">
              <Icon className={`w-5 h-5 ${metric.color} mx-auto mb-1`} />
              <div className="text-sm font-semibold flex items-center justify-center gap-1">
                {metric.value}
                {metric.trend !== undefined && (
                  <span className={`text-xs ${metric.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.trend >= 0 ? '↗' : '↘'}
                  </span>
                )}
              </div>
              <div className="text-xs text-neutral-400">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-lg p-1 mb-4 shadow-lg border border-neutral-300">
        {[
          { id: 'predictions', label: 'Predictions', icon: Brain },
          { id: 'patterns', label: 'Patterns', icon: BarChart3 },
          { id: 'recommendations', label: 'Actions', icon: Target }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all text-sm ${
                activeTab === tab.id 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
        {activeTab === 'predictions' && (
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 shadow-lg border border-neutral-300">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Predictive Insights
              </h2>
              {data.predictions.map((prediction, index) => (
                <PredictionCard key={index} prediction={prediction} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-4">
            {/* Weekly Pattern Chart */}
            <div className="bg-white rounded-lg p-4 shadow-lg border border-neutral-300">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Weekly Success Pattern
              </h2>
              <div className="grid grid-cols-7 gap-2 mb-3">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{day}</div>
                    <div className="h-16 bg-gray-100 rounded flex items-end justify-center relative overflow-hidden">
                      <div 
                        className={`w-full rounded-t transition-all duration-1000 flex items-end justify-center text-xs font-semibold pb-1 ${getSuccessColor(data.patterns.weeklySuccessRates[index])}`}
                        style={{height: `${Math.max(data.patterns.weeklySuccessRates[index], 10)}%`}}
                      >
                        {data.patterns.weeklySuccessRates[index]}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-red-50 p-2 rounded border-l-4 border-red-400">
                  <h4 className="font-semibold text-red-800 mb-1">📉 Improvement Area</h4>
                  <p className="text-red-700">{data.patterns.worstDay.name}s: {data.patterns.worstDay.rate}% success rate</p>
                </div>
                <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-800 mb-1">📈 Your Strength</h4>
                  <p className="text-green-700">{data.patterns.bestDay.name}s: {data.patterns.bestDay.rate}% success rate</p>
                </div>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-lg p-4 shadow-lg border border-neutral-300">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Category Performance
              </h2>
              <div className="space-y-2">
                {Object.entries(data.patterns.categoryStats).map(([category, stats]) => {
                  const successRate = Math.round((stats.completed / stats.total) * 100);
                  const categoryEmojis = {
                    food: '🍳',
                    shopping: '🛍️',
                    transport: '🚗',
                    subscriptions: '📱',
                    financial_goals: '💰',
                    general: '⭐'
                  };
                  
                  return (
                    <div key={category} className="flex items-center gap-2">
                      <span className="text-lg">{categoryEmojis[category] || '⭐'}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium capitalize text-gray-800 text-sm">
                            {category.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-gray-600">
                            {stats.completed}/{stats.total} ({successRate}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              successRate >= 80 ? 'bg-green-500' :
                              successRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{width: `${successRate}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 shadow-lg border border-neutral-300">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Smart Action Plan
              </h2>
              
              <div className="space-y-3">
                {data.recommendations.map((rec, index) => {
                  const priorityColors = {
                    high: 'border-red-400 bg-red-50',
                    medium: 'border-yellow-400 bg-yellow-50',
                    low: 'border-green-400 bg-green-50'
                  };
                  
                  const actionColors = {
                    high: 'bg-red-500 hover:bg-red-600',
                    medium: 'bg-yellow-500 hover:bg-yellow-600',
                    low: 'bg-green-500 hover:bg-green-600'
                  };

                  return (
                    <div key={index} className={`border-l-4 p-3 rounded ${priorityColors[rec.priority]}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 text-sm">{rec.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded uppercase font-medium ${
                          rec.priority === 'high' ? 'bg-red-200 text-red-800' :
                          rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-gray-700 text-xs mb-2">{rec.description}</p>
                      <p className="text-xs text-gray-600 mb-2">💡 Impact: {rec.impact}</p>
                      <button className={`text-white px-3 py-1 rounded text-xs transition-colors ${actionColors[rec.priority]}`}>
                        {rec.action}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;