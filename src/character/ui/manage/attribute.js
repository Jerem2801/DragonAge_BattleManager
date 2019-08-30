var attributes;

getGameplayStorage();
storage.get("attribute",function(error, data) {
	if (error) throw error;
	attributes = data;
	for(var id in data){
		var attribute = data[id];
		createAttributeNode(attribute);
		createFocusNode(attribute);
	}

});

function addFocus(focusId){
	// trouver l'objet dans le json
	var focusToFind = "";
	var attributeToFind = "";
	for(var id in attributes){
		var attribute = attributes[id];
		for(var id2 in attribute.focus){
			var focus = attribute.focus[id2];
			if(focus.id === focusId){
				attributeToFind = attribute;
				focusToFind = focus;
			}
		}
	}
	// crée l'element dans les remove
	var spanToAdd = createFocusToRemove(attributeToFind.id,focusToFind);
	var divToAdd = document.getElementById(attributeToFind.id +"Remove");
	divToAdd.appendChild(spanToAdd);
	// enlever l'objet dans les add
	var spanToRemove = document.getElementById(focusToFind.id);
	var divToRemove = document.getElementById(attributeToFind.id +"Add");
	divToRemove.removeChild(spanToRemove);
}

function showFocus(attributeId){
	var x = document.getElementById(attributeId + "Focus");
	if (x.style.display === 'none') {
		x.style.display = 'block';
	} else {
		x.style.display = 'none';
	}
}

function createAttributeNode(attribute){
	var div = document.createElement("div");
	div.setAttribute("class","w3-container w3-margin");
	div.style = "text-align:center";

	var span = document.createElement("span");
	span.setAttribute("class","w3-right glyphicon glyphicon-chevron-down");
	var attributeId = attribute.id;
	span.setAttribute("onclick","showFocus(\""+attributeId+"\");");


	var input = document.createElement("input");
	input.setAttribute("class","w3-input w3-border w3-right");
	input.setAttribute("type","text();");
	input.style = "width:3em;text-align:center;";
	input.setAttribute("id",attribute.id);

	var label = document.createElement("label");
	label.setAttribute("class","labelStyle");

	var h4 = document.createElement("h4");
	h4.setAttribute("class","w3-left");
	h4.style = "margin:0";

	var b = document.createElement("b");
	var name = document.createTextNode(attribute.name);

	b.appendChild(name);
	h4.appendChild(b);
	label.appendChild(h4);

	div.appendChild(span);
	div.appendChild(input);
	div.appendChild(label);

	document.getElementById("attribute").appendChild(div);
}

function createFocusToAdd(attributeId,focus){
	var span = document.createElement("span");
	span.setAttribute("class","w3-tag w3-large w3-border w3-round-large w3-white w3-center");
	span.setAttribute("id",focus.id);
	span.style = "text-align:center";

	var spanPlus = document.createElement("span");
	spanPlus.setAttribute("class","table-remove glyphicon glyphicon-plus");
	spanPlus.setAttribute("onclick","addFocus(\"" +focus.id + "\");");

	var focusName = document.createTextNode(focus.name);
	span.appendChild(focusName);
	span.appendChild(spanPlus);
	return span;
}

function createFocusToRemove(attributeId,focus){
	var span = document.createElement("span");
	span.setAttribute("class","w3-tag w3-large w3-border w3-round-large w3-white w3-center");
	span.setAttribute("id",focus.id);
	span.style = "text-align:center";

	var spanPlus = document.createElement("span");
	spanPlus.setAttribute("class","table-remove glyphicon glyphicon-remove");
	spanPlus.setAttribute("onclick","removeFocus(\"" +focus.id + "\");");

	var focusName = document.createTextNode(focus.name);
	span.appendChild(focusName);
	span.appendChild(spanPlus);
	return span;
}

function createFocusNode(attribute){
	var div = document.createElement("div");
	div.setAttribute("class","w3-panel w3-display-container");
	div.style.display = "none";
	div.setAttribute("id",attribute.id+"Focus");

	var div1 = document.createElement("div");
	div1.setAttribute("class","w3-row-padding");

	var div2 = document.createElement("div");
	div2.setAttribute("class","w3-half");

	var label = document.createElement("label");
	var focusPossible = document.createTextNode("Focus Possible");
	label.appendChild(focusPossible);

	var divTab1 = document.createElement("div");
	divTab1.setAttribute("class","w3-panel w3-border");
	divTab1.setAttribute("id",attribute.id+"Add");

	var focuss = attribute.focus;
	for(var id in focuss){
		var focus = focuss[id];
		var span = createFocusToAdd(attribute.id,focus);
		divTab1.appendChild(span);
	}

	var div3 = document.createElement("div");
	div3.setAttribute("class","w3-half");

	var label2 = document.createElement("label");
	var focusEnable = document.createTextNode("Focus Utilisé");
	label2.appendChild(focusEnable);

	var divTab2 = document.createElement("div");
	divTab2.setAttribute("class","w3-panel w3-border");
	divTab2.setAttribute("id",attribute.id+"Remove");

	div3.appendChild(label2);
	div3.appendChild(divTab2);

	div2.appendChild(label);
	div2.appendChild(divTab1);

	div1.appendChild(div2);
	div1.appendChild(div3);
	div.appendChild(div1);

	document.getElementById("attribute").appendChild(div);
}
