// import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../ui-kit/Button';
import './Pagination.css';

export interface PaginationProps {
  next: null | string | undefined;
  previous: null | string | undefined;
}

const Pagination: React.FC<PaginationProps> = ({ next, previous }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';

  const handleNextPage = () => {
    if (next) {
      setSearchParams({ search: searchQuery, page: (page + 1).toString() });
    }
  };

  const handlePreviousPage = () => {
    if (previous) {
      setSearchParams({ search: searchQuery, page: (page - 1).toString() });
    }
  };

  return (
    <div className="pagination__wrapper">
      <Button onClick={handlePreviousPage} className="pagination__button">
        Prev
      </Button>
      <span>Page {page}</span>
      <Button className="pagination__button" onClick={handleNextPage}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
