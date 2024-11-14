import React from 'react';
import Recipe from './Recipe';
import './RecipeList.css';

interface RecipeData {
  id: string;
  title: string;
  ingredients: string;
}

interface RecipeListProps {
  recipes: RecipeData[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className="recipe-list">
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        <Recipe key={recipe.id} title={recipe.title} ingredients={recipe.ingredients} />
      ))}
    </div>
  );
};

export default RecipeList;
