const initialState = {
  visibleMenuPopup: false,
};

const visibleMenuPopup = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MENU_POP_UP':
      return {
        ...state,
        visibleMenuPopup: true,
      };
    case 'HIDE_MENU_POP_UP':
      return {
        ...state,
        visibleMenuPopup: false,
      };
    default:
      return initialState;
  }
};

export default visibleMenuPopup;
