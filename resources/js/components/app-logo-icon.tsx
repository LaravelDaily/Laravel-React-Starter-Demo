import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 30 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.015 25.238V0H0v32h12.303c7.387 0 12.223-2.902 14.854-7.028l-14.854.266H7.015Z" fill="#fff"/>
            <path
                d="M13.95 6.416h2.445c4.384 0 7.44 3.168 7.44 8.146 0 1.278-.212 2.423-.558 3.435h6.351c.24-1.092.372-2.237.372-3.435C30 6.336 24.128.027 16.422.027h-2.445l-.027 6.389Z"
                fill="#fff"
            />
        </svg>
    );
}
