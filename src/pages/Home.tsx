import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import {
  Categories,
  Pagination,
  PizzaBlock,
  Skeleton,
  Sort,
} from '../components';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, searchValue, currentPage, sort } =
    useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const getPizzas = () => {
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;
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

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
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
            : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
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
