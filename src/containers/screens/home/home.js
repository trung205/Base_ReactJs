import React, { useEffect, useState } from "react";
import "./home.css";
import ImdbIcon from "../../../components/imdbIcon/imdbIcon";
import CardRelease from "../../../components/cardRelease/cardRelease";
import CardComing from "../../../components/cardComing/cardComing";
import Carousel3D from "../../../components/3DCarousel/3DCarousel";
import Header from "../../../components/header/header";
import Pagination from "../../../components/panigation/panigation_real";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../../../redux/action/index";
import { useNavigate } from "react-router-dom";
import { requestAllMovie } from "../../../common/axios";
import Footer from "../../../components/footer/footer";
import { animateScroll as scroll, scroller, Element } from "react-scroll";

var countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central Arfrican Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauro",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre & Miquelon",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St Kitts & Nevis",
  "St Lucia",
  "St Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function Home() {
  const dataHome = useSelector((state) => state.movie.data);
  const navigate = useNavigate();
  const [state, setState] = useState({
    allCountries: [],
    currentCountries: [],
    currentPage: 1,
    totalPages: null,
  });
  const [featured, setFeatured] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMovies(state.currentPage + 1));
  }, [state]);

  useEffect(async () => {
    try {
      let res = await requestAllMovie(1);
      // console.log(res, "trung");
      setFeatured(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleMovie = (id) => {
    navigate(`/movies/${id}`);
  };

  const featuredMovie = () => {
    console.log(featured, "trung");
    let arrFeatured = [...featured?.item].slice(0, 5);

    let arrFeaturedMap = arrFeatured?.map((item) => {
      return {
        id: item?.id,
        title: item?.original_title,
        url: `https://image.tmdb.org/t/p/original${item?.backdrop_path}`,
      };
    });
    // console.log(arrFeatured, "map");
    return arrFeaturedMap;
  };

  const onPageChanged = (data) => {
    const { allCountries } = state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allCountries.slice(offset, offset + pageLimit);

    setState({ ...state, currentPage, currentCountries, totalPages });
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  if (!featured) {
    return (
      <div className="container_1">
        <h1>??ang t???i d??? li???u</h1>
      </div>
    );
  } else {
    return (
      <div className="container_1">
        <Header movie={dataHome?.item}/>
        <article>
          <div>
            <h2>Phim n???i b???t</h2>
            <Carousel3D
              imageList={featuredMovie()}
              onClick={(item) => handleMovie(item)}
            />
          </div>
          <div class="row" id="content-top">
            <div class="col-5 top-movie-coming">
              <div className="movie-coming">
                {[...featured?.item].slice(6, 11).map((item) => {
                  return (
                    <CardComing
                      number={1}
                      srcImg={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
                      href={`/movies/${item?.id}`}
                    >
                      <h5>{item?.original_title}</h5>
                      <h6>{item?.title}</h6>
                    </CardComing>
                  );
                })}
              </div>
            </div>
            <Element class="movie-release col-7" name="scroll-to-element">
              <div>
                {dataHome?.item?.map((movie) => (
                  <CardRelease
                    onCLick={() => handleMovie(movie?.id)}
                    srcImg={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                  >
                    <h2>{movie?.original_title}</h2>
                    <p>{movie?.title}</p>
                    <p>1 gi??? 45 ph??t</p>
                    <ImdbIcon score={movie?.vote_average} />
                    <p className="text-description">{movie?.overview}</p>
                  </CardRelease>
                ))}
              </div>
              <Pagination
                totalRecords={featured?.totalItems}
                pageLimit={20}
                pageNeighbours={1}
                onPageChanged={onPageChanged}
              />
            </Element>
          </div>
        </article>
        <Footer />
      </div>
    );
  }
}

export default Home;
