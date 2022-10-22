const { Link } = ReactRouterDOM;
export function BugPreview({ bug, onRemoveBug,onEditBug }) {
  return (
    <tr key={bug.id}>
      <td>{bug.id}</td>
      <td>{bug.name}</td>
      <td>{bug.description}</td>
      <td>{bug.severity}</td>
      <td>{bug.createdAt}</td>
      <td>{bug.creator}</td>
      <td>
        <button onClick={() => onRemoveBug(bug.id)}>x</button>
        <button
          onClick={() => {
            onEditBug(bug);
          }}
        >
          Edit
        </button>
        <Link to={`/bug/${bug.id}`}>
          <button className="details">more details</button>
        </Link>
      </td>
    </tr>
  
  );
}
