import { json, Router, text} from "express";
import __dirname from "../utils.js";
import {fork} from "child_process"

const router = Router()

router.get("/info",(req,res)=>{
    res.send({Argumentos:process.argv[2],Plataforma:process.platform,Versión:process.version,Memoria_reservada:process.memoryUsage().rss,Path_Ejecución:process.execPath,Process_Id:process.pid,Carpeta_del_Projecto:process.argv[1]})
})

router.get("/api/randoms/:number",(req,res)=>{
    const {number} = req.params
    const childProcess = fork("./src/config/heavyCalculation.js")
    childProcess.send(`${number}`)
    childProcess.on("message",val=>{
        res.send({result:val})
    })
})
router.get("/api/randoms",(req,res)=>{
    const childProcess = fork("./src/config/heavyCalculation.js")
    childProcess.send(`100000000`)
    childProcess.on("message",val=>{
        res.send({result:val})
    })
})

export default router