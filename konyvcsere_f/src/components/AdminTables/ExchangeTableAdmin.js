import useApiContext from '../../contexts/ApiContext.js';
import TableAdminCreate from './TableAdminCreate.js';

export default function ExchangeTableAdmin({exchanges}) {  
  const {softDeleteExchange} = useApiContext();

  const szuksegesExchanges = exchanges.map(exchange => ({
    exchange_id: exchange.exchange_id ?? "-",
    desired_book_title: exchange.desired_book_title,
    desired_owner_name: exchange.desired_owner_name,
    desired_owner_email: exchange.desired_owner_email,
    desired_owner_city: exchange.desired_owner_city,
    desired_owner_tel: exchange.desired_owner_tel,
    offered_book_title: exchange.offered_book_title,
    offered_owner_name: exchange.offered_owner_name,
    offered_owner_email: exchange.offered_owner_email,
    offered_owner_city: exchange.offered_owner_city,
    offered_owner_tel: exchange.offered_owner_tel
  }));

  return (
    <TableAdminCreate
        tHeadLabels={{
            exchange_id: "ID",
            desired_book_title: "Kért könyv címe",
            desired_owner_name: "Kért könyv tulajdonosa",
            desired_owner_email: "(K) Tulajdonos emailje",
            desired_owner_city: "(K) Tulajdonos városa",
            desired_owner_tel: "(K) Tulajdonos tel.",
            offered_book_title: "Felajánlott könyv címe",
            offered_owner_name: "Felajánlott könyv tulajdonosa",
            offered_owner_email: "(F) Tulajdonos emailje",
            offered_owner_city: "(F) Tulajdonos városa",
            offered_owner_tel: "(F) Tulajdonos tel."
        }}
        tBodyContent={szuksegesExchanges}
        removeFn={softDeleteExchange}
        rowIdKey="exchange_id"
    />
  )
}
