// KNTransitionDroplet vertex shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;

attribute vec3 Position;
attribute vec2 TexCoord;

varying vec2 v_TexCoord;

void main()
{
    v_TexCoord = TexCoord;
    
    gl_Position = MVPMatrix * vec4(Position, 1);
}
