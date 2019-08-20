function createCharacter(){
	var name = document.getElementById("name").value.trim();
	if(isNotBlank(name)){
		getCharacterStorage();
		storage.get(name,function(error, data) {
			if (error) throw error;

			if(Object.keys(data).length === 0){
				console.log("Peut etre créé");
			}else{
				console.log("Existe déjà");
			}
		})
	}
}
