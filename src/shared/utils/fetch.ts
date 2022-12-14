import { BASE_URL, isServer, PORT } from '../constants/env';

let IEnvAwareFetch: <T>(
  url: string,
  options?: Record<string, unknown>
) => Promise<T>;

const envAwareFetch: typeof IEnvAwareFetch = async (
  url: string,
  options?: Record<string, unknown>
) => {
  const fetchUrl =
    isServer && url.startsWith('/') ? `${BASE_URL}:${PORT}${url}` : url;
  return fetch(fetchUrl, options).then((res) => res.json());
};

export { envAwareFetch as customFetch };
