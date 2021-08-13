console.log(companyList);
console.log(watchList);

var tableHoldings = companyList[0];

renderTable(tableHoldings);

renderCompanyList(companyList);

var btnWatchlist = document.getElementById("btn-watchlist");
btnWatchlist.addEventListener("click", function () {
  renderWatchList(watchList);
});

var btnAllComapanies = document.getElementById("btn-allcompanies");
btnAllComapanies.addEventListener("click", function () {
  renderCompanyList(companyList);
});

var btnDownload = document.getElementById("btn-download");
btnDownload.addEventListener("click", function () {
  alert("Download");
});
