/** Teknik çizimlerdeki kesim / hizalama işaretleri. Üst öğe `relative` olmalıdır. */
export function CornerMarks({ className = "text-navy-900/35", size = 12 }: { className?: string; size?: number }) {
  const s = `${size}px`;
  const common = "pointer-events-none absolute border-current";
  return (
    <span aria-hidden="true" className={className}>
      <span className={`${common} left-0 top-0 border-l border-t`} style={{ width: s, height: s }} />
      <span className={`${common} right-0 top-0 border-r border-t`} style={{ width: s, height: s }} />
      <span className={`${common} bottom-0 left-0 border-b border-l`} style={{ width: s, height: s }} />
      <span className={`${common} bottom-0 right-0 border-b border-r`} style={{ width: s, height: s }} />
    </span>
  );
}
