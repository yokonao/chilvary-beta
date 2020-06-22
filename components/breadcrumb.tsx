import Link from "next/link";
import path from "path";

export default function Breadcrumb(props: { currentPath: string[] }) {
  return (
    <div className="container is-fluid">
      <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
        <ul>
          {props.currentPath.map((value, index, array) => {
            const linkPath = path.join(...array.slice(0, index + 1));
            return (
              <>
                {index < array.length - 1 ? (
                  <li>
                    <Link
                      href="/directories/[...directory]"
                      as={`/directories/`}
                      key={value}
                    >
                      <a>{value}</a>
                    </Link>
                  </li>
                ) : (
                  <li className="is-active">
                    <Link href="" key={value}>
                      <a>{value}</a>
                    </Link>
                  </li>
                )}
              </>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
