
let activeUser = 'u1';

// Retain these functions for compatibility with existing components.
// They are no longer used for backend authentication.
export function setDemoUser(userId) {
  activeUser = userId;
}

export function getDemoUser() {
  return activeUser;
}

// Common API request function
export async function request(path, options = {}) {
  const normalizedPath = path.startsWith('/')
    ? path
    : `/${path}`;

  const hasBody = options.body !== undefined;

  const response = await fetch(`/api${normalizedPath}`, {
    ...options,

    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    },

    body: hasBody
      ? typeof options.body === 'string'
        ? options.body
        : JSON.stringify(options.body)
      : undefined
  });

  // Handle empty responses
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type');

  const result = contentType?.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      result?.message ||
      result?.error ||
      `HTTP ${response.status}`;

    throw new Error(
      Array.isArray(message) ? message.join(', ') : message
    );
  }

  return result;
}

// GET
export const get = (path) => request(path);

// POST
export const post = (path, payload) =>
  request(path, {
    method: 'POST',
    body: payload
  });

// PATCH
export const patch = (path, payload) =>
  request(path, {
    method: 'PATCH',
    body: payload
  });

// DELETE
export const del = (path) =>
  request(path, {
    method: 'DELETE'
  });
