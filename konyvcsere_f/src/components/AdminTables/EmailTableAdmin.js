import useApiContext from '../../contexts/ApiContext.js';
import TableAdminCreate from './TableAdminCreate.js';

export default function EmailTableAdmin({ emails }) {
const { softDeleteEmail } = useApiContext();

    const emailEllenorzes = emails.map(email => ({
        exchange_id: email.exchange_id ?? "-",
        sent_time: email.sent_time,
        recipient_name: email.recipient_name,
        recipient_email: email.recipient_email,
        recipient_tel: email.recipient_tel,
        partner_name: email.partner_name,
        partner_email: email.partner_email,
        partner_tel: email.partner_tel,
    }));

    return (
        <TableAdminCreate
            tHeadLabels={{
                exchange_id: "ID",
                sent_time: "Küldés ideje",
                recipient_name: "Partner neve",
                recipient_email: "Partner emailje",
                recipient_tel: "Partner telefonszáma",
                partner_name: "Másik fél neve",
                partner_email: "Másik fél email",
                partner_tel: "Másik fél telefonszáma"
            }}
            tBodyContent={emailEllenorzes}
            removeFn={softDeleteEmail}
            rowIdKey="exchange_id"
        />
    );
}
