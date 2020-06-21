export default function Panel({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) {
  return (
    <section className="section">
      <nav className="panel">
        <p className="panel-heading">{heading}</p>
        {children}
      </nav>
    </section>
  );
}
