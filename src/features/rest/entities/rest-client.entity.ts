import { RestRecipe } from "./rest-recipe.entity";

export class RestClient {
    private restRecipe: RestRecipe;
    constructor() {}

    get(path: string) {
        fetch(this.restRecipe.baseUrl + this.restRecipe.pathPrefix + path);
    }
}