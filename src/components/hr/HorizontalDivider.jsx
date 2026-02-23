export default function HorizontalDivider({ className }) {
  return (
    <hr
      className={`border border-slate-200 dark:border-slate-700 transition-colors my-8 ${className}`}
    />
  );
}
