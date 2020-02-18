const http=  require("http");
const url = require("url");
const petshop = require("./petshop");

const server = http.createServer((req, res) => {
    
   // console.log("rodou!");
    // console.log(req);
    res.writeHead(200, {"Content-Type": "text/plain ; charset=UTF-8"});
    res.write ("** Bem vindes ao Petshop**");

    let urlCompleta= url.parse(req.url, true);
    let queryString = urlCompleta.query;
    let rota = urlCompleta.pathname;

    // console.log(urlCompleta);


    switch (rota) {
        case "/pets" :
        const pets= petshop.listarPets();
            if (pets.length > 0){
                res.write(pets);
            }
                else {
                  res.write("Nenhum pet cadastrado :(");
                     }
                 break ;


        case "/pets/add":

        let novoPet = queryString;
        if(petshop.adicionarPet(novoPet)){
            res.write(`${novoPet.nome} foi cadastrado com sucesso!`);
        }
        else {
            res.write("ops, algo deu errado!");
        };
        break;




        case "/pets/buscar" :
        let petsEncontrados = petshop.buscarPet(queryString.nome);
            if (petsEncontrados.length > 0 ) {
                
                res.write(`Encontramos ${petsEncontrados.length} pets com o nome ${queryString.nome}`);
            }

            else {
                res.write("ops, não encontramos nenhum pet com esse nome!");
            }

        res.write("Buscando pets")

        break;
        default:
        res.write("**Petshop DH**");
    }

   // else if (req.url == "/pets"){
           // res.write("rota nao encontrada");
   // }


    res.end();
    
})
.listen(3000, "localhost",() => {

    console.log("servidor ta ouvindo na porta 3000!");
}
 );

