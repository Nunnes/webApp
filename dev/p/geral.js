
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
        return ref.getElementById(e)
    },

    gen: function(ref, e) {
        ref = typeof ref === "object" ? ref : this.d;
        ref.getElementsByTagName(e)
    }

};


function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function loadCategories_new(pesquisa) {

    var spanElement, cat, spanItem, catList, catListfa;

    spanElement = document.getElementById("catlist");

    var s = document.createElement("span"), clone;


    //pesquisa
    for (cat in pesquisa) {
        clone = s.cloneNode(true);

        clone.className = "cat";
        clone.setAttribute("data-id", pesquisa[cat]);
        clone.onclick = function() {
            loadSubCategories(this);
        }
        clone.appendChild(document.createTextNode(catList[cat][2]));

        spanElement.appendChild(clone);

    }

}



function loadCategories() {
            
            var spanElement, cat, spanItem, catList, catListfa; 
            
            catList = [
                ["Automóveis", "", "\uF239"], 
                ["Cenas 1", "red", "\uF23E"],
                ["Cenas 2", "blue", "\uF40D"],
                ["Cenas 3", "yellow", "\uF4F5"], 
                ["Cenas 4", "pink", "\uF570"],
                ["Cenas 5", "orange", "\uF54A"],
                ["Cenas 6", "purple", "\uF580"],
                ["Cenas 7", "gray", "\u21B8"],
                ["Cenas 8", "orange", "\u21EA"] ];

             catListfa = [
                ["Automóveis", "id"], 
                ["  1", "red", "x", "y"],
                ["Cenas 2", "blue", "x", "y"],
                ["Cenas 3", "yellow", "x", "y"], 
                ["Cenas 4", "pink", "x", "y"],
                ["Cenas 5", "orange", "x", "y"],
                ["Cenas 6", "purple", "x", "y"],
                ["Cenas 7", "gray", "x", "y"],
                ["Cenas 8", "orange", "x", "y"] ];

 /* <span class="cat fa fa-blind fa-3x" aria-hidden="true" style="width: 50px; height: 50px; background-color: red"></span>
    <span class="cat fa fa-home fa-3x" aria-hidden="true" style="width: 50px; height: 50px; background-color: blue"></span>
    <span class="cat fa fa-car fa-2x" aria-hidden="true" style="width: 50px; height: 50px; background-color: gray"></span>*/

            spanElement = document.getElementById("catlist");
            
            var s = document.createElement("span"), clone;

            for (cat in catList) {
                clone = s.cloneNode(true);
                
                //clone.style.background = catList[cat][1];
                clone.className = "cat";
                clone.setAttribute("data-id",catList[cat][0]);
                clone.onclick = function(){ 
                    loadSubCategories(this);
                }
                clone.appendChild(document.createTextNode(catList[cat][2]));
           
                spanElement.appendChild(clone);
                
            }
        }
        
        
function loadHighlights(){
      
      var highList = [
                ["girl_Desc", "girl", "$$$"],
                ["boy_Desc", "boy", "$$"],
                ["man_Desc", "man", "$$$$"],
                ["women_Desc", "women", "$$$$$"]]; 

            var a=document.createElement("article"),
                d=document.createElement("div"),
                h=document.createElement("h3"),
                highItem, clone,
                articleElement = document.getElementById("articlelist");
             
             a.appendChild(d.cloneNode());
             d.appendChild(h.cloneNode());
             d.appendChild(h);
             a.appendChild(d);
             
             for (highItem in highList) {
                clone=a.cloneNode(true);
                clone.getElementsByTagName("div")[0].style.background =  "transparent url(i/"+ highList[highItem][1] + ".jpg) no-repeat center" ;
                clone.getElementsByTagName("div")[0].style.backgroundSize = "cover";
                clone.getElementsByTagName("div")[1].getElementsByTagName("h3")[0].innerHTML = "Nome Produto";
                clone.getElementsByTagName("div")[1].getElementsByTagName("h3")[1].innerHTML = "<b>Preço</b> $$$";

                insertAfter(clone,articleElement );
                 
             }
    
    
}

function loadSubCategories(op){
    console.log(op);
    var a = document.createElement("span"),
        sList = document.getElementById("sublist");

    
    
}        
        
        loadCategories();
        loadHighlights();