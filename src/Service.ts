import IEvaluationResponse from './IEvaluationResponse.js';
import CSVParser from './utils/CSVParser.js';
import ResMapper from './utils/ResMapper.js';
import { groupBy, countSub, sortBy } from './utils/Data.js';

function matchOrThrow(url) {
  /*
    I'd highly prefer some kind of an allowList to match
    given urls against. I don't like fetching stuff from
    unknown URLs.
  */

  // ref. https://urlregex.com/
  const PATTERN = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

  if (!url.match(PATTERN)) {
    throw new Error(`URL=[${url}] is not a valid URL`);
  }

  return url;
}

export default class DataLoader {
  fetch: any;

  /*
    Constructor DI for testing purposes w/o needing
    to wrap the whole Express app or needing to 
    install some funny http interceptor testing lib.
   */
  constructor({ fetch }) {
    if (!fetch) throw new Error('fetch implementation missing.');
    this.fetch = fetch;
  }

  prepareUpstreams(urlParam: string | Array<string>): Array<string> {
    let upstreams = Array.isArray(urlParam) 
      ? urlParam.map(url => decodeURI(url as string))
      : [decodeURI(urlParam as unknown as string)];

    upstreams = upstreams.map(decodeURI).map(matchOrThrow);

    return upstreams;
  }

  /*
    This function should also handle partial failure and upstream timeouts.
  */
  async doLoad(upstreams: Array<string>) {
    console.log('upstreams', upstreams);

    const responses = (await Promise.all(
      upstreams
        .map((upstream) => {
          return this.fetch(upstream)
            .then(resp => resp.text())
            .then(CSVParser.parse)
        })
      ))
      .flat(Infinity)
      .map(ResMapper.mapper);

    return responses;
  }


  evaluate(data: Array<unknown>) {
    let evaluated = {};

  /*
    Eval time! Kinda ugly, should be refactored:
    Would be fun to create an in-memory Query API, e.g.

    const mostSpeeches = QueryBuilder(data)
                            .select(FIELDS)
                            .where(TRUTHY)
                            .groupBy(STH)
                            .limit(N)|.count(WHATEVER)
  */

    // 1. Which politician gave the most speeches in 2013?
    const speechesIn2013 = data.filter(item => item['Datum'].getFullYear() === 2013);
    const politicians = groupBy(speechesIn2013, 'Redner');
    const politiciansCounted = countSub(politicians);
    const mostSpeeches = sortBy(politiciansCounted, 'count').pop();

    // 2. Which politician gave the most speeches on the topic "Innere Sicherheit"?
    const topic = data.filter(item => item['Thema'] === 'Innere Sicherheit')
    const topicGrouped =  groupBy(topic, 'Redner');
    const topicCounted = countSub(topicGrouped);
    const mostSecurity = sortBy(topicCounted, 'count').pop();

    // 3. Which politician used the fewest words?
    const words = sortBy(data, 'Wörter', 'desc');
    const fewestWords = words.pop();

    evaluated = {
      mostSpeeches: mostSpeeches ? mostSpeeches['key'] : null,
      mostSecurity: mostSecurity ? mostSecurity['key'] : null,
      leastWordy: fewestWords ? fewestWords['Redner'] : null,
    } as IEvaluationResponse;

    return evaluated;
  }

}