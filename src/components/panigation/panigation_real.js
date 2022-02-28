import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./panigation.css";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    // console.log("pani");
    // this.gotoPage(1);
  }

  gotoPage = (page = 1) => {
    const { onPageChanged = (f) => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
    // this.setState({ currentPage });
    // onPageChanged(paginationData);
  };

  handleClick = (page) => (evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = (evt) => {
    evt.preventDefault();
    // this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
    this.gotoPage(this.state.currentPage - 1);
  };

  handleMoveRight = (evt) => {
    evt.preventDefault();
    // this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
    this.gotoPage(this.state.currentPage + 1);
  };

  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav
          aria-label="Countries Pagination Page navigation example"
          className="flex-row  w-100 justify-content-between container-panigation"
        >
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item ms-1">
                    <a
                      className="btn btn-outline-info"
                      // href="#"
                      aria-label="Previous"
                      // onClick={this.handleMoveLeft}
                    >
                      {/* <span aria-hidden="true">&laquo;</span> */}
                      {/* <span className="sr-only">Previous</span> */}
                      <span className="sr-only">...</span>
                    </a>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item ms-1">
                    <a
                      className="btn btn-outline-info"
                      // href="#"
                      aria-label="Next"
                      // onClick={this.handleMoveRight}
                    >
                      {/* <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span> */}
                      <span className="sr-only">...</span>
                    </a>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? " active" : ""
                  } ms-1`}
                >
                  <a
                    className="btn btn-outline-info "
                    href="#"
                    onClick={this.handleClick(page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="button-group">
            <button
              className="btn btn-outline-info ms-1"
              onClick={this.handleMoveLeft}
              disabled={currentPage == 1 ? true : false}
            >
              Trang trước
            </button>
            <button
              className="btn btn-outline-info ms-1"
              onClick={this.handleMoveRight}
              disabled={currentPage == this.totalPages ? true : false}
            >
              Trang sau
            </button>
          </p>
        </nav>
      </Fragment>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Pagination;
