
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
        clone.onclick = function () {
            var obj = new Object();
            obj.i = 4;
            obj.e = catList[cat].value[0];
            var jsonString = JSON.stringify(obj);

            loadData(jsonString, loadSubCategories);
//            loadSubCategories(catList[cat].value[0]);
        };

        clone.appendChild(document.createTextNode(catList[cat].value[1]));
        sElem.appendChild(clone);
    }
}


function loadHighlights(xhttp) {

    var highItem, clone,
            a = document.createElement("article"),
            d = document.createElement("div"),
            h = document.createElement("h3"),
            articleElement = document.getElementById("articlelist"),
            highList = [
                ["girl_Desc", "girl", "$$$"],
                ["boy_Desc", "boy", "$$"],
                ["man_Desc", "man", "$$$$"],
                ["women_Desc", "women", "$$$$$"]],
            highList_new = JSON.parse(xhttp.responseText);


    a.appendChild(d.cloneNode());
    d.appendChild(h.cloneNode());
    d.appendChild(h);
    a.appendChild(d);


    pedeCats(createCats);

    for (highItem in highList) {
        clone = a.cloneNode(true);
        clone.getElementsByTagName("div")[0].style.background = "transparent url(../i/" + highList[highItem][1] + ".jpg) no-repeat center";
        clone.getElementsByTagName("div")[0].style.backgroundSize = "cover";
        clone.getElementsByTagName("div")[1].getElementsByTagName("h3")[0].innerHTML = "Nome Produto";
        clone.getElementsByTagName("div")[1].getElementsByTagName("h3")[1].innerHTML = "<b>Preço</b> $$$";

        insertAfter(clone, articleElement);

    }
}

function loadSubCategories(op) {
    console.log(op);



    var subCat, clone,
            sElem = document.getElementById("sublist"),
            s = document.createElement("span"),
            subCatList = JSON.parse(xhttp.responseText);




    //var a = document.createElement("span"),
    //  sList = document.getElementById("sublist");
}




loadData('{"i":1 , "e":1}', loadCategories);
//loadData('{"i":4 , "e":2}', loadHighlights)
//loadCategories();
//loadHighlights();


