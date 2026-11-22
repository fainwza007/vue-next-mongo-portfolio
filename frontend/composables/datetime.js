const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const longMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
});

export const formatMonthYear = (dateInput) => {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";
  return monthYearFormatter.format(date);
};

export const formatDisplayDate = (dateInput) => {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";
  return monthYearFormatter.format(date);
};

export const formatFullDate = (dateInput) => {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";
  return fullDateFormatter.format(date);
};

// แสดง List ของ years
export const useYearOptions = (startYear = 1980) => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push({
      name: year,
      value: year,
    });
  }

  return years;
};

// แสดง List ของ months
export const useMonthOptions = () => {
  const months = [];

  for (let i = 1; i <= 12; i++) {
    const date = new Date(2000, i - 1, 1);

    months.push({
      name: longMonthFormatter.format(date),
      value: i,
    });
  }

  return months;
};

export const useDateRangeDiff = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return {
      diffInMonth: 0,
      diffInYear: 0,
      formatted: "",
    };
  }

  const totalMonths = Math.max(
    1,
    (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      (end.getDate() >= start.getDate() ? 1 : 0)
  );

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  let formatted = "";
  if (years > 0 && remainingMonths > 0) {
    formatted = `${years} yr${years > 1 ? "s" : ""} ${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`;
  } else if (years > 0) {
    formatted = `${years} yr${years > 1 ? "s" : ""}`;
  } else {
    formatted = `${totalMonths} mo${totalMonths > 1 ? "s" : ""}`;
  }

  return {
    diffInMonth: totalMonths,
    diffInYear: years,
    formatted,
  };
};
