function createCharacter(){
	var name = document.getElementById("name").value.trim();
	if(isNotBlank(name)){
		getCharacterStorage();
		storage.get(name,function(error, data) {
			if (error) throw error;

			if(Object.keys(data).length === 0){
				document.getElementById("createCharacterModal").style.display="block";
				 
			}else{
				var errorTitle = "Personnage déjà existant";
				var errorMsg = "Le Personnage " + name + " existe déjà. Merci de crée un nouveau Personnage.";
				ipc.send("error",errorTitle,errorMsg);
			}
		})
	}
}
