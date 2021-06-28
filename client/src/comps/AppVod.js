import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import { LoginStatusContext } from "../contexts/LoginStatusContext";
import {sortBy} from 'lodash'
import VodList from "./VodList";
import getDataState from "../hooks/getMoviesHook";
import favoritesHook from "../hooks/FavoritesHook";
import Header from "./Header";
import "../styles/AppVod.css";
import Favorites from "./Favorites";
import SingleMovie from "./SingleMovie";
import NotFound from "./NotFound";
import NavBar from "./NavBar";
import Login from "../loginComps/Login";
import SignUp from "../loginComps/SignUp";
function AppVod() {
  const { status, changeStatus } = useContext(LoginStatusContext);
  const movies_arr = [];
  const { arr, changeArr } = getDataState(movies_arr);
  const [movieName, setMovieName] = useState("black");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const favorites_arr = [];
  const [favorites, setFavorites] = favoritesHook(favorites_arr);
  const [favoritesChanged, setFavoritesChanged] = useState(0);
  const [likedKeys,setLikedKeys] = useState([])
  const [tryLogin,setTryLogin] = useState(false)
  useEffect(() => {
    const getFaves = async () => {
      let token = localStorage["token"];
      let url = process.env.REACT_APP_SERVER + "/users/userFavs";
      try {
        let response = await axios.get(url, {
          headers: { "x-auth-token": token },
        });
        setFavorites(response.data);
        changeStatus(true);
        // checkLikes()
      } catch (e) {
        localStorage.removeItem("token");
        changeStatus(false);
      }
    };
    getFaves();
  }, [favoritesChanged, status]);
  const likesSetter = (arr) =>{
    setLikedKeys([...arr])
  }
  const sortMovies = (sortQ) =>{
    let temp_arr = sortBy(arr,sortQ)
    if(sortQ === "Year"){
      temp_arr.reverse()
    }
    changeArr([...temp_arr])
  }
  const favChange = () => {
    let change = favoritesChanged + 1;
    setFavoritesChanged(change);
  };
  const setSQ = (id) => {
    setQuery(id);
  };
  const searchMovie = (val) => {
    if(val != ""){
      setMovieName(val);
    }
  };
  const finishLoad = (val) => {
    setLoading(val);
  };
  const addToFavorites = async (data) => {
    try {
      let url = process.env.REACT_APP_SERVER + "/users/favorites";
      if(!localStorage["token"]){
        return setTryLogin(true)
      }
      axios
        .put(
          url,
          { favorites: [data] },
          {
            headers: { "x-auth-token": localStorage["token"] },
          }
        )
        ;
      favChange();
    } catch (err) {
      changeStatus(true)
      // console.log("from catch 5");
      // console.log(err);
    }
  };
  const removeFromFavorites = async (id) => {
    try {
      let url = process.env.REACT_APP_SERVER + "/users/removeFav";
      axios
        .put(
          url,
          { favorites: { imdbID: id } },
          {
            headers: { "x-auth-token": localStorage["token"] },
          }
        );
      favChange();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      
      <NavBar setFavorites={setFavorites} likesSetter={likesSetter}></NavBar>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div>
                <Header sortMovies={sortMovies} loading={loading} searchMovie={searchMovie} />
                <VodList
                  setTryLogin={setTryLogin}
                  tryLogin={tryLogin}
                  likesSetter={likesSetter}
                  favorites={favorites}
                  likedKeys={likedKeys}
                  removeFromFavorites={removeFromFavorites}
                  addToFavorites={addToFavorites}
                  loading={finishLoad}
                  setSQ={setSQ}
                  movieName={movieName}
                  movies_arr={arr}
                  changeArr={changeArr}
                />
              </div>
            );
          }}
        ></Route>

        <Route
          exact
          path="/movie/:id"
          render={({ match }) => <SingleMovie match={match} query={query} />}
        ></Route>

        <Route
          exact
          path="/login"
          render={() => {
            return <Login />;
          }}
        ></Route>
        <Route
          exact
          path="/favorites"
          render={() => {
            return <Favorites removeFromFavorites={removeFromFavorites} setSQ={setSQ} favorites={favorites} />;
          }}
        ></Route>
        <Route exact path="/signup" render={() =><SignUp/>}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default AppVod;
