function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h1 className="section-title">
        {title}
      </h1>

      <p className="subtitle">
        {subtitle}
      </p>
    </div>
  );
}

export default PageHeader;