export const dataReducer = (
  state = {
    category: 'NEARBY',
    permissionState: 0,
    locationData: [],
    nearbyData: [],
    featuredData: [],
    savedData: {data: [], ids: []},
    selectedData: [],
  },
  action,
) => {
  switch (action.type) {
    case 'SET_PERMISSION_STATE':
      newState = {...state, permissionState: action.payload};
      return newState;
    case 'SET_CATEGORY':
      newState = {...state, category: action.payload};
      switch (action.payload) {
        case 'NEARBY':
          newState = {...newState, selectedData: newState.nearbyData};
          break;
        case 'FEATURED':
          newState = {...newState, selectedData: newState.featuredData};
          break;
        case 'SAVED':
          newState = {...newState, selectedData: newState.savedData.data};
          break;
      }
      console.log('CATEGORY changed to: ', newState.category);
      return newState;
    case 'SET_LOCATION_DATA':
      newState = {...state, locationData: action.payload};
      return newState;
    case 'SET_NEARBY_DATA':
      action.payload.forEach(element => {
        if (state.savedData.ids.includes(element.id)) {
          element.isSaved = true;
        }
      });
      newState = {
        ...state,
        nearbyData: action.payload,
        selectedData: action.payload,
      };
      return newState;
    case 'SET_FEATURED_DATA':
      action.payload.forEach(element => {
        if (state.savedData.ids.includes(element.id)) {
          element.isSaved = true;
        }
      });
      newState = {
        ...state,
        featuredData: action.payload,
        selectedData: action.payload,
      };
      return newState;
    case 'ADD_TO_SAVED':
      console.log('Adding to Saved: ', action.payload);
      alreadySaved =
        state.savedData.data.filter(saved => saved.id === action.payload.id)
          .length > 0;
      newState = {...state};
      if (!alreadySaved) {
        newSavedData = {
          data: [...newState.savedData.data, action.payload],
          ids: [...newState.savedData.ids, action.payload.id],
        };
        newState = {...newState, savedData: newSavedData};
      }
      return newState;
    case 'REMOVE_FROM_SAVED':
      console.log('Removing from Saved... ', action.payload);
      if (state.savedData.ids.includes(action.payload)) {
        let newSavedData = {
          data: [...state.savedData.data],
          ids: [...state.savedData.ids],
        };
        newSavedData.data = newSavedData.data.filter(
          e => e.id !== action.payload,
        );
        newSavedData.ids = newSavedData.ids.filter(e => e !== action.payload);
        newState = {...state, savedData: newSavedData};
      }
      return newState;
    case 'SET_SAVED_DATA':
      newState = {
        ...state,
        savedData: action.payload,
        selectedData: action.payload,
      };
      return newState;
    default:
      return state;
  }
};

export const networkReducer = (
  state = {requesting: false, success: false, error: false},
  action,
) => {
  switch (action.type) {
    case 'SET_REQUESTING_STATE':
      newState = {...state, requesting: true, success: false, error: false};
      return newState;
    case 'SET_SUCCESS_STATE':
      newState = {...state, success: true, requesting: false, error: false};
      return newState;
    case 'SET_ERROR_STATE':
      newState = {...state, error: true, requesting: false, success: false};
      return newState;
    default:
      return state;
  }
};
