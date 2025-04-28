export class AppSettings{
    // ao colocar get na fente de uma função se transforma em atributo. 

static get AUTENTICADOR_URL(){
    return "/api/autenticador";
    }
    
}
// refactored to method with uppercase name. before static get autenticador