


export const pestReducer = (state = [], action) => {

    switch (action.type) {

        case `SAVE_PEST_DETECTION`: {
            return [
                ...state,
                action.payload.pest_detection,
            ];
        }

        case `SAVE_PEST_DETECTIONS`: {
            return [
                ...action.payload.pest_detections
            ];
        }

        default: 
            return state;
    }

}