import { Event } from './reducers';

export const addEvent = (event: Event) => ({
  type: 'ADD_EVENT',
  payload: event,
});