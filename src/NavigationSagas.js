//@ts-check

import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import NavigationService from './NavigationService';
import { LOGIN_FAILED, SIGNED_OUT, START_SIGN_IN, START_SIGN_IN_WITHOUT_CREDENTIAL, SET_CURRENT_MODULE, SELECT_CURRENT_SUBMODULE, CONTINUE_MODULE_LEARNING, LEARN_FALSE_QUESTIONS_FROM_MODULE, CONTINUE_SECTION_LEARNING, INIT_EXAM, FINISH_EXAM, GET_RESULT_STATS_FOR_MODULE, LOGIN_SUCCESS } from './coreFork';
import { push } from 'connected-react-router';

export function* navigateOnAction({type}){
    switch (type) {
        case LOGIN_SUCCESS: yield put(push('/home'));
            break;
        case LOGIN_FAILED: yield put(push('/'));
            break;
        case SIGNED_OUT: yield put(push('/'));
            break;
        case START_SIGN_IN: //yield put(push('AuthLoading'));
            break;
        case START_SIGN_IN_WITHOUT_CREDENTIAL: //yield put(push('AuthLoading'));
            break;
        case SET_CURRENT_MODULE: yield put(push('/kategorien'));
            break;
        case SELECT_CURRENT_SUBMODULE: yield put(push('info'));
            break;
        case CONTINUE_MODULE_LEARNING: yield put(push('/question'));
        case LEARN_FALSE_QUESTIONS_FROM_MODULE: yield put(push('/question'));
        case CONTINUE_SECTION_LEARNING: yield put(push('/question'));
            break;
        case INIT_EXAM: yield put(push('/test'));
            break;
        case FINISH_EXAM: yield put(push('testStatistics'));
            break;
        case GET_RESULT_STATS_FOR_MODULE:
                yield put(push('/testResult'));
            break;
        default:
            break;
    }
}

export const navigationSagas =  [takeEvery('*', navigateOnAction)];

