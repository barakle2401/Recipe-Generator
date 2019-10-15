import React from "react";
import "./main_page.css";
import { Card, Image, Button, ListGroup, ListGroupItem } from "react-bootstrap";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img_src:
        "https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg"
    };
    this.generate_meal = this.generate_meal.bind(this);
  }
  componentDidMount() {}
  generate_meal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(res => {
        //this.setState({ meal: res.meals[0] });
        this.create_meal(res.meals[0]);
      })
      .catch(e => {
        console.warn(e);
      });
  }
  // ${meal.strMealThumb
  create_meal(meal) {
    console.log(meal);
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        // Stop if there are no more ingredients
        break;
      }
    }

    this.setState({
      img_src: [meal.strMealThumb],
      ingredients: ingredients,
      category: meal.strCategory,
      recipe_name: meal.strMeal,
      instructions: meal.strInstructions,
      video_src: "https://www.youtube.com/embed/" + meal.strYoutube.slice(-11)
    });
  }
  render() {
    console.log(this.state);
    let ingredients;
    if (this.state.ingredients) {
      ingredients = this.state.ingredients.map(ing => {
        console.log(ing);
        return <ListGroup.Item>{ing}</ListGroup.Item>;
      });
    }

    return (
      <div>
        <Card className="text-center" bg="dark" text="white">
          <Card.Header as="h3">Recipe Generator</Card.Header>
          <Card.Body>
            <Card.Title as="h3">
              Recipe of
              <h3 style={{ color: "purple" }}>{this.state.recipe_name}</h3>
            </Card.Title>
            <Card.Title>
              Category
              <div style={{ color: "purple" }}> {this.state.category}</div>
            </Card.Title>

            <div className="container">
              <Image src={this.state.img_src} roundedCircle />
              <Button className="btn" onClick={this.generate_meal}>
                generate
              </Button>
            </div>
            <div style={{ color: "purple" }}>
              <ListGroup>
                <ListGroup.Item as="li" variant="info">
                  ingredients
                </ListGroup.Item>
                {ingredients}
              </ListGroup>
            </div>
            <Card.Text>{this.state.instructions}</Card.Text>
          </Card.Body>
          <div class="videoWrapper">
            <iframe
              width="420"
              height="315"
              src={this.state.video_src}
            ></iframe>
          </div>
        </Card>
      </div>
    );
  }
}
export default Main;
