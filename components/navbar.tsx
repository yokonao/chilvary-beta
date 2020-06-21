import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="navbar is-dark is-bold">
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="button is-dark is-inverted">
                <div>
                  <Link href="/">
                    <a>
                      <span className="icon has-text-dark">
                        <i className="fas fa-lg fa-home"></i>
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
