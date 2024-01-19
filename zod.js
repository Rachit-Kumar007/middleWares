
// if this is an array of string return true else return false
// function validateInput(arr){
//     if(arr.length>0 && typeof(arr) == 'object') { //a bunch of things extra 
//         return true;
//     }
//     else{
//         false;
//     }

// };

const arr = ["Aryan", "Rachit"];
// console.log(validateInput(arr));

// but if we are using zod
function validateInput2(obj){
    const zod = require('zod');


    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })

    const response = schema.safeParse(obj);
    console.log(response);  
}



validateInput2({
    email: "anshumangggd@gmail.com",
    password: "12222221144"
});