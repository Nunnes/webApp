
function loadData(data, cfunc) {
    var link = 'http://'+'baapp.duckdns.org' + '/j/p.json?',
        reqdata = link + 'd=' + encodeURIComponent(data),
        xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            cfunc(xmlhttp);
        }
    };

    // xmlhttp.open("POST",data, true);
    //xmlhttp.send("dados=teste");

    xmlhttp.open("GET", reqdata, true);
    xmlhttp.send();
}

function clearElembyId(id) {
    var sElem = document.getElementById(id);

    while (sElem.firstChild) {
        sElem.removeChild(sElem.firstChild);
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function loadSubCategories(xhttp) {
    var sElemName = "sublist",
        subCat,
        clone,
        sElem = document.getElementById(sElemName),
        s = document.createElement("span"),
        subCatListObj = JSON.parse(xhttp.response)[0],
        subCatList = subCatListObj.value,
        i;

    clearElembyId(sElemName);

    if (sElem.getAttribute("key") === subCatListObj.key) {
        sElem.removeAttribute("key");
        return;
    }

    sElem.setAttribute("key", subCatListObj.key);

console.log(subCatListObj);
console.log(subCatList.length);

    for (i = 0; i < subCatList.length; i += 1) {
        subCat = subCatList[i];
        clone = s.cloneNode(true);
        clone.className = "subcat";
        clone.setAttribute("data-id", subCat[0]);

        clone.appendChild(document.createTextNode(subCat[1]));
        sElem.appendChild(clone);
    }
}

function loadCategories(xhttp) {
    var cat,
        clone,
        sElem = document.getElementById("catlist"),
        s = document.createElement("span"),
        catList = JSON.parse(xhttp.responseText),
        i;

        console.log(catList);
        console.log(catList.length);
    for (i = 0; i < catList.length; i++) {
        cat = catList[i];

        console.log(cat);

        clone = s.cloneNode(true);
        clone.className = "cat";
        clone.setAttribute("data-id", cat.value[0]);
        clone.appendChild(document.createTextNode(cat.value[1]));
        sElem.appendChild(clone);

        clone.onclick = function () {
            var obj = {};
            obj.i = 4;
            obj.e = this.getAttribute("data-id");

            loadData(JSON.stringify(obj), loadSubCategories);
        };

    }
}

function loadHighlights(op) {

    var highItem,
        clone,
        a = document.createElement("article"),
        d = document.createElement("div"),
        h = document.createElement("h3"),
        articleElement = document.getElementById("articlelist"),
        highList = [
            ["girl_Desc", "girl", "$$$"], ["boy_Desc", "boy", "$$"], ["man_Desc", "man", "$$$$"], ["women_Desc", "women", "$$$$$"]],
        i;
    //            highList_new = JSON.parse(xhttp.responseText);


    a.appendChild(d.cloneNode());
    d.appendChild(h.cloneNode());
    d.appendChild(h);
    a.appendChild(d);

    //    pedeCats(createCats);

    for (i = 0; i < highList.length; i++) {

        highItem = highList[i];

        clone = a.cloneNode(true);
        clone.getElementsByTagName("div")[0].style.background = "transparent url(../i/" + highItem[1] + ".jpg) no-repeat center";
        clone.getElementsByTagName("div")[0].style.backgroundSize = "cover";
        clone.getElementsByTagName("div")[1].getElementsByTagName("h3")[0].innerHTML = "Nome Produto";
        clone.getElementsByTagName("div")[1].getElementsByTagName("h3")[1].innerHTML = "<b>Preço</b> $$$";

        //insertAfter(clone, articleElement);

        articleElement.appendChild(clone);

    }
}





loadData('{"i":1 , "e":1}', loadCategories);
//loadHighlights();
