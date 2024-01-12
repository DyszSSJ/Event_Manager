import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { addEvent } from '../redux/actions';

const useEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events);

  const addNewEvent = (event: { name: string; date: string; time: string; description: string; id: number }) => {
    dispatch(addEvent(event));
  };

  return {
    events,
    addNewEvent,
  };
};

export default useEvents;