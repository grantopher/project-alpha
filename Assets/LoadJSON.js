
import System.IO;
import SimpleJSON;

function Start () {
	var fileRead = File.OpenText(Application.dataPath + '/Meta/abilities.json');
	var fileText : String = '';
	while (true) {
		var nextLine = fileRead.ReadLine();
		if (nextLine != null) {
			fileText += nextLine;
		} else {
			break;
		}
	}
	fileRead.Close();
	var playerAbilities_source = JSON.Parse(fileText)['playerAbilities'];
	var playerAbilities : Array = [];
	for (var ability_raw in playerAbilities_source) {
		var ability_parsed : Ability = new Ability(ability_raw);
		playerAbilities.push(ability_parsed);
	}
	Debug.Log(playerAbilities[0]);
}

function Update () {

}

public function getData(dataKey : String) {
	// return the data here.
}

class Ability extends Object {
	public var name : String;
	public var slug : String;
	public var range: float;

	public function Ability (data) {
		name = data['name'];
		slug = data['slug'];
		range = data['range'].AsFloat;
	}
}