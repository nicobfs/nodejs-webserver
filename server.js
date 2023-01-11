const http = require('http');
//http module untuk membangun web server


//requestListener adalah logika untuk menangani dan menanggapi sebuah request dituliskan.
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');
    response.statusCode = 200;

    const {method,url} = request;

    if (url ==='/'){
        //TODO 2 : logika respons bila url bernilai '/'
        if(method === 'GET'){
            response,statusCode = 200;
            response.end(JSON.stringify({
                message : 'Ini adalah Homepage',
            }));
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }
    } else if (url === '/about') {
        //TODO 3 : logika respons bila url bernilai '/about'
        if(method === 'GET'){
            //respons bila client menggunakan GET
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }));
        } else if (method === 'POST'){
            //respons bila client menggunakan POST
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
                });
        
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message : `Halo!, ${name}! Ini adalah halaman about`,
            }));
            });

        }else {
            //respons bila client tidak menggunakan GET ataupun POST
            response.statusCode = 400;
            response.end(JSON.stringify({
                message : `Halaman tidak dapat diakses menggunakan ${method} request`,
            }));
        }
    } else {
        //TODO 1 : logika respons bila url bukan '/' atau '/about'
        response.statusCode = 404;
        response.end(JSON.stringify({
            message : 'Halaman tidak ditemukan!',
        }));
    }
/** */
    //if(method === 'GET'){
    //    response.end('<h1>Hello!</h1>');
    //}

    //if (method === 'POST'){
    //    let body = [];

    //    request.on('data', (chunk) => {
    //        body.push(chunk);
    //    });

    //    request.on('end', () => {
    //        body = Buffer.concat(body).toString();
    //        const {name} = JSON.parse(body);
    //        response.end(`<h1>Hai, ${name}!</h1>`);
    //    });
    //}*/
};

const server = http.createServer(requestListener); 
//http.createServer berfungsi untuk membuat HTTP server yang merupakan instance dari http.server

const port = 5000; // jalur yang digunakan untuk mengakses http
const host = 'localhost'; //nama domain yang digunakan oleh HTTP server

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

//running web server : npm run start
//untuk mendapatkan response sesuai request listener : curl -X GET http://localhost:5000/