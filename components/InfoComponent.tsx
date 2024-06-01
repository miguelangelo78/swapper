export default function InfoComponent(
{
  header,
  message,
  className = '',
  classNameHeader = '',
}:
{
  header: string,
  message: string,
  className?: string,
  classNameHeader?: string,
}) {
  return (
    <div className={`text-center mb-3 bg-tertiary text-xs text-primary rounded-lg p-2 shadow-lg border border-indigo-500 ${className}`}><span className={`bg-primary p-1 rounded-lg font-bold text-tertiary ${classNameHeader}`}>{header}</span> {message}</div>
  )
}
