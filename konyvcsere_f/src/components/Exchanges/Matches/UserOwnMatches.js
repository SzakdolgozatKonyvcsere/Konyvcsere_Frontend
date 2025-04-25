import { Fragment, useEffect, useState } from "react";
import useApiContext from "../../../contexts/ApiContext"
import useAuthContext from "../../../contexts/AuthContext";
import UserOwnMatchesCards from "./UserOwnMatchesCards";


export default function UserOwnMatches(){
    const { getAllDemands, getMatchesForDemand } = useApiContext();
    const [demands, setDemands] = useState([]);
    const [matches, setMatches] = useState([]);
    const { user: authUser } = useAuthContext(); // bejelentkezett felhasználó lekérése
    const [expanded, setExpanded] = useState(new Set()); // itt hogy melyik demand_id-k vannak kinyitva

    useEffect(() => {
      if (!authUser?.id) return;
      (async () => {
        const data = await getAllDemands(authUser.id);
        console.log("lekert demands: ", data, authUser) // ok
        setDemands(data || []);
      })();
      console.log("lekert demands2: ", demands)
    }, [authUser]);
    // amint megvannak a demands-ek, előtöltjük mindegyik match-jeit
  useEffect(() => {
      if (demands.length === 0) return;
      demands.forEach(d => {
        getMatchesForDemand(d.demand_id)
          .then(offers => {
            setMatches(prev => ({ ...prev, [d.demand_id]: offers || [] }));
          })
          .catch(err => console.error(`Hiba a ${d.demand_id} match-ek betöltésénél:`, err));
      });
    }, [demands, getMatchesForDemand]);

    // előre kiszámoljuk, hány "s" vagy "f" státuszú, más felhasználóhoz tartozó találat van each demand-hez
  const counts = Object.fromEntries(
    Object.entries(matches).map(([dId, allOffers]) => {
      const filtered = allOffers.filter(o =>
        (o.status === 's' || o.status === 'f')
        && o.user_id !== authUser.id
      );
      return [dId, filtered.length];
    })
  );
  
    // kattintáskor lekérjük, ha még nem töltöttük, aztán toggle-oljuk az expanded állapotot
    const handleToggle = async (demand_id) => {
      // ha még nincs betöltve, töltsük
      if (!matches[demand_id]) {
        const offers = await getMatchesForDemand(demand_id);
        setMatches((m) => ({ ...m, [demand_id]: offers || [] }));
      }
      setExpanded((prev) => {
        const next = new Set(prev);
        next.has(demand_id) ? next.delete(demand_id) : next.add(demand_id);
        return next;
      });
    };

    


    return(
        <>
        <div className="userOwnMatches">
        <div className="userOwnMatches">
      {!demands.length ? (
        <p className="text-center text-muted mt-4">Még nincs mentett keresésed.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Cím</th>
                <th>Évjárat</th>
                <th>Műfaj</th>
                <th>Szerzők</th>
                <th>Kiadó</th>
                <th>Nyelv</th>
                <th className="text-center">Talált</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {demands.map((d) => {
                // csak s vagy f státuszú ajánlatok
                const allOffers = matches[d.demand_id] || [];
                const offers = allOffers.filter(o => o.status === 's' || o.status === 'f');
                const isOpen = expanded.has(d.demand_id);
                return (
                  <Fragment key={d.demand_id}>
                    <tr>
                      <td>{d.title}</td>
                      <td>
                        {d.min_publication_year} &ndash; {d.max_publication_year}
                      </td>
                      <td>{d.genre || "—"}</td>
                      <td>{d.authors?.join(", ") || "—"}</td>
                      <td>{d.publisher || "—"}</td>
                      <td>{d.language || "—"}</td>
                      <td className="px-4 py-2 text-center font-semibold">
                        {offers.length}
                      </td>
                    
                      <td>
                        <button
                          className={`btn btn-sm ${
                            isOpen ? "btn-outline-secondary" : "btn-primary"
                          }`}
                          onClick={() => handleToggle(d.demand_id)}
                        >
                          {isOpen ? "Elrejt" : "Találatok"}
                        </button>
                      </td>
                    </tr>
                    {isOpen && offers.length > 0 && (
                      <tr>
                        <td colSpan="8" className="bg-light p-3">
                          <div className="row gx-3 gy-3">
                            {offers.map((offer) => (
                              <div key={offer.offer_id} className="col-md-6">
                                <UserOwnMatchesCards offer={offer} />
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>


        
        </div>
        </>
    )
}

