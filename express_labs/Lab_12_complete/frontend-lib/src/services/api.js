import { API_BASE_URL } from '../config';

// Generic API request handler
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                ...options.headers,
            },
            ...options,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Books API
export const booksAPI = {
    getAll: () => apiRequest('/book'),
    getById: (id) => apiRequest(`/book/${id}`),
    create: (bookData) => apiRequest('/book', {
        method: 'POST',
        body: JSON.stringify(bookData),
    }),
    update: (id, bookData) => apiRequest(`/book/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(bookData),
    }),
    delete: (id) => apiRequest(`/book/${id}`, {
        method: 'DELETE',
    }),
};

// Members API
export const membersAPI = {
    getAll: () => apiRequest('/member'),
    getById: (id) => apiRequest(`/member/${id}`),
    create: (memberData) => apiRequest('/member', {
        method: 'POST',
        body: JSON.stringify(memberData),
    }),
    update: (id, memberData) => apiRequest(`/member/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(memberData),
    }),
    delete: (id) => apiRequest(`/member/${id}`, {
        method: 'DELETE',
    }),
};

// Issues API
export const issuesAPI = {
    getAll: () => apiRequest('/issue'),
    getById: (id) => apiRequest(`/issue/${id}`),
    create: (issueData) => apiRequest('/issue', {
        method: 'POST',
        body: JSON.stringify(issueData),
    }),
    returnBook: (id) => apiRequest(`/issue/${id}/return`, {
        method: 'PATCH',
    }),
    delete: (id) => apiRequest(`/issue/${id}`, {
        method: 'DELETE',
    }),
};
