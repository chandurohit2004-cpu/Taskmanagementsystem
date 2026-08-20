import React, { useState, useEffect } from 'react';
import { getAnalyticsApi } from '../api/analyticsApi';
import StatsCard from '../components/analytics/StatsCard';
import Loader from '../components/common/Loader';
import { CheckCircle2, Clock, ListTodo, TrendingUp, AlertCircle, BarChart3, AlertTriangle } from 'lucide-react';

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAnalyticsApi();
        setAnalytics(data.analytics);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load task analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="py-20">
        <Loader message="Gathering analytics insights..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const {
    totalTasks = 0,
    completedTasks = 0,
    pendingTasks = 0,
    todoTasks = 0,
    inProgressTasks = 0,
    completionPercentage = 0,
    priorityBreakdown = { low: 0, medium: 0, high: 0 }
  } = analytics || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-sky-600 dark:text-sky-400" />
          <span>Analytics Dashboard</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Gain real-time insights into task completion and distribution
        </p>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard
          title="Total Tasks"
          value={totalTasks}
          icon={ListTodo}
          color="sky"
          subtext="All created tasks"
        />
        <StatsCard
          title="Completed Tasks"
          value={completedTasks}
          icon={CheckCircle2}
          color="emerald"
          subtext="Status: Done"
        />
        <StatsCard
          title="Pending Tasks"
          value={pendingTasks}
          icon={Clock}
          color="amber"
          subtext="Todo + In Progress"
        />
        <StatsCard
          title="Completion Rate"
          value={`${completionPercentage}%`}
          icon={TrendingUp}
          color="purple"
          subtext="Overall efficiency"
        />
      </div>

      {/* Analytics Charts & Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Progress & Status Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Task Completion Progress</span>
          </h3>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="text-sky-600 dark:text-sky-400 font-bold">{completionPercentage}%</span>
            </div>
            <div className="w-full h-3.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Todo</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{todoTasks}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In Progress</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{inProgressTasks}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Done</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{completedTasks}</span>
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Priority Distribution</span>
          </h3>

          <div className="space-y-4 pt-2">
            {/* High Priority */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-red-600 dark:text-red-400">High Priority</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{priorityBreakdown.high}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-500 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (priorityBreakdown.high / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Medium Priority */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-amber-600 dark:text-amber-400">Medium Priority</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{priorityBreakdown.medium}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (priorityBreakdown.medium / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Low Priority */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-slate-600 dark:text-slate-400">Low Priority</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{priorityBreakdown.low}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-400 transition-all duration-500 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (priorityBreakdown.low / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
