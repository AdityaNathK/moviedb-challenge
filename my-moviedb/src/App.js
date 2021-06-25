import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";

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
  const [episodeCount, setEpisodeCount] = useState(0);
  let urlString = new URL(`${urlRoot}?apikey=${apiKey}`);
  let epCount = 0;

  // const urlString = new URL(`${urlRoot}?apikey=${apiKey}&s=${searchVar}`);
  //? direct api reference = const {data} = 'http://www.omdbapi.com/?s=Star Wars&apikey=68626b7b'

  // useEffect for Searching, Radio , range(not working at the moment)
  useEffect(() => {
    const fetchMoviesFromAPI = async () => {
      if (searchVar) {
        switch (radio) {
          case "movie":
          case "series":
            urlString = urlString + `&s=${searchVar}` + `&type=${radio}`;
            axios.get(urlString).then((res) => {
              if (searchVar) {
                if (res.data.Search) {
                  setApiResponse(true);
                  setMovie(res.data.Search);
                  setTotalResults(res.data.totalResults);
                }
              } else {
                setApiResponse(false);
              }
            });
            break;
          // case "series":
          //   urlString = urlString + `&s=${searchVar}` + `&type=${radio}`;
          //   axios.get(urlString).then((res) => {
          //     if (searchVar) {
          //       if (res.data.Search) {
          //         setApiResponse(true);
          //         setMovie(res.data.Search);
          //         setTotalResults(res.data.totalResults);
          //       }
          //     } else {
          //       setApiResponse(false);
          //     }
          //   });
          //   break;
          case "episode":
            urlString = urlString + `&t=${searchVar}`;
            axios.get(urlString).then((result) => {
              if (searchVar) {
                if (result.data) {
                  setApiResponse(true);
                  setTotalSeasons(parseInt(result.data.totalSeasons));
                  if (totalSeasons > 1) {
                    //TODO: a common function can be called here
                    //todo: epcount needs to be addressed
                    for (var i = 1; i <= totalSeasons; i++) {
                      axios.get(urlString + `&Season=${i}`).then((result) => {
                        if (result.data) {
                          let seasonData = result.data.Episodes;
                          epCount = epCount + seasonData.length;
                          // setEpisodeCount(epCount);
                          setTotalResults(epCount);
                          console.log(result.data);
                          // setMovie(result.data.Search);
                        }
                      });
                    }
                    console.log(episodeCount);
                  }

                  // console.log("Inside episode: " + result.data.totalSeasons);
                  // setTotalSeasons(data.totalSeasons);
                }
              } else {
                setApiResponse(false);
              }
            });
            break;
          case "any":
            urlString = urlString + `&s=${searchVar}`;
            axios.get(urlString).then((res) => {
              if (searchVar) {
                if (res.data.Search) {
                  setApiResponse(true);
                  setMovie(res.data.Search);
                  setTotalResults(res.data.totalResults);
                }
              } else {
                setApiResponse(false);
              }
            });
            break;

          default:
            setApiResponse(false);
            break;
        }
        // if (radio === "movie" || radio === "series" || radio === "episode") {
        //   urlString.searchParams.append("type", radio);
        // }

        // if (searchVar) {
        //   if (data.Search) {
        //     setApiResponse(true);
        //     setMovie(data.Search);
        //     setTotalResults(data.totalResults);
        //   }
        // } else {
        //   setApiResponse(false);
        // }
      }
    };

    fetchMoviesFromAPI(searchVar, radio, range);
  }, [searchVar, radio, range]);

  // useEffect(()=>{
  //   if (radio === "episode") {
  //     if (searchVar) {

  //       }
  //     } else {
  //       setApiResponse(false);
  //     }
  //   }
  // });
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
