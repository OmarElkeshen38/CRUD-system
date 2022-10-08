var ProductNameInp = document.getElementById('ProductNameInp');
var ProductPriceInp = document.getElementById('ProductPriceInp');
var ProductCategoryInp = document.getElementById('ProductCategoryInp');
var ProductDecInp = document.getElementById('ProductDecInp');
var productContainer;

if (localStorage.getItem("products") == null) {
    productContainer = [];
}
else {
    productContainer=JSON.parse(localStorage.getItem("products"));
    displayProduct(productContainer);
}

function addProduct() {
    if (validationProductName() && validationProductPrice()) {
        var product = {
        name:ProductNameInp.value,
        price:ProductPriceInp.value,
        category:ProductCategoryInp.value,
        desc:ProductDecInp.value
    }
    productContainer.push(product);
    localStorage.setItem('products', JSON.stringify(productContainer));
    displayProduct(productContainer);
    clearForm();
    }
    else {
        document.getElementById('prgName').innerHTML = "Name patern not valide";
        document.getElementById('prgPrice').innerHTML = "Price patern not valide";
    }
}

function clearForm() {
    ProductNameInp.value = '';
    ProductPriceInp.value = '';
    ProductCategoryInp.value = '';
    ProductDecInp.value = '';
}

function displayProduct(newArray) {
    var cartona = ``;
    for (var i=0; i < newArray.length; i++) {
        cartona += `
        <tr>
            <td>${i}</td>
            <td>${newArray[i].name}</td>
            <td>${newArray[i].price}</td>
            <td>${newArray[i].category}</td>
            <td>${newArray[i].desc}</td>
            <td><button class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProducts(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('myTable').innerHTML = cartona;
}

function deleteProducts(index) {
    productContainer.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productContainer));
    displayProduct(productContainer);
}

function search(term) {
    var searchContainer = [];
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            searchContainer.push(productContainer[i]);
        }
    }
    displayProduct(searchContainer);
}

function validationProductName() {
    var regx = /^[A-Z][a-z]{1,10}$/;
    if (regx.test(ProductNameInp.value)) {
        return true;
    }
    else {
        return false;
    }
};

function validationProductPrice() {
    var regx = /^[1-9][0-9]{1,5}$/;
    if (regx.test(ProductPriceInp.value)) {
        return true;
    }
    else {
        return false;
    }
};