import { gql, useQuery } from "@apollo/client";

function App() {
  const GET_TODOS = gql`
    query GetTodos {
      todos {
        title
        user {
          username
          email
        }
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_TODOS);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div>{JSON.stringify(data.todos)}</div>
    </>
  );
}

export default App;
