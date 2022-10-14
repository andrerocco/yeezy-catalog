fetch("foam-runner-data.json")
    .then(response => response.json())
    .then(data => {
        class Feed {
            constructor(data) {
                this.data = data;
                this.selectedFilterString = undefined;
                this.shuffledPosts = this.shuffle(data);
                this.postAmount = data.length;
                this.gifElement = document.querySelector("#bottom-gif img")
                
                this.filterButtons = document.querySelectorAll('[data-filter]');
                this.colorwayIDs = [] // Lista das collorways em string
                document.querySelectorAll('[data-filter]').forEach((colorway) => {this.colorwayIDs.push(colorway.id)});
                
                this.postsInjector(this.shuffledPosts) // Inicialmente a pagina carrega com a função postsLoader recebendo a array "data" que contém todos os posts
            }

            // Injeta cada post da lista de posts passada como parâmetro
            postsInjector(posts) {
                if (posts.length == 0) { // Se a lista de posts estiver vazia
                    document.querySelector("#container").style.display = "none"; // Esconde o container de posts
                    document.querySelector("#no-outfits").style.display = "inherit"; // Mostra a mensagem de "nenhum post encontrado"
                } else { 
                    document.querySelector("#no-outfits").style.display = "none"; // Esconde a mensagem de "nenhum post encontrado"
                    document.querySelector("#container").style.display = "inherit"; // Mostra o container de posts
                }

                const postSection = document.querySelector("#container #posts") // Seleciona o container onde os posts serão injetados
                while (postSection.firstChild) {postSection.firstChild.remove()} // Limpa a lista de posts atual

                // Injeta cada post da lista de posts recebida
                for (let i = 0; i < posts.length; i++) {
                    var post = posts[i];

                    // Criação do frame do post
                    var postFrame = document.createElement("div")
                    postFrame.setAttribute("class", "catalog-post-frame")
                    var idNumber = i + 1
                    postFrame.setAttribute("id", `img${idNumber.toString().padStart(5, '0')}`);
                    /* Define e classe e o id da div frame como: <div class="catalog-post-frame" id="img0001"></div> */

                    // Criação dos elementos de descrição no post (instagram, modelo usado, etc)
                    var postInformation = document.createElement("div")
                    postInformation.setAttribute("class", "catalog-post-information");
                    
                    var instagramUsername = post["username"]
                    var instagramLink = `https://www.instagram.com/${instagramUsername}/`
                    /* Gera o link para a conta do usuário do post */
                    var postUsername = document.createElement("p")
                    var aElement = document.createElement("a")
                    aElement.setAttribute("href", instagramLink)
                    aElement.setAttribute("target", "_blank")
                    aElement.innerHTML = `@${instagramUsername.toUpperCase()}`;
                    postUsername.appendChild(aElement);
                    /* Gera o elemento <p><a></a>@USUÁRIO</p> clicável que abre o link para a conta do usuário do post */  

                    var shoeModel = post["model"].replace(/-/g, " ").replace("yeezy", "").replace(" ", "");
                    var shoeColorway = post["colorway"].replace(/-/g, " ");
                    var postModel = document.createElement("p");
                    postModel.innerHTML = ` ${shoeColorway.toUpperCase()} / ${shoeModel.toUpperCase()}`;
                    /* Gera o elemento <p> com a COLORWAY / MODELO dentro */
                    
                    postInformation.appendChild(postUsername)
                    postInformation.appendChild(postModel)
                    postFrame.appendChild(postInformation)
                    /* Adiciona as informações criadas nos respectivos elementos */
                     
                    // Criação da imagem do post
                    var imgDivElement = document.createElement("div")
                    imgDivElement.setAttribute("class", "catalog-img");
                    var imageElement = document.createElement("img");
                    var imageSource = post["imageurl"]
                    imageElement.setAttribute("src", imageSource)
                    /* Cria um elemento <img> e coloca a informação do objeto .JSON como src="link" da <img> */

                    imgDivElement.appendChild(imageElement);
                    /* Acrescenta <img> dentro da <div class="catalog-img"> criada */
                    
                    postFrame.appendChild(imgDivElement)
    
                    postSection.appendChild(postFrame); // Adiciona o elemento final gerado na section para os posts da página
                };
            }

            // Randomiza uma lista array de elementos
            shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;
              
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
              
                  // Pick a remaining element...
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex -= 1;
              
                  // And swap it with the current element.
                  temporaryValue = array[currentIndex];
                  array[currentIndex] = array[randomIndex];
                  array[randomIndex] = temporaryValue;
                }
              
                return array;
            }
            
            // Atualiza os GIFs dos tênis
            updateGif() {
                if (this.colorwayIDs.includes(this.selectedFilterString)) {
                    this.gifElement.removeAttribute("src")
                    this.gifElement.setAttribute("src", `../gifs/yeezy-foam-runner-${this.selectedFilterString}.gif`)
                } else {
                    this.gifElement.removeAttribute("src")
                    this.gifElement.setAttribute("src", `../gifs/all-foam-runner.gif`)
                }
            }

            // Atualiza o estilo dos botões de filtro
            updateSelectedFilter(clear = true) {
                if (clear) { // Limpa todos os filtros
                    this.filterButtons.forEach((button) => {
                        console.log(button)
                        button.classList.remove("selected-item")
                    })
                }

                if (this.selectedFilterString != undefined) { // Se algum filtro estiver selecionado
                    console.log(this.selectedFilterString)
                    this.filterButtons.forEach((button) => {
                        if (button.id == this.selectedFilterString) { 
                            button.classList.add("selected-item") // Adiciona a classe "selected-item" ao botão do filtro selecionado
                        }
                    })
                }
            }

            // Filtra os posts de acordo com o filtro selecionado
            filterPosts(filter) {
                if (this.selectedFilterString == filter.id) { // Se o filtro clicado já estiver selecionado
                    this.selectedFilterString = undefined // Remove o filtro selecionado
                    
                    this.updateSelectedFilter() // Limpa o estilo de seleção do botão do filtro
                    this.updateGif() // Atualiza o GIF do tênis
                    this.postsInjector(this.shuffledPosts) // Injeta todos os posts
                }
                else {
                    this.selectedFilterString = filter.id

                    // Filtra os posts
                    let filteredPostsArray = [];
                    this.shuffledPosts.forEach(post => {
                        if (post["colorway"] == filter.id) {
                            filteredPostsArray.push(post)
                        }
                    })
                    
                    this.updateSelectedFilter() // Adiciona estilo de seleção no botão clicado
                    this.updateGif() // Atualiza o GIF do tênis
                    this.postsInjector(filteredPostsArray) // Injeta os posts filtrados
                }
            }
        }

        // Inicia a classe Feed
        const feed = new Feed(data)

        // Event listeners
        const filterButton = document.querySelectorAll('[data-filter]');
        filterButton.forEach(selectedFilter => {
            selectedFilter.addEventListener('click', () => {
                feed.filterPosts(selectedFilter)
            })
        })

    });


listHeight = document.querySelector('.colorways').offsetHeight;
wrapHeight = document.querySelector('#nav-list-wrap').offsetHeight
if (wrapHeight > listHeight || screen.width <= 1100) {
    document.querySelector('#gradient').style.display = 'none';
} else {
    navListHeight = document.querySelector('#nav-list-wrap').offsetHeight;
    document.querySelector('#gradient').style.height = navListHeight + 'px';
}
