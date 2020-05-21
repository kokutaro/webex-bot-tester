import '../core/CoreInterface';

import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';

import { Config } from '../states/Config';

const actionCreator = actionCreatorFactory('CONFIG_ACTIONS');

export const loadConfigAction = actionCreator.async<void, Config, string>('LOAD_CONFIG');
export const saveConfigAction = actionCreator.async<Config, void, string>('SAVE_CONFIG');

export const loadConfig = async (dispatch: Dispatch): Promise<void> => {
  dispatch(loadConfigAction.started());
  try {
    const config = await window.core.loadConfigFromFile();
    dispatch(loadConfigAction.done({ result: config }));
  } catch (error) {
    dispatch(loadConfigAction.failed({ error: error.toString() }));
  }
};

export const saveConfig = async (config: Config, dispatch: Dispatch): Promise<void> => {
  dispatch(saveConfigAction.started(config));
  try {
    await window.core.saveConfigToFile(config);
    dispatch(saveConfigAction.done({ params: config }));
  } catch (error) {
    dispatch(saveConfigAction.failed({ error: error.toString(), params: config }));
  }
};
