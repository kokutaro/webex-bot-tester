import { Button, TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { saveConfig } from '../actions/ConfigActions';
import { State } from '../states/State';

const SettingsComponent: React.FC = () => {
  const dispatch = useDispatch();

  const storedBotToken = useSelector<State, string>(
    (state) => state.configState.config.botToken ?? '',
  );

  const [botToken, setBotToken] = useState<string>(storedBotToken);

  console.log(botToken);
  const onSaveBotToken = useCallback(() => {
    saveConfig({ botToken: botToken }, dispatch);
  }, [dispatch, botToken]);

  const onChangeBotToken = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBotToken(e.currentTarget.value);
    },
    [botToken],
  );

  return (
    <div>
      <TextField label="Bot Token" value={botToken} onChange={onChangeBotToken} />
      <Button onClick={onSaveBotToken}>Save</Button>
    </div>
  );
};

export default SettingsComponent;
