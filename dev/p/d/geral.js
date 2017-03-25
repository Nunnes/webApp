
function loadData(data, cfunc) {

    var string = "empty",
            link = "http://bora.la/j/p.json?",
            data = link + 'd=' + encodeURIComponent(data);

    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            cfunc(xmlhttp);
        }
    }

    // xmlhttp.open("POST",data, true);
    //xmlhttp.send("dados=teste");

    xmlhttp.open("GET", data, true);
    xmlhttp.send();
}


function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function loadCategories(xhttp) {

    var cat, clone,
            sElem = document.getElementById("catlist"),
            s = document.createElement("span"),
            catList = JSON.parse(xhttp.responseText);

    for (cat in catList) {

        clone = s.cloneNode(true);
        clone.className = "cat";
        clone.setAttribute("data-id", catList[cat].value[0]);
        clone.appendChild(document.createTextNode(catList[cat].value[1]));
        sElem.appendChild(clone);
        
        clone.onclick = function () {
            var obj = new Object();
            obj.i = 4;
            obj.e = this.getAttribute("data-id");
            var jsonString = JSON.stringify(obj);

            loadData(jsonString, loadSubCategories);
        };

    }
}


function loadHighlights(op) {

    var highItem, clone,
            a = document.createElement("article"),
            d = document.createElement("div"),
            h = document.createElement("h3"),
            articleElement = document.getElementById("articlelist"),
            highList = [
                ["girl_Desc", "girl", "$$$"],
                ["boy_Desc", "boy", "$$"],
                ["man_Desc", "man", "$$$$"],
                ["women_Desc", "women", "$$$$$"]]
//            highList_new = JSON.parse(xhttp.responseText);


    a.appendChild(d.cloneNode());
    d.appendChild(h.cloneNode());
    d.appendChild(h);
    a.appendChild(d);


//    pedeCats(createCats);

    for (highItem in highList) {
        clone = a.cloneNode(true);
        clone.getElementsByTagName("div")[0].style.background = "transparent url(../i/" + highList[highItem][1] + ".jpg) no-repeat center";
        clone.getElementsByTagName("div")[0].style.backgroundSize = "cover";
        clone.getElementsByTagName("div")[1].getElementsByTagName("h3")[0].innerHTML = "Nome Produto";
        clone.getElementsByTagName("div")[1].getElementsByTagName("h3")[1].innerHTML = "<b>Preço</b> $$$";

        insertAfter(clone, articleElement);

    }
}

function clearElembyId(id){
    var sElem = document.getElementById(id);
    
    while (sElem.firstChild) {
        sElem.removeChild(sElem.firstChild);
    }
}
function loadSubCategories(xhttp) {
    var sElemName = "sublist",
        subCat, clone,
            sElem = document.getElementById(sElemName),
            s = document.createElement("span");
            subCatListObj = JSON.parse(xhttp.response)[0],
            subCatList = subCatListObj.value;         

    clearElembyId(sElemName);

    if(sElem.getAttribute("key") === subCatListObj.key){
        sElem.removeAttribute("key"); 
        return; 
    }
   
     sElem.setAttribute("key", subCatListObj.key); 
    
    for (subCat in subCatList) {
        clone = s.cloneNode(true);
        clone.className = "subcat";
        clone.setAttribute("data-id", subCatList[subCat][0]);
        
        clone.appendChild(document.createTextNode(subCatList[subCat][1]));
        sElem.appendChild(clone);

        clone.onclick = function () {
            var obj = new Object();
            obj.i = 4;
            obj.e = this.getAttribute("data-id");
            var jsonString = JSON.stringify(obj);


        };

    }
}

loadData('{"i":1 , "e":1}', loadCategories);
loadHighlights();


