/**
 * https://kulshekhar.github.io/ts-jest/
 */
import http from 'http'
import fetch from 'isomorphic-unfetch'
import listen from 'test-listen'
import {apiResolver} from 'next/dist/next-server/server/api-utils'
import handler from '../../../../pages/api/health'

describe('Integrations tests for health endpoint', () => {
  let server;
  let url;

  beforeAll(async done => {
    server = http.createServer((req, res) => apiResolver(req, res, undefined, handler, undefined))
    url = await listen(server);
    done()
  });

  afterAll(done => {
    server.close(done)
  });

  test('Should return 200 informing internet status if OK', async () => {

    const response = await fetch(url);

    const jsonResult = await response.json();

    expect(response.status).toBe(200);

    expect(jsonResult).toMatchObject({
      result: "success"
    })
  });

});