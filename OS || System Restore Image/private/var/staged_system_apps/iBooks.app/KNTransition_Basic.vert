// KNTransition_Basic vertex shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;

attribute vec3 NextPosition;
attribute vec2 NextTexCoord;

varying vec2 v_TexCoord;

void main()
{
    v_TexCoord = NextTexCoord;
    
    gl_Position = MVPMatrix * vec4(NextPosition, 1);
}

