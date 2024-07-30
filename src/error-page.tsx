import { useRouteError } from 'react-router-dom';

type ErrorWithMessage = {
  message: string;
  statusText?: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;
  let errorStatusText: string | undefined;

  if (isErrorWithMessage(error)) {
    errorMessage = error.message;
    errorStatusText = error.statusText;
  } else {
    errorMessage = 'An unknown error occurred';
    errorStatusText = undefined;
  }

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>
        <i>{errorStatusText || errorMessage}</i>
      </p>
    </div>
  );
}
