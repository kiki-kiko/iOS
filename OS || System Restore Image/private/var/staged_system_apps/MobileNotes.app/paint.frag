#version 100

varying highp vec2 pos;
varying highp vec2 vTexCoord;
varying highp float vRadius;

uniform highp float uAlpha;
uniform highp float uAntialiasingThreshold;

void main()
{
    // distance to midpoint.
    highp float distance = (vRadius-2.0) - length(vTexCoord);
    highp float alpha = smoothstep(-uAntialiasingThreshold, uAntialiasingThreshold, distance);
    gl_FragColor = vec4(uAlpha*alpha);
}