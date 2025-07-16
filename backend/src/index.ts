import { app } from "./app";
import env from "dotenv";
env.config();

const PORT = process.env.PORT || 8080;


app.listen(PORT,()=>{
    console.log(`app is listen on PORT: ${PORT}`);
})