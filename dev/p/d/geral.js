
var $ = {
    /**
    *@type document
    */
    d:function(){ 
        return document;},
    ce: function(e) {
        return this.d.createElement(e);
    },
    gei: function(ref, e) {
        ref = typeof ref === "object" ? ref : this.d;
        return ref.getElementById(e);
    },
    gen: function(ref, e) {
        ref = typeof ref === "object" ? ref : this.d;
        ref.getElementsByTagName(e);
    }
};

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function loadCategories_new(pesquisa) {
    var cat, catList, clone,
        spanElement= document.getElementById("catlist"),
        s = document.createElement("span");

    for (cat in pesquisa) {
        clone = s.cloneNode(true);

        clone.className = "cat";
        clone.setAttribute("data-id", pesquisa[cat]);
        clone.onclick = function() {
            loadSubCategories(this);
        };
        clone.appendChild(document.createTextNode(catList[cat][2]));

        spanElement.appendChild(clone);

    }
}

function loadCategories() {
            
        var cat, clone,
            sElem = document.getElementById("catlist"), 
            s = document.createElement("span"), 
            catList = [
            ["Automóveis", "\uF239"], 
            ["Cenas 1", "\uF23E"],
            ["Cenas 2", "\uF40D"],
            ["Cenas 3", "\uF4F5"], 
            ["Cenas 4", "\uF570"],
            ["Cenas 5", "\uF54A"],
            ["Cenas 6", "\uF580"],
            ["Cenas 7", "\u21B8"],
            ["Cenas 8", "\u21EA"]];

           

//          var url = "http://localhost:5984/categorias/_design/geral/_view/categorias"
            var data = "http://bora.la:80/j/p.json/?{i=2}"; 
            console.log(data);

		xmlhttp = new XMLHttpRequest();
   		xmlhttp.open("POST",data, true);
   		xmlhttp.onreadystatechange=function(){
		 if (xmlhttp.readyState==4 && xmlhttp.status==200){
		   string=xmlhttp.responseText;
			console.log(string);
		 }
	   	}
	 	  xmlhttp.send();
            

             
            for (cat in catList) {
                clone = s.cloneNode(true);

                clone.className = "cat";
                clone.setAttribute("data-id",catList[cat][0]);
                clone.onclick = function(){ 
                        loadSubCategories(this);
                };
                
                clone.appendChild(document.createTextNode(catList[cat][1]));
           
                sElem.appendChild(clone);                
            }
        }
        
        
function loadHighlights(){
      
      var   highItem, clone,
            a=document.createElement("article"),
            d=document.createElement("div"),
            h=document.createElement("h3"),
            articleElement = document.getElementById("articlelist"),
            highList = [
                ["girl_Desc", "girl", "$$$"],
                ["boy_Desc", "boy", "$$"],
                ["man_Desc", "man", "$$$$"],
                ["women_Desc", "women", "$$$$$"]];

             a.appendChild(d.cloneNode());
             d.appendChild(h.cloneNode());
             d.appendChild(h);
             a.appendChild(d);
             
             for (highItem in highList) {
                clone=a.cloneNode(true);
                clone.getElementsByTagName("div")[0].style.background =  "transparent url(../i/"+ highList[highItem][1] + ".jpg) no-repeat center" ;
                clone.getElementsByTagName("div")[0].style.backgroundSize = "cover";
                clone.getElementsByTagName("div")[1].getElementsByTagName("h3")[0].innerHTML = "Nome Produto";
                clone.getElementsByTagName("div")[1].getElementsByTagName("h3")[1].innerHTML = "<b>Preço</b> $$$";

                insertAfter(clone,articleElement );
                 
             }
    
}

function loadSubCategories(op){
    console.log(op);
    //var a = document.createElement("span"),
      //  sList = document.getElementById("sublist");
    
}        
        
        loadCategories();
        loadHighlights();
