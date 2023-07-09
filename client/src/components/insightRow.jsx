import { useState } from "react";

function InsightRow({id, domain, wordCount, favourite, handleFavorite, handleRemoveInsight}) {
    
  const [fav, setFav] = useState(favourite);

  return (
    <>
      <tr key={id}>
        <td className="table-cell">{domain}</td>
        <td className="table-cell">{wordCount}</td>
        <td className="table-cell">
          <input
            onChange={(e) => handleFavorite(id, e.target.checked, setFav)}
            className="star"
            type="checkbox"
            checked={fav}
            title="mark favourite"
          />
        </td>
        <td className="table-cell">
          <button className="remove" onClick={() => handleRemoveInsight(id)}>
            Remove
          </button>
        </td>
      </tr>
    </>
  );
}

export default InsightRow;
