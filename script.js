const URL = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", async function (e) {
  data = await fetchData(URL);
  console.log(data);
  showProducts(data);
});

async function fetchData(URL) {
  /*Función asincrónica que realiza una solicitud a una URL utilizando la función fetch() y await.
  Si ocurre algún error lo captura y lo registra en la consola. 
  Si no hay errores devuelve el array de productos obtenido.*/
  try {
    const response = await fetch(URL);
    const jsondata = await response.json();
    console.log(jsondata);
    return jsondata;
  } catch (error) {
    // Log de eventual error
    console.log(error);
  }
}

function showProducts(productsData) {
  let htmlContentToAppend = "";

  productsData.forEach((product) => {
    htmlContentToAppend += `
      <div class="list-group-item">
        <h3>${cutString(product.title)}</h3>
        <p>${getCurrentDateTime()} ${stars(product.rating.rate)}</p>
      </div>`;
  });
  
  document.getElementById("products").innerHTML = htmlContentToAppend;
}
function stars(cantidadStars) {
  /*Función que toma como entrada un número cantidadStars y devuelve 
  el html correspondiente a cinco estrellas con cantidadStars rellenas
  y el resto vacías */
  const maxStars = 5;
  const filledStars = Math.round(cantidadStars);
  const emptyStars = maxStars - filledStars;
  const starHTML = '<span class="fa fa-star checked"></span>';
  const emptyStarHTML = '<span class="fa fa-star"></span>';
  const starsHTML =
    starHTML.repeat(filledStars) + emptyStarHTML.repeat(emptyStars);
  return starsHTML;
}

function cutString(string) {
  if (string.length > 20){
    string = string.substring(0, 20)+'...';
  }
  return string
}

function getCurrentDateTime() {
  const fecha = new Date ();
  return fecha.toLocaleString();
}