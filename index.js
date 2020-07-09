let url;

class ElementHandler {
  element(element) {
    let version = url.slice(-1);
    if (element.tagName === "title") {
      element.setInnerContent(`Cloudflare variant ${version}`);
    }
    else if (element.tagName === "h1") {
      element.setInnerContent(`Cloudflare variant ${version}`);
    }
    else if (element.tagName === "p") {
      element.setInnerContent(`I modified variant ${version} of the take home project!`);
    }
    else if (element.tagName === "a") {
      element.setAttribute('href', "https://github.com/koderjoker");
      element.setInnerContent(`Visit Kanchan's GitHub!`);
    }
  }
}

async function generate(request) {

  const headers = { 'Content-Type': 'text/html;charset=UTF-8' };

  const variant_array = await fetch('https://cfw-takehome.developers.workers.dev/api/variants', headers);
  const { variants } = await variant_array.json();

  const cookie = request.headers.get('cookie');
  if (cookie && cookie.includes(variants[0])) {
    url = variants[0];
  } else if (cookie && cookie.includes(variants[1])) {
    url = variants[1];
  } else {
    url = Math.random() > 0.5 ? variants[0] : variants[1];
    headers['Set-Cookie'] = `url=${url}`;
  }

  const variant_html = await fetch(url);
  const html = await variant_html.text();

  return new Response(html, { headers });

}

const rewriter = new HTMLRewriter()
  .on('title', new ElementHandler())
  .on('h1#title', new ElementHandler())
  .on('p#description', new ElementHandler())
  .on('a#url', new ElementHandler())

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
    response = await generate(request);
    return rewriter.transform(response);
}
