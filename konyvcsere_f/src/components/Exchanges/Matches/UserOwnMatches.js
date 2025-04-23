import { useEffect, useState } from "react";
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
      
            if (!authUser || !authUser.id) return;
            async function fetchData() {
                try {
                    const demandsData = await getAllDemands(authUser.id);
                    setDemands(demandsData || []);
                    console.log("lekert demands: ", demandsData, authUser) // ok
                    //console.log("cserek2: ", exchanges) regi allapoto mutatja
                } catch (error) {
                    console.error("Hiba az adatok lekérésekor:", error);
                }
                //console.log("cserek2 (regi allapot?): ", exchanges)
                
            }
            fetchData();
            console.log("lekert demands2: ", demands)
        }, [authUser]);

         // előre kiszámoljuk, hány találat van each demand-hez
          const counts = Object.fromEntries(
            Object.entries(matches).map(([dId, offers]) => [dId, offers.length])
          );

          // kattintáskor lekérjük, ha még nem töltöttük, aztán toggle-oljuk az expanded állapotot
  const handleToggle = async (demand_id) => {
    // ha még nincs betöltve, töltsük
    if (!matches[demand_id]) {
      const offers = await getMatchesForDemand(demand_id);
      setMatches((m) => ({ ...m, [demand_id]: offers || [] }));
    }
    setExpanded((set) => {
      const next = new Set(set);
      if (next.has(demand_id)) next.delete(demand_id);
      else next.add(demand_id);
      return next;
    });
  };

    return(
        <>
        <div className="userOwnMatches">
        <div className="max-w-4xl mx-auto p-4">
      {demands.length === 0 ? (
        <p className="text-gray-600">Még nincs mentett keresésed.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Cím</th>
              <th className="px-4 py-2 text-left">Évjárat</th>
              <th className="px-4 py-2 text-left">Műfaj</th>
              <th className="px-4 py-2 text-left">Szerzők</th>
              <th className="px-4 py-2 text-left">Kiadó</th>
              <th className="px-4 py-2 text-left">Nyelv</th>
              <th className="px-4 py-2 text-center">Talált</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {demands.map(d => {
              const count = counts[d.demand_id] || 0;
              return (
                <tr key={d.demand_id} className="border-t">
                  <td className="px-4 py-2">{d.title}</td>
                  <td className="px-4 py-2">
                    {d.min_publication_year} – {d.max_publication_year}
                  </td>
                  <td className="px-4 py-2">{d.genre || "—"}</td>
                  <td className="px-4 py-2">
                    {(d.authors || []).join(", ") || "—"}
                  </td>
                  <td className="px-4 py-2">{d.publisher || "—"}</td>
                  <td className="px-4 py-2">{d.language || "—"}</td>
                  <td className="px-4 py-2 text-center font-semibold">
                    {count}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="px-3 py-1 rounded button"
                      onClick={async () => {
                        const offers = await getMatchesForDemand(d.demand_id);
                        setMatches(prev => ({
                          ...prev,
                          [d.demand_id]: offers || []
                        }));
                      }}
                    >
                      Találatok
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Ha vannak találatok, kiemelten alatta */}
      {demands.map(d => (
        matches[d.demand_id]?.length > 0 && (
          <div
            key={d.demand_id}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {matches[d.demand_id].map(offer => (
              <UserOwnMatchesCards
                key={offer.offer_id}
                offer={offer}
              />
            ))}
          </div>
        )
      ))}
    </div>


        
        </div>
        </>
    )
}

