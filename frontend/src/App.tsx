import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeList from './components/RecipeList';
import axios from 'axios';

function App() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getRecipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const addRecipe = async () => {
    const recipeName = prompt('Enter the name of the recipe');
    const instructions = prompt('Enter the instructions for the recipe');

    if (recipeName && instructions) {
      try {
        await axios.post('http://localhost:3001/addRecipe', {
          title: recipeName,
          ingredients: instructions,
        });
        fetchRecipes(); // Re-fetch recipes after adding a new one
      } catch (error) {
        console.error('Error adding recipe:', error);
      }
    }
  };

  return (
    <div className="App">
      <RecipeList recipes={recipes} />
      <button onClick={addRecipe}>Add</button>
    </div>
  );
}

export default App;
