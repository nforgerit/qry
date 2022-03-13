import express from 'express';
import fetch from 'node-fetch';
import IEvaluationResponse from './IEvaluationResponse.js';

import Service from './Service.js';
import { EvaluationRequest } from './Types.js';

const app = express();

app.get('/evaluation', async (req: EvaluationRequest, res) => {
  const urlParam = req.query.url;

  if (!urlParam) {
    return res.status(400)
      .send({'message': 'USAGE: Please provide at least 1 urlencoded upstream url via ?url='});
  }

  let response = {};

  try {
    const service = new Service({ fetch });
    const upstreams = service.prepareUpstreams(urlParam);
    const data = await service.doLoad(upstreams);
    response = service.evaluate(data);
  } catch (err) {
    return res.status(400)
      .send({'message': `${err}`})
  }


  res.json(response as IEvaluationResponse);
});

app.listen(8080, () => {
  console.log(`
-> http://localhost:8080/evaluation?url=URL_1&url=URL_2...&url=URL_n

where URL_i = encodeURI(YOUR_URL)

EXAMPLE
http://localhost:8080/evaluation?url=https%3A%2F%2Ffid-recruiting.s3-eu-west-1.amazonaws.com%2Fpolitics.csv

  `)
});
