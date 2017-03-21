
function loadData(data, cfunc){

 var string = "empty" , 
     link   = "http://bora.la/j/p.json?",
     data   = link + 'd=' + encodeURIComponent(data);
    
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

function loadCategories_new(pesquisa) {
    var cat, catList, clone,
            spanElement = document.getElementById("catlist"),
            s = document.createElement("span");

    for (cat in pesquisa) {
        clone = s.cloneNode(true);

        clone.className = "cat";
        clone.setAttribute("data-id", pesquisa[cat]);
        clone.onclick = function () {
            loadSubCategories(this);
        };
        clone.appendChild(document.createTextNode(catList[cat][2]));

        spanElement.appendChild(clone);
    }
}

function loadCategories(xhttp) {

    var cat, clone,
            sElem = document.getElementById("catlist"),
            s = document.createElement("span"),
            catList = [
                ["Automóveis", "\uF239"],
                ["Cenas 1",    "\uF23E"],
                ["Cenas 2",    "\uF40D"],
                ["Cenas 3",    "\uF4F5"],
                ["Cenas 4",    "\uF570"],
                ["Cenas 5",    "\uF54A"],
                ["Cenas 6",    "\uF580"],
                ["Cenas 7",    "\u21B8"],
                ["Cenas 8",    "\u21EA"]], 
	    catList_new = JSON.parse(xhttp.responseText);

    for (cat in catList_new) {
	
	clone = s.cloneNode(true);
	clone.className = "cat";
        clone.setAttribute("data-id", catList_new[cat].value[0]);
        clone.onclick = function () {
            loadSubCategories(this);
        };

        clone.appendChild(document.createTextNode(catList_new[cat].value[1]));
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
    //var a = document.createElement("span"),
    //  sList = document.getElementById("sublist");
}




loadData('{"i":1 , "e":1}', loadCategories);
//loadData('{"i":4 , "e":2}', loadHighlights)
//loadCategories();
//loadHighlights();


