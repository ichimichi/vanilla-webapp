function renderTable(tableHoldings) {
  var tableDiv = document.getElementById("holdingtable");
  tableDiv.innerHTML = "";

  var table = document.createElement("table");
  var rowHeading = document.createElement("tr");

  columnNameList.forEach(function (element) {
    var dataHeading = document.createElement("th");
    dataHeading.innerHTML = element;
    rowHeading.appendChild(dataHeading);
  });
  table.appendChild(rowHeading);

  tableHoldings.holding.forEach(function (e) {
    var row = document.createElement("tr");
    let data;
    holdingKeyList.forEach(function (key) {
      data = document.createElement("td");
      if (e[key]) {
        switch (key) {
          case "instrument":
            data.innerHTML = e[key].toUpperCase("en-IN", {
              minimumFractionDigits: 2,
            });
            break;
          case "netCharge":
            if (e.profit) {
              data.innerHTML = "+" + e[key] + "%";
              data.style.color = "green";
            } else {
              data.innerHTML = "-" + e[key] + "%";
              data.style.color = "red";
            }
            break;
          case "pAndL":
            data.innerHTML = e[key].toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            });
            if (e.profit) {
              data.style.color = "green";
            } else {
              data.style.color = "red";
            }
            break;
          default:
            data.innerHTML = e[key].toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            });
        }
      } else {
        data.innerHTML = "-";
      }

      row.appendChild(data);
    });
    table.appendChild(row);
  });

  tableDiv.appendChild(table);
}

function renderCompanyList(companyList) {
  var companyListDiv = document.getElementById("companylist");
  companyListDiv.innerHTML = "";
  companyList.forEach(function (element) {
    var company = document.createElement("div");
    company.className = "company";
    var name = document.createElement("span");
    name.innerHTML = element.name.toUpperCase();
    name.style.cursor = "pointer";

    name.addEventListener("click", function () {
      tableHoldings = element;
      renderTable(tableHoldings);
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

    let temp = watchList.find((e) => e.id === element.id);
    if (temp) {
      iconBookmark.className = "fa fa-bookmark";
      buttonBookmark.addEventListener("click", function () {
        removeFromWatchList(element);
      });
    } else {
      iconBookmark.className = "fa fa-bookmark-o";
      buttonBookmark.addEventListener("click", function () {
        addToWatchList(element);
        iconBookmark.className = "fa fa-bookmark";
      });
    }

    buttonBookmark.appendChild(iconBookmark);

    company.appendChild(name);
    buttons.appendChild(buttonBuy);
    buttons.appendChild(buttonSell);
    buttons.appendChild(buttonBookmark);
    company.appendChild(buttons);
    companyListDiv.appendChild(company);
  });
}

function renderWatchList(watchList) {
  var companyListDiv = document.getElementById("companylist");
  companyListDiv.innerHTML = "";

  if (watchList.length === 0) {
    var company = document.createElement("div");
    company.className = "company";
    var message = document.createElement("span");
    message.innerHTML = "No companies in watchlist";
    company.appendChild(message);
    companyListDiv.appendChild(company);
  } else {
    watchList.forEach(function (element) {
      var company = document.createElement("div");
      company.className = "company";
      var name = document.createElement("span");
      name.innerHTML = element.name.toUpperCase();
      name.style.cursor = "pointer";

      name.addEventListener("click", function () {
        tableHoldings = element;
        renderTable(tableHoldings);
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
        removeFromWatchList(element, true);
      });

      iconBookmark.className = "fa fa-trash";
      buttonBookmark.appendChild(iconBookmark);

      company.appendChild(name);
      buttons.appendChild(buttonBuy);
      buttons.appendChild(buttonSell);
      buttons.appendChild(buttonBookmark);
      company.appendChild(buttons);
      companyListDiv.appendChild(company);
    });
  }
}

function addToWatchList(company) {
  let temp = watchList.find((e) => e.id === company.id);
  if (temp) {
    alert(company.name + " is already in watchlist");
  } else {
    watchList.push(company);
    alert(company.name + " added to watchlist");
  }
  console.log(watchList);
}

function removeFromWatchList(company, rerender) {
  watchList = watchList.filter((e) => e.name != company.name);
  if (rerender) {
    renderWatchList(watchList);
  }
  alert(company.name + " removed from watchlist");
}
