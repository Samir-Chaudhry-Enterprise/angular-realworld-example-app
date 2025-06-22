import { Errors } from '../../core/models/errors';

interface ErrorListProps {
  errors: Errors;
}

export function ErrorList({ errors }: ErrorListProps) {
  const errorMessages = Object.keys(errors).reduce((acc: string[], key) => {
    return acc.concat(errors[key].map(error => `${key} ${error}`));
  }, []);

  if (errorMessages.length === 0) return null;

  return (
    <ul className="error-messages">
      {errorMessages.map((error, index) => (
        <li key={index} className="text-red-500 text-sm">
          {error}
        </li>
      ))}
    </ul>
  );
}
