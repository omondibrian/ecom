declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_PASSWORD: string;
    POSTGRES_USER: string;
    POSTGRES_DB: string;
    JWT_SECRET: string;
    stripe_secrete_key: string;
    ORIGIN: string;
  }
}
