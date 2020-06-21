import Link from "next/link";
import Panel from "components/panel";

export default function Directories(props: {
  posixCurrentPath: string;
  array: string[];
}) {
  return (
    <Panel heading="Directories">
      <ul>
        {props.array.map((dirName) => (
          <li className="panel-block" key={dirName}>
            <span className="panel-icon">
              <i className="fas fa-folder"></i>
            </span>
            <Link
              href="/directories/[...directory]"
              as={`/directories/${props.posixCurrentPath}${dirName}`}
            >
              <a>{dirName}</a>
            </Link>
            <br />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
