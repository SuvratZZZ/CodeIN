// src/pages/ProfilePage.js
import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileStore } from "../store/useProfleStore";
import { Code2,Ruler, Trophy, BarChart3, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  console.log("authUser : ", authUser);
  const { getProfileData, profileData, isLoading } = useProfileStore();
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await getProfileData();
        console.log("profile data : ", profileData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [getProfileData]);

  if (isLoading || !profileData) {
    return (
      <Loader/>
    );
  }

  const stats = profileData.stats || {
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalSolved: 0
  };

  const difficultyCounts = profileData.difficultyCounts || {
    EASY: 0,
    MEDIUM: 0,
    HARD: 0
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4">
      {/* Profile Header */}
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-8 shadow-premium">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 animate-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background/0 via-background/0 to-background/80"></div>
          <div className="relative z-10 flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  <img
                  src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                  className="rounded-full"
                />
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg">
                <Code2 className="w-4 h-4 text-background" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {authUser?.name || 'User'}
              </h1>
              <p className="text-foreground/60">CodeIn {authUser.role || 'Member'}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-premium hover:shadow-lg transition-all duration-300 border border-primary/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shadow-inner">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/60">Total : </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{stats.totalSolved}</p>
              </div>
            </div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-premium hover:shadow-lg transition-all duration-300 border border-secondary/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shadow-inner">
                <Ruler className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-foreground/60">Easy : </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">{stats.easySolved}</p>
              </div>
            </div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-premium hover:shadow-lg transition-all duration-300 border border-accent/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shadow-inner">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-foreground/60">Medium : </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">{stats.mediumSolved}</p>
              </div>
            </div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-premium hover:shadow-lg transition-all duration-300 border border-primary/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shadow-inner">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/60">Hard : </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{stats.hardSolved}</p>
              </div>
            </div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-premium hover:shadow-lg transition-all duration-300 border border-secondary/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shadow-inner">
                <Flame className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-foreground/60">Current Streak</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">{profileData.streak || 0} days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Distribution */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Problem Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(difficultyCounts).map(([difficulty, count]) => (
              <div key={difficulty} className="bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-premium hover:shadow-lg transition-all duration-300 border border-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground/60">{difficulty}</span>
                  <span className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{count}</span>
                </div>
                <div className="w-full h-2 bg-background/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ 
                      width: `${(count / stats.totalSolved) * 100}%`,
                      opacity: count > 0 ? 1 : 0
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Activity Heatmap</h2>
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 shadow-premium max-w-3xl mx-auto border border-primary/10">
            <div className="flex items-start">
              {/* Heatmap grid */}
              <div className="flex-1">
                <div className="grid grid-rows-7 gap-1">
                  {Array.from({ length: 7 }, (_, dayIndex) => (
                    <div key={dayIndex} className="flex gap-1">
                      {Array.from({ length: 26 }, (_, weekIndex) => {
                        const dayData = profileData.heatmapData?.[weekIndex * 7 + dayIndex] || { count: 0, date: new Date().toISOString().split('T')[0] };
                        const count = dayData?.count ?? 0;
                        
                        let bgColor;
                        if (count === 0) {
                          bgColor = 'bg-white/20';
                        } else if (count === 1) {
                          bgColor = 'bg-red-500/20';
                        } else if (count === 2) {
                          bgColor = 'bg-orange-500/20';
                        } else if (count === 3) {
                          bgColor = 'bg-yellow-500/20';
                        } else {
                          bgColor = 'bg-green-500/20';
                        }
                        
                        return (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`w-3 h-3 rounded-sm ${bgColor} transition-all duration-300 hover:scale-125 hover:shadow-premium cursor-pointer`}
                            title={`${dayData.date}: ${count} submissions`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end mt-4 space-x-2 text-xs text-foreground/60">
              <span>Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-sm bg-red-500/30"></div>
                <div className="w-3 h-3 rounded-sm bg-orange-500/40"></div>
                <div className="w-3 h-3 rounded-sm bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-sm bg-green-500/60"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Solved Problems */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Solved Problems</h2>
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-premium border border-primary/10">
            <div className="grid gap-4">
              {profileData.solvedProblems?.map((solved) => (
                <div 
                  key={solved.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-background/20 hover:bg-background/30 transition-all duration-300 border border-primary/5 hover:border-primary/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-inner ${
                      solved.problem.difficulty === 'EASY' ? 'bg-green-500/20 text-green-500' :
                      solved.problem.difficulty === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {solved.problem.difficulty[0]}
                    </div>
                    <div>
                      <a 
                        onClick={() => navigate(`/problem/${solved.problemId}`)}
                        className="text-foreground hover:text-primary transition-colors duration-200 font-medium cursor-pointer"
                      >
                        {solved.problem.title}
                      </a>
                      <div className="flex gap-2 mt-1">
                        {solved.problem.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-foreground/60">
                    {new Date(solved.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {(!profileData.solvedProblems || profileData.solvedProblems.length === 0) && (
                <div className="text-center py-8 text-foreground/60">
                  No problems solved yet. Start your coding journey!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;