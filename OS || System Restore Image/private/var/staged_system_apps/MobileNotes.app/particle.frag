#version 100

uniform sampler2D uTexture;

varying highp vec2 vPointCoord;
varying highp float vAlpha;

void main()
{
    lowp vec4 tex = texture2D(uTexture, vPointCoord);
    gl_FragColor = vec4(vAlpha * tex.a);
}
