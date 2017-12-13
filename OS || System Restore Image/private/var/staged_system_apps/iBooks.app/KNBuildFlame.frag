// KLNSparkle fragment shader

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D ParticleTexture;

varying vec4 v_Color;
varying vec2 v_TexCoord;

void main()
{
    vec4 texColor = texture2D(ParticleTexture, v_TexCoord);
    
    texColor *= v_Color;
    
    // DEBUG:
    //texColor = mix(texColor, vec4(0,1,1,1), 0.1);
    
    gl_FragColor = texColor;
}
