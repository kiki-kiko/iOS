#version 100

uniform sampler2D uTexture;
varying highp vec2 vTexCoord;

void main()
{
    gl_FragColor = texture2D(uTexture, vTexCoord);
}
