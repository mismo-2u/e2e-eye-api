import Clarifai from 'clarifai';

let app = new Clarifai.App({apiKey: process.env.API_CLRIFAI});
console.log("api = "process.env.API_CLRIFAI);

export const handleApiCall = function(req,res){
	app.models.predict({id:'f76196b43bbd45c99b4f3cd8e8b40a8a', 
                    version:'45fb9a671625463fa646c3523a3087d5'}, 
                    req.body.input)
    		  .then(data=>{
    		  	res.json(data);
    		  })
    		  .catch(err=>res.status(400).json('could not work w Api'))   
}


export const handleImage = function(req,res,db){
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0])
	})
	.catch(err=>res.status(400).json('could not increment the count'))
}
// export handleImage;
// export default {handleApiCall,handleImage}