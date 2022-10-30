import {fetchCoinHistory} from "../api";
import {useQuery} from "react-query";
import ApexChart from "react-apexcharts";

interface IHistory{
	time_open: number;
	time_close: number;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: number;
};
function Chart({coinId}: {coinId: string}){
	const {isLoading , data} = useQuery<IHistory[]>(["History",coinId] , ()=>fetchCoinHistory(coinId),{refetchInterval:10000,});
	
	return(
		<div>
			{isLoading ? <h1>잠시만 기다려주세요</h1> : 
				(<ApexChart
					type= "area"
					series={[
						{
							name:"Price",
							data: data?.map(item=>parseFloat(item.close)) || [],
						},
					]}
					options={{
						chart:{
							height:500,
							width:500,
							toolbar:{
								show: false,
							},
						},
						dataLabels: {
							enabled: false
						},
						stroke: {
							curve: 'smooth'
						},
						theme:{
							mode:"dark",
						},
						fill: {
						  type: 'gradient' ,
						  gradient: {gradientToColors:["#0b1ae8"], stops:[0,100]},
						},
						xaxis: {
							type: 'datetime',
							axisBorder: {show: false},
							axisTicks:{show:false},
							categories: data?.map(item=>new Date(item.time_close*1000).toUTCString()),
						},
						legend: {
							horizontalAlign: 'left'
						}
					}}
				/>
				)
			}
		</div>
	);
}
export default Chart;