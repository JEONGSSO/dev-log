const solution = (x) => {
  const dateArray = x.split("/");
  const converterDate = (date) => (date.length === 1 ? "0" + date : date);

  return [
    dateArray[2],
    converterDate(dateArray[0]),
    converterDate(dateArray[1]),
  ].join("");
};

//  "1/15/2014" -> '20140115'
