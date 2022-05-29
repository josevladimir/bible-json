const fs = require('fs');
const Path = require('path');

var directoryPath = Path.join(__dirname, 'origen');

var initial = {
    version: 'Reyna Valera 60',
    books: []
};
fs.readdir(directoryPath, function (err, files) {

    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    
    files.forEach(function (file) {
        
        fs.readFile(Path.join(__dirname, '/origen/' + file), 'utf-8', function (error, data) {
            if (error) console.log(error);
            let book = {
                name: file.substring(0, file.indexOf('.')).replace('_', ' '),
                number: 0,
                content: []
            }
            let arreglo_lineas = data.split('\n');
            arreglo_lineas.forEach(linea => {
                var dats = linea.substring(1, linea.indexOf('\'') - 2).split(',');
                var content = linea.substring(linea.indexOf('\'') + 1, linea.lastIndexOf('\''));
                book.number = dats[0];
                book.content.push({
                    chapter: dats[1].trim(),
                    verse: dats[2].trim(),
                    content: content.replace('/n', '').trim()
                });
            })
            initial.books.push(book);

            initial.books.sort(function(x, y){
                if(Number(x.number) < Number(y.number)){
                    return -1;
                }
                if(Number(x.number) > Number(y.number)){
                    return 1;
                }
                return 0;
            });
        
            fs.writeFile(Path.join(__dirname, './procesados/bible.json'),JSON.stringify(initial, null, 4),'utf-8', function (error) {
                if (error) console.log(error)
            })
        
        })
    });
});
