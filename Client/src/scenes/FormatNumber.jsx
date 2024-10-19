// utility.js or within the component file
export const formatNumber = (num) => {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(2) + 'T'; // Trillion
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B'; // Billion
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M'; // Million
    }
    return num; // Less than a million
  };
  