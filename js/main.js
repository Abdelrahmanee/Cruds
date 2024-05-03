var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDesc = document.getElementById("productDesc")

// 
// global index i made it to allow access at html file
var index;
// innerHtml
var bodyHTML = document.getElementById("tBody");
// btns
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var resetBtn = document.getElementById("resetBtn")


// if (productName.value != "" ||
//     productPrice.value != "" ||
//     productCategory.value != "" ||
//     productDesc.value != "") {
//     resetBtn.removeAttribute("disabled")
//     productName.addEventListener("keyup", function () {

//     })
//     resetBtn.addEventListener("click", function () {
//         clearForm();
//         console.log("hallo");
//     })
// }
productName.addEventListener("keyup",function(){
    if(valiadteProductName()){
        console.log("hello");
        productName.classList.remove("is-invalid")
        productName.classList.add("is-valid")
    }
    else{
        productName.classList.remove("is-valid")
        productName.classList.add("is-invalid")
    }
})

function resetForm(inputValue) {
    if (inputValue.length >= 1) {
        resetBtn.removeAttribute("disabled")
    }
    else if (inputValue.length < 1) {
        resetBtn.setAttribute("disabled", "")
    }
}
productName.addEventListener("keyup", function () {
    resetForm(productName.value);
})

productPrice.addEventListener("keyup", function () {
    resetForm(this.value);
})

productCategory.addEventListener("keyup", function () {
    resetForm(this.value);
})

productDesc.addEventListener("keyup", function () {
    resetForm(this.value);
})
// Array   
var allProducts = [];

if (localStorage.getItem("allProducts") != null) {
    allProducts = JSON.parse(localStorage.getItem("allProducts"))
    display(allProducts)
}


function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
    resetForm("")
    productName.classList.remove("is-valid")
}

function addProduct() {
    if (valiadteProductName()) {
        
        if (valiadteProductPrice()) {
            
            if (valiadteProductCategory()) {
                
                if (valiadteProductDesc()) {
                    
                    var product = {

                        Name: productName.value,

                        Price: productPrice.value,

                        Category: productCategory.value,

                        Desc: productDesc.value,
                    }


                    allProducts.push(product)
                    display(allProducts)
                    localStorage.setItem("allProducts", JSON.stringify(allProducts))
                    // // clear form
                    clearForm()
                }
                else {
                    alert("Description sah")
                }
            }
            else {
                alert("Category sah")
            }
        }
        else {
            alert("Price sah")
        }
    }
    else {
        alert("da7l Name yasta")
    }

}

// vallidation


function valiadteProductName() {
    var regex = /^[A-Z][a-z]{1,8}$/;
    return regex.test(productName.value)
}


function valiadteProductPrice() {
    var regex = /^[0-9]{2,5}$/
    productPrice.classList.add("is-valid")
    return regex.test(productPrice.value)
}
function valiadteProductCategory() {
    productCategory.classList.add("is-valid")
    var regex = /^[A-Z][a-z]{1,8}$/;
    return regex.test(productCategory.value)
}
function valiadteProductDesc() {
    productDesc.classList.add("is-valid")
    var regex = /(good|bad|great|boor|amazing|normal)/;
    return regex.test(productDesc.value)
}

function display(arr) {

    var cartoona = ``;

    for (var i = 0; i < arr.length; i++) {
        cartoona += `
        <tr>
            <td>${i}</td>
            <td>${arr[i].Name}</td>
            <td>${arr[i].Price}</td>
            <td>${arr[i].Category}</td>
            <td>${arr[i].Desc}</td>
            <td><button onclick="Delete(${i})" class="btn btn-sm btn-outline-danger">delete</button></td>
            <td><button onclick="setFormToUpdate(${i})" class="btn btn-sm btn-outline-warning">update</button></td>

        </tr>
        
        `
    }
    bodyHTML.innerHTML = cartoona
}


function Delete(i) {

    allProducts.splice(i, 1)
    localStorage.setItem("allProducts", JSON.stringify(allProducts))
    display(allProducts)

}

function search(term) {
    var matchedList = [];
    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].Name.toLowerCase().includes(term.toLowerCase()) === true) {
            matchedList.push(allProducts[i])

        }
    }
    display(matchedList);
    //console.log(matchedList);
}




function setFormToUpdate(i) {
    index = i;
    addBtn.classList.replace("d-block", "d-none")
    updateBtn.classList.replace("d-none", "d-block")
    productName.value = allProducts[i].Name
    productPrice.value = allProducts[i].Price
    productCategory.value = allProducts[i].Category
    productDesc.value = allProducts[i].Desc
}


function updateProduct(i) {
    allProducts[index].Name = productName.value
    allProducts[index].Price = productPrice.value
    allProducts[index].Category = productCategory.value
    allProducts[index].Desc = productDesc.value

    localStorage.setItem("allProducts", JSON.stringify(allProducts))
    display(allProducts)
    clearForm()
    updateBtn.classList.replace("d-block", "d-none")
    addBtn.classList.replace("d-none", "d-block")

}
