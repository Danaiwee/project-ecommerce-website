import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsAndDailySales = async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date(); //today
        const startDate = new Date(endDate.getTime() - 7*24*60*60*1000);
    
        const dailySalesData = await getDailySalesData(startDate, endDate);
    
        return res.status(200).json({analyticsData, dailySalesData})
    } catch (error) {
        console.log("Error in getAnalyticsAndDailySales: ", error.message);
        res.status(500).json({message: error.message})
    }
   
};

async function getAnalyticsData() {
  const totalUser = await User.countDocuments(); // count number of documents
  const totalProducts = await Product.countDocuments();

  //this will return array with 1 object value
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, //Group all documents together (no specific grouping)
        totalSales: { $sum: 1 }, // Count total number of orders
        totalRevenue: { $sum: "$totalAmount" }, // Sum of all order amounts
      },
    },
  ]);

  const { totalSales, totalRevenue } = salesData[0]; //because it only have 1 object

  return {
    users: totalUser,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
}

async function getDailySalesData(startDate, endDate) {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          _id: 1, // sort result by date
        },
      },
    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    return dateArray.map((date) => {
        const foundData = dailySalesData.find((item) => item._id === date);

        return {
            date,
            sales: foundData?.sales || 0,
            revenue: foundData?.revenue || 0
        }
    })
  } catch (error) {
    console.log("Error in getDailySalesData: ",error.message);
  }
};

//Get range of date from today (1week)
function getDatesInRange(startDate, endDate){
    const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}
