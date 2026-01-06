import { test, expect } from '@playwright/test';
import { APIClient } from './helpers/api-client';

test.describe('Users API', () => {
  let apiClient: APIClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new APIClient(request, process.env.BASE_URL);
  });

  test('should fetch all users', async () => {
    const response = await apiClient.get('/users');

    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
  });

  test('should fetch a single user by ID', async () => {
    const userId = 1;
    const response = await apiClient.get(`/users/${userId}`);

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toHaveProperty('id', userId);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('username');
  });

  test('should handle 404 for non-existent user', async () => {
    const response = await apiClient.get('/users/999999');

    expect(response.status()).toBe(404);
  });

  test('should create a new user', async () => {
    const newUser = {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      address: {
        street: '123 Main St',
        city: 'Test City',
        zipcode: '12345',
      },
    };

    const response = await apiClient.post('/users', newUser);

    expect(response.status()).toBe(201);
    const createdUser = await response.json();
    expect(createdUser).toHaveProperty('id');
    expect(createdUser).toHaveProperty('name', newUser.name);
    expect(createdUser).toHaveProperty('email', newUser.email);
  });

  test('should update a user', async () => {
    const updatedData = {
      name: 'Updated User Name',
      email: 'updated@example.com',
    };

    const response = await apiClient.put('/users/1', updatedData);

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toHaveProperty('name', updatedData.name);
    expect(user).toHaveProperty('email', updatedData.email);
  });

  test('should delete a user', async () => {
    const response = await apiClient.delete('/users/1');

    expect(response.status()).toBe(200);
  });

  test('should validate user properties', async () => {
    const response = await apiClient.get('/users/1');
    const user = await response.json();

    expect(user.id).toBeDefined();
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
