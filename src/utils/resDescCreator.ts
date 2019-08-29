export enum NameStatus {
  SUCCESS = 'success',
  ERROR = 'error'
};

export const resErrorDescCreator = (desc: string) => {
  return resDescCreator(NameStatus.ERROR, { name: 'description', payload: desc })
};

interface Config {
  name: string;
  payload: any;
};

const resDescCreator = (nameStatus: NameStatus, config?: Config) => {
  if (config) {
    return {
      status: nameStatus,
      [config.name]: config.payload
    };
  }
  return {
    status: nameStatus
  };
};

export default resDescCreator;