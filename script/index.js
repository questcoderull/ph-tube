console.log("index is connected");

function loadCategory() {
  //   first kaj, datake fetch kora.
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //   2. convert promise to json
    .then((res) => res.json())
    // 3. send data to display...
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  //   steps to show it pefectly on screen.
  // 1. get the container (by id)
  const categoryContainer = document.getElementById("category-container");

  // 2. loop operation.
  for (let cate of categories) {
    console.log(cate);

    // 3. create Element.
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
  <button class="btn btn-sm hover:bg-red-600 hover:text-white">${cate.category}</button>
  `;
    // 4. Append the Element.
    categoryContainer.append(categoryDiv);
  }
}
loadCategory();
