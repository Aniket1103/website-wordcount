import { useState, useEffect } from "react";

function InsightsTable() {
  const [insights, setInsights] = useState([]);
  const [favoriteInsights, setFavoriteInsights] = useState([]);

  const insightsEndpoint =
    (import.meta?.env?.VITE_PATH ||
      `http://localhost:${import.meta?.env?.VITE_PORT || "4000"}`) +
    `/insights`;

  useEffect(() => {
    fetch(insightsEndpoint)
      .then((response) => response.json())
      .then((body) => {
        setInsights(body);
        // console.log(insights)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleMarkFavorite = (insightId, isFav) => {
    fetch(insightsEndpoint + `/${insightId}`, {
      method : "PATCH",
      json : {
        favourite : isFav
      }
    })
    .then(response => response.json())
    .then((body) => {
      const { id, favourite } = body;

      let updatedInsights = insights;
      for(const insight of updatedInsights){
        if(insight.id === id){
          insight.favourite = favourite;
          // return setInsights(updatedInsights);
          break;
        }
      }
    })
    .catch(error => {
      console.log(error);
    })
  };

  const handleRemoveInsight = (insightId) => {
    // Remove the insight from the insights list
    const updatedInsights = insights.filter(
      (insight) => insight.id !== insightId
    );
    setFavoriteInsights(favoriteInsights.filter((id) => id !== insightId));
    setInsights(updatedInsights);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Word Count</th>
            <th>Mark Favorite</th>
            <th>Remove Insight</th>
          </tr>
        </thead>
        <tbody>
          {insights.map((insight) => (
            <tr key={insight.id}>
              <td className="table-cell">{insight.domain}</td>
              <td className="table-cell">{insight.wordCount}</td>
              <td className="table-cell">
                {
                  /* <button
                onClick={() => handleMarkFavorite(insight.id)}
                className={favoriteInsights.includes(insight.id) ? 'favorite' : ''}
              >
                Mark Favorite
              </button> */
                  <input
                    onChange={(e) => handleMarkFavorite(id, e.target.checked)}
                    class="star"
                    type="checkbox"
                    title="mark favourite"
                  />
                }
              </td>
              <td className="table-cell">
                <button
                  className="remove"
                  onClick={() => handleRemoveInsight(insight.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default InsightsTable;
