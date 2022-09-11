const currentState = {
    accept_basic: 0,
    accept_ad: 0,
}

function reducers(state = currentState, action) {

    if (action.type === 'BASIC') {
        state.accept_basic = 1;
    }
    else if (action.type === 'ADVERTISEMENT') {
        state.accept_basic = 1;
        state.accept_ad = 1;
    } else if (action.type === 'INIT') {
        state.accept_basic = 0;
        state.accept_ad = 0;
    }

    const newState = { ...state };

    return newState;
};

export default reducers;