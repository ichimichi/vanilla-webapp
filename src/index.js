var parsed = "";

console.log(companyList);

var companyListDiv = document.getElementById("companylist");

companyList.forEach(function (element) {
  var company = document.createElement("div");
  company.className = "company";
  var name = document.createElement("span");
  name.innerHTML = element.name.toUpperCase();

  name.addEventListener("click", function () {
    alert("Table " + element.name);
  });

  var buttons = document.createElement("div");
  buttons.className = "companybuttons";

  var buttonBuy = document.createElement("button");
  buttonBuy.innerHTML = "Buy";
  buttonBuy.className = "btn-green";

  var buttonSell = document.createElement("button");
  buttonSell.innerHTML = "Sell";
  buttonSell.className = "btn-red";

  var buttonBookmark = document.createElement("button");
  var iconBookmark = document.createElement("i");

  buttonBookmark.addEventListener("click", function () {
    alert(element.name);
    watchList.push(element);
    console.log(watchList);
  });

  iconBookmark.className = "fa fa-bookmark-o";
  buttonBookmark.appendChild(iconBookmark);

  company.appendChild(name);
  buttons.appendChild(buttonBuy);
  buttons.appendChild(buttonSell);
  buttons.appendChild(buttonBookmark);
  company.appendChild(buttons);
  companyListDiv.appendChild(company);
});

var columnNameList = [
  "Instrument",
  "Qty.",
  "Avg. Cost",
  "LTP",
  "Cur. Value",
  "P&L",
  "Net Change",
];

var holdingKeyList = [
  "instrument",
  "quantity",
  "avgCost",
  "ltp",
  "currentValue",
  "pAndL",
  "netCharge",
];

var tableDiv = document.getElementById("holdingtable");

var table = document.createElement("table");
var rowHeading = document.createElement("tr");

columnNameList.forEach(function (element) {
  var dataHeading = document.createElement("th");
  dataHeading.innerHTML = element;
  rowHeading.appendChild(dataHeading);
});
table.appendChild(rowHeading);

companyList[0].holding.forEach(function (e) {
  var row = document.createElement("tr");
  let data;
  holdingKeyList.forEach(function (key) {
    data = document.createElement("td");
    if (key === "instrument") {
      data.innerHTML = e[key].toUpperCase() || "-";
    } else {
      data.innerHTML = e[key] || "-";
    }
    row.appendChild(data);
  });
  table.appendChild(row);
});

tableDiv.appendChild(table);

var btnWatchlist = document.getElementById("btn-watchlist");
btnWatchlist.addEventListener("click", function () {
  alert("Watchlist");
});

var btnAllComapanies = document.getElementById("btn-allcompanies");
btnAllComapanies.addEventListener("click", function () {
  alert("All COmpanies");
});

var btnDownload = document.getElementById("btn-download");
btnDownload.addEventListener("click", function () {
  alert("Download");
});
