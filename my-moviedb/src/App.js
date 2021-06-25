import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import { useRef } from "react";

const PAGE_NUMBER = 1;
const urlRoot = process.env.REACT_APP_OMDB_URL;
const apiKey = process.env.REACT_APP_OMDB_API_KEY;

function App() {
  const [movie, setMovie] = useState([]);
  const [totalResults, setTotalResults] = useState("0");
  const [totalSeasons, setTotalSeasons] = useState(0);
  const [searchVar, setSearchVar] = useState("");
  const [radio, setRadio] = useState("any");
  const [apiResponse, setApiResponse] = useState(false);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [range, setRange] = useState([1989, 2005]);
  const [watchList, setWatchlist] = useState([]);
  const epCount = useRef(0);

  //? direct api reference = const {data} = 'http://www.omdbapi.com/?s=Star Wars&apikey=68626b7b'

  let urlString = new URL(`${urlRoot}?apikey=${apiKey}&page=${page}`);
  // useEffect for Searching, Radio , range(not working at the moment)
  useEffect(() => {
    const fetchMoviesFromAPI = async () => {
      if (searchVar) {
        epCount.current = 0;

        if (radio === "movie" || radio === "series") {
          urlString = urlString + `&s=${searchVar}&type=${radio}`;
          axios.get(urlString).then((result) => {
            if (page === 1 && result.data.Search) {
              setApiResponse(true);
              setMovie(result.data.Search);
              setTotalResults(result.data.totalResults);
            } else if (page > 1 && result.data.Search) {
              setApiResponse(true);
              console.log("url page-mov-ser :" + urlString);
              setMovie([...movie, ...result.data.Search]);
            }
          });
          console.log("url movie|series :" + urlString);
        } else if (radio === "episode") {
          urlString = urlString + `&t=${searchVar}`;
          axios.get(urlString).then((result) => {
            if (result.data) {
              setApiResponse(true);
              setTotalSeasons(parseInt(result.data.totalSeasons));
              if (totalSeasons > 1) {
                for (var i = 1; i <= totalSeasons; i++) {
                  axios.get(urlString + `&Season=${i}`).then((result) => {
                    if (result.data) {
                      let episodeData = result.data.Episodes;
                      console.log("Episode Data = :" + episodeData);
                      epCount.current = epCount.current + episodeData.length;
                      console.log(result.data);
                      setTotalResults(epCount.current);
                    }
                  });
                }
              }
            }
          });
          console.log("url episode--inside episode :" + urlString);
        } else {
          urlString = urlString + `&s=${searchVar}`;
          axios.get(urlString).then((result) => {
            if (page === 1 && result.data.Search) {
              setApiResponse(true);
              setMovie(result.data.Search);
              setTotalResults(result.data.totalResults);
            } else if (page > 1 && result.data.Search) {
              setApiResponse(true);
              console.log("url page- any :" + urlString);
              setMovie([...movie, ...result.data.Search]);
            }
          });
          console.log("url any :" + urlString);
        }
        console.log("url out of if :" + urlString);
      } else {
        setApiResponse(false);
      }
    };

    fetchMoviesFromAPI(searchVar, radio, range, page);
  }, [searchVar, radio, range, page]);

  const handleWatchList = (movie) => {
    const newList = [...watchList, movie];
    setWatchlist(newList);
  };

  const handleScroll = () => {
    setPage(page + 1);
  };

  const removeWatchList = (movie) => {
    const newList = watchList.filter(
      (watchList) => watchList.imdbID !== movie.imdbID
    );
    setWatchlist(newList);
  };

  return (
    <div className="App ">
      <Header
        searchVar={searchVar}
        setSearchVar={setSearchVar}
        radio={radio}
        setRadio={setRadio}
        range={range}
        setRange={setRange}
      />

      {apiResponse ? (
        <Container
          className="container-fluid"
          movie={movie}
          totalResults={totalResults}
          handleWatchList={handleWatchList}
          pageIncrement={handleScroll}
          watchList={watchList}
          removeWatchList={removeWatchList}
        />
      ) : null}
    </div>
  );
}

export default App;
