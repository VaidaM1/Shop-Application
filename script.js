// sessionStorage.setItem("data", 
//  JSON.stringify( [
//         {   id: 1,
//             name: 1,
//             description: 'description'
//         },
//         {   id: 2,
//             name: 2,
//             description: 'description'
//         },
//         {   id: 3,
//             name: 3,
//             description: 'description'
//         }
//     ])
// );
// console.log(JSON.parse(sessionStorage. getItem('data')));

let id = 0;
updateHtmlTable();
function updateHtmlTable() {
    let generatedHtml = "";
    let shops = JSON.parse(sessionStorage.getItem('data'));
    if(shops === null){
        sessionStorage.setItem("data", JSON.stringify( [] ));
        sessionStorage.setItem("id", "0");
        return;
    }
    for (let i = 0; i < shops.length; i++) {
        const shop = shops[i];
        let tableRow = `<tr id="product-list">
                            <td>${shop.category}</td>
                            <td>${shop.product}</td>
                            <td>${shop.quantity}</td>`+
                           `<td>
                           <div class="done btn btn-outline-success" id="done-${shop.id}">Done</div>
                           <div class="edit btn btn-outline-warning" id="edit-${shop.id}">Edit</div>
                           <div class="delete btn btn-outline-danger" id="${shop.id}">Delete</div>
                           </td>
                        </tr>`               

        generatedHtml = generatedHtml + tableRow;
    }

    let bodyElement = document.getElementById("product-table");

    bodyElement.innerHTML = generatedHtml;
    activateDeleteBtns();
    activateEditBtns();
    activateDoneBtns();
}

function addNewProduct() {
    if(!inputValidation()){
        return;
    }
    let shops = JSON.parse(sessionStorage. getItem('data'));
    let category = document.getElementById("category").value;
    let product = document.getElementById("product").value;
    let quantity = document.getElementById("quantity").value;
    var shop = {
        id: parseInt(sessionStorage.getItem("id")) + 1,
        category: category,
        product: product,
        quantity: quantity
    }
    
    shops.push(shop);
    sessionStorage.setItem("id", shop.id);
    sessionStorage.setItem("data", JSON.stringify(shops));
    clearForm();
    updateHtmlTable();
    
    document.getElementById('category').focus();
}

function clearForm() {
    document.getElementById("category").value = "";
    document.getElementById("product").value = "";
    document.getElementById("quantity").value = "";
}

function inputValidation() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("error").classList.remove('success');
    document.getElementById("error").classList.remove('error');

    if( !isValid("category") &&
    !isValid("product") &&
    !isValid("quantity")){
        document.getElementById("error").innerHTML += "<h2>Form is empty</h2>";
        document.getElementById("error").classList.add('error');
        return false;
    }

    if( isValid("category") &&
    !isValid("product") &&
    isValid("quantity")){
        document.getElementById("error").innerHTML += "<h2>Please insert product name</h2>";
        document.getElementById("error").classList.add('error');
        return false;
    }
    document.getElementById("error").classList.add('success');
    document.getElementById("error").innerHTML += "<h2>Product added</h2>";
       
    return true;
}

function isValid(id) {
    
    if(document.getElementById(id).value == ""){
        return false;
    }
    return true;
}

function editEntry(id){
    let shops = JSON.parse(sessionStorage. getItem('data'));
    for (let i = 0; i < shops.length; i++) { 
        if( `edit-${shops[i].id}` == id){
            activateEditMode(shops[i]);
        } 
    }
}

function activateEditMode(shop){
    document.getElementById("category").value = shop.category;
    document.getElementById("product").value = shop.product;
    document.getElementById("quantity").value = shop.quantity;    
    document.getElementById("id").value = shop.id;

    document.getElementById("edit-btn").style = "";
    document.getElementById("submit-btn").style = "display:none";
}

function editProduct(){
    if(!inputValidation2()){
        return;
    }
    
    let shops = JSON.parse(sessionStorage. getItem('data'));
    let shop = {
        "id": "",
        "category": "",
        "product": "",
        "quantity": ""
    };

    shop.id = document.getElementById("shop-id").value;
    shop.category = document.getElementById("category").value;
    shop.product = document.getElementById("product").value;
    shop.quantity = document.getElementById("quantity").value;

    for (let i = 0; i < shops.length; i++) {
                if (shops[i].id == shop.id) {
                    shops[i] = shop;
                    break;
            }
        }
    sessionStorage.setItem("data", JSON.stringify(shops));

    updateHtmlTable();

    clearForm();
    document.getElementById("edit-btn").style = "display:none";
    document.getElementById("submit-btn").style = "";
}

function deleteEntry(id) {
    let shops = JSON.parse(sessionStorage. getItem('data'));
    for (let i = 0; i < shops.length; i++) { 
       if( shops[i].id == id){
           shops.splice(i,1);
           break;
       }
   }
   sessionStorage.setItem("data", JSON.stringify(shops));
   updateHtmlTable();
}

function activateDoneBtns() {
    let shops = JSONzparse(sessionStorage. getItem('data'));
    for (let i = 0; i < shops.length; i++) { 
       if( shops[i].id == id){
        document.getElementById("product-list").style = "text-decoration-line: line-through"
       }
   }
   sessionStorage.setItem("data", JSON.stringify(shops));
   updateHtmlTable();
}


function activateDeleteBtns() {
    let deleteBtns = document.getElementsByClassName('delete');

    for (let i = 0; i < deleteBtns.length; i++) {
        let btn = deleteBtns[i];
        btn.addEventListener('click',function(){
            deleteEntry(btn.id);
        });
    }
}

function activateEditBtns() {
    let editBtns = document.getElementsByClassName('edit');
    
    for (let i = 0; i < editBtns.length; i++) {
        let btn = editBtns[i];
        btn.addEventListener('click',function(){
            editEntry(btn.id);
        });
    }
}

function activateDoneBtns() {
    let doneBtns = document.getElementsByClassName('done');
    
    for (let i = 0; i < doneBtns.length; i++) {
        let btn = doneBtns[i];
        btn.addEventListener('click',function(){
            doneEntry(btn.id);
        });
    }
}