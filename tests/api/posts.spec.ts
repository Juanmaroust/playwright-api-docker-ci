import { test, expect } from '@playwright/test';
import { APIClient } from './helpers/api-client';

test.describe('Posts API', () => {
  let apiClient: APIClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new APIClient(request, process.env.BASE_URL);
  });

  test('should fetch all posts', async () => {
    const response = await apiClient.get('/posts');

    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
  });

  test('should fetch posts with pagination', async () => {
    const response = await apiClient.get('/posts?_page=1&_limit=10');

    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts.length).toBeLessThanOrEqual(10);
  });

  test('should fetch a single post by ID', async () => {
    const postId = 1;
    const response = await apiClient.get(`/posts/${postId}`);

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post).toHaveProperty('id', postId);
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
  });

  test('should fetch comments for a specific post', async () => {
    const response = await apiClient.get('/posts/1/comments');

    expect(response.status()).toBe(200);
    const comments = await response.json();
    expect(Array.isArray(comments)).toBeTruthy();
  });

  test('should create a new post', async () => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post',
      userId: 1,
    };

    const response = await apiClient.post('/posts', newPost);

    expect(response.status()).toBe(201);
    const createdPost = await response.json();
    expect(createdPost).toHaveProperty('id');
    expect(createdPost).toHaveProperty('title', newPost.title);
    expect(createdPost).toHaveProperty('body', newPost.body);
    expect(createdPost).toHaveProperty('userId', newPost.userId);
  });

  test('should update a post', async () => {
    const updatedData = {
      title: 'Updated Post Title',
      body: 'Updated post body',
    };

    const response = await apiClient.patch('/posts/1', updatedData);

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post).toHaveProperty('title', updatedData.title);
  });

  test('should delete a post', async () => {
    const response = await apiClient.delete('/posts/1');

    expect(response.status()).toBe(200);
  });

  test('should filter posts by user ID', async () => {
    const userId = 1;
    const response = await apiClient.get(`/posts?userId=${userId}`);

    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    posts.forEach((post: { userId: any; }) => {
      expect(post.userId).toBe(userId);
    });
  });

  test('should validate post structure', async () => {
    const response = await apiClient.get('/posts/1');
    const post = await response.json();

    expect(post.id).toBeDefined();
    expect(typeof post.userId).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
    expect(post.title.length).toBeGreaterThan(0);
    expect(post.body.length).toBeGreaterThan(0);
  });
});
