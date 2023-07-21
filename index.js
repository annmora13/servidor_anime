const express = require('express');
const app = express();
const fs = require('fs/promises');

const PORT = 3000;

// ej: http://localhost:3000/
app.get('/', async (req, res) => {
    try{
        const animeNe = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        res.status(200).json(animeNe);
    } catch(error){
        console.log(error);
        res.status(500).json({
            status: 'Errorsito',
            message: error.message
        });
    }
    res.end;
})

//Crear un nuevo Anime
 // ej: http://localhost:3000/create?nombre=toradora&genero=comedy&anyo=2008&autor=Yuyuko
app.get('/create', async (req, res) => {
    try{
        const nombre = req.query.nombre;
        const genero = req.query.genero;
        const anyo = req.query.anyo;
        const autor = req.query.autor;
        const anime = {
            nombre,
            genero,
            anyo,
            autor,
        }
        const animeNe = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        const id = new String(Number(Object.keys(animeNe)[Object.keys(animeNe).length -1]) + 1);
        animeNe[id] = anime;
        await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeNe));
        res.status(201).json(animeNe);
    }catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
})

// ej: http://localhost:3000/read/6
app.get('/read/:id', async (req, res) => {
    try{
        const id = req.params.id; 
        const animeNe = JSON.parse (await fs.readFile(__dirname+'/anime.json'));
        const anime = animeNe[id];
        if(anime){
            res.status(200).json(anime);
        } else{
            res.status(404).json ({
                status: 'Ok',
                message: 'No existe éste anime'
            });
        }
    } catch (error){
        console.log(error);
        res.status(500).json({
            status: 'Errorsito',
            message: error.message
        });
    }
    res.end();
})

// ej: http://localhost:3000/update/7?nombre=toradora&genero=comedy&anyo=2008&autor=Yuyuko
app.get('/update/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const nombre = req.query.nombre;
        const genero = req.query.genero;
        const anyo = req.query.anyo;
        const autor = req.query.autor;
        let loencontre = false;
        const animeNe = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        const anime = animeNe[id];

        if(anime){
                anime.nombre = nombre;
                anime.genero = genero;
                anime.anyo = anyo;
                anime.autor = autor;
                loencontre = true;
            }
        if(loencontre){
            await fs.writeFile(__dirname + '/anime.json',JSON.stringify(animeNe));
            res.status(201).json(animeNe);
        } else{
            res.status(404).json({
                status: 'Ok',
                message:'No existe anime para actualizar'
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
})

// ej: http://localhost:3000/delete/6
app.get('/delete/:id',async (req,res)=>{ 
    try{
        const id = req.params.id;
        const animeNe = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        delete animeNe[id];
        await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeNe));
        res.status(201).json(animeNe);
    } catch(error){
        console.log(error);
        res.status(500).json({
            status: 'Errorsito',
            message: error.message
        });
    }
    res.end();
})

app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));

module.exports = {
    app
};