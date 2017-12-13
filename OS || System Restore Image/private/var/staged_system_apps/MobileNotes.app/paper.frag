#version 100

varying highp vec2 vPaperTexCoord;

uniform sampler2D texture_paper;

void main()
{
    gl_FragColor = texture2D(texture_paper, vPaperTexCoord);
    gl_FragColor.rgb *= 0.94;
}