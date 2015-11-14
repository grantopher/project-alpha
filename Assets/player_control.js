#pragma strict

private var is_jumping : boolean;
var maxSpeed : float = 10;
var jumpSpeed : float = 500;
@range(0,1) var crouchSpeed : float = .36;
var airControl : boolean = true;
var collisionLayer : LayerMask;

private var ground_check : Transform;
private var grounded_radius : float = .2;
private var grounded : boolean;
private var ceiling_check : Transform;
private var ceiling_radius : float = .01;
private var animator : Animator;
private var rigidbody_2D : Rigidbody2D;
private var facing_right : boolean = true;

function Start () {
}

function Awake() {
    ground_check = transform.Find("GroundCheck");
    ceiling_check = transform.Find("CeilingCheck");
    animator = GetComponent.<Animator>();
    rigidbody_2D = GetComponent.<Rigidbody2D>();
}

function Update() {
	if (!is_jumping) {
		is_jumping = Input.GetKeyDown("space");
	}
}

function FixedUpdate () {
	var crouch = Input.GetKey(KeyCode.LeftControl);
	var movement = Input.GetAxis('Horizontal');
    var colliders : Collider2D[] = Physics2D.OverlapCircleAll(ground_check.position, grounded_radius, collisionLayer);

	Move(movement, crouch, is_jumping);
	is_jumping = false;
    grounded = false;

    for (var i = 0; i < colliders.Length; i++) {
        if (colliders[i].gameObject != gameObject)
            grounded = true;
    }

    animator.SetBool("Ground", grounded);
    animator.SetFloat("vSpeed", rigidbody_2D.velocity.y);
}


function Move(move : float, crouch : boolean, jump : boolean) {
    if (!crouch && animator.GetBool("Crouch")) {
        if (Physics2D.OverlapCircle(ceiling_check.position, ceiling_radius, collisionLayer)) {
            crouch = true;
        }
    }

    animator.SetBool("Crouch", crouch);

    if (grounded || airControl) {
        move = (crouch ? move * crouchSpeed : move);
        animator.SetFloat("Speed", Mathf.Abs(move));
        rigidbody_2D.velocity = new Vector2(move*maxSpeed, rigidbody_2D.velocity.y);

        if (move > 0 && !facing_right) {
            Flip();
        }

        else if (move < 0 && facing_right) {
            Flip();
        }
    }

    if (grounded && jump && animator.GetBool("Ground")) {
        grounded = false;
        animator.SetBool("Ground", false);
        rigidbody_2D.AddForce(new Vector2(0, jumpSpeed));
    }
}


function Flip() {
    facing_right = !facing_right;
    var theScale : Vector3 = transform.localScale;
    theScale.x *= -1;
    transform.localScale = theScale;
}
