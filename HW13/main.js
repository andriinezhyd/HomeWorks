// создаем карточку товара
const renderCard = (pizza) => {
    const holdCard = document.createElement('div')
    holdCard.className = 'hold-card'
    const card = document.createElement('div')
    card.className = 'card';
    card.id = `pizza${pizza.id}`;
    holdCard.appendChild(card);
    // img
    const img = document.createElement('div');
    img.innerHTML = `<img src="img/${pizza.img}" alt="icon">`
    img.classList.add('card-img-top');
    card.appendChild(img);
    // h3
    const pizzaName = document.createElement('div')
    pizzaName.className = 'pizza-card__name';
    pizzaName.innerHTML = `<h3>${pizza.name}</h3>`
    // pizzaName.innerText = pizza.name;
    card.appendChild(pizzaName);
    // p composition
    const composition = document.createElement('div');
    composition.innerHTML = '<ul>'+ 'Состав: ' + pizza.composition.map(c => `<li>${c},</li>`).join(' ') + '</ul>';
    composition.className = 'pizza-card__composition';

    card.appendChild(composition);
    // p caloricity
    const caloricity = document.createElement('p')
    caloricity.className = 'pizza-card__caloricity';
    caloricity.innerText = `Ккал: ${pizza.caloricity}`;
    card.appendChild(caloricity);
    // p price
    const price = document.createElement('p')
    price.className = 'pizza-card__price';
    price.innerText = `Цена: ${pizza.price} грн.`;
    card.appendChild(price);
    // button
    const button = document.createElement('button')
    button.className = 'pizza-card__button';
    button.innerText = 'Заказать';
    card.appendChild(button);

    button.onclick = function (e) {
        console.log(this)
    }
    return holdCard
}

// рендерим в див
const renderHolderPizzasList = (arrayOfPizza) => {
    const mainElement = document.querySelector('.holder-pizzas-list')

    mainElement.innerHTML = ''
    for (let pizza of arrayOfPizza) {
        const card = renderCard(pizza)
        mainElement.appendChild(card)
    }
}
renderHolderPizzasList(pizzaList)

// селект по возрастанию, по убыванию цены
const select = document.getElementById('select');

select.onchange = function () {
    const newArr = [...pizzaList];
    newArr.sort((a, b) => {
        if (a.price < b.price) return this.value === '1' ? -1 : 1
        if (a.price > b.price) return this.value === '1' ? 1 : -1
        if (a.price === b.price) return 0
    })
    renderHolderPizzasList(newArr)
}

// инпут поиск вхождений 
const input = document.getElementById('nameInput')

input.onchange = function(e) {
    renderHolderPizzasList(pizzaList.filter(pizza => pizza.name.toLowerCase().includes(e.target.value.toLowerCase())))
    console.dir(e.target.value) // всегда строка
}
