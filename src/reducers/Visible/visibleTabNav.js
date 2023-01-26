const initialState = {
  visibleTabNav: true,
};

const visibleTabNav = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FALSE':
      return {
        ...state,
        visibleTabNav: false,
      };
    case 'SET_TRUE':
      return {
        ...state,
        visibleTabNav: true,
      };
    default:
      return initialState;
  }
};

export default visibleTabNav;
