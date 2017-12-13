// KNTransition_Shadow vertex shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;

attribute vec2 ShadowPosition;
attribute float Alpha;

varying vec4 v_ShadowColor;

void main()
{
    v_ShadowColor = vec4(0.0,0.0,0.0,Alpha);
    gl_Position = MVPMatrix * vec4(ShadowPosition, 0,1);
}
