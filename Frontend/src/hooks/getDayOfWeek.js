export default function getDayOfWeek(dateString) {
  const daysShortForm = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const date = new Date(dateString);
  return daysShortForm[date.getDay()];
}
