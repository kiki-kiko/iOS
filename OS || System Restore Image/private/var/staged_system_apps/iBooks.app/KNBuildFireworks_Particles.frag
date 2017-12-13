// KNBuildFireworks fragment shader
#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D ParticleTexture;
//uniform sampler2DRect Texture;
//uniform float AlphaType;
uniform float Opacity;

varying vec4 v_Color;
varying vec2 v_TexCoord;
//varying float particleTexPercent;

void main()
{
    vec4 texColor = texture2D(ParticleTexture, v_TexCoord);

    texColor *= v_Color * Opacity;
    //texColor.a *= Opacity;
    
    //texColor = vec4(v_TexCoord, 0, 1);
    
    gl_FragColor = texColor;
}
