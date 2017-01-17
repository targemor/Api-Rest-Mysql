
//variables de entorno para los archivos service y conection 

module.exports={
	host:'localhost',
    user:'root',
    password:'',    
    database:"cerene2",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "cereneapi"


};
