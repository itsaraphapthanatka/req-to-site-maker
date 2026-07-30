import React from "react";
import { Facebook, Instagram, Phone } from "lucide-react";

const socials = [
    {
        name: "Facebook",
        icon: <Facebook size={22} />,
        url: "https://www.facebook.com/SaranyaClothing",
        color: "#1877F2",
        hoverBg: "hover:bg-[#1877F2]",
    },
    {
        name: "Instagram",
        icon: <Instagram size={22} />,
        url: "https://www.instagram.com/saranyaclothing",
        color: "#E4405F",
        hoverBg: "hover:bg-[#E4405F]",
    },
    {
        name: "LINE",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
            >
                <path d="M12 2C6.48 2 2 5.83 2 10.5c0 4.08 3.42 7.5 8.05 8.32.31.07.74.21.85.49.1.25.07.64.03.89l-.14.82c-.04.25-.2.97.85.53s5.6-3.3 7.64-5.65C21.08 13.89 22 12.27 22 10.5 22 5.83 17.52 2 12 2zm-3.08 11.19H6.58a.54.54 0 01-.54-.54V8.52c0-.3.24-.54.54-.54s.54.24.54.54v3.59h1.8c.3 0 .54.24.54.54s-.24.54-.54.54zm1.67-.54c0 .3-.24.54-.54.54s-.54-.24-.54-.54V8.52c0-.3.24-.54.54-.54s.54.24.54.54v4.13zm4.22 0a.54.54 0 01-.43.53h-.03a.54.54 0 01-.43-.22l-2.48-3.37v3.06c0 .3-.24.54-.54.54s-.54-.24-.54-.54V8.52a.54.54 0 01.44-.53h.02a.54.54 0 01.43.22l2.49 3.37V8.52c0-.3.24-.54.54-.54s.54.24.54.54v4.13zm2.78-2.53c.3 0 .54.24.54.54s-.24.54-.54.54h-1.8v1.45h1.8c.3 0 .54.24.54.54s-.24.54-.54.54h-2.34a.54.54 0 01-.54-.54V8.52c0-.3.24-.54.54-.54h2.34c.3 0 .54.24.54.54s-.24.54-.54.54h-1.8v1.46h1.8z" />
            </svg>
        ),
        url: "https://line.me/ti/p/~saranyaclothing",
        color: "#06C755",
        hoverBg: "hover:bg-[#06C755]",
    },
    {
        name: "TikTok",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.48a8.3 8.3 0 004.76 1.49V7.56a4.85 4.85 0 01-1-.87z" />
            </svg>
        ),
        url: "https://www.tiktok.com/@saranyaclothing",
        color: "#000000",
        hoverBg: "hover:bg-[#000000]",
    },
    {
        name: "X",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        url: "https://x.com/saranyaclothing",
        color: "#000000",
        hoverBg: "hover:bg-[#000000]",
    },
    {
        name: "WeChat",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05a6.127 6.127 0 01-.253-1.726c0-3.573 3.276-6.48 7.314-6.48.258 0 .513.013.764.036C16.533 4.79 12.997 2.188 8.691 2.188zm-2.87 4.795a1.006 1.006 0 11-.001 2.013 1.006 1.006 0 01.002-2.013zm5.12 0a1.007 1.007 0 110 2.014 1.007 1.007 0 010-2.014zM24 15.614c0-3.296-3.3-5.982-7.337-5.982-4.09 0-7.337 2.686-7.337 5.982 0 3.34 3.247 5.982 7.337 5.982.85 0 1.673-.118 2.436-.343a.714.714 0 01.59.08l1.563.916a.268.268 0 00.138.045c.133 0 .24-.108.24-.243 0-.058-.024-.117-.04-.175l-.32-1.216a.49.49 0 01.176-.548C23.027 19.256 24 17.537 24 15.614zm-9.241-1.19a.823.823 0 11-.001 1.646.823.823 0 01.001-1.645zm3.862 0a.823.823 0 11.001 1.645.823.823 0 01-.001-1.645z" />
            </svg>
        ),
        url: "https://wechat.com/saranyaclothing",
        color: "#07C160",
        hoverBg: "hover:bg-[#07C160]",
    },
    {
        name: "Phone",
        icon: <Phone size={22} />,
        url: "tel:+66000000000",
        color: "#25D366",
        hoverBg: "hover:bg-[#25D366]",
    },
];

const FloatingSocial: React.FC = () => {
    return (
        <div className="floating-social">
            {socials.map((social) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="floating-social-btn"
                    title={social.name}
                    style={{ "--social-color": social.color } as React.CSSProperties}
                >
                    {social.icon}
                </a>
            ))}
        </div>
    );
};

export default FloatingSocial;
