// Requires VITE_CODESPACE_NAME to be set (e.g. in .env.local) to reach the Codespaces-forwarded API.
// Falls back to localhost when unset so we never request https://undefined-8000...
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function apiUrl(resource) {
  if (resource.startsWith('/api/')) {
    return `${API_BASE_URL.replace(/\/api$/, '')}${resource}`;
  }
  return `${API_BASE_URL}/${resource}/`;
}

// Backend responses may be a plain array or a paginated object with a `results` array.
export function extractItems(data) {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.results)) {
    return data.results;
  }
  return [];
}
