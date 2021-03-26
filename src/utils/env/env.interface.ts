export enum EnvMode {
  DEV_ENV = 'development',
  PROD_ENV = 'production',
  TEST_ENV = 'test',
}

export interface IEnv {
  connectionString: string;
  useCors: boolean;
  port: number;
  jwtSecret: string;
  authorizationTokenDuration: string;
  refreshTokenDuration: string;
  nodemailerEmail: string;
  nodemailerPass: string;
}
