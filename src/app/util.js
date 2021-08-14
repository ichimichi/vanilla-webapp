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
              data.className = "color-green";
            } else {
              data.innerHTML = "-" + e[key] + "%";
              data.className = "color-red";
            }
            break;
          case "pAndL":
            data.innerHTML = e[key].toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            });
            if (e.profit) {
              data.className = "color-green";
            } else {
              data.className = "color-red";
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
    buttonBuy.className = "color-green";

    var buttonSell = document.createElement("button");
    buttonSell.innerHTML = "Sell";
    buttonSell.className = "color-red";

    var buttonBookmark = document.createElement("button");
    var iconBookmark = document.createElement("i");

    let temp = watchList.find((e) => e.id === element.id);
    if (temp) {
      iconBookmark.className = "fa fa-bookmark";
    } else {
      iconBookmark.className = "fa fa-bookmark-o";
    }

    buttonBookmark.addEventListener("click", function () {
      addToWatchList(element);
      iconBookmark.className = "fa fa-bookmark";
    });

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
      buttonBuy.className = "color-green";

      var buttonSell = document.createElement("button");
      buttonSell.innerHTML = "Sell";
      buttonSell.className = "color-red";

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
    // alert(company.name + " added to watchlist");
  }
  console.log(watchList);
}

function removeFromWatchList(company, rerender) {
  watchList = watchList.filter((e) => e.name != company.name);
  if (rerender) {
    renderWatchList(watchList);
  }
  // alert(company.name + " removed from watchlist");
}

function renderLeftStat(profileData) {
  var profileNet = document.getElementById("profile-net");
  var profileNetCent = document.getElementById("profile-net-cent");
  var profileTotal = document.getElementById("profile-total");
  var profileCurrent = document.getElementById("profile-current");

  profileTotal.innerHTML = "₹" + profileData.totalInvestment;
  profileCurrent.innerHTML = "₹" + profileData.currentValue;

  let net = profileData.currentValue - profileData.totalInvestment;
  profileNet.innerHTML = "₹" + net;
  let netCent = (net * 100) / profileData.totalInvestment;

  if (net >= 0) {
    profileNetCent.innerHTML = "+" + netCent + "%";
    profileNet.className = "color-green";
    profileNetCent.className = "color-green";
  } else {
    profileNetCent.innerHTML = "-" + netCent + "%";
    profileNet.className = "color-red";
    profileNetCent.className = "color-red";
  }
}

function renderRightStat(companyList) {
  var labelList = [];
  var netChargeList = [];
  var quantityList = [];
  var colorList = [];

  companyList.forEach(function (company) {
    company.holding.forEach(function (holding) {
      labelList.push(holding.instrument);
      colorList.push(randomColor());
      netChargeList.push(holding.netCharge);
      quantityList.push(holding.quantity);
    });
  });

  const data = {
    labels: labelList,
    datasets: [
      {
        label: "Dataset",
        data: quantityList,
        backgroundColor: colorList,
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
  };

  new Chart(document.getElementById("chart"), config);
}

function randomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function downloadHoldingsAsCSV(tableHoldings) {
  var filename = `holdings-${tableHoldings.name.toLowerCase()}.csv`;

  var csv = "";
  var keys = Object.keys(tableHoldings.holding[0]);
  csv += keys.join(",") + "\n";

  tableHoldings.holding.forEach(function (row) {
    var values = [];
    keys.forEach(function (key) {
      values.push(row[key]);
    });
    csv += values.join(",") + "\n";
  });

  var blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
