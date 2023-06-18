import {comments} from "../../../data/comments";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function handler(req, res) {
    if(req.method === "POST"){
        comments.push(JSON.parse(req.body));
        fs.writeFile(
            path.join(__dirname,"..","..","..","data","comments.js"),
            "export let comments = "+ JSON.stringify(comments)
        );
        res.status(200).json()
    }
    else if(req.method === "GET"){
        res.status(200).json(comments);
    }
    else if(req.method === "DELETE"){
        let index = comments.findIndex(c => c.id === JSON.parse(req.body))
        comments.splice(index,1);
        fs.writeFile(
            path.join(__dirname,"..","..","..","data","comments.js"),
            "export let comments = "+ JSON.stringify(comments)
        );
        res.status(200).json()
    }
    else if(req.method === "PATCH"){
        let id = JSON.parse(req.body).id;
        let index = comments.findIndex(c => c.id === id)
        comments.splice(index,1,JSON.parse(req.body));
        fs.writeFile(
            path.join(__dirname,"..","..","..","data","comments.js"),
            "export let comments = "+ JSON.stringify(comments)
        );
        res.status(200).json()
    }
}
