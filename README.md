# Yeezy Catalog Website (Português Brasil)

Yeezy Catalog é um site de catálogo que reúne o conteúdo da comunidade relacionado à marca _Yeezy_ em um só lugar.
Acesse o website em progresso em [Yeezy Catalog em GitHub Pages](https://andrerocco.github.io/yeezy-catalog/index.html)

_Desenvolvido por [André Rocco](https://www.instagram.com/andre___rocco/) e criado por [Romério Castro](https://www.instagram.com/romeriocastro/)._

### Como funciona?

A página inical do catálogo mostra todos os modelos de _Yeezy's_ que podem ser explorados. Ao clicar em um modelo, o usuário acessa a página de posts daquele modelo.

As imagens usadas nos posts e suas respectivas informações são armazenadas em arquivos JSON seguindo o seguinte formato:

```json
{
  "imageurl": "https://i.ibb.co/abc123/exemplo.jpg", // Link da foto hospedada em imgbb.com
  "model": "yeezy-foam-runner", // Modelo utilizado na foto
  "username": "andre____rocco", // Instagram do criador
  "colorway": "onyx", // Especifica a cor do modelo utilizado na foto
  "id": 1649347909246 // ID único do post
}
```

Quando uma página de posts (local onde é possível visualizar as imagens) é acessada, o banco de imagens e todas as imagens do banco de dados são ordenadas em ordem aleatória. O usuário pode filtrar as imagens que deseja ver baseado na característica _colorway_.

-----

# Yeezy Catalog Website (English)

Yeezy Catalog is a catalog website that brings together community content related to the _Yeezy_ brand in one place.
Access the website in progress at [Yeezy Catalog in GitHub Pages](https://andrerocco.github.io/yeezy-catalog/index.html)

_Developed by [André Rocco](https://www.instagram.com/andre___rocco/) and created by [Romério Castro](https://www.instagram.com/romeriocastro/)._

### How it works?

The catalog home page shows all _Yeezy's_ shoes models that can be viewed. By selecting one, the user accesses the respective posts page for that shoe.

The images used in the posts and their respective information are stored in JSON files that follows this format:

```json
{
  "imageurl": "https://i.ibb.co/abc123/exemplo.jpg", // Hosted image's URL (hosted in imgbb.com)
  "model": "yeezy-foam-runner", // Model used in the photo
  "username": "andre____rocco", // Creator's instragam username
  "colorway": "onyx", // Specifies the color of the model used in the photo
  "id": 1649347909246 // Unique ID of the post
}
```

When a posts page (where you can view the images) is accessed, the image bank and all the images in the database are sorted in random order. The user can filter the images they want to see based on the shoe _colorway_.