import React from 'react';
import './Recipe.css'
import axios from 'axios';

interface RecipeProps {
  title: string;
  ingredients: string;
}

const Recipe: React.FC<RecipeProps> = ({title, ingredients}) => {

  const handleRemake = async() => {
    const recipeTitle = title;
    const recipeIngredients = ingredients;

    const content = "The dish I'm trying to make is " + recipeTitle + " and these are the ingredients: " + recipeIngredients;

    try {
       const response = await axios.post('http://localhost:3001/gpt', {
        content: content,
      });
      console.log(response.data);
      alert(response.data);

    } catch (error) {
      console.error('Error remaking recipe:', error);
    }
  }

  return (
    <div className="recipe">
      <h2>{title}</h2>
      <p>{ingredients}</p>
      <button onClick={handleRemake}>Remake</button>
    </div>
  );
};

export default Recipe;
