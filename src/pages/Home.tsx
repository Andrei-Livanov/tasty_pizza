import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
  Sort,
} from '../redux/slices/filterSlice';
import {
  fetchPizzas,
  SearchPizzaParams,
  selectPizzaData,
} from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import SortPopup, { sortList } from '../components/SortPopup';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, searchValue, currentPage, sort } =
    useSelector(selectFilter);

  const isMounted = React.useRef(false);

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

    dispatch(
      fetchPizzas({
        category,
        search,
        sortBy,
        order,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };
  //
  //     const queryString = qs.stringify(params, { skipNulls: true });
  //
  //     navigate(`/?${queryString}`);
  //   }
  //
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  // }, [categoryId, searchValue, sort.sortProperty, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as SearchPizzaParams;
  //
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //
  //     dispatch(
  //       setFilters({
  //         categoryId: Number(params.category),
  //         searchValue: params.search,
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       })
  //     );
  //   }
  //
  //   isMounted.current = true;
  // }, []);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(idx: number) => dispatch(setCategoryId(idx))}
        />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj: any) => <PizzaBlock {...obj} />)}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(page: number) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default Home;
