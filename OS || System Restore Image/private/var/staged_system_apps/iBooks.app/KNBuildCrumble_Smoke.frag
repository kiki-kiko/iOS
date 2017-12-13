/* KNBuildCrumble_Smoke.frag */

#ifdef GL_ES
precision lowp float;
#endif

uniform sampler2D ParticleTexture;

varying vec4 v_Color;
varying vec2 v_TexCoord;

void main()
{
    vec4 texColor = texture2D(ParticleTexture, v_TexCoord);
    
    texColor *= v_Color;
    
    gl_FragColor = texColor;
}
