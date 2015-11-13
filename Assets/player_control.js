#pragma strict

private var is_jumping : boolean;
var max_speed : float = 10;
var jump_force : float = 500;
@range(0,1) var crouch_speed : float = .36;
var what_is_ground : LayerMask;

private var ground_check : Transform;
private var grounded_radius : float = .2f;
private var grounded : boolean;
private var ceiling_check : Transform;
private var ceiling_radius : float = .01;
private var animator : Animator;
private var rigidbody_2D : Rigidbody2D;
private var facing_right : boolean = true;

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
	is_jumping = false;

}

function Awake() {
    ground_check = transform.Find("GroundCheck");
    ceiling_check = transform.Find("CeilingCheck");
    animator = GetComponent.<Animator>();
    rigidbody_2D = GetComponent.<Rigidbody2D>();
}