export interface Event {
    id: number;
    name: string;
    date: string;
    time: string;
    description: string;
  }
  
  export interface RootState {
    events: Event[];
  }
  
  const initialState: RootState = {
    events: [],
  };
  
  type Action = { type: 'ADD_EVENT'; payload: Event };
  
  const reducer = (state: RootState = initialState, action: Action): RootState => {
    switch (action.type) {
      case 'ADD_EVENT':
        return {
          ...state,
          events: [...state.events, { ...action.payload, id: state.events.length + 1 }],
        };
      default:
        return state;
    }
  };
  
  export default reducer;