function addYears(date, years) {
  date.setFullYear(date.getFullYear() + years);
  return date;
}

module.exports = addYears;
