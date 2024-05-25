var cnt = 0;

function calc (form) {
     var C, P, F 
     
    C=parseInt(document.getElementById("carb-per").value)/100
    P=parseInt(document.getElementById("protien-per").value)/100
	F=parseInt(document.getElementById("fat-per").value)/100
	const val = (C + P + F).toFixed(2);
	if (val != 1.00) { 
		alert('The sum of carb, protein, and fat percentage must equal 100');
		form.CarbCalories.value = 0;
		form.ProteinCalories.value = 0;
		form.FatCalories.value = 0;

		form.CarbGrams.value = 0;
		form.ProteinGrams.value = 0;
		form.FatGrams.value = 0;
	}
	else{
		const targetCalories = parseInt(document.getElementById("targetCalories").value);

		form.CarbCalories.value = C * targetCalories;
		form.ProteinCalories.value = P * targetCalories;
		form.FatCalories.value = F * targetCalories;

		form.CarbGrams.value = Math.round((C * targetCalories)/4);
		form.ProteinGrams.value = Math.round((P * targetCalories)/4);
		form.FatGrams.value = Math.round((F * targetCalories)/9); 
	}
}

/*
	Dairy 
	Veg 
	Non Veg
	Nuts
	seeds 
	millets 
 */
let resources = [];

const updateResult = () =>{
	var glocals = 0
	var glocarbs = 0
	var gloprot = 0 
	var glofats = 0

	resources.forEach((resource)=>{
		glocals += resource.cal;
		glocarbs += resource.c;
		gloprot += resource.p;
		glofats += resource.f;
	});
	var total ="Total Calories ="+ glocals +" Carbs ="+ 
		glocarbs +" Protien ="+ gloprot  +" Fats ="+ glofats
	var totalcls = document.getElementById("total-resources")
	if(resources.length<1){
		totalcls.innerHTML = "";
	}
	else{
		totalcls.innerHTML = total;
	}
};
var div_main = document.createElement("DIV");


const btnRemove = ()=> {

	const checkboxes = document.querySelectorAll('input[name="para-val"]:checked');
	let colors = [];

	checkboxes.forEach((checkbox) => {
		colors.push(checkbox.value);
	});

	if(colors.length===0){
		var div = document.getElementById("div-id-resource")
		div.parentNode.removeChild(div);
		div.innerHTML = "";
		div_main.innerHTML = "";
		var totalcls = document.getElementById("total-resources");
		totalcls.innerHTML = "";
	}
	else{
		checkboxes.forEach((checkbox)=>{
			const value = checkbox.value;

			var id = document.getElementById('p'+value);
			id.parentNode.removeChild(id);

			id = document.getElementById('chk' + value);
			id.parentNode.removeChild(id);

			var parr = resources.findIndex( (x) => x.name === value);
			console.log(parr, value);
			if( parr>-1){
				resources.splice(parr, 1);
			}
			updateResult();
		});
	}
};

function AddDropDownList() {
	//Build an array containing Customer records.
	var category = [
		{Name:"Dairy"},
		{Name:"Veg"},
		{Name:"Non_Veg"},
		{Name:"Nuts"},
		{Name:"Seeds"},
		{Name:"Millets"},
	];
	const sel = document.getElementById("select-source").value;

	console.log(sel);

	var ddlCustomers = document.createElement("SELECT");

	//Add the Options to the DropDownList.
	for (var i = 0; i < category.length; i++) {
		var option = document.createElement("OPTION");

		//Set Customer Name in Text part.
		option.innerHTML = category[i].Name;

		//Set CustomerId in Value part.
		//Add the Option element to DropDownList.
		ddlCustomers.options.add(option);
	}

	//Reference the container DIV.
	var dvContainer = document.getElementById("dvContainer");
	// var selval = document.createElement("P");
	// selval.innerHTML = sel;
	// dvContainer.appendChild(selval);
	var cat;
	//console.log(sel)
	if(sel==="Dairy"){
		//console.log(category_dairy);
		cat = category_dairy
	}
	else if(sel==="Nuts")
	{
		//console.log(category_nuts)
		cat = category_nuts
	}
	else if(sel==="Veg"){
		//console.log(category_veg)
		cat = category_veg
	}
	else if(sel==="Millets"){
		//console.log(category_millets)
		cat = category_millets
	}
	else if(sel=="Seeds"){
		//console.log(category_seeds)
		cat = category_seeds
	}
	else{
		//console.log(category_non_veg)
		cat = category_non_veg
	}
	console.log(cat);
	var selcat = document.createElement("SELECT");

	//Add the Options to the DropDownList.
	for (var i = 0; i < cat.length; i++) {
		var option = document.createElement("OPTION");

		//Set Customer Name in Text part.
		option.innerHTML = cat[i].Name;

		//Set CustomerId in Value part.
		//Add the Option element to DropDownList.
		selcat.options.add(option);
	}
	// {Name:"Sunflower", Quantity:10, cal:63,c:1,p:2,f:2.4},
	


	addBtn = document.createElement("INPUT");
	addBtn.value = "Add Resource";
	addBtn.type = "button";
	addBtn.className = "Button";
	addBtn.id = "addButton";

	var div = document.createElement("DIV");
	div.className = "div-resource";
	div.id = "div-id-resource";





	addBtn.onclick = function(){
		var res_div = document.createElement("DIV");
		res_div.className = "resource-sup-div";

		var ind = cat.findIndex(x=>x.Name===selcat.value);
		var radio = document.createElement("INPUT");
		radio.type = 'checkbox';
		radio.id = 'chk' + selcat.value;
		radio.value = selcat.value;
		radio.name = 'para-val';
		radio.className = "resource-chk"

		var resval = document.createElement("P");
		resval.id = "p"+ selcat.value;
		resval.className = "res-para";

		var qun = cat[ind].Quantity;
		var cals = cat[ind].cal
		var carbs = cat[ind].c 
		var prot = cat[ind].p
		var fats = cat[ind].f

		var res =cat[ind].Name+ " "+qun+" "+ cals +" "+ carbs +" "+ prot  +" "+ fats
		resval.innerHTML = res;
		cnt++;
		let resource = {};
		resource.name = cat[ind].Name;
		resource.cal = cals;
		resource.c = carbs;
		resource.p = prot
		resource.f = fats
		
		resources.push(resource);
		updateResult();

		res_div.appendChild(radio);
		res_div.appendChild(resval);

		div_main.appendChild(res_div);
	}

	//Create a Remove Button. 

	var div_select = document.createElement("DIV");
	div_select.className = "div-select-resource"
	
	//Add the Remove Buttton to DIV.
	div_select.appendChild(selcat);
	div_select.appendChild(addBtn);


	var div_content = document.createElement("DIV");
	div_content.className = "resource-div-content";

	var para = document.createElement("P");
	para.className = "resource-para-name";
	para.innerHTML = "Name";
	div_content.appendChild(para);

	var paraq = document.createElement("P");
	paraq.innerHTML = "Quantity";
	paraq.className = "resource-para-name";
	div_content.appendChild(paraq);

	var parac = document.createElement("P");
	parac.innerHTML = "Cals";
	parac.className = "resource-para-name";
	div_content.appendChild(parac);

	var paracr = document.createElement("P");
	paracr.innerHTML = "Carbs";
	paracr.className = "resource-para-name";
	div_content.appendChild(paracr);

	var parap = document.createElement("P");
	parap.className = "resource-para-name";
	parap.innerHTML = "Protien";
	div_content.appendChild(parap);

	var paraf = document.createElement("P");
	paraf.className = "resource-para-name";
	paraf.innerHTML = "Fats";
	div_content.appendChild(paraf);

	//Add the DIV to the container DIV.
	div_main.appendChild(div_select);
	div_main.appendChild(div_content);

	div.appendChild(div_main);

	dvContainer.appendChild(div);
}
