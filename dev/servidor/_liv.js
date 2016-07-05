module.exports = {
        iniciar: function () {
        this.objPersonalizados();
    },
    
      objPersonalizados: function () {
        /**
         * Substitui todas as ocorrências 
         * @param {string} procura Texto a procurar
         * @param {string} substitui Texto a substituir
         * @returns {string} Texto final transformado
         */
        String.prototype.substituiTudo = function (procura, substitui) {
            var target = this;
            return target.replace(new RegExp(procura.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), substitui);
        };
    },
        
        loadCats: function (json) {
         var xhttp = new XMLHttpRequest();
        
         xhttp.onreadystatechange = function() {
           if (xhttp.readyState == 4 && xhttp.status == 200) {
                          return xhttp.responseText;
           
             }
         };
         
         xhttp.open("GET", json, true);
         xhttp.send();
       }
};