import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({totalCount,perPage,onPageChange,currentPage}) => {
  const totalNumberPage = (perPage!==0)? Math.ceil(totalCount/perPage) : 0;
  if(totalNumberPage<=1) return null;
  const pages = _.range(1,totalNumberPage+1);   
  
  
  return ( 
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={"page-item "+(currentPage === 1?"disabled":"")}>
            <button className="page-link" onClick={()=>onPageChange(currentPage-1)}  aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          { 
            pages.map(page => {
              let classes = "page-item "+(page===currentPage?"active":"")
              return <li className={classes} key={page} >
                        <button className="page-link" onClick={()=>onPageChange(page)} >{page}</button>
                      </li>
            }) 
          }
          
          <li className={"page-item "+(currentPage === totalNumberPage?"disabled":"")}>
            <button className="page-link" onClick={()=>onPageChange(currentPage+1)} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    );
}

Pagination.prototype = {
  totalCount:PropTypes.number.isRequired,
  perPage : PropTypes.number.isRequired,
  onPageChange:PropTypes.func.isRequired,
  currentPage:PropTypes.number.isRequired
}
 
export default Pagination;