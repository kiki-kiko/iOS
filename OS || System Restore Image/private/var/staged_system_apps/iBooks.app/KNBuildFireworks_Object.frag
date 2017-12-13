// KNBuildFireworks Object fragment shader
#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D MaskTexture;
uniform sampler2D Texture;
uniform float Percent;
uniform float Opacity;

varying vec2 v_TexCoord;
varying vec2 v_MaskTexCoord;

void main()
{
    vec4 objectColor = texture2D(Texture, v_TexCoord);
    float maskAlpha = texture2D(MaskTexture, v_MaskTexCoord).a;
    
    float thisOpacity = max(maskAlpha, Percent);
    thisOpacity *= Opacity;
    
    vec4 texColor = objectColor * thisOpacity;
    
    //texColor = vec4(maskAlpha, 0,0,1);
    //texColor = v_TexCoord.x > 0.5 ? objectColor : texColor;
    
    gl_FragColor = texColor;
}
