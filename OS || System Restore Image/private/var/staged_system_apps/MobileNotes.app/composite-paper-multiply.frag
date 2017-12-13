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
uniform highp float uBlendAlpha;
uniform highp float uTargetMultiple;

#ifdef PAPER
varying highp vec2 vPaperTexCoord;
uniform sampler2D texture_dest;
#endif

#ifdef CLIPPING
// (x, y, u, v) where (u, v) is the normal of the plane in texture space.
uniform highp vec4 clipPlane;
varying highp vec2 vPixelCoord;
#endif

highp vec4 unpremultiply(highp vec4 color) {
    return color.a > 0.0? vec4(color.rgb/color.a, color.a) : color;
}

void main()
{
    highp float Af, Ab, Ao;
    highp vec4 Cf, Cb, uCb, Co, Ct;
    
    Cf = vec4(uColor.rgb, texture2D(texture_paint, vTexCoord).r);
#if defined(PAPER) || defined(MAC)
    Cb = texture2D(texture_src, vTexCoord);
#else
    Cb = gl_LastFragData[0];
#endif
    
#ifdef CLIPPING
    // Clipping.
    highp float distanceFromPlane = dot(vPixelCoord - clipPlane.xy, clipPlane.zw);
    Cf.a = Cf.a * smoothstep(-0.5, 0.5, distanceFromPlane);
#endif
    
    // multiply
    uCb = unpremultiply(Cb);
    
    Af = Cf.a * uBlendAlpha; // blend alpha
    Ab = Cb.a;
    
    // compute result alpha
    Ao = Af + (1.0 - Af) * Ab;
    Co.a = Ao;
    
    // blend mode
    highp vec4 targetC = uTargetMultiple*Cf*uCb;
    Ct = clamp(Cf * (uCb - targetC) + targetC, 0.0, 1.0);
    
    // standard compositing formula (see PDF 1.5 spec)
    Ct = (Ab != 0.0) ? mix(Cf, Ct, Ab) : Cf;
    Co.rgb = mix(Cb.rgb, Ct.rgb, Af);
    
#ifdef PAPER
    // src-over paper
    highp vec4 dest = texture2D(texture_dest, vPaperTexCoord);
    gl_FragColor = Co + dest * (1.0-Co.a);
#else
    gl_FragColor = Co;
#endif
}
