
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;
uniform float Opacity;

varying vec2 v_TexCoord;
varying float v_Opacity;

void main()
{
    vec4 color = texture2D(Texture, v_TexCoord);
    color *= smoothstep(0.0,1.0, v_Opacity);
    color *= Opacity;
    //DEBUG: color = mix(vec4(1,0,0,1), vec4(0,0,1,1), v_Opacity);
    gl_FragColor = color;
}
