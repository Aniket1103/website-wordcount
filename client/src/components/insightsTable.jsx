import { useState, useEffect } from "react";
import InsightRow from "./insightRow";

function InsightsTable() {
  const [insights, setInsights] = useState([]);

  const insightsEndpoint =
    (import.meta.env.VITE_PATH ||
      `http://localhost:${import.meta.env.VITE_PORT || "4000"}`) +
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


  const handleFavorite = (insightId, isFav, setFav) => {
    setFav(isFav);
    fetch(insightsEndpoint + `/${insightId}`, {
      method : "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favourite: isFav }),
    })
    .then(response => response.json())
    .then((body) => {
      const { id, favourite } = body;

      let updatedInsights = insights;
      for(const insight of updatedInsights){
        if(insight.id === id){
          insight.favourite = favourite;
          break;
        }
      }
    })
    .catch(error => {
      console.log(error);
    })
  };

  const handleRemoveInsight = (insightId) => {
    fetch(insightsEndpoint + `/${insightId}`, {
      method : "DELETE",
    })
    .then(async response => {
      if(response.ok){
        const updatedInsights = insights.filter(
          (insight) => insight.id !== insightId
        );
        setInsights(updatedInsights);
      }
      return response.json()
    })
    .catch(error => {
      console.log(error);
    })
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
            <InsightRow 
              {...insight}
              key={insight.id}
              handleFavorite={handleFavorite}
              handleRemoveInsight={handleRemoveInsight}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default InsightsTable;
