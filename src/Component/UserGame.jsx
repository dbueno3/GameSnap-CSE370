// create UserGame component
// Path: hooligans\src\Component\UserGame.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import rainbowSeigeImage from "../assets/rainbowseige.jpeg";
import fortniteImage from "../assets/fortnite.jpg";
import minecraftImage from "../assets/minecraft.png";
import modernWarfareImage from "../assets/modernwarfare.jpg";

const gameImageArray = [
    { id: 1, text: "Rainbow Siege", image: rainbowSeigeImage },
    { id: 2, text: "Fortnite", image: fortniteImage },
    { id: 3, text: "Minecraft", image: minecraftImage },
    { id: 4, text: "Modern Warfare", image: modernWarfareImage },
    // Add more checkbox options as needed
  ];
const UserGame = (props) => {
    const [games, setGames] = useState([]);
    console.log(props);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_PATH + `/users/${props.user}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        }).then((res) => res.json())
        .then((result) => {
            if (result) {
                console.log(result.attributes);
                setGames(result.attributes.games);
            }
        });
},[]);
    return (
        <>
        {/* // list the picture of the games which are in the user's game list and find the picture from the array */}
        {games && games.length >= 1 &&
        <div>
            <h4>Top Games</h4>
            <ul className="game-list">
            {games.map((game) => {
                return (
                    <li className="game-list-item">
                        <img className="checkbox-image" height={100} width={100} src={gameImageArray.find((x) => x.text === game).image} alt={game} />
                        <br/>
                    </li>
                );
            })}
            </ul>
        </div>
    }
    </>
        );
};

export default UserGame;