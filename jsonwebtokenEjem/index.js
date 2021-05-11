const express = require('express')
,bodyParser = require('body-parser')
,jwt = require('jsonwebtoken')
,config = require('./configs/config')
,app = express()

app.set('llave', config.llave)

app.use(bodyParser.urlencoded({ extended: true}))

app.use(bodyParser.json())

app.listen(3000, ()=>{
    console.log("Server on, port: 3000")
})

const rutasProtegidas = express.Router()
rutasProtegidas.use((req, res, next)=>{
    const token = req.headers['access-token']
    if(token){
        jwt.verify(token, app.get('llave'), (err, decoded)=>{
            if(err){
                return res.json({mensaje: 'Token invalida'})
            } else{
                req.decoded = decoded
                next()
            }
        })
    } else{
        res.send({
            mensaje: 'Token no proveida'
        })
    }
})



app.get('/', (req, res)=>{
    res.send('Index')
})

app.get('/datos', rutasProtegidas, (req, res)=>{
    const datos = [
        { id: 1, nombre: "Rj"},
        { id: 2, nombre: "Jose"},
        { id: 3, nombre: "Lety"}
    ]

    res.json(datos)

})

app.post('/autenticar', (req, res)=>{
    if(req.body.usuario === "rj" && req.body.contrasena === "holamundo"){
        const payload ={
            check: true
        }
        const token = jwt.sign(payload, app.get('llave'), {
            expiresIn: 1440
        })
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        })
    } else{
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})