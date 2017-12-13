#version 100

attribute vec4 Position;
attribute vec2 TexCoord;

uniform mat4 uTransform;

varying vec2 vTexCoord;

void main()
{
	gl_Position = uTransform * Position;
    
	vTexCoord = TexCoord;
}