// KNBuildShimmerParticle.frag

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D ParticleTexture;
uniform float Percent;

varying vec4 v_Color;
varying vec2 v_TexCoord;

void main()
{
    vec4 color = texture2D(ParticleTexture, v_TexCoord);
    
    color *= v_Color;
    
    // DEBUG
    //color = mix(color, vec4(0,0,1,1), 0.075);

    gl_FragColor = color;
}
