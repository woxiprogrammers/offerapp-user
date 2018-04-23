import {
    MOVE_FACTOR_X,
    MOVE_FACTOR_Y,
    ADD_AR_OBJECT,
    UPDATE_GYRO_DATA,
    CLEAR_AR_OBJECTS,
    UPDATE_X,
    UPDATE_Y,
    AR_HANDLE
} from '../../constants';
import { variables } from '../../styles';

const INITIAL_STATE = {
    arOn: false,
    arObjects: [],
    gyroX: 0,
    gyroY: 0,
    xOffset: 0,
    yOffset: 0
};

export default function reducer(state = INITIAL_STATE, action) {
    let newXOffset;
    switch (action.type) {
        case ADD_AR_OBJECT:
            return {
                ...state,
                arObjects: [
                    ...state.arObjects,
                    action.arObject
                ]
            };
        case CLEAR_AR_OBJECTS:
            return {
                ...INITIAL_STATE
            };
        case UPDATE_GYRO_DATA:
            newXOffset = state.xOffset + (action.moveY * (MOVE_FACTOR_X * action.rotationRate.y));
            if (
              newXOffset > 18 * variables.SCREEN_WIDTH
              || newXOffset < -(18 * variables.SCREEN_WIDTH)
            ) {
                if (newXOffset > 0) {
                  newXOffset -= 36 * variables.SCREEN_WIDTH;
                } else {
                  newXOffset += 36 * variables.SCREEN_WIDTH;
                }
            }
            return {
                ...state,
                gyroX: action.rotationRate.x,
                gyroY: action.rotationRate.y,
                xOffset: newXOffset,
                yOffset: state.yOffset + (action.moveX * (MOVE_FACTOR_Y * action.rotationRate.x))
            };
        case UPDATE_X:
          return {
            ...state,
            xOffset: state.xOffset + (MOVE_FACTOR_X * action.difference)
          };
        case AR_HANDLE:
          return {
            ...state,
            arOn: action.arOn
          };
        case UPDATE_Y:
          return {
            ...state,
            yOffset: state.yOffset + (MOVE_FACTOR_Y * action.difference)
          };
        default:
            return state;
    }
}
