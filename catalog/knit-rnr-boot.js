fetch("knit-rnr-boot-data.json")
    .then(response => response.json())
    .then(data => {

        /* EVENT LISTENER PARA FILTRAGEM */
        sulfur = document.querySelector("#sulfur")


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
            
            if (["sulfur"].includes(colorway)) {
                /* Condição para os que tem GIF */
                gif.removeAttribute("src")
                gif.setAttribute("src", `../gifs/yeezt-knit-rnr-boot-${colorway}.gif`)
            } else if([""].includes(colorway)) {
                /* Condição para os que não tem GIF */
            } else {
                /* Para quando a colorway recebida for "none" (no caso de reset de filtro) */
                gif.removeAttribute("src")
                gif.setAttribute("src", `../gifs/yeezt-knit-rnr-boot-sulfur.gif`)
            }
        }


        function selectInList(selectedColorway) {
            let listLength = document.getElementsByTagName("li").length; /* listLength é o número de elementos 'li' da 'ul .colorways'. Como é usado nas duas condições 'if', fica fora; */
            function removeSelecetedClass() {
                for(let i = 0; i < listLength; i++){
                    document.querySelectorAll(".colorways li a")[i].classList.remove("selected-item");
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

            postsInjector()

            function postsInjector(){
                for(let i = 0; i < postAmount; i++){
                    let z = shuffledArrayOfNumbers[i]
    
                    postSection = document.querySelector("#container #posts")
    
                    postFrame = document.createElement("div")
                    postFrame.setAttribute("class", "catalog-post-frame")
                    let idNumber = i + 1
                    postFrame.setAttribute("id", `img${idNumber.toString().padStart(5, '0')}`);
                    /* Define e classe e o id da div frame como: <div class="catalog-post-frame" id="img0001"></div> */

                    postInformation = document.createElement("div")
                    postInformation.setAttribute("class", "catalog-post-information");
                    
                    instagramUsername = posts[z]["username"]
                    instagramLink = `https://www.instagram.com/${instagramUsername}/`
                    /* Gera o link para a conta do usuário do post */
                    postUsername = document.createElement("p")
                    aElement = document.createElement("a")
                    aElement.setAttribute("href", instagramLink)
                    aElement.setAttribute("target", "_blank")
                    aElement.innerHTML = `@${instagramUsername.toUpperCase()}`;
                    postUsername.appendChild(aElement);
                    /* Gera o elemento <p><a></a>@USUÁRIO</p> clicável que abre o link para a conta do usuário do post */  

                    shoeModel = posts[z]["model"].replace(/-/g, " ").replace("yeezy", "").replace(" ", "");
                    shoeColorway = posts[z]["colorway"].replace(/-/g, " ");
                    postModel = document.createElement("p");
                    postModel.innerHTML = ` ${shoeColorway.toUpperCase()} / ${shoeModel.toUpperCase()}`;
                    /* Gera o elemento <p> com a COLORWAY / MODELO dentro */
                    
                    postInformation.appendChild(postUsername)
                    postInformation.appendChild(postModel)
                    postFrame.appendChild(postInformation)
                     
    
                    imgDivElement = document.createElement("div")
                    imgDivElement.setAttribute("class", "catalog-img");
                    imageElement = document.createElement("img");
                    imageSource = posts[z]["imageurl"]
                    imageElement.setAttribute("src", imageSource)
                    /* Cria um elemento <img> e coloca a informação do objeto .JSON como src="link" da <img> */

                    imgDivElement.appendChild(imageElement);
                    /* Acrescenta <img> dentro da <div class="catalog-img"> criada */
                    
                    postFrame.appendChild(imgDivElement)
    
                    postSection.appendChild(postFrame);
                    /* Adiciona o elemento final gerado na section para os posts da página */
                }
            };
        }/* <FUNÇÃO CARREGADORA DOS POSTS */

        postsLoader(data) /* Inicialmente a pagina carrega com a função postsLoader recebendo a array "data" que contém todos os posts */

    })


listHeight = document.querySelector('.colorways').offsetHeight;
wrapHeight = document.querySelector('#nav-list-wrap').offsetHeight
if (wrapHeight > listHeight || screen.width <= 1100) {
    document.querySelector('#gradient').style.display = 'none';
} else {
    navListHeight = document.querySelector('#nav-list-wrap').offsetHeight;
    document.querySelector('#gradient').style.height = navListHeight + 'px';
}
