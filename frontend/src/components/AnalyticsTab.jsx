import { motion } from "framer-motion";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import axios from "../lib/axios.js";
import AnalyticCard from "./AnalyticCard";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			}
		};

		fetchAnalyticsData();
	}, []);
  return (
    <main className="w-full h-full">
      <div className="w-full max-w-7xl mx-auto mt-5">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <AnalyticCard
            title="Total Users: "
            total={analyticsData?.users}
            icon={Users}
          />

          <AnalyticCard
            title="Total Products: "
            total={analyticsData?.products}
            icon={Package}
          />

          <AnalyticCard
            title="Total Sales: "
            total={analyticsData?.totalSales}
            icon={ShoppingCart}
          />

          <AnalyticCard
            title="Total Revenue: "
            total={analyticsData?.totalRevenue}
            icon={DollarSign}
          />
        </motion.div>

        <motion.div
          className='w-full mt-20'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' stroke='#D1D5DB' />
						<YAxis yAxisId='left' stroke='#D1D5DB' />
						<YAxis yAxisId='right' orientation='right' stroke='#D1D5DB' />
						<Tooltip />
						<Legend />
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='sales'
							stroke='#10B981'
							activeDot={{ r: 8 }}
							name='Sales'
						/>
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke='#3B82F6'
							activeDot={{ r: 8 }}
							name='Revenue'
						/>
					</LineChart>
				</ResponsiveContainer>
        </motion.div>
      </div>
    </main>
  );
};

export default AnalyticsTab;
