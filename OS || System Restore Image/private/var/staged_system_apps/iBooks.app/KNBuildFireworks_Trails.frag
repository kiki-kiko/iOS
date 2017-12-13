// KNBuildFireworks fragment shader
#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D Texture;
//uniform sampler2DRect Texture;
//uniform float AlphaType;
uniform float Opacity;
uniform float NoiseAmount;
uniform vec2 NoiseSeed;
uniform float NoiseMax;

//varying vec4 v_Color;
varying vec2 v_TexCoord;
//varying float particleTexPercent;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float inverseSquare(float a) {
    return 1.0-(1.0-a)*(1.0-a);
}

void main()
{
    vec4 texColor = texture2D(Texture, v_TexCoord);

    //texColor = bloom(texColor);
    
    /** Dither transparency to add noise */
    float randomNoise = NoiseMax*rand(v_TexCoord*NoiseSeed);
    float randomAmount = NoiseAmount * 1.5*max(0.0, texColor.a-0.3333);

    float thisOpacity = Opacity * mix(1.0, randomNoise, randomAmount);
    texColor *= thisOpacity;
    
    //texColor = vec4(v_TexCoord, 0, 1);
    
    gl_FragColor = texColor;
}
