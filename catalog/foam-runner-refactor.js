fetch("foam-runner-data.json")
    .then(response => response.json())
    .then(data => {
        class Feed {
            constructor(data) {
                this.data = data;
                this.selectedFilter = undefined;
                this.shuffledPosts = this.shuffle(data);
                this.postAmount = data.length;
                this.gifElement = document.querySelector("#bottom-gif img")
                
                this.colorways = [] // Lista das collorways em string
                document.querySelectorAll('[data-filter]').forEach((colorway) => {this.colorways.push(colorway.id)});
                
                this.postsInjector(this.shuffledPosts) // Inicialmente a pagina carrega com a função postsLoader recebendo a array "data" que contém todos os posts
            }

            // Injeta cada post da lista de posts passada como parâmetro
            postsInjector(posts) {
                const postSection = document.querySelector("#container #posts") // Seleciona o container onde os posts serão injetados
                
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

            updateGif(colorway = undefined) {
                if (this.colorways.includes(colorway)) {
                    this.gif.removeAttribute("src")
                    this.gif.setAttribute("src", `../gifs/yeezy-foam-runner-${colorway}.gif`)
                } else {
                    this.gif.removeAttribute("src")
                    this.gif.setAttribute("src", `../gifs/all-foam-runner.gif`)
                }
            }

            filterPosts(filter) {
                if (this.selectedFilter = undefined) { // Se já estiver selecionado
                    this.postsInjector(this.shuffledPosts) // Injeta todos os posts
                } 
                // Se ainda não estiver selecionado
                else { 
                    // Filtra os posts baseado no filtro
                    let filteredPostsArray = [];
                    this.shuffledPosts.forEach(post => {
                        if (post["colorway"] == filter) {
                            filteredPostsArray.push(post)
                        }
                    })

                    this.postsInjector(filteredPostsArray)
                }
            }
        }

        // Inicia a classe Feed
        const feed = new Feed(data)

        // Event listeners
        const filterButton = document.querySelectorAll('[data-filter]');
        filterButton.forEach(selectedFilter => {
            selectedFilter.addEventListener('click', () => {
                feed.filterPosts(selectedFilter.id)
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
