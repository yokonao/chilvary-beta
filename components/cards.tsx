import { FileData } from "interfaces/file_data";
import Link from "next/link"

export default function Cards(props: {
  posixCurrentPath: string;
  array: FileData[];
}) {
  return (
    <div className="container is-fluid px-4 py-4">
      <div className="columns is-multiline is-vcentered">
        {props.array.map((data) => (
          <div
            className="column is-one-third-desktop is-half-tablet"
            key={data.fileName}
          >
            <div className="card fix-height">
              <div className="card-content">
                <p className="title is-4">{data.title}</p>
                <p>{data.description}</p>
              </div>
              <div className="has-text-justified fix-bottom">
                <Link
                  href="/posts/[...id]"
                  as={`/posts/${props.posixCurrentPath}${data.fileName}`}
                >
                  <a className="button is-fullwidth is-large is-link">View</a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
