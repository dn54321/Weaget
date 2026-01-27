import { RestApiBuilder } from "@services/rest/services/rest-api.builder";
import { RestRecipe } from "@src/features/rest/entities/rest-recipe.entity";

import { RestRecipeDirector } from "./rest-api.director";

export class RestService {
    private restRecipeDirector: RestRecipeDirector;

    constructor(
        restRecipeDirector: RestRecipeDirector
    ) {
        this.restRecipeDirector = restRecipeDirector ?? new RestRecipeDirector();
    }

    get(recipe: RestRecipe) {

    }

    /**
     * Creates a recipe
     */
    makeRecipe() {

    }

    /**
     * Creates a partial recipe and returns the recipeBuilder.
     * This allows you to configure the recipe yourself.
     *
     * Use this if you need to further configure the recipe.
     */
    makeRecipeBase(recipe: RestRecipe): RestApiBuilder {

    }

    patch() {

    }

    post() {

    }

    put() {

    }
}
