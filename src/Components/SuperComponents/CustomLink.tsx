import {Link, LinkProps, useMatch, useResolvedPath} from "react-router-dom";

export function CustomLink({ children, to, ...props }: LinkProps) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link
                style={{ textDecoration: match ? "underline" : "none" ,
                    color: match ? 'blue' : 'black' }}
                to={to}
                {...props}
            >
                {children}
            </Link>
        </div>
    );
}
