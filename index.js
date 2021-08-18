/// <reference path="https://raw.githubusercontent.com/denoland/deployctl/main/types/deploy.fetchevent.d.ts" />
/// <reference path="https://raw.githubusercontent.com/denoland/deployctl/main/types/deploy.ns.d.ts" />
/// <reference path="https://raw.githubusercontent.com/denoland/deployctl/main/types/deploy.window.d.ts" />
import { h, json, jsx, serve } from "https://deno.land/x/sift/mod.ts";
import cat from "https://esm.sh/urlcat";

serve({
  "/:query*": async (req) => {
    const url = new URL(req.url)
    const ip = req.headers.get("x-forwarded-for");
    const searchParams = url.searchParams;
    const keys = [...searchParams.keys()];
    const values = [...searchParams.values()];
    const paramResult = keys.reduce((p, c, i) => {
      p[c] = values[i];
      return p;
    }, {});
    const u = cat("http://ip-api.com/json", url.pathname == "/" ? `/${ip}` : url.pathname, paramResult);
   
    const res = await fetch(u, req).then((d) => {
      console.log(d.url);
      return d;
    });
    return res;
  },
});
