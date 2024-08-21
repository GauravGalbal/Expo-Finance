export function formatNumber(num: number) {
  if (num >= 1e33) {
    return (num / 1e33).toFixed(1).replace(/\.0$/, "") + "D"; // Decillion
  }
  if (num >= 1e30) {
    return (num / 1e30).toFixed(1).replace(/\.0$/, "") + "N"; // Nonillion
  }
  if (num >= 1e27) {
    return (num / 1e27).toFixed(1).replace(/\.0$/, "") + "O"; // Octillion
  }
  if (num >= 1e24) {
    return (num / 1e24).toFixed(1).replace(/\.0$/, "") + "S"; // Septillion
  }
  if (num >= 1e21) {
    return (num / 1e21).toFixed(1).replace(/\.0$/, "") + "Sx"; // Sextillion
  }
  if (num >= 1e18) {
    return (num / 1e18).toFixed(1).replace(/\.0$/, "") + "Qn"; // Quintillion
  }
  if (num >= 1e15) {
    return (num / 1e15).toFixed(1).replace(/\.0$/, "") + "Qd"; // Quadrillion
  }
  if (num >= 1e12) {
    return (num / 1e12).toFixed(1).replace(/\.0$/, "") + "T"; // Trillion
  }
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B"; // Billion
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M"; // Million
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K"; // Thousand
  }
  return num.toString();
}

export const formatDate = (date: Date) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const monthIndex = date.getMonth();
  const day = date.getDate();

  // Format the date string
  return `${months[monthIndex]} ${day}`;
};
