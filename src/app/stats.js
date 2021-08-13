var labels = [];
var netCharges = [];
var colors = [];

companyList.forEach(function (company) {
  company.holding.forEach(function (holding) {
    labels.push(holding.instrument);
    colors.push(randomColor());
    netCharges.push(holding.netCharge);
  });
});

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: netCharges,
      backgroundColor: colors,
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

var myChart = new Chart(document.getElementById("chart"), config);

function randomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
