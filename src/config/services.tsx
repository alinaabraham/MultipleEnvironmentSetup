type serverTypes = 'dev' | 'prod';
export const server: serverTypes = 'dev';

export const baseURLs = {
  dev: {
    baseUrl: 'https://api.dev.com',
  },
  staging: {
    baseUrl: 'https://api.staging.com',
  },
};

// export const API_ROUTE = `${baseURLs[server].baseUrl}/api/`;
