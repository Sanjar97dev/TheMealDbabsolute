//Global section
const btn = document.querySelectorAll('button')
const Ultag = document.querySelector('.list')
const input = document.querySelector('input')


//list Url
const foodUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b'
async function foodMils(){
  const res= await fetch(foodUrl)
  const data = await res.json()
  console.log(data.meals)
  foodMealsInfo(data.meals)
}
foodMils()

//SEARCH 
const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    async function mealsSearch(){
        const res = await fetch(url + input.value)
        const data= await res.json()
        console.log(data.meals[0]);
        foodMealsInfo(data.meals)
    }

//INGRIDIENT
    const inUrl='https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772'
    async function inMeals(){
        const res=await fetch(inUrl)
        const data= await res.json()
        console.log(data.meals);
        foodMealsInfo(data.meals)
    }
    
//END ASYNC FUNCTION

//ONCLICK FUNCTIONS
btn[0].onclick=()=>{
    foodMils()
}

input.onchange=()=> {
            mealsSearch();
    }
//End


//HTML JS FOR EACH
function foodMealsInfo(arr) {
    Ultag.innerHTML = '';

    arr.forEach((food, index) => {
        let ingrList=''

        for (let i = 0; i <20; i++) {
            const element = food['strIngredient'+i];
            const inMeasure=food['strMeasure'+i];
            const imageSrc = `https://www.themealdb.com/images/ingredients/${element}-Small.png`;
            if (element) {
                ingrList+=`
                <img src='${imageSrc}'/>
                <li>${element} ${inMeasure}</li>
                `
                // console.log(element); 
            }
        }
        Ultag.innerHTML += `<li>
            <img src='${food.strMealThumb}'/>
            <div class='details' onclick='toggleAccordion(${index})'>
                <button class='btnrecip'>${food.strMeal}</button>
            </div>
            <div class='recipe recipe-inner' id='recipe-${index}'>
                <div class='ingridient'>
                <h4>${food.strArea}</h4>
                <ol>${ingrList}</ol>
                </div>
                <div class='instruction'>
                <h5>Instructions</h5>
                <p>${food.strInstructions}</p>
                </div>
            </div>
        </li>`
    });

    
      
}

Ultag.innerHTML = '';



function toggleAccordion(food) {
    const recipeElement = document.getElementById(`recipe-${food}`);
    recipeElement.classList.toggle('active')
}




 