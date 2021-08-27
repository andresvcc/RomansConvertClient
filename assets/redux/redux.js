/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector, useDispatch } from 'react-redux';

const redux = () => {
  const globalState = useSelector((state) => state);

  const dispatch = useDispatch();

  const dispatcher = ({ state, value }) => {
    dispatch({ type: state, state, value });
  };

  return [globalState, dispatcher];
};

export default redux;
