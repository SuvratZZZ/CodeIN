export const generateHeatmapData = (solvedDates, weeks = 26) => {
    const dateCountMap = solvedDates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize time
    
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (weeks * 7));
    
    const heatmapData = [];
    let currentDate = new Date(startDate);
  
    // Generate all days for 26 weeks
    for (let week = 0; week < weeks; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const dateString = currentDate.toISOString().split('T')[0];
        weekDays.push({
          date: dateString,
          count: dateCountMap[dateString] || 0
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      heatmapData.push(weekDays);
    }
  
    return heatmapData;
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