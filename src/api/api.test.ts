import { api } from './api';

describe('api', () => {
  it('should configure the correct base URL', () => {
    expect(api.defaults.baseURL).toBeDefined();
  });

  it('should configure the timeout', () => {
    expect(api.defaults.timeout).toBe(10000);
  });

  it('should configure content type header', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });
});
