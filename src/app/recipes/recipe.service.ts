import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import {Recipe} from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel'
              , 'Super Tasty'
              , 'https://previews.123rf.com/images/peteers/peteers1608/peteers160800221/61209448-wiener-schnitzel-with-french-fries-salad-and-a-sharp-dip.jpg',
              [
                new Ingredient('Meat', 1),
                new Ingredient('Fries', 20)
              ]),
    new Recipe('Gordon Ramsay Burger'
              , 'Ramsay would approve'
              , 'https://www.gordonramsayrestaurants.com/assets/Uploads/_resampled/CroppedFocusedImage121578650-50-Gordon-Ramsay-Brittania-Burger-Tablet.png',
              [
                new Ingredient('Buns', 2),
                new Ingredient('Patty', 1)
              ]
              )
  ];

  constructor(private slService: ShoppingListService) {

  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
