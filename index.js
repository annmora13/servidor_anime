const express = require('express');
const app = express();
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const PORT = 3000;

// ej: http://localhost:3000/
app.get('/', async (res) => {
    try{
        const animeNe = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        res.status(200).json(animeNe);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end;
})

//Crear un nuevo Anime
 // ej: http://localhost:3000/create?nombre=toradora&comedy=2008&Yuyuko=300000
app.get('/create', async (req, res) => {
    const id = uuidv4().slice();
    try{
        const nombre = req.query.nombre;
        const genero = req.query.genero;
        const anyo = req.query.anyo;
        const autor = req.query.autor;
        const serie = {
            id,
            nombre,
            genero,
            anyo,
            autor,
            serie
        }
        const animeNe = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        const anime = animeNe.anime;
        anime.push(anime);
        await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeNe));
        res.status(201).json(animeNe);
    }catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
})

// ej: http://localhost:3000/update/a36658?nombre=toradora&comedy=2008&Yuyuko=300000
app.get('/update/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const nombre = req.query.nombre;
        const genero = req.query.genero;
        const anyo = req.query.anyo;
        const autor = req.query.autor;
        const animeNe = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        const anime = animeNe.anime;
        let loencontre = false;
        anime.forEach((b) => {
            if(b.id === id){
                b.nombre = nombre;
                b.genero = genero;
                b.anyo = anyo;
                b.autor = autor;
                loencontre = true;
            }
        });
        if(loencontre){
            await fs.writeFile(__dirname + '/anime.json',JSON.stringify({anime}));
            res.status(201).json(animeNe);
        } else{
            res.status(404).json({});
        }
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
})

// ej: http://localhost:3000/delete/a36658
app.get('/delete/:id',async (req,res)=>{ 
    const id = req.params.id;
    try{
        const animeNe = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        let anime = animeNe.anime;
        anime = anime.filter((b) => b.id !== id);
        animeNe.anime = anime;
        await fs.writeFile(__dirname + '/anime.json',JSON.stringify(animeNe));
        res.status(201).json(animeNe);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
})

// ej: http://localhost:3000/read/a36658
app.get('/read/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const animeNe = JSON.parse (await fs.readFile(__dirname+'/anime.json'));
        const anime = animeNe.anime;
        const serie = anime.find ((b) => b.id === id);
        if(serie){
            res.status(200).json(serie);
        } else{
            res.status(404).json ({});
        }
    } catch (error){
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
})

app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));

module.exports = {
    app
}