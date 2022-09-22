import {fetchCoinHistory} from "../api";
import {useParams} from "react-router";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";

const PriceList = styled.ul`
`;
const Prices = styled.li`
	display: flex;
	margin-bottom:10px;
	padding:10px;
	font-size:10px;
	height:70px;
	background:rgba(0,0,0,0.5);
	border-radius: 10px;
	color: ${props=>props.theme.miniBgColor};
`;
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
function Price({coinId} : {coinId : string}){
	const {isLoading , data} = useQuery<IHistory[]>(["Price",coinId] , ()=>fetchCoinHistory(coinId));
	return(
		<div>
			{isLoading ? <h1>잠시만 기다려주세요</h1> : 
			(<PriceList>
				 {data?.map((item)=>
				(<Prices>
				 	시가: {item.open}
				 	종가: {item.close}
				 	고가: {item.high}
					저가: {item.low}
				 </Prices>))}
			 </PriceList>)
			}
		</div>
	);
}
export default Price;