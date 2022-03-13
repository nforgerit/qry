
export default function fetch(url: string) {
  return new Promise((resolve, reject) => {
    resolve({
      text: () => {
        return `
Redner, Thema, Datum, Wörter
Alexander Abel, Bildungspolitik, 2012-10-30, 5310
Bernhard Belling, Kohlesubventionen, 2012-11-05, 1210
Caesare Collins, Kohlesubventionen, 2012-11-06, 1
Caesare Collins, Innere Sicherheit, 2019-11-06, 8
Alexander Abel, Innere Sicherheit, 2012-12-11, 911
Alexander Abel, Innere Sicherheit, 2017-12-11, 911
Manuela Doppelkopf, Außenpolitik, 2013-12-11, 3355
Andreas Beierheimer, Innenpolitik, 2013-12-11, 999
Christian Europa, Bildungspolitik, 2013-12-11, 1337
Christian Europa, Bildungspolitik, 2013-09-20, 4444
`
      }
    })
  });
}
