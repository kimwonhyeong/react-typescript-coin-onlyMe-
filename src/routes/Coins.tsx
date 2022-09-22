import styled from "styled-components";
//import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoins} from "../api";
import {Helmet} from "react-helmet";

const Container = styled.div`
	margin: 0 auto;
	max-width: 480px;
`;
const Header = styled.header`
	display: flex;
	align-items:center;
	justify-content:center;
`;
const Title = styled.h1`
	font-size:40px;
	color: ${props=>props.theme.accentColor};
	margin-bottom:15px;
`;
const Loading = styled.span`
	font-size: 35px;
`;
const CoinsList = styled.ul`
`;
const Coin = styled.li`
	display: flex;
	border-radius:15px;
	margin-bottom:10px;
	padding:10px;
	font-size:25px;
	height:70px;
	color: ${props=>props.theme.bgColor};
	background-color:${props=>props.theme.textColor};
	a{
		display: flex;
		align-items:center;
		width:100%;
		height:100%;
	}
`;
const Img = styled.img`
	weight:35px;
	height:35px;
	margin-right: 10px;
`;
interface Ijson{
	"id":string;
	"name":string;
	"symbol":string;
	"rank":number;
	"is_new":boolean;
	"is_active":boolean;
	"type":string;
}
function Coins(){
	/*const [coins,setCoins]=useState<Ijson[]>([]);
	const [loading, setLoading]=useState(true);
	useEffect(()=>{
		(async ()=>{
			const response = await fetch("https://api.coinpaprika.com/v1/coins");
			const json = await response.json();
			console.log(json);
			setCoins(json.slice(0,100));
			setLoading(false);
		})();
	},[])*/
	const {isLoading, data} = useQuery<Ijson[]>("allCoins", fetchCoins);
	return(
		<Container>
			<Helmet><title>Coin</title></Helmet>
			<Header>
				<Title>
					Coins
				</Title>
			</Header>
			{isLoading ? <Loading>잠시만 기다려주세요...</Loading> :
			<CoinsList>
				{data?.slice(0,100).map(coin=>
					<Coin key={coin.id}>
						<Link to={`/${coin.id}`}>
							<Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
							{coin.name}
						</Link>
					</Coin>)
				}
			</CoinsList>
			}
		</Container>
	);
}
export default Coins;