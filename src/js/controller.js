//import icons from '../img/icons.svg';// parcel 1
// parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeVie from './views/addRecipeView.js';

// if (module.hot){
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function(){

  try{
    const id = window.location.hash.slice(1);
    if(!id) return;
    // loading spinner
   recipeView.renderSpinner();
   //0) Update results view to mark selected search rresult 
   resultsView.update(model.getSearchResultsPage());
   // loading recipe 
   await model.loadRecipe(id);
   // 2) rendering the recipe 
   recipeView.render(model.state.recipe);
   // 3) updating bookmarks view 
   bookmarkView.update(model.state.bookmarks);
    //controlServings();
  } catch(err){

    recipeView.renderError()
  }

};

const controlSearchResults = async function(){

  try{
    //get search query
    const query = searchView.getQuery();
    if(!query) return;
    // load search results
    await model.loadSearchResults(query);
    // render results 
 
    resultsView.render(model.getSearchResultsPage());
    // render pagination 
    paginationView.render(model.state.search);
  }catch(err)
  {
   console.error(err);
  }
}

const controlPagination = function(goToPage){
   // render new results 
   resultsView.render(model.getSearchResultsPage(goToPage));
   // render new pagination buttons 
   paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  //Update the recipe servings (in state)

  model.updateSerrvings(newServings);
//Update the recipe view 
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe); 

}

const controlAddBookmark = function(){
  // Add / remove bookmark 
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
else model.deleteBookmark(model.state.recipe.id);
// update recipe view 
  recipeView.update(model.state.recipe);
// Render bookmarks 
bookmarkView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarkView.render(model.state.bookmarks);
}
const init = function(){
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandleRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();


