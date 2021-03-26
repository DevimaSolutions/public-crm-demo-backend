import { EnvMode, IEnv } from './env.interface';

const processEnvMode = process.env.NODE_ENV?.toLowerCase() as EnvMode;
const envMode = Object.values(EnvMode).includes(processEnvMode)
  ? processEnvMode
  : EnvMode.DEV_ENV;

const isEnv = (mode: EnvMode) => envMode.toLowerCase() === mode;

export const getEnvMode = () => envMode;

export const isDevEnv = () => isEnv(EnvMode.DEV_ENV);

export const isProdEnv = () => isEnv(EnvMode.PROD_ENV);

export const isTestEnv = () => isEnv(EnvMode.TEST_ENV);

const mapEnvValues = {
  bool: (envValue: string) => envValue === 'true',
  number: (envValue: string, defaultValue: number) => {
    const value = Number(envValue);

    return Number.isNaN(value) ? defaultValue : value;
  },
};

const mapEnv = (envData: NodeJS.ProcessEnv) => {
  const {
    CONNECT_STRING = '',
    USE_CORS = '',
    PORT = '',
    JWT_SECRET = '',
    AUTH_TOKEN_EXPIRATION = '30m',
    REFRESH_TOKEN_EXPIRATION = '1d',
    EMAIL = '',
    EMAIL_PASS = '',
  } = envData;

  const defaultPort = 5000;

  const parsed: IEnv = {
    connectionString: CONNECT_STRING,
    useCors: mapEnvValues.bool(USE_CORS),
    port: mapEnvValues.number(PORT, defaultPort),
    jwtSecret: JWT_SECRET,
    authorizationTokenDuration: AUTH_TOKEN_EXPIRATION,
    refreshTokenDuration: REFRESH_TOKEN_EXPIRATION,
    nodemailerEmail: EMAIL,
    nodemailerPass: EMAIL_PASS,
  };

  return Object.freeze(parsed);
};

export const env = mapEnv(process.env);

export default {
  isDevEnv,
  isProdEnv,
  isTestEnv,
  getEnvMode,
  env,
};
