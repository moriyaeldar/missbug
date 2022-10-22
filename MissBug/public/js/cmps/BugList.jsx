import { BugPreview } from "./BugPreview.jsx"

export function BugList({bugs,onRemoveBug,onEditBug}){
 return (<table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Description</th>
        <th>Severity</th>
        <th>CreatedAt</th>
        <th>Creator</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {bugs.map((bug) => (
        <BugPreview key={bug._id} bug={bug} onRemoveBug={onRemoveBug} onEditBug={onEditBug}/>
      ))}
    </tbody>
  </table>)


}
 