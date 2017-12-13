// KNTransitionDroplet fragment shader

#ifdef GL_ES
precision highp float;
#endif

uniform float Percent;
uniform float Amplitude;
uniform float BigInitialAmplitude;
uniform float DarkenAmount;
uniform float LightenAmount;
uniform float Ripples;
uniform float RippleSpeed;
uniform vec2 Resolution;
uniform sampler2D Texture;

varying vec2 v_TexCoord;
varying vec2 v_Position;

const float Pi = 3.1415926;
const float Pi_2 = 1.5707963;
const float TwoPi = 6.2831852;

const float sineConstB = 1.2732396; /* = 4./Pi; */
const float sineConstC = -0.40528476; /* = -4./(Pi*Pi); */

const vec2 center = vec2(0.5);

float fastSine(float angle)
{
    float theAngle = mod(angle + Pi, TwoPi) - Pi;
    return sineConstB * theAngle + sineConstC * theAngle * abs(theAngle);
}

float fastSineMap(float x)
{
    float clampedX = clamp(x,0.0,1.0);
    return 0.5 + 0.5*fastSine((clampedX-0.5)*Pi);
}


void main(void)
{
	vec2 uv = v_TexCoord.xy;
    float invAr = Resolution.y / Resolution.x;
    uv.y = (uv.y - 0.5) * invAr + 0.5;
    float dist = distance(uv, center);
    vec2 direction = uv - center;
    
    float invDistSq = 1.0-(1.0 - dist)*(1.0 - dist);
    float revPercent = 1.0 - Percent;
    
    float amplitude = -Amplitude * (1.0-dist*2.0) * revPercent;
    
    float bigInitialAmplitude = max(0.0, (1.0-revPercent*dist*mix(Ripples,0.0,Percent)));
    bigInitialAmplitude *= mix(BigInitialAmplitude, 1.0, min(1.0,Percent*3.0));
    amplitude *= bigInitialAmplitude;
    amplitude = mix(0.0, amplitude, min(1.0,Percent*10.0)); // quick ramp up
    
    float ripplePercent = mix(1.0 - revPercent*revPercent, Percent, Percent);
    ripplePercent *= 1.0;
    float texOffset = fastSine(Pi * (invDistSq*Ripples - ripplePercent * RippleSpeed));
    vec2 offset = amplitude * (direction * texOffset);
    vec2 newUV = v_TexCoord + offset;
    
    
	vec3 tex = texture2D(Texture, newUV).rgb;
    float darken = max(0.0, 1.0 - DarkenAmount*max(offset.y,0.0));
    float lighten = max(0.0, -LightenAmount*min(offset.y,0.0));
    tex.rgb *= vec3(darken);
    tex.rgb += vec3(lighten);
    
    vec4 color = vec4(tex.rgb,1.0-Percent);
    
	gl_FragColor = color;
}

