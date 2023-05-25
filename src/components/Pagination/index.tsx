import React from 'react';
import styles from './Pagination.module.scss';

import Select from 'react-select';
import APPCONSTANTS from '../../constants/appConstants';
import PaginationInput from './PaginationInput';

const Anchor = ({ content, onClick, className }: any) => (
  <li role='presentation' className={className} onClick={onClick}>
    <div className={styles.paginationButton}>{content}</div>
  </li>
);

interface IPaginationProps {
  length: number;
  total: number;
  onChangePage: (page: number, rowsPerPage: number) => void;
  initialPage: number;
  currentPage: number;
  onChangeRowsPerPage: (rowsPerPage: number) => void;
}

interface IPagintaionState {
  pages: Array<number | string>;
  totalPages: number;
  currentPage: number;
}

class Pagination extends React.Component<IPaginationProps, IPagintaionState> {
  static getDerivedStateFromProps(nextProps: IPaginationProps, prevState: IPagintaionState) {
    const { currentPage, total, length } = nextProps;
    const totalPages = Math.ceil((total || 0) / length);
    if (prevState.totalPages !== totalPages || prevState.currentPage !== currentPage) {
      const pager = Pagination.getPager(total, length, currentPage);
      return {
        pages: pager.pages,
        totalPages,
        currentPage
      };
    }
    return null;
  }

  /**
   * Util to calculate number of anchors
   * @param totalItems
   * @param currentPage
   * @param pageSize
   */
  static getPager(totalItems: number, pageSize: number, currentPage: number = 1) {
    const paginationRange = APPCONSTANTS.PAGINATION_RANGE;
    const pages = [];
    const totalPages = Math.ceil(totalItems / pageSize);
    const halfWay = Math.ceil(paginationRange / 2);
    let position;

    if (currentPage <= halfWay) {
      position = 'start';
    } else if (totalPages - halfWay < currentPage) {
      position = 'end';
    } else {
      position = 'middle';
    }
    const ellipsesNeeded = paginationRange < totalPages;
    let i = 1;
    while (i <= totalPages && i <= paginationRange) {
      const pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
      const openingEllipsesNeeded = i === 2 && (position === 'middle' || position === 'end');
      const closingEllipsesNeeded = i === paginationRange - 1 && (position === 'middle' || position === 'start');
      if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
        pages.push('...');
      } else {
        pages.push(pageNumber);
      }
      i++;
    }
    return { pages };
  }

  static calculatePageNumber = (i: number, currentPage: number, paginationRange: number, totalPages: number) => {
    const halfWay = Math.ceil(APPCONSTANTS.PAGINATION_RANGE / 2);
    if (i === paginationRange) {
      return totalPages;
    } else if (i === 1) {
      return i;
    } else if (paginationRange < totalPages) {
      if (totalPages - halfWay < currentPage) {
        return totalPages - paginationRange + i;
      } else if (halfWay < currentPage) {
        return currentPage - halfWay + i;
      } else {
        return i;
      }
    } else {
      return i;
    }
  };

  constructor(props: IPaginationProps) {
    super(props);
    this.state = {
      pages: [],
      totalPages: 0,
      currentPage: 1
    };
  }

  /**
   * Re-render components based on onChangePage number
   * @param length
   * @param total
   * @param page
   * @param reloadParent
   */
  setPage = (length: number, total: number, page: number, reloadParent: boolean) => {
    page = Math.floor(page);
    // get new pager object for specified onChangePage
    const pager = Pagination.getPager(total, length, page);
    if (page < 1 || page > pager.pages[pager.pages.length - 1] || page === this.state.currentPage) {
      return;
    }

    // update state
    this.setState({
      pages: pager.pages,
      currentPage: page
    });
    // call onChangePage function in parent component
    if (reloadParent) {
      this.props.onChangePage(page, length);
    }
  };

  /**
   * Render Anchor element
   * @param page
   * @param index
   * @returns {*}
   */
  renderAnchor = (page: any, index: number) => {
    const { currentPage } = this.state;
    if (page === '...') {
      return (
        <Anchor
          key={index}
          content={`${page}`}
          className={styles.cursorNotAllowed}
          onClick={() => {
            return;
          }}
        />
      );
    }
    return (
      <Anchor
        key={index}
        content={`${page}`}
        onClick={() => this.setPage(this.props.length, this.props.total, page, true)}
        className={currentPage === page ? styles.active : ''}
      />
    );
  };

  /**
   * Render Pagination Anchors
   * @returns {any[]}
   */
  renderAnchors = () => this.state.pages.map(this.renderAnchor);

  handleRowsPerPageChange = ({ value }: any) => {
    this.props.onChangeRowsPerPage(value);
  };

  render() {
    const { totalPages, currentPage } = this.state;
    const { length, total } = this.props;
    const isFirstPage = currentPage === 1;
    const isEndPage = currentPage === totalPages;
    const paginationLengthOptions = [
      { label: '10', value: '10' },
      { label: '20', value: '20' },
      { label: '50', value: '50' }
    ];
    const currentOption = paginationLengthOptions.find(({ value }) => Number(value) === length);
    return (
      <div className={`${styles.pagination} d-flex justify-content-between `}>
        <div className='d-none d-md-flex align-items-center me-1'>
          <span className='d-none d-lg-flex pr-4 me-1'>Rows per page</span>
          <div className={styles.selectEl}>
            <Select
              menuPlacement='top'
              className='pagination-select me-1 w-100'
              classNamePrefix='select-field'
              value={currentOption}
              options={paginationLengthOptions}
              onChange={this.handleRowsPerPageChange as any}
            />
          </div>
        </div>
        <div className={styles.paginationWrapper}>
          <div className={`${styles.count} text-nowrap me-1`}>
            {` ${isFirstPage ? 1 : (currentPage - 1) * length + 1} - ${
              isEndPage ? total : currentPage * length
            } of ${total}`}
          </div>
          <div className='d-flex align-items-center mx-1'>
            <PaginationInput
              onPagination={(page: number) => {
                this.setPage(length, total, page, true);
              }}
              maxNumber={Math.ceil(total / length)}
              type='text'
              placeholder='#page'
            />
          </div>
          <ul className='m-0 ps-1 text-nowrap'>
            <li>
              <div
                className={`${styles.paginationButton} ${isFirstPage ? styles.disabled : ''}`}
                onClick={() => {
                  if (!isFirstPage) {
                    this.setPage(length, total, 1, true);
                  }
                }}
              >
                «
              </div>
            </li>
            <li>
              <div
                className={`${styles.paginationButton} ${isFirstPage ? styles.disabled : ''}`}
                onClick={() => {
                  if (!isFirstPage) {
                    this.setPage(length, total, currentPage - 1, true);
                  }
                }}
              >
                ‹
              </div>
            </li>
            {this.renderAnchors()}
            <li>
              <div
                className={`${styles.paginationButton} ${isEndPage ? styles.disabled : ''}`}
                onClick={() => {
                  if (!isEndPage) {
                    this.setPage(length, total, currentPage + 1, true);
                  }
                }}
              >
                ›
              </div>
            </li>
            <li>
              <div
                className={`${styles.paginationButton} ${isEndPage ? styles.disabled : ''}`}
                onClick={() => {
                  if (!isEndPage) {
                    this.setPage(length, total, Math.max(0, Math.ceil(total / length)), true);
                  }
                }}
              >
                »
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Pagination;
