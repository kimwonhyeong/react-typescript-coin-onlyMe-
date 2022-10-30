import {useParams} from "react-router";
import styled from "styled-components";
import {Switch, Route,useRouteMatch} from "react-router";
import Chart from "./Chart";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import Price from "./Price";
import {useQuery} from "react-query";
import {fetchCoinInfo, fetchCoinTickers} from "../api";
const Container = styled.div`
	margin: 0 auto;
	max-width: 480px;
`;
const Header = styled.header`
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	text-align: center;
`;
const Title = styled.h1`
	font-size:40px;
	color: ${props=>props.theme.accentColor};
	margin-bottom:15px;
`;
const Back = styled.span`
	font-size: 30px;
	margin-top:8px;
	&:hover{
		cursor: pointer;
	}
`;
const Loading = styled.span`
	font-size: 35px;
`;
const Overview = styled.div`
	display: flex;
	justify-content:space-between;
	align-items:center;
	border-radius: 10px;
	background: rgba(0,0,0,0.5);
	padding: 10px 20px;
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items:center;
	width:33%;
	span:first-child{
		margin-bottom:5px;
		font-size:10px;
		font-weight:400;
		text-transform: uppercase;
	}
`;
const Description = styled.p`
	margin: 20px 0px;
`;
const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2,1fr);
	margin:25px 0px;
	margin-top:10px;
	gap:10px;
`;
const Tab = styled.span<{isActive: boolean}>`
	text-align: center;
	font-size:12px;
	font-weight:400;
	background:rgba(0,0,0,0.5);
	padding: 7px 0px;
	text-transform: uppercase;
	border-radius: 10px;
	color: ${(props)=>props.isActive ? props.theme.accentColor : props.theme.textColor};
	a{
		display:block;
	}
`;
interface Iinfo{
	id:string;
	name:string;
	symbol:string;
	rank:number;
	is_new:boolean;
	is_active:boolean;
	type:string;
	contract:string;
	platform:string;
	contracts:object;
	parent:object;
	tags:object;
	team:object;
	description:string;
	message:string;
	open_source:boolean;
	started_at:string;
	development_status:string;
	hardware_wallet:boolean;
	proof_type:string;
	org_structure:string;
	hash_algorithm:string;
	links:object;
	links_extended:object;
	whitepaper:object;
	first_data_at:string;
	last_data_at:string;
}
interface Iprice{
	id:string;
	name:string;
	symbol:string;
	rank:number;
	circulating_supply:number;
	total_supply:number;
	max_supply:number;
	beta_value:number;
	first_data_at:string;
	last_updated:string;
	quotes:{
		USD: {
			price:number;
			volume_24h:number;
			volume_24h_change_24h:number;
			market_cap:number;
			market_cap_change_24h:number;
			percent_change_15m:number;
			percent_change_30m:number;
			percent_change_1h:number;
			percent_change_6h:number;
			percent_change_12h:number;
			percent_change_24h:number;
			percent_change_7d:number;
			percent_change_30d:number;
			percent_change_1y:number;
			ath_price:number;
			ath_date:string;
			percent_from_price_ath:number;
		}
	}
}
function Coin(){
	const { coinId } = useParams<{coinId:string}>(); //구조 분해 할당 문법
	const {isLoading: infoLoading, data: infoData} = useQuery<Iinfo>(["info",coinId],()=>fetchCoinInfo(coinId));
	const {isLoading: tickersLoading, data: tickersData} = useQuery<Iprice>(["tickers",coinId],()=>fetchCoinTickers(coinId));
	//const [loading, setLoading] = useState(true);
	//const [info , setInfo] = useState<Iinfo>();
	//const [price , setPrice] = useState<Iprice>();
	const priceMatch = useRouteMatch("/:coinId/price");
	const chartMatch = useRouteMatch("/:coinId/chart");
	const loading = infoLoading || tickersLoading;
	/*useEffect(()=>{
		(async function(){
			const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
			const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
			setInfo(infoData);
			setPrice(priceData);
			setLoading(false);
			console.log(infoData, priceData)
		})();
	},[]);*/
	
	return (
		<Container>
			<Helmet><title>{coinId}</title></Helmet>
			<Header>
				<Back><Link to={`/`}>🔙</Link></Back>
				<Title>
					{coinId}
				</Title>
			</Header>
			{loading ? <Loading>잠시만 기다려주세요...</Loading> :(
			<>
				<Overview>
					<OverviewItem>
						<span>Rank:</span>
						<span>{infoData?.rank}</span>
					</OverviewItem>
					<OverviewItem>
						<span>Symbol:</span>
						<span>{infoData?.symbol}</span>
					</OverviewItem>
					<OverviewItem>
						<span>Price:</span>
						<span>{tickersData?.quotes.USD.price}</span>
					</OverviewItem>
				</Overview>
				<Description>{infoData?.description}</Description>
				<Overview>
					<OverviewItem>
						<span>Total Supply:</span>
						<span>{tickersData?.total_supply}</span>
					</OverviewItem>
					<OverviewItem>
						<span>Max Supply:</span>
						<span>{tickersData?.max_supply}</span>
					</OverviewItem> 
				</Overview>
				<Tabs>
					<Tab isActive={chartMatch !== null}><Link to={`/${coinId}/chart`}>Chart</Link></Tab>
					<Tab isActive={priceMatch !== null}><Link to={`/${coinId}/price`}>Price</Link></Tab>
				</Tabs>
				<Switch>
					<Route path={`/${coinId}/chart`}>
						<Chart coinId={coinId}/>
					</Route>
					<Route path={`/${coinId}/price`}>
						<Price coinId={coinId}/>
					</Route>
				</Switch>
			</>)
			}
		</Container>
	);
}
export default Coin;