// src/pages/ProfilePage.js
import React, { useEffect } from "react";
import { useProfileStore } from "../store/useProfleStore";
import { Loader } from "lucide-react";
import { calculateStreak, generateHeatmapData } from "../lib/streakUtils";
import { motion } from "framer-motion";
import { useProblemStore } from "../store/useProblemStore"; 

const ProfilePage = () => {
  const { user, solvedProblems, getSolvedProblems, isLoading } = useProfileStore();
  const { getAllProblems, problems } = useProblemStore();


  useEffect(() => {
    if (user) {
      getSolvedProblems();
      getAllProblems();
    }
  }, [user, getSolvedProblems]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  const difficultyCounts = {
    EASY: solvedProblems.filter(p => p?.difficulty === "EASY").length,
    MEDIUM: solvedProblems.filter(p => p?.difficulty === "MEDIUM").length,
    HARD: solvedProblems.filter(p => p?.difficulty === "HARD").length,
  };

  const totalSolved = solvedProblems.length;
  const solvedDates = solvedProblems.map(p => new Date(p.createdAt).toISOString().split('T')[0]);
  const streak = calculateStreak(solvedDates);
  const heatmapData = generateHeatmapData(solvedDates);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-screen-2xl">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start gap-8 mb-12"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img 
              src={user?.image || "/default-avatar.png"} 
              className="w-32 h-32 rounded-2xl border-4 border-primary/50 shadow-2xl relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-premium-lg"
              alt="Profile"
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              {user?.name}
            </h1>
            <p className="text-lg text-muted-foreground font-medium">{user?.email}</p>
            
            <div className="flex flex-wrap gap-6 mt-6">
              <StatCard value={totalSolved} label="Total Solved" />
              <StatCard value={streak} label="Day Streak" />
              <StatCard value={user?.role} label="Role" />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12"
        >
          {/* Difficulty Distribution */}
          <div className="bg-card backdrop-blur-premium p-8 rounded-3xl border border-muted shadow-premium hover:shadow-premium-lg transition-all duration-300">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Problem Distribution</h2>
            <div className="grid grid-cols-3 gap-6">
              <DifficultyCard
                difficulty="Easy"
                count={difficultyCounts.EASY}
                total={problems.length}
                color="from-success to-emerald-600"
              />
              <DifficultyCard
                difficulty="Medium"
                count={difficultyCounts.MEDIUM}
                total={problems.length}
                color="from-warning to-amber-600"
              />
              <DifficultyCard
                difficulty="Hard"
                count={difficultyCounts.HARD}
                total={totalSolved}
                color="from-error to-rose-600"
              />
            </div>
          </div>

          {/* Heatmap Section */}
          <div className="bg-card backdrop-blur-premium p-8 rounded-3xl border border-muted shadow-premium hover:shadow-premium-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Activity Heatmap</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((intensity) => (
                    <div
                      key={intensity}
                      className={`h-4 w-4 rounded-sm ${
                        intensity === 0 ? 'bg-muted' :
                        intensity === 1 ? 'bg-primary/40' :
                        intensity === 2 ? 'bg-primary/60' : 'bg-primary'
                      }`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
            
            <div className="overflow-x-auto pb-4">
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[800px]">
                {heatmapData.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1.5">
                    {week.map((day, dayIdx) => (
                      <motion.div
                        key={`${weekIdx}-${dayIdx}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`
                          h-4 w-4 rounded-sm cursor-pointer transition-all duration-200
                          ${day.count === 0 ? "bg-muted" : 
                          day.count === 1 ? "bg-primary/40" :
                          day.count === 2 ? "bg-primary/60" : "bg-primary"}
                          ${isToday(day.date) ? 'ring-2 ring-offset-2 ring-primary shadow-premium' : ''}
                        `}
                        whileHover={{ scale: 1.1 }}
                        title={`${formatDate(day.date)}: ${day.count} problem${day.count !== 1 ? 's' : ''} solved`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-muted-foreground text-sm">
                <span>{formatDate(new Date(new Date().setDate(new Date().getDate() - 180)))}</span>
                <span>{formatDate(new Date())}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ value, label }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-card backdrop-blur-premium p-6 rounded-2xl border border-muted shadow-premium hover:shadow-premium-lg transition-all duration-300 min-w-[180px]"
  >
    <p className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
      {value}
    </p>
    <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
  </motion.div>
);

const DifficultyCard = ({ difficulty, count, total, color }) => {
  const percentage = total === 0 ? 0 : (count / total * 100);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-muted-foreground">{difficulty}</span>
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{count}</span>
      </div>
      <div className="relative">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, type: 'spring' }}
            className={`h-full bg-gradient-to-r ${color} rounded-full`}
          />
        </div>
        <span className="absolute right-0 top-3 text-sm text-muted-foreground">
          {percentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const isToday = (dateString) => {
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
};

export default ProfilePage;