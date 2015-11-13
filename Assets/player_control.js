#pragma strict

private var is_jumping : System.Boolean;
var max_speed : float = 10;
var jump_force : float = 500;
@range(0,1) var crouch_speed : float = .36;
var what_is_ground : LayerMask;

function Start () {
}

function Update() {
	if (!is_jumping) {
		is_jumping = Input.GetKeyDown("space");
	}
}

function FixedUpdate () {
	var crouch = Input.GetKey(KeyCode.LeftControl);
	var movement = Input.GetAxis('Horizontal');

}