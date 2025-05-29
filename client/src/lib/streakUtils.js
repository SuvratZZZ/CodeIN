// streakUtils.js
export const generateHeatmapData = (solvedDates) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364); // 365 days

  const dateMap = {};
  solvedDates.forEach((d) => {
    dateMap[d] = (dateMap[d] || 0) + 1;
  });

  const data = [];
  const tempDate = new Date(startDate);
  
  for (let i = 0; i < 365; i++) {
    const dateStr = tempDate.toISOString().split('T')[0];
    data.push({
      date: dateStr,
      count: dateMap[dateStr] || 0,
    });
    tempDate.setDate(tempDate.getDate() + 1);
  }

  // Group into 7-day weeks (columns in GitHub heatmap)
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return weeks;
};

  
  export const calculateStreak = (solvedDates) => {
    if (solvedDates.length === 0) return 0;
    
    const uniqueDates = [...new Set(solvedDates)].sort();
    let streak = 1;
    let maxStreak = 1;
  
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1]);
      const currDate = new Date(uniqueDates[i]);
      
      const diffTime = currDate.getTime() - prevDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);
  
      if (diffDays === 1) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else if (diffDays > 1) {
        streak = 1;
      }
    }
  
    const lastDate = new Date(uniqueDates[uniqueDates.length - 1]);
    const today = new Date();
    const diffTime = today.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
  
    return diffDays <= 1 ? maxStreak : 0;
  };


  export const cn = (...classes) => classes.filter(Boolean).join(' ');