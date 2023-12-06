import { ordersData } from "./api";
let revenueArray = [];
function calculateRevenue() {
  // 計算各品項營收
  let revenueObj = {};
  ordersData.forEach((order) => {
    order.products.forEach((product) => {
      revenueObj[product.title] =
        (revenueObj[product.title] || 0) + product.quantity * product.price;
    });
  });
  // 轉成 array 並根據營收由大到小排序
  revenueArray = Object.entries(revenueObj);
  revenueArray.sort((a, b) => b[1] - a[1]);
  console.log(revenueArray);
  // 計算其他營收
  const otherRevenue = revenueArray.reduce((acc, cur, index) => {
    if (index > 2) {
      acc += cur[1];
    }
    return acc;
  }, 0);
  // 將 其他 加入陣列
  revenueArray.splice(3, revenueArray.length - 3, ["其他", otherRevenue]);
  charLoad();
}

// 重新載入圖表
function charLoad() {
  chart.load({
    columns: revenueArray,
  });
}

let chart = c3.generate({
  bindto: "#chart", // HTML 元素綁定
  data: {
    type: "pie",
    columns: [],
  },
});

export { calculateRevenue };
