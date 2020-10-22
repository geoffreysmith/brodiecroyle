import { buildUrl } from "https://deno.land/x/url_builder/mod.ts";

export class WikiMedia {
    endPoint = "https://en.wiktionary.org/w/api.php";
    userAgent = "brodie.croyle";

    constructor() {
    }

    async getTeam(team: string) {
        // curl https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Kansas%20City%20Chiefs&rvsection=0&rvslots=*
        // 	 -H "Accept: application/json"
        let url = buildUrl(this.endPoint, {
            queryParams: {
                action: "query",
                prop: "revisions",
                rvprop: "content",
                format: "json",
                titles: team,
                rvsection: "0",
                rvslots: "*"
            },
        });

        const response = await fetch(url);
        const json = await response.json()

        return json;
    }
}