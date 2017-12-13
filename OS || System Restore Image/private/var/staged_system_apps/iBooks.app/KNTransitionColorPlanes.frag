// KNTransitionColorPlanes fragment shader
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;
uniform vec4 ColorMask;

varying vec2 v_TexCoord;

void main()
{
    vec4 texColor = texture2D(Texture, v_TexCoord);

    texColor *= ColorMask;
    
    gl_FragColor = texColor;
}
