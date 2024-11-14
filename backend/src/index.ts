import express from 'express';
import OpenAI from "openai";
import { db } from './firebase';
import cors from 'cors';
import axios from 'axios';

const usersCollectionRef = db.collection("users");
const ejk255DocumentRef = db.collection("users").doc("ejk255");

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors()); 

app.get('/getRecipes', async (req, res) => {
  try {
    const recipesCollectionRef = db.collection('recipes');
    const snapshot = await recipesCollectionRef.get();

    if (snapshot.empty) {
      res.status(404).json({ message: 'No recipes found' });
      return;
    }

    const recipes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(recipes);

  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ error: 'Error fetching documents' });
  }
})

app.post('/addRecipe', async (req, res) => {
  const { title, ingredients } = req.body;
  try {
    const recipeCollectionRef = db.collection('recipes');
    //CREATE A NEW DOC
    const newDocRef = recipeCollectionRef.doc(); // Auto-generate unique ID
    await newDocRef.set({
      title: title,
      ingredients: ingredients,
    });
    res.json({ message: 'Recipe added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add recipe' });
  }
});


app.get('/testGetUser', async (req, res) => {
  try {
    const doc = await ejk255DocumentRef.get();
    if(doc.exists) {
      console.log(doc.data);
      res.send(doc.data());
    } else {
      res.status(404).send("Document not found.");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).send("Error fetching document.");
  }
})

app.post('/gpt', async (req, res) => {
  const { content } = req.body;
  const openai = new OpenAI({
    apiKey: "placeholder"
  });

  try {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: content,
            },
        ],
    });
    res.json(completion.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading API response.");
  }
})

app.get('/', (req, res) => {
  res.send('Hello from the Cookbook API!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
