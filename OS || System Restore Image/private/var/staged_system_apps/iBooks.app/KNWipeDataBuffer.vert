#ifdef GL_ES
precision highp float;
#endif

uniform mat4    MVPMatrix;

attribute vec2  Position;
#ifdef GL_ES
attribute mediump vec2  TexCoord;
attribute mediump float Opacity;
#else
attribute vec2  TexCoord;
attribute float Opacity;
#endif

varying vec2 v_TexCoord;
varying float v_Opacity;

void main()
{
    v_TexCoord = TexCoord;
    v_Opacity = Opacity;
    gl_Position = MVPMatrix * vec4(Position, 0, 1);
}
