import Section from './Section';

export function Timeline({ id, title, eyebrow, items, sectionKey }) {
  return (
    <Section id={id} sectionKey={sectionKey}>
      <div className="space-y-8">
        <div>
          <p className="text-xs tracking-[0.35em] uppercase text-gray-500">{eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-light text-gray-100">{title}</h2>
        </div>

        <div className="space-y-12">
          {items.map((item, idx) => (
            <article
              key={`${item.title}-${idx}`}
              className="grid gap-4 md:grid-cols-[140px_1fr] items-start"
            >
              <div className="text-xs uppercase tracking-[0.26em] text-gray-500">
                {item.meta}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-100">{item.title}</h3>
                {item.subtitle && <p className="text-sm text-gray-400">{item.subtitle}</p>}
                {item.body && (
                  <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}


