#version 100

varying highp vec2 vTexCoord;

uniform sampler2D texture_src;

// Pre-multiplied composite on-top of white.
void main()
{
    lowp vec4 src = texture2D(texture_src, vTexCoord);
    
    gl_FragColor = src + (1.0-src.a);
}