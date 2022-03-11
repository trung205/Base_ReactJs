import React, { useEffect, useState } from "react";
import "./search.css";
import { requestListMovieSearch } from "../../common/axios";
import { useNavigate } from "react-router-dom";

function Search(props) {
  const navigate = useNavigate();
  const { classInput, classForm, classButton } = props;
  // console.log(movie, "search");
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState([]);

  const handleMovie = (id) => {
    navigate(`/movies/${id}`);
  };

  function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
      // console.dir(this);
      var a,
        b,
        i,
        val = this.value;
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (
          arr[i].original_title.substr(0, val.length).toUpperCase() ==
          val.toUpperCase()
        ) {
          b = document.createElement("DIV");
          b.innerHTML = `<span class='back-drop-search'><img src='https://image.tmdb.org/t/p/original${arr[i]?.backdrop_path}' width='76.8' height='43.2'/></span>`;
          b.innerHTML +=
            "<strong>" +
            arr[i].original_title.substr(0, val.length) +
            "</strong>";
          b.innerHTML += arr[i].original_title.substr(val.length);
          b.innerHTML +=
            "<input type='hidden' value='" + arr[i].original_title + "'>" + "<input type='hidden' value='" + arr[i].id + "'>";
          b.addEventListener("click", function (e) {
            console.log(arr[i], "id");
            inp.value = this.getElementsByTagName("input")[0].value;
            handleMovie(this.getElementsByTagName("input")[1].value);
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

  const handleSearch = async (e) => {
    setQuery(e.target.value);
  };

  useEffect(async () => {
    try {
      let res = await requestListMovieSearch(query);
      setMovie([...res.results]);
      // console.log(movie, "1");
    } catch (error) {}
  }, [query]);

  useEffect(() => {
    // console.log("2");
    autocomplete(document.getElementById("input-search"), movie);
  }, [movie]);

  return (
    <form
      className={"col-12 mb-lg-0 me-lg-3 form-search " + classForm}
      autocomplete="off"
    >
      <div className="autocomplete">
        <input
          type="search"
          className={
            "form-control-dark form-control input-search " + classInput
          }
          id="input-search"
          name="search"
          placeholder="Tìm kiếm..."
          onChange={handleSearch}
        />
      </div>
      <button type="submit" className={"button-search " + classButton}>
        <svg
          style={{ color: "white" }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </button>
    </form>
  );
}

export default Search;
