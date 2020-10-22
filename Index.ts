import {WikiMedia} from "./WikiMedia.ts";

let media = new WikiMedia();
let team = await media.getTeam("Kansas%20City%20Chiefs");
console.log("team: "+ JSON.stringify(team))