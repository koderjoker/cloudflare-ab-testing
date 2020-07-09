# Cloudflare A/B testing

An application to simulate A/B testing. [Deployed on Cloudflare Workers, can be found here](https://kanchan-cloudflare-intern-project.koderjoker.workers.dev/).

Submission for Cloudflare’s 2020 summer full stack internship [application](https://github.com/cloudflare-internship-2020/internship-application-fullstack).

- Makes a [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) request inside the script event handler to the [URL](https://cfw-takehome.developers.workers.dev/api/variants), parses the response (urls for variants of the website) as JSON and saves it
- Makes a fetch request to one of the two URLs received in the response with 50/50 probability, and returns it as the response from the script
- Parses and transforms the variants’ HTML using [Cloudflare’s HTMLRewriter API](https://developers.cloudflare.com/workers/reference/apis/html-rewriter/)
- Persists the chosen URL in a [cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) so that the user always sees the same variant of the website when they return to the application
