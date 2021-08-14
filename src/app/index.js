console.log(companyList);
console.log(watchList);

var tableHoldings = companyList[0];

renderTable(tableHoldings);

renderCompanyList(companyList);

renderLeftStat(profileData);

renderRightStat(companyList);

document.getElementById("btn-watchlist").addEventListener("click", function () {
  renderWatchList(watchList);
});

document
  .getElementById("btn-allcompanies")
  .addEventListener("click", function () {
    renderCompanyList(companyList);
  });

document.getElementById("btn-download").addEventListener("click", function () {
  downloadHoldingsAsCSV(tableHoldings);
});
