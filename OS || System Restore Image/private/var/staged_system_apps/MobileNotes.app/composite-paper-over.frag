#version 100
#ifndef MAC
#extension GL_EXT_shader_framebuffer_fetch : require
#endif

varying highp vec2 vTexCoord;

#if defined(PAPER) || defined(MAC)
uniform sampler2D texture_src;
#endif
uniform sampler2D texture_paint;

uniform highp vec4 uColor;

#ifdef PAPER
varying highp vec2 vPaperTexCoord;
uniform sampler2D texture_dest;
#endif

#ifdef CLIPPING
// (x, y, u, v) where (u, v) is the normal of the plane in texture space.
uniform highp vec4 clipPlane;
varying highp vec2 vPixelCoord;
#endif

void main()
{
    lowp float paint = texture2D(texture_paint, vTexCoord).r;
#if defined(PAPER) || defined(MAC)
    lowp vec4 src = texture2D(texture_src, vTexCoord);
#else
    lowp vec4 src = gl_LastFragData[0];
#endif
    
#ifdef CLIPPING
    // Clipping.
    highp float distanceFromPlane = dot(vPixelCoord - clipPlane.xy, clipPlane.zw);
    paint = paint * smoothstep(-0.5, 0.5, distanceFromPlane);
#endif
    
    // src-over
    src = uColor*paint + src * (1.0-paint);
    
#ifdef PAPER
    // src-over paper
    lowp vec4 dest = texture2D(texture_dest, vPaperTexCoord);
    gl_FragColor = src + dest * (1.0-src.a);
#else
    gl_FragColor = src;
#endif
}
