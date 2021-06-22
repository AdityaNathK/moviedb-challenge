import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";

const PAGE_NUMBER = 1;

function App() {
  const [totalResults, setTotalResults] = useState("0");
  const [movie, setMovie] = useState([]);
  const [searchVar, setSearchVar] = useState("");
  const [radio, setRadio] = useState("any");
  const [apiResponse, setApiResponse] = useState(false);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [range, setRange] = useState([1989, 2005]);
  const [watchList, setWatchlist] = useState([]);

  const urlRoot = process.env.REACT_APP_OMDB_URL;
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  const urlString = new URL(`${urlRoot}?apikey=${apiKey}&s=${searchVar}`);
  //? direct api reference = const {data} = 'http://www.omdbapi.com/?s=Star Wars&apikey=68626b7b'

  // useEffect for Searching, Radio , range(not working at the moment)
  useEffect(() => {
    const fetchMoviesFromAPI = async () => {
      if (radio === "movie" || radio === "series" || radio === "episode") {
        urlString.searchParams.append("type", radio);
      }

      const { data } = await axios.get(urlString).catch((e) => {
        console.log(e.response.data);
      });

      if (searchVar) {
        if (data.Search) {
          setMovie(data.Search);
          setApiResponse(true);
          setTotalResults(data.totalResults);
        }
      } else {
        setApiResponse(false);
      }
    };

    fetchMoviesFromAPI(searchVar, radio, range);
  }, [searchVar, radio, range]);

  // useEffect for handling page increment
  useEffect(() => {
    if (page > 1) {
      urlString.searchParams.append("page", page);
      setApiResponse(true);
      axios.get(urlString).then((res) => {
        setMovie([...movie, ...res.data.Search]);
      });
    }
  }, [page]);

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
