// KNTransition_Shadow fragment shader

#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_ShadowColor;

void main()
{	
    gl_FragColor = v_ShadowColor;
}