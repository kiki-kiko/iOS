// KNBuildFireworks Object vertex shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;

attribute vec2  Position;
attribute vec2  TexCoord;

varying vec2 v_TexCoord;
varying vec2 v_MaskTexCoord;


void main()
{
    gl_Position = MVPMatrix * vec4(Position, 0,1);
    v_TexCoord = TexCoord;
    v_MaskTexCoord = vec2(TexCoord.x, 1.0-TexCoord.y);
}
