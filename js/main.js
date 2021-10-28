const inputsCheckbox = document.querySelectorAll('.container-custom-checkbox input'),
    ingredients = document.querySelectorAll('.current-pizza-item'),
    drinks = document.querySelectorAll('.select-drink-item'),
    totalAmount = document.querySelector('.total-amount>.summa'),
    orderBtn = document.querySelector('.typical-btn'),
    modalWindow = document.querySelector('.modal-window'),
    submitBtn = document.querySelector('.modal-window__submit-btn');

const subject = document.querySelector('.modal-window__subject'),
    ingredientsSpan = document.querySelectorAll('.modal-window__ingredients'),
    drinksSpan = document.querySelectorAll('.modal-window__drinks');

const addIngredients = checkboxes => {
    const nodesArray = Array.from(checkboxes);
    const ingredientsArray = Array.from(ingredients);
    ingredientsArray.splice(0, 2);

    for (let node of checkboxes) {
        node.addEventListener('click', event => {
            event.target.parentNode.classList.toggle('active');
            const index = nodesArray.indexOf(event.target);
            ingredientsArray[index].classList.toggle('active');
            calculateOrder();
        });
    }
}
addIngredients(inputsCheckbox);

const addDrinks = drinkItems => {
    for (let item of drinkItems) {
        item.addEventListener('click', event => {
            event.target.parentNode.classList.toggle('active');
            calculateOrder();
        });
    }
}
addDrinks(drinks);

const calculateOrder = () => {
    const ingredients = document.querySelectorAll('.container-custom-checkbox.active'),
        drinks = document.querySelectorAll('.select-drink-item.active');

    const startPrice = 300,
        ingredientsPrice = ingredients.length * 25,
        drinksPrice = drinks.length * 95;

    totalAmount.innerHTML = `${startPrice + ingredientsPrice + drinksPrice}₽`;

}

window.addEventListener('click', event => {
    if (event.target === modalWindow) {
        modalWindow.classList.add('none');
    }
});

submitBtn.addEventListener('click', () => {
    modalWindow.classList.add('none');
});

const prepareModalContent = () => {
    subject.innerHTML = '';
    ingredientsSpan.innerHTML = '';
    drinksSpan.innerHTML = '';

    const addedIngredients = document.querySelectorAll('.container-custom-checkbox.active'),
        addedDrinks = document.querySelectorAll('.select-drink-item.active');

    let ingredientsList = [];
    if (addedIngredients) {
        for (let ingredient of addedIngredients) {
            ingredientsList.push(ingredient.innerText);
        }
    };

    let drinksList = [];
    if (addedDrinks) {
        for (let drink of addedDrinks) {
            drinksList.push(drink.dataset.name);
        }
    };

    const totalIngredients = ingredientsList.join(', ') || 'нет ингредиентов';
    const totalDrinks = drinksList.join(', ') || 'нет напитков';
    const totalText = `Вы заказали пиццу, с ингредиентами: '${totalIngredients}', а так же напитки: '${totalDrinks}', с вас ${totalAmount.innerHTML}`;

    subject.innerHTML = totalText;
}

orderBtn.addEventListener('click', () => {
    modalWindow.classList.remove('none');
    prepareModalContent();
});