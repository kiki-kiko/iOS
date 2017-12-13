  // KNBuildFromDarkness fragment shader

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D Texture;
uniform sampler2D DistanceTexture;
uniform vec2 TextureSize;

uniform float Opacity; // global opacity

uniform float BevelSize;
uniform float BevelOpacity;
uniform vec2 BevelDirection;

uniform vec2 GradientTopBottom;
uniform float GradientAffectsHighlightsAmount;

uniform vec2 ShineLinePoint1;
uniform vec2 ShineLinePoint2;
uniform float ShineSize;
uniform float ShineOpacity;

varying vec2 v_TexCoord;

const float Pi = 3.1415926;
const float Pi_2 = 1.5707963;
const float TwoPi = 6.2831852;

const float sineConstB = 1.2732396; /* = 4./Pi; */
const float sineConstC = -0.40528476; /* = -4./(Pi*Pi); */

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

float myDeterminant(mat2 m) {
    return m[0][0]*m[1][1] - m[0][1]*m[1][0];
}

void main()
{
    vec4 texColor = texture2D(Texture, v_TexCoord);
    vec3 texDist = texture2D(DistanceTexture, v_TexCoord).rgb;

    // Gradient that fades in text
    float gradientPercent = (v_TexCoord.y - GradientTopBottom.x)/(GradientTopBottom.y - GradientTopBottom.x);
    float gradientOpacity = 1.0-fastSineMap(gradientPercent);
    
    // Bevel
    
    float bevelDirectionAdjust = clamp(dot(texDist.gb, BevelDirection), 0.0,1.0);
    float adustedBevelSize = mix(0.0, BevelSize, bevelDirectionAdjust);
    float bevelAmount = clamp((adustedBevelSize - texDist.r)/BevelSize, 0.0,1.0);
    bevelAmount *= texColor.a * BevelOpacity;
    
    // Shine
    
    vec2 thisTexel = v_TexCoord * TextureSize;
    float distFromShineLine = myDeterminant(mat2(ShineLinePoint2-thisTexel, ShineLinePoint1-thisTexel));
    
    float shine = clamp(distFromShineLine, 0.0,1.0); // Everything positive is 1, negative is 0, with AA line on edge
    shine *= max(0.0, (ShineSize - abs(distFromShineLine/TextureSize.x))); // Attenuate by distance from line
    shine *= ShineOpacity * texColor.a;
    
    
    // Add 'em up!
    
    float totalOpacity = gradientOpacity * Opacity;

    texColor *= totalOpacity;
    
    // The (1.0-totalOpacity) here makes it so we don't add on the shine after the object is fully opaque
    texColor.rgb += vec3((1.0-totalOpacity) * (bevelAmount + shine) * mix(1.0, gradientOpacity, GradientAffectsHighlightsAmount));
    
    
    //texColor = vec4(gradientOpacity,0,0,1);

    gl_FragColor = texColor;
}
