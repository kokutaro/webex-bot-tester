import actionCreatorFactory from 'typescript-fsa';

import { CurrentView } from '../states/AppState';

const actionCreator = actionCreatorFactory('APP_ACTIONS');

export const setCurrentViewAction = actionCreator<CurrentView>('SET_CURRENT_VIEW');
