import { AppState } from './AppStateContext';

export const save = (payload: AppState) => {
  return fetch(`http://localhost:4000/save`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return response.json();
    })
    .catch(console.log);
};

export const load = async () => {
  return fetch(`http://localhost:4000/load`).then(
    (response) => {
      return response.json() as Promise<AppState>;
    }
  );
};
