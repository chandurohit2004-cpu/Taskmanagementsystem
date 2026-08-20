const Task = require('../models/Task');

// @desc    Get task analytics and stats summary
// @route   GET /api/analytics
// @access  Private
const getTaskAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({ user: userId, status: 'Done' });
    const todoTasks = await Task.countDocuments({ user: userId, status: 'Todo' });
    const inProgressTasks = await Task.countDocuments({ user: userId, status: 'In Progress' });
    const pendingTasks = todoTasks + inProgressTasks;

    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Breakdown by Priority
    const lowPriority = await Task.countDocuments({ user: userId, priority: 'Low' });
    const mediumPriority = await Task.countDocuments({ user: userId, priority: 'Medium' });
    const highPriority = await Task.countDocuments({ user: userId, priority: 'High' });

    res.json({
      success: true,
      analytics: {
        totalTasks,
        completedTasks,
        pendingTasks,
        todoTasks,
        inProgressTasks,
        completionPercentage,
        priorityBreakdown: {
          low: lowPriority,
          medium: mediumPriority,
          high: highPriority
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTaskAnalytics
};
