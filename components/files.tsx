import Link from "next/link";
import { FileData } from "interfaces/file_data";
import Panel from "components/panel";

export default function Files(props: {
  posixCurrentPath: string;
  array: FileData[];
}) {
  return (
    <Panel heading="Files">
      <ul>
        {props.array.map((data) => (
          <li className="panel-block" key={data.fileName}>
            <span className="panel-icon">
              <i className="fas fa-file"></i>
            </span>
            <Link
              href="/posts/[...id]"
              as={`/posts/${props.posixCurrentPath}${data.fileName}`}
            >
              <a>{data.title}</a>
            </Link>
            <br />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
