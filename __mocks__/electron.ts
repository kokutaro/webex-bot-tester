import 'ts-jest';

const electron = {
  remote: {
    BrowserWindow: jest.fn(),
  },
};

export default electron;
