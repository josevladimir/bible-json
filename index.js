const fs = require('fs');
const Path = require('path');


let libro = new Array()

for (var i = 0; i < 22; i++) {
    libro[i] = []
}
fs.readFile(Path.join(__dirname, '/origen/apocalipsis.txt'), 'utf-8', function (error, data) {
    if (error) console.log(error);
    let arreglo_lineas = data.split(/,\n/);
    arreglo_lineas.forEach(linea => {
        index = linea.charAt(5)
        if (linea.charAt(6) !== ',') index += linea.charAt(6)
        if (linea.charAt(7) !== ',') index += linea.charAt(7)
        libro[parseInt(index) - 1].push(linea)
    })
    
    console.log(libro)

    for (var indiceC = 0; indiceC < libro.length; indiceC++) {
        for (var indiceV = 0; indiceV < libro[indiceC].length; indiceV++) {
            let nuevo_verso
            if(((indiceV + 1) < 10) && ((indiceC +1) < 10)){
                nuevo_verso = libro[indiceC][indiceV].substring(12,libro[indiceC][indiceV].length - 2)
            }else if(((indiceV + 1) < 100) && ((indiceV + 1) >= 10) && ((indiceC +1) < 10)){
                nuevo_verso = libro[indiceC][indiceV].substring(13,libro[indiceC][indiceV].length - 2)
            }else if(((indiceV + 1) < 10) && ((indiceC +1) >= 10) && ((indiceC +1) < 100)){
                nuevo_verso = libro[indiceC][indiceV].substring(13,libro[indiceC][indiceV].length - 2)
            }else if(((indiceV + 1) < 100) && ((indiceV + 1) >= 10) && ((indiceC +1) >= 10) && ((indiceC +1) < 100)){
                nuevo_verso = libro[indiceC][indiceV].substring(14,libro[indiceC][indiceV].length - 2)
            }else if(((indiceV + 1) < 10) && ((indiceC +1) >= 100)){
                nuevo_verso = libro[indiceC][indiceV].substring(14,libro[indiceC][indiceV].length - 2)
            }else if(((indiceV + 1) >= 10) && ((indiceV + 1) < 100) && ((indiceC +1) >= 100)){
                nuevo_verso = libro[indiceC][indiceV].substring(15,libro[indiceC][indiceV].length - 2)
            }else if(((indiceV + 1) >= 100) && ((indiceC +1) >= 100)){
                nuevo_verso = libro[indiceC][indiceV].substring(16,libro[indiceC][indiceV].length - 2)
            }
            libro[indiceC][indiceV] = nuevo_verso
        }
    }

    let file = ''

    for (var indiceC = 0; indiceC < libro.length; indiceC++) {
        file += '['
        for (var indiceV = 0; indiceV < libro[indiceC].length; indiceV++) {
            file += `'${libro[indiceC][indiceV]}'`
            if (indiceV !== (libro[indiceC].length - 1)) file += ','
        }
        file += ']'
        if (indiceC !== (libro.length -1 )) file += ','
    }

    fs.writeFile(Path.join(__dirname, './procesados/apocalipsis.js'),`module.exports = [\n${file}\n]`,'utf-8', function (error) {
        if (error) console.log(error)
    })

})