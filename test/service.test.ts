import Service from '../src/Service.js';
import fetch from './mocks/mockedFetch.js';

test('truthiness', () => {
  expect(1).toBeTruthy();
});

test('Service throws when missing injected fetch function', () => {
  const fetch = null;
  expect(() => new Service({ fetch })).toThrow();
});

test('prepareUpstreams refuses to process non-URLs', async () => {
  const urlParam = [
    'https://example.com',
    'some-invalid-url'
  ];

  const service = new Service({ fetch });
  expect(() => service.prepareUpstreams(urlParam)).toThrow();
});

test('API Usage of Service w/ multiple upstreams', async () => {
  const urlParam = [
    'https://my-mocked-http-upstream.com',
    'https://my-other-mocked-http-upstream.com',
    'https://my-third-mocked-http-upstream.com',
  ];

  const service = new Service({ fetch });
  const upstreams = service.prepareUpstreams(urlParam);
  const data = await service.doLoad(upstreams);
  const response = service.evaluate(data);

  expect(response).toStrictEqual({
    mostSpeeches: 'Christian Europa',
    mostSecurity: 'Alexander Abel',
    leastWordy: 'Caesare Collins'
  })
});

test('API Usage of Service w/ single upstream', async () => {
  const urlParam = 'https://my-mocked-http-upstream.com';

  const service = new Service({ fetch });
  const upstreams = service.prepareUpstreams(urlParam);
  const data = await service.doLoad(upstreams);
  const response = service.evaluate(data);

  expect(response).toStrictEqual({
    mostSpeeches: 'Christian Europa',
    mostSecurity: 'Alexander Abel',
    leastWordy: 'Caesare Collins'
  })
});

