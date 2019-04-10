
export const userReducer = (state = {}, action) => {

    switch (action.type) {

        case 'SAVE_USER': {
            const new_user = action.payload.user;
            delete new_user.meta;
            delete new_user.__v;

            return {
                ...state,
                users: [
                    ...existing_users,
                    new_user,
                ]
            };
        };

        default: return state;
    }
};