fetch("foam-runner-data.json")
    .then(response => response.json())
    .then(data => {

        /* EVENT LISTENER PARA FILTRAGEM */
        ararat = document.querySelector("#ararat")
        sand = document.querySelector("#sand")
        mxMoonGray = document.querySelector("#mx-moon-gray")
        mineralBlue = document.querySelector("#mineral-blue")
        mxCreamClay = document.querySelector("#mx-cream-clay")
        ochre = document.querySelector("#ochre")
        vermilion = document.querySelector("#vermilion")
        mxSandGrey = document.querySelector("#mx-sand-grey")
        onyx = document.querySelector("#onyx")
        mist = document.querySelector("#mist")
        stoneSage = document.querySelector("#stone-sage")


        document.querySelectorAll('.colorways li a').forEach(item => {
            item.addEventListener('click', event => {
                colorway = item.id
                /* Colorway é uma string que contém o id do item clicado */ /* console.log(colorway) */
                startFiltering(colorway)
            })
        })


        function startFiltering(colorway){
            selectedStatus = document.querySelector(`#${colorway}`).className
            if (selectedStatus == "selected-item"){ /*Se já selecionado...*/
                let reset = "reset";
                let colorway = "none";
                selectInList(reset);
                reloadWithFilter(data, colorway)
            } else{ /*Se ainda não selecionado...*/
                selectInList(colorway);
                filterClick(colorway);
            }    
        } /* A função startFiltering é um passo antes de iniciar o processo de filtragem pois ela confere se a o elemento da lista de filtros já está selecionado. Se este já está selecionado, selecionar novamente irá "limpar a seleção" */


        function filterClick(selectedColorway){
            let filteredObject = data.filter(function(obj){return obj.colorway === selectedColorway;})
            /* "selectedColorway" contém o nome da colorway em forma de string e "filteredObject" é um objeto filtrado */

            if(filteredObject.length !== 0){
                document.querySelector("#container").style.display = "inherit";
                document.querySelector("#no-outfits").style.display = "none";
                reloadWithFilter(filteredObject, selectedColorway); /* Manda o objeto filtrado como argumento */
            } else {
                document.querySelector("#container").style.display = "none";
                document.querySelector("#no-outfits").style.display = "inherit";
                let none = "none";
                reloadWithFilter(none, selectedColorway)
            } /* Se não existirem posts para a colorway filtrada, <div id="no-outfits"> é mostrado e <div id="container"> ocultado */
        } /* Filtra os posts */


        function reloadWithFilter(array, colorway){
            if(array !== "none") {
                const parent = document.querySelector("#posts")
                while (parent.firstChild) {parent.firstChild.remove()}
                /* Limpa a lista de posts atual */
            
                postsLoader(array)
                /* Recarrega a lista de posts com a array filtrada */
            }
            
            let gif = document.querySelector("#bottom-gif img")
            
            if (["ararat", "sand", "mx-moon-gray", "mx-cream-clay", "ochre", "vermilion", "mx-sand-grey", "mist", "stone-sage", "mineral-blue"].includes(colorway)) {
                /* Condição para os que tem GIF */
                gif.removeAttribute("src")
                gif.setAttribute("src", `../gifs/yeezy-foam-runner-${colorway}.gif`)
            } else if(["onyx"].includes(colorway)) {
                /* Condição para os que não tem GIF */
            } else {
                /* Para quando a colorway recebida for "none" (no caso de reset de filtro) */
                gif.removeAttribute("src")
                gif.setAttribute("src", `../gifs/all-foam-runner.gif`)
            }
        }


        function selectInList(selectedColorway) {
            let listLength = document.getElementsByTagName("li").length; /* listLength é o número de elementos 'li' da 'ul .colorways'. Como é usado nas duas condições 'if', fica fora; */
            function removeSelecetedClass() {
                for(let i = 0; i < listLength; i++){
                    document.querySelectorAll("#list .colorways li a")[i].classList.remove("selected-item");
                }; /* O for loop remove a classe de todos os elementos 'a' da ul .colorways */ 
            }

            if (selectedColorway == "reset") {
                removeSelecetedClass()
            } else {
                removeSelecetedClass()
                document.querySelector(`#${selectedColorway}`).classList.add("selected-item");
            }
        } /* Coloca a classe limpa a classe .selected-item de todos os elementos da lista de seleção e coloca-a no elemento clicado */

        
        /* FUNÇÃO CARREGADORA DOS POSTS> */
        /* (recebe a array com as informações como argumento)  */
        function postsLoader(posts){
            const postAmount = posts.length /* Pega o número de posts que existem na array */

            /* GERADOR DE ORDEM ALEATÓRIA> */
            let orderedArray = []
            for(let i = 0; i < postAmount; i++){orderedArray.push(i)}
            /* Cria uma array ordenada de 0 até dataLenght-1 */

            function shuffle(arrayOfNumbers) {
                let max = arrayOfNumbers.length;
                let j = 0;
                let randomArray = []
                while (max--) /* max-- roda a função até que max seja 0 */ {
                    j = Math.floor(Math.random() * (max+1));
                    randomArray.push(arrayOfNumbers[j])
                    arrayOfNumbers.splice(j, 1) /* ...na posição j, remove 1 item */
                }
                return randomArray;
            }

            let shuffledArrayOfNumbers = shuffle(orderedArray) /* shuffledArray é a orderedArray com seus elementos em ordem aleatória */
            /* <GERADOR DE ORDEM ALEATÓRIA */


            for(let i = 0; i < postAmount; i++){
                let z = shuffledArrayOfNumbers[i]

                postSection = document.querySelector("#container #posts")

                aElement = document.createElement("a")
                instagramUsername = posts[z]["username"]
                instagramLink = `https://www.instagram.com/${instagramUsername}/`
                /* Gera o link para a conta do usuário do post */
                aElement.setAttribute("href", instagramLink)
                aElement.setAttribute("target", "_blank")
                /* Gera o elemento <a> clicável que abre o link para a conta do usuário do post */   

                divElement = document.createElement("div")
                divElement.setAttribute("class", "catalog-img");
                let idNumber = i + 1 /* <-------- */
                divElement.setAttribute("id", `img${idNumber.toString().padStart(4, '0')}`);
                /* Gera a div para o post com classe e id definidos "<div class="catalog-img" id="img0001"></div>" */

                imageElement = document.createElement("img");
                imageSource = posts[z]["imageurl"]
                imageElement.setAttribute("src", imageSource)
                /* Cria um elemento <img> e coloca a informação do objeto .JSON como src="link" da <img> */

                divElement.appendChild(imageElement);
                /* Acrescenta <img> dentro da <div> criada antes */
                aElement.appendChild(divElement);
                /* Acrescenta <div><img></div> dentro de <a> criado antes */

                postSection.appendChild(aElement);
                /* Adiciona o elemento final gerado na section para os posts da página */
            }
        }/* <FUNÇÃO CARREGADORA DOS POSTS */

        postsLoader(data) /* Inicialmente a pagina carrega com a função postsLoader recebendo a array "data" que contém todos os posts */
    })
    
