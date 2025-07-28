export const config = {
  development: {
    api: {
      baseURL: "http://localhost:3000/api",
      timeout: 10000,
    },
  },
  production: {
    api: {
      baseURL: "https://tu-api-production.com/api",
      timeout: 15000,
    },
  },
};

export const getConfig = () => {
  return __DEV__ ? config.development : config.production;
};
