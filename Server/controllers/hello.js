export const hello = async (req, res) =>{
    console.log("Hello World console log"); 
    res.status(200).send("Hello World");
}