const processingXmlDocument = (xmlObject) => {
  const feeds = {};
  feeds.title = xmlObject.getElementsByTagName('title')[0].childNodes[0].nodeValue;
  feeds.description = xmlObject.getElementsByTagName('description')[0].childNodes[0].nodeValue;
  const items = xmlObject.getElementsByTagName('item');
  const posts = Object.values(items).reduce((acc, item) => {
    const obj = {};
    obj.title = item.getElementsByTagName('title')[0].childNodes[0].nodeValue;
    obj.link = item.getElementsByTagName('link')[0].childNodes[0].nodeValue;
    acc.push(obj);
    return acc;
  }, []);
  return [feeds, posts];
};
export default processingXmlDocument;
