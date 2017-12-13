// KNTransitionIris fragment shader

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;

varying vec2 v_TexCoord;

void main()
{
    vec4 color = texture2D(Texture, v_TexCoord);
    //color.b = 1.0;
        
	gl_FragColor = color;
}
