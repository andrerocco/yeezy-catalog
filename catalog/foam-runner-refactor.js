fetch("foam-runner-data.json")
    .then(response => response.json())
    .then(data => {
        class Feed {
            constructor(data) {
                this.data = data;
                this.postsLoader(data) // Inicialmente a pagina carrega com a função postsLoader recebendo a array "data" que contém todos os posts
            }

            // Injeta cada post da lista de posts passada como parâmetro
            postsInjector(data) { 
                return
            }
        }

        let feed = new Feed(data)
    });


listHeight = document.querySelector('.colorways').offsetHeight;
wrapHeight = document.querySelector('#nav-list-wrap').offsetHeight
if (wrapHeight > listHeight || screen.width <= 1100) {
    document.querySelector('#gradient').style.display = 'none';
} else {
    navListHeight = document.querySelector('#nav-list-wrap').offsetHeight;
    document.querySelector('#gradient').style.height = navListHeight + 'px';
}
