const Addressbook = [];

export default (state = Addressbook, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            return [
                ...state, action.payload
            ];
        default:
            return state;
    }
}