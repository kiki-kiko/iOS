#version 100

varying highp vec2  vTexCoord;
varying highp float vRadius;

uniform highp float uAlpha;
uniform highp float uAntialiasingThreshold;
uniform highp float uBorderWidth;
uniform highp vec4  uRingColor;

void main()
{
    highp float distance = length(vTexCoord) +  2.0 - uAntialiasingThreshold/2.0;
    highp float alpha    = 1.0 + smoothstep(vRadius - uAntialiasingThreshold, vRadius, distance) -
                                 smoothstep(vRadius - uBorderWidth - uAntialiasingThreshold, vRadius - uBorderWidth, distance);

    gl_FragColor = vec4(uRingColor.r * uAlpha*(1.0-alpha),
                        uRingColor.g * uAlpha*(1.0-alpha),
                        uRingColor.b * uAlpha*(1.0-alpha),
                        uRingColor.a * uAlpha*(1.0-alpha));
    
}