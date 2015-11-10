#pragma strict

var speed = 2.4;
var int float m_MaxSpeed = 10f;
var int float m_JumpForce = 400f;
var int float m_CrouchSpeed = .36f;
var int bool m_AirControl = false;
var int LayerMask m_WhatIsGround;


function Awake () {

}

function Update () {
	if (Input.GetAxis('Horizontal')) {
		transform.position.x = transform.position.x + (Input.GetAxis('Horizontal') * 2);
	}
	if (Input.GetAxis('Vertical')) {
		transform.position.y = transform.position.y + (Input.GetAxis('Vertical') * 2);
	}

}