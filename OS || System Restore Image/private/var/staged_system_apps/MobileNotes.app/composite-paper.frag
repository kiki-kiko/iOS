#version 100

varying highp vec2 vTexCoord;
uniform sampler2D texture_src;

#if defined(PAPER)
varying highp vec2 vPaperTexCoord;
uniform sampler2D texture_dest;
#elif defined(PAPER_COLOR)
uniform lowp vec4 paperColor;
#endif


void main()
{
    lowp vec4 src = texture2D(texture_src, vTexCoord);
#if defined(PAPER)
    lowp vec4 paperColor = texture2D(texture_dest, vPaperTexCoord);
#endif
    
    gl_FragColor = src + paperColor * (1.0-src.a);
}
